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
const apiInput = document.querySelector("#apiInput");
const submitApiButton = document.querySelector("#submitApiButton");
const mainContent = document.querySelector("#mainContent");
const apiKeyInputDiv = document.querySelector("#apiKeyInputDiv");
const wrongApikeyMessage = document.querySelector("#wrongApikeyMessage");
 
function getTheme() {
  return localStorage.getItem("theme") || "default";
}
function getDemo() {
  return localStorage.getItem('demo') || "true";
}
function getApikey() {
  return localStorage.getItem("api_key");
}
function setTheme(theme) {
  localStorage.setItem("theme",theme);
}
function setDemo(demo) {
  localStorage.setItem('demo', demo);
}
function setApikey(api_key) {
  localStorage.setItem("api_key", api_key);
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
function showDropDown() {
  dropdownBar.classList.remove("hidden");
    dropdownBar.classList.add("absolute", "right-2");
}
function hideThemeOptionsDiv() {
  themeOptionsDiv.classList.add("hidden");
}
function showThemeOptionDiv() {
  themeOptionsDiv.classList.remove("hidden");
}
function hideApiKeyInputDiv() {
  apiKeyInputDiv.classList.add("hidden");
}
function showapiKeyInputDiv() {
  apiKeyInputDiv.classList.remove("hidden");
}


function keyPress(event) {
  if (event.key === "Escape") {
    hidemodal();
    hideThemeOptionsDiv()
    hideDropDown()
  }
}



async function fetchData() {
  const demo = getDemo()
  let url = "";
  if (demo == "true") {
    url = "mock/data/search.json";
  } else {
    url = "https://api.humorapi.com/memes/search?number=20&keywords=rocket";
  }

  const myHeaders = new Headers();
  myHeaders.append("x-api-key", getApikey());
    
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };
    
  const res = await fetch(url, requestOptions);
  const data = await res.json();

  const memesFeed = document.querySelector("#memesFeed");

  // data.memes.forEach(item => {
  //   const imgDiv = document.createElement("div");
  //   // imgDiv.className.add("relative");
  //   imgDiv.innerHTML = `
  //         <img
  //           class="p-2"
  //           src="${item.url}"
  //           alt="${item.description}"
  //         />`
  //   memesFeed.append(imgDiv);
  // })
  
  
}


async function verifyApiKey(api_key) {
  const url = "https://api.humorapi.com/memes/search";

  const myHeaders = new Headers();
  myHeaders.append("x-api-key", api_key);
    
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };

  try {
    const res = await fetch(url, requestOptions);
    if (!res.ok) {
      const data = await res.json();
      const errorMessage = data.message
      wrongApikeyMessage.classList.remove("hidden");
      wrongApikeyMessage.textContent = errorMessage;
    } else {
      wrongApikeyMessage.classList.add("hidden");
      wrongApikeyMessage.textContent = "";
      setApikey(apikey);
      hidemodal();
      hideApiKeyInputDiv()
      fetchData();

    }
  } catch (error) {
    console.error("Network Error", error);
  }
}


function checkApiKey() {
  const api_key = getApikey();
  if (api_key) {
    hideApiKeyInputDiv()
    fetchData();
  } else {
    showapiKeyInputDiv();
    setApiKeyButton.addEventListener("click", showmodal)
    modalCross.addEventListener("click", hidemodal);
    submitApiButton.addEventListener("click", () => {
      const apikey = apiInput.value; 
      verifyApiKey(apikey);
    })
  }
}



function randerTheme() {
  const currentTheme = UrlOperations("theme");
  container.className = "";
  container.classList.add(`theme-${currentTheme}`)
  themeButtonText.textContent = formatButtonText(currentTheme);
}

function showThemeList() {
  themes.map((theme) => {
    const ThemeButtonDiv = document.createElement("div");
    ThemeButtonDiv.innerHTML = `<button id="themeButton" class="w-full text-start px-3 py-1 rounded-md font-mono text-base hover:bg-[#1d232a] hover:rounded-md hover:ring-1">${theme}</button>`

    const selectedTheme = ThemeButtonDiv.querySelector("#themeButton");
    selectedTheme.addEventListener("click", () => {

      const parsedUrl = new URL(window.location.href);
      parsedUrl.searchParams.set("theme", theme.toLowerCase())
      window.history.replaceState({}, '', parsedUrl);

      UrlOperations()
      randerTheme()
      hideThemeOptionsDiv()      
   })
    themeOptionsDiv.append(ThemeButtonDiv);
  }) 
}

function UrlOperations(param) {
  const parsedUrl = new URL(window.location.href);
  const params = {
    theme: parsedUrl.searchParams.get("theme") ?? getTheme(),
    demo: parsedUrl.searchParams.get("demo") ?? getDemo(),
  }
  // Theme URL
  parsedUrl.searchParams.set("theme", params.theme);
  // demo url
  parsedUrl.searchParams.set("demo", params.demo);

  window.history.replaceState({}, '', parsedUrl);
  
  setTheme(params.theme);
  setDemo(params.demo);

  if (!param)
    return
  else
    return params[param]
}





function main() {
  UrlOperations()
  showThemeList()
  randerTheme()
  checkApiKey()
  
  document.addEventListener("keydown", (event) => {
    keyPress(event)
  })

  themeOptionsButton.addEventListener("click", () => {
    if (themeOptionsDiv.classList.contains("hidden")) {
      showThemeOptionDiv()
    } else {
      showThemeOptionDiv()
    }
  })

  dropdown.addEventListener("click", () => {
    if (dropdownBar.classList.contains("hidden")){
      showDropDown()
    } else {
      hideDropDown()
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
      inputError.classList.add("hidden");
      if (getApikey()) {
        showmodal();
      }
    }
  })


  

  


}

window.addEventListener("load", () => {
  



  main()
  // randerUrlTheme();
  // randerUrlDemo();
  // randerTheme();
  // renderThemeList();
  // randerContent();
  
})
