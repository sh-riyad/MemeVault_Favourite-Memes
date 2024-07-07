import './style.css'

const themes = ['Light', 'Dark', 'Cupcake', 'Bumblebee', 'emerald', 'corporate', 'synthwave', 'Retro', 'Cyberpunk', 'Valentine','Halkoween','Garden','Forest','Aqua','Lofi','Pastel']



const dropdown = document.querySelector("#dropdown");
const dropdownBar = document.querySelector("#dropdownBar");
const themeOptionsButton = document.querySelector("#themeOptionsButton");
const themeOptionsDiv = document.querySelector("#themeOptionsDiv");

// function renderThemeList() {
//   const ThemeButton = document.createElement("button");
//   themes.map((theme) => {
//     ThemeButton.innerText = theme;
//     ThemeButton.classList.add("px-3", "py-1", "rounded-md", "font-mono", "text-base", "hover:bg-red-500");
//     themeOptionsDiv.append(ThemeButton);
//   }) 
// }



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
  } else {
    themeOptionsDiv.classList.add("hidden");
  }
   
})

// renderThemeList()