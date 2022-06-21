import { atom,
    useRecoilState,
    useSetRecoilState,
    useRecoilValue,
    selector 
} from "recoil"
import { useState } from "react";

const todoListState = atom({
    key: "TodoApp",
    default: []
})
const todoListFilterState = atom({
    key: "TodoListFilter",
    default: "Show All"
})
const filterTodoListState = selector({
    key: "FilterTodoState",
    get: ({get}) => {
        const filter = get(todoListFilterState)
        const list = get(todoListState)

        switch (filter) {
            case 'Show Completed':
                return list.filter((item) => item.isComplete)
            case 'Show Uncompleted':
                return list.filter((item) => !item.isComplete)
            default:
                return list
        }
    }
})
const todoListStatsState = selector({
    key: "TodoListStats",
    get: ({get}) => {
        const todoList = get(todoListState)
        const totalNum = todoList.length
        const totalNumCompleted = todoList.filter((item) => item.isComplete).length
        const totalNumUncompleted = totalNum - totalNumCompleted
        const percentCompleted = totalNum == 0 ? 0 : totalNumCompleted/totalNum * 100

        return {
            totalNum,
            totalNumCompleted,
            totalNumUncompleted,
            percentCompleted
        }
    }
})

function TodoItemCreator() {
    const [inputValue, setInputValue] = useState("")
    const setTodoList = useSetRecoilState(todoListState)
    const addItem = () => {
        setTodoList((oldItems) => [
            ...oldItems,
            {
                id: getId(),
                text: inputValue,
                isComplete: false
            },
        ]);
        setInputValue('')
    }
    const handleChange = ({target: {value}}) => {
        setInputValue(value)
    }
    return (
        <div className="input__house container d-flex justify-content-center p-5 mt-5">
            <div className="p-4">
            <h2>Enjoy your todo List</h2>
                <input type="text" value={inputValue} onChange={handleChange} className="form-control" placeholder="What's on your mind?" aria-label="Username" aria-describedby="basic-addon1" />
                <button className="btn btn-success mt-4" onClick={addItem}>Add Item</button>
            </div>
        </div>
    )
}
// utility function
let id;
function getId() {
    return id++;
}

function TodoItem({item}) {
    const [todoList, setTodoList] = useRecoilState(todoListState)
    const index = todoList.findIndex((listItem) => listItem === item)

    const editItemList = ({target:{value}}) => {
        const newList = replaceItemAtIndex(todoList, index, {
            ...item,
            text: value
        });
        setTodoList(newList)
    }
    const toggleItemCompletion = () => {
        const newList = replaceItemAtIndex(todoList, index, {
            ...item,
            isComplete: !item.isComplete
        });
        setTodoList(newList)
    }
    const deleteItem = () => {
        const newList = removeItemAtIndex(todoList, index) 
        setTodoList(newList)
    }

    return(
        <div className="container mt-4">
            <input type="text" value={item.text} onChange={editItemList} className="form-control" placeholder="Key in updated details" aria-label="Username" aria-describedby="basic-addon1" />
            <input type="checkbox" checked={item.isComplete} onChange={toggleItemCompletion} />
            <button onClick={deleteItem} className="btn btn-danger">Delete Item</button>
        </div>
    )
}
function replaceItemAtIndex(arr, index, newItem) {
    return [...arr.slice(0, index), newItem, ...arr.slice(index + 1)]
}
function removeItemAtIndex(arr, index) {
    return [...arr.slice(0, index), ...arr.slice(index + 1)]
}

function TodoListFilters() {
    const [filter, setFilter] = useRecoilState(todoListFilterState)
    const filterList = ({target: {value}}) => {
        setFilter(value)
    }

    return(
        <div>
            Filter:
            <select value={filter} onChange={filterList}>
                <option value="All">All</option>
                <option value="Show Completed">Completed</option>
                <option value="Show Uncompleted">Uncompleted</option>
            </select>
        </div>
    )
}

function TodoListStats() {
    const {totalNum,
        totalNumCompleted,
        totalNumUncompleted,
        percentCompleted,} = useRecoilValue(todoListStatsState)

    const formattedPercentCompleted = Math.round(percentCompleted)
    return (
        <ul className="text-white">
          <li>Total items: {totalNum}</li>                              
          <li>Items completed: {totalNumCompleted}</li>
          <li>Items not completed: {totalNumUncompleted}</li>
          <li>Percent completed: {formattedPercentCompleted}</li>
        </ul>
      );
}

export default function TodoListApp() {
    const todoList = useRecoilValue(filterTodoListState);
    return(
        <div>
            <TodoListStats />
            <TodoListFilters />
            <TodoItemCreator />

            {todoList.map((todoItem) => (
                <TodoItem item={todoItem} key={todoItem.id} />
            ))}
        </div>
    )
}