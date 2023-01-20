const createFormHandler = async (event) => {
    event.preventDefault();

    const entered_city = document.querySelector('#location-city').value.trim();

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '13c637ce60mshb7acc9cf9348c96p13bb56jsn955b507e2a5e',
            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
    };

    const city_search_data = await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${entered_city}&countryIds=US`, options)
        .catch(err => {
            if (err.code == "ENTITY_NOT_FOUND") {
                alert('City not found; please re-enter');
            } else {
                alert('Database error.')
                console.log(err);
            };
        });

    const city_search_results = await city_search_data.json();

    console.log(city_search_results);

    const matched_city = city_search_results.data.find(city => city.name == entered_city);
    if (matched_city) {
        const location_name = document.querySelector('#location-title').value.trim();
        const description = document.querySelector('#location-description').value.trim();
        const city = city_search_results;

        if (location_name && description) {
            const response = await fetch('/api/locations', {
                method: 'POST',
                body: JSON.stringify({ location_name, city, description }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/');
            } else {
                alert('Failed to create location.');
            }
        }
    } else {
        alert('City not found; please re-enter');
    }
};

const cityUpload = (response) => {

}

document
    .querySelector('.location-create-form')
    .addEventListener('submit', createFormHandler);