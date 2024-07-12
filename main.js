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
const apiKeyInputDiv = document.querySelector("#apiKeyInputDiv");
const wrongApikeyMessage = document.querySelector("#wrongApikeyMessage");
const showImage = document.querySelector("#showImage");
const memesFeed = document.querySelector("#memesFeed");
const saveFavNameInput = document.querySelector("#saveFavNameInput");
const saveFevButton = document.querySelector("#saveFevButton");
const addToFavDiv = document.querySelector("#addToFavDiv");
const FavMemeList = document.querySelector("#FavMemeList");
const inputNameError = document.querySelector("#NameError");
const itemAlreadyExist = document.querySelector("#itemAlreadyExist");
const memesFeedContainer = document.querySelector("#memesFeedContainer");


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
function setFavouriteMemes(favouriteMemes) {
  localStorage.setItem("favouriteMemes", JSON.stringify(favouriteMemes))
}
function getfavouriteMemes() {
  return JSON.parse(localStorage.getItem("favouriteMemes")) ?? [];
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
function showMemesFeedContainer() {
  memesFeedContainer.classList.remove("hidden");
}
function hideMemesFeedContainer() {
  memesFeedContainer.classList.add("hidden");
}

function keyPress(event) {
  if (event.key === "Escape") {
    hidemodal();
    hideThemeOptionsDiv()
    hideDropDown()
    hideFullImage()
    hideAddToFavDiv()
  }
}
async function downloadImage(imageSrc) {
  const image = await fetch(imageSrc)
  const imageBlog = await image.blob()
  const imageURL = URL.createObjectURL(imageBlog)

  const link = document.createElement('a')
  link.href = imageURL
  link.download = imageSrc.split("/").pop();
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
function showFullImage(imageURL) {
  showImage.classList.remove("hidden");
  showImage.innerHTML = `
    <img src="${imageURL}">
  `
  memesFeed.classList.add("blur-sm", "brightness-20");
}
function hideFullImage() {
  showImage.classList.add("hidden");
  memesFeed.classList.remove("blur-sm", "brightness-20");
}
function showAddToFavDiv() {
  addToFavDiv.classList.remove("hidden");
  hideInputNameError();
  hideItemAlreadyExist();
}
function hideAddToFavDiv() {
  addToFavDiv.classList.add("hidden");
}
function hideInputNameError() {
  inputNameError.classList.add("hidden");
}
function showInputNameError() {
  inputNameError.classList.remove("hidden");
}
function showItemAlreadyExist() {
  itemAlreadyExist.classList.remove("hidden");
}
function hideItemAlreadyExist() {
  itemAlreadyExist.classList.add("hidden");
}
function saveToFavList(item) {
  showAddToFavDiv();
  const favouriteMemes = getfavouriteMemes()
  saveFevButton.addEventListener("click", () => {
    const InputName = saveFavNameInput.value
    if (InputName.length == 0) {
      showInputNameError();
    } else {
      hideInputNameError();
      let flag = true;
      favouriteMemes.map(memes => {
        if (memes.id == item.id) {
          flag = false;
        }
      })
      if (flag) {
        item.name = InputName;
        favouriteMemes.push(item);
        setFavouriteMemes(favouriteMemes)
        hideAddToFavDiv();
        showFavList()
      } else {
        showItemAlreadyExist();
      }
      
    }
  })
}
function showFavList() {
  const favouriteMemes = getfavouriteMemes()
  FavMemeList.innerHTML = "";
  favouriteMemes.map(item => {
    const memeItem = document.createElement("div");
    memeItem.innerHTML = `<button
              id = "favMeme"
              class="w-full px-4 py-1 hover:bg-customColor-button-hover hover:rounded-md hover:ring-1 text-start"
            >
              <div class="flex flex-row items-center gap-4">
                <img
                  class="w-10 h-10 rounded-md"
                  src="${item.url}"
                />
                <p class="text-wrap">${item.name}</p>
              </div>
            </button>`
    FavMemeList.append(memeItem)
    const favMeme = memeItem.querySelector("#favMeme");
    favMeme.addEventListener("click", () => {
      showFullImage(item.url);
    })
  })
}


async function fetchData(query = "programming") {
  const demo = getDemo()
  let url = "";
  if (demo == "true") {
    url = "mock/data/search.json";
  } else {
    url = `https://api.humorapi.com/memes/search?number=20&keywords=${query}`;
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

  
  showMemesFeedContainer();
  data.memes.forEach(item => {
    const imgDiv = document.createElement("div");
    imgDiv.innerHTML = `
          <div class="relative hover:scale-105">
                <button
                  id="saveToLocal"
                  class="absolute hidden w-10 h-10 right-4 top-3 rounded-full flex items-center justify-center bg-customColor-body hover:scale-105"
                >
                  <svg
                    class="w-8 h-8"
                    viewBox="0 0 24 24"
                    fill="000000"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M12 12V19M12 19L9.75 16.6667M12 19L14.25 16.6667M6.6 17.8333C4.61178 17.8333 3 16.1917 3 14.1667C3 12.498 4.09438 11.0897 5.59198 10.6457C5.65562 10.6268 5.7 10.5675 5.7 10.5C5.7 7.46243 8.11766 5 11.1 5C14.0823 5 16.5 7.46243 16.5 10.5C16.5 10.5582 16.5536 10.6014 16.6094 10.5887C16.8638 10.5306 17.1284 10.5 17.4 10.5C19.3882 10.5 21 12.1416 21 14.1667C21 16.1917 19.3882 17.8333 17.4 17.8333"
                        stroke="#464455"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </g>
                  </svg>
                </button>
                <button
                  id="saveToFev"
                  class="absolute hidden w-10 h-10 right-16 top-3 rounded-full flex items-center justify-center bg-customColor-body hover:scale-105"
                >
                  <svg
                    class="w-8 h-8"
                    viewBox="0 0 24 24"
                    fill="000000"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M6.75 6L7.5 5.25H16.5L17.25 6V19.3162L12 16.2051L6.75 19.3162V6ZM8.25 6.75V16.6838L12 14.4615L15.75 16.6838V6.75H8.25Z"
                        fill="#080341"
                      ></path>
                    </g>
                  </svg>
                </button>
                <img class="p-2" src=${item.url} alt=${item.description} />
              </div>`
    memesFeed.append(imgDiv);
    const saveToLocal = imgDiv.querySelector("#saveToLocal");
    const saveToFev = imgDiv.querySelector("#saveToFev");

    saveToLocal.addEventListener("click", () => {
      downloadImage(item.url);
    })
    saveToFev.addEventListener("click", () => {
      saveToFavList(item)
    })
    imgDiv.addEventListener("mouseover", () => {
      saveToLocal.classList.remove("hidden");
      saveToFev.classList.remove("hidden");
    })
    imgDiv.addEventListener("click", () => {
      showFullImage(item.url);
    })

    imgDiv.addEventListener("mouseout", () => {
      saveToLocal.classList.add("hidden");
      saveToFev.classList.add("hidden");
    })
    

  })
  
  
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
      setApikey(api_key);
      hidemodal();
      hideApiKeyInputDiv();
      showFavList();
      fetchData();

    }
  } catch (error) {
    console.error("Network Error", error);
  }
}


function checkApiKey() {
  const api_key = getApikey();
  if (api_key) {
    hideApiKeyInputDiv();
    showFavList();
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
      if (!getApikey()) {
        showmodal();
      }
    }
  })
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const input = searchInput.value.trim();
      if (input.length >= 3) {
        if (getApikey()) {
          fetchData(input);
        }
      }
    }
  });


  

  


}

window.addEventListener("load", () => {
  



  main()
  // randerUrlTheme();
  // randerUrlDemo();
  // randerTheme();
  // renderThemeList();
  // randerContent();
  
})
