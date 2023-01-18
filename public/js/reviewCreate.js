const createFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#review-title').value.trim();
    const review = document.querySelector('#review-body').value.trim();

    const urlArray = document.URL.split('/');
    const locations_id = urlArray[urlArray.length - 1];

    if (title && review) {
        const response = await fetch('/api/reviews', {
            method: 'POST',
            body: JSON.stringify({ title, review, locations_id }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to create review.');
        }
    }
};

document
    .querySelector('.review-create-form')
    .addEventListener('submit', createFormHandler);