export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const server = req.query.server || "pl3";

  try {
    const response = await fetch(
      `https://api1.aws.simrail.eu:8082/api/getEDRTimetables?serverCode=${server}`
    );

    const data = await response.json();
    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({ error: true });
  }
}
