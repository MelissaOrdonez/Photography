import bodyParser from "body-parser";
import express from "express";
import "./script.js";

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"));

let session = "";
app.post("/calendar", (req, res) => {
    session = req.params.id;
    console.log(session);
    res.render('calendar.ejs')
});
    
app.get("/", (req, res) => {
    res.render("index.ejs");
})
app.get("/packages", (req, res) => {
    res.render("packages.ejs");
})
app.get("/contact", (req, res) => {
    res.render("contact.ejs");
})
app.get("/experience", (req, res) => {
    res.render("experience.ejs");
})
app.get("/faq", (req, res) => {
    res.render("faq.ejs");
})
app.get("/portfolio", (req, res) => {
    res.render("portfolio.ejs");
})
app.get("/weddings", (req, res) => {
    res.render("portfolio/weddings.ejs");
})
app.get("/portraits", (req, res) => {
    res.render("portfolio/portraits.ejs");
})
app.get("/families", (req, res) => {
    res.render("portfolio/families.ejs");
})
app.get("/graduations", (req, res) => {
    res.render("portfolio/graduations.ejs");
})
app.get("/communions", (req, res) => {
    res.render("portfolio/communions.ejs");
})
app.get("/other", (req, res) => {
    res.render("portfolio/other.ejs");
})
app.get("/calendar", (req, res) => {

    res.render("calendar.ejs");
})
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})