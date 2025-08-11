// main.js

// Carousel data
const carouselData = [
  {
    img: 'images/Rectangle 24.png',
    title: 'Inner Peace',
    room: '01 — Bed Room'
  },
  {
    img: 'images/Rectangle 25.png',
    title: 'Comfort Space',
    room: '02 — Living Room'
  },
  {
    img: 'images/ractangle 27.jpg',
    title: 'Clean Vibes',
    room: '03 — Dining'
  }
];

// Universal include function
function includeHTML() {
  document.querySelectorAll('[data-include]').forEach(el => {
    const file = el.getAttribute('data-include');
    fetch(file)
      .then(response => {
        if (!response.ok) throw new Error(`Could not fetch ${file}`);
        return response.text();
      })
      .then(data => el.innerHTML = data)
      .catch(error => console.error(`Error including ${file}:`, error));
  });
}

// Page-specific initialization
function initShopPage() {
  console.log("Shop page initialized");

  const carouselContainer = document.getElementById('carousel');
  const dots = document.querySelectorAll('.dot');
  const nextBtn = document.getElementById('next');

  if (!carouselContainer || !nextBtn || dots.length === 0) {
    console.warn("Carousel elements not found");
    return;
  }

  function renderCarousel() {
    carouselContainer.innerHTML = '';

    carouselData.forEach((item, index) => {
      const div = document.createElement('div');
      div.classList.add('carousel-item', index === 0 ? 'main' : 'side');

      div.innerHTML = `
        <img src="${item.img}" alt="Room ${index + 1}">
        <div class="overlay">
          <span>${item.room}</span>
          <h3>${item.title}</h3>
          <div class="arrow-btn">→</div>
        </div>
      `;

      carouselContainer.appendChild(div);
    });

    updateDots();
  }

  function updateDots() {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[0].classList.add('active');
  }

  nextBtn.addEventListener('click', () => {
    const first = carouselData.shift();
    carouselData.push(first);
    renderCarousel();
  });

  renderCarousel();
}

// Entry point
window.addEventListener('DOMContentLoaded', () => {
  includeHTML();

  const page = document.body.getAttribute('data-page');
  if (page === "shop") {
    initShopPage();
  }
});
document.getElementById('gridBtn').addEventListener('click', () => {
  document.getElementById('gridBtn').classList.add('active');
  document.getElementById('listBtn').classList.remove('active');
  // add your code to switch to grid view here
});

document.getElementById('listBtn').addEventListener('click', () => {
  document.getElementById('listBtn').classList.add('active');
  document.getElementById('gridBtn').classList.remove('active');
  // add your code to switch to list view here
});
