// Updated function with date/time tracking
function subscribeNewsletter() {
  // Create modal overlay
  const modal = document.createElement('div');
  modal.className = 'newsletter-modal';
  modal.innerHTML = `
    <div class="newsletter-form">
      <span class="close-btn">&times;</span>
      <h2>Subscribe to Our Newsletter</h2>
      <p>Stay updated with the latest BIM tips, tools, and insights!</p>
      <form id="newsletterForm">
        <div class="form-group">
          <label for="name">Your Name</label>
          <input type="text" id="name" name="name" required>
        </div>
        <div class="form-group">
          <label for="email">Your Email</label>
          <input type="email" id="email" name="email" required>
        </div>
        <button type="submit" class="submit-btn">Subscribe</button>
      </form>
      <div id="status-message"></div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Close button functionality
  const closeBtn = modal.querySelector('.close-btn');
  closeBtn.addEventListener('click', () => {
    document.body.removeChild(modal);
  });
  
  // Form submission
  const form = modal.querySelector('#newsletterForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    
    if (!name || !email) {
      document.getElementById('status-message').textContent = 'Please fill in all fields';
      document.getElementById('status-message').style.color = 'red';
      return;
    }
    
    // Show loading state
    const statusMessage = document.getElementById('status-message');
    statusMessage.textContent = 'Sending...';
    statusMessage.style.color = 'black';
    const submitBtn = form.querySelector('.submit-btn');
    submitBtn.disabled = true;
    
    // Get current date and time in EU format (dd/mm/yyyy)
    const now = new Date();
    const timestamp = new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(now);
    
    // Use JSON data with date/time
    const data = JSON.stringify({
      name: name,
      email: email,
      to_email: 'contact@bimmsmart.com',
      subject: `Newsletter subscription - ${name}`,
      signup_date: timestamp
    });
    
    // Send data to webhook with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    fetch('https://hook.eu2.make.com/tb1qmztf62db7odq4uhu0d5mhy42qk8o', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data,
      signal: controller.signal
    })
    .then(response => {
      clearTimeout(timeoutId);
      return response;
    })
    .then(response => {
      if (!response.ok) {
        console.error('Webhook response:', response.status, response.statusText);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      // Success handling - don't try to process the response
      statusMessage.textContent = 'Thank you for subscribing to our newsletter!';
      statusMessage.style.color = 'green';
      setTimeout(() => {
        document.body.removeChild(modal);
      }, 3000);
    })
    .catch(error => {
      clearTimeout(timeoutId);
      
      // Error handling
      console.error('Error details:', error);
      
      if (error.name === 'AbortError') {
        statusMessage.textContent = 'Request timed out. Please try again later.';
      } else {
        statusMessage.textContent = 'Something went wrong. Please try again later.';
      }
      
      statusMessage.style.color = 'red';
      submitBtn.disabled = false;
    });
  });
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

