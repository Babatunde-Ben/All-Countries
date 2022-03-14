let url;
let titleMessage;
let region;
const mainContainer = document.querySelector(".countries");
const title = document.querySelector(".title");
const options = document.querySelectorAll(".options");
const option = document.querySelectorAll(".options .option");
const dropdown = document.querySelector(".dropdown");
const selectedInput = document.querySelector(".selected-dropdown");
const searchBoxInput = document.querySelector(".search-box input");
console.log(searchBoxInput);
console.log("name");

// initiate dropdown menu
dropdown.addEventListener("click", () => {
  dropdown.classList.toggle("active");
});

option.forEach((item) => {
  item.addEventListener("click", (e) => {
    if (e.target.textContent == "All") {
      console.log(`all is selected`);
      selectedInput.value = null;
      url = "https://restcountries.com/v2/all";
      generateCountries(url, "list of all countries");
    } else {
      selectedInput.value = e.target.textContent;
      region = e.target.textContent;
      url = `https://restcountries.com/v2/region/${region}`;
      titleMessage = `list of countries in ${region}`;

      byRegion(url, region, titleMessage);
    }
  });
});

window.addEventListener("DOMContentLoaded", () => {
  url = "https://restcountries.com/v2/all";
  generateCountries(url, "list of all countries");
});

function byRegion(url, region, titleMessage) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const countryNameArray = data.map((item) => {
        return `<div class="country" data-aos="zoom-out">
        <p>${item.name}</p>
        <a href="#">see more details</a>
      </div>`;
      });
      mainContainer.innerHTML = countryNameArray;
    })
    .catch((err) => {
      console.log(err);
    });

  title.innerHTML = titleMessage;
}

function generateCountries(url, titleMessage) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const countryNameArray = data.map((item) => {
        // console.log(item.region);
        return `<div class="country" data-aos="zoom-out">
        <p>${item.name}</p>
        <a href="#">see more details</a>
      </div>`;
      });
      mainContainer.innerHTML = countryNameArray;
    })
    .catch((err) => {
      console.log(err);
    });

  title.innerHTML = titleMessage;
}
