const express = require('express');
const mongoose = require('mongoose');
const app = express();
const { Movies } = require('./model/movies')
const cors = require('cors');

mongoose.set('strictQuery', false);
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://0.0.0.0:27017/finalTS')
    .then(()=> console.log("connect to DB"))
    .catch(()=> console.log("could not connect to DB"))



app.get('/movies', async (req,res)=> {
   const movie = await Movies.find({"imdb.rating": {"$gt": 8},
    "poster": {"$exists": true}})
    .select("title imdb.rating poster languages");

    res.json(movie);
})

app.listen(9000, ()=> console.log("Listen on port 9000"));
