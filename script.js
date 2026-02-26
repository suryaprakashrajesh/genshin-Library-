/* =========================
   VARIABLES
========================= */
let userHasInteracted = false;

const cards = document.querySelectorAll(".img-card"); // INITIAL load fallback
const buttons = document.querySelectorAll(".filter-bar button");
const searchInput = document.getElementById("searchInput");
const emptyState = document.getElementById("emptyState");
const suggestionBox = document.getElementById("suggestions");

const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const modalClose = document.querySelector(".modal-close");
const modalInfo = document.getElementById("modalInfo");
const modalPrev = document.querySelector(".modal-prev");
const modalNext = document.querySelector(".modal-next");

/* =========================
   UPLOAD MODAL ELEMENTS
========================= */
const btnOpenUpload = document.getElementById("btnOpenUpload");
const uploadModal = document.getElementById("uploadModal");
const uploadModalClose = document.getElementById("uploadModalClose");
const uploadForm = document.getElementById("uploadForm");
const uploadStatus = document.getElementById("uploadStatus");

let currentModalIndex = -1;
let visibleCards = [];

/* FIX: define closeBtn safely */
const closeBtn = modalClose;

/* FORCE HIDE EMPTY STATE ON INITIAL LOAD */
if (emptyState) {
  emptyState.style.display = "none";
}

/* =========================
   IMAGE CLICK → MODAL
========================= */
function openModal(clickedCard) {
  modal.classList.add("active");
  modalImg.src = clickedCard.querySelector("img").src;
  modalImg.alt = clickedCard.querySelector("img").alt || "Gallery image";

  // Set card info
  const tagText = clickedCard.querySelector(".tag")?.textContent || "Gallery Image";
  modalInfo.textContent = tagText;

  // Get all currently visible cards for navigation
  visibleCards = Array.from(document.querySelectorAll(".img-card:not([style*='display: none'])"));
  currentModalIndex = visibleCards.indexOf(clickedCard);

  document.body.style.overflow = "hidden";
}

document.querySelectorAll(".img-card img").forEach(img => {
  img.addEventListener("click", () => {
    const card = img.closest(".img-card");
    openModal(card);
  });
});

modalClose.addEventListener("click", closeModal);

modal.addEventListener("click", e => {
  if (e.target === modal) closeModal();
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (!modal.classList.contains("active")) return;

  if (e.key === "Escape") closeModal();
  if (e.key === "ArrowLeft") navigatePrevious();
  if (e.key === "ArrowRight") navigateNext();
});

function closeModal() {
  modal.classList.remove("active");
  modalImg.src = "";
  modalImg.alt = "";
  document.body.style.overflow = "";
  currentModalIndex = -1;
  visibleCards = [];
}

function navigateNext() {
  if (visibleCards.length === 0) return;
  currentModalIndex = (currentModalIndex + 1) % visibleCards.length;
  updateModal();
}

function navigatePrevious() {
  if (visibleCards.length === 0) return;
  currentModalIndex = (currentModalIndex - 1 + visibleCards.length) % visibleCards.length;
  updateModal();
}

function updateModal() {
  const card = visibleCards[currentModalIndex];
  modalImg.src = card.querySelector("img").src;
  modalImg.alt = card.querySelector("img").alt || "Gallery image";
  const tagText = card.querySelector(".tag")?.textContent || "Gallery Image";
  modalInfo.textContent = tagText;
}

if (modalNext) {
  modalNext.addEventListener("click", (e) => {
    e.stopPropagation();
    navigateNext();
  });
}

if (modalPrev) {
  modalPrev.addEventListener("click", (e) => {
    e.stopPropagation();
    navigatePrevious();
  });
}

let activeKey = "all";

/* =========================
   BUTTON FILTER
========================= */
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    userHasInteracted = true;

    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    activeKey = btn.dataset.key.toLowerCase();
    searchInput.value = "";
    suggestionBox.style.display = "none";

    applyFilters();
  });
});

/* =========================
   SEARCH FILTER
========================= */
searchInput.addEventListener("input", () => {
  userHasInteracted = true;
  applyFilters();
  showSuggestions();
});

/* =========================
   MAIN FILTER FUNCTION
========================= */
function applyFilters() {
  const query = searchInput.value.toLowerCase().trim();
  let visibleCount = 0;

  // Re-query cards to include dynamically added ones
  const currentCards = document.querySelectorAll(".img-card");

  currentCards.forEach(card => {
    const keywords = card.dataset.keywords.toLowerCase();

    const matchButton =
      activeKey === "all" || keywords.includes(activeKey);

    const matchSearch =
      query === "" || keywords.includes(query);

    if (matchButton && matchSearch) {
      card.style.display = "block";
      visibleCount++;
    } else {
      card.style.display = "none";
    }
  });

  /* HARD GUARD: never show empty state on first load */
  if (!userHasInteracted && query === "" && activeKey === "all") {
    emptyState.style.display = "none";
    return;
  }

  /* Show empty state only when appropriate */
  if (visibleCount === 0) {
    emptyState.style.display = "block";
  } else {
    emptyState.style.display = "none";
  }
}

/* =========================
   AUTOCOMPLETE DATA
========================= */
/* =========================
   FETCH ALL CHARACTER NAMES (AUTO)
========================= */
async function fetchCategoryMembers(categoryTitle, max = 5000) {
  const endpoint = "https://genshin-impact.fandom.com/api.php";
  let cmcontinue = null;
  const results = [];
  let safety = 0;

  while (results.length < max) {
    safety++;
    if (safety > 50) break;

    const params = new URLSearchParams({
      action: "query",
      list: "categorymembers",
      cmtitle: categoryTitle,
      cmlimit: "max",
      format: "json",
      origin: "*"
    });

    if (cmcontinue) params.set("cmcontinue", cmcontinue);

    const res = await fetch(`${endpoint}?${params}`);
    const data = await res.json();

    (data.query?.categorymembers || []).forEach(m => {
      if (m?.title) results.push(m.title);
    });

    cmcontinue = data.continue?.cmcontinue;
    if (!cmcontinue) break;
  }

  return results;
}

function normalizeTitle(title) {
  return title
    .replace(/^Category:/i, "")
    .replace(/\/Storyline$/i, "")
    .trim();
}

function uniqueSorted(list) {
  return [...new Set(list)].sort((a, b) => a.localeCompare(b));
}

async function buildCharacterNameList() {
  const playable = await fetchCategoryMembers("Category:Playable Characters");
  const allCharacters = await fetchCategoryMembers("Category:Characters");

  const combined = [...playable, ...allCharacters].map(normalizeTitle);

  const blocked = new Set([
    "Character", "Characters", "Playable Characters", "NPCs"
  ]);

  return uniqueSorted(
    combined.filter(n => n && !blocked.has(n) && !n.includes("List"))
  );
}

/* =========================
   REPLACE characters ARRAY
========================= */
let characters = [];

(async () => {
  try {
    characters = await buildCharacterNameList();
    console.log("Loaded characters:", characters.length);
  } catch (err) {
    console.error("Character load failed", err);
  }
})();

/* =========================
   AUTOCOMPLETE LOGIC
========================= */
function showSuggestions() {
  const query = searchInput.value.toLowerCase().trim();
  suggestionBox.innerHTML = "";

  if (!query) {
    suggestionBox.style.display = "none";
    return;
  }

  const matches = characters.filter(name =>
    name.toLowerCase().includes(query)
  );

  matches.slice(0, 6).forEach(name => {
    const li = document.createElement("li");
    li.textContent = name;
    li.addEventListener("click", () => {
      userHasInteracted = true;
      searchInput.value = name;
      suggestionBox.style.display = "none";
      applyFilters();
    });
    suggestionBox.appendChild(li);
  });

  suggestionBox.style.display = matches.length ? "block" : "none";
}

/* =========================
   FULLSCREEN IMAGE MODAL (SAFETY)
========================= */
closeBtn.addEventListener("click", closeModal);

modal.addEventListener("click", e => {
  if (e.target === modal) closeModal();
});

/* =========================
   UPLOAD MODAL LOGIC & FIREBASE
========================= */
if (btnOpenUpload) {
  btnOpenUpload.addEventListener("click", (e) => {
    e.preventDefault();
    uploadModal.classList.add("active");
    document.body.style.overflow = "hidden";
  });
}

function closeUploadModal() {
  uploadModal.classList.remove("active");
  document.body.style.overflow = "";
  uploadForm.reset();
  uploadStatus.textContent = "";
}

if (uploadModalClose) {
  uploadModalClose.addEventListener("click", closeUploadModal);
}
if (uploadModal) {
  uploadModal.addEventListener("click", e => {
    if (e.target === uploadModal) closeUploadModal();
  });
}

// Ensure Firebase is loaded before trying to use it
async function handleUpload(e) {
  e.preventDefault();

  const fileInput = document.getElementById("imageUpload");
  const tagsInput = document.getElementById("imageTags").value.trim();
  const elementInput = document.getElementById("imageElement").value;

  const file = fileInput.files[0];
  if (!file) return;

  const submitBtn = document.getElementById("btnSubmitUpload");
  submitBtn.disabled = true;
  submitBtn.textContent = "Uploading...";
  uploadStatus.style.color = "var(--text-secondary)";
  uploadStatus.textContent = "Uploading image and saving metadata...";

  try {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("tags", tagsInput);
    formData.append("element", elementInput);

    const response = await fetch("http://localhost:3000/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Server returned ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (data.success) {
      uploadStatus.style.color = "#4ade80"; // green
      uploadStatus.textContent = "Upload successful! Image added to gallery.";

      // Refresh the gallery automatically
      fetchAndRenderLocalImages();

      // Close modal after 1.5 seconds
      setTimeout(() => {
        closeUploadModal();
        submitBtn.disabled = false;
        submitBtn.textContent = "Upload Image";
      }, 1500);
    } else {
      throw new Error(data.error || "Upload failed");
    }
  } catch (error) {
    console.error("Upload failed", error);
    uploadStatus.style.color = "#f87171"; // red
    uploadStatus.textContent = "Error uploading image: " + error.message;
    submitBtn.disabled = false;
    submitBtn.textContent = "Try Again";
  }
}

if (uploadForm) {
  uploadForm.addEventListener("submit", handleUpload);
}

/* =========================
   FETCH & RENDER LOCAL IMAGES
========================= */
const galleryContainer = document.querySelector(".gallery");

async function fetchAndRenderLocalImages() {
  try {
    const response = await fetch("http://localhost:3000/api/images");
    if (!response.ok) {
      throw new Error(`Server returned ${response.status} ${response.statusText}`);
    }
    const images = await response.json();

    // Remove old dynamically added cards first
    document.querySelectorAll(".dynamic-firebase-card").forEach(el => el.remove());

    // Re-query static cards to apply random bento classes if they don't have them
    document.querySelectorAll(".gallery > .img-card:not(.dynamic-firebase-card):not(.bento-styled)").forEach((card, index) => {
      card.classList.add("bento-styled");
      // Read element for glow class
      const btnElement = card.querySelector('.img-card-element');
      if (btnElement) {
        card.classList.add(`glow-${btnElement.textContent.toLowerCase()}`);
      }

      // Randomize sizes but keep featured ones large
      if (!card.classList.contains('featured')) {
        const rand = Math.random();
        if (rand > 0.85) card.classList.add("card-large");
        else if (rand > 0.65) card.classList.add("card-tall");
        else if (rand > 0.5) card.classList.add("card-wide");
      } else {
        card.classList.add("card-large"); // Featured is always large
      }
    });

    reversedImages.forEach((data, index) => {
      // Determine random bento size for visually interesting grid
      let sizeClass = "";
      const rand = Math.random();
      if (rand > 0.85) sizeClass = "card-large";
      else if (rand > 0.65) sizeClass = "card-tall";
      else if (rand > 0.5) sizeClass = "card-wide";

      const elementClass = `glow-${data.element.toLowerCase()}`;

      const cardHTML = `
        <div class="img-card dynamic-firebase-card ${sizeClass} ${elementClass}" data-keywords="${data.tags.toLowerCase()} ${data.element.toLowerCase()}" style="display: block;">
          <img src="${data.url}" loading="lazy" alt="${data.tags}">
          <div class="img-card-badges">
            <span class="img-card-element">${data.element}</span>
          </div>
          <span class="tag">${data.tags}</span>
        </div>
      `;
      // Insert right at the top of the gallery
      galleryContainer.insertAdjacentHTML('afterbegin', cardHTML);
    });

    // Re-attach modal listeners for the new images
    document.querySelectorAll(".dynamic-firebase-card img").forEach(img => {
      img.addEventListener("click", () => {
        const card = img.closest(".img-card");
        openModal(card);
      });
    });

    // Update the global NodeList `cards` used for searching/filtering
    // We must re-query because we added new DOM nodes
    const allCards = document.querySelectorAll(".img-card");
    // We already check `document.querySelectorAll(".img-card")` inside applyFilters() so it's handled.
  } catch (error) {
    console.error("Error fetching images from backend: ", error);
  }
}

// Initial fetch when the window loads
window.addEventListener("load", () => {
  // Give Firebase a tiny moment to initialize window objects from index.html
  setTimeout(fetchAndRenderLocalImages, 500);
});

/* =========================
   FOX VIDEO INTERACTION
========================= */
const foxCard = document.getElementById("foxCard");
const foxVideo = document.getElementById("foxVideo");
const foxClose = document.getElementById("foxClose");

/* FORCE AUTOPLAY SAFETY */
window.addEventListener("load", () => {
  const foxVideo = document.getElementById("foxVideo");
  if (foxVideo) {
    foxVideo.muted = true;
    foxVideo.play().catch(() => {
      // autoplay blocked silently
    });
  }
});
document.getElementById("year").textContent = new Date().getFullYear();

/* Ensure fox card stays fixed bottom-right and does not move on scroll */
; (function fixFoxCard() {
  const fox = document.getElementById("foxCard");
  if (!fox) return;
  fox.style.position = 'fixed';
  fox.style.bottom = '20px';
  fox.style.right = '20px';
  fox.style.zIndex = '9999';
})();
