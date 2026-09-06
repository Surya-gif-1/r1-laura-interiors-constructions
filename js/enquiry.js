/* ============================================================
   R1 LAURA — ENQUIRY FORM
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('enquiry-form');
  if (!form) return;

  form.addEventListener('submit', handleSubmit);

  // Real-time validation
  form.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => clearError(input));
  });
});

function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;

  if (!validateForm(form)) return;

  const data = getFormData(form);

  // Save to localStorage
  if (typeof DB !== 'undefined') {
    DB.addEnquiry(data);
  }

  // Build WhatsApp message
  const msg = buildWhatsAppMessage(data);
  showSuccess(form, msg);
}

function getFormData(form) {
  const f = (id) => (form.querySelector(`#${id}`) || {}).value || '';
  return {
    name: f('field-name'),
    phone: f('field-phone'),
    whatsapp: f('field-whatsapp'),
    email: f('field-email'),
    location: f('field-location'),
    propertyType: f('field-property-type'),
    requirement: f('field-requirement'),
    area: f('field-area'),
    budget: f('field-budget'),
    contactMethod: f('field-contact-method'),
    description: f('field-description'),
  };
}

function buildWhatsAppMessage(d) {
  return `Hello R1 Laura,

I would like to enquire about a project.

Name: ${d.name}
Phone: ${d.phone}${d.whatsapp ? '\nWhatsApp: ' + d.whatsapp : ''}${d.email ? '\nEmail: ' + d.email : ''}
Location: ${d.location}
Property Type: ${d.propertyType}
Requirement: ${d.requirement}${d.area ? '\nArea: ' + d.area : ''}${d.budget ? '\nBudget: ' + d.budget : ''}

Project Details:
${d.description || 'Please contact me regarding my project.'}

Please contact me at your earliest convenience.`;
}

function validateForm(form) {
  let valid = true;
  const required = form.querySelectorAll('[required]');
  required.forEach(field => {
    if (!validateField(field)) valid = false;
  });
  return valid;
}

function validateField(field) {
  const val = field.value.trim();
  const id = field.id;

  clearError(field);

  if (field.hasAttribute('required') && !val) {
    showError(field, 'This field is required.');
    return false;
  }

  if (id === 'field-phone' && val && !/^[6-9]\d{9}$/.test(val)) {
    showError(field, 'Enter a valid 10-digit Indian mobile number.');
    return false;
  }

  if (id === 'field-email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
    showError(field, 'Enter a valid email address.');
    return false;
  }

  return true;
}

function showError(field, msg) {
  field.classList.add('field-error');
  const err = document.createElement('span');
  err.className = 'field-error-msg';
  err.textContent = msg;
  field.parentNode.appendChild(err);
}

function clearError(field) {
  field.classList.remove('field-error');
  const err = field.parentNode.querySelector('.field-error-msg');
  if (err) err.remove();
}

function showSuccess(form, waMsg) {
  const WA_NUM = '917330840545';
  const container = form.closest('.enquiry-form') || form.parentNode;

  container.innerHTML = `
    <div class="form-success">
      <div class="success-icon">
        <i class="fas fa-check"></i>
      </div>
      <h3>Enquiry Received!</h3>
      <p>Thank you for reaching out. We'll contact you shortly.</p>
      <p style="font-size:0.85rem;color:var(--text-grey);margin-top:8px;">
        Send us your details directly on WhatsApp for a faster response.
      </p>
      <div style="display:flex;gap:12px;justify-content:center;margin-top:24px;flex-wrap:wrap;">
        <a href="https://wa.me/${WA_NUM}?text=${encodeURIComponent(waMsg)}" 
           target="_blank" class="btn btn-gold" style="text-decoration:none;">
          <i class="fab fa-whatsapp"></i>
          <span>Send on WhatsApp</span>
        </a>
        <a href="tel:+917330840545" class="btn btn-outline" style="text-decoration:none;">
          <i class="fas fa-phone"></i>
          <span>Call Now</span>
        </a>
      </div>
    </div>
  `;
}
