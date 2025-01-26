const dateElement = document.querySelector('.date');

// Format the date to "Month Day, Year"
const options = { year: 'numeric', month: 'long', day: 'numeric' };
const formattedDate = new Date().toLocaleDateString('en-US', options);

dateElement.textContent = formattedDate; // Update the span content
