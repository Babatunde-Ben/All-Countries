console.log("check");
let url;
let titleMessage;
let region;
const mainContainer = document.querySelector(".countries");
const title = document.querySelector(".title");
const options = document.querySelectorAll(".options");
const option = document.querySelectorAll(".options .option");
const dropdown = document.querySelector(".dropdown");
const selectedInput = document.querySelector(".selected-dropdown");

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
      console.log(`${e.target.textContent} is selected`);

      selectedInput.value = e.target.textContent;
      region = e.target.textContent;
      url = `https://restcountries.com/v2/region/${region}`;

      byRegion(url, region, titleMessage);
    }
  });
});

// title.addEventListener("click", () => {
//   console.log(`title has been clicked`);
//   // url = "https://restcountries.com/v2/all";
//   byRegion(url, "americas", "clicker");
// });
window.addEventListener("DOMContentLoaded", () => {
  url = "https://restcountries.com/v2/all";
  generateCountries(url, "list of all countries");
});

function byRegion(url, region, titleMessage) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(`search by ${region}`);
      const countryNameArray = data.map((item) => {
        // console.log(item.name);
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
        // console.log(item.region);
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
