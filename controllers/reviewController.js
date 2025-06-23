const books = require("../models/books");

exports.addorupdatereview=(req,res)=>{
    const book = books.find(b=>b.isbn === req.params.isbn);
    if(!book){
        return res.status(404).json({message:"Book Not found."});
    }
    const {review} = req.body; // review extract kar liye html file se
    const existing = book.reviews.find(r=> r.user===r.user.username);
    if(existing){
        existing.review=review;// yah previous review ko update kar diya hai.
    }
    else{
        book.reviews.push({user:req.user.username,review});
    }
    res.json({message:"Review added/updated",reviews:book.reviews});
};

exports.deleteReview= (req,res) =>{
    const book = books.find(b => b.isbn===req.params.isbn);
    if(!book){
        return res.status(404).json({message:"Book Not found."});
    }
    book.reviews = book.reviews.filter(r=>r.user !== req.user.username);
    res.json({message:"Review Deleted.",reviews: book.reviews});
};
