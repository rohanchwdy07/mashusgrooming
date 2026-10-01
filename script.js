/* =========================================================
   MASHU'S GROOMING
   Interactive Experience
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const body = document.body;
    const loader = document.getElementById("loader");
    const navbar = document.getElementById("navbar");

    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileClose = document.getElementById("mobileClose");

    const cursor = document.getElementById("cursor");
    const cursorFollower = document.getElementById("cursorFollower");

    const bookingForm = document.getElementById("bookingForm");
    const successModal = document.getElementById("successModal");
    const modalClose = document.getElementById("modalClose");
    const successDone = document.getElementById("successDone");

    const toast = document.getElementById("toast");
    const toastMessage = document.querySelector(".toast-message");

    const serviceHoverImage = document.getElementById("serviceHoverImage");

    const currentYear = document.getElementById("currentYear");
    const dateInput = document.getElementById("date");


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* =====================================================
       PAGE LOADER
    ===================================================== */

    const startTime = Date.now();

    window.addEventListener("load", () => {

        const minimumLoadTime = 900;
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, minimumLoadTime - elapsed);

        setTimeout(() => {

            if (!loader) return;

            loader.classList.add("loaded");
            body.classList.add("page-loaded");

            setTimeout(() => {
                loader.remove();
            }, 900);

        }, remaining);

    });


    /* =====================================================
       CUSTOM CURSOR
    ===================================================== */

    const finePointer = window.matchMedia("(pointer: fine)").matches;

    if (finePointer && cursor && cursorFollower) {

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;

        let followerX = mouseX;
        let followerY = mouseY;

        document.addEventListener("mousemove", (event) => {

            mouseX = event.clientX;
            mouseY = event.clientY;

            cursor.style.left = `${mouseX}px`;
            cursor.style.top = `${mouseY}px`;

        });

        const animateFollower = () => {

            followerX += (mouseX - followerX) * 0.14;
            followerY += (mouseY - followerY) * 0.14;

            cursorFollower.style.left = `${followerX}px`;
            cursorFollower.style.top = `${followerY}px`;

            requestAnimationFrame(animateFollower);
        };

        animateFollower();


        const cursorTargets = document.querySelectorAll(
            "a, button, .service-row, .gallery-item, .barber-card, select, input"
        );

        cursorTargets.forEach((element) => {

            element.addEventListener("mouseenter", () => {
                cursor.classList.add("cursor-active");
                cursorFollower.classList.add("follower-active");
            });

            element.addEventListener("mouseleave", () => {
                cursor.classList.remove("cursor-active");
                cursorFollower.classList.remove("follower-active");
            });

        });

    }


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const openMenu = () => {

        if (!mobileMenu) return;

        mobileMenu.classList.add("open");
        body.classList.add("menu-open");

        if (menuToggle) {
            menuToggle.classList.add("active");
        }

    };


    const closeMenu = () => {

        if (!mobileMenu) return;

        mobileMenu.classList.remove("open");
        body.classList.remove("menu-open");

        if (menuToggle) {
            menuToggle.classList.remove("active");
        }

    };


    if (menuToggle) {
        menuToggle.addEventListener("click", () => {

            if (mobileMenu.classList.contains("open")) {
                closeMenu();
            } else {
                openMenu();
            }

        });
    }


    if (mobileClose) {
        mobileClose.addEventListener("click", closeMenu);
    }


    document.querySelectorAll(".mobile-nav a").forEach((link) => {

        link.addEventListener("click", () => {
            closeMenu();
        });

    });


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            closeMenu();
            closeSuccessModal();

        }

    });


    /* =====================================================
       NAVBAR SCROLL EFFECT
    ===================================================== */

    let lastScrollY = window.scrollY;

    const handleNavbar = () => {

        const currentScrollY = window.scrollY;

        if (!navbar) return;

        if (currentScrollY > 80) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

        if (
            currentScrollY > lastScrollY &&
            currentScrollY > 180
        ) {

            navbar.classList.add("nav-hidden");

        } else {

            navbar.classList.remove("nav-hidden");

        }

        lastScrollY = currentScrollY;

    };


    window.addEventListener(
        "scroll",
        handleNavbar,
        { passive: true }
    );


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#" ||
                targetId === "#!"
            ) {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const navbarHeight = navbar
                ? navbar.offsetHeight
                : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       ACTIVE NAV LINK
    ===================================================== */

    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(
        ".desktop-nav .nav-link"
    );

    const updateActiveNav = () => {

        let currentSection = "";

        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop - 180;

            const sectionBottom =
                sectionTop + section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {
                currentSection = section.id;
            }

        });

        navLinks.forEach((link) => {

            const href = link.getAttribute("href");

            link.classList.toggle(
                "active",
                href === `#${currentSection}`
            );

        });

    };

    window.addEventListener(
        "scroll",
        updateActiveNav,
        { passive: true }
    );

    updateActiveNav();


    /* =====================================================
       REVEAL ANIMATIONS
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".section-header, " +
        ".intro-content, " +
        ".service-row, " +
        ".barber-card, " +
        ".gallery-item, " +
        ".studio-content, " +
        ".studio-image, " +
        ".contact-main, " +
        ".contact-details, " +
        ".booking-form, " +
        ".booking-header"
    );


    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("revealed");

                    observer.unobserve(entry.target);

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );


        revealElements.forEach((element) => {

            element.classList.add("reveal");

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach((element) => {
            element.classList.add("revealed");
        });

    }


    /* =====================================================
       STAGGER SERVICES
    ===================================================== */

    document.querySelectorAll(".service-row").forEach(
        (row, index) => {

            row.style.setProperty(
                "--delay",
                `${index * 70}ms`
            );

        }
    );


    /* =====================================================
       SERVICE HOVER IMAGE
    ===================================================== */

    if (
        finePointer &&
        serviceHoverImage
    ) {

        const serviceImage =
            serviceHoverImage.querySelector("img");

        const serviceImages = {

            "Haircut":
                "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=700&q=85",

            "Haircut + Beard":
                "https://images.unsplash.com/photo-1599351431202-1e0f0c2b5c9b?auto=format&fit=crop&w=700&q=85",

            "Beard Sculpt":
                "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=700&q=85",

            "Royal Groom":
                "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=700&q=85",

            "Hair Styling":
                "https://images.unsplash.com/photo-1593702295094-aea639f8b0c5?auto=format&fit=crop&w=700&q=85"

        };


        document.querySelectorAll(".service-row").forEach(
            (row) => {

                row.addEventListener("mouseenter", () => {

                    const service =
                        row.dataset.service;

                    if (
                        serviceImage &&
                        serviceImages[service]
                    ) {

                        serviceImage.src =
                            serviceImages[service];

                    }

                    serviceHoverImage.classList.add("visible");

                });


                row.addEventListener("mousemove", (event) => {

                    serviceHoverImage.style.left =
                        `${event.clientX + 28}px`;

                    serviceHoverImage.style.top =
                        `${event.clientY - 120}px`;

                });


                row.addEventListener("mouseleave", () => {

                    serviceHoverImage.classList.remove(
                        "visible"
                    );

                });

            }
        );

    }


    /* =====================================================
       MAGNETIC BUTTONS
    ===================================================== */

    if (finePointer) {

        const magneticButtons =
            document.querySelectorAll(".magnetic");

        magneticButtons.forEach((button) => {

            button.addEventListener(
                "mousemove",
                (event) => {

                    const rect =
                        button.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left -
                        rect.width / 2;

                    const y =
                        event.clientY -
                        rect.top -
                        rect.height / 2;

                    button.style.transform =
                        `translate(${x * 0.12}px, ${y * 0.12}px)`;

                }
            );


            button.addEventListener(
                "mouseleave",
                () => {

                    button.style.transform =
                        "translate(0, 0)";

                }
            );

        });

    }


    /* =====================================================
       RIPPLE EFFECT
    ===================================================== */

    document.querySelectorAll(
        ".button, .nav-book, .booking-button"
    ).forEach((button) => {

        button.addEventListener("click", (event) => {

            const ripple =
                document.createElement("span");

            ripple.classList.add("ripple");

            const rect =
                button.getBoundingClientRect();

            ripple.style.left =
                `${event.clientX - rect.left}px`;

            ripple.style.top =
                `${event.clientY - rect.top}px`;

            button.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 700);

        });

    });


    /* =====================================================
       DATE RESTRICTION
    ===================================================== */

    if (dateInput) {

        const today =
            new Date().toISOString().split("T")[0];

        dateInput.min = today;

    }


    /* =====================================================
       BOOKING FORM
    ===================================================== */

    if (bookingForm) {

        bookingForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();

                const name =
                    document.getElementById("name");

                const phone =
                    document.getElementById("phone");

                const service =
                    document.getElementById("service");

                const date =
                    document.getElementById("date");

                const time =
                    document.getElementById("time");


                if (!name.value.trim()) {

                    showToast(
                        "Please enter your name!"
                    );

                    name.focus();
                    return;

                }


                if (!phone.value.trim()) {

                    showToast(
                        "Please enter your phone number!"
                    );

                    phone.focus();
                    return;

                }


                if (!service.value) {

                    showToast(
                        "Please choose a service!"
                    );

                    service.focus();
                    return;

                }


                if (!date.value) {

                    showToast(
                        "Please choose a date!"
                    );

                    date.focus();
                    return;

                }


                if (!time.value) {

                    showToast(
                        "Please choose a time!"
                    );

                    time.focus();
                    return;

                }


                openSuccessModal();

                bookingForm.reset();

                if (dateInput) {

                    const today =
                        new Date()
                            .toISOString()
                            .split("T")[0];

                    dateInput.min = today;

                }

            }
        );

    }


    /* =====================================================
       SUCCESS MODAL
    ===================================================== */

    const openSuccessModal = () => {

        if (!successModal) return;

        successModal.classList.add("open");
        body.classList.add("modal-open");

    };


    const closeSuccessModal = () => {

        if (!successModal) return;

        successModal.classList.remove("open");
        body.classList.remove("modal-open");

    };


    if (modalClose) {
        modalClose.addEventListener(
            "click",
            closeSuccessModal
        );
    }


    if (successDone) {
        successDone.addEventListener(
            "click",
            closeSuccessModal
        );
    }


    if (successModal) {

        successModal.addEventListener(
            "click",
            (event) => {

                if (
                    event.target === successModal
                ) {
                    closeSuccessModal();
                }

            }
        );

    }


    /* =====================================================
       TOAST SYSTEM
    ===================================================== */

    let toastTimer;


    const showToast = (message) => {

        if (!toast) return;

        clearTimeout(toastTimer);

        if (toastMessage) {
            toastMessage.textContent = message;
        }

        toast.classList.add("show");

        toastTimer = setTimeout(() => {

            toast.classList.remove("show");

        }, 3000);

    };


    /* =====================================================
       SERVICE ROW CLICK
    ===================================================== */

    document.querySelectorAll(".service-row").forEach(
        (row) => {

            row.addEventListener("click", () => {

                const serviceName =
                    row.dataset.service;

                const serviceSelect =
                    document.getElementById("service");

                if (serviceSelect) {

                    const options =
                        Array.from(
                            serviceSelect.options
                        );

                    const match =
                        options.find(
                            (option) =>
                                option.textContent
                                    .toLowerCase()
                                    .includes(
                                        serviceName
                                            .toLowerCase()
                                    )
                        );

                    if (match) {
                        serviceSelect.value =
                            match.value;
                    }

                }


                const booking =
                    document.getElementById("booking");

                if (booking) {

                    booking.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            });

        }
    );


    /* =====================================================
       BARBER CARD INTERACTION
    ===================================================== */

    document.querySelectorAll(".barber-card").forEach(
        (card) => {

            card.addEventListener("click", () => {

                const barber =
                    card.querySelector("h3");

                if (!barber) return;

                showToast(
                    `${barber.textContent.trim()} selected!`
                );

            });

        }
    );


    /* =====================================================
       GALLERY IMAGE PARALLAX
    ===================================================== */

    if (finePointer) {

        document.querySelectorAll(
            ".gallery-item img"
        ).forEach((image) => {

            const parent =
                image.closest(".gallery-item");

            parent.addEventListener(
                "mousemove",
                (event) => {

                    const rect =
                        parent.getBoundingClientRect();

                    const x =
                        (event.clientX - rect.left) /
                        rect.width -
                        0.5;

                    const y =
                        (event.clientY - rect.top) /
                        rect.height -
                        0.5;

                    image.style.transform =
                        `scale(1.06) translate(${x * 8}px, ${y * 8}px)`;

                }
            );


            parent.addEventListener(
                "mouseleave",
                () => {

                    image.style.transform =
                        "scale(1) translate(0, 0)";

                }
            );

        });

    }


    /* =====================================================
       HERO IMAGE MOUSE MOVEMENT
    ===================================================== */

    const heroImage =
        document.querySelector(".hero-image");

    const heroWrap =
        document.querySelector(".hero-image-wrap");


    if (
        finePointer &&
        heroImage &&
        heroWrap
    ) {

        heroWrap.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    heroWrap.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left) /
                    rect.width -
                    0.5;

                const y =
                    (event.clientY - rect.top) /
                    rect.height -
                    0.5;

                heroImage.style.transform =
                    `scale(1.04) translate(${x * 10}px, ${y * 10}px)`;

            }
        );


        heroWrap.addEventListener(
            "mouseleave",
            () => {

                heroImage.style.transform =
                    "scale(1) translate(0, 0)";

            }
        );

    }


    /* =====================================================
       CONTACT LINK DEMO
    ===================================================== */

    document.querySelectorAll(
        '.contact-link[href="#"]'
    ).forEach((link) => {

        link.addEventListener("click", (event) => {

            event.preventDefault();

            showToast(
                "Directions will open here!"
            );

        });

    });


    /* =====================================================
       FOOTER BACK TO TOP
    ===================================================== */

    const footerBottom =
        document.querySelector(".footer-bottom");

    if (footerBottom) {

        const spans =
            footerBottom.querySelectorAll("span");

        const backTop =
            spans[spans.length - 1];

        if (backTop) {

            backTop.style.cursor = "pointer";

            backTop.addEventListener(
                "click",
                () => {

                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });

                }
            );

        }

    }


    /* =====================================================
       RESIZE HANDLER
    ===================================================== */

    let resizeTimer;

    window.addEventListener("resize", () => {

        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(() => {

            if (
                window.innerWidth > 900 &&
                mobileMenu
            ) {
                closeMenu();
            }

        }, 150);

    });


    /* =====================================================
       REDUCED MOTION
    ===================================================== */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (reducedMotion) {

        document.documentElement.classList.add(
            "reduced-motion"
        );

    }


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    handleNavbar();
    updateActiveNav();

});