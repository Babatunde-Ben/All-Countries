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

// functionality for searching countries

// if search input is empty

searchBoxInput.addEventListener("keyup", () => {
  const value = searchBoxInput.value;

  if (value.length == 0) {
    console.log(`is empty`);
    url = "https://restcountries.com/v2/all";
    generateCountries(url, "list of all countries");
  }

  url = `https://restcountries.com/v2/name/${value}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const countryNameArray = data.map((item) => {
        return `<div class="country">
    <p>${item.name}</p>
    <a href="#">see more details</a>
  </div>`;
      });
      if (data.status == "404") {
        mainContainer.innerHTML = `<div class="error">...no results found</div>`;
      } else {
        mainContainer.innerHTML = countryNameArray.join("");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

// initiate dropdown menu
dropdown.addEventListener("click", () => {
  dropdown.classList.toggle("active");
});

// functionality for filtering countries container by region

option.forEach((item) => {
  item.addEventListener("click", (e) => {
    if (e.target.textContent == "All") {
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
        return `<div class="country">
        <p>${item.name}</p>
        <a href="/more_info.html?country=${item.name}">see more details</a>
      </div>`;
      });
      mainContainer.innerHTML = countryNameArray.join("");
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
        return `<div class="country">
        <p>${item.name}, </p>
        <a href="/more_info.html?country=${item.name}">see more details</a>
      </div>`;
      });
      mainContainer.innerHTML = countryNameArray.join("");
    })
    .catch((err) => {
      console.log(err);
    });

  title.innerHTML = titleMessage;
}
