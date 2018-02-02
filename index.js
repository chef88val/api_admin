'use strict';

var mongoose =  require('mongoose');
var app = require('./app')
var port = 3800;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/ESAdmin')
    .then(
        (err,db)=>{
            console.log('Conexion a ESAdmin OK')
            //console.log(err,'db',db)
            /* mongoose.Collection(function(err, colls){
                console.log('colls',colls)
            })  */
            //Creando servidor
                app.listen(port,()=>{
                    console.log("Corriendo")
                })
        }
    ).catch(err=>console.log('err',err))