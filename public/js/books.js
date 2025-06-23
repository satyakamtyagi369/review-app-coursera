let selectedISBN;
const token = localStorage.getItem("token");

window.onload = fetchBooks;

async function fetchBooks() {
  const res = await fetch("/api/books");
  const books = await res.json();
  const container = document.getElementById("booksGrid");
  container.innerHTML = '';
  books.forEach(book => {
    const card = document.createElement("div");
    card.className = "book-card";
    card.innerHTML = `
      <img class="cover" src="https://via.placeholder.com/350x500?text=${book.title}" alt="Cover">
      <div class="info">
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>ISBN:</strong> ${book.isbn}</p>
        <button onclick="showDetails('${book.isbn}')">View Details</button>
      </div>`;
    container.appendChild(card);
  });
}

function showDetails(isbn) {
  selectedISBN = isbn;
  fetchBookDetails(isbn);
  document.getElementById("detailsModal").style.display = "flex";
}

async function fetchBookDetails(isbn) {
  const resBook = await fetch(`/api/books/isbn/${isbn}`);
  const book = await resBook.json();
  document.getElementById("bookDetails").innerHTML = `
    <h2>${book.title}</h2>
    <p><strong>Author:</strong> ${book.author}</p>
    <p><strong>ISBN:</strong> ${book.isbn}</p>`;
  fetchReviews(isbn);
}

document.getElementById("closeModal").onclick = () => {
  document.getElementById("detailsModal").style.display = "none";
  document.getElementById("statusMsg").innerText = "";
};

document.getElementById("logoutBtn").onclick = () => {
  localStorage.removeItem("token");
  window.location.href = "index.html";
};
