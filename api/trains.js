export default async function handler(req, res) {
  const server = String(req.query.server || "pl3");
  const endpoint = req.query.endpoint || "trains"; // domyślnie trains-open lub simrail
  
  let targetUrl = `https://panel.simrail.eu:8084/trains-open?serverCode=${encodeURIComponent(server)}`;
  
  if (endpoint === "stations") {
    targetUrl = `https://panel.simrail.eu:8084/stations-open?serverCode=${encodeURIComponent(server)}`;
  } else if (endpoint === "timetable") {
    targetUrl = `https://panel.simrail.eu:8084/simrail?server=${encodeURIComponent(server)}`; // jeśli tak masz nazwane
  }

  try {
    const r = await fetch(targetUrl);
    const data = await r.json();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "s-maxage=3, stale-while-revalidate");
    res.status(200).json(data);
  } catch (e) {
    res.status(502).json({ result: false, data: [], error: String(e) });
  }
}
