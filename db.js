var mongoose = require("mongoose");

var mongoDB = 'mongodb://localhost/local_library';

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology:true});

var db = mongoose.connection;

db.on('error', console.error.bind(console, "Fallo conexion DB!!"));
db.once('open', ()=>{
    console.log("Conectado");
});