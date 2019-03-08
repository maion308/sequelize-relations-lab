const express = require('express');
const { Author, Book } = require('./models');

const app = express();
const port = process.env.PORT || 3000

// START ROUTES -->
app.get('/', (req, res) => res.send('Building an author database!'))

app.get('/authors/:id/books', async (req,res) => {
  try{
    const id = req.params.id
    const author = await Author.findByPk(id)
    const booksData = await author.getBooks()
    const books = booksData.map(book => book.dataValues)
    res.json(
      {
        Books: books,
      }
    )
  } catch(e) {
    console.log(e)
  }

})



// <-- END ROUTES


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
