import './css/styles.css';
import { fetchCountries } from './js/api/fetchCountries';
import debounce from 'lodash.debounce';
import {
  clearSearchResults,
  fetchedCountriesHandler,
} from './js/utils/searchHelpers.js';
import {
  searchErrorHandler,
  noCountryFoundHandler,
} from './js/utils/searchHelpers.js';
import Notiflix from 'notiflix';

const bodyEl = document.querySelector('body');
bodyEl.classList.add('body');
const searchBoxEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

searchBoxEl.addEventListener('input', debounce(inputHandler, 500));

function inputHandler(event) {
  const searchQuery = event.target.value.trim();
  clearSearchResults(countryListEl, countryInfoEl);

  if (!searchQuery) {
    return;
  }

  fetchCountries(searchQuery)
    .then(countries => {
      if (countries) {
        fetchedCountriesHandler(countries, countryListEl, countryInfoEl);
      } else {
        Notiflix.Notify.failure(
          'Something went wrong, please try again later.'
        );
      }
    })
    .catch(error => {
      if (error === 'Oops, there is no country with that name') {
        noCountryFoundHandler();
      } else {
        searchErrorHandler();
      }
    });
}
