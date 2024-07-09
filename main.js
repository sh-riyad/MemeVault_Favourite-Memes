import './style.css'

const themes = ['Default','Light', 'Dark', 'Cupcake', 'Bumblebee', 'emerald', 'corporate', 'synthwave', 'Retro', 'Cyberpunk', 'Valentine','Halkoween','Garden','Forest','Aqua','Lofi','Pastel']



const dropdown = document.querySelector("#dropdown");
const dropdownBar = document.querySelector("#dropdownBar");
const themeOptionsButton = document.querySelector("#themeOptionsButton");
const themeOptionsDiv = document.querySelector("#themeOptionsDiv");
const themeButtonText = document.querySelector("#themeButtonText");
const modal = document.querySelector("#modal");
const modalCross = document.querySelector("#modalCross");
const setApiKeyButton = document.querySelector("#setApiKeyButton");
const searchInput = document.querySelector("#search"); 
const container = document.querySelector("#container");

const apiKey = localStorage.getItem("api_key") || "none";




function randerUrl() {
  const parsedUrl = new URL(window.location.href);
  const paramTheme = parsedUrl.searchParams.get("theme");
  if (paramTheme) {
    localStorage.setItem("theme", paramTheme);
  }

  randerTheme();
  
}

// function randerUrl() {
//   // console.log(window.location);
//   // console.log(window.location.search);
//   const searchString = window.location.search;
//   const searchParams = new URLSearchParams(searchString);
//   // console.log(searchParams);
//   const theme = searchParams.get("theme");
//   if (theme) {
//     localStorage.setItem("theme", theme);
//   } else {
//     const theme = localStorage.getItem("theme") || "default";
//     searchParams.append("theme", theme);
//   }
//   randerTheme();

// }

function randerTheme() {
  const currentTheme = localStorage.getItem("theme") || "default";
  container.className = "";
  container.classList.add(`theme-${currentTheme.toLowerCase()}`)
  themeButtonText.textContent = formatButtonText(currentTheme);
  localStorage.setItem("theme", currentTheme);
}

function formatButtonText(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function showmodal() {
  modal.classList.remove("hidden");
}
function hidemodal() {
  modal.classList.add("hidden");
}
function hideDropDown() {
  dropdownBar.classList.add("hidden");
  dropdownBar.classList.remove("absolute", "right-2");
}
function hideThemeOptionsDiv() {
  themeOptionsDiv.classList.add("hidden");
}

function keyPress(event) {
  if (event.key === "Escape") {
    hidemodal();
    hideThemeOptionsDiv()
    hideDropDown()
  }
}

document.addEventListener("keydown", (event) => {
  keyPress(event)
})

searchInput.addEventListener("input", (event) => {
  const inputError = document.querySelector("#inputError");
  const input = event.target.value.trim();
  if (input.length == 0) {
    inputError.classList.add("hidden");
  } else if (input.length < 3) {
    inputError.classList.remove("hidden");
  } else {
    if (apiKey === "none") {
      inputError.classList.add("hidden");
      showmodal();
    }
  }
})


modalCross.addEventListener("click", hidemodal);

setApiKeyButton.addEventListener("click", showmodal)







function renderThemeList() {
  themes.map((theme) => {
    const ThemeButtonDiv = document.createElement("div");
    ThemeButtonDiv.innerHTML = `<button id="themeButton" class="w-full text-start px-3 py-1 rounded-md font-mono text-base hover:bg-[#1d232a] hover:rounded-md hover:ring-1">${theme}</button>`

    const selectedTheme = ThemeButtonDiv.querySelector("#themeButton");
    selectedTheme.addEventListener("click", () => {
      themeButtonText.textContent = formatButtonText(theme);
      localStorage.setItem("theme", theme);
      randerTheme()
      themeOptionsDiv.classList.add("hidden");
      
   })
    // ThemeButton.innerText = theme;
    // ThemeButton.classList.add("w-full", "text-start","px-3", "py-1", "rounded-md", "font-mono", "text-base", "hover:bg-red-500");
    themeOptionsDiv.append(ThemeButtonDiv);


  }) 
}



dropdown.addEventListener("click", () => {
  if (dropdownBar.classList.contains("hidden")){
    dropdownBar.classList.remove("hidden");
    dropdownBar.classList.add("absolute", "right-2");
    
  } else {
    dropdownBar.classList.add("hidden");
    dropdownBar.classList.remove("absolute", "right-2");

  }
})


themeOptionsButton.addEventListener("click", () => {
  if (themeOptionsDiv.classList.contains("hidden")) {
    themeOptionsDiv.classList.remove("hidden");
    // mainContent.classList.remove("relative");
  } else {
    themeOptionsDiv.classList.add("hidden");
    // mainContent.classList.add("relative");
  }
   
})

window.addEventListener("load", () => {
  randerUrl();
  randerTheme();
  renderThemeList()
})
