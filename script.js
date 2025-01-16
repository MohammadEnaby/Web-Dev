// Select the container for cards
const CardsContainer = document.querySelector('.cards_container');
const NewGameButton = document.querySelector('.new_game_button'); // Select the new game button
const MatchesDisplay = document.querySelector('.match'); // Select the matches counter display
const MovesDisplay = document.querySelector('.move'); // Select the moves counter display

// Define an array with 15 colors
let colors = [
  'red',
  'blue',
  'green',
  'yellow',
  'purple',
  'orange',
  'pink',
  'brown',
  'black',
  'bisque',
  'gray',
  'cyan',
  'magenta',
  'lime',
  'indigo'
];

// Variables to manage game state
let firstCard = null;
let secondCard = null;
let isComparing = false;
let Moves = 0;
let Matches = 0;

// Function to initialize the game
function initializeGame() {
   // Make the cards container visible
  CardsContainer.style.display = 'grid';
  CardsContainer.innerHTML = ''; // Clear the existing cards

  // Reset counters
  Moves = 0;
  Matches = 0;

  // Update counter displays
  updateCounters();

  // Duplicate and shuffle the colors array
  const shuffledColors = [...colors, ...colors].sort(() => Math.random() - 0.5);

  // Create new card elements
  shuffledColors.forEach(color => {
      const card = document.createElement('div'); // Outer card container
      card.classList.add('card');

      const cardInner = document.createElement('div'); // Inner flipping container
      cardInner.classList.add('card_inner');

      const cardFront = document.createElement('div'); // Front of the card
      cardFront.classList.add('card_front');
      cardFront.style.setProperty('--card-color', color);

      const cardBack = document.createElement('div'); // Back of the card
      cardBack.classList.add('card_back');
      cardBack.innerHTML = '<img src="cardBack.png" alt="Card Back" class="Card">';

      // Assemble the card structure
      cardInner.appendChild(cardFront);
      cardInner.appendChild(cardBack);
      card.appendChild(cardInner);

      card.addEventListener('click', () => showCardColor(cardInner, color));

      // Append the card to the container
      CardsContainer.appendChild(card);
  });

  // Reset state variables
  firstCard = null;
  secondCard = null;
  isComparing = false;
}


// Function to show the card color when clicked
function showCardColor(cardInner, color) {
  if (isComparing || cardInner.classList.contains('flipped')) return; // Prevent clicks during comparison or on already flipped cards



  // Flip the card to reveal the front
  cardInner.classList.add('flipped');

  // Handle card selection
  if (!firstCard) {
      firstCard = { cardInner, color };
  } else {
      secondCard = { cardInner, color };
      isComparing = true;
      Moves++; // Increment the moves counter
      updateCounters();
      compareCards();
  }
}

// Function to compare the selected cards
function compareCards() {
  // Compare the colors of the selected cards
  if (firstCard.color === secondCard.color) {
    // Increment and update matches
    Matches++;
    updateCounters();

    // If the cards match, leave them flipped and reset selection
    setTimeout(() => {
      firstCard.cardInner.style.visibility = 'hidden'; // Hide the matched cards
      secondCard.cardInner.style.visibility = 'hidden';
      resetSelection();
    }, 500);

    // Check if the game is finished
    if (Matches === colors.length) {
      displayGameFinished();
    }
  } else {
    // If the cards don't match, flip them back
    setTimeout(() => {
      firstCard.cardInner.classList.remove('flipped'); // Flip back the first card
      secondCard.cardInner.classList.remove('flipped'); // Flip back the second card
      resetSelection();
    }, 500);
  }
}


// Function to reset the selection
function resetSelection() {
  firstCard = null;
  secondCard = null;
  isComparing = false;
}

// Function to update the counters on the page
function updateCounters() {
  MovesDisplay.textContent = `Moves: ${Moves}`;
  MatchesDisplay.textContent = `Matches: ${Matches}`;
}


// Function to display the game finished message as an alert
function displayGameFinished() {
  CardsContainer.innerHTML = ''; // Clear the cards

  CardsContainer.style.display = 'none';

  //wait until the cards disappear to show the alert
  setTimeout(() => {
    alert('you finished successfully with ' + Moves + ' moves\nkeep going!');
    initializeGame();
  }, 200);
  // Optionally reset the game automatically after the alert
}


// Event listener for the "New Game" button
NewGameButton.addEventListener('click', initializeGame);

// Initialize the game on page load
initializeGame();
