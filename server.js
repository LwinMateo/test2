const express = require('express');
const app = express();

const moduleA = require('./test2_moduleA.js');
const { stringify } = require('querystring');



var HTTP_PORT = process.env.HTTP_PORT || 8080;



function onHttpStart(){
    console.log("Express http server listening on: " + HTTP_PORT);
}

app.use(express.static('public'));


app.get("/", function(req, res){
    let HTMLText = "<h2>Declaration:</h2>";

    HTMLText += "<p>The rest text is displayed in paragraph as shown in screenshot.</p>";

    HTMLText += "<p>I acknowledge the College's academic integrity policy - and my own integrity - remain in effect<br>"
    HTMLText += "<p>whether my work is done remotely or onsite. Any test or assignment is an act of trust between<br>"
    HTMLText += "<p>me and my instructor, and especially with my classmates.. even when no one is watching. I<br>"
    HTMLText += "declare I will not break that trust.</p>"

    HTMLText += "<p>Name: <span style='background-color:yellow'>Lwin Yonal Mateo Lopez</span></p>";
    HTMLText += "<p>Student Number: <span style='background-color:yellow'>134710201</span></p>"

    HTMLText += "<a href='/BSD'>Click to visit BSD Students</p>";
    HTMLText += "<a href='/highGPA'>Click to see who has the highest GPA</p>"

    res.send(HTMLText);
});



app.get('/BSD', function(req, res){
    moduleA.getBSD().then((data) =>{
        res.json(data);
    })
})

app.get('/highGPA', function(req, res){
    moduleA.highGPA().then((data) =>{
        let text = "<h1>Highest GPA:</h1>";
        text += "<p>Student ID: " + stringify(data.studID) + "<br>";
        text += "<p>Name: " + data.name + "<br>";
        text += "<p>Program: " + stringify(data.program) + "<br>";
        text += "<p>GPA: " + stringify(data.gpa) + "</p>";

        res.send(text);
    })
})

app.get('/*', function(req, res){
    res.status(404).send("Error 404: page not found");
})

moduleA.initialize().then(function(){
    app.listen(HTTP_PORT, onHttpStart);
}).catch(function(err){
    console.log('Initialization Failed', err);
})