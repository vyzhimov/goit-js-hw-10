import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const refs = {
  input: document.getElementById('search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener(
  'input',
  debounce(() => {
    let country = refs.input.value.trim();
    fetchCountries(country);
  }, DEBOUNCE_DELAY)
);

function fetchCountries(countryName) {
  fetch(
    `https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages`
  )
    .then(r => r.json())
    .then(renderCountryMarkup);
}

function renderCountryMarkup(arr) {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
  if (arr.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (arr.length > 2 && arr.length < 10) {
    let markup = '';
    arr.map(item => {
      return (markup += `<li class="country_item"><img class="img_country" src="${item.flags.svg}" alt='${item.name.official}' width='25' height='20'></img>${item.name.official}</li>`);
    });
    refs.countryList.innerHTML = markup;
  } else {
    let countryNameMarkup = `<li>${arr[0].name.official}</li>`;
    let countryInfoMarkup = `<p>Capital: ${arr[0].capital}</p>Population: ${
      arr[0].population
    }</p></p>Languages: ${Object.values(arr[0].languages)}</p>`;
    refs.countryList.innerHTML = countryNameMarkup;
    refs.countryInfo.innerHTML = countryInfoMarkup;
  }
}
