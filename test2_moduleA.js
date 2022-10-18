const fs = require('fs');

var students = new Array();

module.exports.initialize = function(){
    return new Promise(function(resolve, reject){
        fs.readFile('./students.json', (err, data) => {
            if(err){
                reject("unable to read file");
            }
            students = JSON.parse(data);
            resolve();
        });
    });
};

module.exports.getBSD = function(){
    return new Promise((resolve, reject) => {
        if(students.length == 0){
            reject("no results returned");
        }
        
        resolve(students);
    
    });
}

module.exports.highGPA = function(){
    return new Promise((resolve, reject) => {
        var Found = false;
        var std_highGPA = [];
        for(var i = 0; i < students.length; i++){
            if(students[i].gpa >= 4.0){
                for(var j = 0; j < students.length; j++){
                    if(students[i].name == students[j].name){
                        continue;
                    }
                    else if(students[i].name != students[j].name && students[i].gpa == students[j].gpa){
                        std_highGPA.push(students[i]);
                        Found = true;
                    }
                    else{
                        std_highGPA.push(students[i]);
                        Found = true;
                    }
                }
            }
        }

        if(Found == false){
            reject( "Failed finding the student with the highest GPA");
        }
        
        resolve(students);
        
    })
}