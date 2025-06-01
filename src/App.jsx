import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/home/home'
import SignUp from './components/sign/sign_up'
import SignIn from './components/sign/sign_in'

const App = () => {
  return (
    <>
      <div className='px-0 sm:px-[5%] overflow-x-hidden flex flex-col justify-center items-center'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/signin' element={<SignIn />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App