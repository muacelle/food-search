import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'

const AppContext = React.createContext()

const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=Veg'
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'

export const AppProvider = ({ children }) => {

    const [meals, setMeals] = useState([])
    const [loading, setLoading] = useState(false)

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

    useEffect(() => {
        fetchMeals(allMealsUrl)
    }, [])

    return (
        <AppContext.Provider value={{ loading, meals }}>
            {children} 
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}