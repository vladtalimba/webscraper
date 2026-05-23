import express from "express";
import cron from "node-cron";
const app = express();
const PORT = 8080;
function getConsumables() {
    console.log("Cron is working!");
}
// Endpoints
// Cron job
app.get("/api/consumables", (req, res) => {
    res.send("Blablabla");
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
cron.schedule('* * * * *', getConsumables);
