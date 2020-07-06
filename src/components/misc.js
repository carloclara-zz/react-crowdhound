export function assert(condition, message) {
  if (!condition) {
    throw new Error(`[react-crowdhound] ${message}`)
  }
}

export function warn(condition, message) {
  if (process.env.NODE_ENV !== 'production' && !condition) {
    /* eslint-disable no-console */
    typeof console !== 'undefined' &&
      console.warn(`[react-crowdhound] ${message}`)
    /* eslint-enable no-console */
  }
}

export function isError(err) {
  return Object.prototype.toString.call(err).indexOf('Error') > -1
}

export const inBrowser = typeof window !== 'undefined'
