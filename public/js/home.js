console.log("hello");
const divNut = document.querySelector("#donutDiv");

setTimeout(() => {
    divNut.innerHTML=""
  fetch("/api/donuts")
    .then(res => res.json())
    .then(data => {
      console.log(data);
      for (donut of data) {
        const newH6 = document.createElement("h3");
        newH6.textContent = `type: ${donut.type} rating: ${donut.rating} price: ${donut.price}`;
        const delButton = document.createElement(`button`);
        delButton.textContent = "delete!";
        delButton.setAttribute("class", "del-button");
        delButton.setAttribute("data-id", donut.id);
        newH6.append(delButton);
        divNut.append(newH6);
      }
    });
}, 2000);

document.addEventListener("click", () => {
  if (event.target.matches(".del-button")) {
    const idToDelete = event.target.dataset.id;
    fetch(`/api/donuts/${idToDelete}`, {
      method: "DELETE"
    }).then(res => {
      console.log("billy");
      location.reload();
    });
  }
});
