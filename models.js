const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const sequelize = new Sequelize({
  database: 'authors',
  dialect: 'postgres',
  operatorsAliases: Op,
});

const Author = sequelize.define('author',{
  name: Sequelize.STRING
});

const Book = sequelize.define('book', {
  title: Sequelize.STRING,
  year: Sequelize.INTEGER,
})

// SET UP RELATIONS BETWEEN AUTHOR AND BOOKS


//

sequelize.sync();

module.exports = {
  Author,
  Book,
  sequelize
};
