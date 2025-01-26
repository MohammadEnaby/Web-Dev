const dateElement = document.querySelector('.date');

// Format the date to "Month Day, Year"
const options = { year: 'numeric', month: 'long', day: 'numeric' };
const formattedDate = new Date().toLocaleDateString('en-US', options);

dateElement.textContent = formattedDate; // Update the span content

const data = document.querySelector('.data');

// Event listener for the "Search by Specific Date" button
document.querySelector('.search_event_for_specific_date').addEventListener('click', async function () {
  const inputElement = document.querySelector('.search_event_for_specific_date_input');
  let date = inputElement.value;

  while (date === '') {
    // If input is empty, set it to a random date
    const randomMonth = Math.floor(Math.random() * 12) + 1;
    const randomDay = Math.floor(Math.random() * 28) + 1;
    date = `${randomMonth}/${randomDay}`;
    inputElement.value = date;
    data.textContent = `No date entered. Random date selected: ${date}\n`;
    //wait for 1 second
    await new Promise(r => setTimeout(r, 1500));
    getEventData(date);
    inputElement.value = '';

  }  if (isNaN(new Date(date).getTime())) {
    // Validate the date
    data.textContent = 'Please enter a valid date!';
  } else {
    // If valid, fetch event data
    getEventData(date);
  }
});

// Event listener for the "Search by Today's Date" button
document.querySelector('.search_event_for_today_date').addEventListener('click', async function () {
  const inputElement = document.querySelector('.search_event_for_specific_date_input');

  // Get the current date and format it as "month/day"
  const curDate = new Date();
  const month = curDate.getMonth() + 1;
  const day = curDate.getDate();
  const dateToday = `${month}/${day}`;

  // Update the input field and fetch events
  inputElement.value = dateToday;
  data.textContent = `Event set to current date: ${dateToday}\n`;
  await new Promise(r => setTimeout(r, 1500));

  getEventData(dateToday);
  inputElement.value = '';
});

// Function to get the data from the API
function getEventData(date) {
  fetch(`https://history.muffinlabs.com/date/${date}`)
    .then(response => response.json())
    .then(apiData => {
      const events = apiData.data.Events;
      if (events.length === 0) {
        data.innerHTML = `<p>No events found for this date.</p>`;
        return;
      }
      const event = events[Math.floor(Math.random() * events.length)];
      const year = event.year;
      const text = event.text;
      const html = `<p>In ${year}, ${text}</p>`;
      data.innerHTML = html;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      data.innerHTML = `<p>Error fetching events. Please try again later.</p>`;
    });
}
