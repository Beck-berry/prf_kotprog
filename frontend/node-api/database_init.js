const bcrypt = require('bcrypt');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://meh:zwfH89QAmamXLqV@prf-cluster.9ul6u.mongodb.net/prf_bead?retryWrites=true&w=majority&authSource=admin";
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
const dbNev = "prfdb"

client.connect((err, db) => {
  if (err) throw err;
  console.log("Database connected!");
  const collection = db.db(dbNev).collection("Users");
  const zoliUser = { username: "szaboz", password: bcrypt.hashSync("PRF2021", bcrypt.genSaltSync(10), null) };
  collection.insertOne(zoliUser, function(err, res) {
    if (err) throw err;
    console.log("User added!");
  });
});

client.close();
