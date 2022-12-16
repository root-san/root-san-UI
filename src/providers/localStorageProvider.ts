// rome-ignore lint/suspicious/noExplicitAny: <explanation>
export const localStorageProvider = (): Map<any, any> => {
  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  const map = new Map<any, any>(
    JSON.parse(localStorage.getItem('app-cache') || '[]')
  )

  window.addEventListener('beforeunload', () => {
    const appCache = JSON.stringify(Array.from(map.entries()))
    localStorage.setItem('app-cache', appCache)
  })

  return map
}
