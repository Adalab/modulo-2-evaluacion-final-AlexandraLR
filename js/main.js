'use strict';

const seriesContainer = document.querySelector('.js_seriescontainer');
const inputSearch = document.querySelector('.js_searchfieldinput');
const buttonSearch = document.querySelector('.js_searchbutton');
const defaultImagePath = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';

let inputValue; 
let listSeries = [];


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
        paintSeries();
    });
}


function paintSeries() {
    let html = '';
    for (const itemSeries of listSeries) {
        console.log(itemSeries);
        html += `<li class="" id="${itemSeries.show.id}">`;
        // añadido if anidado para que me muestre la imagen default si no tiene imagen de serie
        html += `<img class="seriesImage" src="${itemSeries.show.image !== null ? itemSeries.show.image.medium : defaultImagePath}" alt="series image"/>`
        html += `</li>`
        html += `<h2>${itemSeries.show.name}</h2>`;
  
    }
    seriesContainer.innerHTML = html;
}



//Evento
buttonSearch.addEventListener ('click', getFromApi )
