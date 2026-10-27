export default async function handler(req, res) {
  const server = String(req.query.server || "pl3");
  try {
    const r = await fetch(`https://panel.simrail.eu:8084/trains-open?serverCode=${encodeURIComponent(server)}`);
    const data = await r.json();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "s-maxage=3, stale-while-revalidate");
    res.status(200).json(data);
  } catch (e) {
    res.status(502).json({ result: false, data: [], error: String(e) });
  }
}
