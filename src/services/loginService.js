const loginService = async ({ username, password, url }) => {
  const settings = {
    method: 'POST',
    headers: new Headers({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({ username, password }),
  }
  try {
    const res = await fetch(url, settings)
    if (res) {
      const { results } = await res.json() // El await si es necesario
      if (res.status !== 200) return [results, false]
      return [results, true]
    }
  } catch (error) {
    console.error(error)
    return [error, false]
  }
}

export default loginService
