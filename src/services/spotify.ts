export async function searchSongs(query: string): Promise<any[]> {
  const res = await fetch(
    `https://api.jamendo.com/v3.0/tracks/?client_id=c00a33ea&search=${encodeURIComponent(query)}&format=json&limit=20`,
    {
      method: 'GET',
    },
  )

  const data: any = await res.json()
  if (Array.isArray(data.results)) {
    return data.results
  }
  return []
}
