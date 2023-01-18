const createFormHandler = async (event) => {
    event.preventDefault();

    const location_name = document.querySelector('#location-title').value.trim();
    const description = document.querySelector('#location-description').value.trim();

    if (location_name && description) {
        const response = await fetch('/api/locations', {
            method: 'POST',
            body: JSON.stringify({ location_name, description }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to create location.');
        }
    }
};

document
    .querySelector('.location-create-form')
    .addEventListener('submit', createFormHandler);