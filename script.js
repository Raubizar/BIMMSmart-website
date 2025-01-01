function subscribeNewsletter() {
    alert("Thank you for subscribing to our newsletter!");
}

function loadComponent(selector, url) {
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(`Failed to load ${url}`);
            return response.text();
        })
        .then(data => {
            document.querySelector(selector).innerHTML = data;
        })
        .catch(error => console.error('Error loading component:', error));
}

// Load components
document.addEventListener('DOMContentLoaded', () => {
    loadComponent('#header', '/components/header.html');
    loadComponent('#contact', '/components/contact.html');
    loadComponent('#footer', '/components/footer.html');
});

