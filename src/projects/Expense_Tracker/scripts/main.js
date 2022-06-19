'use strict';

const balanceEl = document.querySelector('#balance');
const moneyPlusEl = document.querySelector('#money-plus');
const moneyMinusEl = document.querySelector('#money-minus');
const listEl = document.querySelector('#list');
const formEl = document.querySelector('#form');
const textEl = document.querySelector('#text');
const amountEl = document.querySelector('#amount');

formEl.addEventListener('submit', addTransaction);

const localStorageTransactions = (
  // eslint-disable-next-line no-undef
  JSON.parse(localStorage.getItem('transactions'))
);

// eslint-disable-next-line no-undef
let transactions = localStorage.getItem('transactions') !== null
  ? localStorageTransactions
  : [];

function addTransactionToDOM(transaction) {
  const sign = transaction.amount < 0 ? '-' : '+';
  const item = document.createElement('li');

  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `${transaction.text}
    <span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(
      ${transaction.id}
    )">X</button>
  `;

  listEl.appendChild(item);
}

function addTransaction(event) {
  event.preventDefault();

  if (textEl.value.trim() === '' || amountEl.value.trim() === '') {
    // eslint-disable-next-line no-undef
    alert('Please add a Text and Amount');
  } else {
    const transaction = {
      id: generateID(),
      text: textEl.value,
      amount: Number(amountEl.value),
    };

    transactions.push(transaction);

    addTransactionToDOM(transaction);
    updateValues();
    clearValue(textEl);
    clearValue(amountEl);
    updateLocalStorage();
  }
}

function generateID() {
  return Math.floor(Math.random() * 1000000000);
}

function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts
    .reduce((acc, item) => (acc + item), 0).toFixed(2);

  const income = amounts.filter((item) => (item > 0))
    .reduce((acc, item) => (acc + item), 0)
    .toFixed(2);

  const expense = Math.abs(amounts.filter((item) => (item < 0))
    .reduce((acc, item) => (acc + item), 0))
    .toFixed(2);

  balanceEl.textContent = `$${total}`;
  moneyPlusEl.textContent = `$${income}`;
  moneyMinusEl.textContent = `$${expense}`;
}

// eslint-disable-next-line no-unused-vars
function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  updateLocalStorage();
  init();
}

function updateLocalStorage() {
  // eslint-disable-next-line no-undef
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function init() {
  listEl.innerHTML = '';
  transactions.forEach((addTransactionToDOM));
  updateValues();
}

function clearValue(itemValue) {
  itemValue.value = '';
}

init();
