import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'

const AppContext = React.createContext()

const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'

export const AppProvider = ({ children }) => {

    const [meals, setMeals] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [selectedMeal, setSelectedMeal] = useState(null)

    const fetchMeals = async (url) => {
        setLoading(true)

        try {
            const {data} = await axios(url)
            data.meals ? setMeals(data.meals) : setMeals([])
        }
        catch (e) {
            console.log(e.response)
        }

        setLoading(false)
    }

    const fetchRandomMeal = () => {
        fetchMeals(randomMealUrl)
    }

    const selectMeal = (idMeal, favoriteMeal) => {
        let meal;
        meal = meals.find((meal) => meal.idMeal === idMeal)
        setSelectedMeal(meal)
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    useEffect(() => {
        fetchMeals(allMealsUrl)
    }, [])

    useEffect(() => {
        if (!searchTerm) return
        fetchMeals(`${allMealsUrl}${searchTerm}`)
    }, [searchTerm])

    useEffect(() => {
        fetchMeals(allMealsUrl)
    }, [])

    return (
        <AppContext.Provider value={{ loading, meals, showModal, selectedMeal,
        setSearchTerm, fetchRandomMeal, selectMeal, closeModal }}>
            {children} 
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}