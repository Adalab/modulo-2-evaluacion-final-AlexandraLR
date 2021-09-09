'use strict';

const seriesContainer = document.querySelector('.js_seriescontainer');
const outputFavList = document.querySelector('.js_favseries');
const inputSearch = document.querySelector('.js_searchfieldinput');
const buttonSearch = document.querySelector('.js_searchbutton');
const defaultImagePath = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';

let inputValue; 
let listSeries = [];
let listSeriesFav = [{"score":0.9067801,"show":{"id":139,"url":"https://www.tvmaze.com/shows/139/girls","name":"Girls","type":"Scripted","language":"English","genres":["Drama","Romance"],"status":"Ended","runtime":30,"averageRuntime":30,"premiered":"2012-04-15","officialSite":"http://www.hbo.com/girls","schedule":{"time":"22:00","days":["Sunday"]},"rating":{"average":6.6},"weight":95,"network":{"id":8,"name":"HBO","country":{"name":"United States","code":"US","timezone":"America/New_York"}},"webChannel":null,"dvdCountry":null,"externals":{"tvrage":30124,"thetvdb":220411,"imdb":"tt1723816"},"image":{"medium":"https://static.tvmaze.com/uploads/images/medium_portrait/31/78286.jpg","original":"https://static.tvmaze.com/uploads/images/original_untouched/31/78286.jpg"},"summary":"<p>This Emmy winning series is a comic look at the assorted humiliations and rare triumphs of a group of girls in their 20s.</p>","updated":1611310521,"_links":{"self":{"href":"https://api.tvmaze.com/shows/139"},"previousepisode":{"href":"https://api.tvmaze.com/episodes/1079686"}}}},{"score":0.87835276,"show":{"id":41734,"url":"https://www.tvmaze.com/shows/41734/girls","name":"GIRLS","type":"Scripted","language":"Mongolian","genres":["Comedy"],"status":"Running","runtime":41,"averageRuntime":null,"premiered":null,"officialSite":null,"schedule":{"time":"","days":["Thursday"]},"rating":{"average":null},"weight":0,"network":{"id":1672,"name":"UBS","country":{"name":"Mongolia","code":"MN","timezone":"Asia/Ulaanbaatar"}},"webChannel":null,"dvdCountry":null,"externals":{"tvrage":null,"thetvdb":null,"imdb":"tt8709752"},"image":{"medium":"https://static.tvmaze.com/uploads/images/medium_portrait/191/478539.jpg","original":"https://static.tvmaze.com/uploads/images/original_untouched/191/478539.jpg"},"summary":null,"updated":1556323042,"_links":{"self":{"href":"https://api.tvmaze.com/shows/41734"}}}},{"score":0.70095503,"show":{"id":23542,"url":"https://www.tvmaze.com/shows/23542/good-girls","name":"Good Girls","type":"Scripted","language":"English","genres":["Drama","Comedy","Crime"],"status":"Ended","runtime":60,"averageRuntime":60,"premiered":"2018-02-26","officialSite":"https://www.nbc.com/good-girls","schedule":{"time":"21:00","days":["Thursday"]},"rating":{"average":7.3},"weight":100,"network":{"id":1,"name":"NBC","country":{"name":"United States","code":"US","timezone":"America/New_York"}},"webChannel":null,"dvdCountry":null,"externals":{"tvrage":null,"thetvdb":328577,"imdb":"tt6474378"},"image":{"medium":"https://static.tvmaze.com/uploads/images/medium_portrait/297/744253.jpg","original":"https://static.tvmaze.com/uploads/images/original_untouched/297/744253.jpg"},"summary":"<p><b>Good Girls</b> follows three \"good girl\" suburban wives and mothers who suddenly find themselves in desperate circumstances and decide to stop playing it safe, and risk everything to take their power back.</p>","updated":1627294164,"_links":{"self":{"href":"https://api.tvmaze.com/shows/23542"},"previousepisode":{"href":"https://api.tvmaze.com/episodes/2108575"}}}}];

//Conseguir los datos de la api
function getFromApi(event) {
    inputValue = inputSearch.value;
    event.preventDefault();
    console.log(inputValue);
    fetch(
      '//api.tvmaze.com/search/shows?q='+ inputValue
    )
      .then((response) => response.json())
      .then((data) => {
        listSeries = data;
        paintSeries(listSeries, seriesContainer);
    });
}


function paintSeries(list, output) {
    let html = '';
    for (const itemSeries of list) {
        console.log(itemSeries);
        html += `<li class="" id="${itemSeries.show.id}">`;
        // añadido if anidado para que me muestre la imagen default si no tiene imagen de serie
        html += `<img class="seriesImage" src="${itemSeries.show.image !== null ? itemSeries.show.image.medium : defaultImagePath}" alt="series image"/>`
        html += `</li>`
        html += `<h2>${itemSeries.show.name}</h2>`;
  
    }
    output.innerHTML = html;
}


//Evento
buttonSearch.addEventListener ('click', getFromApi );
paintSeries( listSeriesFav, outputFavList ); 
