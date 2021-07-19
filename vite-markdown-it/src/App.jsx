import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import './style/markdown.css'
import './style/highlight.css'
import './style/commom.css'

import MdView from './view/mdView'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <MdView></MdView>
    </div>
  )
}

export default App
