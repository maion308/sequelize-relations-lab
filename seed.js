const { Author, Book } = require('./models');

const main = async () => {
  // Delete everything in the database.
  await Book.destroy({
    where: {}
  });
  await Author.destroy({
    where: {}
  });

  const taro = await Author.create({
    name: 'Taro Gomi'
  });

  const poops = await Book.create({
    title: 'Everyone Poops',
    year: 1993,
  });
  await poops.setAuthor(taro);

};

main();
