import Big from 'big.js'

const operator = ['÷', 'x', '-', '+', '%']

function isNumber(value) {
  return /[0-9]+/.test(value)
}

function operate(n1, n2, operator) {
  return 1
}

export default function calculate(obj, btnName) {
  const { result, next, operation } = obj

  if (isNumber(btnName)) {
    if (btnName === '0' && Number(next) === 0) {
      return {}
    }
    if (operation) {
      if (next) {
        return { next: next + btnName }
      }
      return { next: btnName }
    }

    if (next) {
      return { next: next === '0' ? btnName : next + btnName, result: null }
    }

    return { next: btnName, result: null }
  }

  //'÷', 'x', '-', '+', '%'
  if (operator.includes(btnName)) {
    if (next || result) {
      let extra = {}
      if (result) {
        extra = {}
      }
      return { operation: btnName, ...extra }
    }
  }

  if (btnName === '=') {
    if (next && result && operation) {
      return {
        result: operate(result, next, operation),
        next: null,
        operation: null,
      }
    }
  }

  if (btnName === '+/-') {
    if (next) {
      return { next: (-1 * parseFloat(next)).toString }
    }
    if (result) {
      return { result: (-1 * parseFloat(result)).toString }
    }
  }

  if (btnName === '.') {
    if (next && next.indexOf('.') === -1) {
      return !next ? { next: 0 + '.' } : { next: next + '.' }
    }
  }

  if (btnName === 'AC') {
    return {
      result: null,
      next: null,
      operation: null,
    }
  }

  return {}
}
