async function newFormHandler(event) {
    event.preventDefault();

    const review_title = document.querySelector('#review_title').value;
    const location_name = document.querySelector('#location_name').value;
    const review_description = document.querySelector('#review_description').value;

    const response = await fetch('/api/review', {
        method: 'POST', 
        body: JSON.stringify({
            review_title, 
            location_name, 
            review_description, 
        }), 
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert ('Failed to add review');
    }
}

document
    .querySelector('.new-review-form')
    .addEventListener('submit', newFormHandler);

