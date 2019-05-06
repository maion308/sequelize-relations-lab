const Sequelize = require('sequelize');

const db = new Sequelize({
  database: 'author_book_db',
  dialect: 'postgres'
});

const Author = db.define('author', {
  name: Sequelize.STRING
});

const Book = db.define('book', {
  title: Sequelize.STRING,
  year: Sequelize.INTEGER,
  book_image_url: Sequelize.STRING,
  description: Sequelize.TEXT
});

Author.hasMany(Book, { onDelete: 'cascade' })
Book.belongsTo(Author)

module.exports = {
  Author,
  Book,
  db
}
