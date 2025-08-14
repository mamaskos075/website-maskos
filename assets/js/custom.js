(function ($) {
	"use strict";

	// Page loading animation
	$(window).on('load', function() {
        $('#js-preloader').addClass('loaded');
    });

	// Header scroll function
	$(window).scroll(function() {
	  var scroll = $(window).scrollTop();
	  var box = $('.header-text').height();
	  var header = $('header').height();

	  if (scroll >= box - header) {
	    $("header").addClass("background-header");
	  } else {
	    $("header").removeClass("background-header");
	  }
	});

	// Initial Owl Carousel setup
	$('.owl-banner').owlCarousel({
	  center: true,
      items:1,
      loop:true,
      nav: true,
	  dots:true,
	  navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
      margin:30,
      responsive:{
        992:{
            items:1
        },
		1200:{
			items:1
		}
      }
	});

	var width = $(window).width();
	$(window).resize(function() {
		if (width > 767 && $(window).width() < 767) {
			location.reload();
		}
		else if (width < 767 && $(window).width() > 767) {
			location.reload();
		}
	});

	// Menu Dropdown Toggle
	if($('.menu-trigger').length){
		$(".menu-trigger").on('click', function() {	
			$(this).toggleClass('active');
			$('.header-area .nav').slideToggle(200);
		});
	}

	// Menu elevator animation
	$('.scroll-to-section a[href*=\\#]:not([href=\\#])').on('click', function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				var width = $(window).width();
				if(width < 991) {
					$('.menu-trigger').removeClass('active');
					$('.header-area .nav').slideUp(200);	
				}				
				$('html,body').animate({
					scrollTop: (target.offset().top) - 80
				}, 700);
				return false;
			}
		}
	});


	// Page loading animation
	$(window).on('load', function() {
		if($('.cover').length){
			$('.cover').parallax({
				imageSrc: $('.cover').data('image'),
				zIndex: '1'
			});
		}

		$("#preloader").animate({
			'opacity': '0'
		}, 600, function(){
			setTimeout(function(){
				$("#preloader").css("visibility", "hidden").fadeOut();
			}, 300);
		});
	});

    // --- LOGIKA FILTER KOS DARI SINI ---
    const toggleFilterButton = $('#toggleFilterButton');
    const filterOptions = $('#filterOptions');
    const applyFilterButton = $('#applyFilterButton');
    const clearFilterButton = $('#clearFilterButton');
    const propertyCarousel = $('#property-list-carousel');
    
    // Inisialisasi Owl Carousel untuk daftar kos
    if (propertyCarousel.length) {
        propertyCarousel.owlCarousel({
            loop: true,
            margin: 20,
            nav: true,
            responsive: {
                0: { items: 1 },
                768: { items: 2 },
                992: { items: 3 }
            }
        });
    }

    const allPropertyItems = propertyCarousel.find('.item');
    const noResultsMessage = $('#no-results-message');

    // Tampilkan semua item kos secara default dan sembunyikan pesan 'tidak ada hasil'
    allPropertyItems.removeClass('hidden');
    noResultsMessage.hide();

    // Fungsi untuk menampilkan/menyembunyikan filter
    toggleFilterButton.on('click', function() {
        filterOptions.toggleClass('show');
    });

    // Menutup opsi filter jika diklik di luar area
    $(document).on('click', function(event) {
        if (!filterOptions.is(event.target) && filterOptions.has(event.target).length === 0 && !toggleFilterButton.is(event.target)) {
            filterOptions.removeClass('show');
        }
    });

    // Fungsi utama untuk menerapkan filter
    function applyFilters() {
        const selectedFilters = {
            wilayah: [],
            harga: [],
            fasilitas: []
        };

        $('input[name="wilayah"]:checked').each(function() {
            selectedFilters.wilayah.push($(this).val());
        });

        $('input[name="harga"]:checked').each(function() {
            selectedFilters.harga.push($(this).val());
        });

        $('input[name="fasilitas"]:checked').each(function() {
            selectedFilters.fasilitas.push($(this).val());
        });

        let visibleItemsCount = 0;

        allPropertyItems.each(function() {
            const item = $(this);
            const itemLokasi = item.data('lokasi');
            const itemHarga = parseInt(item.data('harga'));
            const itemFasilitas = item.data('fasilitas') ? item.data('fasilitas').split(',') : [];

            const matchesWilayah = selectedFilters.wilayah.length === 0 || selectedFilters.wilayah.includes(itemLokasi);
            
            let matchesHarga = selectedFilters.harga.length === 0;
            if (!matchesHarga) {
                matchesHarga = selectedFilters.harga.some(range => {
                    const [min, max] = range.split('-').map(Number);
                    return itemHarga >= min && itemHarga <= max;
                });
            }

            let matchesFasilitas = selectedFilters.fasilitas.length === 0;
            if (!matchesFasilitas) {
                matchesFasilitas = selectedFilters.fasilitas.every(selectedFasilitas => {
                    return itemFasilitas.includes(selectedFasilitas);
                });
            }

            if (matchesWilayah && matchesHarga && matchesFasilitas) {
                item.removeClass('hidden');
                visibleItemsCount++;
            } else {
                item.addClass('hidden');
            }
        });

        if (visibleItemsCount === 0) {
            propertyCarousel.hide();
            noResultsMessage.show();
        } else {
            propertyCarousel.show();
            noResultsMessage.hide();
            propertyCarousel.trigger('refresh.owl.carousel');
        }

        filterOptions.removeClass('show');
    }

    // Event handler untuk tombol "Terapkan Filter"
    applyFilterButton.on('click', applyFilters);

    // Event handler untuk tombol "Reset Filter"
    clearFilterButton.on('click', function() {
        $('input[type="checkbox"]').prop('checked', false);
        allPropertyItems.removeClass('hidden');
        
        propertyCarousel.show();
        noResultsMessage.hide();
        
        propertyCarousel.trigger('refresh.owl.carousel');
        filterOptions.removeClass('show');
    });

})(window.jQuery);

$(document).ready(function() {
    // Variable untuk filter dan carousel
    const toggleFilterButton = $('#toggleFilterButton');
    const filterOptions = $('#filterOptions');
    const applyFilterButton = $('#applyFilterButton');
    const clearFilterButton = $('#clearFilterButton');
    const propertyCarousel = $('#property-list-carousel');
    const allPropertyItems = propertyCarousel.find('.item');
    const noResultsMessage = $('#no-results-message');

    // Inisialisasi Owl Carousel saat dokumen siap
    propertyCarousel.owl-carousel({
        loop: true,
        margin: 20,
        nav: true,
        responsive: {
            0: { items: 1 },
            768: { items: 2 },
            992: { items: 3 }
        }
    });

    // Fungsi untuk menampilkan/menyembunyikan filter
    toggleFilterButton.on('click', function() {
        filterOptions.toggleClass('show');
    });

    // Menutup opsi filter jika diklik di luar area
    $(document).on('click', function(event) {
        if (!filterOptions.is(event.target) && filterOptions.has(event.target).length === 0 && !toggleFilterButton.is(event.target)) {
            filterOptions.removeClass('show');
        }
    });

    // --- LOGIKA FILTER UTAMA ---
    function applyFilters() {
        const selectedFilters = {
            wilayah: [],
            harga: [],
            fasilitas: []
        };

        // Ambil filter yang dipilih
        $('input[name="wilayah"]:checked').each(function() {
            selectedFilters.wilayah.push($(this).val());
        });

        $('input[name="harga"]:checked').each(function() {
            selectedFilters.harga.push($(this).val());
        });

        $('input[name="fasilitas"]:checked').each(function() {
            selectedFilters.fasilitas.push($(this).val());
        });

        let visibleItemsCount = 0;

        // Loop melalui setiap item kos
        allPropertyItems.each(function() {
            const item = $(this);
            const itemLokasi = item.data('lokasi');
            const itemHarga = parseInt(item.data('harga'));
            const itemFasilitas = item.data('fasilitas') ? item.data('fasilitas').split(',') : [];

            // Periksa kecocokan filter
            const matchesWilayah = selectedFilters.wilayah.length === 0 || selectedFilters.wilayah.includes(itemLokasi);
            
            let matchesHarga = selectedFilters.harga.length === 0;
            if (!matchesHarga) {
                matchesHarga = selectedFilters.harga.some(range => {
                    const [min, max] = range.split('-').map(Number);
                    return itemHarga >= min && itemHarga <= max;
                });
            }

            let matchesFasilitas = selectedFilters.fasilitas.length === 0;
            if (!matchesFasilitas) {
                matchesFasilitas = selectedFilters.fasilitas.every(selectedFasilitas => {
                    return itemFasilitas.includes(selectedFasilitas);
                });
            }

            // Tampilkan atau sembunyikan item
            if (matchesWilayah && matchesHarga && matchesFasilitas) {
                item.removeClass('hidden');
                visibleItemsCount++;
            } else {
                item.addClass('hidden');
            }
        });

        // Logika untuk menampilkan pesan "tidak ada hasil"
        if (visibleItemsCount === 0) {
            propertyCarousel.hide();
            noResultsMessage.show();
        } else {
            propertyCarousel.show();
            noResultsMessage.hide();
            propertyCarousel.trigger('refresh.owl.carousel');
        }

        // Tutup filter setelah diterapkan
        filterOptions.removeClass('show');
    }

    // Event handler untuk tombol "Terapkan Filter"
    applyFilterButton.on('click', applyFilters);

    // Event handler untuk tombol "Reset Filter"
    clearFilterButton.on('click', function() {
        $('input[type="checkbox"]').prop('checked', false);
        allPropertyItems.removeClass('hidden');
        
        propertyCarousel.show();
        noResultsMessage.hide();
        
        propertyCarousel.trigger('refresh.owl.carousel');
        filterOptions.removeClass('show');
    });

});

let slideIndex = 0;
showSlides();

function showSlides() {
  let slides = document.getElementsByClassName("carousel-slide");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1
  }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 4000); // Ganti gambar setiap 4 detik
}


/* Small Carousel script */
$(document).ready(function() {
  $('.small-carousel').owlCarousel({
    loop: true,
    margin: 15, // Jarak antar gambar
    nav: false, // Menyembunyikan tombol navigasi
    dots: true, // Menampilkan titik navigasi
    autoplay: true, // Mengaktifkan putar otomatis
    autoplayTimeout: 3000, // Waktu antara slide (3 detik)
    autoplayHoverPause: true, // Berhenti saat kursor di atas
    responsive: {
      0: {
        items: 1 // Tampilkan 1 item pada layar sangat kecil
      },
      576: {
        items: 2 // Tampilkan 2 item pada layar kecil
      },
      768: {
        items: 3 // Tampilkan 3 item pada layar sedang
      },
      992: {
        items: 3 // Tampilkan 3 item pada layar desktop
      }
    }
  });
});


document.addEventListener('DOMContentLoaded', function() {
  const containers = document.querySelectorAll('.scrolling-info-container');

  containers.forEach(container => {
    const content = container.querySelector('.scrolling-info-content');
    const items = content.querySelectorAll('.info-item');
    const totalItems = items.length;

    // Duplikasi item pertama untuk efek loop yang mulus
    const firstItemClone = items[0].cloneNode(true);
    content.appendChild(firstItemClone);
    
    let currentIndex = 0;

    function startScrolling() {
      // Hapus transisi untuk kembali ke posisi awal tanpa animasi
      if (currentIndex >= totalItems) {
        content.style.transition = 'none';
        content.style.transform = `translateY(0)`;
        currentIndex = 0;
        // Tunggu sebentar sebelum transisi dimulai lagi
        setTimeout(() => {
          startScrolling();
        }, 10);
        return;
      }

      const translateY = -currentIndex * container.offsetHeight;
      content.style.transition = 'transform 0.5s ease-in-out';
      content.style.transform = `translateY(${translateY}px)`;
      
      currentIndex++;
      setTimeout(startScrolling, 3000); // Ganti item setiap 3 detik
    }
    
    // Mulai animasi jika ada lebih dari 1 item
    if (totalItems > 1) {
      startScrolling();
    }
  });
});


