const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg")

for (let select of dropdowns) {
    for (currCode in countryList){
        let newoptn = document.createElement("option");
        newoptn.innerText = currCode ;
        newoptn.value = currCode ;
        if(select.name == "from" && currCode == "USD"){
            newoptn.selected = "selected";
        }else if(select.name == "to" && currCode == "INR"){
            newoptn.selected = "selected";
        }
        select.append(newoptn);
    }
    select.addEventListener("change" , (evt) => {
        updateFlag(evt.target);
    });
}

const updateExhangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if (amtval === "" || amtval < 1) {
        amtval = 1;
        amount.value = "1" ;
    }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    let finalAmount = amtval * rate ;
    msg.innerText = `${amtval} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countrycode = countryList[currCode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newsrc ;
}

btn.addEventListener("click" ,  (evt) => {
    evt.preventDefault();
    updateExhangeRate();
});

window.addEventListener("load", () => {
    updateExhangeRate();
})
