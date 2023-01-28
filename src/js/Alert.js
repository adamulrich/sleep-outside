function convertToJson(res) {
    if (res.ok) {
        return res.json();
    } else {
        throw new Error('Bad Response');
    }
}

export default class Alert{
    constructor(alert){
        this.message = message;
        this.background = background;
        this.color = color;
        this.path = `../json/alerts.json`;
    }
    getData() {
        return fetch(this.path)
            .then(convertToJson)
            .then((data) => data);
    }
    
}