document.addEventListener("DOMContentLoaded", () => {
  // ------------------ BOOK DATA ------------------
  // Add your book objects here. Each book should include:
  // title, author, cover, categories, releaseDate, description.
  let books = [];
  // (Sample data)
  books.push({
    title: "Moby Dick",
    author: "Herman Melville",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1605824499i/55953683.jpg",
    categories: ["Classic", "Drama"],
    releaseDate: "1851",
    description: "A classic tale of obsession with a white whale."
  });
  books.push({
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    cover: "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781471173936/the-great-gatsby-9781471173936_hr.jpg",
    categories: ["Classic", "Drama"],
    releaseDate: "1925",
    description: "A portrait of the Jazz Age and a critique of the American Dream."
  });
  books.push({
    title: "Pride and Prejudice",
    author: "Jane Austen",
    cover: "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781471134746/pride-and-prejudice-9781471134746_hr.jpg",
    categories: ["Classic", "Romance", "Historical"],
    releaseDate: "1813",
    description: "A witty commentary on early 19th century societal expectations."
  });
  books.push({
    title: "Frankenstein",
    author: "Mary Shelley",
    cover: "https://d28hgpri8am2if.cloudfront.net/book_images/cvr9780743487580_9780743487580_hr.jpg",
    categories: ["Classic", "Horror", "Gothic"],
    releaseDate: "1818",
    description: "A pioneering tale of science and the perils of playing God."
  });

  books.push({
    title: "Frankenstein",
    author: "Mary Shelley",
    cover: "https://d28hgpri8am2if.cloudfront.net/book_images/cvr9780743487580_9780743487580_hr.jpg",
    categories: ["Classic", "Horror", "Gothic"],
    releaseDate: "1818",
    description: "A pioneering tale of science and the perils of playing God."
  });

  books.push({
    title: "Frankenstein",
    author: "Mary Shelley",
    cover: "https://d28hgpri8am2if.cloudfront.net/book_images/cvr9780743487580_9780743487580_hr.jpg",
    categories: ["Classic", "Horror", "Gothic"],
    releaseDate: "1818",
    description: "A pioneering tale of science and the perils of playing God."
  });

  books.push({
    title: "Frankenstein",
    author: "Mary Shelley",
    cover: "https://d28hgpri8am2if.cloudfront.net/book_images/cvr9780743487580_9780743487580_hr.jpg",
    categories: ["Classic", "Horror", "Gothic"],
    releaseDate: "1818",
    description: "A pioneering tale of science and the perils of playing God."
  });

  books.push({
    title: "Frankenstein",
    author: "Mary Shelley",
    cover: "https://d28hgpri8am2if.cloudfront.net/book_images/cvr9780743487580_9780743487580_hr.jpg",
    categories: ["Classic", "Horror", "Gothic"],
    releaseDate: "1818",
    description: "A pioneering tale of science and the perils of playing God."
  });

  books.push({
    title: "Frankenstein",
    author: "Mary Shelley",
    cover: "https://d28hgpri8am2if.cloudfront.net/book_images/cvr9780743487580_9780743487580_hr.jpg",
    categories: ["Classic", "Horror", "Gothic"],
    releaseDate: "1818",
    description: "A pioneering tale of science and the perils of playing God."
  });
  // ... (Add more book objects as needed)
  // ------------------ END BOOK DATA ------------------

  // Populate filter options arrays
  const categoriesForFilter = ["All"].concat(["Classic", "Loved", "Trending", "Education", "Romance", "Horror", "Adventure", "Dystopian", "Self-Help", "Historical", "Philosophical", "Psychological", "Drama", "Religious", "Realism", "Tragedy", "Gothic"]);
  const authorsForFilter = ["All"].concat(Array.from(new Set(books.map(b => b.author))));
  const datesForFilter = ["All"].concat(Array.from(new Set(books.map(b => b.releaseDate))).sort());

  // DOM references for custom dropdowns
  const filterCategoryEl = document.getElementById("dropdownCategory");
  const filterAuthorEl = document.getElementById("dropdownAuthor");
  const filterDateEl = document.getElementById("dropdownDate");

  // Populate dropdown options (in <ul class="dropdown-options">)
  function populateDropdown(dropdownEl, optionsArray) {
    const optionsList = dropdownEl.querySelector(".dropdown-options");
    optionsList.innerHTML = "";
    optionsArray.forEach(opt => {
      const li = document.createElement("li");
      li.textContent = opt;
      li.setAttribute("data-value", opt);
      optionsList.appendChild(li);
    });
    // Set default value to "All"
    dropdownEl.querySelector(".dropdown-input").value = "All";
  }
  populateDropdown(filterCategoryEl, categoriesForFilter);
  populateDropdown(filterAuthorEl, authorsForFilter);
  populateDropdown(filterDateEl, datesForFilter);

  // Setup custom dropdown behavior (including internal search)
  function setupDropdown(dropdownEl) {
    const input = dropdownEl.querySelector(".dropdown-input");
    const menu = dropdownEl.querySelector(".dropdown-menu");
    const search = dropdownEl.querySelector(".dropdown-search");
    const optionsList = dropdownEl.querySelectorAll(".dropdown-options li");

    input.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdownEl.classList.toggle("open");
      search.value = "";
      optionsList.forEach(opt => { opt.style.display = "block"; });
    });
    // When clicking an option, update the input and close dropdown
    dropdownEl.querySelector(".dropdown-options").addEventListener("click", (e) => {
      if(e.target.tagName.toLowerCase() === "li") {
        input.value = e.target.getAttribute("data-value");
        dropdownEl.classList.remove("open");
        updateFilters();
      }
    });
    // Filter options based on search input inside dropdown
    search.addEventListener("input", () => {
      const filterVal = search.value.trim().toLowerCase();
      optionsList.forEach(opt => {
        if(opt.textContent.toLowerCase().includes(filterVal)) {
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

  // Global search input
  const searchInputEl = document.getElementById("searchInput");

  // Get filter values
  function getFilters() {
    return {
      filterCategory: filterCategoryEl.querySelector(".dropdown-input").value || "All",
      filterAuthor: filterAuthorEl.querySelector(".dropdown-input").value || "All",
      filterDate: filterDateEl.querySelector(".dropdown-input").value || "All",
      searchText: searchInputEl.value.trim().toLowerCase()
    };
  }

  const carouselsState = {};
  const pageSize = 7;
  const categoriesContainer = document.getElementById("categoriesContainer");

  function chunkArray(arr, chunkSize) {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  }

  function renderAllCategories(filters) {
    categoriesContainer.innerHTML = "";
    // For each category from our dropdown options (skip "All")
    categoriesForFilter.slice(1).forEach((catName) => {
      const catBooks = books.filter(b => {
        let match = true;
        match = match && b.categories && b.categories.some(c => c.toLowerCase() === catName.toLowerCase());
        if(filters.filterAuthor !== "All") {
          match = match && b.author.toLowerCase() === filters.filterAuthor.toLowerCase();
        }
        if(filters.filterDate !== "All") {
          match = match && b.releaseDate === filters.filterDate;
        }
        if(filters.searchText) {
          match = match && b.title.toLowerCase().includes(filters.searchText);
        }
        return match;
      });
      if(catBooks.length === 0) return;
      const section = document.createElement("div");
      section.className = "category-section";
      const header = document.createElement("h2");
      header.className = "category-header";
      header.textContent = catName === "Loved" ? "Books We Love" : catName + " Books";
      section.appendChild(header);
      const carouselContainer = document.createElement("div");
      carouselContainer.className = "carousel-container";
      const prevBtn = document.createElement("button");
      prevBtn.className = "carousel-btn left";
      prevBtn.innerHTML = "&#10094;";
      const nextBtn = document.createElement("button");
      nextBtn.className = "carousel-btn right";
      nextBtn.innerHTML = "&#10095;";
      const wrapper = document.createElement("div");
      wrapper.className = "carousel-wrapper";
      const carouselRow = document.createElement("div");
      carouselRow.className = "carousel";
      catBooks.forEach(book => {
        const card = document.createElement("div");
        card.className = "book-card";
        card.innerHTML = `
          <div class="cover-container">
            <img src="${book.cover}" alt="${book.title}">
          </div>
          <button class="preview-btn">Read</button>
        `;
        card.querySelector(".cover-container").addEventListener("click", () => {
          const description = book.description || "No description available.";
          const params = new URLSearchParams({
            title: book.title,
            author: book.author,
            cover: book.cover,
            description: description
          });
          window.location.href = "book.discription.html?" + params.toString();
        });
        carouselRow.appendChild(card);
      });
      wrapper.appendChild(carouselRow);
      carouselContainer.appendChild(prevBtn);
      carouselContainer.appendChild(wrapper);
      carouselContainer.appendChild(nextBtn);
      section.appendChild(carouselContainer);
      categoriesContainer.appendChild(section);
      const totalPages = Math.ceil(catBooks.length / pageSize);
      carouselsState[catName] = {
        currentPage: 0,
        totalPages: totalPages,
        carouselRow: carouselRow,
        prevBtn: prevBtn,
        nextBtn: nextBtn
      };
      prevBtn.addEventListener("click", () => goToPrevPage(catName, carouselContainer));
      nextBtn.addEventListener("click", () => goToNextPage(catName, carouselContainer));
    });
  }

  function renderSingleCategory(filters) {
    categoriesContainer.innerHTML = "";
    const filteredBooks = books.filter(b => {
      let match = true;
      if(filters.filterCategory !== "All") {
        match = match && b.categories && b.categories.some(c => c.toLowerCase() === filters.filterCategory.toLowerCase());
      }
      if(filters.filterAuthor !== "All") {
        match = match && b.author.toLowerCase() === filters.filterAuthor.toLowerCase();
      }
      if(filters.filterDate !== "All") {
        match = match && b.releaseDate === filters.filterDate;
      }
      if(filters.searchText) {
        match = match && b.title.toLowerCase().includes(filters.searchText);
      }
      return match;
    });
    if(filteredBooks.length === 0) return;
    const chunks = chunkArray(filteredBooks, pageSize);
    chunks.forEach((chunk, index) => {
      const section = document.createElement("div");
      section.className = "category-section";
      if(index === 0) {
        const header = document.createElement("h2");
        header.className = "category-header";
        header.textContent = filters.filterCategory === "Loved" ? "Books We Love" : filters.filterCategory + " Books";
        section.appendChild(header);
      }
      const carouselContainer = document.createElement("div");
      carouselContainer.className = "carousel-container";
      const prevBtn = document.createElement("button");
      prevBtn.className = "carousel-btn left";
      prevBtn.innerHTML = "&#10094;";
      const nextBtn = document.createElement("button");
      nextBtn.className = "carousel-btn right";
      nextBtn.innerHTML = "&#10095;";
      const wrapperDiv = document.createElement("div");
      wrapperDiv.className = "carousel-wrapper";
      const carouselRow = document.createElement("div");
      carouselRow.className = "carousel";
      chunk.forEach(book => {
        const card = document.createElement("div");
        card.className = "book-card";
        card.innerHTML = `
          <div class="cover-container" data-tooltip="Title: ${book.title}\nAuthor: ${book.author}\nGenre: ${book.categories.join(', ')}">
            <img src="${book.cover}" alt="${book.title}">
          </div>
          <button class="preview-btn">Read</button>
        `;
        card.querySelector(".cover-container").addEventListener("click", () => {
          const description = book.description || "No description available.";
          const params = new URLSearchParams({
            title: book.title,
            author: book.author,
            cover: book.cover,
            description: description
          });
          window.location.href = "book.discription.html?" + params.toString();
        });
        carouselRow.appendChild(card);
      });
      wrapperDiv.appendChild(carouselRow);
      carouselContainer.appendChild(prevBtn);
      carouselContainer.appendChild(wrapperDiv);
      carouselContainer.appendChild(nextBtn);
      section.appendChild(carouselContainer);
      categoriesContainer.appendChild(section);
      const totalPages = Math.ceil(chunk.length / pageSize);
      const key = filters.filterCategory + "-" + index;
      carouselsState[key] = {
        currentPage: 0,
        totalPages: totalPages,
        carouselRow: carouselRow,
        prevBtn: prevBtn,
        nextBtn: nextBtn
      };
      prevBtn.addEventListener("click", () => goToPrevPage(key, carouselContainer));
      nextBtn.addEventListener("click", () => goToNextPage(key, carouselContainer));
    });
  }

  function updateFilters() {
    const filters = getFilters();
    if(filters.filterCategory === "All") {
      renderAllCategories(filters);
    } else {
      renderSingleCategory(filters);
    }
  }

  function goToNextPage(key, containerEl) {
    const carousel = carouselsState[key];
    if (!carousel) return;
    if (carousel.currentPage < carousel.totalPages - 1) {
      carousel.currentPage++;
      const wrapper = containerEl.querySelector(".carousel-wrapper");
      wrapper.querySelector(".carousel").scrollTo({
        left: carousel.currentPage * wrapper.clientWidth,
        behavior: "smooth"
      });
    }
  }

  function goToPrevPage(key, containerEl) {
    const carousel = carouselsState[key];
    if (!carousel) return;
    if (carousel.currentPage > 0) {
      carousel.currentPage--;
      const wrapper = containerEl.querySelector(".carousel-wrapper");
      wrapper.querySelector(".carousel").scrollTo({
        left: carousel.currentPage * wrapper.clientWidth,
        behavior: "smooth"
      });
    }
  }

  function getFilters() {
    return {
      filterCategory: filterCategoryEl.querySelector(".dropdown-input").value || "All",
      filterAuthor: filterAuthorEl.querySelector(".dropdown-input").value || "All",
      filterDate: filterDateEl.querySelector(".dropdown-input").value || "All",
      searchText: searchInputEl.value.trim().toLowerCase()
    };
  }

  // Global search event
  searchInputEl.addEventListener("input", updateFilters);

  // Initial render
  updateFilters();
});
