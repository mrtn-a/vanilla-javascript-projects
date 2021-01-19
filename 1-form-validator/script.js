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
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

// Check required fields:
function checkRequired(inputArr) {
  inputArr.forEach(function(input) {
    if(input.value.trim() === '') {// .trim to get rid of any whitespace
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}


// Check input length:
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min} characters`);
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} must be less than ${max} characters`);
  } else {
    showSuccess(input);
  }
};

// Get fieldname & capitalize the 1st letter (used in the functions above)
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1); // get 1st letter and uppercase it + input.id and cut out the first letter => .slice at the second character (index goes from 0, so we put 1)
}

// Event listeners:
form.addEventListener('submit', function(e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  // if (username.value === '') {
  //   showError(username, 'Username is required');
  // } else {
  //   showSuccess(username);
  // }

  // if (email.value === '') {
  //   showError(email, 'Email is required');
  // } else if (!isValidEmail(email.value)) {
  //   showError(email, 'Email is not valid');
  // } else {
  //   showSuccess(email);
  // }

  // if (password.value === '') {
  //   showError(password, 'Password is required');
  // } else {
  //   showSuccess(password);
  // }

  // if (password2.value === '') {
  //   showError(password2, 'Password is required');
  // } else {
  //   showSuccess(password2);
  // }

  checkLength(username,3, 15);
  checkLength(password,6, 25);
  checkEmail(email);
});
