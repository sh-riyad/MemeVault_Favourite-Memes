import './style.css'

const themes = ['Light', 'Dark', 'Cupcake', 'Bumblebee', 'emerald', 'corporate', 'synthwave', 'Retro', 'Cyberpunk', 'Valentine','Halkoween','Garden','Forest','Aqua','Lofi','Pastel']



const dropdown = document.querySelector("#dropdown");
const dropdownBar = document.querySelector("#dropdownBar");
const themeOptionsButton = document.querySelector("#themeOptionsButton");
const themeOptionsDiv = document.querySelector("#themeOptionsDiv");
const themeButtonText = document.querySelector("#themeButtonText");
const modal = document.querySelector("#modal");
const modalCross = document.querySelector("#modalCross");
const setApiKeyButton = document.querySelector("#setApiKeyButton");
const mainContent = document.querySelector("#mainContent");
const searchInput = document.querySelector("#search"); 

const apiKey = localStorage.getItem("api_key") || "none";

function showmodal() {
  modal.classList.remove("hidden");
}
function hidemodal() {
  modal.classList.add("hidden");
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    modal.classList.add("hidden");

    themeOptionsDiv.classList.add("hidden");

    dropdownBar.classList.add("hidden");
  dropdownBar.classList.remove("absolute", "right-2");
  }
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
      themeButtonText.textContent = theme;
      localStorage.setItem("theme", theme);
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

renderThemeList()