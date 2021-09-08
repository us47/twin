const subHeader = (num) => {
    return {
        'collection': 'Enter Call Details',
        'connected': `Connected to ${num}`,
        'connecting': `Connecting to ${num}`,
        'completed': 'Your last 5 call Details',
    }
}

export const BASE_API_URL = 'http://localhost:8080';

export const formatTime = (time) => {
    const d = new Date(time);
    return (d.getHours() > 12 ? d.getHours() - 12 : d.getHours()) + ':' + d.getMinutes() + ' ' + (d.getHours() >= 12 ? "PM" : "AM")
}

export default subHeader;