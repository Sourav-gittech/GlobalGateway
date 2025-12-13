export const fetchCountryDetails = async ({ queryKey }) => {
    const countryName = queryKey[1];

    const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
    const data = await response.json();
    const country = data[data.length - 1];

    // console.log(data);

    // console.log('Country details response', country);

    const currencyKey = Object.keys(country.currencies)[0];
    const currency = country.currencies[currencyKey];

    return {
        officialName: country.name.official,
        capital: country.capital?.[0] || "No capital",
        continents: country?.continents?.[0],
        latlng: country.latlng,
        area: country.area,
        population: country.population,
        flag: country.flags.png,
        languages: Object.values(country.languages),
        currency: {
            code: currencyKey,
            name: currency.name,
            symbol: currency.symbol
        }
    };
};