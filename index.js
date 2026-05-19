import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Obsługa strony głównej (żeby po wejściu na link nie było błędu)
app.get('/', (req, res) => {
    res.send('Serwer SimRail Rozkłady działa poprawnie!');
});

// Twoje API pobierające dane z SimRail
app.get('/api/simrail', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const server = req.query.server || "pl3";

    try {
        // Pobieramy rozkład
        const response = await fetch(
            `https://api1.aws.simrail.eu:8082/api/getEDRTimetables?serverCode=${server}`
        );
        const timetable = await response.json();

        // Pobieramy strefę czasową
        const tzResponse = await fetch(
            `https://api1.aws.simrail.eu:8082/api/getTimeZone?serverCode=${server}`
        );
        const timeZone = await tzResponse.json();

        // Wysyłamy dane
        res.status(200).json({ timetable, timeZone });

    } catch (err) {
        console.error("Błąd pobierania danych z SimRail:", err);
        res.status(500).json({ error: true, message: "Nie udało się pobrać danych z API SimRail" });
    }
});

// Start serwera
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Serwer SimRail nasłuchuje na porcie ${PORT}`);
});
