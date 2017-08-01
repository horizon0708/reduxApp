var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var multer = require('multer');


// APIs
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/bookshop');
mongoose.connect('mongodb://admin:runescape@ds127443.mlab.com:27443/reduxstore');

var Books = require('./models/books.js');
var db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - connection error:  '));

//-- set up session -- 
app.use(session({
  secret: 'mySecretString',
  saveuninitialized: false,
  resave: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 2 },
  store: new MongoStore({ mongooseConnection: db, ttl: 2 * 24 * 60 * 60 })
}));
// save to session
app.post('/cart', function (req, res) {
  var cart = req.body;
  req.session.cart = cart;
  req.session.save(function (err) {
    if (err) {
      console.log(err);
    }
    res.json(req.session.cart);
  })
});

app.get('/cart', function (req, res) {
  if (typeof req.session.cart !== 'undefined') {
    res.json(req.session.cart)
  }
});

// images api
app.get('/images', function (req, res) {
  const imgFolder = __dirname + '/public/images/';
  const fs = require('fs');
  fs.readdir(imgFolder, function (err, files) {
    if (err) {
      return console.error(err);
    }
    const filesArr = [];

    files.forEach(function (file) {
      filesArr.push({ name: file });
    })

    res.json(filesArr);
  })
})


// Images upload api

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + '-' + Date.now() +"."+ extension)
  }
})

var upload = multer({ storage: storage }).single('image');

app.post('/upload', function(req,res){
  upload(req, res, function (err) {
    if (err) {
      // An error occurred when uploading
      return
    }
    res.json(req.file)
    
    // Everything went fine
  })
})


// -- >> POST BOOKS <<__

app.post('/books', function (req, res) {
  var book = req.body;

  Books.create(book, function (err, books) {
    if (err) {
      console.log(err);
    }
    res.json(books);
  })
});


// GET BOOKS
app.get('/books', function (req, res) {
  Books.find(function (err, books) {
    if (err) {
      console.log(err);
    }
    res.json(books);
  })
});

// FETCH BOOK BY ID
var ObjectId = require('mongodb').ObjectID;

app.get('/books/:_id', function (req,res){
  var query = {_id: new ObjectId(req.params._id) }
  
  Books.findOne(query, function(err ,book){
    if(err){
      console.log(err)
    }
    res.json(book);
  })
})


// DELETE

app.delete('/books/:_id', function (req, res) {
  var query = { _id: req.params._id };
  Books.remove(query, function (err, books) {
    if (err) {
      console.log(err);
    }
    res.json(books);
  })
})

// UPDATE

app.put('/books/:_id', function (req, res) {
  var book = req.body;
  var query = req.params._id;
  var update = {
    '$set': {
      title: book.title,
      description: book.description,
      image: book.image,
      price: book.price
    }
  };
  var options = { new: true };

  Books.findOneAndUpdate(query, update, options, function (err, books) {
    if (err) {
      console.log(err);
    }
    res.json(books);
  })
})



// END APIs

app.listen(3001, function (err) {
  if (err) {
    return console.log(err);
  }
  console.log('API Server is listening on http://localhost:3001');
})
module.exports = app;
