const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show input error message on the parent div => .parentElement
function showError(input, message) {
  const formControl = input.parentElement; // getting the form div
  formControl.className = 'form-control error'; // adding error class
  const small = formControl.querySelector('small'); // getting 'small' element
  small.innerText = message; // adding message to display on the element
};

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement; // getting the form div
  formControl.className = 'form-control success'; // adding success class
}

// Check if email is valid



// Event listeners:
form.addEventListener('submit', function(e) {
  e.preventDefault();

  if (username.value === '') {
    showError(username, 'Username is required');
  } else {
    showSuccess(username);
  }

  if (email.value === '') {
    showError(email, 'Email is required');
  } else {
    showSuccess(email);
  }

  if (password.value === '') {
    showError(password, 'Password is required');
  } else {
    showSuccess(password);
  }

  if (password2.value === '') {
    showError(password2, 'Password is required');
  } else {
    showSuccess(password2);
  }
});
