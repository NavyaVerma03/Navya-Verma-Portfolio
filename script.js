"use strict";

/* =========================================================
   NAVYA VERMA — PREMIUM PORTFOLIO SCRIPT
   Vanilla JavaScript only
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     HELPERS
  ========================================================= */

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];


  /* =========================================================
     PRELOADER
  ========================================================= */

  const loader = $(".loader");

  if (loader) {
    window.addEventListener("load", () => {
      setTimeout(() => {
        loader.classList.add("hide");

        setTimeout(() => {
          loader.remove();
        }, 700);

      }, 500);
    });
  }


 /* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuToggle = $(".menu-btn");
const nav = $(".nav-links");
const navLinks = $$(".nav-links a");

if (menuToggle && nav) {

  menuToggle.addEventListener("click", () => {

    const isOpen =
      menuToggle.classList.toggle("active");

    nav.classList.toggle("open");

    document.body.classList.toggle(
      "menu-open",
      isOpen
    );

    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

  });

}


/* Close menu after clicking a link */

navLinks.forEach(link => {

  link.addEventListener("click", () => {

    menuToggle?.classList.remove("active");

    nav?.classList.remove("open");

    document.body.classList.remove("menu-open");

    menuToggle?.setAttribute(
      "aria-expanded",
      "false"
    );

  });

});


/* Close menu with Escape */

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {

    menuToggle?.classList.remove("active");

    nav?.classList.remove("open");

    document.body.classList.remove("menu-open");

    menuToggle?.setAttribute(
      "aria-expanded",
      "false"
    );

  }

});

 


  /* =========================================================
     SCROLL REVEAL
  ========================================================= */

  const revealElements = $$(".reveal");

  const revealObserver = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          revealObserver.unobserve(entry.target);
        }

      });

    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });


  /* =========================================================
     ACTIVE NAVIGATION
  ========================================================= */

  const sections = $$("section[id]");
  const navigationLinks = $$(".nav-links a[href^='#']");


  const updateActiveNavigation = () => {

    let currentSection = "";

    sections.forEach(section => {

      const sectionTop = section.offsetTop - 180;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        currentSection = section.id;
      }

    });

    navigationLinks.forEach(link => {

      link.classList.remove("active");

      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }

    });

  };


  /* =========================================================
     HEADER SCROLL EFFECT
  ========================================================= */

  const header = $("header");

  const handleHeaderScroll = () => {

    if (!header) return;

    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

  };


  /* =========================================================
     SCROLL PROGRESS
  ========================================================= */

  const progressBar =
    $(".scroll-progress") ||
    $(".scroll-progress-bar");

  const updateScrollProgress = () => {

    if (!progressBar) return;

    const scrollTop = window.scrollY;

    const documentHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const progress =
      documentHeight > 0
        ? (scrollTop / documentHeight) * 100
        : 0;

    progressBar.style.width = `${progress}%`;
  };



/* =========================================================
   CUSTOM CURSOR — DOT + SOFT TRAIL
========================================================= */

const cursor = $(".cursor-dot");
const cursorTrail = $(".cursor-trail");

let mouseX = 0;
let mouseY = 0;

let trailX = 0;
let trailY = 0;


if (cursor || cursorTrail) {

  document.addEventListener("mousemove", event => {

    mouseX = event.clientX;
    mouseY = event.clientY;


    /* Main dot */

    if (cursor) {

      cursor.style.left =
        `${mouseX}px`;

      cursor.style.top =
        `${mouseY}px`;

    }

  });


  /* Smooth trail movement */

  const animateCursor = () => {

    trailX +=
      (mouseX - trailX) * 0.13;

    trailY +=
      (mouseY - trailY) * 0.13;


    if (cursorTrail) {

      cursorTrail.style.left =
        `${trailX}px`;

      cursorTrail.style.top =
        `${trailY}px`;

    }


    requestAnimationFrame(
      animateCursor
    );

  };


  animateCursor();

}




  /* =========================================================
     PARTICLES
  ========================================================= */

  const particleContainer =
    $(".particles") ||
    $(".particle-container");

  const createParticles = () => {

    if (!particleContainer) return;

    if (particleContainer.dataset.created === "true") {
      return;
    }

    particleContainer.dataset.created = "true";

    const particleCount =
      window.innerWidth < 768 ? 18 : 35;

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < particleCount; i++) {

      const particle = document.createElement("span");

      particle.className = "particle";

      particle.style.left =
        `${Math.random() * 100}%`;

      particle.style.top =
        `${Math.random() * 100}%`;

      particle.style.animationDelay =
        `${Math.random() * 8}s`;

      particle.style.animationDuration =
        `${6 + Math.random() * 8}s`;

      particle.style.opacity =
        `${0.25 + Math.random() * 0.5}`;

      fragment.appendChild(particle);
    }

    particleContainer.appendChild(fragment);
  };

  createParticles();


  /* =========================================================
     HERO IMAGE PARALLAX
  ========================================================= */

  const heroPhoto =
    $(".photo-card img") ||
    $(".hero-photo img") ||
    $(".profile-image");

  let parallaxFrame = null;

  document.addEventListener("mousemove", event => {

    if (!heroPhoto || window.innerWidth < 900) {
      return;
    }

    if (parallaxFrame) {
      cancelAnimationFrame(parallaxFrame);
    }

    parallaxFrame = requestAnimationFrame(() => {

      const x =
        (event.clientX / window.innerWidth - 0.5) * 10;

      const y =
        (event.clientY / window.innerHeight - 0.5) * 10;

      heroPhoto.style.transform =
        `translate3d(${x}px, ${y}px, 0) scale(1.02)`;

    });

  });


  /* =========================================================
     MAGNETIC BUTTONS
  ========================================================= */

  const magneticElements = $$(
    ".btn, .magnetic, .social-link"
  );

  magneticElements.forEach(element => {

    element.addEventListener("mousemove", event => {

      if (window.innerWidth < 768) return;

      const rect = element.getBoundingClientRect();

      const x =
        event.clientX - rect.left - rect.width / 2;

      const y =
        event.clientY - rect.top - rect.height / 2;

      element.style.transform =
        `translate(${x * 0.12}px, ${y * 0.12}px)`;
    });

    element.addEventListener("mouseleave", () => {

      element.style.transform = "";

    });

  });


  /* =========================================================
     PROJECT CARD 3D TILT
  ========================================================= */

  const projectCards = $$(".project");

  projectCards.forEach(card => {

    card.addEventListener("mousemove", event => {

      if (window.innerWidth < 900) return;

      const rect = card.getBoundingClientRect();

      const x =
        event.clientX - rect.left;

      const y =
        event.clientY - rect.top;

      const rotateX =
        ((y / rect.height) - 0.5) * -5;

      const rotateY =
        ((x / rect.width) - 0.5) * 5;

      card.style.transform =
        `perspective(1000px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)
         translateY(-5px)`;
    });

    card.addEventListener("mouseleave", () => {

      card.style.transform = "";

    });

  });


  /* =========================================================
     IMAGE LOAD HANDLING
  ========================================================= */

  const allImages = $$("img");

  allImages.forEach(image => {

    image.addEventListener("load", () => {
      image.classList.add("loaded");
    });

    image.addEventListener("error", () => {
      image.classList.add("image-error");
    });

  });


  /* =========================================================
     PROJECT IMAGE HANDLING
  ========================================================= */

  const projectImages =
    $$(".project-image-button img");

  projectImages.forEach(image => {

    image.addEventListener("error", () => {

      const parent = image.closest(
        ".project-image-button"
      );

      if (parent) {
        parent.classList.add("image-error");
      }

    });

  });


  /* =========================================================
     CERTIFICATE IMAGE HANDLING
  ========================================================= */

  const certificateImages =
    $$(".cert-image img");

  certificateImages.forEach(image => {

    image.addEventListener("load", () => {
      image.classList.add("loaded");
    });

    image.addEventListener("error", () => {

      const wrapper =
        image.closest(".cert-image");

      if (wrapper) {
        wrapper.classList.add("image-error");
      }

    });

  });


  /* =========================================================
     IMAGE PREVIEW MODAL
  ========================================================= */

  const imageModal = $("#imageModal");
  const modalImage = $("#modalImage");
  const modalTitle = $("#modalTitle");
  const modalClose = $(".image-modal-close");
  const modalBackdrop = $(".image-modal-backdrop");

  const imageTriggers =
    $$(".image-preview-trigger");

  const openImageModal = trigger => {

    if (!imageModal || !modalImage) return;

    const imageSource =
      trigger.dataset.image ||
      trigger.querySelector("img")?.src;

    const title =
      trigger.dataset.title ||
      trigger.querySelector("img")?.alt ||
      "Preview";

    if (!imageSource) return;

    modalImage.src = imageSource;

    modalImage.alt = title;

    if (modalTitle) {
      modalTitle.textContent = title;
    }

    imageModal.classList.add("active");

    document.body.classList.add("modal-open");

    document.body.style.overflow = "hidden";

    setTimeout(() => {
      modalClose?.focus();
    }, 100);

  };


  const closeImageModal = () => {

    if (!imageModal) return;

    imageModal.classList.remove("active");

    document.body.classList.remove("modal-open");

    document.body.style.overflow = "";

    setTimeout(() => {

      if (modalImage) {
        modalImage.src = "";
      }

    }, 300);

  };


  imageTriggers.forEach(trigger => {

    trigger.addEventListener("click", event => {

      event.preventDefault();

      openImageModal(trigger);

    });

  });


  if (modalClose) {

    modalClose.addEventListener(
      "click",
      closeImageModal
    );

  }


  if (modalBackdrop) {

    modalBackdrop.addEventListener(
      "click",
      closeImageModal
    );

  }


  if (imageModal) {

    imageModal.addEventListener("click", event => {

      if (
        event.target === imageModal ||
        event.target.classList.contains(
          "image-modal-content"
        )
      ) {
        closeImageModal();
      }

    });

  }


  /* =========================================================
     ESC KEY — CLOSE IMAGE MODAL
  ========================================================= */

  document.addEventListener("keydown", event => {

    if (
      event.key === "Escape" &&
      imageModal?.classList.contains("active")
    ) {

      closeImageModal();

    }

  });


  /* =========================================================
     SMOOTH SCROLL
  ========================================================= */

  const anchorLinks =
    $$("a[href^='#']");

  anchorLinks.forEach(link => {

    link.addEventListener("click", event => {

      const targetId =
        link.getAttribute("href");

      if (
        !targetId ||
        targetId === "#"
      ) {
        return;
      }

      const target =
        $(targetId);

      if (!target) return;

      event.preventDefault();

      const headerHeight =
        header?.offsetHeight || 80;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });

    });

  });


  /* =========================================================
     BACK TO TOP
  ========================================================= */

  const backTop =
    $(".back-top") ||
    $(".back-to-top");

  if (backTop) {

    backTop.addEventListener("click", event => {

      event.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    });

  }


  /* =========================================================
     CONTACT CLICK FEEDBACK
  ========================================================= */

  const contactLinks =
    $$(
      'a[href^="mailto:"], a[href^="tel:"]'
    );

  contactLinks.forEach(link => {

    link.addEventListener("click", () => {

      link.classList.add("clicked");

      setTimeout(() => {
        link.classList.remove("clicked");
      }, 700);

    });

  });


  /* =========================================================
     SCROLL HANDLER
  ========================================================= */

  let scrollTicking = false;

  const handleScroll = () => {

    if (scrollTicking) return;

    scrollTicking = true;

    requestAnimationFrame(() => {

      updateActiveNavigation();
      handleHeaderScroll();
      updateScrollProgress();

      scrollTicking = false;

    });

  };

  window.addEventListener(
    "scroll",
    handleScroll,
    { passive: true }
  );


  /* =========================================================
     RESIZE
  ========================================================= */

  let resizeTimer;

  window.addEventListener("resize", () => {

    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {

      updateScrollProgress();

    }, 150);

  });


  /* =========================================================
     PAGE VISIBILITY
  ========================================================= */

  document.addEventListener(
    "visibilitychange",
    () => {

      if (
        document.hidden &&
        particleContainer
      ) {

        particleContainer.style.animationPlayState =
          "paused";

      } else if (particleContainer) {

        particleContainer.style.animationPlayState =
          "running";

      }

    }
  );


  /* =========================================================
     INITIAL UPDATE
  ========================================================= */

  updateActiveNavigation();
  handleHeaderScroll();
  updateScrollProgress();


  /* =========================================================
     PAGE READY
  ========================================================= */

  document.body.classList.add("page-ready");

  /* FORCE CONTENT VISIBLE */
    window.addEventListener("load", () => {
        document.querySelectorAll(".reveal").forEach(element => {
            element.classList.add("show");
        });
    });

});

/* =========================================================
   ✨ SMART CARD MOUSE GLOW
========================================================= */
const isTouchDevice =
    window.matchMedia("(pointer: coarse)").matches;

const glowCards = document.querySelectorAll(
    ".glass, .about-card, .skill-group, .stat, .project, .cert-card, .timeline-card, .contact, .contact-links a"
);

if (!isTouchDevice) {

    glowCards.forEach(card => {

        card.classList.add("js-glow");

        card.addEventListener("mousemove", event => {

            const rect = card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            card.style.setProperty(
                "--glow-x",
                `${x}px`
            );

            card.style.setProperty(
                "--glow-y",
                `${y}px`
            );

            if (
                card.classList.contains("project")
            ) {

                card.querySelector(".project-media")
                    ?.style.setProperty(
                        "--mouse-x",
                        `${x}px`
                    );

                card.querySelector(".project-media")
                    ?.style.setProperty(
                        "--mouse-y",
                        `${y}px`
                    );
            }

        });

    });


    /* Cursor changes when entering interactive areas */

    const cursorInteractive = document.querySelectorAll(
        "a, button, .glass, .about-card, .skill-group, .stat, .project, .cert-card, .timeline-card, .contact-links a"
    );


    cursorInteractive.forEach(element => {

        element.addEventListener("mouseenter", () => {

            document.body.classList.add(
                "cursor-hover"
            );

        });


        element.addEventListener("mouseleave", () => {

            document.body.classList.remove(
                "cursor-hover"
            );

        });

    });

}


