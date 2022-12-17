export const useAnimateSetting = () => {
  const pageDuration = 0.4

  const pathToPageLevel = (path: string): number[] => {
    const pathArray = path.split('/')

    if (path === '/') {
      return [1, 1]
    }
    if (path.startsWith('/register')) {
      if (pathArray.length === 3) {
        // /register/once-pay
        return [2, 2]
      }
      return [3, 1]
    }
    if (path.startsWith('/group')) {
      if (pathArray.length === 3) {
        return [4, 1]
      }
      return [5, 1]
    }
    if (path.startsWith('/once-pay')) {
      return [4, 2]
    }
    if (path.startsWith('/join')) {
      return [1, 2]
    }
    return [10, 10]
  }

  return {
    pageDuration,
    pathToPageLevel,
  }
}
