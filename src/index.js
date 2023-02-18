import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const refs = {
  input: document.getElementById('search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener(
  'input',
  debounce(() => {
    if (refs.input.value === '') {
      markupReset();
      return;
    }
    markupReset();
    let country = refs.input.value.trim();
    fetchCountries(country)
      .then(renderCountryMarkup)
      .catch(error =>
        Notiflix.Notify.failure('Oops, there is no country with that name')
      );
  }, DEBOUNCE_DELAY)
);

function renderCountryMarkup(arr) {
  if (arr.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (arr.length > 2 && arr.length < 10) {
    let markup = '';
    arr.map(item => {
      return (markup += `<li style="display: flex; gap: 15px; margin-bottom: 5px; font-weight: 500" ><img class="img_country" src="${item.flags.svg}" alt='${item.name.official}' width='30' height='25'></img>${item.name.official}</li>`);
    });
    refs.countryList.innerHTML = markup;
  } else if (arr.length === 1) {
    const countryNameMarkup = `<li style="display: flex; align-items: center; gap: 10px; margin-bottom: 5px; font-weight: 700; font-size: 30px" ><img src="${arr[0].flags.svg}" width="30" height="25"></img>${arr[0].name.official}</li>`;
    const countryInfoMarkup = `<p style="font-weight: 500;"><strong>Capital:</strong> ${
      arr[0].capital
    }</p><p style="font-weight: 500;"><strong>Population:</strong> ${
      arr[0].population
    }</p><p style="font-weight: 500;"><strong>Languages:</strong> ${Object.values(
      arr[0].languages
    )}</p>`;
    refs.countryList.innerHTML = countryNameMarkup;
    refs.countryInfo.innerHTML = countryInfoMarkup;
  }
}

function markupReset() {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
}

refs.input.setAttribute('style', 'margin-bottom: 0');
refs.countryList.setAttribute('style', 'list-style: none; padding-left: 0px');
