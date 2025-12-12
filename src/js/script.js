// Carrousel avec boutons avant/après
// URL : index.html (page d'accueil)
// Carousel Programme
document.addEventListener('DOMContentLoaded', function() {
  const carouselTrack = document.querySelector('.carousel__track');
  
  // Carousel uniquement si les éléments existent
  if (carouselTrack) {
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
  }

  // Menu rétractable avec accessibilité et transitions
  // URL : Toutes les pages (index.html, assets/historique.html, assets/programme.html, etc.)
  // Menu
  const menuBtn = document.querySelector('.menu-btn');
  const menu = document.querySelector('.menu');
  const menuClose = document.querySelector('.menu__close');

  // Ouvrir le menu
  if (menuBtn) {
    menuBtn.addEventListener('click', function() {
      menu.setAttribute('aria-hidden', 'false');
      menuBtn.setAttribute('aria-expanded', 'true');
    });
  }

  // Fermer le menu
  if (menuClose) {
    menuClose.addEventListener('click', function() {
      menu.setAttribute('aria-hidden', 'true');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  }

  // Boutons expand/collapse pour afficher plus de contenu
  // URL : assets/historique.html (sections équipe organisateurs et technique)
  // Boutons expand (plus_derouler)
  const expandButtons = document.querySelectorAll('.btn-expand');
  
  expandButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetId = this.getAttribute('data-target');
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        if (targetElement.classList.contains('team-grid--hidden')) {
          targetElement.classList.remove('team-grid--hidden');
          targetElement.classList.add('team-grid--visible');
        } else {
          targetElement.classList.remove('team-grid--visible');
          targetElement.classList.add('team-grid--hidden');
        }
      }
    });
  });

  // Filtres par scènes avec menu déroulant
  // URL : assets/programme.html
  // Filtres de scènes dans le programme
  const filterScenesBtn = document.getElementById('filter-scenes-btn');
  const scenesDropdown = document.getElementById('scenes-dropdown');
  const sceneOptions = document.querySelectorAll('.scene-option');

  if (filterScenesBtn && scenesDropdown) {
    // Toggle du menu déroulant
    filterScenesBtn.addEventListener('click', function() {
      if (scenesDropdown.style.display === 'none' || scenesDropdown.style.display === '') {
        scenesDropdown.style.display = 'block';
      } else {
        scenesDropdown.style.display = 'none';
      }
    });

    // Fermer le dropdown si on clique ailleurs
    document.addEventListener('click', function(event) {
      if (!filterScenesBtn.contains(event.target) && !scenesDropdown.contains(event.target)) {
        scenesDropdown.style.display = 'none';
      }
    });

    // Filtrage par scène
    sceneOptions.forEach(option => {
      option.addEventListener('click', function() {
        const selectedScene = this.getAttribute('data-scene');
        
        // Mettre à jour les classes actives
        sceneOptions.forEach(opt => opt.classList.remove('active'));
        this.classList.add('active');
        
        // Filtrer les concerts
        const concerts = document.querySelectorAll('.concert-card');
        const locations = document.querySelectorAll('.concert-day__location');
        
        if (selectedScene === 'all') {
          // Afficher tous les concerts
          concerts.forEach(concert => concert.classList.remove('hidden'));
          locations.forEach(location => location.classList.remove('hidden'));
        } else {
          // Filtrer par scène
          concerts.forEach(concert => {
            if (concert.getAttribute('data-scene') === selectedScene) {
              concert.classList.remove('hidden');
            } else {
              concert.classList.add('hidden');
            }
          });
          
          // Gérer l'affichage des titres de location
          locations.forEach(location => {
            const nextConcert = location.nextElementSibling;
            if (nextConcert && nextConcert.classList.contains('concert-card') && !nextConcert.classList.contains('hidden')) {
              location.classList.remove('hidden');
            } else {
              location.classList.add('hidden');
            }
          });
        }
        
        // Fermer le dropdown après sélection
        scenesDropdown.style.display = 'none';
      });
    });
  }

  // Filtres par dates avec menu déroulant
  // URL : assets/programme.html
  // Filtres de dates dans le programme
  const filterDatesBtn = document.getElementById('filter-dates-btn');
  const datesDropdown = document.getElementById('dates-dropdown');
  const dateOptions = document.querySelectorAll('.date-option');

  if (filterDatesBtn && datesDropdown) {
    // Toggle du menu déroulant
    filterDatesBtn.addEventListener('click', function() {
      if (datesDropdown.style.display === 'none' || datesDropdown.style.display === '') {
        datesDropdown.style.display = 'block';
      } else {
        datesDropdown.style.display = 'none';
      }
    });

    // Fermer le dropdown si on clique ailleurs
    document.addEventListener('click', function(event) {
      if (!filterDatesBtn.contains(event.target) && !datesDropdown.contains(event.target)) {
        datesDropdown.style.display = 'none';
      }
    });

    // Filtrage par date
    dateOptions.forEach(option => {
      option.addEventListener('click', function() {
        const selectedDate = this.getAttribute('data-date');
        
        // Mettre à jour les classes actives
        dateOptions.forEach(opt => opt.classList.remove('active'));
        this.classList.add('active');
        
        // Filtrer les jours de concerts
        const concertDays = document.querySelectorAll('.concert-day');
        
        if (selectedDate === 'all') {
          // Afficher tous les jours
          concertDays.forEach(day => day.classList.remove('hidden'));
        } else {
          // Filtrer par date
          concertDays.forEach(day => {
            if (day.getAttribute('data-date') === selectedDate) {
              day.classList.remove('hidden');
            } else {
              day.classList.add('hidden');
            }
          });
        }
        
        // Fermer le dropdown après sélection
        datesDropdown.style.display = 'none';
      });
    });
  }
});
