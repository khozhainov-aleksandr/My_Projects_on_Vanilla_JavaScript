'use strict';

const containerEl = document.querySelector('.container');
const seatsEl = document.querySelectorAll('.row .seat:not(.occupied)');
const countEl = document.getElementById('count');
const totalEl = document.getElementById('total');
const movieSelectEl = document.getElementById('movie');

populateUI();

let ticketPrise = Number(movieSelectEl.value);

containerEl.addEventListener('click', onClickToSeatArea);
movieSelectEl.addEventListener('change', onChangeTicketPrise);

// Click and chose seats position
function onClickToSeatArea(event) {
  const target = event.target;

  if (target.classList.contains('seat') && !target.classList.contains('occupied')) {
    target.classList.toggle('selected');
    updateSelectedCount();
  }
}

// Change and chose ticket prise
function onChangeTicketPrise(event) {
  ticketPrise = Number(event.target.value);
  setMoveDate(event.target.selectedIndex, event.target.value);
  updateSelectedCount();
}

// Save selected movie index and prise
function setMoveDate(movieIndex, moviePrise) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrise', moviePrise);
}

// Update seats count and total tickets prise
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const seatsIndex = [...selectedSeats].map((seat) => [...seatsEl].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  countEl.textContent = selectedSeatsCount;
  totalEl.textContent = selectedSeatsCount * ticketPrise;
}

// Get data from LocalStorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seatsEl.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieSelectEl.selectedIndex = selectedMovieIndex;
  }
}

// Initial count and total set
updateSelectedCount();
