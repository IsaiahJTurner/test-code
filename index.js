'use strict';

import express from 'express';
import massive from 'massive';

var app = express();

app.get('/things', (req, res) => {
    massive();
});

app.post('/things', (req, res) => {

});
app.get('/things/:thingId', (req, res) => {
    
});
app.patch('/things/:thingId', (req, res) => {
    
});
app.delete('/things/:thingId', (req, res) => {
    
});
app.listen(process.env.PORT || 3000, () =>
    console.log(`Listening on port ${app.get('port')}`));
