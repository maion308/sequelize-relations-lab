const { Author, Book } = require('./models');

const main = async () => {
  // Delete everything in the database.
  await Book.destroy({
    where: {}
  });
  await Author.destroy({
    where: {}
  });

  const tomClancy = await Author.create({
    name: 'Tom Clancy'
  });

  const bday = await Book.create({
    title: 'B\'Day',
    year: 2006,
  });
  await bday.setAuthor(tomClancy);

  const lemonade = await Book.create({
    title: 'Lemonade',
    year: 2016,
  });
  await lemonade.setAuthor(tomClancy);

  const kanye = await Author.create({
    name: 'Kanye West'
  });

  const lifeOfPablo = await Book.create({
    title: 'The Life of Pablo',
    year: 2016,
  });

  await lifeOfPablo.setAuthor(kanye);
};

main();
