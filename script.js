/* NAVBAR */

const navbar = document.querySelector(".navbar");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-links a");
const indicator = document.querySelector(".nav-indicator");
const menuToggle = document.querySelector(".menu-toggle");


/*SCROLL*/

if (navbar) {
    window.addEventListener("scroll", () => {

        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    });
}


/*MOVING NAV INDICATOR */

function moveIndicator(link) {

    /* Jangan tampilkan indicator di mobile */

    if (
        window.innerWidth <= 800 ||
        !indicator ||
        !navMenu ||
        !link
    ) {
        return;
    }

    const linkRect = link.getBoundingClientRect();
    const menuRect = navMenu.getBoundingClientRect();

    indicator.style.width = `${linkRect.width}px`;

    indicator.style.transform =
        `translateX(${linkRect.left - menuRect.left}px)`;
}


/* INITIAL NAV POSITION*/

const activeLink = document.querySelector(
    ".nav-links a.active"
);

if (activeLink) {
    moveIndicator(activeLink);
}


/* NAVIGATION LINK*/

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        /* Remove active from all links */

        navLinks.forEach((item) => {
            item.classList.remove("active");
        });

        /* Add active to clicked link */

        link.classList.add("active");

        /* Move indicator */

        moveIndicator(link);


        /* Close mobile menu */

        if (window.innerWidth <= 800) {

            navMenu?.classList.remove("active");
            menuToggle?.classList.remove("active");

        }

    });

});


/*HAMBURGER MENU */

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        menuToggle.classList.toggle("active");
        navMenu.classList.toggle("active");

    });

}


/*RESIZE */

window.addEventListener("resize", () => {

    const active = document.querySelector(
        ".nav-links a.active"
    );

    if (active) {
        moveIndicator(active);
    }

});


/* PROJECT SLIDER*/

/*
   Ambil semua project slider.

   Ini yang sebelumnya KURANG di kode kamu.
*/

const sliders = document.querySelectorAll(".project-slider");


sliders.forEach((slider) => {

    const images = slider.querySelector(".project-images");
    const imageList = slider.querySelectorAll("img");

    const prevButton = slider.querySelector(".prev");
    const nextButton = slider.querySelector(".next");

    let currentIndex = 0;


    /* Jika project hanya punya 1 gambar,
       tidak perlu menjalankan slider */

    if (
        !images ||
        imageList.length <= 1
    ) {
        return;
    }


    /*SHOW IMAGE */

    function showImage(index) {

        /* Jika sampai gambar terakhir,
           kembali ke gambar pertama */

        if (index >= imageList.length) {

            currentIndex = 0;

        }

        /* Jika mundur dari gambar pertama,
           pindah ke gambar terakhir */

        else if (index < 0) {

            currentIndex = imageList.length - 1;

        }

        else {

            currentIndex = index;

        }


        images.style.transform =
            `translateX(-${currentIndex * 100}%)`;

    }


    /* NEXT BUTTON*/

    if (nextButton) {

        nextButton.addEventListener("click", () => {

            showImage(currentIndex + 1);

        });

    }


    /* PREVIOUS BUTTON*/

    if (prevButton) {

        prevButton.addEventListener("click", () => {

            showImage(currentIndex - 1);

        });

    }

    /* INITIAL IMAGE*/

    showImage(0);

});