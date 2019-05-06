const { Author, Book } = require('./model')

const main = async () => {
  await Book.destroy({
    where: {}
  });

  await Author.destroy({
    where: {}
  })

  const austen = await Author.create({
    name: 'Jane Austen'
  });

  const pride = await Book.create({
    title: 'Pride and Prejudice',
    year: 1813,
    book_image_url: 'https://cdn.theatlantic.com/media/old_wire/img/upload/2013/01/14/9780307950901_p0_v1_s260x420.jpeg',
    description: 'In a remote Hertfordshire village, far off the good coach roads of George III\'s England, a country squire of no great means must marry off his five vivacious daughters.'
  });

  const northanger = await Book.create({
    title: 'Northanger Abbey',
    year: 1817,
    book_image_url: 'https://images-na.ssl-images-amazon.com/images/I/51-k8A19NQL.jpg',
    description: 'The satirical novel pokes fun at the gothic novel while earnestly emphasizing caution to the female sex.'
  });

  await pride.setAuthor(austen);
  await northanger.setAuthor(austen);

  const vonnegut = await Author.create({
    name: 'Kurt Vonnegut'
  });

  const breakfast = await Book.create({
    title: 'Breakfast of Champions',
    year: 1973,
    book_image_url: 'https://images.gr-assets.com/books/1327934446l/4980.jpg',
    description: 'Set predominantly in the fictional town of Midland City, Ohio and focused on two characters: Dwayne Hoover, a Midland resident, Pontiac dealer and affluent figure in the city and Kilgore Trout, a widely published but mostly unknown science fiction author.'
  });

  const slaughterhouse = await Book.create({
    title: 'Slaughterhouse Five',
    year: 1969,
    book_image_url: 'https://images-na.ssl-images-amazon.com/images/I/71QcX1DbklL.jpg',
    description: 'A science fiction-infused anti-war novel by Kurt Vonnegut about the World War II experiences of Billy Pilgrim.'
  });

  await breakfast.setAuthor(vonnegut);
  await slaughterhouse.setAuthor(vonnegut);

  process.exit()
}

main()
