document.addEventListener("DOMContentLoaded",(function(){const e=document.querySelector(".swiper-container"),t=e.querySelector(".swiper-wrapper").getAttribute("slides-per-view"),r=parseInt(t,10)||1;new Swiper(e,{slidesPerView:r,spaceBetween:10,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},breakpoints:{640:{slidesPerView:2},768:{slidesPerView:3},1024:{slidesPerView:r}}})}));