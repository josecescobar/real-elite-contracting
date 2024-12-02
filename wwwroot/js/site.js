// Utility function for adding hover effects
function addHoverEffect(element, scaleValue = 1.05) {
    element.addEventListener('mouseenter', () => {
        element.style.transform = `scale(${scaleValue})`;
    });
    element.addEventListener('mouseleave', () => {
        element.style.transform = 'scale(1)';
    });
}

// Smooth Scroll for Internal Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form Submission Handling for "Get a Quote" Page
const getQuoteForm = document.querySelector('form[action="/Home/GetQuote"]');
if (getQuoteForm) {
    getQuoteForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Add a loading spinner (UX improvement)
        const loadingSpinner = document.createElement('div');
        loadingSpinner.className = 'spinner-border text-primary mt-3';
        loadingSpinner.setAttribute('role', 'status');
        getQuoteForm.parentElement.appendChild(loadingSpinner);

        // Simulate a successful submission for demo purposes
        setTimeout(() => {
            // Remove spinner after "processing"
            loadingSpinner.remove();

            const formData = new FormData(getQuoteForm);
            const name = formData.get('name');

            // Display a thank-you message (you could replace this with actual submission logic)
            const successMessage = document.createElement('div');
            successMessage.className = 'alert alert-success mt-3';
            successMessage.textContent = `Thank you, ${name}! We have received your quote request and will get back to you soon.`;

            // Append the message below the form
            getQuoteForm.parentElement.appendChild(successMessage);

            // Clear form fields after submission
            getQuoteForm.reset();
        }, 1000); // Simulate a delay for form submission
    });
}

// Control Bootstrap Carousel Autoplay
document.addEventListener('DOMContentLoaded', function () {
    const projectCarousel = document.querySelector('#projectCarousel');
    if (projectCarousel) {
        // Set interval time in milliseconds (3000ms = 3 seconds)
        const bootstrapCarousel = new bootstrap.Carousel(projectCarousel, {
            interval: 3000,
            ride: 'carousel'
        });

        // Add pause/play control buttons with improved styling
        const pauseButton = document.createElement('button');
        pauseButton.className = 'btn btn-secondary mt-3';
        pauseButton.innerHTML = '<i class="fas fa-pause"></i> Pause Carousel'; // Use an icon
        pauseButton.setAttribute('aria-label', 'Pause the carousel');
        let isPaused = false;

        pauseButton.addEventListener('click', function () {
            if (isPaused) {
                bootstrapCarousel.cycle();
                pauseButton.innerHTML = '<i class="fas fa-pause"></i> Pause Carousel';
                pauseButton.setAttribute('aria-label', 'Pause the carousel');
            } else {
                bootstrapCarousel.pause();
                pauseButton.innerHTML = '<i class="fas fa-play"></i> Play Carousel';
                pauseButton.setAttribute('aria-label', 'Play the carousel');
            }
            isPaused = !isPaused;
        });

        // Insert the button below the carousel
        projectCarousel.parentElement.insertBefore(pauseButton, projectCarousel.nextSibling);
    }
});

// General Interactive Button Hover Effect (using utility function)
document.querySelectorAll('.btn').forEach(button => {
    addHoverEffect(button);
});

// Portfolio Filtering Logic
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', function() {
        // Set active class on the selected button
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        // Get the filter value from the clicked button
        const filter = this.getAttribute('data-filter');

        // Show or hide portfolio items based on filter
        document.querySelectorAll('.portfolio-item').forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});
