// Enhanced email validation function
function isValidEmail(email) {
  // Basic format check with regex:
  //  - At least one character before and after the '@'
  //  - Only letters, digits, or .-_ in domain
  //  - TLD requires at least 2 letters
  const basicRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
  if (!basicRegex.test(email)) return false;
  
  // Split into local + domain parts
  const [localPart, domainPart] = email.split('@');
  
  // No consecutive dots in local part
  if (localPart.includes('..')) return false;

  // No leading or trailing dots in local part
  if (localPart.startsWith('.') || localPart.endsWith('.')) return false;

  // Domain part checks
  if (!domainPart) return false;

  // Domain shouldn't start or end with a hyphen or dot
  if (
    domainPart.startsWith('.') || domainPart.startsWith('-') ||
    domainPart.endsWith('.')   || domainPart.endsWith('-')
  ) {
    return false;
  }
    
  // No consecutive dots in domain
  if (domainPart.includes('..')) return false;
  
  return true;
}

// Show newsletter modal and handle subscription
function subscribeNewsletter() {
  // Create modal overlay
  const modal = document.createElement('div');
  modal.className = 'newsletter-modal';
  modal.innerHTML = `
    <div class="newsletter-form">
      <span class="close-btn">&times;</span>
      <h2>Subscribe to Our Newsletter</h2>
      <p>Stay updated with the latest BIM tips, tools, and insights!</p>
      <form id="newsletterForm" novalidate>
        <div class="form-group">
          <label for="name">Your Name</label>
          <!-- Added maxlength to limit name length at input -->
          <input type="text" id="name" name="name" required maxlength="50">
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
  // Fade-in effect
  setTimeout(() => {
    modal.style.opacity = '1';
  }, 10);

  // Close button
  const closeBtn = modal.querySelector('.close-btn');
  closeBtn.addEventListener('click', () => {
    document.body.removeChild(modal);
  });

  // Form submission with validation
  const form = modal.querySelector('#newsletterForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const name = nameField.value.trim();
    const email = emailField.value.trim();
    const statusMessage = document.getElementById('status-message');
    
    // Reset previous messages
    statusMessage.textContent = '';
    statusMessage.style.color = 'black';
    
    let isValid = true;
    const errorMessages = [];
    
    // Validate name
    if (!name) {
      errorMessages.push('Please enter your name');
      isValid = false;
    } else if (name.length < 2 || name.length > 50) {
      errorMessages.push('Name must be between 2-50 characters');
      isValid = false;
    } 
    // Allow letters, accented chars, spaces, hyphen, apostrophe, period
    else if (!/^[a-zA-ZÀ-ÖØ-öø-ÿ\s'\-\.]+$/.test(name)) {
      errorMessages.push('Name contains invalid characters');
      isValid = false;
    }
    
    // Validate email
    if (!email) {
      errorMessages.push('Please enter your email address');
      isValid = false;
    } else if (!isValidEmail(email)) {
      errorMessages.push('Please enter a valid email address');
      isValid = false;
    }
    
    if (!isValid) {
      statusMessage.textContent = errorMessages.join('. ');
      statusMessage.style.color = 'red';
      return;
    }
    
    // If valid
    statusMessage.textContent = 'Sending...';
    statusMessage.style.color = 'black';
    const submitBtn = form.querySelector('.submit-btn');
    submitBtn.disabled = true;
    
    // Date/time in dd/mm/yyyy HH:mm:ss
    const now = new Date();
    const timestamp = new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(now);
    
    // Prepare JSON
    const data = JSON.stringify({
      name: name,
      email: email,
      to_email: 'contact@bimmsmart.com',
      subject: `Newsletter subscription - ${name}`,
      signup_date: timestamp
    });
    
    // POST to Make webhook
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
    
    fetch('https://hook.eu2.make.com/tb1qmztf62db7odq4uhu0d5mhy42qk8o', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data,
      signal: controller.signal
    })
    .then(response => {
      clearTimeout(timeoutId);
      if (!response.ok) {
        console.error('Webhook response:', response.status, response.statusText);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response;
    })
    .then(() => {
      statusMessage.textContent = 'Thank you for subscribing to our newsletter!';
      statusMessage.style.color = 'green';
      setTimeout(() => {
        document.body.removeChild(modal);
      }, 3000);
    })
    .catch(error => {
      clearTimeout(timeoutId);
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

// Load external HTML components
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

// Receive your kit modal function
function receiveYourKit() {
  const modal = document.createElement('div');
  modal.className = 'newsletter-modal';
  modal.innerHTML = `
    <div class="newsletter-form">
      <span class="close-btn">&times;</span>
      <h2>Preencha seus dados</h2>
      <p>Qual curso você gostaria de saber mais?</p>
      <form id="courseRequestForm" novalidate>
        <div class="form-group">
          <label for="kit-name">Nome Completo</label>
          <!-- Add maxlength to prevent excessive input -->
          <input type="text" id="kit-name" name="name" required maxlength="50">
        </div>
        <div class="form-group">
          <label for="kit-email">Email</label>
          <input type="email" id="kit-email" name="email" required>
        </div>
        <div class="form-group">
          <label for="kit-course">Qual curso você gostaria de saber mais?</label>
          <select id="kit-course" name="course" required>
            <option value="" disabled selected>Selecione um curso...</option>
            <option value="Kit grátis meu Primeiro Emprego BIM">Kit grátis meu Primeiro Emprego BIM</option>
            <option value="Primeiro Emprego BIM: Curso Prático Ao Vivo">Primeiro Emprego BIM: Curso Prático Ao Vivo</option>
            <option value="BIM Coordinator: Treinamento Prático">BIM Coordinator: Treinamento Prático</option>
            <option value="Task Automation with AI">Task Automation with AI</option>
          </select>
        </div>
        <button type="submit" class="submit-btn">Enviar</button>
      </form>
      <div id="kit-status-message"></div>
    </div>
  `;
  
  document.body.appendChild(modal);
  setTimeout(() => {
    modal.style.opacity = '1';
  }, 10);
  
  const closeBtn = modal.querySelector('.close-btn');
  closeBtn.addEventListener('click', () => {
    document.body.removeChild(modal);
  });
  
  // Attach submission handler
  const form = modal.querySelector('#courseRequestForm');
  form.addEventListener('submit', handleCourseFormSubmission);
}

function handleCourseFormSubmission(e) {
  e.preventDefault();

  const name = document.getElementById('kit-name').value.trim();
  const email = document.getElementById('kit-email').value.trim();
  const course = document.getElementById('kit-course').value;
  
  const statusMessage = document.getElementById('kit-status-message');
  
  statusMessage.textContent = '';
  statusMessage.style.color = 'black';
  
  let isValid = true;
  const errorMessages = [];
  
  // Name validation
  if (!name) {
    errorMessages.push('Por favor, digite seu nome');
    isValid = false;
  } else if (name.length < 2 || name.length > 50) {
    errorMessages.push('Nome deve ter entre 2-50 caracteres');
    isValid = false;
  } else if (!/^[a-zA-ZÀ-ÖØ-öø-ÿ\s'\-\.]+$/.test(name)) {
    errorMessages.push('Nome contém caracteres inválidos');
    isValid = false;
  }
  
  // Email validation
  if (!email) {
    errorMessages.push('Por favor, digite seu email');
    isValid = false;
  } else if (!isValidEmail(email)) {
    errorMessages.push('Por favor, digite um email válido');
    isValid = false;
  }
  
  // Course validation
  if (!course) {
    errorMessages.push('Por favor, selecione um curso');
    isValid = false;
  }
  
  if (!isValid) {
    statusMessage.textContent = errorMessages.join('. ');
    statusMessage.style.color = 'red';
    return;
  }
  
  statusMessage.textContent = 'Enviando...';
  statusMessage.style.color = 'black';
  
  const submitBtn = e.target.querySelector('.submit-btn');
  submitBtn.disabled = true;

  // Get date/time in dd/mm/yyyy HH:mm:ss
  const now = new Date();
  const timestamp = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(now);

  const data = JSON.stringify({
    name,
    email,
    course,
    subject: `Interesse no curso: ${course}`,
    signup_date: timestamp
  });

  // Send to your Make webhook
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  fetch('https://hook.eu2.make.com/w6stnvtkxe0m8lfdvaf4xacedttru76d', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data,
    signal: controller.signal
  })
  .then(response => {
    clearTimeout(timeoutId);
    if (!response.ok) {
      console.error('Webhook response:', response.status, response.statusText);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    statusMessage.textContent = 'Obrigado! Em breve entraremos em contato por email.';
    statusMessage.style.color = 'green';
    setTimeout(() => {
      const modal = document.querySelector('.newsletter-modal');
      if (modal) document.body.removeChild(modal);
    }, 3000);
  })
  .catch(error => {
    clearTimeout(timeoutId);
    console.error('Error details:', error);
    if (error.name === 'AbortError') {
      statusMessage.textContent = 'Tempo esgotado. Tente novamente mais tarde.';
    } else {
      statusMessage.textContent = 'Algo deu errado. Tente novamente mais tarde.';
    }
    statusMessage.style.color = 'red';
    submitBtn.disabled = false;
  });
}

// Finally, load your components on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  loadComponent('#header', '/components/header.html');
  loadComponent('#contact', '/components/contact.html');
  loadComponent('#footer', '/components/footer.html');
  
  // Example usage: if you have a button that triggers the modal
  const kitButton = document.getElementById('request-kit-btn');
  if (kitButton) {
    kitButton.addEventListener('click', receiveYourKit);
  }
});
