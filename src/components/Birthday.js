export default function Birthday({people}) {
    return(
        <div>
            <h1>5 birthdays today</h1>
            <div>
                {people.map((person) => {
                    const {id, name, age, image} = person
                    return(
                        <article key={id} className="people d-flex mt-5">
                            <img className="rounded-circle me-4" src={image} alt={name} />
                            <div>
                                <h4>{name}</h4>
                                <p>{age} years</p>
                            </div>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}