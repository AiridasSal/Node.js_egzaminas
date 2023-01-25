/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();
const cors = require('cors');

const { MongoClient } = require('mongodb');

app.use(cors());

// eslint-disable-next-line consistent-return
async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

app.post('/api/fill/', async (req, res) => {
  const url = 'https://jsonplaceholder.typicode.com/users';
  const data = await fetchData(url);
  const users = data.map((user) => {
    const address = Object.values(user.address);
    address.splice(-1, 1);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      address: address.join(', '),
    };
  });
  MongoClient.connect(process.env.DB_URL, { useNewUrlParser: true }, (err, client) => {
    if (err) {
      console.log(err);
    } else {
      const db = client.db('nodejs_egzaminas');
      const collection = db.collection('users_db');
      collection.insertMany(users, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Inserted users into the collection');
          client.close();
        }
      });
    }
  });
});
app.use(express.json());

app.post('/api/users', (req, res) => {
  const users = req.body;
  MongoClient.connect(process.env.DB_URL, { useNewUrlParser: true }, (err, client) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error connecting to the database');
    } else {
      const db = client.db('nodejs_egzaminas');
      const collection = db.collection('users_db');
      collection.insertMany(users, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send('Error inserting users into the collection');
        } else {
          console.log('Inserted users into the collection');
          client.close();
          res.status(200).send('Users inserted successfully');
        }
      });
    }
  });
});
app.get('/api/users', (req, res) => {
  MongoClient.connect(process.env.DB_URL, { useNewUrlParser: true }, (err, client) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error connecting to the database');
    } else {
      const db = client.db('nodejs_egzaminas');
      const collection = db.collection('users_db');
      collection.find({}, {
        projection: {
          _id: 0, id: 1, name: 1, email: 1, address: 1,
        },
      }).toArray((err, users) => {
        if (err) {
          console.log(err);
          res.status(500).send('Error fetching users from the collection');
        } else {
          console.log('Fetched users from the collection');
          client.close();
          res.status(200).json(users);
        }
      });
    }
  });
});

app.get('/api/users/names', (req, res) => {
  MongoClient.connect(process.env.DB_URL, { useNewUrlParser: true }, (err, client) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error connecting to the database');
    } else {
      const db = client.db('nodejs_egzaminas');
      const collection = db.collection('users_db');
      collection.find({}, { projection: { _id: 0, id: 1, name: 1 } }).toArray((err, users) => {
        if (err) {
          console.log(err);
          res.status(500).send('Error fetching users from the collection');
        } else {
          console.log('Fetched users from the collection');
          client.close();
          res.status(200).json(users);
        }
      });
    }
  });
});
app.get('/api/users/emails', (req, res) => {
  MongoClient.connect(process.env.DB_URL, { useNewUrlParser: true }, (err, client) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error connecting to the database');
    } else {
      const db = client.db('nodejs_egzaminas');
      const collection = db.collection('users_db');
      collection.find({}, {
        projection: {
          _id: 0, id: 1, name: 1, email: 1,
        },
      }).toArray((err, users) => {
        if (err) {
          console.log(err);
          res.status(500).send('Error fetching users from the collection');
        } else {
          console.log('Fetched users from the collection');
          client.close();
          res.status(200).json(users);
        }
      });
    }
  });
});
app.get('/api/users/address', (req, res) => {
  MongoClient.connect(process.env.DB_URL, { useNewUrlParser: true }, (err, client) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error connecting to the database');
    } else {
      const db = client.db('nodejs_egzaminas');
      const collection = db.collection('users_db');
      collection.find({}, {
        projection: {
          _id: 0, id: 1, name: 1, address: 1,
        },
      }).toArray((err, users) => {
        if (err) {
          console.log(err);
          res.status(500).send('Error fetching users from the collection');
        } else {
          console.log('Fetched users from the collection');
          client.close();
          res.status(200).json(users);
        }
      });
    }
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${port}`);
});
