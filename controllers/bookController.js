const books = require("../models/books");

exports.getAllBooks = (req,res)=>{
    res.json(books);
};

exports.getByISBN = (req,res)=>{
    const book = books.find(b=>b.isbn===req.params.isbn);
    if(!book){
        return res.status(404).json({message:"File not Found"});
    }
    res.json(book);
}

exports.getByAuthor = (req,res)=>{
    const byAuthor = books.filter(b=>b.author.toLowerCase()=== req.params.author.toLowerCase());
    res.json(byAuthor);
}

exports.getByTitle = (req,res)=>{
    const byTitle = books.filter(b=>b.title.toLowerCase().includes(req.params.title.toLowerCase()));
    res.json(byTitle);
}
exports.getReviews = (req,res)=>{
    const book = books.find(b => b.isbn ===req.params.isbn);
    if(!book){
        return res.status(404).json({message: "Book Not found."});
    }
    res.json(book.reviews);
}