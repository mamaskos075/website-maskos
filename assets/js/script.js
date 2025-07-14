
document.addEventListener('DOMContentLoaded', function() {
    const popupOverlay = document.getElementById('popup-overlay');
    const closeButton = document.querySelector('.close-button');

    // Fungsi untuk menampilkan pop-up
    function showPopup() {
        popupOverlay.style.display = 'flex'; // Tampilkan overlay
        setTimeout(() => {
            popupOverlay.classList.add('show'); // Tambahkan kelas 'show' untuk transisi
        }, 50); // Sedikit delay agar transisi bekerja
    }

    // Fungsi untuk menyembunyikan pop-up
    function hidePopup() {
        popupOverlay.classList.remove('show'); // Hapus kelas 'show'
        setTimeout(() => {
            popupOverlay.style.display = 'none'; // Sembunyikan setelah transisi selesai
        }, 1200); // Sesuaikan dengan durasi transisi di CSS (1.5s = 1500ms)
    }

    // Tampilkan pop-up setelah 3 detik (3000 milidetik)
    setTimeout(showPopup, 50);

    // Tutup pop-up saat tombol 'x' diklik
    closeButton.addEventListener('click', hidePopup);

    // Tutup pop-up saat area di luar konten diklik
    popupOverlay.addEventListener('click', function(event) {
        if (event.target === popupOverlay) {
            hidePopup();
        }
    });
});


// roadmap-animation.js

document.addEventListener('DOMContentLoaded', function() {
    const roadmapPoints = document.querySelectorAll('.roadmap-point');
    const roadmapProgress = document.querySelector('.roadmap-progress');
    const totalSteps = roadmapPoints.length;
    const animationDuration = 8500; // 2 detik untuk satu siklus penuh
    const delayBetweenSteps = animationDuration / totalSteps;

    let currentStep = 0;

    function animateRoadmap() {
        // Atur ulang semua titik menjadi tidak aktif
        roadmapPoints.forEach(point => point.classList.remove('active'));

        // Hitung lebar bilah kemajuan berdasarkan langkah saat ini
        const progressWidth = (currentStep / (totalSteps - 1)) * 100;
        roadmapProgress.style.width = `${progressWidth}%`;

        // Aktifkan titik langkah saat ini
        roadmapPoints[currentStep].classList.add('active');

        // Pindah ke langkah berikutnya
        currentStep++;

        // Jika semua langkah selesai, atur ulang ke awal setelah jeda singkat
        if (currentStep >= totalSteps) {
            setTimeout(() => {
                currentStep = 0;
                roadmapProgress.style.width = '0%';
                roadmapPoints.forEach(point => point.classList.remove('active'));
            }, delayBetweenSteps); // Jeda singkat sebelum mengatur ulang
        }
    }

    // Mulai loop animasi
    setInterval(animateRoadmap, delayBetweenSteps);

    // Panggilan awal untuk mengatur hidup pertama
    animateRoadmap();
});


$(document).ready(function(){
  // Initialize Owl Carousel for property list
  $("#property-list-carousel").owlCarousel({
    loop:true,
    margin:30,
    nav:true,
    dots:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        1000:{
            items:3
        }
    }
  });

  // Initialize Owl Carousel for testimonials
  $("#testimonial-carousel").owlCarousel({
    loop:true,
    margin:30,
    nav:true,
    dots:true,
    responsive:{
        0:{
            items:1
        },
        768:{
            items:2
        },
        992:{
            items:3
        }
    }
  });

  // Modified search function
  const searchInput = $('#propertySearchInput');
  const searchButton = $('#button-addon2');
  const propertyCarousel = $('#property-list-carousel'); // Target carousel container

  // Store all property items initially
  const allPropertyItems = propertyCarousel.find('.property-item').toArray();

  // Function to filter properties
  function filterProperties() {
      const searchTerm = searchInput.val().toLowerCase();
      let visibleItems = [];

      // Iterate through all items and check if they match the search term
      $(allPropertyItems).each(function() {
          const itemText = $(this).text().toLowerCase();
          if (itemText.includes(searchTerm)) {
              visibleItems.push(this);
          }
      });

      // Rebuild carousel content with filtered items
      propertyCarousel.owlCarousel('destroy'); // Destroy current carousel instance
      propertyCarousel.empty(); // Empty existing items

      if (visibleItems.length > 0) {
          $(visibleItems).each(function() {
              propertyCarousel.append(this); // Add filtered items back
          });
      } else {
          // Handle no results found, e.g., display a message
          propertyCarousel.append('<div class="col-12 text-center py-5"><p>Yahhh.. belum ada kos yang kamu cari nih!</p></div>');
      }

      // Re-initialize Owl Carousel
      propertyCarousel.owlCarousel({
          loop:true,
          margin:30,
          nav:true,
          dots:true,
          responsive:{
              0:{
                  items:1
              },
              600:{
                  items:2
              },
              1000:{
                  items:3
              }
          }
      });
  }

  // Event listener for search button click
  searchButton.on('click', filterProperties);

  // Event listener for pressing Enter key in search input
  searchInput.on('keypress', function(e) {
      if (e.which == 13) { // 13 is the key code for Enter
          filterProperties();
      }
  });

  // Add data-label attributes for responsive table on smaller screens
  if ($(window).width() < 768) {
      $('.comparison-table .table tbody td').each(function() {
          var colIndex = $(this).index();
          var headerText = $('.comparison-table .table th').eq(colIndex).text();
          $(this).attr('data-label', headerText);
      });
  }
});


// assets/js/guide-animation.js

document.addEventListener('DOMContentLoaded', function() {
    const guideSection = document.querySelector('.guide-service');
    const progressBar = document.querySelector('.guide-process-progress');
    const guidePoints = document.querySelectorAll('.guide-process-point');

    if (!guideSection || !progressBar || guidePoints.length === 0) {
        return; // Exit if elements are not found
    }

    function animateGuideProcess() {
        const sectionTop = guideSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        // Animate progress bar when section is in view
        if (sectionTop < windowHeight * 0.75) { // When 75% of the section is visible
            progressBar.style.width = '100%';
        } else {
            progressBar.style.width = '0%'; // Reset if out of view (optional)
        }

        // Add 'animated' class to points when they are in view
        guidePoints.forEach(point => {
            const pointTop = point.getBoundingClientRect().top;
            if (pointTop < windowHeight * 0.85) {
                point.classList.add('animated');
            } else {
                point.classList.remove('animated'); // Reset if out of view (optional)
            }
        });
    }

    // Initial check on load
    animateGuideProcess();

    // Listen for scroll events
    window.addEventListener('scroll', animateGuideProcess);

    // Add a simple animation for point icons for better visual feedback
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = `
        .guide-process-point.animated .point-icon {
            animation: bounceIn 0.8s ease-out forwards;
        }

        @keyframes bounceIn {
            0% {
                transform: scale(0.1);
                opacity: 0;
            }
            60% {
                transform: scale(1.1);
                opacity: 1;
            }
            100% {
                transform: scale(1);
            }
        }
    `;
    document.head.appendChild(styleSheet);
});




