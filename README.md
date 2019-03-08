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
touch server.js resetdb.js seed.js model.js .gitignore
```

Open your project in your text editor. Make sure to put `node_modules` in your `.gitignore` file.



## Define a relationship

Considering a one-to-many relationship for artists and their records, Sequelize offers `hasMany` and `belongsTo` methods on each model to register these relationships. You'll want to establish these relationships in your `models.js` file.

```js
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

## Accessing related instances

Models also have `getOtherModel()` methods to query related instances:

```js
const beyoncesRecords = await beyonce.getRecords();
// [ { title: 'Lemonade', year: 2016, ... }];
```
