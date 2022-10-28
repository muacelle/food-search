import { useState } from 'react'
import { useGlobalContext } from '../../context'

const Search = () => {

    const { setSearchTerm, fetchRandomMeal } = useGlobalContext()

    const [text, setText] = useState('')

    const handleChange = (e) => {
        setText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        (text) ? setSearchTerm(text) : setText(text)
    }

    const handleRandom = () => {
        setSearchTerm('')
        setText('')
        fetchRandomMeal()
    }

    return (
        <header className='search-container'>
            <form onSubmit={handleSubmit}>
                <input type='text' className='form-input' placeholder='Search food recipes...'
                value={text} onChange={handleChange} />
                <button type='submit' className='btn'>Search</button>
                <button type='button' className='btn btn-hipster' onClick={handleRandom}>Surprise me!</button>
            </form>
        </header>
    )
}

export default Search