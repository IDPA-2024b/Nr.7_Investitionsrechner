import fs from 'fs';

const generateDataForLastYear = () => {
  const currentDate = new Date();
  const lastlastYearDate = new Date(currentDate.getFullYear() - 20, currentDate.getMonth(), currentDate.getDate());
  const data = [];
  let previousNumber = null;

  for (let date = new Date(lastlastYearDate); date <= currentDate; date.setDate(date.getDate() + 1)) {
    const formattedDate = date.toISOString().split('T')[0];
    let randomNumber;
    if (previousNumber !== null) {
      const min = Math.max(previousNumber * 0.9, 100);
      const max = Math.min(previousNumber * 1.1, 300);
      randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    } else {
      randomNumber = Math.floor(Math.random() * (300 - 100 + 1)) + 100;
    }
    previousNumber = randomNumber;
    data.push({ date: formattedDate, value: randomNumber });
  }


  // Add today's date
  const today = new Date();
  const formattedToday = today.toISOString().split('T')[0];
  data.push({ date: formattedToday, value: previousNumber });

  return data;
};

const lastYearData = generateDataForLastYear();

fs.writeFile("overalData.json", JSON.stringify(lastYearData, null, 2), (err) => {
  if (err) {
    console.error('Error writing JSON file:', err);
    return;
  }
  console.log('Data has been written to overallData.json in the MockData directory');
});
