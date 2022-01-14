var Book = require("../models/book");
var Author = require("../models/author");
var BookInstance = require("../models/bookinstance");
var Genre = require("../models/genre");

var async = require('async');
const {body, validationResult} = require('express-validator');


exports.index = function (req, res) {

  async.parallel({

    book_count: function(callback){

      Book.countDocuments({},callback);

    },
    book_instance_count: function(callback){

      BookInstance.countDocuments({}, callback);
    },

    book_instance_available_count:function(callback){

      BookInstance.countDocuments({status: 'Available'}, callback);
    },

    author_count:function(callback){

      Author.countDocuments({}, callback);
    },

    genre_count:function(callback){

      Genre.countDocuments({}, callback);
    }  
  }, function(err, results){

    res.render('index', {title: 'Local Librery Home', error: err, data:results});

  });
};

//Mostramos todos los book

exports.book_list = function (req, res) {

  Book.find({}, 'title author')
    .sort({title: 1})
    .populate('author')
    .exec(function(err, list_books){
      if (err) {return next(err);}

      res.render('book_list',{title: 'Book List', book_list: list_books});
    });
  // res.send("NOT IMPLEMENTED NOW: book List");
};

//Mostrar detalles de un book especifico en una pagina

exports.book_detail = function (req, res) {
  async.parallel({
    book: function(callback){
      Book.findById(req.params.id)
      .populate('author')
      .populate('genre')
      .exec(callback)
    },

    book_instance: function(callback){
      BookInstance.find({'Book': req.params.id})
      .exec(callback)
    }
  },
  function(err, results){

    if (err) {return next(err)}
    if (results.book==null){
      var err = new Error('Book not found')
      err.status = 404;
      return next(err);
    }

    res.render('book_detail', {title: 'Book Detail', book: results.book, book_instances: results.book_instance})
  }
)}

//Formulario para crear bookes con GET (DISPLAY)

exports.book_create_get = function (req, res) {
   
    async.parallel({
      authors: function(callback) {
          Author.find(callback);
      },
      genres: function(callback) {
          Genre.find(callback);
      },
  }, function(err, results) {
      if (err) { return next(err); }
      res.render('book_form', { title: 'Create Book',authors:results.authors, genres:results.genres });
  });
};

//Manejador de create book con POST

exports.book_create_post = function (req, res) {
    (req, res, next) => {
      if(!(req.body.genre instanceof Array)){
          if(typeof req.body.genre==='undefined')
          req.body.genre=[];
          else
          req.body.genre=new Array(req.body.genre);
      }
      next();
  }
};

//Formulario de delete para book GET (DISPLAY)

exports.book_delete_get = function (req, res) {
  res.send("NOT IMPLEMENTED NOW: book Delete GET");
};

//Manejador de delete book con POST

exports.book_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED NOW: book Create POST");
};

//Formulario de update para book GET (DISPLAY)

exports.book_update_get = function (req, res) {
  res.send("NOT IMPLEMENTED NOW: book Update GET");
};

//Manejador de update book con POST

exports.book_update_post = function (req, res) {
  res.send("NOT IMPLEMENTED NOW: book Update POST");
};
