const searchInput = document.getElementById('search-input')
const countriesContainer = document.querySelector('.countries-container')
const dropdownMenu = document.getElementById('dropdown-menu');
let data

//fetching countries data from Api
fetch('https://restcountries.com/v3.1/all')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); 
  })
  .then((responseData) => {
        data = responseData; 
     // Sort the data array in alphabetical order based on country name
     data.sort((a, b) => {
        const countryA = a.name.common.toUpperCase();
        const countryB = b.name.common.toUpperCase();
        return countryA.localeCompare(countryB);
      });

    createRegionDropdown(data)
    displayCountries(data)
   
  })
  .catch((error) => {
    console.error('Fetch error:', error);
  });

  

  function displayCountries (data) {

         countriesContainer.innerHTML = ''; 
        //looping through each country data
        data.forEach((country) => {
            //dynamially creating div for each country data
            const countryDiv = document.createElement('div')
            countryDiv.className = 'country-container'

                countryDiv.addEventListener('click', function (){
                    const countryName = country.name.common
                    window.location.href = `country-details.html?country=${encodeURIComponent(
                        countryName
                      )}`; 
                })
            const countryInfo = document.createElement('div')
            countryInfo.className = 'country-info'
            
            //display each country information
            const countryImage = document.createElement('img')
            countryImage.src = country.flags.png

            const countryName = document.createElement('h2')
            countryName.innerText = country.name.common

            const countryPopulation = document.createElement('p')
            countryPopulation.innerText = `Population: ${country.population.toLocaleString()}`

            const countryRegion = document.createElement('p')
            countryRegion.innerText = `Region: ${country.region}`

            const countryCapital  = document.createElement('p')
            countryCapital.innerText = `Capital: ${country.capital}`

            countryDiv.appendChild(countryImage)
            countryInfo.appendChild(countryName)
            countryInfo.appendChild(countryPopulation)
            countryInfo.appendChild(countryRegion)
            countryInfo.appendChild(countryCapital)

            countriesContainer.appendChild(countryDiv)
            countryDiv.appendChild(countryInfo)
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
              dropdownMenu.style.backgroundColor = '#202c37'
               modeDiv.innerHTML = `
               <i class="fa-regular fa-moon"></i>
                <p>Light Mode</p>
               `
            } else {
              body.classList.remove('dark-mode');
              dropdownMenu.style.backgroundColor = 'white'
              modeDiv.innerHTML = `
              <i class="fa-regular fa-moon"></i>
                <p>Dark mode</p>
              `
            }
          }
  }

  searchInput.addEventListener('input', getCountryByName)
    //filter country by name
        function getCountryByName (event) {
            const searchQuery = event.target.value.toLowerCase()
            const filteredCountries = data.filter( (country) => {
            return  country.name.common.toLowerCase().includes(searchQuery)
        })
                countriesContainer.innerHTML = ''

                displayCountries(filteredCountries)
        }

        document.addEventListener('DOMContentLoaded', function () {
            const filterBtn = document.getElementById('filter-btn');          
            filterBtn.addEventListener('click', function () {
              // Toggle the 'show-dropdown' class to show/hide the dropdown menu
              dropdownMenu.classList.toggle('show-dropdown');
            });
          
            // Close the dropdown if the user clicks outside of it
            document.addEventListener('click', function (event) {
              if (!event.target.closest('.filter')) {
                dropdownMenu.classList.remove('show-dropdown');
              }
            });

            const resetBtn = document.getElementById('reset-btn');
            resetBtn.addEventListener('click', function () {
                displayCountries(data);
                resetBtn.style.display = 'none'; // Hide the reset button when clicked
            });
          });
          
     

          
          function createRegionDropdown(data) {
            const regions = [...new Set(data.map((country) => country.region))];      
            regions.forEach((region) => {
              const regionElement = document.createElement('p');
              regionElement.textContent = region;
          
              regionElement.addEventListener('click', function () {
                // Filter countries by the selected region
                const filteredCountries = data.filter(
                  (country) => country.region === region
                );
                displayCountries(filteredCountries);

                const resetBtn = document.getElementById('reset-btn');
                resetBtn.style.display = 'flex';

              });
          
              dropdownMenu.appendChild(regionElement);
            });
          }
        
         
    
