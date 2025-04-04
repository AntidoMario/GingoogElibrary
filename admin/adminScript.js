document.addEventListener("DOMContentLoaded", () => {
  // -----------------------
  // Tab Switching
  // -----------------------
  const navItems = document.querySelectorAll('.nav li');
  const tabContents = document.querySelectorAll('.tab-content');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navItems.forEach(i => i.classList.remove('active'));
      tabContents.forEach(tab => tab.classList.remove('active'));
      item.classList.add('active');
      const tabId = item.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
      if (tabId === 'dashboard') updateDashboardMetrics();
    });
  });

  // -----------------------
  // Dashboard Metrics
  // -----------------------
  function updateDashboardMetrics() {
    const books = JSON.parse(localStorage.getItem("myNewDesignBooks")) || [];
    document.getElementById("totalBooks").textContent = books.length;
    const categories = JSON.parse(localStorage.getItem("categoriesList")) || [];
    document.getElementById("totalCategories").textContent = categories.length;
    const authors = JSON.parse(localStorage.getItem("authorsList")) || [];
    document.getElementById("totalAuthors").textContent = authors.length;
    document.getElementById("totalBorrowers").textContent = 42;
    document.getElementById("totalReservations").textContent = 7;
    renderDashboardGraphs();
  }

  // Render Dashboard Graphs
  function renderDashboardGraphs() {
    const books = JSON.parse(localStorage.getItem("myNewDesignBooks")) || [];

    // Books by Category
    const categoryCounts = books.reduce((acc, book) => {
      acc[book.categories] = (acc[book.categories] || 0) + 1;
      return acc;
    }, {});
    const categoryLabels = Object.keys(categoryCounts);
    const categoryData = Object.values(categoryCounts);

    const booksByCategoryCtx = document.getElementById("booksByCategoryChart").getContext("2d");
    new Chart(booksByCategoryCtx, {
      type: "pie",
      data: {
        labels: categoryLabels,
        datasets: [{
          data: categoryData,
          backgroundColor: ["#8c6b4c", "#5f4b32", "#dfd2c3", "#c9a77d", "#f2e6d9"]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom"
          }
        }
      }
    });

    // Books by Author
    const authorCounts = books.reduce((acc, book) => {
      acc[book.author] = (acc[book.author] || 0) + 1;
      return acc;
    }, {});
    const authorLabels = Object.keys(authorCounts);
    const authorData = Object.values(authorCounts);

    const booksByAuthorCtx = document.getElementById("booksByAuthorChart").getContext("2d");
    new Chart(booksByAuthorCtx, {
      type: "bar",
      data: {
        labels: authorLabels,
        datasets: [{
          label: "Books",
          data: authorData,
          backgroundColor: "#8c6b4c"
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Authors"
            }
          },
          y: {
            title: {
              display: true,
              text: "Number of Books"
            }
          }
        }
      }
    });
  }

  // -----------------------
  // Sidebar Toggle
  // -----------------------
  const toggleSidebarBtn = document.getElementById('toggleSidebar');
  const sidebar = document.getElementById('sidebar');
  toggleSidebarBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
  });

  // -----------------------
  // Book Management Section
  // -----------------------
  const addBookBtn = document.getElementById('addBookBtn');
  const bookFormPopup = document.getElementById('bookFormPopup');
  const cancelBookBtn = document.getElementById('cancelBookBtn');
  const bookForm = document.getElementById('bookForm');
  const bookListEl = document.getElementById('bookList');
  const searchInput = document.getElementById('bookSearchInput');
  const entriesSelect = document.getElementById('entriesSelect');

  // LocalStorage Keys
  const BOOKS_KEY = "myNewDesignBooks";
  const CATEGORIES_KEY = "categoriesList";
  const AUTHORS_KEY = "authorsList";

  // Data arrays
  let books = JSON.parse(localStorage.getItem(BOOKS_KEY)) || [];
  let categoriesListStorage = JSON.parse(localStorage.getItem(CATEGORIES_KEY)) || [];
  let authorsListStorage = JSON.parse(localStorage.getItem(AUTHORS_KEY)) || [];

  if (books.length === 0) {
    books = [
      {
        title: "Reading on the Worlds",
        cover: "",
        pdf: "",
        categories: "General Books",
        author: "Jhone Steben",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        releaseDate: "2021-01-01"
      },
      {
        title: "The Catcher in the Rye",
        cover: "",
        pdf: "",
        categories: "History Books",
        author: "Fritz Wold",
        description: "Etiam feugiat luctus est, vel commodo odio.",
        releaseDate: "1951-07-16"
      },
      {
        title: "My Lonely Walk",
        cover: "",
        pdf: "",
        categories: "Comic Books",
        author: "John Klok",
        description: "Etiam feugiat luctus est, vel commodo odio, in dictum sem.",
        releaseDate: "2022-05-10"
      }
    ];
    localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
  }
  if (categoriesListStorage.length === 0) {
    categoriesListStorage = ["General Books", "History Books", "Comic Books", "Classic", "Romance", "Drama"];
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categoriesListStorage));
  }
  if (authorsListStorage.length === 0) {
    authorsListStorage = ["Jhone Steben", "Fritz Wold", "John Klok", "Jane Austen", "F. Scott Fitzgerald"];
    localStorage.setItem(AUTHORS_KEY, JSON.stringify(authorsListStorage));
  }

  // -----------------------
  // Custom Dropdowns for Book Form
  // -----------------------
  // For Category Dropdown
  const customCategoryDropdown = document.getElementById('customCategoryDropdown');
  const categoryDropdownInput = document.getElementById('categoryDropdownInput');
  const categoryDropdownList = document.getElementById('categoryDropdownList');
  const categoriesSelectHidden = document.getElementById('categoriesSelect');

  function renderCategoryDropdown(filter = "") {
    categoryDropdownList.innerHTML = "";
    const lower = filter.toLowerCase();
    const filtered = categoriesListStorage.filter(cat => cat.toLowerCase().includes(lower));
    filtered.forEach(cat => {
      const div = document.createElement("div");
      div.textContent = cat;
      div.addEventListener("click", () => {
        categoryDropdownInput.value = cat;
        categoriesSelectHidden.value = cat;
        customCategoryDropdown.classList.remove("open");
      });
      categoryDropdownList.appendChild(div);
    });
  }
  categoryDropdownInput.addEventListener("input", () => {
    renderCategoryDropdown(categoryDropdownInput.value);
    customCategoryDropdown.classList.add("open");
  });
  categoryDropdownInput.addEventListener("focus", () => {
    renderCategoryDropdown(categoryDropdownInput.value);
    customCategoryDropdown.classList.add("open");
  });
  document.addEventListener("click", (e) => {
    if (!customCategoryDropdown.contains(e.target)) {
      customCategoryDropdown.classList.remove("open");
    }
  });

  // For Author Dropdown
  const customAuthorDropdown = document.getElementById('customAuthorDropdown');
  const authorDropdownInput = document.getElementById('authorDropdownInput');
  const authorDropdownList = document.getElementById('authorDropdownList');
  const authorSelectHidden = document.getElementById('authorSelect');

  function renderAuthorDropdown(filter = "") {
    authorDropdownList.innerHTML = "";
    const lower = filter.toLowerCase();
    const filtered = authorsListStorage.filter(auth => auth.toLowerCase().includes(lower));
    filtered.forEach(auth => {
      const div = document.createElement("div");
      div.textContent = auth;
      div.addEventListener("click", () => {
        authorDropdownInput.value = auth;
        authorSelectHidden.value = auth;
        customAuthorDropdown.classList.remove("open");
      });
      authorDropdownList.appendChild(div);
    });
  }
  authorDropdownInput.addEventListener("input", () => {
    renderAuthorDropdown(authorDropdownInput.value);
    customAuthorDropdown.classList.add("open");
  });
  authorDropdownInput.addEventListener("focus", () => {
    renderAuthorDropdown(authorDropdownInput.value);
    customAuthorDropdown.classList.add("open");
  });
  document.addEventListener("click", (e) => {
    if (!customAuthorDropdown.contains(e.target)) {
      customAuthorDropdown.classList.remove("open");
    }
  });

  // -----------------------
  // Populate Book Form Dropdowns (initially set dropdown input and hidden value)
  function populateBookFormDropdowns() {
    // Set initial values (first value in the array)
    if (categoriesListStorage.length > 0) {
      categoryDropdownInput.value = categoriesListStorage[0];
      categoriesSelectHidden.value = categoriesListStorage[0];
    }
    if (authorsListStorage.length > 0) {
      authorDropdownInput.value = authorsListStorage[0];
      authorSelectHidden.value = authorsListStorage[0];
    }
  }
  populateBookFormDropdowns();

  // -----------------------
  // Book Form Submission
  // -----------------------
  async function addOrUpdateBook(e) {
    e.preventDefault();
    
    const bookId = document.getElementById('bookId').value;
    const title = document.getElementById('title').value;
    const coverFileInput = document.getElementById('coverFile');
    const pdfFileInput = document.getElementById('pdfFile');
    const categories = categoriesSelectHidden.value;
    const author = authorSelectHidden.value;
    const description = document.getElementById('description').value;
    const releaseDate = document.getElementById('releaseDate').value;
    
    const coverData = await handleFileInput(coverFileInput);
    const pdfData = await handleFileInput(pdfFileInput);
    
    const newBook = {
      title,
      cover: coverData,
      pdf: pdfData,
      categories,
      author,
      description,
      releaseDate
    };

    if (bookId) {
      books[bookId] = newBook;
    } else {
      books.push(newBook);
    }
    
    localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
    renderBooks();
    bookFormPopup.style.display = "none";
  }
  bookForm.addEventListener('submit', addOrUpdateBook);

  // Helper: File input to Data URL
  function handleFileInput(fileInput) {
    return new Promise((resolve) => {
      const file = fileInput.files[0];
      if (!file) {
        resolve("");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(file);
    });
  }

  // Show "Add New Book" Popup
  addBookBtn.addEventListener('click', () => {
    bookForm.reset();
    document.getElementById('bookId').value = "";
    document.getElementById('formTitle').textContent = "Add New Book";
    categoryDropdownInput.value = "";
    authorDropdownInput.value = "";
    renderCategoryDropdown("");
    renderAuthorDropdown("");
    bookFormPopup.style.display = "flex";
  });
  cancelBookBtn.addEventListener('click', () => {
    bookFormPopup.style.display = "none";
  });

  // Render Book Table
  function renderBooks() {
    const searchText = searchInput.value.toLowerCase().trim();
    let filtered = books.filter(b =>
      b.title.toLowerCase().includes(searchText) ||
      b.author.toLowerCase().includes(searchText) ||
      b.categories.toLowerCase().includes(searchText) ||
      b.description.toLowerCase().includes(searchText)
    );
    
    const limit = parseInt(entriesSelect.value, 10) || 10;
    const displayed = filtered.slice(0, limit);
    
    bookListEl.innerHTML = "";
    displayed.forEach((book, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>
          ${book.cover
            ? `<img src="${book.cover}" alt="Cover" class="book-cover-thumb">`
            : `<span style="color:#aaa;">No Cover</span>`}
        </td>
        <td>${book.title}</td>
        <td>${book.categories}</td>
        <td>${book.author}</td>
        <td>${book.description}</td>
        <td>${book.pdf ? `<a href="${book.pdf}" target="_blank">View PDF</a>` : 'N/A'}</td>
        <td>
          <button class="action-btn" onclick="editBook(${index})">Edit</button>
          <button class="action-btn" onclick="deleteBook(${index})">Delete</button>
        </td>
      `;
      bookListEl.appendChild(row);
    });
  }
  renderBooks();
  searchInput.addEventListener('input', renderBooks);
  entriesSelect.addEventListener('change', renderBooks);

  window.editBook = function(index) {
    const book = books[index];
    document.getElementById('title').value = book.title;
    document.getElementById('coverFile').value = "";
    document.getElementById('pdfFile').value = "";
    // Reset custom dropdowns
    renderCategoryDropdown("");
    renderAuthorDropdown("");
    document.getElementById('categoriesSelect').value = book.categories;
    document.getElementById('authorSelect').value = book.author;
    categoryDropdownInput.value = book.categories;
    authorDropdownInput.value = book.author;
    document.getElementById('description').value = book.description;
    document.getElementById('releaseDate').value = book.releaseDate || "";
    document.getElementById('bookId').value = index;
    document.getElementById('formTitle').textContent = "Edit Book";
    bookFormPopup.style.display = "flex";
  };

  window.deleteBook = function(index) {
    if (confirm("Are you sure you want to delete this book?")) {
      books.splice(index, 1);
      localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
      renderBooks();
    }
  };

  // -----------------------
  // Categories Section
  // -----------------------
  const categorySearchInput = document.getElementById('categorySearchInput');
  const categoryListTable = document.getElementById('categoryListTable');
  const addCategoryBtn = document.getElementById('addCategoryBtn');
  const categoryFormPopup = document.getElementById('categoryFormPopup');
  const categoryForm = document.getElementById('categoryForm');
  const cancelCategoryBtn = document.getElementById('cancelCategoryBtn');

  function renderCategories() {
    const searchText = categorySearchInput.value.toLowerCase().trim();
    let filtered = categoriesListStorage.filter(cat => cat.toLowerCase().includes(searchText));
    categoryListTable.innerHTML = "";
    filtered.forEach((cat, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${cat}</td>
        <td><span class="cat-desc">${getCategoryDescription(index)}</span></td>
        <td>
          <button class="action-btn" onclick="editCategory(${index})">Edit</button>
          <button class="action-btn" onclick="deleteCategory(${index})">Delete</button>
        </td>
      `;
      categoryListTable.appendChild(row);
    });
  }
  function getCategoryDescription(index) {
    return "Category description here.";
  }
  function saveCategories() {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categoriesListStorage));
  }
  addCategoryBtn.addEventListener('click', () => {
    categoryForm.reset();
    document.getElementById('categoryId').value = "";
    document.getElementById('categoryFormTitle').textContent = "Add Category";
    categoryFormPopup.style.display = "flex";
  });
  cancelCategoryBtn.addEventListener('click', () => {
    categoryFormPopup.style.display = "none";
  });
  categoryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const categoryId = document.getElementById('categoryId').value;
    const categoryName = document.getElementById('categoryName').value;
    const categoryDescription = document.getElementById('categoryDescription').value;
    let newCat = categoryName;
    if (categoryId) {
      categoriesListStorage[categoryId] = newCat;
    } else {
      categoriesListStorage.push(newCat);
    }
    saveCategories();
    renderCategories();
    renderCategoryDropdown("");
    categoryFormPopup.style.display = "none";
  });
  if (categorySearchInput) {
    categorySearchInput.addEventListener('input', renderCategories);
  }
  renderCategories();

  window.editCategory = function(index) {
    document.getElementById('categoryFormTitle').textContent = "Edit Category";
    document.getElementById('categoryId').value = index;
    document.getElementById('categoryName').value = categoriesListStorage[index];
    document.getElementById('categoryDescription').value = "Category description here.";
    categoryFormPopup.style.display = "flex";
  };

  window.deleteCategory = function(index) {
    if (confirm("Are you sure you want to delete this category?")) {
      categoriesListStorage.splice(index, 1);
      saveCategories();
      renderCategories();
      renderCategoryDropdown("");
    }
  };

  // -----------------------
  // Authors Section
  // -----------------------
  const authorSearchInput = document.getElementById('authorSearchInput');
  const authorListTable = document.getElementById('authorListTable');
  const addAuthorBtn = document.getElementById('addAuthorBtn');
  const authorFormPopup = document.getElementById('authorFormPopup');
  const authorForm = document.getElementById('authorForm');
  const cancelAuthorBtn = document.getElementById('cancelAuthorBtn');

  function renderAuthors() {
    const searchText = authorSearchInput.value.toLowerCase().trim();
    let filtered = authorsListStorage.filter(auth => auth.toLowerCase().includes(searchText));
    authorListTable.innerHTML = "";
    filtered.forEach((auth, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${auth}</td>
        <td><span class="auth-desc">${getAuthorDescription(index)}</span></td>
        <td>
          <button class="action-btn" onclick="editAuthor(${index})">Edit</button>
          <button class="action-btn" onclick="deleteAuthor(${index})">Delete</button>
        </td>
      `;
      authorListTable.appendChild(row);
    });
  }
  function getAuthorDescription(index) {
    return "Author description here.";
  }
  function saveAuthors() {
    localStorage.setItem(AUTHORS_KEY, JSON.stringify(authorsListStorage));
  }
  addAuthorBtn.addEventListener('click', () => {
    authorForm.reset();
    document.getElementById('authorId').value = "";
    document.getElementById('authorFormTitle').textContent = "Add Author";
    authorFormPopup.style.display = "flex";
  });
  cancelAuthorBtn.addEventListener('click', () => {
    authorFormPopup.style.display = "none";
  });
  authorForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const authorId = document.getElementById('authorId').value;
    const authorName = document.getElementById('authorName').value;
    const authorDescription = document.getElementById('authorDescription').value;
    let newAuth = authorName;
    if (authorId) {
      authorsListStorage[authorId] = newAuth;
    } else {
      authorsListStorage.push(newAuth);
    }
    saveAuthors();
    renderAuthors();
    renderAuthorDropdown("");
    authorFormPopup.style.display = "none";
  });
  if (authorSearchInput) {
    authorSearchInput.addEventListener('input', renderAuthors);
  }
  renderAuthors();

  // Logout Button Functionality
  const logoutBtn = document.getElementById("logoutBtn");
  logoutBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to log out?")) {
      // Redirect to login page or perform logout logic
      window.location.href = "/login.html";
    }
  });
});
