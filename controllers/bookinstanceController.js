const book = require('../models/book');
var bookinstance = require('../models/bookinstance');

//Se muestran todos los bookinstancees


exports.bookinstance_list = function (req, res) {

    bookinstance.find()
        .populate('book')
        .exec(function(err, list_bookinstances){
        if (err) {return next(err);}
    
        res.render('bookinstance_list',{title: 'Book Instance List', bookinstance_list: list_bookinstances});
        });
    // res.send("NOT IMPLEMENTED NOW: book List");
    };


//Muestra detalles del bookinstance

exports.bookinstance_detail = function (req, res) {

    bookinstance.findById(req.params.id)
      .populate('book')
      .exec(function(err, bookinstance){
        if (err) {return next(err);}
        if(bookinstance == null){
            var err = new Error('Book copy not found');
            err.status = 404;
            return next(err);
        }


        res.render('bookinstance_detail',{title: 'Copy: '+bookinstance.book.title, bookinstance: bookinstance});
      });
    // res.send("NOT IMPLEMENTED NOW: book List");
  };

//Fromulario pàra crear bookinstancees con GET

exports.bookinstance_create_get = function(req, res){
    res.send("NOT IMPLEMENTED NOW: bookinstance create");
}

//Manejador de bookinstance con POST

exports.bookinstance_create_post = function(req, res){
    res.send("NOT IMPLEMENTED NOW: bookinstance create POST");
}


//Formulario de delete para bookinstance GET (DISPLAY)

exports.bookinstance_delete_get = function(req, res){
    res.send("NOT IMPLEMENTED NOW: bookinstance Delete GET");
}

//Formulario de delete para bookinstance POST (DISPLAY)

exports.bookinstance_delete_post = function(req, res){
    res.send("NOT IMPLEMENTED NOW: bookinstance Delete POST");
}


//Formulario de update para bookinstance GET (DISPLAY)

exports.bookinstance_update_get = function(req, res){
    res.send("NOT IMPLEMENTED NOW: bookinstance Update GET");
}

//Formulario de update para bookinstance POST (DISPLAY)

exports.bookinstance_update_post = function(req, res){
    res.send("NOT IMPLEMENTED NOW: bookinstance Update POST");
}