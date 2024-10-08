import bodyParser from "body-parser";
import express from "express";

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"));

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
    let numImg = 5;
    let number = 1;
    let image = `<img src = "../images/wed${number}.jpg" style="width:100%">`;
    let left = "";
    let right = "&#10095;"
    
    res.render("portfolio/weddings.ejs", {
        images : image,
        next : right,
        prev : left
    });

    app.post("/weddings", (req, res) => {
        number = req.body.submit === "prev" ? number-1 : number+1;
        
        if(number === 1){
            left = "";
            right = "&#10095;";
        } 
        else if(number >= numImg){
            left = "&#10094;";
            right = "";
        } else{
            left = "&#10094;";
            right = "&#10095;";
        }
        
        image = `<img src = "../images/wed${number}.jpg" style="width:100%">`; 

        res.render("portfolio/weddings.ejs", {
            images : image,
            next : right,
            prev : left
        })
    })
})
app.get("/families", (req, res) => {
    let numImg = 5;
    let number = 1;
    let image = `<img src = "../images/fam${number}.jpg" style="width:100%">`;
    let left = "";
    let right = "&#10095;"
    
    res.render("portfolio/families.ejs", {
        images : image,
        next : right,
        prev : left
    });

    app.post("/families", (req, res) => {
        number = req.body.submit === "prev" ? number-1 : number+1;
        
        if(number === 1){
            left = "";
            right = "&#10095;";
        } 
        else if(number >= numImg){
            left = "&#10094;";
            right = "";
        } else{
            left = "&#10094;";
            right = "&#10095;";
        }
        
        image = `<img src = "../images/fam${number}.jpg" style="width:100%">`; 

        res.render("portfolio/families.ejs", {
            images : image,
            next : right,
            prev : left
        })
    })
})
app.get("/graduation", (req, res) => {
    let numImg = 5;
    let number = 1;
    let image = `<img src = "../images/grad${number}.jpg" style="width:100%">`;
    let left = "";
    let right = "&#10095;"
    
    res.render("portfolio/graduations.ejs", {
        images : image,
        next : right,
        prev : left
    });

    app.post("/graduation", (req, res) => {
        number = req.body.submit === "prev" ? number-1 : number+1;
        
        if(number === 1){
            left = "";
            right = "&#10095;";
        } 
        else if(number >= numImg){
            left = "&#10094;";
            right = "";
        } else{
            left = "&#10094;";
            right = "&#10095;";
        }
        
        image = `<img src = "../images/grad${number}.jpg" style="width:100%">`; 

        res.render("portfolio/graduations.ejs", {
            images : image,
            next : right,
            prev : left
        })
    })
})
app.get("/calendar", (req, res) => {
    let session = req.query.submit;

    let currentDate = "", 
    daysTag = "";

    let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth();

    const months = ["January", "Febuary", "March", "April", "May", "June",
         "July", "August", "September", "October", "November", "December"];
    
    const renderCalendar = () => {
        let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
        lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
        lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDate(),
        lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
        let liTag = "";
        let count = 0;

        for(let i = firstDayofMonth; i > 0; i--){
            liTag += `<li class = "inactive">${lastDateofLastMonth-i+1}</li>`;
            count += 1;
        }

        for(let i = 1; i <= lastDateofMonth; i++){
            let isToday = i === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear() ? "active" : "";
            liTag += `<li class ="${isToday}">${i}</li>`;
        }

        for(let i = lastDayofMonth; i < 35-count; i++){
            liTag += `<li class = "inactive">${i-lastDayofMonth+1}</li>`;
        }

        currentDate = `${months[currMonth]} ${currYear}`;
        daysTag = liTag;
    }
    renderCalendar();

    res.render("calendar.ejs", {
        date : currentDate,
        days : daysTag
    });

    app.post("/calendar", (req, res) => {
        currMonth = req.body.submit === "prev" ? currMonth - 1 : currMonth + 1;
        if(currMonth < 0 || currMonth > 11){
            date = new Date(currYear, currMonth);
            currYear = date.getFullYear();
            currMonth = date.getMonth();
        } else{
            date = new Date();
        }
        renderCalendar();

        res.render("calendar.ejs", {
            date : currentDate,
            days : daysTag
        })
    })
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})