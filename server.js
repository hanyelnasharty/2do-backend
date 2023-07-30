const express = require('express');
const mongoose = require ('mongoose');
const app = express ();
const Task = require('./models/tasks.js');
const cors = require('cors');
app.use(cors());
const db = mongoose.connection;
require('dotenv').config()
const PORT = process.env.PORT

const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI)
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.post('/tasks', (req, res) => {
    Task.create(req.body)
        .then((createdTask) => {
            res.json(createdTask)
    })
})

app.get('/tasks', (req, res) => {
    Task.find({})
        .then((foundTask) => {
            res.json(foundTask)
        })
})

app.delete('/tasks/:id', (req, res) => {
    Task.findByIdAndRemove(req.params.id)
        .then((deletedTask) => {
            res.json(deletedTask)
        })
})

app.put('/tasks/:id', (req, res) => {
    Task.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then((updatedTask) => res.json(updatedTask))
})

app.listen(PORT, () => console.log( 'Listening on port:', PORT));
mongoose.connection.once('open', () => {
    console.log('connected to mongod...');
});