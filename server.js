// Dependencies/Modules
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Store = require("./models/store").Store;
const logger = require("morgan");
const flash = require("connect-flash");

// define express functions
const app = express();
const PORT = 8000;

// Configure mongoose to connect to database
mongoose.connect("mongodb://localhost/rannysoftapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}).then((response) =>{
    console.log("Rannysoft database connected successfully!!!")
}).catch((error) => {
    console.log("error!!!")
});


// ===========configurations for express====================
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')))

// ============configure Logger, Flash========================
app.use(logger('dev'));
app.use(flash());

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

// About Route
app.get("/about", (req, res) => {
    res.render('about.ejs')
});


// Register GET Route
app.get("/register", (req, res) => {
    res.render('register.ejs')
});

// Register POST Route
app.post("/register", (req, res) => {
    console.log(req.body)
    let {
        store_name,
        email,
        password,
        confirm_password,
        address,
        phone_number
    } = req.body;

    if(password.length <= 4) {
        console.log('Password must have at least 5 Characters!!!')
        res.redirect('/register');
    
    }else{

        if(password != confirm_password){
            console.log("passwords do not match!!!")
            res.redirect("/register");
        }else{
            const newStore = new Store({
                store_name: store_name,
                email: email,
                password: password,
                address: address,
                phone_number: phone_number
            });
        
            newStore.save();
            res.redirect("/register");
            console.log('submitted successfully')
            res.redirect('/login');
        }
    }
});

// Login Route
app.get("/login", (req, res) => {
    res.render('login.ejs')
});


app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
});