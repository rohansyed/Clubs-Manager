var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var nodemailer = require('nodemailer');
var mysql = require('mysql');
var image_name = '';

let transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'dorris26@ethereal.email',
    pass: 'vx7GG512qEtAWS1hW6'
  }
});

var multer = require('multer');
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/club_banners');
  },
  filename: (req, file, cb) => {
    //  console.log(file);
    image_name = new Date();
    image_name = image_name.toISOString().slice(0, 19).replace(":", ".");
    cb(null, image_name + file.originalname);
    image_name = image_name + file.originalname;
  }
});


const upload = multer({ storage: storage });

const dbConnectionPool = mysql.createPool({
  host: 'localhost',
  // user: 'username',
  // password: 'password',
  database: 'clubsite'
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(function (req, res, next) {
  req.pool = dbConnectionPool;
  next();
});




app.post("/create_new_club", upload.single("image"), (req, res) => {
  const name = req.body.title;
  const desc = req.body.description;
  const usr = req.body.username;
  const img = image_name;

  req.pool.getConnection(function (cerr, connection) {
    if (cerr) {
      res.sendStatus(500);
      return;
    }

    var query = "INSERT INTO club (club_name, club_desc, founded_date, username, club_banner) VALUES ('" + name + "','" + desc + "', (SELECT CURRENT_TIMESTAMP),'" + usr + "','" + image_name + "')";

    connection.query(query, function (qerr, rows, fields) {
      if (qerr) {
        // console.log(qerr);
        res.sendStatus(500);
        return;
      }
    });
    var query2 = "SELECT club_id FROM club WHERE club_banner='" + image_name + "'";
    console.log(query2);
    connection.query(query2, function (qerr, rows, fields) {
      connection.release();
      if (qerr) {
        // console.log(qerr);
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    });
  });

});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* Login Session Middleware Setup */
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'knightsofwebdevelopment',
  secure: false
}));

app.post('/email', function (req, res, next) {

  const rcp = req.body.recipient;
  // console.log("-----------"+to_list);
  const sbj = req.body.subject;
  const bdy = req.body.text;
  const name = req.body.club_name;

  let info = transporter.sendMail({
    from: 'hotspots@ethereal.email',
    to: rcp,
    subject: 'New ' + sbj + ' from ' + name,
    text: bdy
  });

  res.send();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
