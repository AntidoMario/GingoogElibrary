document.addEventListener("DOMContentLoaded", () => {
  // 1) RECOMMENDED BOOKS (Sample)
  const recommendedBooks = [
    {
      title: "Atomic Habits",
      author: "James Clear",
      cover: "https://via.placeholder.com/120x160?text=Atomic+Habits",
      description: "A great book about building habits.",
      pdf: "https://example.com/atomic.pdf"
    },
    {
      title: "Educated",
      author: "Tara Westover",
      cover: "https://via.placeholder.com/120x160?text=Educated",
      description: "A memoir of a girl who leaves her survivalist family.",
      pdf: "https://example.com/educated.pdf"
    },
    {
      title: "Where the Crawdads Sing",
      author: "Delia Owens",
      cover: "https://via.placeholder.com/120x160?text=Crawdads",
      description: "A coming-of-age murder mystery in the marshes.",
      pdf: "https://example.com/crawdads.pdf"
    }
  ];
  const recommendedContainer = document.getElementById("recommendedBooks");
  recommendedBooks.forEach((book) => {
    const card = document.createElement("div");
    card.className = "book-card";
    card.innerHTML = `
      <img src="${book.cover}" alt="${book.title}">
      <p class="book-title">${book.title}</p>
      <span class="book-author">${book.author}</span>
    `;
    // Click on cover -> go to description
    card.querySelector("img").addEventListener("click", () => {
      goToBookDescription(book);
    });
    recommendedContainer.appendChild(card);
  });

  // 2) CUSTOM DROPDOWNS
  const filterCategoryEl = document.getElementById("dropdownCategory");
  const filterAuthorEl = document.getElementById("dropdownAuthor");
  const filterDateEl = document.getElementById("dropdownDate");

  // Example arrays
  const categoriesForFilter = ["All", "Classic", "Fiction", "Romance", "Mystery", "Sci-Fi"];
  const authorsForFilter = ["All", "Jane Austen", "J.K. Rowling", "James Clear"];
  const datesForFilter = ["All", "1813", "1851", "1925", "2022"];

  function populateDropdown(dropdownEl, optionsArray) {
    const optionsList = dropdownEl.querySelector(".dropdown-options");
    optionsList.innerHTML = "";
    optionsArray.forEach(opt => {
      const li = document.createElement("li");
      li.textContent = opt;
      li.setAttribute("data-value", opt);
      optionsList.appendChild(li);
    });
    dropdownEl.querySelector(".dropdown-input").value = "All";
  }
  populateDropdown(filterCategoryEl, categoriesForFilter);
  populateDropdown(filterAuthorEl, authorsForFilter);
  populateDropdown(filterDateEl, datesForFilter);

  function setupDropdown(dropdownEl) {
    const input = dropdownEl.querySelector(".dropdown-input");
    const search = dropdownEl.querySelector(".dropdown-search");
    const optionsList = dropdownEl.querySelectorAll(".dropdown-options li");

    input.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdownEl.classList.toggle("open");
      search.value = "";
      optionsList.forEach(opt => { opt.style.display = "block"; });
    });
    dropdownEl.querySelector(".dropdown-options").addEventListener("click", (e) => {
      if (e.target.tagName.toLowerCase() === "li") {
        input.value = e.target.getAttribute("data-value");
        dropdownEl.classList.remove("open");
        alert(`Filter set to: ${input.value}`);
      }
    });
    search.addEventListener("input", () => {
      const filterVal = search.value.trim().toLowerCase();
      optionsList.forEach(opt => {
        if (opt.textContent.toLowerCase().includes(filterVal)) {
          opt.style.display = "block";
        } else {
          opt.style.display = "none";
        }
      });
    });
    document.addEventListener("click", (e) => {
      if (!dropdownEl.contains(e.target)) {
        dropdownEl.classList.remove("open");
      }
    });
  }
  setupDropdown(filterCategoryEl);
  setupDropdown(filterAuthorEl);
  setupDropdown(filterDateEl);

  // 3) FEATURED BOOKS CAROUSEL
  const featuredCarousel = document.getElementById("featuredCarousel");
  const featuredPrevBtn = document.getElementById("featuredPrevBtn");
  const featuredNextBtn = document.getElementById("featuredNextBtn");

  const featuredBooks = [
    {
      title: "Book One",
      cover: "https://via.placeholder.com/140x210?text=Book+One",
      description: "Description for Book One",
      pdf: "https://example.com/book1.pdf"
    },
    {
      title: "Book Two",
      cover: "https://via.placeholder.com/140x210?text=Book+Two",
      description: "Description for Book Two",
      pdf: "https://example.com/book2.pdf"
    },
    {
      title: "Book Three",
      cover: "https://via.placeholder.com/140x210?text=Book+Three",
      description: "Description for Book Three",
      pdf: "https://example.com/book3.pdf"
    },
    {
      title: "Book Four",
      cover: "https://via.placeholder.com/140x210?text=Book+Four",
      description: "Description for Book Four",
      pdf: "https://example.com/book4.pdf"
    },
    {
      title: "Book Five",
      cover: "https://via.placeholder.com/140x210?text=Book+Five",
      description: "Description for Book Five",
      pdf: "https://example.com/book5.pdf"
    },
    {
      title: "Book Six",
      cover: "https://via.placeholder.com/140x210?text=Book+Six",
      description: "Description for Book Six",
      pdf: "https://example.com/book6.pdf"
    }
  ];

  featuredBooks.forEach(book => {
    const card = document.createElement("div");
    card.className = "book-card";
    card.innerHTML = `
      <img src="${book.cover}" alt="${book.title}">
      <button class="preview-btn">Read</button>
    `;
    // Click on cover -> go to description
    card.querySelector("img").addEventListener("click", () => {
      goToBookDescription(book);
    });
    // Click on "Read" -> open PDF link in new tab
    card.querySelector(".preview-btn").addEventListener("click", () => {
      window.open(book.pdf, "_blank");
    });
    featuredCarousel.appendChild(card);
  });

  const featuredPageSize = 3;
  const totalFeatured = featuredBooks.length;
  const totalFeaturedPages = Math.ceil(totalFeatured / featuredPageSize);
  let currentFeaturedPage = 0;

  function goToNextFeatured() {
    if (currentFeaturedPage < totalFeaturedPages - 1) {
      currentFeaturedPage++;
      scrollFeatured();
    }
  }
  function goToPrevFeatured() {
    if (currentFeaturedPage > 0) {
      currentFeaturedPage--;
      scrollFeatured();
    }
  }
  function scrollFeatured() {
    const wrapperWidth = document.querySelector(".carousel-wrapper").clientWidth;
    featuredCarousel.scrollTo({ left: currentFeaturedPage * wrapperWidth, behavior: "smooth" });
  }
  featuredNextBtn.addEventListener("click", goToNextFeatured);
  featuredPrevBtn.addEventListener("click", goToPrevFeatured);

  // 4) Sidebar Toggle
  const sidebar = document.getElementById("sidebar");
  const layoutWrapper = document.getElementById("layoutWrapper");
  const sidebarToggle = document.getElementById("sidebarToggle");

  sidebarToggle.addEventListener("click", () => {
    // On large screens, toggling .collapsed hides text.
    // On mobile, we add/remove .open to slide it in/out.
    if (window.innerWidth > 800) {
      sidebar.classList.toggle("collapsed");
      layoutWrapper.classList.toggle("collapsed");
    } else {
      // On mobile, just open/close the drawer
      sidebar.classList.toggle("open");
    }
  });

  // 5) Log Out Link
  const logoutLink = document.getElementById("logoutLink");
  logoutLink.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Logged out!");
    window.location.href = "login.html"; 
  });

  // Helper: open description page with query params
  function goToBookDescription(book) {
    const params = new URLSearchParams({
      title: book.title,
      cover: book.cover,
      description: book.description
    });
    window.location.href = "bookDescription.html?" + params.toString();
  }
});
