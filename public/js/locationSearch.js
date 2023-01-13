const searchFormHandler = async (event) => {
  event.preventDefault();

  const searchedName = document.querySelector('#name-search').value.trim();

  if (searchedName) {
    const response = await fetch(`/api/locations/names/${searchedName}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      alert('Location not found.');
    } else {
      
    }
  }
};

document
  .querySelector('.search-form')
  .addEventListener('submit', searchFormHandler);