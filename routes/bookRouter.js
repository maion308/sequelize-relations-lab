const express = require('express')
const { Author, Book } = require('../model')
const bookRouter = express.Router()

bookRouter.get('/', async (req, res) => {
  try {
    const books = await Book.findAll({
      include: [ Author ]
    })
    res.json({
      books
    })
  } catch(e) {
    res.send(500).json({ msg: e.message })
  }
})

bookRouter.get('/:id', async (request, response) => {
  try {
    const id = request.params.id;
    const book = await Book.findByPk(id)

    if (!book) throw Error('Book not found');

    response.json({
      book
    })
  } catch (e) {
    response.status(404).json({ msg: e.message })
  }
})

module.exports = {
  bookRouter
}
