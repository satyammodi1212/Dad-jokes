const btnE1 = document.getElementById("btn");
const jokeE1 = document.getElementById("joke");
selectTag = document.querySelectorAll("select");
let from = document.getElementById("frometo");

const apiKey = "W1dpaRiLXkCZjIlYek9O1g==XbhK34xFo3IiIZOO";

const options = {
  method: "GET",
  headers: {
    "X-Api-key": apiKey,
  },
};

const apiURL = "https://api.api-ninjas.com/v1/dadjokes?limit=1";

async function getJoke() {
  try {
    jokeE1.innerText = "Updating...";
    btnE1.disabled = true;
    btnE1.innerText = "Loading...";
    const response = await fetch(apiURL, options);
    const data = await response.json();

    btnE1.disabled = false;
    btnE1.innerText = "Tell me a Joke";

    jokeE1.innerText = data[0].joke;

    let text = jokeE1.innerText,
      translateFrom = selectTag[0].value,
      translateTo = selectTag[1].value;
    console.log(text, translateFrom, translateTo);
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        from.innerText = data.responseData.translatedText;
      });
  } catch (error) {
    jokeE1.innerText = "An error happened, try again later";
    btnE1.disabled = false;
    btnE1.innerText = "Tell me a Joke";
    console.log(error);
  }
}
selectTag = document.querySelectorAll("select");
btnE1.addEventListener("click", getJoke);

selectTag.forEach((tag, id) => {
  for (const country_code in countries) {
    // console.log(countries[country_code]);
    let selected;
    if (id == 0 && country_code == "en-GB") {
      selected = "selected";
    } else if (id == 1 && country_code == "hi-IN") {
      selected = "selected";
    }
    let option = `<option value="${country_code}"${selected}>${countries[country_code]}</option>`;
    tag.insertAdjacentHTML("beforeend", option);
  }
});
