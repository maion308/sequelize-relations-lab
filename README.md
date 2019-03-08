# sequelize-relations-lab

## Getting Started
Create a new project folder and `cd` into that folder. Run `npm init`. 

Add Sequelize to your project:

```
npm install sequelize
```

Install the Postgres JavaScript library for sequelize to use:

```
npm install pg
```

Install Nodemon:

```
npm install nodemon
```

Create your database:

```
createdb <database name>
```

Run `psql` and check `\l` to make sure your database was created. If you see it there, you can exit `psql`. Next, add some files into your project folder:

```
touch server.js resetDb.js seed.js model.js .gitignore
```

Open your project in your text editor. Make sure to put `node_modules` in your `.gitignore` file. Also, go to your `package.json` file and make sure Sequelize, Nodemon, and Express are in your dependencies. Also, add the following scripts:

```
"start": "nodemon server.js",
"resetDb": "node resetDb.js"
```

Once you've successfully come this far, go back to your terminal and `git add .` and `git commit -m "initial commit"`. Great work!

## Basic Building Blocks

### models.js
Import and instantial sequelize. 
```
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const sequelize = new Sequelize({
  database: <database name>,
  dialect: 'postgres',
  operatorsAliases: Op,
});

// create models for Author and Book

// establish relationships between your models

module.exports = {
  Author,
  Book,
  sequelize
};
```

### seed.js
In your seed.js folder, import your Author and Book models. Then, create an async function to 1) make sure the database is empty, 2) create your new instances of authors and books, and 3) establish the relationships between those instances.

```
const { Author, Book } = require('./models');

const main = async () => {
  // Delete everything in the database.
  await Book.destroy({
    where: {}
  });
  await Author.destroy({
    where: {}
  });
  
  // create books and authors and relationships here
  
 };
 
 main();
```

### server.js
Import and instantiate Express and establish your port.

```
const express = require('express');
const { Author, Book } = require('./models');

const app = express();
const port = process.env.PORT || 3000

// establish routes

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
```



## Define a relationship

Considering a one-to-many relationship for artists and their records, Sequelize offers `hasMany` and `belongsTo` methods on each model to register these relationships. You'll want to establish these relationships in your `models.js` file. For your file, you'll be creating Author and Book models, but you can use the below as a guide:

```
const Artist = sequelize.define('artist', {
  name: Sequelize.STRING
});

const Record = sequelize.define('record', {
  title: Sequelize.STRING,
  year: Sequelize.INTEGER,
  cover_image_url: Sequelize.STRING
});

Artist.hasMany(Record, { onDelete: 'cascade' });
Record.belongsTo(Artist);

// The onDelete: cascade bit here deletes the records an artist has
// if an artist is deleted. This avoids us having to delete the records
// first, then deleting the artist.

```

## Syncing your models
In your `resetDb.js` file, add the following code to make the tables in our database based on our models defined in the `models.js` file.

```js
const { sequelize } = require('./models');

const main = async () => {
  await sequelize.sync({force: true});
  process.exit();
}

main();
```

## Relating two instances

A model with relationships defined will have a `setOtherModel()` method defined, to establish a relationship. When creating data in your `seed.js` file, you'll want to set these relationships:

```js
const beyonce = await Artist.create({
  name: 'Beyoncé'
});

const lemonade = await Record.create({
  title: 'Lemonade',
  year: 2016,
  cover_image_url: 'https://cdn.shopify.com/s/files/1/0993/9646/products/SNY533682CD.jpg',
});

await lemonade.setArtist(beyonce);
```

Go ahead and create several authors and books that belong to those authors. Once you've finished creating your seed data, make sure everything is saved, go back to your terminal, and run the following commands:

```
npm resetDb
node seed.js

```

Great work. For your final step, you'll need to move to your `server.js` file and add your routes. Let's add the following:

```
/authors (shows all authors)
/books (shows all books)
/authors/:id/books (shows all books by a particular author)
```


## Accessing related instances

Models also have `getOtherModel()` methods to query related instances. You can use this method in your `server.js` file to get all of the books that belong to an author, or in the example below, all of the records that belong to an artist:

```
const beyonce = await Artist.findByPk(1);
const beyoncesRecords = await beyonce.getRecords();
// [ { title: 'Lemonade', year: 2016, ... }];
```

# Great work!
