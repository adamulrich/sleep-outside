import {
    getLocalStorage,
    setLocalStorage,
} from './utils.mjs';

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
        this.category = alert.category;
        
    }
    async saveToLocalStorage(){
        let alertJson = getLocalStorage('alerts');
        if(alertJson != null){
            alertJson.push({message:this.message, background:this.background, color: this.color, category: this.category});
        }
        else{
            alertJson = [{message:this.message, background:this.background, color: this.color, category: this.category}];
        }
        setLocalStorage('alerts', alertJson);
    }
}

async function getData(path) {
    return fetch(path)
        .then(convertToJson)
        .then((data) => data);
}


export async function displayAlerts(category = '') {

    //get alert json
    const path = `../json/alerts.json`;
    const alertJson = await getData(path);

    // create an alert object for each item in the json, add them to an array
    const alerts = [];
    alertJson.forEach(element => {
        const tempAlert = new Alert(element);
        if(category != '' && category == tempAlert.category){
            alerts.push(tempAlert)
        }
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


export function displayCategoryAlerts(category = '') {

    let alertJson = getLocalStorage('alerts');
    // get the section for alerts
    const alertSection = document.querySelector('.alert-list');
    alertSection.innerHTML = '';

    
    // create an alert object for each item in the json, add them to an array
    const alerts = [];
    if (alertJson != null) {
        alertJson.forEach(element => {
            const tempAlert = new Alert(element);
            if (category != '' && category == tempAlert.category) {
                alerts.push(tempAlert)
            }
        });

        // walk the array, create each alert in the alert-list section
        for (let i = 0; i < alerts.length; i++) {
            const alert = document.createElement('p');
            alert.innerText = alerts[i].message;
            alert.style.backgroundColor = alerts[i].background;
            alert.style.color = alerts[i].color;
            alertSection.appendChild(alert)
        }
    }
}

export function removeAlerts(category = '') {

    let alertJson = getLocalStorage('alerts');
    let newAlertJson = [];
    if (alertJson != null) {
        alertJson.forEach(alert => {
            if (alert.category != category) {
                newAlertJson.push(alert)
            }
        });
    }
    setLocalStorage('alerts', newAlertJson);
}

displayAlerts();
