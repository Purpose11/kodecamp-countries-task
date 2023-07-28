let data;
document.addEventListener('DOMContentLoaded', function () {
  // Get the URL parameters
  const params = new URLSearchParams(window.location.search);
  const countryName = params.get('country');
  fetch('https://restcountries.com/v3.1/all')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((responseData) => {
      data = responseData;
      console.log(data)

      const countryDetails = data.find(
        (country) => country.name.common === countryName
      );
     const countryInfoContainer = document.querySelector('.country-details-container');
      if (countryDetails) {
        // Update the content in the country-info div with country details
        const countryInfo = document.createElement('div');
        countryInfo.className = 'country-information'
        countryInfo.innerHTML = `
            <div class='imageDiv'>
             <img src='${countryDetails.flags.png}' alt='Country-flag'>  
            </div>
          <div class='country-details'>
            <div class='details1'>
                <h2>${countryDetails.name.common}</h2>
                <p>Native name: ${getNativeName(countryDetails.name.nativeName)}</p>
                <p>Population: ${countryDetails.population.toLocaleString()}</p>
                <p>Region: ${countryDetails.region}</p>
                <P> Sub Region: ${countryDetails.subregion}<p>
                <p>Capital: ${countryDetails.capital}</p>
            </div>
            <div class='details2'>
                <p>Top Level Domain: ${countryDetails.tld[0]}</p>
                <p>Currencies: ${getCurrenciesString(countryDetails.currencies)}</p>
                <p>Languages: ${getLanguagesString(countryDetails.languages)}</p>
            </div>
            ${countryDetails.borders? `<div class='border'> <p> Border Countries</p>: ${countryDetails.borders.join(', ')}</div>` : ''} 
          </div>
        `;
        countryInfoContainer.appendChild(countryInfo); 
      }
      
      else {
        // Handle the case when countryDetails is not found
        const notFoundMessage = document.createElement('p');
        notFoundMessage.textContent = 'Country details not found';
        countryInfoContainer.appendChild(notFoundMessage);
      }
    })
    .catch((error) => {
      console.error('Fetch error:', error);
    });

    const modeDiv = document.querySelector('.mode');
    const body = document.body;
     let darkMode = false;

     modeDiv.addEventListener('click', function () {
        darkMode = !darkMode; // Toggle darkMode state
        updateDarkMode();
      });

      function updateDarkMode() {
        if (darkMode) {
          body.classList.add('dark-mode');
           modeDiv.innerHTML = `
           <i class="fa-regular fa-moon"></i>
            <p>Light Mode</p>
           `
        } else {
          body.classList.remove('dark-mode');
          modeDiv.innerHTML = `
          <i class="fa-regular fa-moon"></i>
            <p>Dark mode</p>
          `
        }
      }
});

function getNativeName(nativeNames) {
    for (const key in nativeNames) {
      return nativeNames[key].common;
    }
    return ''; // Return an empty string if there are no native names
  }

  function getLanguagesString(languages) {
    let languagesString = '';
    for (const key in languages) {
      if (languagesString !== '') {
        languagesString += ', ';
      }
      languagesString += languages[key];
    }
    return languagesString;
  }

  function getCurrenciesString(currencies) {
    let currenciesString = '';
    for (const key in currencies) {
      if (currenciesString !== '') {
        currenciesString += ', ';
      }
      currenciesString += currencies[key].name;
    }
    return currenciesString;
  }

  const backToHomeBtn = document.querySelector('.back-div')
  backToHomeBtn.addEventListener('click', () => {
    window.location.href = 'index.html'
  })