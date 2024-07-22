const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  const apiKey = process.env.API_KEY;
  const location = event.queryStringParameters.location;

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const forecastData = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(forecastData),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
