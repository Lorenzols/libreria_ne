var genre = require('../models/genre');
var Book = require("../models/book");

var async = require('async');

const {body, validationResult} = require('express-validator');
const {validate} = require('../models/genre');

//Se muestran todos los genrees

exports.genre_list = function(req, res){
    genre.find()
    .sort([['name', 'ascending']])
    .exec(function(err, list_genres){
    if (err) {return next(err);}
        res.render('genre_list',{title: 'Genre List', genre_list: list_genres});
    });
}

//Muestra detalles del genre

exports.genre_detail = function(req, res, next){
    async.parallel({
        genre: function(callback){
            genre.findById(req.params.id)
                .exec(callback)
        },

        genre_books: function(callback){
            Book.find({'genre': req.params.id})
                .exec(callback)
        }
    },
    function(err, results){

        if (err) {return next(err)}
        if (results.genre==null){
            var err = new Error('Genre not found')
            err.status = 404;
            return next(err)
        }
    
        res.render('genre_detail', {title: 'Genre Detail', genre: results.genre, genre_books: results.genre_books})
    }    
)}



// -----------------------


exports.genre_create_get = function (req, res, next) {
    res.render("genre_form", {title: 'Create Genre'});
};

exports.genre_create_post = [

    //Validamos datos
    body('name', 'Genre name required').trim().isLength({min:1}).escape(),
  
    (req, res, next) => {
  
      const errors = validationResult(req);
  
      var genre = new Genre({
        name: req.body.name
      });
  
      if (!errors.isEmpty()){
  
        res.render('genre_form', {title: 'Crete Genre', genre: genre, errors: errors.array()});
        return;
  
      }else {
  
        Genre.findOne({name: req.body.name})
          .exec(function(err, found_genre){
            if (err) {return next(err)}
  
            if (found_genre){
              res.redirect(found_genre.url);
            } else {
  
              genre.save(function(err){
  
                if (err) { return next(err)}
                res.redirect(genre.url);
  
              });
            }
          });
      }
    }
  ]

// ------------------------------


//Fromulario pàra crear genrees con GET

// exports.genre_create_get = function(req, res, next){
//     res.send("genre_form", {title: 'Create Genre'});
// }

// //Manejador de genre con POST

// exports.genre_create_post = function(req, res){

//     body('name', 'Genre name required').trim().isLength({min:1}).escape(),

//     (req, res, next) => {
//         const errors = validationResult(req);

//         var genre = new Genre({
//             name: req.body.name
//         });

//         if (!errors.isEmpty()){
//             res.render('genre_form', {title: 'Create Genre', genre: genre, errors: errors.array()});
//             return;
//         }
//         else{
//             Genre.findOne({name: req.body.name})
//             .exec(function(err, found_genre){
//                 if (err) {return next(err)}

//                 if (found_genre){
//                     res.redirect(found_genre_url);
//                 } else {
//                     genre.save(function(err){
//                         if (err) {return next(err)}
//                         res.redirect(genre.url);
//                     })
//                 }
//             })
//         }
//     }

//     res.send("NOT IMPLEMENTED NOW: genre create POST");
// }


//Formulario de delete para genre GET (DISPLAY)

exports.genre_delete_get = function(req, res){
    res.send("NOT IMPLEMENTED NOW: genre Delete GET");
}

//Formulario de delete para genre POST (DISPLAY)

exports.genre_delete_post = function(req, res){
    res.send("NOT IMPLEMENTED NOW: genre Delete POST");
}


//Formulario de update para genre GET (DISPLAY)

exports.genre_update_get = function(req, res){
    res.send("NOT IMPLEMENTED NOW: genre Update GET");
}

//Formulario de update para genre POST (DISPLAY)

exports.genre_update_post = function(req, res){
    res.send("NOT IMPLEMENTED NOW: genre Update POST");
}