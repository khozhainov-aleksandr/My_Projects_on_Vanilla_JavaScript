'use strict';

const CONFIRM_MESSAGE = 'Confirm !';
const TITLE_MESSAGE_USER_NAME = 'User Name';
const TITLE_MESSAGE_EMAIL = 'Email';
const TITLE_MESSAGE_PASSWORD = 'Password';
const TITLE_MESSAGE_CONFIRM_PASSWORD = 'Confirm Password';

const formEl = document.querySelector('#form');
const userNameInputEl = document.querySelector('#username');
const emailInputEl = document.querySelector('#email');
const passwordInputEl = document.querySelector('#password');
const passwordConfirmInputEl = document.querySelector('#password-confirm');

formEl.addEventListener('submit', onClickSubmitForm);

function onClickSubmitForm(event) {
  event.preventDefault();

  checkEmptyInput(
    [userNameInputEl, emailInputEl, passwordInputEl, passwordConfirmInputEl],
    [TITLE_MESSAGE_USER_NAME, TITLE_MESSAGE_EMAIL, TITLE_MESSAGE_PASSWORD, TITLE_MESSAGE_CONFIRM_PASSWORD],
    CONFIRM_MESSAGE);
  checkEmailInput(emailInputEl, TITLE_MESSAGE_EMAIL, CONFIRM_MESSAGE);
  checkLengthInput(userNameInputEl, 3, 15, TITLE_MESSAGE_USER_NAME, CONFIRM_MESSAGE);
  checkLengthInput(passwordInputEl, 6, 20, TITLE_MESSAGE_PASSWORD, CONFIRM_MESSAGE);
  checkPasswordMerge(passwordInputEl, passwordConfirmInputEl, TITLE_MESSAGE_CONFIRM_PASSWORD);
}

function checkEmptyInput(inputArray, messageArray, messageConfirm) {
  inputArray.forEach((inputElement, index) => {
    if (inputElement.value.trim() === '') {
      showError(inputElement, `${messageArray[index]} is Required !`);
    } else {
      showSuccess(inputElement, `${messageArray[index]} ${messageConfirm}`);
    }
  });
}

function checkLengthInput(input, min, max, messageTitle, messageConfirm) {
  if (input.value.length < min) {
    showError(input, `${messageTitle} length must be Min ${min} characters.`);
  } else if (input.value.length > max) {
    showError(input, `${messageTitle} length must be Max ${max} characters.`);
  } else {
    showSuccess(input, `${messageTitle} ${messageConfirm}`);
  }
}

function checkEmailInput(input, messageTitle, messageConfirm) {
  const regular = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (regular.test(input.value.trim())) {
    showSuccess(input, `${messageTitle} ${messageConfirm}`);
  } else {
    showError(input, `${messageTitle} is not valid !`);
  }
}

function checkPasswordMerge(mainPassword, secondPassword, messageTitle) {
  if (mainPassword.value !== secondPassword.value) {
    showError(secondPassword, `${messageTitle} do not Merge !`);
  }
}

function showError(input, message) {
  const formControl = input.parentElement;
  const smallElement = formControl.querySelector('small');

  formControl.classList.remove('success');
  formControl.classList.add('error');
  smallElement.textContent = message;
}

function showSuccess(input, message) {
  const formControl = input.parentElement;
  const smallElement = formControl.querySelector('small');

  formControl.classList.remove('error');
  formControl.classList.add('success');
  smallElement.textContent = message;
}
