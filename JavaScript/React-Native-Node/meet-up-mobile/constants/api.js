export const fetchMeetups = () => 
    fetch('http://192.168.0.13:3000/api/meetups')
        .then(res => res.json())
        .catch(err => console.error(err));