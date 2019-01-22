import React, { Component } from 'react'
import './App.css'
import { Provider } from 'react-redux'
import store from './store'
import RouterMain from './RouterMain'

class App extends Component {
  render () {
    return (
      <div>
        <Provider store={store}>
          <RouterMain />
        </Provider>
      </div>
    )
  }
}

export default App
