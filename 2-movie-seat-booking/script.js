const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value; // adding + will turn it into an integer (works as parseInt() )

// Save selected movie index and price
function saveMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
};

// TODO
// Add event listener on the container
// Check if clicked element has a class of sear but not occupied seat
// Add a class of selected then and call updateSelectedCount to make the calculations

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');   // putting seats into a Node list


  // TODO
  // Copy selected seats into array
  // Map through array
  // Return a new array indexes

  // spread array => to convert Node list into a regular array
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Movie select event (change event)
movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;
  saveMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
})


// Seat click event - Change class of one selected seat to .selected
container.addEventListener('click', (e) => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')
    ) {
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});
