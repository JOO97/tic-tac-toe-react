import Big from 'big.js'

const operator = ['÷', 'x', '-', '+']

function isNumber(value) {
  return /[0-9]+/.test(value)
}

function operate(n1, n2, operator) {
  const one = new Big(n1 || '0')
  const two = new Big(n2 || (operator === '÷' ? '1' : '0'))
  switch (operator) {
    case '-':
      return one.minus(two).toString()
    case '+':
      return one.plus(two).toString()
    case '÷':
      if (two === ' 0') {
        alert('error: divide by 0')
        return '0'
      } else {
        return one.div(two).toString()
      }
    case 'x':
      return one.times(two).toString()
    default:
      throw Error(`unknown operator: ${operator}`)
  }
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

  //'÷', 'x', '-', '+'
  if (operator.includes(btnName)) {
    if (next || result) {
      let r = {}
      if (next) {
        if (result) {
          r = {
            result: operate(result, next, operation),
            next: null,
          }
        } else {
          r = {
            result: next,
            next: null,
          }
        }
        return { operation: btnName, ...r }
      }
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

  if (btnName === '%') {
    if (operation && next) {
      const r = operate(result, next, operation)
      return {
        result: Big(r).div(Big('100')).toString(),
        next: null,
        operation: null,
      }
    }
    if (next) {
      return {
        next: Big(next).div(Big('100')).toString(),
      }
    }
    if (!operation && result) {
      return {
        result: Big(result).div(Big('100')).toString(),
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
