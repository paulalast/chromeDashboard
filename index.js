function getContrastColor(hexColor) {
	let r = parseInt(hexColor.slice(1, 3), 16)
	let g = parseInt(hexColor.slice(3, 5), 16)
	let b = parseInt(hexColor.slice(5, 7), 16)
	let brightness = (r * 299 + g * 587 + b * 114) / 1000
	return brightness > 155 ? "black" : "white"
}

fetch(
	"https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=dark-beige-aesthetic"
)
	.then(res => res.json())
	.then(data => {
		document.body.style.backgroundImage = `url(${data.urls.full})`
		let textColor = getContrastColor(data.color)
		document.body.style.color = textColor
		document.getElementById("author").textContent = `By: ${data.user.name}`
	})
	.catch(err => {
		document.body.style.backgroundImage = `url("https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODUzNTY2OTF8&ixlib=rb-4.0.3&q=80&w=1080")`
		document.getElementById("author").textContent = `By: Marita Kavelashvili`
	})
 

function getCurrentTime() {
	const date = new Date()
	document.getElementById("time").textContent = date.toLocaleTimeString(
		"pl-PL",
		{
			timeStyle: "short",
		}
	)
}

setInterval(getCurrentTime, 1000)

navigator.geolocation.getCurrentPosition(position => {
	const weatherIconMap = {
		"01d": "clear-d.png",
		"01n": "clear-n.png",
		"02d": "fewclouds-d.png",
		"02n": "fewclouds-d.png",
		"03d": "cloud.png",
		"03n": "cloud.png",
		"04d": "brokenclouds-d.png",
		"04n": "brokenclouds-d.png",
		"09d": "rain.png",
		"09n": "rain.png",
		"10d": "showerrain-d.png",
		"10n": "showerrain-d.png",
		"11d": "storm.png",
		"11n": "storm.png",
		"13d": "snow.png",
		"13n": "snow.png",
		"50d": "haze.png",
		"50n": "haze.png",
	}

	fetch(
		`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`
	)
		.then(res => {
			if (!res.ok) {
				throw Error("Weather data not available")
			}
			return res.json()
		})
		.then(data => {
			const weatherCode = data.weather[0].icon
			const iconURL = weatherIconMap[weatherCode]

			if (!iconURL) {
				console.warn(`No icon found for weather code: ${weatherCode}`)
				return
			}

			document.getElementById("weather").innerHTML = `
            <img class="weather-icon" src=${iconURL} />
            <p class="weather-temp">${Math.round(data.main.temp)}ºC</p>
            <p class="weather-city">${data.name}</p>
            `
		})
		.catch(err => console.error(err))
})

fetch("https://api.adviceslip.com/advice")
	.then(res => {
		if (!res.ok) {
			throw Error("Can't find anything today")
		}
		return res.json()
	})
	.then(data => {
		console.log(data.slip.advice)

		document.getElementById("randomUseless").textContent = data.slip.advice
	})
	.catch(err => console.error(err))

window.onload = function () {
	const input = document.querySelector("input")
	const storedValue = localStorage.getItem("inputValue")

	if (storedValue) {
		input.value = storedValue
	}

	input.addEventListener("input", function (event) {
		localStorage.setItem("inputValue", event.target.value)
	})
}
