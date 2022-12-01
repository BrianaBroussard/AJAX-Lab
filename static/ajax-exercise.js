'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  fetch("/fortune")
  .then((response) => response.text())
  .then((results) => {
    document.querySelector('#fortune-text').innerHTML = results;
});
}

document.querySelector('#get-fortune-button').addEventListener('click', showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  
  const zipcode = document.querySelector('#zipcode-field').value;

  const url = `/weather.json?zipcode=${zipcode}`; 

  fetch(url)
    .then((response) => response.json())
    .then((jsonData) => {
      document.querySelector('#weather-info').innerHTML = jsonData.forecast;
    });
}

document.querySelector('#weather-form').addEventListener('submit', showWeather);

// PART 3: ORDER MELONS

function updateMelons(results) {
  if (results.code === 'OK') {
    document.querySelector('#order-status').innerHTML = results.msg;
    document.querySelector('#order-status').classList.remove('order-error');
  } else {
    document.querySelector('#order-status').classList.add('order-error');
    document.querySelector('#order-status').innerHTML = results.msg;
  };
}

function orderMelons(evt) {
  evt.preventDefault();

  // TODO: show the result message after your form
  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)

  const formInputs = {
    melon_type: document.querySelector('#melon-type-field').value,
    qty: document.querySelector('#qty-field').value,
  };

  fetch('/order-melons.json', {
    method: 'POST',
    body: JSON.stringify(formInputs),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(updateMelons);
  };
    



document.querySelector('#order-form').addEventListener('submit', orderMelons);
