const loadLocalResults = async () => {
    const ipData = await fetch(`https://ipwho.is/`);
    const ip = await ipData.json();
    const userCity = ip.city;
    document.location.replace(`/${userCity}`);
}

const urlArray = document.URL.split('/');

if(urlArray[urlArray.length-1] == ''){
    loadLocalResults();
}