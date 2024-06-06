// const images = document.querySelectorAll('[data-src]');

// const options = {
//   threshold: 0,
// };

// const observer = new IntersectionObserver(onEntry, options);

// function onEntry(entries, observer) {
//   // console.log(entries);
//   entries.forEach(entry => {
//     // console.log(entry);
//     if (!entry.isIntersecting) {
//       return;
//     } else {
//       // console.log(entry.target);
//       preloadImage(entry.target);
//       observer.unobserve(entry.target);
//     }
//   });
// }

// function preloadImage(img) {
//   const src = img.getAttribute('data-src');
//   if (!src) {
//     return;
//   }
//   img.src = src;
//   img.classList.add('show');
// }

// images.forEach(image => {
//   observer.observe(image);
// });

// ===================================================
const cards = document.querySelectorAll('.card');

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      entry.target.classList.toggle('show', entry.isIntersecting);
      // if (entry.isIntersecting) {
      //   observer.unobserve(entry.target);
      // }
    });
  },
  {
    // threshold: 0.5,
    // rootMargin: '-100px',
  },
);

const lastCardObserver = new IntersectionObserver(
  entries => {
    const lastCard = entries[0];
    if (!lastCard.isIntersecting) {
      return;
    }

    loadNewCards();
    lastCardObserver.unobserve(lastCard.target);
    lastCardObserver.observe(document.querySelector('.card:last-child'));
  },
  {
    rootMargin: '100px',
  },
);

lastCardObserver.observe(document.querySelector('.card:last-child'));

cards.forEach(card => {
  observer.observe(card);
});

const cardContainer = document.querySelector('.card__container');
function loadNewCards() {
  for (let i = 0; i < 10; i++) {
    const card = document.createElement('div');
    card.textContent = 'New card';
    card.classList.add('card');
    observer.observe(card);
    cardContainer.append(card);
  }
}
