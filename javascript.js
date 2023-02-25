const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
let cpt = 0
var city_name;


search.addEventListener('click', () => {
    cpt += 1; 
    console.log(cpt);
});

search.addEventListener('click', ()=>{

    const APIKey = 'ccc5c71f55c888e0d95f1294b0813ded';
    console.log(APIKey);

    var city = document.querySelector('.search-box input');

    if(city != null) {
        city_name = city.value;
    }
    else{
        city_name = null;
    }
    console.log(city);
    if (city_name === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {

        if(json.cod === '404'){
            container.style.height = '400px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            error404.style.display = 'block';
            error404.classList.add('fadeIn');
            return;
        }

        error404.style.display = 'none';
        error404.classList.remove('fadeIn');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        switch (json.weather[0].main){
            case 'Clear':
              image.src = 'img/clear.png';  
              break;

            case 'Rain':
                image.src = 'img/rain.png';  
                break;

            case 'Snow':
                image.src = 'img/snow.png';  
                break;

            case 'Clouds':
                image.src = 'img/clouds.png';  
                break;

            case 'Haze':
                image.src = 'img/haze.png';  
                break;
            default: 
                image.src = '';
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description} `;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        weatherBox.style.display = '';
        weatherDetails.style.display = ''; 
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '590px';

    });

});
