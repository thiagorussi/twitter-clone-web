import React from 'react'

import Home from './Home'
import Login from './Login'
import Signup from './Signup'

import { useState } from 'react'

function App() {
  const [user, setUser] = useState()
  
  if (user){
    return <Home loggedInUser = {user}/>
  }
  
  return window.location.pathname === '/signup' 
  ? <Signup signInUser={setUser} /> 
  : <Login signInUser={setUser} />

}

window.location

export default App