
const worlds = {
  forest: {
    title: "Whispering Forest",
    description: "Welcome to a world where ancient trees whisper forgotten stories, glowing fireflies light your path and every shadow holds a little mystery.",
    icon: "🌲"
  },

  ocean: {
    title: "Ocean of Dreams",
    description: "Breathe in the magic of endless blue waters, glowing waves and a sky full of stars. Here, everything feels peaceful.",
    icon: "🌊"
  },

  cosmos: {
    title: "Cosmic Kingdom",
    description: "Travel beyond the stars into a universe of glowing planets, endless galaxies and beautiful possibilities.",
    icon: "🌌"
  },

  rose: {
    title: "Rose Garden",
    description: "A secret garden where flowers bloom beneath a dreamy sky and every corner feels like a beautiful memory.",
    icon: "🌹"
  },

  winter: {
    title: "Frozen Wonderland",
    description: "Discover a peaceful kingdom covered in sparkling snow, silver moonlight and the softest winter magic.",
    icon: "❄️"
  },

  sunset: {
    title: "Golden Horizon",
    description: "Walk towards a golden sunset where the sky glows with warm colours and every ending becomes a new beginning.",
    icon: "🌅"
  }
};

// GUIDE STORIES

const stories = [
  "Hello, dreamer! I'm your magical guide. Together, we'll discover six beautiful worlds. Are you ready for an adventure?",

  "Our first destination is the Whispering Forest. Ancient trees, glowing fireflies and secrets are waiting for us.",

  "Next, let's dive into the Ocean of Dreams. A peaceful world where the stars dance above the waves.",

  "Look up! The Cosmic Kingdom is waiting. Beyond the stars, an entire universe of possibilities is hidden.",

  "Can you smell the roses? Welcome to the Rose Garden, where every flower tells a beautiful story.",

  "Let's discover the Frozen Wonderland. A sparkling kingdom where winter feels like a dream.",

  "Finally, the Golden Horizon. Remember, every ending is just another beautiful beginning."
];

let storyIndex = 0;

const guideSpeech = document.getElementById("guideSpeech");
const speakGuide = document.getElementById("speakGuide");
const nextGuide = document.getElementById("nextGuide");

function showStory() {
  guideSpeech.textContent = stories[storyIndex];
}

function speakText(text) {
  if (!("speechSynthesis" in window)) {
    alert("Your browser does not support voice narration.");
    return;
  }

  window.speechSynthesis.cancel();

  const speech = new SpeechSynthesisUtterance(text);

  speech.lang = "en-US";
  speech.rate = 0.88;
  speech.pitch = 1.15;
  speech.volume = 1;

  window.speechSynthesis.speak(speech);
}

speakGuide.addEventListener("click", () => {
  speakText(guideSpeech.textContent);
});

nextGuide.addEventListener("click", () => {
  storyIndex = (storyIndex + 1) % stories.length;
  showStory();
  speakText(stories[storyIndex]);
});

// MODAL ELEMENTS

const modal = document.getElementById("worldModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalIcon = document.getElementById("modalIcon");

const closeModal = document.getElementById("closeModal");
const modalAction = document.getElementById("modalAction");

let activeDoor = null;

// OPEN A WORLD

document.querySelectorAll(".open-door").forEach(button => {

  button.addEventListener("click", () => {

    if (modal.classList.contains("active")) return;

    const worldKey = button.dataset.world;
    const world = worlds[worldKey];

    if (!world) return;

    const card = button.closest(".world-card");
    const door = card.querySelector(".scene-door");

    activeDoor = door;

    door.classList.add("opening");
    card.classList.add("opened");

    modalTitle.textContent = world.title;
    modalDescription.textContent = world.description;
    modalIcon.textContent = world.icon;

    setTimeout(() => {

      modal.classList.add("active");
      modal.setAttribute("aria-hidden", "false");

      document.body.style.overflow = "hidden";

      speakText(
        "Welcome to " + world.title + ". " + world.description
      );

    }, 850);

  });

});

// CLOSE WORLD

function closeWorld() {

  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";

  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }

  if (activeDoor) {

    const card = activeDoor.closest(".world-card");

    activeDoor.classList.remove("opening");

    if (card) {
      card.classList.remove("opened");
    }

    activeDoor = null;
  }
}

closeModal.addEventListener("click", closeWorld);
modalAction.addEventListener("click", closeWorld);

modal.addEventListener("click", event => {

  if (event.target === modal) {
    closeWorld();
  }

});

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {
    closeWorld();
  }

});

// FLOATING MAGICAL STARS

const starsContainer = document.getElementById("stars");

for (let i = 0; i < 55; i++) {

  const star = document.createElement("span");

  star.className = "star";
  star.textContent = Math.random() > 0.5 ? "✧" : "·";

  star.style.left = Math.random() * 100 + "%";
  star.style.top = Math.random() * 100 + "%";

  star.style.fontSize =
    Math.random() * 12 + 5 + "px";

  star.style.animationDelay =
    Math.random() * 4 + "s";

  star.style.animationDuration =
    Math.random() * 3 + 2 + "s";

  starsContainer.appendChild(star);
}

// SCROLL REVEAL

const revealObserver = new IntersectionObserver(entries => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {

      entry.target.classList.add("revealed");

      revealObserver.unobserve(entry.target);
    }

  });

}, {
  threshold: 0.12
});

document.querySelectorAll(
  ".world-card, .quote-section, .guide-section"
).forEach(item => {

  item.classList.add("reveal");

  revealObserver.observe(item);

});

// STOP VOICE WHEN PAGE IS CLOSED

window.addEventListener("pagehide", () => {

  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }

});
