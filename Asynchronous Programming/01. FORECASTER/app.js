function attachEvents() {
    const URLS = {
        WEATHER: "https://judgetests.firebaseio.com/locations.json"
    };

    const symbols = {
        sunny: "☀",
        partlySunny: "⛅",
        overcast: "☁",
        rain: "☂",
        degrees: "°"
    };

    const getWeatherButton = document.getElementById("submit");
    getWeatherButton.addEventListener("click", displayWeatherForecast);

    async function displayWeatherForecast() {
        const userLocation = document.querySelector("#location").value;

        try {
            const locationCode = await getLocationCode(userLocation);
            displayCurrentWeather(locationCode);
            displayUpcomingWeather(locationCode);
        } catch (error) {
            clearPastWeatherInfo();
            clearInputField();

            const threeDayForecastLabel = document.getElementsByClassName("label")[1];
            threeDayForecastLabel.style.display = "none";

            const forecastSection = document.getElementsByClassName("label")[0];
            forecastSection.textContent = "Error";

        }
        
    }

    const getLocationCode = (userLocation) => {
        const code = fetch(URLS.WEATHER)
            .then(handler)
            .then(locations => {
                const location = locations.find(l => l.name.toLowerCase() === userLocation.toLowerCase());

                if (location) {
                    return location.code;
                } else {
                    throwError();
                }
            });
            
        return code;
    };

    const displayCurrentWeather = (locationCode) => {
        fetch(`https://judgetests.firebaseio.com/forecast/today/${locationCode}.json`)
        .then(handler)
        .then(renderCurrentWeather)
        .catch(err => {
            //throwError();
        });
    };

    const renderCurrentWeather = (weatherInfo) => {
        clearPastWeatherInfo();
        document.getElementById("forecast").style.display = "block";

        //CURRENT WEATHER DIV

        const currentWeatherDiv = document.getElementById("current");

        const forecastsDiv = createHtmlElement("div", ["forecasts"]);

        const weatherSymbol = getWeatherSymbol(weatherInfo.forecast);
        const conditionSymbolSpan = createHtmlElement("span", ["condition", "symbol"], weatherSymbol);

        const conditionSpan = createConditionSpan(weatherInfo);

        forecastsDiv.appendChild(conditionSymbolSpan);
        forecastsDiv.appendChild(conditionSpan);
        currentWeatherDiv.appendChild(forecastsDiv);
    };

    const displayUpcomingWeather = (locationCode) => {
        fetch(`https://judgetests.firebaseio.com/forecast/upcoming/${locationCode}.json`)
        .then(handler)
        .then(renderUpcomingWeather);
    };

    const renderUpcomingWeather = (weatherInfo) => {
        const upcomingWeatherDiv = document.getElementById("upcoming");

        const upcomingWeatherSpan = getUpcomingForecastDiv(weatherInfo);
        upcomingWeatherDiv.appendChild(upcomingWeatherSpan);
        clearInputField();
    };

    const createHtmlElement = (tagName, classNames, textContent) => {
        const newElement = document.createElement(tagName);

        if (classNames) {
            if (Array.isArray(classNames)) {

                for (const className of classNames) {
                    newElement.classList.add(className);
                }

            } else {
                newElement.classList.add(classNames);
            }
        }

        if (textContent) {
            newElement.textContent = textContent;
        }

        return newElement;
    };

    const getWeatherSymbol = (forecast) => {
        let weatherSymbol = "";

        switch (forecast.condition) {
            case "Sunny":
                weatherSymbol = symbols.sunny;
                break;
        
            case "Partly sunny":
                weatherSymbol = symbols.partlySunny;
                break;

            case "Overcast":
                weatherSymbol = symbols.overcast;
                break;

            case "Rain":
                weatherSymbol = symbols.rain;
                break;
        }

        return weatherSymbol;
    };

    const createConditionSpan = (weatherInfo) => {
        const locationSpan = createHtmlElement("span", ["forecast-data"], weatherInfo.name);

        const degrees = `${weatherInfo.forecast.low}${symbols.degrees}/${weatherInfo.forecast.high}${symbols.degrees}`;
        const degreesSpan = createHtmlElement("span", ["forecast-data"], degrees);

        const typeOfWeatherSpan = createHtmlElement("span", ["forecast-data"], weatherInfo.forecast.condition);

        const conditionSpan = createHtmlElement("span", ["condition"]);
        conditionSpan.appendChild(locationSpan);
        conditionSpan.appendChild(degreesSpan);
        conditionSpan.appendChild(typeOfWeatherSpan);

        return conditionSpan;
    };

    const clearPastWeatherInfo = () => {
        const currentForecast = document.getElementsByClassName("forecasts")[0];
        const upcomingForecast = document.getElementsByClassName("forecast-info")[0];

        if (currentForecast && upcomingForecast) {
            currentForecast.parentNode.removeChild(currentForecast);
            upcomingForecast.parentNode.removeChild(upcomingForecast);
        }
    };

    const getUpcomingForecastDiv = (weatherInfo) => {
        const forecastInfoDiv = createHtmlElement("div", "forecast-info");

        for (let index = 0; index < weatherInfo.forecast.length; index++) {
            const forecast = weatherInfo.forecast[index];

            const upcomingSpan = createHtmlElement("span", ["upcoming"]);

            const symbol = getWeatherSymbol(forecast);
            const symbolSpan = createHtmlElement("span", "symbol", symbol);

            const highLowText = `${forecast.low}${symbols.degrees}/${forecast.high}${symbols.degrees}`;
            const highLowSpan = createHtmlElement("span", "forecast-data", highLowText);

            const conditionSpan = createHtmlElement("span", "forecast-data", forecast.condition);
            
            upcomingSpan.appendChild(symbolSpan);
            upcomingSpan.appendChild(highLowSpan);
            upcomingSpan.appendChild(conditionSpan);

            forecastInfoDiv.appendChild(upcomingSpan);
        }

        return forecastInfoDiv;
    };

    const clearInputField = () => {
        document.querySelector("#location").value = "";
    }
}

attachEvents();

const handler = (response) => {
    if (response.ok) {
        return response.json();
    }

    throwError();
};

const throwError = () => {
    throw new Error("Something went wrong!");
};