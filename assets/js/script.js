// DECLARANDO VARIAVEIS
const apiKey = "bc89fdc40e493bc6b9850a232ed906f0";
const apiCountryURL = "https://flagcdn.com/16x12/za.png";

const cityInput = document.querySelector("#city-input");
const btnSearch = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const countryElement = document.querySelector("#country");
const windElement = document.querySelector("#wind span");
const humidityElement = document.querySelector("#humidity span");
const weatherIconElement = document.querySelector("#weather-icon");

const weatherContainer = document.querySelector("#weather-data");

const messageError = document.querySelector("#messageError");
const loader = document.querySelector("#loader");

// FUNÇÕES


const toggleLoader = () => {
    hideInformation();
    loader.classList.toggle("hide")

}

const showMessageError = () => {
    messageError.classList.remove("hide");
};

const hideInformation = () => {
    weatherContainer.classList.add("hide");
    messageError.classList.add("hide");
}

const getWeatherData = async (city) => {

    toggleLoader();

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    toggleLoader();

    return data;
};


const returnLowerCase = (data) => {
    try {
        let lowerCase = data.sys.country.toLowerCase();
        return lowerCase;
    }
    catch (error) {
        console.log('Bandeira não encontrada');
    }

}

const showWeatherData = async (city) => {
    const data = await getWeatherData(city);
    let country = returnLowerCase(data);

    hideInformation();

    if(data.cod === "404"){
        showMessageError();
        return;
    }

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    );
    countryElement.setAttribute(
        "src",
        `https://flagcdn.com/w20/${country}.png`
    );
    windElement.innerText = `${data.wind.speed}km/h`;
    humidityElement.innerText = `${data.main.humidity}%`;


    weatherContainer.classList.remove('hide');

    console.log(data)

};

// EVENTOS

btnSearch.addEventListener("click", (e) => {

    e.preventDefault();

    const city = cityInput.value;

    showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
    if(e.code === "Enter") {
        const city = e.target.value;

        showWeatherData(city);
    };
});

