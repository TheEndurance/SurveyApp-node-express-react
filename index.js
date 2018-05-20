const express = require('express');
const app = express();

app.get('/',function(req,res){
    res.send({hi:'there'});
})

app.listen(5000);