const clientId = 'c00a33ea'
const redirectUri = 'https://localhost:5173/callback'

export async function login() {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'music',
  })

  window.location.href = `https://api.jamendo.com/v3.0/oauth/authorize?${params.toString()}`
}
