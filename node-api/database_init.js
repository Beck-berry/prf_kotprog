require('dotenv').config();
const bcrypt = require('bcrypt');
const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGOURL;
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
const dbNev = "prfdb"

client.connect((err, db) => {
  if (err) throw err;
  console.log("Database connected!");
  const uCollection = db.db(dbNev).collection("Users");
  const zoliUser = { username: "szaboz", password: bcrypt.hashSync("PRF2021", bcrypt.genSaltSync(10), null) };
  uCollection.insertOne(zoliUser, function(err, res) {
    if (err) throw err;
    console.log("User added!");
  });

  const kCollection = db.db(dbNev).collection("Kittens");
  let ujCicaList = [
      { id: '1', name: 'Cukorfalat', desc: 'Legédesebb', price: '542', image: 'assets/cuki.jpg' },
      { id: '2', name: 'Béla', desc: 'Legfélénkebb', price: '542', image: 'assets/bela.jpg' },
      { id: '3', name: 'Rozi', desc: 'Legszebb', price: '542', image: 'assets/rozi.jpg' },
      { id: '4', name: 'Szimbád', desc: 'Legbátrabb', price: '542', image: 'assets/szimbad.png' },
      { id: '5', name: 'Garfield', desc: 'Legvörösebb', price: '542', image: 'assets/garfield.webp' },
      { id: '6', name: 'Z', desc: 'Legvagányabb', price: '542', image: 'assets/z.png' },
      { id: '7', name: 'Mancs', desc: 'Legzabálósabb', price: '542', image: 'assets/mancs.jpg' },
      { id: '8', name: 'Picúr', desc: 'Legnyávogósabb', price: '542', image: 'assets/picur.jpg' },
      { id: '9', name: 'Tigris', desc: 'Legkisebb', price: '542', image: 'assets/tigris.jpg' },
      { id: '10', name: 'Maki', desc: 'Leggyorsabb', price: '542', image: 'assets/maki.jpeg' }
  ];
  kCollection.insertMany(ujCicaList, function(err, res) {
    if (err) throw err;
    console.log("Kittens added!");
  });
});

client.close();
