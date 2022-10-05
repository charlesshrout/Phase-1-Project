const strainImage = document.querySelector("#strain-image");
const strainName = document.querySelector("#strain-name");
const strainDescription = document.querySelector("#strain-description");
const strainPrice = document.querySelector("#strain-price");
const numberInCart = document.querySelector("#strain-in-cart");
const menu = document.getElementById("strain-items")
let currentStrain;

const fetchReq1 = fetch ("http://localhost:3000/data")
.then(res => res.json())


const fetchReq2 = fetch("https://api.otreeba.com/v1/strains?count=5")
.then(response => response.json())

const allData = Promise.all([fetchReq1, fetchReq2])

const newData = []

function sliceData(allData){
    newData.push(allData.slice(0))
}
console.log(newData)

function buildMenu(strainObj){
    const span = document.createElement('span')
    span.addEventListener('click', () => strainAPI(strainObj),
   strainDetails(localObj) )
    span.textContent = strainObj.name
    menu.append(span)
}

function strainAPI(strainObj) {
    strainName.textContent = strainObj.name;
}

function strainDetails(localObj){
    strainImage.src = localObj.image
    strainDescription.textContent = localObj.lineage.value
    strainPrice.textContent = `$${(localObj.price) + "per Oz"}`
    numberInCart.textContent = localObj.number_in_bag

}

function setupCart() {
    let addToCartForm = document.querySelector("#cart-form")
    addToCartForm.addEventListener('submit', (event) => {
        event.preventDefault();
        currentDish.number_in_bag += parseInt(event.target["cart-amount"].value);
        strainDish(currentDish);
        addToCartForm.reset();
    });
}
