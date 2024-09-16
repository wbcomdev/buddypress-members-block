/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 */
document.addEventListener('DOMContentLoaded', function () {
    const swiperContainer = document.querySelector('.swiper-container');
    
    // Check if the swiper-container exists
    if (swiperContainer) {
        const slidesPerViewAttr = swiperContainer.querySelector('.swiper-wrapper').getAttribute('slides-per-view');
        const slidesPerView = parseInt(slidesPerViewAttr, 10) || 1; // Fallback to 1 if not found

        const swiper = new Swiper(swiperContainer, {
            slidesPerView: slidesPerView,
            spaceBetween: 10,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 3,
                },
                1024: {
                    slidesPerView: slidesPerView, // Use the dynamically set value
                },
            },
        });
    }
});

