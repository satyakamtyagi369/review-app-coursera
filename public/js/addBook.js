// public/js/addBook.js
document.getElementById("addBookForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please login first.");
    window.location.href = "login.html";
    return;
  }

  const bookData = {
    isbn: document.getElementById("isbn").value,
    title: document.getElementById("title").value,
    author: document.getElementById("author").value,
    genre: document.getElementById("genre").value,
    description: document.getElementById("description").value,
    imageUrl: document.getElementById("imageUrl").value,
  };

  try {
    const res = await fetch("/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(bookData)
    });

    const result = await res.json();
    document.getElementById("message").innerText = result.message;
  } catch (err) {
    console.error("Error adding book:", err);
    alert("Failed to add book.");
  }
});
