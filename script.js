document.addEventListener("DOMContentLoaded", () => {
  let books = [];

  books.push({
    title: "Moby Dick",
     author: "Herman Melville",
     cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1605824499i/55953683.jpg",
     categories: ["Classic", "Drama"]
   });

   books.push({
    title: "The Great Gatsby",
     author: "F. Scott fitzgerald",
     cover: "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781471173936/the-great-gatsby-9781471173936_hr.jpg",
     categories: ["Classic", "Drama"]
   });

books.push({
  title: "Pride and Prejudice",
  author: "Jane Austen",
  cover: "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781471134746/pride-and-prejudice-9781471134746_hr.jpg",
  categories: ["Classic", "Romance", "Historical"]
});

books.push({
  title: "Frankenstein",
  author: "Mary Shelley",
  cover: "https://d28hgpri8am2if.cloudfront.net/book_images/cvr9780743487580_9780743487580_hr.jpg",
  categories: ["Classic", "Horror", "Gothic"]
});

books.push({
  title: "Great Expectations",
  author: "Charles Dickens",
  cover: "https://images-na.ssl-images-amazon.com/images/I/91zmPRqkAdL.jpg",
  categories: ["Classic", "Drama", "Bildungsroman"]
});

books.push({
  title: "War and Peace",
  author: "Leo Tolstoy",
  cover: "https://mynextreadinglist.com/wp-content/uploads/2019/01/71ykhMyjntL.jpg",
  categories: ["Classic", "Historical", "Epic"]
});

books.push({
  title: "Jane Eyre",
  author: "Charlotte Brontë",
  cover: "https://cdn2.penguin.com.au/covers/original/9780141441146.jpg",
  categories: ["Classic", "Romance", "Gothic"]
});

books.push({
  title: "Wuthering Heights",
  author: "Emily Brontë",
  cover: "https://tse4.mm.bing.net/th?id=OIP.4dG5NskDxy0nuBilxpuTuQHaLb&pid=Api&P=0&h=180",
  categories: ["Classic", "Romance", "Tragedy"]
});

books.push({
  title: "Crime and Punishment",
  author: "Fyodor Dostoevsky",
  cover: "https://wordsworth-editions.com/wp-content/uploads/2023/07/Crime-and-Punishment-Front-Cover-1.jpg",
  categories: ["Classic", "Psychological", "Philosophical"]
});

books.push({
  title: "A Tale of Two Cities",
  author: "Charles Dickens",
  cover: "https://media1.popsugar-assets.com/files/thumbor/GR2488iXSNoQpXf3jF9lXXog91Y/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2013/09/11/809/n/1922283/afcb8cb8dcc47a56_936full-a-tale-of-two-cities-signet-classics-cover/i/Tale-Two-Cities-Charles-Dickens.jpg",
  categories: ["Classic", "Historical", "Drama"]
});

books.push({
  title: "The Odyssey",
  author: "Homer",
  cover: "http://canonpress.com/cdn/shop/products/canon-classics-books-the-odyssey-worldview-edition-28066900279344.jpg?v=1616168314",
  categories: ["Classic", "Epic", "Adventure"]
});

books.push({
  title: "The Adventures of Huckleberry Finn",
  author: "Mark Twain",
  cover: "https://miro.medium.com/v2/resize:fit:1024/1*Evhi6ziDBAfX7F6sWS8jjw.jpeg",
  categories: ["Classic", "Adventure", "Satire"]
});

books.push({
  title: "The Scarlet Letter",
  author: "Nathaniel Hawthorne",
  cover: "https://support.bl.uk/DynamicImages/4a1cc9c5-9f00-41e6-b3ab-a2c30113b90e/Scarlet-Letter.jpg?width=1024",
  categories: ["Classic", "Historical", "Drama"]
});

books.push({
  title: "Anna Karenina",
  author: "Leo Tolstoy",
  cover: "https://i.pinimg.com/originals/bc/57/1f/bc571f6b5de9b702f7d835be169859bb.jpg",
  categories: ["Classic", "Romance", "Tragedy"]
});

books.push({
  title: "Madame Bovary",
  author: "Gustave Flaubert",
  cover: "https://d28hgpri8am2if.cloudfront.net/book_images/cvr9781416523741_9781416523741_hr.jpg",
  categories: ["Classic", "Realism", "Drama"]
});

books.push({
  title: "Don Quixote",
  author: "Miguel de Cervantes",
  cover: "https://honestreviewsin.files.wordpress.com/2020/08/don-quixote.jpg?w=768",
  categories: ["Classic", "Adventure", "Satire"]
});

books.push({
  title: "The Brothers Karamazov",
  author: "Fyodor Dostoevsky",
  cover: "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781625583826/brothers-karamazov-9781625583826_hr.jpg",
  categories: ["Classic", "Philosophical", "Psychological"]
});

books.push({
  title: "Les Misérables",
  author: "Victor Hugo",
  cover: "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781626864641/les-miserables-9781626864641_hr.jpg",
  categories: ["Classic", "Historical", "Drama"]
});

books.push({
  title: "The Divine Comedy",
  author: "Dante Alighieri",
  cover: "https://cdn2.penguin.com.au/covers/original/9780451208637.jpg",
  categories: ["Classic", "Epic", "Religious"]
});

books.push({
  title: "The Count of Monte Cristo",
  author: "Alexandre Dumas",
  cover: "https://cdn.kobo.com/book-images/f93d05eb-4306-48be-926b-8914b36bc9c3/1200/1200/False/the-count-of-monte-cristo-51.jpg",
  categories: ["Classic", "Adventure", "Drama"]
});

books.push({
  title: "Sense and Sensibility",
  author: "Jane Austen",
  cover: "https://cdn2.penguin.com.au/covers/original/9780375756733.jpg",
  categories: ["Classic", "Romance", "Drama"]
});

books.push({
  title: "Emma",
  author: "Jane Austen",
  cover: "https://cdn.kobo.com/book-images/2559c1ed-c42b-4e36-8293-31e93e7635f6/1200/1200/False/emma-a-to-z-classics.jpg",
  categories: ["Classic", "Romance", "Comedy"]
});

books.push({
  title: "David Copperfield",
  author: "Charles Dickens",
  cover: "https://cdn2.penguin.com.au/covers/original/9780141343822.jpg",
  categories: ["Classic", "Bildungsroman", "Drama"]
});

books.push({
  title: "The Old Man and the Sea",
  author: "Ernest Hemingway",
  cover: "http://ciervoblanco.club/wp-content/uploads/2014/12/the-old-man-and-the-sea.jpg",
  categories: ["Classic", "Adventure", "Drama"]
});

books.push({
  title: "Fahrenheit 451",
  author: "Ray Bradbury",
  cover: "https://i.pinimg.com/originals/0b/c9/1a/0bc91a7a29b03967614ef5ce157ee53e.jpg",
  categories: ["Classic", "Dystopian", "Sci-Fi"]
});

books.push({
  title: "One Hundred Years of Solitude",
  author: "Gabriel García Márquez",
  cover: "https://cdn2.penguin.com.au/covers/original/9780241968581.jpg",
  categories: ["Classic", "Magical Realism", "Drama"]
});

books.push({
  title: "Heart of Darkness",
  author: "Joseph Conrad",
  cover: "https://the-comics-journal.sfo3.digitaloceanspaces.com/wp-content/uploads/2019/09/Heart-of-Darkness-2019Final-scaled.jpg",
  categories: ["Classic", "Adventure", "Psychological"]
});

books.push({
  title: "The Metamorphosis",
  author: "Franz Kafka",
  cover: "https://d28hgpri8am2if.cloudfront.net/book_images/cvr9781416599685_9781416599685_hr.jpg",
  categories: ["Classic", "Absurdist", "Psychological"]
});

books.push({
  title: "A Farewell to Arms",
  author: "Ernest Hemingway",
  cover: "https://i.thenile.io/r1000/9781476764528.jpg?r=5eb6b4e668718",
  categories: ["Classic", "War", "Romance"]
});

books.push({
  title: "The Sound and the Fury",
  author: "William Faulkner",
  cover: "https://static1.squarespace.com/static/507dba43c4aabcfd2216a447/t/5422fff7e4b0c96678dda209/1411579898183/First+edition+cover+of+The+Sound+and+the+Fury",
  categories: ["Classic", "Modernist", "Drama"]
});

books.push({
  title: "Lord of the Flies",
  author: "William Golding",
  cover: "https://via.placeholder.com/140x210?text=Lord+of+the+Flies",
  categories: ["Classic", "Allegory", "Adventure"]
});

books.push({
  title: "The Stranger",
  author: "Albert Camus",
  cover: "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781681771359/the-stranger-9781681771359_hr.jpg",
  categories: ["Classic", "Philosophical", "Existential"]
});

books.push({
  title: "The Trial",
  author: "Franz Kafka",
  cover: "https://isach.info/images/story/cover/the_trial__franz_kafka.jpg",
  categories: ["Classic", "Absurdist", "Psychological"]
});



   
   

  // ------------------ END BOOK DATA ------------------

  // Categories list for generating navigation and filtering.
  const categoriesList = ["Classic", "Loved", "Trending", "Education", "Romance", "Horror", "Adventure", "Dystopian", "Self-Help", "War", "Philosophical", "Psychological", "Drama", "Religious", "Realism", "Tragedy", "Gothic"];

  // Use the same categories for navigation
  const categoryNames = categoriesList;

  // Set pageSize to 5 (5 books per carousel page)
  const pageSize = 7;

  // DOM references
  const searchInputEl = document.getElementById("searchInput");
  const categoryListEl = document.getElementById("categoryList");
  const categoriesContainer = document.getElementById("categoriesContainer");

  // State object to store paging info per category
  const carouselsState = {};

  // Helper function to chunk an array into groups of n items
  function chunkArray(arr, chunkSize) {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  }

  /* ------------------------------------------------------------------
     RENDER MULTIPLE CAROUSELS FOR "ALL" VIEW (one carousel per category)
  ------------------------------------------------------------------ */
  function renderAllCategories(searchFilter = "") {
    categoriesContainer.innerHTML = "";
    categoryNames.forEach((catName) => {
      // Filter books: check if the book's categories include catName (case-insensitive)
      const catBooks = books.filter(
        (b) =>
          b.categories &&
          b.categories.some(c => c.toLowerCase() === catName.toLowerCase()) &&
          b.title.toLowerCase().includes(searchFilter.toLowerCase())
      );
      if (catBooks.length === 0) return;

      // Create the section
      const section = document.createElement("div");
      section.className = "category-section";

      // Section header
      const header = document.createElement("h2");
      header.className = "category-header";
      header.textContent = catName === "Loved" ? "Books We Love" : catName + " Books";
      section.appendChild(header);

      // Create a single carousel container for this category
      const carouselContainer = document.createElement("div");
      carouselContainer.className = "carousel-container";

      // Arrows
      const prevBtn = document.createElement("button");
      prevBtn.className = "carousel-btn left";
      prevBtn.innerHTML = "&#10094;";
      const nextBtn = document.createElement("button");
      nextBtn.className = "carousel-btn right";
      nextBtn.innerHTML = "&#10095;";

      // Carousel wrapper & row
      const wrapper = document.createElement("div");
      wrapper.className = "carousel-wrapper";
      const carouselRow = document.createElement("div");
      carouselRow.className = "carousel";

      // Insert book cards
      catBooks.forEach((book) => {
        const card = document.createElement("div");
        card.className = "book-card";
        card.innerHTML = `
          <div class="cover-container">
            <img src="${book.cover}" alt="${book.title}">
          </div>
          <button class="preview-btn">Read</button>
        `;
        carouselRow.appendChild(card);
      });

      // Build structure
      wrapper.appendChild(carouselRow);
      carouselContainer.appendChild(prevBtn);
      carouselContainer.appendChild(wrapper);
      carouselContainer.appendChild(nextBtn);
      section.appendChild(carouselContainer);
      categoriesContainer.appendChild(section);

      // Calculate pages (5 books per page)
      const totalPages = Math.ceil(catBooks.length / pageSize);
      carouselsState[catName] = {
        currentPage: 0,
        totalPages: totalPages,
        carouselRow: carouselRow,
        prevBtn: prevBtn,
        nextBtn: nextBtn,
      };

      // Arrow events
      prevBtn.addEventListener("click", () =>
        goToPrevPage(catName, carouselContainer)
      );
      nextBtn.addEventListener("click", () =>
        goToNextPage(catName, carouselContainer)
      );
    });
  }

  /* ------------------------------------------------------------------
     RENDER MULTIPLE CAROUSELS FOR A SINGLE CATEGORY
     (Splitting the books into chunks, each chunk is a separate carousel block)
  ------------------------------------------------------------------ */
  function renderSingleCategory(category, searchFilter = "") {
    categoriesContainer.innerHTML = "";
    // Filter books based on category and search
    const filteredBooks = books.filter(
      (b) =>
        b.categories &&
        b.categories.some(c => c.toLowerCase() === category.toLowerCase()) &&
        b.title.toLowerCase().includes(searchFilter.toLowerCase())
    );
    if (filteredBooks.length === 0) return;

    // Chunk the filteredBooks into groups of pageSize
    const chunks = chunkArray(filteredBooks, pageSize);

    // For each chunk, create a separate carousel container
    chunks.forEach((chunk, index) => {
      const section = document.createElement("div");
      section.className = "category-section";

      // Only show header on first carousel block
      if (index === 0) {
        const header = document.createElement("h2");
        header.className = "category-header";
        header.textContent = category === "Loved" ? "Books We Love" : category + " Books";
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

      const wrapper = document.createElement("div");
      wrapper.className = "carousel-wrapper";
      const carouselRow = document.createElement("div");
      carouselRow.className = "carousel";

      chunk.forEach((book) => {
        const card = document.createElement("div");
        card.className = "book-card";
        card.innerHTML = `
          <div class="cover-container">
            <img src="${book.cover}" alt="${book.title}">
          </div>
          <button class="preview-btn">Read</button>
        `;
        carouselRow.appendChild(card);
      });

      wrapper.appendChild(carouselRow);
      carouselContainer.appendChild(prevBtn);
      carouselContainer.appendChild(wrapper);
      carouselContainer.appendChild(nextBtn);
      section.appendChild(carouselContainer);
      categoriesContainer.appendChild(section);

      // For each carousel block, calculate pages (if chunk length is more than one page, usually it's 1)
      const totalPages = Math.ceil(chunk.length / pageSize); // typically 1 if chunk size equals pageSize
      const key = category + "-" + index; // unique key for this carousel block
      carouselsState[key] = {
        currentPage: 0,
        totalPages: totalPages,
        carouselRow: carouselRow,
        prevBtn: prevBtn,
        nextBtn: nextBtn,
      };

      prevBtn.addEventListener("click", () =>
        goToPrevPage(key, carouselContainer)
      );
      nextBtn.addEventListener("click", () =>
        goToNextPage(key, carouselContainer)
      );
    });
  }

  /* ------------------------------------------------------------------
     NEXT/PREV PAGE LOGIC
  ------------------------------------------------------------------ */
  function goToNextPage(key, containerEl) {
    const carousel = carouselsState[key];
    if (!carousel) return;
    if (carousel.currentPage < carousel.totalPages - 1) {
      carousel.currentPage++;
      const wrapper = containerEl.querySelector(".carousel-wrapper");
      wrapper.querySelector(".carousel").scrollTo({
        left: carousel.currentPage * wrapper.clientWidth,
        behavior: "smooth",
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
        behavior: "smooth",
      });
    }
  }

  /* ------------------------------------------------------------------
     EVENT HANDLERS
  ------------------------------------------------------------------ */
  const catItems = document.querySelectorAll("#categoryList li");
  catItems.forEach((item) => {
    item.addEventListener("click", () => {
      catItems.forEach((i) => i.classList.remove("active"));
      item.classList.add("active");
      const chosenCategory = item.getAttribute("data-category");
      const searchFilter = searchInputEl.value.trim().toLowerCase();
      if (chosenCategory === "All") {
        renderAllCategories(searchFilter);
      } else {
        renderSingleCategory(chosenCategory, searchFilter);
      }
    });
  });

  // Search input event
  searchInputEl.addEventListener("input", () => {
    const currentCatItem = document.querySelector("#categoryList li.active");
    if (!currentCatItem) return;
    const chosenCategory = currentCatItem.getAttribute("data-category");
    const searchFilter = searchInputEl.value.trim().toLowerCase();
    if (chosenCategory === "All") {
      renderAllCategories(searchFilter);
    } else {
      renderSingleCategory(chosenCategory, searchFilter);
    }
  });

  /* ------------------------------------------------------------------
     INITIAL RENDER: Default to "All"
  ------------------------------------------------------------------ */
  renderAllCategories("");
});
