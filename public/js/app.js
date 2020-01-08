console.log('Client side javascript is loaded.');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();     // To prevent refreshing of page otherwise data gets wiped out

    const searchURL = '/weather?address=' + search.value;
    message1.textContent = 'Loading...';
    message2.textContent = '';

    fetch(searchURL).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                // console.log(data.error);
                message1.textContent = data.error;
            } else {
                // console.log(data);
                message1.textContent = data.location;
                message2.textContent = data.forecast;
            }
        });    
    });
});

// fetch basics
// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     });
// });
// console.log('Location: ', data.timezone) directly acces any property as it is json