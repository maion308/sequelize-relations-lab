# Sequelize Relations Lab

### Getting Started
Create a new project folder and `cd` into that folder. Run `npm init`. 

Add Sequelize to your project:

```
npm install sequelize
```

Install the Postgres JavaScript library for sequelize to use:

```
npm install pg
```

If you don't have it globally installed, install Nodemon:

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

Once you've successfully set up your project folder, go back to your terminal and `git add .` and `git commit -m "initial commit"`. Great work!

### Basic Building Blocks

###### models.js
Import and instantiate Sequelize.

```
const Sequelize = require('sequelize');

const db = new Sequelize({
  database: <database name>,
  dialect: 'postgres'
});

// create models for Author and Book (HOLD OFF FOR NOW, INSTRUCTIONS FOR THIS BELOW)
// establish relationships between your models (HOLD OFF FOR NOW, INSTRUCTIONS FOR THIS BELOW)

module.exports = {
  Author,
  Book,
  db
};
```

###### seed.js
In your `seed.js` folder, import your `Author` and `Book` models. Then, create an async function to 1) make sure the database is empty, 2) create your new instances of authors and books, and 3) establish the relationships between those instances.

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
  // (HOLD OFF FOR NOW, INSTRUCTIONS FOR THIS BELOW)
  
 };
 
 main();
```

###### server.js
Import and instantiate Express and establish your port.

```
const express = require('express');
const { Author, Book } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000

// establish routes (HOLD OFF FOR NOW, INSTRUCTIONS FOR THIS BELOW)

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
```

### Define a relationship

Considering a one-to-many relationship for artists and their records, Sequelize offers `hasMany` and `belongsTo` methods on each model to register these relationships. You'll want to establish these relationships in your `models.js` file. For your file, you'll be creating `Author` and `Book` models, but you can use the below as a guide:

```
const Author = db.define('author', {
  name: Sequelize.STRING
});

const Book = db.define('book', {
  title: Sequelize.STRING,
  year: Sequelize.INTEGER,
  book_image_url: Sequelize.STRING,
  description: Sequelize.TEXT
});

Author.hasMany(Book, { onDelete: 'cascade' });
Book.belongsTo(Author);

// The onDelete: cascade bit here deletes the books an author has
// if an author is deleted. This avoids us having to delete the books
// first, then deleting the author.

```

### Syncing your models
In your `resetDb.js` file, add the following code to make the tables in our database based on our models defined in the `models.js` file.

```js
const { sequelize } = require('./models');

const main = async () => {
  await sequelize.sync({force: true});
  process.exit();
}

main();
```

### Relating two instances

A model with relationships defined will have a `setOtherModel()` method defined, to establish a relationship. When creating data in your `seed.js` file, you'll want to set these relationships:

```js
const austen = await Author.create({
  name: 'Jane Austen'
});

const pride = await Book.create({
  title: 'Pride and Prejudice',
  year: 1813,
  cover_image_url: 'https://cdn.theatlantic.com/media/old_wire/img/upload/2013/01/14/9780307950901_p0_v1_s260x420.jpeg',
  description: 'In a remote Hertfordshire village, far off the good coach roads of George III\'s England, a country squire of no great means must marry off his five vivacious daughters.'
});

await pride.setAuthor(austen);
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


### Accessing related instances

Models also have `getOtherModel()` methods to query related instances. You can use this method in your `server.js` file to get all of the books that belong to an author:

```
const austen = await Author.findByPk(1);
const austenBooks = await austen.getBooks();
// [ { title: 'Pride and Prejudice', year: 1813, ... }];
```

### Test it out
Run `npm start`, open `localhost:3000` on your browser, visit each of your endpoints, and check to make sure the correct data is being displayed.

### BONUS

Refactor the project to use [Express Router](https://expressjs.com/en/api.html#express.router). This will involve creating a `bookRouter` and `authorRouter` moving over all the routes previously contained in the `server.js` to the routes folder.

# Great work!
