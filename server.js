const express = require("express");
const path = require("path");
const app = express();
const PORT = 8000;

// ===========configurations for express====================
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')))

// ================configure EJS==================to set templating engines
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

// we use the app to create the routes. (/) is a route leading to the home page
// ====================================ROUTES==========================
// Home Route
app.get("/", (req, res) => {
    // res.send(`welcome to the home page!!! `)
    res.render('index.ejs')
});

app.listen(PORT, () => {
    console.log("server started on port 8000")
});