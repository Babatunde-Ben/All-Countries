console.log("check");
let url;
let titleMessage;
let region;
const mainContainer = document.querySelector(".countries");
const title = document.querySelector(".title");
const options = document.querySelectorAll(".options");
const option = document.querySelectorAll(".options .option");
const dropdown = document.querySelector(".dropdown");

// initiate dropdown menu
dropdown.addEventListener("click", () => {
  console.log("dropdown selected");
  dropdown.classList.toggle("active");
});

option.forEach((option) => {
  option.addEventListener("click", (e) => {
    console.log(e.target.textContent);
  });
});

title.addEventListener("click", () => {
  console.log(`title has been clicked`);
  url = "https://restcountries.com/v2/all";
  byRegion(url, "america", "clicker");
});
window.addEventListener("DOMContentLoaded", () => {
  url = "https://restcountries.com/v2/all";
  generateCountries(url, "list of all countries");
});

function byRegion(url, region, titleMessage) {
  url = `https://restcountries.com/v2/region/${region}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const countryNameArray = data.map((item) => {
        return `<div class="country">
        <p>${item.name}</p>
        <a href="#">see more details</a>
      </div>`;
      });
      mainContainer.innerHTML = countryNameArray;
    })
    .catch((err) => {
      console.log(err);
      console.log(err.message);
    });

  title.innerHTML = titleMessage;
}

function generateCountries(url, titleMessage) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const countryNameArray = data.map((item) => {
        return `<div class="country">
        <p>${item.name}</p>
        <a href="#">see more details</a>
      </div>`;
      });
      mainContainer.innerHTML = countryNameArray;
    })
    .catch((err) => {
      console.log(err);
      console.log(err.message);
    });

  title.innerHTML = titleMessage;
}
