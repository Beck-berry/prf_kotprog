const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const LocalStrategy = require('passport-local').Strategy;
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const bcrypt = require('bcrypt');
const allowedOrigins = ['http://localhost:4200', 'http://localhost:3000'];
const app = new express();
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
require('dotenv').config();
const http = require('http');
const path = require('path');

let userObj;
let cicak;

const dbUrl = process.env.MONGOURL;
const dbNev = "prfdb"
const client = new MongoClient(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const validatePassword = (lpw, password) => {
  return bcrypt.compareSync(lpw, password);
};

client.connect(function(err, db) {
  if (err) throw err;
  const dbo = db.db(dbNev);
  dbo.collection("Kittens").find({}).toArray((err, result) => {
    if (err) throw err;
    cicak = result;
  });
});
client.close();

app.use(cors({
  /*origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },*/
  credentials: true
}));

passport.serializeUser(function (user, done) {
  if(!user) return done("Hiba - nincs ilyen felhasználó", undefined);
  userObj = user;
  return done(null, user);
});

passport.deserializeUser(function (user, done) {
  if(!user) return done("Hiba - nincs belépve felhasználó", undefined);
  userObj = null;
  return done(null, user);
});

passport.use('local',
  new LocalStrategy.Strategy({},(username, password, done) => {
    client.connect(function(err, db) {
      if (err) throw err;
      const dbo = db.db(dbNev);
      dbo.collection("Users").find({ username }).toArray((err, result) => {
        if (err) throw err;
        client.close();
        if (result[0] && result[0].username === username && validatePassword(password, result[0].password)) {
          return done(null, {username: result[0].username});
        } else {
          return done('[Auth] error', null);
        }
      });
    });
  })
);

app.use(session({secret: 'prf_bead'}));
app.use(passport.initialize({}));
app.use(passport.session({}));

app.post('/login', (req, res) => {
  if(req.body.username && req.body.password) {
    passport.authenticate('local', {}, (error, user) => {
      if(error) {
        console.log(error);
        return res.status(403).send(error);
      } else {
        req.logIn(user, (error) => {
          if(error) return res.status(500).json({ "statusCode": 500 }).send(error);
          return res.status(200).json({ "statusCode": 200 });
        });
      }
    })(req, res);
  } else {
    res.status(400).send("Hiányzó usernév vagy jelszó");
  }
});

app.get('/logout', (req, res) => {
  req.logOut();
  res.status(200).json({ "statusCode": 200 });
});

app.use(express.static(path.join(__dirname, 'public'), {}))
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'), { root: __dirname })
})

app.post('/home', (req, res) => {
  res.send(cicak);
})

app.post('/checkout', (req, res) => {
  if (req.body.kittens) {
    let ks = req.body.kittens;
    ks.forEach(k => {
      sendDataToSpringServer("/addTransaction",{
        id: k.id,
        date: Date.now(),
        price: k.price
      })
      sendDataToSpringServer("/addKitten",{
        id: k.id,
        price: k.price
      })
    });
    res.status(200).send("Sikeres vásárlás!")
  }
})

function sendDataToSpringServer(path, obj){
  let tr = JSON.stringify(obj)
  let req = http.request({
    host: process.env.SPRING_URL,
    port: process.env.SPRING_PORT,
    path: path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': tr.length
    }
  });
  req.write(tr);
  req.end();
}

app.listen(process.env.PORT, () => {
  console.log('App is running at ', process.env.PORT)
});
