import { useGlobalContext } from '../../context'
import { MdOutlineThumbUpAlt } from 'react-icons/md'

const Meals = () => {

    const { meals, loading, selectMeal, addToFavorites } = useGlobalContext()

    if (loading) {
        return (
        <section className='section'>
            <h4>Loading...</h4>
        </section>
        )
    }

    if (meals.length < 1) {
        return (
            <section className='section'>
                <h4>No results for your search term.</h4>
            </section>
        )
    }

    return (
        <section className='section-center'>
            {meals.map((meal) => {
                const { idMeal, strMeal: title, strMealThumb: image } = meal

                return (
                    <article key={idMeal} className='single-meal'>
                        <img src={image} className='img' onClick={() => selectMeal(idMeal)}/>
                        <footer>
                            <h5>{title}</h5>
                            <button className='like-btn' onClick={() => addToFavorites(idMeal)}><MdOutlineThumbUpAlt /></button>
                        </footer>
                    </article>
                )
            })}
        </section>
    )
}

export default Meals