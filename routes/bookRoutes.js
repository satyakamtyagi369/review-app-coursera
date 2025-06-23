const express = require("express");
const {
  getAllBooks,
  getByISBN,
  getByAuthor,
  getByTitle,
  getReviews
} = require("../controllers/bookController");

const router = express.Router();

// GET all books
router.get("/", getAllBooks);

// GET book by ISBN
router.get("/isbn/:isbn", getByISBN);

// GET books by author
router.get("/author/:author", getByAuthor);

// GET books by title
router.get("/title/:title", getByTitle);

// GET reviews for a specific ISBN
router.get("/isbn/:isbn/reviews", getReviews);

module.exports = router;
