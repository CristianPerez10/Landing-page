const API =
	"https://alpha-vantage.p.rapidapi.com/query?interval=5min&function=TIME_SERIES_INTRADAY&symbol=MSFT&datatype=json&output_size=compact";

const options = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": "4518dcbdb3msh47dda9c1fc2c8cfp1c27d0jsnb0bc2e8b330f",
		"X-RapidAPI-Host": "alpha-vantage.p.rapidapi.com",
	},
};

const content = document.getElementById("content");

async function fetchData(urlApi) {
	const response = await fetch(urlApi, options);
	const data = await response.json();
	return data;
}

(async () => {
	try {
		const values = await fetchData(API);
		let template = `
            ${Object.keys(values["Time Series (5min)"])
				.map((key) => `
                    <div class="group relative">
                        <div class="mt-4 flex justify-between">
                            <h3 class="text-sm text-gray-700">
                                ${key}
                                <span aria-hidden="true" class="absolute inset-0">date ${key}</span>
                                ${JSON.stringify(values["Time Series (5min)"][key])}
                            </h3>
                        </div>
                    </div>`)
				.slice(0, 4)
				.join("")}
        `;
		content.innerHTML = template;
	} catch {}
})();
