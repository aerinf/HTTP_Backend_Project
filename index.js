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
app.get('/api/genres/year/month', (req,res)=>{
    const genre = genres.filter(genre => genre.year=== parseInt(req.params.year) && genre.month=== parseInte(req.params.month));
    if (!genre) {
        res.status(404).send("No results found for " + req.params.year + " " + req.params.month);
        return
    }
    res.status(200).send(genre);
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
1) Programs send each other requests like GET and POST to interact as needed. 
2) I learned how to run the basics of a server by sending GET, POST, PUT, and DELETE requests. 
3) In the future, I could add actual song files and play them. 
*/