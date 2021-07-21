const form = document.querySelector("#addDonuts");
const donutType = document.querySelector("#donutType")
const donutRating = document.querySelector("#donutRating")
const donutPrice = document.querySelector("#donutPrice")

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const fetchObj = {
        type:donutType.value,
        price:donutPrice.value,
        rating:donutRating.value
    }
    fetch("/api/donuts",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(fetchObj)
    }).then(res=>res.json()).then(data=>{
        alert("yay!!!!!")
        location.href = "/"
    })
    console.log(fetchObj);
})