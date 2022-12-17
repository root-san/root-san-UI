// rome-ignore lint/suspicious/noExplicitAny: <explanation>
export const localStorageProvider = (): Map<any, any> => {
  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  const map = new Map<any, any>(
    JSON.parse(localStorage.getItem('app-cache') || '[]')
  )
  localStorage.setItem('app-cache-enable', '1')

  window.addEventListener('beforeunload', () => {
    const appCacheEnable = localStorage.getItem('app-cache-enable')
    if (appCacheEnable !== '1') {
      localStorage.removeItem('app-cache')
      return
    }
    const appCache = JSON.stringify(Array.from(map.entries()))
    localStorage.setItem('app-cache', appCache)
    localStorage.removeItem('direction')
    localStorage.removeItem('path')
  })

  return map
}

export const disableLocalStorageProvider = () => {
  localStorage.setItem('app-cache-enable', '0')
}
