//Aerin Franklin, periods 7-8, Web Development
const express = require('express');
const app = express();
app.use(express.json());

//assign array of music genres with ids
const genres = 
[
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
//root
app.get('/', (req,res)=>{
    res.status(200).send('Welcome to my music app!');
});
//genres
app.get('/api/genres', (req,res)=>{
    if(!genres){
        res.status(404).send("Genres were not found");
        return
    }
    res.status(200).send(genres);
});
//genres by id
app.get('/api/genres/:id', (req,res)=>{
    const genre = genres.find(c=>c.id === parseInt(req.params.id));
    if(!genre){
        res.status(404).send("The genre with the given ID was not found");
        return
    }
    res.status(200).send(genre);
})
//genres by date
app.get('/api/genres/:year/:month', (req,res)=>{
    const genre = genres.filter(genre => genre.year=== parseInt(req.params.year) && genre.month=== parseInte(req.params.month));
    if (genre.length===0) {
        res.status(404).send("No results found for " + req.params.month + "/" + req.params.year);
        return
    }
    else {
        res.status(200).send(genre);
    }
});


//HTTP POST REQUESTS
app.post('/api/genres', (req,res) => {
        const genre ={
            //assign an ID and a name property
            id: genres.length +1,
            name:req.body.name
        }
        if (genre["name"].length>=3 && genre["name"].length<=15) {
        //push it to the array
        genres.push(genre);
        res.status(200).send(genre);
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
        if (req.body.name.length>=3 && req.body.name.length<=15) {
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
        genres.splice(genres.indexOf(genre), 1);
        res.status(200).send("Genre was deleted.");
    }
});

//RUN SERVER
app.listen(3000, ()=> {
    console.log('Listening on port 3000 ...')
})

/*
1) Programs send each other requests like GET and POST to interact as needed. 
2) I learned how to run the basics of a server by sending GET, POST, PUT, and DELETE requests. 
3) In the future, I could add actual song files and play them. 
*/