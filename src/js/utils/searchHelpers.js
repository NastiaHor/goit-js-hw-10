import Notiflix from 'notiflix';
export function countryListItemHandler(country) {
  return ` 
    <li class="country-item"> 
      <img src="${country.flags.svg}" alt="Flag" width="50" /> 
      <span class="country-name">${country.name.common}</span> 
    </li> 
  `;
}

export function countryInfoHandler(country) {
  const languages = Object.values(country.languages).join(', ');

  return ` 
    <div class="country-info__thumb country-item"> 
      <img src="${country.flags.svg}" alt="Flag" width="100" /> 
      <h2 class="country-name">${country.name.common}</h2> 
    </div> 
    <p class="country-info__label">Capital: <span class="country-info__text">${
      country.capital
    }</span></p> 
    <p class="country-info__label">Population: <span class="country-info__text">${country.population.toLocaleString()}</span></p> 
    <p class="country-info__label">Languages: <span class="country-info__text">${languages}</span></p> 
  `;
}

export function overflowMatchesHandler() {
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}

export function searchErrorHandler() {
  Notiflix.Notify.failure('Error fetching data. Please try again later.');
}

export function noCountryFoundHandler() {
  Notiflix.Notify.warning('Oops, there is no country with that name.');
}

export function renderCountryListHandler(countries, countryList) {
  countryList.innerHTML = '';
  countries.forEach(country => {
    const listItem = countryListItemHandler(country);
    countryList.insertAdjacentHTML('beforeend', listItem);
  });
}

export function renderCountryInfoHandler(country, countryInfo) {
  countryInfo.innerHTML = '';
  const countryData = countryInfoHandler(country);
  countryInfo.insertAdjacentHTML('beforeend', countryData);
}

export function clearSearchResults(countryList, countryInfo) {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}

export function fetchedCountriesHandler(countries, countryList, countryInfo) {
  if (countries.length > 10) {
    overflowMatchesHandler();
  } else if (countries.length > 1) {
    renderCountryListHandler(countries, countryList);
  } else if (countries.length === 1) {
    renderCountryInfoHandler(countries[0], countryInfo);
  } else {
    noCountryFoundHandler();
  }
}
