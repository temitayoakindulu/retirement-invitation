
console.log ("Javascipt is connected ")



const preloader = document.getElementById("preloader");

window.addEventListener("load", function () {
    setTimeout(function () {
        preloader.classList.add("hide");
    }, 1000);
});

/* =========================
   1. MOBILE NAVIGATION
========================= */

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const menuClose = document.getElementById("menuClose");
const menuBackdrop = document.getElementById("menuBackdrop");

function openMenu() {
    mobileMenu.classList.add("is-open");
    menuBackdrop.classList.add("is-visible");
    document.body.classList.add("menu-open");

    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation menu");
    mobileMenu.setAttribute("aria-hidden", "false");

    menuClose.focus();
}

function closeMenu() {
    mobileMenu.classList.remove("is-open");
    menuBackdrop.classList.remove("is-visible");
    document.body.classList.remove("menu-open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    mobileMenu.setAttribute("aria-hidden", "true");

    menuToggle.focus();
}

menuToggle.addEventListener("click", () => {
    if (mobileMenu.classList.contains("is-open")) {
        closeMenu();
    } else {
        openMenu();
    }
});

menuClose.addEventListener("click", closeMenu);
menuBackdrop.addEventListener("click", closeMenu);

document.querySelectorAll(".menu-links a").forEach(link => {
    link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape" &&
        mobileMenu.classList.contains("is-open")) {
        closeMenu();
    }
});


/* =========================
   2. SHARE INVITATION
========================= */

/* const shareButton = document.getElementById("shareInvitation");

shareButton.addEventListener("click", async () => {
    const shareData = {
        title: "PST Yinka Eunice Adeyemo",
        text: "You are cordially invited to the 60th Birthday and Retirement Celebration of PST Yinka Eunice Adeyemo.",
        url: window.location.href
    };

    try {
        if (navigator.share) {
            await navigator.share(shareData);
        } else if (navigator.clipboard &&
                   window.isSecureContext) {
            await navigator.clipboard.writeText(shareData.url);
            alert("Invitation link copied!");
        } else {
            prompt("Copy your invitation link:", shareData.url);
        }
    } catch (error) {
        if (error.name !== "AbortError") {
            console.error("Unable to share invitation:", error);
        }
    }
}); */



/* =========================
   2. SHARE INVITATION
========================= */

const shareButtons = document.querySelectorAll(".shareInvitation");

shareButtons.forEach((button) => {
    button.addEventListener("click", async () => {
        const shareData = {
            title: "PST Yinka Eunice Adeyemo",
            text: "You are cordially invited to the 60th Birthday and Retirement Celebration of PST Yinka Eunice Adeyemo.",
            url: window.location.href
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else if (
                navigator.clipboard &&
                window.isSecureContext
            ) {
                await navigator.clipboard.writeText(shareData.url);
                alert("Invitation link copied!");
            } else {
                prompt("Copy your invitation link:", shareData.url);
            }
        } catch (error) {
            if (error.name !== "AbortError") {
                console.error("Unable to share invitation:", error);
            }
        }
    });
});



/* =========================
   3. COUNTDOWN TIMER
========================= */

// Event date: 3 November 2026, 12 noon, Nigeria time.
const eventDate = new Date("2026-11-03T12:00:00+01:00").getTime();

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

function updateCountdown() {
    const now = Date.now();
    const difference = eventDate - now;

    if (difference <= 0) {
        daysElement.textContent = "000";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";
        return;
    }

    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (difference / 1000) % 60
    );

    daysElement.textContent = String(days).padStart(2, "0");
    hoursElement.textContent = String(hours).padStart(2, "0");
    minutesElement.textContent = String(minutes).padStart(2, "0");
    secondsElement.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);



/* =========================
   VENUE: COPY ADDRESS
========================= */

const copyVenueButton = document.getElementById("copyVenueAddress");
const copyVenueLabel = document.getElementById("copyVenueLabel");

if (copyVenueButton && copyVenueLabel) {
    copyVenueButton.addEventListener("click", async () => {
        const address =
            "International Conference Center, University of Ibadan, " +
            "Second Gate, Aganga Hall, Ibadan, Oyo State, Nigeria";

        try {
            await navigator.clipboard.writeText(address);

            copyVenueLabel.textContent = "ADDRESS COPIED ✓";

            setTimeout(() => {
                copyVenueLabel.textContent = "COPY ADDRESS";
            }, 2000);
        } catch (error) {
            window.prompt("Copy the venue address below:", address);
        }
    });
}



/* =========================
   RSVP: COPY CONTACT NUMBER
========================= */

document.querySelectorAll(".copy-contact").forEach((button) => {
    button.addEventListener("click", async () => {
        const phoneNumber = button.dataset.phone;
        const originalText = button.innerHTML;

        try {
            await navigator.clipboard.writeText(phoneNumber);

            button.textContent = "✓ Copied";

            setTimeout(() => {
                button.innerHTML = originalText;
            }, 1800);
        } catch (error) {
            window.prompt("Copy this contact number:", phoneNumber);
        }
    });
});


const galleryGrid = document.getElementById("galleryGrid");
const lightbox = document.getElementById("galleryLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxCounter = document.getElementById("lightboxCounter");

const closeButton = lightbox.querySelector(".lightbox__close");
const prevButton = lightbox.querySelector(".lightbox__prev");
const nextButton = lightbox.querySelector(".lightbox__next");
const viewAllButton = document.getElementById("viewAllPhotos");

const photoButtons = [
  ...galleryGrid.querySelectorAll("[data-gallery-image]")
];

let currentPhoto = 0;
let previousFocus = null;

function getPhotoData() {
  return photoButtons.map((button) => {
    const img = button.querySelector("img");

    return {
      src: img.getAttribute("src"),
      alt: img.alt,
      caption: img.alt
    };
  });
}

function showPhoto(index) {
  const photos = getPhotoData();

  if (!photos.length) return;

  currentPhoto = (index + photos.length) % photos.length;

  const photo = photos[currentPhoto];

  lightboxImage.src = photo.src;
  lightboxImage.alt = photo.alt;
  lightboxCaption.textContent = photo.caption;
  lightboxCounter.textContent =
    `${currentPhoto + 1} of ${photos.length}`;

  prevButton.disabled = photos.length < 2;
  nextButton.disabled = photos.length < 2;
}

function openLightbox(index) {
  previousFocus = document.activeElement;

  showPhoto(index);

  lightbox.hidden = false;
  lightbox.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";

  closeButton.focus();
}

function closeLightbox() {
  if (lightbox.hidden) return;

  lightbox.hidden = true;
  lightbox.setAttribute("aria-hidden", "true");

  lightboxImage.removeAttribute("src");
  document.body.style.overflow = "";

  if (previousFocus && previousFocus.isConnected) {
    previousFocus.focus();
  }
}

photoButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    openLightbox(index);
  });
});

prevButton.addEventListener("click", () => {
  showPhoto(currentPhoto - 1);
});

nextButton.addEventListener("click", () => {
  showPhoto(currentPhoto + 1);
});

closeButton.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});


document.addEventListener("keydown", (event) => {
  // Make sure the lightbox exists before accessing it
  if (!lightbox || lightbox.hidden) return;

  if (event.key === "Escape") {
    closeLightbox();
  } else if (event.key === "ArrowLeft") {
    showPhoto(currentPhoto - 1);
  } else if (event.key === "ArrowRight") {
    showPhoto(currentPhoto + 1);
  }
});

// Only attach the click event if the button exists
if (viewAllButton) {
  viewAllButton.addEventListener("click", () => {
    openLightbox(0);
  });
}




/* const wishForm = document.getElementById("wishForm");
const wishSubmit = document.getElementById("wishSubmit");
const wishStatus = document.getElementById("wishStatus");


const WISH_FORM_ENDPOINT = "https://formspree.io/f/xljgpnbq";

wishForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!wishForm.reportValidity()) return;

  if (WISH_FORM_ENDPOINT.includes("wishForm")) {
    wishStatus.textContent =
      "The guestbook has not been connected yet. Please try again later.";
    return;
  }

  wishSubmit.disabled = true;
  wishSubmit.querySelector("span").textContent = "SENDING...";
  wishStatus.textContent = "Sending your wish...";

  try {
    const response = await fetch(WISH_FORM_ENDPOINT, {
      method: "POST",
      body: new FormData(wishForm),
      headers: {
        Accept: "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("The wish could not be submitted.");
    }

    wishForm.reset();

    wishStatus.textContent =
      "Thank you! Your wish has been sent successfully.";

  } catch (error) {
    wishStatus.textContent =
      "We couldn't send your wish. Please check your connection and try again.";
  } finally {
    wishSubmit.disabled = false;
    wishSubmit.querySelector("span").textContent = "SUBMIT WISH";
  }
}); */



/* const wishForm = document.getElementById("wishForm");
const wishSubmit = document.getElementById("wishSubmit");
const wishStatus = document.getElementById("wishStatus");


// Celebrant's WhatsApp number
// Replace this with the celebrant's actual number.
// Use the international format without +, spaces, or dashes.
const celebrantWhatsApp = "2349031891178";


wishForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get the visitor's details
    const visitorName = document
        .getElementById("wishName")
        .value
        .trim();

    const visitorMessage = document
        .getElementById("wishMessage")
        .value
        .trim();

    // Validate the form
    if (!visitorName || !visitorMessage) {
        wishForm.reportValidity();
        return;
    }

    // Create the WhatsApp message
    const whatsappMessage =
`My name is ${visitorName}.

Sending this message from the birthday / retirement invitation website,

My birthday & retirement wish:

${visitorMessage}`;

    // Encode the message for WhatsApp
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // Create the WhatsApp DM link
    const whatsappURL =
        `https://wa.me/${celebrantWhatsApp}?text=${encodedMessage}`;

    // Update the status message
    wishStatus.textContent =
        "Opening WhatsApp. Please tap Send to deliver your wish.";

    // Open WhatsApp with the prepared message
    window.open(whatsappURL, "_blank");

}); */



const wishForm = document.getElementById("wishForm");
const wishStatus = document.getElementById("wishStatus");
const whatsappChoice = document.getElementById("whatsappChoice");

const whatsappMessenger = document.getElementById("whatsappMessenger");
const whatsappBusiness = document.getElementById("whatsappBusiness");

// Replace with the celebrant's actual WhatsApp number.
// Nigerian example: 08012345678 becomes 2348012345678.
const celebrantWhatsApp = "2348102284338";

let preparedMessage = "";

wishForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!wishForm.reportValidity()) return;

    const visitorName = document
        .getElementById("wishName")
        .value.trim();

    const visitorMessage = document
        .getElementById("wishMessage")
        .value.trim();

    if (!visitorName || !visitorMessage) return;

    // Prepare the message once for either app.
    preparedMessage =
`My name is ${visitorName}.

Sending this message from the birthday / retirement invitation website,

My birthday & retirement wish:

${visitorMessage}`;

    // Reveal the app selection buttons.
    whatsappChoice.hidden = false;

    wishStatus.textContent =
        "Choose your preferred WhatsApp application below.";

    // Bring the choices into view on mobile.
    whatsappChoice.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
});

function openSelectedWhatsApp(packageName) {
    const encodedMessage = encodeURIComponent(preparedMessage);

    const fallbackURL =
        `https://wa.me/${celebrantWhatsApp}?text=${encodedMessage}`;

    // Android Chrome: attempt to launch the selected app.
    const intentURL =
        `intent://send?phone=${celebrantWhatsApp}` +
        `&text=${encodedMessage}` +
        `#Intent;scheme=whatsapp;package=${packageName};` +
        `S.browser_fallback_url=${encodeURIComponent(fallbackURL)};end`;

    // Use Android-specific intent links on Android.
    const isAndroid = /Android/i.test(navigator.userAgent);

    if (isAndroid) {
        window.location.href = intentURL;
    } else {
        // iPhone, desktop, or other devices:
        // use the standard WhatsApp link.
        window.open(fallbackURL, "_blank");
    }

    wishStatus.textContent =
        "If WhatsApp opens, review your wish and tap Send.";
}

// WhatsApp Messenger
whatsappMessenger.addEventListener("click", function () {
    openSelectedWhatsApp("com.whatsapp");
});

// WhatsApp Business
whatsappBusiness.addEventListener("click", function () {
    openSelectedWhatsApp("com.whatsapp.w4b");
});




// Track when the visitor leaves to open WhatsApp.
let whatsappWasOpened = false;

function openSelectedWhatsApp(packageName) {
    const encodedMessage = encodeURIComponent(preparedMessage);

    const fallbackURL =
        `https://wa.me/${celebrantWhatsApp}?text=${encodedMessage}`;

    const intentURL =
        `intent://send?phone=${celebrantWhatsApp}` +
        `&text=${encodedMessage}` +
        `#Intent;scheme=whatsapp;package=${packageName};` +
        `S.browser_fallback_url=${encodeURIComponent(fallbackURL)};end`;

    whatsappWasOpened = true;

    if (/Android/i.test(navigator.userAgent)) {
        window.location.href = intentURL;
    } else {
        window.open(fallbackURL, "_blank");
    }

    wishStatus.textContent =
        "After sending your wish on WhatsApp, return to this page.";
}

// Detect when the visitor returns to the invitation page.
document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible" && whatsappWasOpened) {
        wishForm.reset();

        whatsappChoice.hidden = true;

        wishStatus.textContent =
            "Thank you for sharing your wish! We appreciate your kind words.";

        whatsappWasOpened = false;
        preparedMessage = "";
    }
});

