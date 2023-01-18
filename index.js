//Aerin Franklin, periods 7-8, Web Development
const express = require('express');
const app = express();
app.use(express.json());

const genres = [
    {id: 1, name: "pop"},
    {id: 2, name: "hiphop"},
    {id: 3, name: "rap"},
    {id: 4, name: "classical"},
    {id: 5, name: "rock"},
    {id: 6, name: "jazz"},
    {id: 7, name: "blues"},
    {id: 8, name: "electronic"}
];


//HTTP GET REQUESTS
app.get('/', (req,res)=>{
    res.status(200).send('Welcome to my music app!');
});
app.get('/api/genres', (req,res)=>{
    res.send(genres);
});
app.get('/api/genres/:id', (req,res)=>{
    const genre = genres.find(c=>c.id === parseInt(req.params.id));
    if(!genre){
        res.status(404).send("The genre with the given ID was not found");
        return
    }
    res.send(genre);
})
app.get('/api/genres/date', (req,res)=>{
    //TK: filter by month/year
});


//HTTP POST REQUESTS
app.post('/api/genres', (req,res) => {
        const genre ={
            //we assign an ID and a name property
            id: genres.length +1,
            name:req.body.name
        }
        if (genre.name.length>=3 && genre.name<=15) {

        //next step: push it to the array
        courses.push(genre);
        res.status(200).send(genre);
        //next step: the server should return the new resource to the client in the body of the response 
        }
        else {
            res.status(400).send("The genre name should be between 3 and 15 characters.");
        }
        
});


//HTTP PUT REQUESTS
app.put('/api/genres/:id', (req,res)=>{
    //Write the code in order to look up the genre, if not existing return a 404
    const genre = genres.find(c=>c.id === parseInt(req.params.id));
    if(!genre){
        res.status(404).send("The genre with the given ID was not found");
        return
    }
    else {
        if (genre.name.length>=3 && genre.name<=15) {
            genre["name"] = req.body.name;
            res.status(200).send(genre);
        }
        else {
            res.status(400).send("The genre name should be between 3 and 15 characters.");
        }
    }
});


//HTTP DELETE REQUESTS
app.delete('/api/genres/:id', (req,res)=>{
    const genre = genres.find(c=>c.id === parseInt(req.params.id));
    if(!genre){
        res.status(400).send("The genre with the given ID was not found");
        return
    }
    else {
        genres.splice(genres.indexOf(genre));
        res.status(200).send("Genre was deleted.");
    }
});

app.listen(3000, ()=> {
    console.log('Listening on port 3000 ...')
})

/*
(1) how programs communicate in what order to each other for a given purpose, 
(2) what you learned in this project and 
(3) how can this project be further extended.


*/