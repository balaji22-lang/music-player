import { useEffect } from 'react'

function Callback() {
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code')
    if (!code) {
      window.location.href = '/'
      return
    }

    getToken(code)
  }, [])

  async function getToken(code: string) {
    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: 'c00a33ea',
      code,
      redirect_uri: 'https://localhost:5173/callback',
    })

    const res = await fetch(
      'https://api.jamendo.com/v3.0/oauth/grant',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
      },
    )

    const data: any = await res.json()
    if (data.access_token) {
      localStorage.setItem('token', data.access_token)
    }

    window.location.href = '/'
  }

  return <h2>Logging in...</h2>
}

export default Callback
