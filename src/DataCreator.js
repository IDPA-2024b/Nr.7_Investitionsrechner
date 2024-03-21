import fs from 'fs';

const generateDataForLastYear = () => {
  const currentDate = new Date();
  const lastYearDate = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate());
  const data = [];
  let previousNumber = null; // Initialize previous number variable
  
  // Loop through each day of the last year
  for (let date = new Date(lastYearDate); date <= currentDate; date.setDate(date.getDate() + 1)) {
    // Format date as YYYY-MM-DD
    const formattedDate = date.toISOString().split('T')[0];
    let randomNumber;
    if (previousNumber !== null) {
      // Calculate the range based on the previous number
      const min = Math.max(previousNumber * 0.9, 100); // Ensure the minimum is at least 100
      const max = Math.min(previousNumber * 1.1, 300); // Ensure the maximum is at most 300
      // Generate a random number within the adjusted range
      randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    } else {
      // Generate a random number between 100 and 300 for the first iteration
      randomNumber = Math.floor(Math.random() * (300 - 100 + 1)) + 100;
    }
    // Update the previous number for the next iteration
    previousNumber = randomNumber;
    // Add date and random number to data array
    data.push({ date: formattedDate, value: randomNumber });
  }
  
  return data;
};

// Generate data for last year
const lastYearData = generateDataForLastYear();

// Write data to JSON file
fs.writeFile('last_year_data.json', JSON.stringify(lastYearData, null, 2), (err) => {
  if (err) {
    console.error('Error writing JSON file:', err);
    return;
  }
  console.log('Data has been written to last_year_data.json');
});
