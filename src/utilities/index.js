import * as d3 from 'd3'
import seedrandom from 'seedrandom'

export const random = (() => {
  let seed = 5625463739
  return () => seedrandom.alea(seed++)()
})()

export const normalDist = () => {
  const halfRange = 0.5
  const r = () => (random() + random())
  const v = [r(), r(), r()]
  const norm = (v.reduce((p, c) => { return p + c }, 0) - v.length) / v.length
  return norm * halfRange + halfRange
}

export function generateData (populationSize, controlSize, doNormal = false) {
  const randomFn = doNormal ? normalDist : random
  const groups = ['alpha', 'bravo', 'charlie', 'delta', 'echo', 'foxtrot']
  const baseData = d3.range(populationSize).map(() => groups[Math.floor(randomFn() * groups.length)])
  return baseData.concat(d3.range(controlSize).map(() => 'golf'))
}

export function countEntries (entries) {
  const tally = {}
  entries.forEach(label => {
    tally[label] = (tally[label] || 0) + 1
  })
  return tally
}
