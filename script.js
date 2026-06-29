/* ====================================== */

// Get the navbar element from the page
var navbar = document.getElementById('navbar');

// Listen for scroll events
window.addEventListener('scroll', function () {

  // If user scrolled more than 50px, add the 'scrolled' class (adds shadow)
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Also check if we should show the scroll-to-top button
  checkScrollTopBtn();
});


/* ============================================================
   2. HAMBURGER MENU — Show/hide mobile navigation
   ============================================================ */

// Get the hamburger button and the nav menu
var hamburger = document.getElementById('hamburger');
var navMenu   = document.getElementById('navMenu');

// When hamburger is clicked, toggle the menu open/closed
hamburger.addEventListener('click', function () {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
});

// Close the menu when any nav link is clicked
var navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
  });
});

// Also close when the login/register button is clicked
var navBtn = document.querySelector('.nav-btn');
if (navBtn) {
  navBtn.addEventListener('click', function () {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
  });
}


/* ============================================================
   3. SMOOTH SCROLL — Scroll to sections with offset for navbar
   ============================================================ */

// Find all links that point to an anchor (#something)
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener('click', function (e) {

    var target = this.getAttribute('href'); // e.g. "#about"

    // Skip if the link is just "#"
    if (target === '#') return;

    var targetSection = document.querySelector(target);

    // If the section exists on this page
    if (targetSection) {
      e.preventDefault(); // Stop default jump

      // Scroll to the section, but with 70px offset for the navbar
      var scrollTo = targetSection.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: scrollTo, behavior: 'smooth' });
    }
  });
});


/* ============================================================
   4. SCROLL-TO-TOP BUTTON
   ============================================================ */

var scrollTopBtn = document.getElementById('scrollTop');

// Show or hide the button based on scroll position
function checkScrollTopBtn() {
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
}

// Scroll back to top when button is clicked
scrollTopBtn.addEventListener('click', function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ============================================================
   5. SCROLL REVEAL — Fade in elements as they appear on screen
   ============================================================ */

// Select all the elements we want to animate
var revealElements = document.querySelectorAll(
  '.service-card, .portfolio-item, .pricing-card, .review-card, .about-card, .hero-text, .hero-visual, .why-card'
);

// Add the 'reveal' class to each element
// (This makes them invisible and slightly shifted down)
revealElements.forEach(function (el) {
  el.classList.add('reveal');
});

// IntersectionObserver watches when elements scroll into the visible area
var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    // If the element is visible on screen
    if (entry.isIntersecting) {
      entry.target.classList.add('visible'); // Make it appear
      observer.unobserve(entry.target);      // Stop watching it
    }
  });
}, {
  threshold: 0.1 // Trigger when 10% of the element is visible
});

// Start watching each element
revealElements.forEach(function (el) {
  observer.observe(el);
});


/* ============================================================
   6. BOOKING FORM — Validation
   ============================================================ */

var bookingForm = document.getElementById('bookingForm');

// Only run this code if the form exists on this page
if (bookingForm) {

  bookingForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Stop the form from refreshing the page

    // Clear any previous error messages
    clearErrors(['fullNameErr', 'emailErr', 'phoneErr', 'serviceErr', 'packageErr']);

    // Get the values typed into each field
    var fullName = document.getElementById('fullName').value.trim();
    var email    = document.getElementById('email').value.trim();
    var phone    = document.getElementById('phone').value.trim();
    var service  = document.getElementById('service').value;
    var pkg      = document.getElementById('package').value;

    var isValid = true; // We'll set this to false if any field is wrong

    // Check: Full name must be at least 2 characters
    if (fullName.length < 2) {
      showError('fullNameErr', 'Please enter your full name.');
      isValid = false;
    }

    // Check: Email must look like an email address
    if (!isValidEmail(email)) {
      showError('emailErr', 'Please enter a valid email address.');
      isValid = false;
    }

    // Check: Phone must have at least 7 digits
    if (phone.replace(/\D/g, '').length < 7) {
      showError('phoneErr', 'Please enter a valid phone number.');
      isValid = false;
    }

    // Check: A service must be selected
    if (!service) {
      showError('serviceErr', 'Please select a service.');
      isValid = false;
    }

    // Check: A package must be selected
    if (!pkg) {
      showError('packageErr', 'Please select a package.');
      isValid = false;
    }

    // If everything is valid, show success message
    if (isValid) {
      document.getElementById('formSuccess').style.display = 'block';
      bookingForm.reset(); // Clear the form

      // Hide the success message after 5 seconds
      setTimeout(function () {
        document.getElementById('formSuccess').style.display = 'none';
      }, 5000);
    }
  });

}


/* ============================================================
   7. REGISTER FORM — Validation
   ============================================================ */

var registerForm = document.getElementById('registerForm');

if (registerForm) {

  registerForm.addEventListener('submit', function (e) {
    e.preventDefault();

    clearErrors(['regErr']);

    var name    = document.getElementById('regName').value.trim();
    var email   = document.getElementById('regEmail').value.trim();
    var pass    = document.getElementById('regPass').value;
    var confirm = document.getElementById('regConfirm').value;

    var isValid = true;

    if (name.length < 2) {
      showError('regErr', 'Please enter your name.');
      isValid = false;
    } else if (!isValidEmail(email)) {
      showError('regErr', 'Please enter a valid email address.');
      isValid = false;
    } else if (pass.length < 8) {
      showError('regErr', 'Password must be at least 8 characters.');
      isValid = false;
    } else if (pass !== confirm) {
      showError('regErr', 'Passwords do not match.');
      isValid = false;
    }

    if (isValid) {
      document.getElementById('regSuccess').style.display = 'block';
      registerForm.reset();
      setTimeout(function () {
        document.getElementById('regSuccess').style.display = 'none';
      }, 4000);
    }
  });

}


/* ============================================================
   8. LOGIN FORM — Validation
   ============================================================ */

var loginForm = document.getElementById('loginForm');

if (loginForm) {

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    clearErrors(['loginErr']);

    var email = document.getElementById('loginEmail').value.trim();
    var pass  = document.getElementById('loginPass').value;

    var isValid = true;

    if (!isValidEmail(email)) {
      showError('loginErr', 'Please enter a valid email address.');
      isValid = false;
    } else if (pass.length < 1) {
      showError('loginErr', 'Please enter your password.');
      isValid = false;
    }

    if (isValid) {
      document.getElementById('loginSuccess').style.display = 'block';
      loginForm.reset();
      setTimeout(function () {
        document.getElementById('loginSuccess').style.display = 'none';
      }, 4000);
    }
  });

}


/* ============================================================
   HELPER FUNCTIONS
   (Small functions used by the form validation above)
   ============================================================ */

// Show an error message in a specific element
function showError(elementId, message) {
  var el = document.getElementById(elementId);
  if (el) {
    el.textContent = message;
  }
}

// Clear error messages for a list of element IDs
function clearErrors(idList) {
  idList.forEach(function (id) {
    var el = document.getElementById(id);
    if (el) {
      el.textContent = '';
    }
  });
}

// Check if an email address looks valid
function isValidEmail(email) {
  // This pattern checks for: something@something.something
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
