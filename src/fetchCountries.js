export default function fetchCountries(userCountry) {

    return fetch(`https://restcountries.com/v3.1/name/${userCountry}/?fields=name,capital,population,flags,languages`)
        .then(response => {
      
            if (!response.ok) {
                throw new Error('Ответ сети был не ok.');
            }

            return response.json()

        });
}