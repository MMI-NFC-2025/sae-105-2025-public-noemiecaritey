// Carousel Programme
document.addEventListener('DOMContentLoaded', function() {
  const carouselTrack = document.querySelector('.carousel__track');
  const carouselLink = carouselTrack.querySelector('.carousel__link');
  const carouselImage = carouselTrack.querySelector('img');
  const programmeTitle = document.querySelector('.section__title');
  const btnPrev = document.querySelector('.carousel__btn--prev');
  const btnNext = document.querySelector('.carousel__btn--next');

  // Les slides du carousel
  const slides = [
    {
      image: 'assets/img/image2.avif',
      title: 'Programme',
      link: 'assets/programme.html'
    },
    {
      image: 'assets/img/image12.avif',
      title: 'Historique',
      link: 'assets/historique.html'
    },
    {
      image: 'assets/img/image6.avif',
      title: 'Scènes',
      link: 'assets/scenes.html'
    }
  ];

  let currentSlide = 0;

  // Fonction pour mettre à jour le carousel
  function updateCarousel() {
    carouselImage.src = slides[currentSlide].image;
    carouselLink.href = slides[currentSlide].link;
    programmeTitle.textContent = slides[currentSlide].title;
  }

  // Bouton suivant (flèche droite)
  btnNext.addEventListener('click', function() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel();
  });

  // Bouton précédent (flèche gauche)
  btnPrev.addEventListener('click', function() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateCarousel();
  });
});
