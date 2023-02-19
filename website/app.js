/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const Button = document.getElementById('generate');
// My API Key for OpenWeatherMap API
const apiKey = "&appid=dba465a0210b83c3935a985b6831d583&units=imperial";


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1) + '.' + d.getDate() + '.' + d.getFullYear();

/* Function to get data from user */
function userData() {
    const zip = document.getElementById('zip').value;
    const feel = document.getElementById('feelings').value;
    return {zip, feel};
}

/* Function to get temperature from website 'openweathermap' by API */ 
async function temperature(zip) {
    const res = await fetch(baseURL + zip + apiKey);
    const data = await res.json();
    const temp = data.main.temp;
    return temp;
}

/* Function to send data to local server */
async function postData(temp, feel, newDate) {
    await fetch('/postData', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({temp, feel, newDate})
    })
};

/* Funtion to get data from local server */
async function getData() {
    const req = await fetch('/getData');
    const data = await req.json();
    // Show data to user
    document.getElementById("date").innerHTML = ` Date Now Is: ${data.newDate}`;
    document.getElementById("temp").innerHTML = ` Temp Now Is: ${Math.round(data.temp)}`;
    document.getElementById("content").innerHTML = ` Your Feeling Is: ${data.feel}`;
}

/* Function called by click on the button */
Button.addEventListener("click", async () => {
    try {
        let {zip, feel} = userData();
        const temp =  await temperature(zip);
        await postData(temp, feel, newDate);
        await getData();
    } catch (error) {
        console.log(error);
    }
});
