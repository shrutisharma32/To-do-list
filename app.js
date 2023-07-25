const express= require("express");
const bodyParser= require("body-parser");
const date = require(__dirname + "/date.js")

// console.log(date());

const app=express();


let items=["Padh le bhai", "DSA karne baith chupchaap baaki sab baad me"];
let workItems=[]

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

app.set('view engine', 'ejs');

app.get("/", function(req, res){

    let day = date.getDate();
    res.render("list", {listTitle: day, newListItems: items})
})

app.post("/", function(req, res){
    // console.log(req.body);
    let item= req.body.newItem;

    if(req.body.list == "Work")
    {
        workItems.push(item);
        res.redirect("/work")
    }
    else{
    

    items.push(item)
    // console.log(item); 
    // res.render("list", {newListItem: item});
    res.redirect("/")
    }
})

app.get("/work", function(req ,res){

    res.render("list", {listTitle:"Work List", newListItems: workItems})
})

app.post("/work", function(req, res){
    let item= req.body.newItem;
    workItems.push(item)
    res.redirect("/work")
})

app.listen(3000, function(){
    console.log("Server started on port 3000");
})