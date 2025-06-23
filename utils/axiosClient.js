const axios = require("axios");

const BASE_URL = "http://localhost:5000/api";

async function getAllBooks(){
    const res = await axios.get(`${BASE_URL}/books`);
    console.log("All Books:",res.data);
}

function getByISBN(isbn){
    return axios.get(`${BASE_URL}/books/isbn/${isbn}`).then(res=> console.log("By ISBN: ",res.data));
}
function getByAuthor(author){
    return axios.get(`${BASE_URL}/books/author/${author}`).then(res => console.log("By Author: ",res.data));
}
function getByTitle(title){
    return axios.get(`${BASE_URL}/books/title/${title}`).then(res => console.log("By Title: ",res.data));
}

module.exports = {getAllBooks,getByAuthor,getByISBN,getByTitle};