// ES6 code
export function throttled<T>(delay: number, fn: (args: T) => void) {
  let lastCall = 0
  return function(args: T) {
    const now = new Date().getTime()
    if (now - lastCall < delay) {
      return
    }
    lastCall = now
    return fn(args)
  }
}

// ES6
export function debounced<T>(delay: number, fn: (args: T) => void) {
  let timerId: any
  return function(args: T) {
    if (timerId) {
      clearTimeout(timerId)
    }
    timerId = setTimeout(() => {
      fn(args)
      timerId = undefined
    }, delay)
  }
}
