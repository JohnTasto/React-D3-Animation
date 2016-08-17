import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import configureStore from './reducers'
import { generateData } from './utilities'

import App from './components/App'

import './index.css'


setTimeout(() => {
  const store = configureStore()
  const datasets = [generateData(100, 20)]
  datasets.push(datasets[0].slice(0).concat(generateData(50, 0, true)))
  ReactDOM.render(
    <Provider store={store}>
      <App {...{datasets}} />
    </Provider>
  , document.getElementById('root'))
}, 0)
