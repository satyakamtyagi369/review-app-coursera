async function fetchReviews(isbn) {
  const res = await fetch(`/api/books/${isbn}/reviews`);
  const reviews = await res.json();
  const container = document.getElementById("reviewsList");
  container.innerHTML = '<h3>Reviews:</h3>';
  reviews.forEach(r => {
    const div = document.createElement("div");
    div.className = "review";
    div.innerHTML = `<h4>${r.user}</h4><p>${r.review}</p>`;
    container.appendChild(div);
  });
}

document.getElementById("submitReview").addEventListener("click", async () => {
  const text = document.getElementById("reviewText").value.trim();
  if (!text) return alert("Please enter a review.");

  const res = await fetch(`/api/reviews/${selectedISBN}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ review: text })
  });
  const data = await res.json();
  document.getElementById("statusMsg").innerText = data.message || "Failed to submit.";
  fetchReviews(selectedISBN);
});
