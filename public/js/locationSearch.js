const searchFormHandler = async (event) => {
  event.preventDefault();

  const searchedName = document.querySelector('#name-search').value.trim();

  if (searchedName) {
    document.location.replace(`/locationSearch/${searchedName}`);
  }
};

document
  .querySelector('.search-form')
  .addEventListener('submit', searchFormHandler);