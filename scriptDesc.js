// scriptDesc.js

// Parse query parameters from URL
const params = new URLSearchParams(window.location.search);

// Retrieve extra fields from the URL
const title = params.get("title") || "No Title";
const author = params.get("author") || "Unknown Author";
const cover = params.get("cover") || "";
const description = params.get("description") || "No description available.";
const pageCount = params.get("pages") || "N/A";
const subjects = params.get("subjects") || "N/A";
const publishedDate = params.get("publishedDate") || "Unknown";
const isbn = params.get("isbn") || "N/A";

// Populate the UI with retrieved data
document.getElementById("bookTitle").textContent = title;
document.getElementById("bookAuthor").textContent = `By ${author}`;
if (cover) {
  document.getElementById("bookCover").src = cover;
  document.getElementById("bookCover").alt = title;
} else {
  document.getElementById("bookCover").style.display = "none";
}
document.getElementById("bookDescription").innerHTML =
  `<strong>Description:</strong> ${description}`;
document.getElementById("pageCountDisplay").textContent = pageCount;
document.getElementById("subjects").textContent = subjects;
document.getElementById("publishedDate").textContent = publishedDate;
document.getElementById("isbn").textContent = isbn;

// Example event listeners for action buttons
const previewBtn = document.getElementById("previewButton");
previewBtn.addEventListener("click", (e) => {
  e.preventDefault();
  alert("Preview function not implemented yet!");
});

const borrowBtn = document.getElementById("borrowButton");
borrowBtn.addEventListener("click", (e) => {
  e.preventDefault();
  alert("Borrow function not implemented yet!");
});

const readBtn = document.getElementById("readButton");
readBtn.addEventListener("click", (e) => {
  e.preventDefault();
  alert("Read function not implemented yet!");
});
