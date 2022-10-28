import './App.css'
import Search from './components/Search'
import Modal from './components/Modal'
import Meals from './components/Meals'
import Favorites from './components/Favorites'
import { useGlobalContext } from '../context'

function App() {

  const { showModal } = useGlobalContext()
  
  return (
    <main>

      <Search />
      <Meals />
      {showModal && <Modal />}

    </main>
  )
}

export default App