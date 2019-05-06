# Sequelize Relations Lab

### Getting Started
Create a new project folder and `cd` into that folder. Run `npm init`. 

Add Sequelize to your project:

```bash
npm install sequelize
```

Install the Postgres JavaScript library for sequelize to use:

```bash
npm install pg
```

If you don't have it globally installed, install Nodemon:

```bash
npm install nodemon
```

Create your database:

```bash
createdb <database name>
```

Run `psql` and check `\l` to make sure your database was created. If you see it there, you can exit `psql`. Next, add some files into your project folder:

```bash
touch server.js resetDb.js seed.js model.js .gitignore
```

Open your project in your text editor. Make sure to put `node_modules` in your `.gitignore` file. Also, go to your `package.json` file and make sure Sequelize, Nodemon, and Express are in your dependencies. Also, add the following scripts:

```js
"start": "nodemon server.js",
"resetDb": "node resetDb.js"
```

Once you've successfully set up your project folder, go back to your terminal and `git add .` and `git commit -m "initial commit"`. Great work!

### Basic Building Blocks

###### models.js
Import and instantiate Sequelize.

```js
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

```js
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

```js
const express = require('express');
const { Author, Book } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000

// establish routes (HOLD OFF FOR NOW, INSTRUCTIONS FOR THIS BELOW)

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
```

### Define a relationship

Considering a one-to-many relationship for artists and their records, Sequelize offers `hasMany` and `belongsTo` methods on each model to register these relationships. You'll want to establish these relationships in your `models.js` file. For your file, you'll be creating `Author` and `Book` models, but you can use the below as a guide:

```js
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

```bash
npm resetDb
node seed.js

```

Great work. For your final step, you'll need to move to your `server.js` file and add your routes. Let's add the following:

```md
/authors (shows all authors)
/books (shows all books)
/authors/:id/books (shows all books by a particular author)
```


### Method 1: Accessing related instances

Models also have `getOtherModel()` methods to query related instances. You can use this method in your `server.js` file to get all of the books that belong to an author:

```js
const austen = await Author.findByPk(1);
const austenBooks = await austen.getBooks();
// [ { title: 'Pride and Prejudice', year: 1813, ... }];
```

### Method 2: Eager Loading

When we use the above method to access the related instance, we lose out on being able to return both without an object assignment. However, by implementing [_eager loading_](https://sequelize-guides.netlify.com/eager-loading/), we're able to _include_ a related resource within the query.
```js
// with given Author & Book models
// Author.hasMany(Book);

app.get('/Authors', async (req, res) => {
  try {
    const Authors = await Author.findAll({
        include: [ Book ]       
    });
    res.send(Authors);  
  } catch (e) {
    res.status(500).json({ msg: e.message  });             
   }       
});
```

A sample response might look like:

```js
{
  "name": 'Kurt Vonnegut',
  "books": [
    {
      "title": "Slaughterhouse Five",
      "year": 1969,
      "book_image_url": "https://images-na.ssl-images-amazon.com/images/I/71QcX1DbklL.jpg",
      "description": "a science fiction-infused anti-war novel by Kurt Vonnegut about the World War II experiences of Billy Pilgrim."
    },
    {
      "title": "Cat's Cradle",
      "year": 1963,
      "book_image_url": "https://images-na.ssl-images-amazon.com/images/I/81NIfUlv2DL.jpg",
      "description": "explores issues of science, technology, and religion, satirizing the arms race and many other targets along the way."
    },
    {
      "title": "Breakfast of Champions",
      "year": 1973,
      "book_image_url": "https://images.gr-assets.com/books/1327934446l/4980.jpg",
      "description": "is set predominantly in the fictional town of Midland City, Ohio and focuses on two characters: Dwayne Hoover, a Midland resident, Pontiac dealer and affluent figure in the city and Kilgore Trout, a widely published but mostly unknown science fiction author."
    }
  ]
}
```

### Test it out
Run `npm start`, open `localhost:3000` on your browser, visit each of your endpoints, and check to make sure the correct data is being displayed.

### BONUS

Refactor the project to use [Express Router](https://expressjs.com/en/api.html#express.router). This will involve creating a `bookRouter` and `authorRouter` moving over all the routes previously contained in the `server.js` to the routes folder.

# Great work!
