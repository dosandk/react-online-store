// NOTE: Pattern. Decorator
export const debounce = (fn, delay = 0) => {
  let timerId

  return function (...args) {
    console.error(9999);

    if (timerId) {
      clearTimeout(timerId)
    }

    timerId = setTimeout(() => {
      fn.apply(this, args);

      timerId = null
    }, delay)
  }
}
