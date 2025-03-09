/****************************************
 * 1. Email Validation Utility Function *
 ****************************************/
function isValidEmail(email) {
  // Basic regex:
  // - At least one character before the '@'
  // - TLD requires at least 2 letters
  // - Accepts letters, digits, '.', '%', '+', '-'
  const basicRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
  return basicRegex.test(email);
}

/********************************************
 * 2. subscribeNewsletter() - Minimal Popup *
 ********************************************/
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

  // Add modal to DOM
  document.body.appendChild(modal);

  // Fade-in effect (optional)
  setTimeout(() => { modal.style.opacity = '1'; }, 10);

  // Close button
  const closeBtn = modal.querySelector('.close-btn');
  closeBtn.addEventListener('click', () => {
    document.body.removeChild(modal);
  });

  // Handle form submission
  const form = modal.querySelector('#newsletterForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const statusMessage = document.getElementById('status-message');
    
    // Reset status message
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
    } else if (!/^[a-zA-ZÀ-ÖØ-öø-ÿ\s'\-\.]+$/.test(name)) {
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

    // OPTIONAL: 1-minute submission cooldown
    const lastSubmission = localStorage.getItem('lastSubmission');
    if (lastSubmission && (Date.now() - parseInt(lastSubmission)) < 60000) {
      errorMessages.push('Please wait a minute before submitting again.');
      isValid = false;
    }

    // If not valid, display errors
    if (!isValid) {
      statusMessage.textContent = errorMessages.join('. ');
      statusMessage.style.color = 'red';
      return;
    }

    // Record submission time
    localStorage.setItem('lastSubmission', Date.now());

    // Indicate sending
    statusMessage.textContent = 'Sending...';
    statusMessage.style.color = 'black';

    // Disable submit button
    const submitBtn = form.querySelector('.submit-btn');
    submitBtn.disabled = true;

    // Build the final JSON payload
    const now = new Date();
    const timestamp = new Intl.DateTimeFormat('en-GB', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    }).format(now);

    const data = JSON.stringify({
      name: name,
      email: email,
      to_email: 'contact@bimmsmart.com',
      subject: `Newsletter - ${name}`,
      signup_date: timestamp
    });

    // Fetch: send to your Make webhook
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s

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
      // Close modal after 3 seconds
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

/***************************************************
 * 3. receiveYourKit() - Example "Kit" Modal Popup *
 ***************************************************/
function receiveYourKit() {
  // Build your kit modal
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
  setTimeout(() => { modal.style.opacity = '1'; }, 10);
  
  const closeBtn = modal.querySelector('.close-btn');
  closeBtn.addEventListener('click', () => {
    document.body.removeChild(modal);
  });
  
  // Form submission
  const form = modal.querySelector('#courseRequestForm');
  form.addEventListener('submit', handleCourseFormSubmission);
}

/***********************************************************
 * 4. handleCourseFormSubmission() for the "Kit" request   *
 **********************************************************/
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
  
  // Validate name
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
  
  // Validate email
  if (!email) {
    errorMessages.push('Por favor, digite seu email');
    isValid = false;
  } else if (!isValidEmail(email)) {
    errorMessages.push('Por favor, digite um email válido');
    isValid = false;
  }
  
  // Validate course
  if (!course) {
    errorMessages.push('Por favor, selecione um curso');
    isValid = false;
  }

  // OPTIONAL: 1-minute submission cooldown
  const lastSubmission = localStorage.getItem('lastSubmission');
  if (lastSubmission && (Date.now() - parseInt(lastSubmission)) < 60000) {
    errorMessages.push('Please wait a minute before submitting again.');
    isValid = false;
  }

  if (!isValid) {
    statusMessage.textContent = errorMessages.join('. ');
    statusMessage.style.color = 'red';
    return;
  }

  // Record submission
  localStorage.setItem('lastSubmission', Date.now());

  statusMessage.textContent = 'Enviando...';
  statusMessage.style.color = 'black';
  
  const submitBtn = e.target.querySelector('.submit-btn');
  submitBtn.disabled = true;

  // Prepare timestamp
  const now = new Date();
  const timestamp = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  }).format(now);

  // Build data object
  const data = JSON.stringify({
    name,
    email,
    course,
    subject: `Interesse no curso: ${course}`,
    signup_date: timestamp
  });

  // Send to Make.com webhook (separate from the newsletter)
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

/************************************************
 * 5. loadComponent() - For External HTML Parts *
 ************************************************/
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

/************************************************
 * 6. DOMContentLoaded - Load Components, etc.  *
 ************************************************/
document.addEventListener('DOMContentLoaded', () => {
  // Example usage of loadComponent:
  loadComponent('#header', '/components/header.html');
  loadComponent('#contact', '/components/contact.html');
  loadComponent('#footer', '/components/footer.html');
  
  // If you have a button with id="request-kit-btn" that triggers 'receiveYourKit'
  const kitButton = document.getElementById('request-kit-btn');
  if (kitButton) {
    kitButton.addEventListener('click', receiveYourKit);
  }
});
