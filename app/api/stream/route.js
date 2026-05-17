export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')
  const ep = searchParams.get('ep')

  try {
    const res = await fetch(`https://aniwatch.co.at/${slug}/`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html",
        "Referer": "https://google.com"
      }
    })
    const html = await res.text()
    const regex = new RegExp(`data-number="${ep}"[^>]*data-id="(\\d+)"`)
    const match = html.match(regex)
    
    if (match) {
      return Response.json({ dataId: match[1] })
    }
    return Response.json({ dataId: null })
  } catch (e) {
    return Response.json({ dataId: null, error: e.message })
  }
}