const request = async (routeSuffix, config) => {
  const url = 'http://localhost:8069/hotel/' + routeSuffix

  const options = {
    method: config ? config.method : 'GET',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    referrerPolicy: 'no-referrer'
  }

  if (config !== undefined && config.body !== undefined) {
    options.body = JSON.stringify(config.body)
  }

  const response = await fetch(url, options)

  if (response.ok) {
    try {
      return { payload: await response.json(), status: response.status }
    } catch (e) {
      return { payload: undefined, status: response.status }
    }
  } else {
    return response
  }
}

export default request
