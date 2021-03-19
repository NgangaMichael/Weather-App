const form = document.querySelector("#searchForm")
const container = document.querySelector("#display")
const orderdList = document.querySelector("ul")
const city = document.querySelector(".name")
const con = document.querySelector(".con")
const description = document.querySelector(".description")
const temp = document.querySelector(".temp")
const iconElement = document.querySelector(".weather-icon");

form.addEventListener("submit", async(event)=>{
    try{
    event.preventDefault();
    const search = form.elements.query.value;
    const config = {params: {q: search}}
    const key = "2de10354bb813b6132c2e8afc00af566";
    const res = await axios.get("http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=" + key, config);
    
    city.textContent = res.data.city.name;
    con.textContent = res.data.city.country;
    description.textContent = res.data.list[0].weather[0].description;

    const displayTemp = Math.floor(res.data.list[0].main.temp - 273.15);
    const iconId = res.data.list[0].weather[0].icon;
    temp.innerHTML = `${displayTemp}<span> &degC </span>`;
    iconElement.innerHTML = `<img src= "icons/${iconId}.png"/>`;

    form.elements.query.value = "";
    }
    catch(err){
        container.textContent = "SORRY CITY NOT FOUND";
    }
});