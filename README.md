# sequelize-relations-lab

## Define a relationship

Considering a one-to-many relationship for artists and their records, Sequelize offers `hasMany` and `belongsTo` methods on each model to register these relationships.

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

A model with relationships defined will have a `setOtherModel()` method defined, to establish a relationship. When creating data in your seed.js file, you'll want to set these relationships:

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
