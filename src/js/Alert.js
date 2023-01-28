function convertToJson(res) {
    if (res.ok) {
        return res.json();
    } else {
        throw new Error('Bad Response');
    }
}

export default class Alert{
    constructor(alert){
        alert.message = message;
        alert.background = background;
        alert.color = color;
        this.path = `../json/alerts.json`;
    }
    getData() {
        return fetch(this.path)
            .then(convertToJson)
            .then((data) => data);
    }
    displayAlerts(){
        const alerts = this.getData();
        if (Object.entries(alerts).length != 0){
            const alertSection = document.createElement('section');
            alertSection.class = 'alert-list';
            document.body.appendChild(alertSection);
            for (let i = 0; i < alerts.length; i++){
                alert.message = alert[i].mesasage;
                alert.background = alert[i].backgrouind;
                alert.color = alert[i].color;
                alert = document.createElement('p');
                document.querySelector('.alert-list').appendChild(alert)
            }
        }
    }
}
