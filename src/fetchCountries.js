export function fetchCountries(countryName) {
  return fetch(
    `https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages`
  ).then(r => {
    if (!r.ok) {
      throw Error('Error 404');
    }
    return r.json();
  });
}
