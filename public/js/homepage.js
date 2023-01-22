const loadWithIPData = async () => {
    const ipData = await fetch("https://ipwho.is/");
    const ip = await ipData.json();
    
    const userIP = ip.ip;
    alert(userIP);
}

loadWithIPData();