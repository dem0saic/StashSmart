// Select the theme toggler container
const themeToggler = document.querySelector('.theme-toggler');

// Select the icons within the theme toggler
const sunIcon = document.querySelector('.theme-toggler .fa-sun');
const moonIcon = document.querySelector('.theme-toggler .fa-moon');

// Add click event listener to the theme toggler container
themeToggler.addEventListener('click', () => {
    // Toggle the 'active' class on the icons
    sunIcon.classList.toggle('active');
    moonIcon.classList.toggle('active');

    // Toggle the 'dark-theme' class on the body element
    document.body.classList.toggle('dark-theme');
});
