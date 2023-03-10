export function localStorageService() {
  return {
    get(itemName) {
      const item = localStorage.getItem(itemName)
      const numPatt = new RegExp(/^\d+$/)
      const jsonPatt = new RegExp(/[\[\{].*[\}\]]/)

      if (item) {
        if (jsonPatt.test(item)) {
          return JSON.parse(item)
        } else if (numPatt.test(item)) {
          return parseFloat(item)
        } else {
          return item
        }
      } else {
        return null
      }
    },

    set(itemName, item) {
      if (typeof item === 'object') {
        localStorage.setItem(itemName, JSON.stringify(item))
      } else {
        localStorage.setItem(itemName, item)
      }
    },

    remove(itemName) {
      localStorage.removeItem(itemName)
    },
  }
}
