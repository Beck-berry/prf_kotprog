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

let userObj;

const dbUrl = process.env.MONGOURL;
const dbNev = "prfdb"
const client = new MongoClient(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const generateHash = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

const validatePassword = (lpw, password) => {
  return bcrypt.compareSync(lpw, password);
};

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));

passport.serializeUser(function (user, done) {
  if(!user) return done("Hiba - nincs user", undefined);
  userObj = user;
  return done(null, user);
});

passport.deserializeUser(function (user, done) {
  if(!user) return done("Hiba - nincs user, akit kileptethetnenk", undefined);
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
        console.log(error)
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

const isLoggedIn = (req, res, next) => {
  if (userObj) {
    return next()
  }
  return res.status(400).json({"statusCode": 400, "message": "not authenticated"})
};

app.post('/register', (req, res) => {
  const user = req.body;
  client.connect((err, db) => {
    if (err) throw err;
    const originalPwd = user.password;
    user.password = generateHash(originalPwd);
    const dbo = db.db(dbNev);
    dbo.collection("Users").insertOne(user, function(err, res) {
      if (err) throw err;
      console.log("Successful registration!");
    });
  });
  client.close();
  res.status(200).json({ "statusCode": 200 });
});

app.get('/logout', isLoggedIn, (req, res) => {
  req.logout();
  res.status(200).json({ "statusCode": 200 });
});

const angularPath = '../frontend/dist/PRF';
app.use(express.static(angularPath, {}))
app.get('/', function (req, res) {
  res.sendFile(angularPath + '/index.html', { root: __dirname })
})

app.post('/home', (req, res) => {
  client.connect(function(err, db) {
    if (err) throw err;
    const dbo = db.db(dbNev);
    dbo.collection("Kittens").find({}).toArray((err, result) => {
      if (err) throw err;
      client.close();
    });
  });
})

app.listen(process.env.PORT, () => {
  console.log('App is running at ', process.env.PORT)
});
