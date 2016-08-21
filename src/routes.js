import React from 'react'
import { Route } from 'react-router'

import App from './components/App'

import { generateData } from './utilities'


const datasets = [generateData(100, 20)]
datasets.push(datasets[0].slice(0).concat(generateData(50, 0, true)))


export default (
  <Route path="/" {...{datasets}} component={App} />
)
