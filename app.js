const wordElement = document.querySelector(".word");
const meaningsElement = document.querySelector(".meanings");
const searchBtn = document.querySelector(".search-btn");
const searchBar = document.querySelector(".word-input");
const loaderBtn = document.querySelector(".loader-btn");
const errorElement = document.querySelector(".error-msg");
const thesaurusElement = document.querySelector(".thesaurus");

// Loading animation
function loadingAnimation(isLoading) {
  if (isLoading) {
    searchBtn.classList.add("hidden");
    loaderBtn.classList.remove("hidden");
  } else {
    searchBtn.classList.remove("hidden");
    loaderBtn.classList.add("hidden");
  }
}

// Fetch Meaning
const getMeaningResponse = function (word) {
  loadingAnimation(true);
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((response) => response.json())
    .then((response) => {
      if (typeof response === "object" && response.hasOwnProperty("message")) {
        displayError(response.message);
      } else {
        getMeaning(response);
        getThesaurusResponse(word);
      }
    });
};
// Fetch Thesaurus
const getThesaurusResponse = function (word) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "61c3215823msh1ce21b5e6bce66ap117f52jsn985a699a8370",
      "X-RapidAPI-Host": "thesaurus-by-api-ninjas.p.rapidapi.com",
    },
  };

  fetch(
    `https://thesaurus-by-api-ninjas.p.rapidapi.com/v1/thesaurus?word=${word}`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      getThesaurus(response);
    });
};
//////////////////////////////////////////////////////

// For getting meanings.
function getMeaning(meaningObject) {
  const [{ meanings, word }] = meaningObject;
  console.log(word);
  console.log(meanings);
  displayWord(word);
  displayMeaning(meanings);
}

// For displaying errors
function displayError(errorMessage) {
  loadingAnimation(false);
  alert(errorMessage + "🤔");
}

// For getting thesaurus
function getThesaurus(thesaurusObject) {
  console.log(thesaurusObject);
  loadingAnimation(false);
  thesaurusElement.innerHTML = '';
  const { synonyms, antonyms } = thesaurusObject;
  const synonymsText =
    synonyms.length > 0 ? `<span style="color: #188038">Similar: </span>` : ``;
  const antonymsText =
    antonyms.length > 0 ? `<span style="color: #d93025">Opposite: </span>` : ``;
  thesaurusElement.insertAdjacentHTML("beforeend", synonymsText);
  synonyms.forEach(function (synonym, i) {
    const synonymsHTML = `
    <button
      class="opposite-words btn btn-outline-light"
      style="
        border: 1px solid #dadce0;
        border-radius: 20px;
        color: black;
        margin: 5px 0;
        font-size: 15px;
    ">
      ${synonym}
    </button>
  `;
    thesaurusElement.insertAdjacentHTML("beforeend", synonymsHTML);
  });

  thesaurusElement.insertAdjacentHTML("beforeend", `<br>`);
  thesaurusElement.insertAdjacentHTML("beforeend", antonymsText);
  antonyms.forEach(function(antonym, i){
    const antonymsHTML = `
    <button
      class="opposite-words btn btn-outline-light"
      style="
        border: 1px solid #dadce0;
        border-radius: 20px;
        color: black;
        margin: 5px 0;
        font-size: 15px;
    ">
      ${antonym}
    </button>
    `;
    thesaurusElement.insertAdjacentHTML('beforeend', antonymsHTML);
  });
}

//Display Word
function displayWord(word) {
  wordElement.classList.remove("hidden");
  wordElement.textContent = word;
}
// Display Meanings
function displayMeaning(meanings) {
  meaningsElement.innerHTML = "";
  meanings.forEach(function (meaning, i, object) {
    const { partOfSpeech, definitions } = meaning;
    // parts of speech part.
    const partOfSpeechHtml = `
    <p class="parts-of-speech" style="font-style: italic; color: grey;">
      ${partOfSpeech}
    </p>
    `;
    meaningsElement.insertAdjacentHTML("beforeend", partOfSpeechHtml);
    // definition part.
    definitions.forEach(function (definition, i, object) {
      const definitionHtml = `
      <p class="meaning" style="margin-left: 40px;">
          ${definition.definition}
      </p>
      `;
      meaningsElement.insertAdjacentHTML("beforeend", definitionHtml);
    });
  });
}

//////////////////////////////////////////////////////
// Getting input from the user
function getUserInput() {
  searchBtn.addEventListener("click", function () {
    getMeaningResponse(searchBar.value);
  });
}

getUserInput();
