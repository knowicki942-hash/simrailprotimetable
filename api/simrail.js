export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const server = req.query.server || "pl3";

  try {
    // Pobieramy rozkład
    const response = await fetch(
      `https://api1.aws.simrail.eu:8082/api/getEDRTimetables?serverCode=${server}`
    );
    const timetable = await response.json();

    // Pobieramy strefę czasową (serwer-serwer nie ma błędu CORS)
    const tzResponse = await fetch(
      `https://api1.aws.simrail.eu:8082/api/getTimeZone?serverCode=${server}`
    );
    const timeZone = await tzResponse.json();

    // Wysyłamy oba obiekty naraz
    res.status(200).json({ timetable, timeZone });

  } catch (err) {
    res.status(500).json({ error: true });
  }
}
