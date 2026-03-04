export async function searchSongs(query) {
  // Jamendo API search endpoint
  const res = await fetch(
    `https://api.jamendo.com/v3.0/tracks/?client_id=c00a33ea&search=${encodeURIComponent(query)}&format=json&limit=20`,
    {
      method: "GET",
    }
  );

  const data = await res.json();
  return data.results;
}