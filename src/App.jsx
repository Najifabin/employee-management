
import { Route, Router, Routes } from 'react-router-dom'
import './App.css'
import Employeelist from './components/Employeelist'
import Edit from './components/Edit'

function App() {
  

  return (
    <>
    <Routes>
      <Route path='/' element={<Employeelist/>} />
      <Route path='/edit' element={<Edit/>} />
    </Routes>
      
    </>
  )
}

export default App
