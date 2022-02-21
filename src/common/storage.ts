
export default {
  set (key: string | number, value: unknown): void {
    const content = { value }
    localStorage.setItem(key + '', JSON.stringify(content))
  },

  get (key: string): unknown {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value).value : null
  }
}