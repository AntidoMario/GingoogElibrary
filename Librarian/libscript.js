document.addEventListener("DOMContentLoaded", function () {
  // Ensure the DOM is fully loaded before executing scripts
  console.log("DOM fully loaded and parsed.");

  // -----------------------
  // Utility Functions for localStorage
  // -----------------------
  function safeGetItem(key) {
    try {
      return JSON.parse(localStorage.getItem(key)) || [];
    } catch (error) {
      console.error(`Error reading key "${key}" from localStorage:`, error);
      return [];
    }
  }

  function safeSetItem(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing key "${key}" to localStorage:`, error);
    }
  }

  // -----------------------
  // LocalStorage Keys
  // -----------------------
  const BOOKS_KEY = "books";
  const CATEGORIES_KEY = "categories";
  const AUTHORS_KEY = "authors";
  const BORROWED_BOOKS_KEY = "borrowedBooks";

  // -----------------------
  // Sample Data Initialization
  // -----------------------
  let books = safeGetItem(BOOKS_KEY);
  let categories = safeGetItem(CATEGORIES_KEY);
  let authors = safeGetItem(AUTHORS_KEY);
  let borrowedBooks = safeGetItem(BORROWED_BOOKS_KEY);

  if (books.length === 0) {
    books = [
      {
        title: "Atomic Habits",
        cover: "https://via.placeholder.com/120x160?text=Atomic+Habits",
        category: "Self-Help",
        author: "James Clear",
        description: "A guide to building good habits and breaking bad ones.",
        availability: "Available"
      },
      {
        title: "Educated",
        cover: "https://via.placeholder.com/120x160?text=Educated",
        category: "Memoir",
        author: "Tara Westover",
        description: "A memoir about a girl who escapes her strict upbringing.",
        availability: "Available"
      },
      {
        title: "Where the Crawdads Sing",
        cover: "https://via.placeholder.com/120x160?text=Crawdads",
        category: "Fiction",
        author: "Delia Owens",
        description: "A mystery and coming-of-age story set in the marshes.",
        availability: "Available"
      }
    ];
    safeSetItem(BOOKS_KEY, books);
  }

  if (categories.length === 0) {
    categories = ["Self-Help", "Memoir", "Fiction", "Classic", "Romance"];
    safeSetItem(CATEGORIES_KEY, categories);
  }

  if (authors.length === 0) {
    authors = ["James Clear", "Tara Westover", "Delia Owens", "F. Scott Fitzgerald", "Jane Austen"];
    safeSetItem(AUTHORS_KEY, authors);
  }

  if (borrowedBooks.length === 0) {
    borrowedBooks = [
      {
        book: "Atomic Habits",
        borrower: "John Doe",
        borrowDate: "2023-03-15",
        dueDate: "2023-04-15",
        status: "Borrowed"
      },
      {
        book: "Educated",
        borrower: "Jane Smith",
        borrowDate: "2023-03-10",
        dueDate: "2023-04-10",
        status: "Returned"
      },
      {
        book: "Where the Crawdads Sing",
        borrower: "Alice Wonder",
        borrowDate: "2023-03-18",
        dueDate: "2023-04-18",
        status: "Overdue"
      }
    ];
    safeSetItem(BORROWED_BOOKS_KEY, borrowedBooks);
  }

  // -----------------------
  // Update Dashboard Metrics
  // -----------------------
  document.getElementById("totalBooks").textContent = books.length;
  document.getElementById("totalCategories").textContent = categories.length;
  document.getElementById("totalAuthors").textContent = authors.length;
  document.getElementById("recentBorrowingActivity").textContent = borrowedBooks.length;

  // -----------------------
  // Render Book Management Table
  // -----------------------
  function renderBooks() {
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = "";
    books.forEach((book, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td><img src="${book.cover}" alt="${book.title}" class="book-cover-thumb"></td>
        <td>${book.title}</td>
        <td>${book.category}</td>
        <td>${book.author}</td>
        <td>${book.availability}</td>
        <td>
          <button class="action-icon" onclick="editBook(${index})">
            <i class="fas fa-edit"></i>
          </button>
          <button class="action-icon" onclick="markBookUnavailable(${index})">
            <i class="fas fa-ban"></i>
          </button>
        </td>
      `;
      bookList.appendChild(row);
    });
  }
  renderBooks();

  // -----------------------
  // Render Borrowed Books Table
  // -----------------------
  function renderBorrowedBooks() {
    const borrowedBooksList = document.getElementById("borrowedBooksList");
    borrowedBooksList.innerHTML = "";
    borrowedBooks.forEach((record, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${record.book}</td>
        <td>${record.borrower}</td>
        <td>${record.borrowDate}</td>
        <td>${record.dueDate}</td>
        <td>${record.status}</td>
        <td>
          <button class="action-icon" onclick="viewBorrowDetails(${index})">
            <i class="fas fa-eye"></i>
          </button>
        </td>
      `;
      borrowedBooksList.appendChild(row);
    });
  }
  renderBorrowedBooks();

  // -----------------------
  // Render Most Borrowed Books Report
  // -----------------------
  function renderMostBorrowedBooks() {
    const counts = {};
    borrowedBooks.forEach(record => {
      counts[record.book] = (counts[record.book] || 0) + 1;
    });
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const mostBorrowedBooks = document.getElementById("mostBorrowedBooks");
    mostBorrowedBooks.innerHTML = "";
    sorted.forEach((entry, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${entry[0]}</td>
        <td>${entry[1]}</td>
      `;
      mostBorrowedBooks.appendChild(row);
    });
  }
  renderMostBorrowedBooks();

  // -----------------------
  // Render Active Users Report
  // -----------------------
  function renderActiveUsers() {
    const userBorrowCounts = {};
    borrowedBooks.forEach(record => {
      userBorrowCounts[record.borrower] = (userBorrowCounts[record.borrower] || 0) + 1;
    });

    const sortedUsers = Object.entries(userBorrowCounts).sort((a, b) => b[1] - a[1]).reverse();
    const activeUsersTable = document.getElementById("activeUsers");
    activeUsersTable.innerHTML = "";
    sortedUsers.forEach((entry, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${entry[0]}</td>
        <td>${entry[1]}</td>
      `;
      activeUsersTable.appendChild(row);
    });
  }

  // -----------------------
  // Render Least Demanded Books Report
  // -----------------------
  function renderLeastDemandedBooks() {
    const bookBorrowCounts = {};
    borrowedBooks.forEach(record => {
      bookBorrowCounts[record.book] = (bookBorrowCounts[record.book] || 0) + 1;
    });

    const sortedBooks = Object.entries(bookBorrowCounts).sort((a, b) => a[1] - b[1]);
    const leastDemandBooksTable = document.getElementById("leastDemandBooks");
    leastDemandBooksTable.innerHTML = "";
    sortedBooks.forEach((entry, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${entry[0]}</td>
        <td>${entry[1]}</td>
      `;
      leastDemandBooksTable.appendChild(row);
    });
  }

  // -----------------------
  // Initialize Reports
  // -----------------------
  renderActiveUsers();
  renderLeastDemandedBooks();

  // -----------------------
  // Add Book Modal Functionality
  // -----------------------
  const addBookBtn = document.getElementById("addBookBtn");
  const bookFormPopup = document.getElementById("bookFormPopup");
  const cancelBookBtn = document.getElementById("cancelBookBtn");
  const closeBookForm = document.getElementById("closeBookForm");
  const bookForm = document.getElementById("bookForm");

  if (addBookBtn && bookFormPopup) {
    addBookBtn.addEventListener("click", function () {
      bookFormPopup.style.display = "flex";
    });
  }
  if (cancelBookBtn || closeBookForm) {
    [cancelBookBtn, closeBookForm].forEach(btn => {
      btn.addEventListener("click", function () {
        bookFormPopup.style.display = "none";
      });
    });
  }
  if (bookForm) {
    bookForm.addEventListener("submit", function (event) {
      event.preventDefault();
      // Get values from form
      const title = document.getElementById("bookTitle").value;
      const coverFile = document.getElementById("bookCover").files[0];
      const category = document.getElementById("bookCategory").value;
      const author = document.getElementById("bookAuthor").value;
      const publicationDate = document.getElementById("bookDate").value;
      const description = document.getElementById("bookDescription").value;
      const pdfFile = document.getElementById("bookPDF").files[0];

      // Convert the uploaded cover image to a URL
      let cover = "";
      if (coverFile) {
        const reader = new FileReader();
        reader.onload = function (e) {
          cover = e.target.result;

          // Add the new book to the list
          const newBook = {
            title,
            cover,
            category,
            author,
            publicationDate,
            description,
            pdf: pdfFile ? pdfFile.name : "No PDF",
            availability: "Available"
          };
          books.push(newBook);
          safeSetItem(BOOKS_KEY, books);
          renderBooks();
          bookFormPopup.style.display = "none";
          bookForm.reset();
        };
        reader.readAsDataURL(coverFile);
      }
    });
  }

  // -----------------------
  // Populate Category and Author Dropdowns
  // -----------------------
  const bookCategoryDropdown = document.getElementById("bookCategory");
  const bookAuthorDropdown = document.getElementById("bookAuthor");

  function populateDropdown(dropdown, items) {
    dropdown.innerHTML = ""; // Clear existing options
    items.forEach(item => {
      const option = document.createElement("option");
      option.value = item;
      option.textContent = item;
      dropdown.appendChild(option);
    });
  }

  populateDropdown(bookCategoryDropdown, categories);
  populateDropdown(bookAuthorDropdown, authors);

  // Add Searchable Dropdown Functionality
  document.querySelectorAll(".searchable-dropdown").forEach(dropdown => {
    dropdown.addEventListener("input", function () {
      const searchValue = this.value.toLowerCase();
      Array.from(this.options).forEach(option => {
        option.style.display = option.textContent.toLowerCase().includes(searchValue) ? "block" : "none";
      });
    });
  });

  // -----------------------
  // Sidebar Toggle Functionality
  // -----------------------
  const sidebarEl = document.getElementById("sidebar");
  const toggleSidebarBtnEl = document.getElementById("toggleSidebar");
  if (toggleSidebarBtnEl) {
    toggleSidebarBtnEl.addEventListener("click", function () {
      sidebarEl.classList.toggle("collapsed");
      this.querySelector("i").classList.toggle("fa-chevron-left");
      this.querySelector("i").classList.toggle("fa-chevron-right");

      // Ensure no horizontal scrolling occurs
      document.body.style.overflowX = sidebarEl.classList.contains("collapsed") ? "hidden" : "auto";

      // Hide copyright text when sidebar is collapsed
      const sidebarFooter = document.querySelector(".sidebar-footer");
      if (sidebarEl.classList.contains("collapsed")) {
        sidebarFooter.style.display = "none";
      } else {
        sidebarFooter.style.display = "block";
      }
    });
  }

  // -----------------------
  // Tab Switching Functionality
  // -----------------------
  const tabs = document.querySelectorAll(".nav li");
  const tabContents = document.querySelectorAll(".tab-content");
  tabs.forEach(tab => {
    tab.addEventListener("click", function () {
      const target = this.getAttribute("data-tab");
      tabs.forEach(tab => tab.classList.remove("active"));
      tabContents.forEach(content => content.classList.remove("active"));
      this.classList.add("active");
      document.getElementById(target).classList.add("active");
    });
  });

  // -----------------------
  // Logout Functionality
  // -----------------------
  const logoutBtn = document.querySelector(".logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      alert("Logging out...");
      window.location.href = "login.html"; // Change this URL to your actual login page if needed.
    });
  }

  // -----------------------
  // Mark Book as Unavailable
  // -----------------------
  window.markBookUnavailable = function (index) {
    if (confirm("Are you sure you want to mark this book as unavailable?")) {
      books[index].availability = "Unavailable";
      safeSetItem(BOOKS_KEY, books);
      renderBooks();
    }
  };

  // -----------------------
  // Archive Borrowed Book
  // -----------------------
  window.archiveBorrowedBook = function (index) {
    if (confirm("Are you sure you want to archive this borrowed book record?")) {
      borrowedBooks[index].status = "Archived";
      safeSetItem(BORROWED_BOOKS_KEY, borrowedBooks);
      renderBorrowedBooks();
    }
  };

  // -----------------------
  // Approve Borrow Requests
  // -----------------------
  document.getElementById("approveBorrowRequests").addEventListener("click", function () {
    borrowedBooks.forEach((record) => {
      if (record.status === "Pending") {
        record.status = "Borrowed";
      }
    });
    safeSetItem(BORROWED_BOOKS_KEY, borrowedBooks);
    renderBorrowedBooks();
    alert("All pending borrow requests have been approved.");
  });

  // -----------------------
  // Mark as Returned
  // -----------------------
  document.getElementById("markAsReturned").addEventListener("click", function () {
    borrowedBooks.forEach((record) => {
      if (record.status === "Borrowed") {
        record.status = "Returned";
      }
    });
    safeSetItem(BORROWED_BOOKS_KEY, borrowedBooks);
    renderBorrowedBooks();
    alert("All borrowed books have been marked as returned.");
  });

  // -----------------------
  // Send Late Notifications
  // -----------------------
  document.getElementById("sendLateNotifications").addEventListener("click", function () {
    const today = new Date();
    const notifications = borrowedBooks.filter((record) => {
      const dueDate = new Date(record.dueDate);
      const daysLeft = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
      return record.status === "Borrowed" && daysLeft <= 3; // Notify if due in 3 days or less
    });

    if (notifications.length > 0) {
      notifications.forEach((record) => {
        console.log(`Reminder sent to ${record.borrower} for book: "${record.book}" due on ${record.dueDate}`);
      });
      alert("Reminders have been sent for books nearing their due dates.");
    } else {
      alert("No books are nearing their due dates.");
    }
  });

  // -----------------------
  // Automatically Handle Due Dates
  // -----------------------
  function updateBorrowedBooksStatus() {
    const today = new Date();
    borrowedBooks.forEach((record) => {
      const dueDate = new Date(record.dueDate);
      if (record.status === "Borrowed" && today > dueDate) {
        record.status = "Overdue";
      }
    });
    safeSetItem(BORROWED_BOOKS_KEY, borrowedBooks);
    renderBorrowedBooks();
  }

  // Call the function to update statuses on page load
  updateBorrowedBooksStatus();

  // -----------------------
  // Global Edit and Delete Functions for Books
  // -----------------------
  function editBook(index) {
    alert("Editing book at index: " + index);
    // Implement edit functionality as needed.
  }

  function deleteBook(index) {
    if (confirm("Are you sure you want to delete this book?")) {
      let books = JSON.parse(localStorage.getItem("books")) || [];
      books.splice(index, 1);
      localStorage.setItem("books", JSON.stringify(books));
      // Refresh the page to update the table (or call renderBooks() if it were globally accessible)
      location.reload();
    }
  }

  // -----------------------
  // Borrow Details Modal
  // -----------------------
  const borrowDetailsPopup = document.getElementById("borrowDetailsPopup");
  const closeBorrowDetailsBtn = document.getElementById("closeBorrowDetails");

  window.viewBorrowDetails = function (index) {
    const record = borrowedBooks[index];
    const borrowDetailsContent = document.getElementById("borrowDetailsContent");

    if (record) {
      // Populate the modal with borrow details
      borrowDetailsContent.innerHTML = `
        <p><strong>Book:</strong> ${record.book}</p>
        <p><strong>Borrower:</strong> ${record.borrower}</p>
        <p><strong>Borrow Date:</strong> ${record.borrowDate}</p>
        <p><strong>Due Date:</strong> ${record.dueDate}</p>
        <p><strong>Status:</strong> ${record.status}</p>
      `;

      // Show the modal
      borrowDetailsPopup.style.display = "flex";
    } else {
      console.error("Invalid record index:", index);
    }
  };

  // Close the modal when the close button is clicked
  if (closeBorrowDetailsBtn) {
    closeBorrowDetailsBtn.addEventListener("click", function () {
      borrowDetailsPopup.style.display = "none";
    });
  }

  // Close the modal when clicking outside the content
  if (borrowDetailsPopup) {
    borrowDetailsPopup.addEventListener("click", function (event) {
      if (event.target === borrowDetailsPopup) {
        borrowDetailsPopup.style.display = "none";
      }
    });
  }

  // Ensure the borrowedBooks array is correctly passed to renderBorrowedBooks
  function renderBorrowedBooks() {
    const borrowedBooksList = document.getElementById("borrowedBooksList");
    borrowedBooksList.innerHTML = "";
    borrowedBooks.forEach((record, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${record.book}</td>
        <td>${record.borrower}</td>
        <td>${record.borrowDate}</td>
        <td>${record.dueDate}</td>
        <td>${record.status}</td>
        <td>
          <button class="action-icon" onclick="viewBorrowDetails(${index})">
            <i class="fas fa-eye"></i>
          </button>
        </td>
      `;
      borrowedBooksList.appendChild(row);
    });
  }

  renderBorrowedBooks();

  // -----------------------
  // Apply Filters for Borrowed Books
  // -----------------------
  document.getElementById("applyFilters").addEventListener("click", function () {
    const borrowerFilter = document.getElementById("borrowerFilter").value.toLowerCase();
    const statusFilter = document.getElementById("statusFilter").value;
    const borrowDateFilter = document.getElementById("borrowDateFilter").value;

    const filteredBooks = borrowedBooks.filter((record) => {
      const matchesBorrower = borrowerFilter === "" || record.borrower.toLowerCase().includes(borrowerFilter);
      const matchesStatus = statusFilter === "all" || record.status.toLowerCase() === statusFilter;
      const matchesBorrowDate = !borrowDateFilter || record.borrowDate === borrowDateFilter;

      return matchesBorrower && matchesStatus && matchesBorrowDate;
    });

    renderFilteredBorrowedBooks(filteredBooks);
  });

  // -----------------------
  // Render Filtered Borrowed Books
  // -----------------------
  function renderFilteredBorrowedBooks(filteredBooks) {
    const borrowedBooksList = document.getElementById("borrowedBooksList");
    borrowedBooksList.innerHTML = "";
    filteredBooks.forEach((record, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${record.book}</td>
        <td>${record.borrower}</td>
        <td>${record.borrowDate}</td>
        <td>${record.dueDate}</td>
        <td>${record.status}</td>
        <td>
          <button class="action-icon" onclick="viewBorrowDetails(${index})">
            <i class="fas fa-eye"></i>
          </button>
        </td>
      `;
      borrowedBooksList.appendChild(row);
    });
  }

  // -----------------------
  // Reports Tab Switching
  // -----------------------
  const reportTabs = document.querySelectorAll(".reports-nav li");
  const reportContents = document.querySelectorAll(".report-tab");

  reportTabs.forEach(tab => {
    tab.addEventListener("click", function () {
      const target = this.getAttribute("data-report");

      reportTabs.forEach(tab => tab.classList.remove("active"));
      reportContents.forEach(content => content.classList.remove("active"));

      this.classList.add("active");
      document.getElementById(target).classList.add("active");
    });
  });

  // -----------------------
  // Render Reports
  // -----------------------
  function renderMostBorrowedBooks() {
    const counts = {};
    borrowedBooks.forEach(record => {
      counts[record.book] = (counts[record.book] || 0) + 1;
    });
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const mostBorrowedBooks = document.getElementById("mostBorrowedBooks");
    mostBorrowedBooks.innerHTML = "";
    sorted.forEach((entry, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${entry[0]}</td>
        <td>${entry[1]}</td>
      `;
      mostBorrowedBooks.appendChild(row);
    });
  }

  function renderActiveUsers() {
    const userBorrowCounts = {};
    borrowedBooks.forEach(record => {
      userBorrowCounts[record.borrower] = (userBorrowCounts[record.borrower] || 0) + 1;
    });
    const sortedUsers = Object.entries(userBorrowCounts).sort((a, b) => b[1] - a[1]);
    const activeUsersTable = document.getElementById("activeUsers");
    activeUsersTable.innerHTML = "";
    sortedUsers.forEach((entry, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${entry[0]}</td>
        <td>${entry[1]}</td>
      `;
      activeUsersTable.appendChild(row);
    });
  }

  function renderLeastDemandedBooks() {
    const bookBorrowCounts = {};
    borrowedBooks.forEach(record => {
      bookBorrowCounts[record.book] = (bookBorrowCounts[record.book] || 0) + 1;
    });
    const sortedBooks = Object.entries(bookBorrowCounts).sort((a, b) => a[1] - b[1]);
    const leastDemandBooksTable = document.getElementById("leastDemandBooks");
    leastDemandBooksTable.innerHTML = "";
    sortedBooks.forEach((entry, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${entry[0]}</td>
        <td>${entry[1]}</td>
      `;
      leastDemandBooksTable.appendChild(row);
    });
  }

  renderMostBorrowedBooks();
  renderActiveUsers();
  renderLeastDemandedBooks();

  // -----------------------
  // Messages Functionality
  // -----------------------
  const messageList = document.getElementById("messageList");
  const messageForm = document.getElementById("messageForm");
  const messageInput = document.getElementById("messageInput");

  const MESSAGES_KEY = "messages";
  let messages = safeGetItem(MESSAGES_KEY);

  function renderMessages() {
    messageList.innerHTML = "";
    messages.forEach((message, index) => {
      const li = document.createElement("li");
      li.textContent = message;
      messageList.appendChild(li);
    });
  }

  messageForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const message = messageInput.value.trim();
    if (message) {
      messages.push(message);
      safeSetItem(MESSAGES_KEY, messages);
      renderMessages();
      messageInput.value = "";
    }
  });

  renderMessages();

  // -----------------------
  // Feedback Functionality
  // -----------------------
  const feedbackList = document.getElementById("feedbackList");
  const feedbackForm = document.getElementById("feedbackForm");
  const feedbackInput = document.getElementById("feedbackInput");

  const replyModal = document.getElementById("replyModal");
  const closeReplyModal = document.getElementById("closeReplyModal");
  const feedbackMessagePreview = document.getElementById("feedbackMessagePreview");
  const replyList = document.getElementById("replyList");
  const replyForm = document.getElementById("replyForm");
  const replyInput = document.getElementById("replyInput");

  const FEEDBACK_KEY = "feedback";
  let feedback = safeGetItem(FEEDBACK_KEY);

  // Add sample feedback if none exists
  if (feedback.length === 0) {
    feedback = [
      { message: "The library is amazing! Keep up the good work.", replies: [] },
      { message: "Could you add more books on self-help topics?", replies: [] },
      { message: "The borrowing process is smooth and efficient. Thank you!", replies: [] }
    ];
    safeSetItem(FEEDBACK_KEY, feedback);
  }

  function renderFeedback() {
    feedbackList.innerHTML = "";
    feedback.forEach((entry, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span class="feedback-message">${entry.message}</span>
        <div class="feedback-actions">
          <button class="btn-reply" onclick="openReplyModal(${index})">Reply</button>
        </div>
      `;
      feedbackList.appendChild(li);
    });
  }

  feedbackForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const feedbackMessage = feedbackInput.value.trim();
    if (feedbackMessage) {
      feedback.push({ message: feedbackMessage, replies: [] });
      safeSetItem(FEEDBACK_KEY, feedback);
      renderFeedback();
      feedbackInput.value = "";
    }
  });

  window.openReplyModal = function (index) {
    const selectedFeedback = feedback[index];
    if (selectedFeedback) {
      feedbackMessagePreview.textContent = selectedFeedback.message;

      // Populate replies
      replyList.innerHTML = "";
      selectedFeedback.replies.forEach(reply => {
        const replyItem = document.createElement("li");
        replyItem.textContent = reply;
        replyList.appendChild(replyItem);
      });

      replyModal.style.display = "flex";

      replyForm.onsubmit = function (event) {
        event.preventDefault();
        const replyMessage = replyInput.value.trim();
        if (replyMessage) {
          selectedFeedback.replies.push(replyMessage);
          safeSetItem(FEEDBACK_KEY, feedback);
          replyModal.style.display = "none";
          replyInput.value = "";
          alert("Reply sent successfully!");
          renderFeedback(); // Update feedback list
        }
      };
    }
  };

  if (closeReplyModal) {
    closeReplyModal.addEventListener("click", function () {
      replyModal.style.display = "none";
    });
  }

  renderFeedback();
});
