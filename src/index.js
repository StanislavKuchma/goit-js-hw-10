import './css/styles.css';
import Notiflix from 'notiflix';

import { debounce } from 'lodash';
import fetchCountries  from './fetchCountries.js';

const DEBOUNCE_DELAY = 300;

const refs = {

    country: document.querySelector('input'),
    countryEl: document.querySelector('.country-list'),
    countryInfoEl: document.querySelector('.country-info'),
};
console.log(refs.countryEl);
console.log(refs.countryInfoEl);
    
let userCountry;
refs.country.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY ));


function onInputSearch(evt) {
    const userCountry = evt.target.value.trim();
  if (userCountry == "") {
    return;
  }
  
  fetchCountries(userCountry)
    .then(onFetchRequest)
    .catch(onFetchError);
}

function onFetchRequest(country) {

          refs.countryEl.innerHTML = "";
          refs.countryInfoEl.innerHTML = "";
          



        if (country.length > 10) {
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        }
        if (country.length >= 2 && country.length <=10) {


          const markupCountry = country
            .map(country => {
              return `
          <li>
          <span><img src="${country.flags.svg}" alt="flag"  width="30"  height="16" /></span>&nbsp&nbsp<span>${country.name.official}</span>
      
          </li>
          `;
            })
            .join('');    
     

            refs.countryEl.insertAdjacentHTML('afterbegin', markupCountry)
        }   
        if (country.length ===1) {
            console.log('yes')
              const markupCountry = country
            .map(country => {
              return `
            <li>
            <img src="${country.flags.svg}" alt="flag"  width="100"
                      height="80"/>
            <p>${country.name.official}</p>
            </li>
          `;
            })
            .join('');         

        const markupInfo = country
      .map(country => {
        return `
              <p><span>Capital</span>: ${country.capital}</p>
              <p><span>Population</span>: ${country.population}</p>
              <p><span>Languages</span>: ${Object.values(country.languages)}</p>
              `;
      })
      .join('');
          refs.countryEl.innerHTML = markupCountry;
          refs.countryInfoEl.innerHTML = markupInfo;
        }
   
}
  
function onFetchError() {

            refs.countryEl.innerHTML = "";
          refs.countryInfoEl.innerHTML = "";

    Notiflix.Notify.failure('Oops, there is no country with that name');
}
