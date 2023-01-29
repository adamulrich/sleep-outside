function convertToJson(res) {
    if (res.ok) {
        return res.json();
    } else {
        throw new Error('Bad Response');
    }
}

export default class Alert{
    constructor(alert){
        this.message = alert.message;
        this.background = alert.background;
        this.color = alert.color;
        
    }
}

async function getData(path) {
    return fetch(path)
        .then(convertToJson)
        .then((data) => data);
}


async function displayAlerts() {

    //get alert json
    const path = `../json/alerts.json`;
    const alertJson = await getData(path);

    // create an alert object for each item in the json, add them to an array
    const alerts = [];
    alertJson.forEach(element => {
        const tempAlert = new Alert(element);
        alerts.push(tempAlert)
    });

    // get the section for alerts
    const alertSection = document.querySelector('.alert-list');

    // walk the array, create each alert in the alert-list section
    
    for (let i = 0; i < alerts.length; i++) {
        const alert = document.createElement('p');
        alert.innerText = alerts[i].message;
        alert.style.backgroundColor = alerts[i].background;
        alert.style.color = alerts[i].color;
        alertSection.appendChild(alert)
    }
}

displayAlerts();
