'use strict';

const seriesContainer = document.querySelector('.js_seriescontainer');
const outputFavList = document.querySelector('.js_favseries');
const inputSearch = document.querySelector('.js_searchfieldinput');
const buttonSearch = document.querySelector('.js_searchbutton');
const defaultImagePath = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';

let inputValue = ''; 
let listSeries = [];
let listSeriesFav= [];

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


function getFavStorage (){
    let ls = localStorage.getItem('listFav');
    listSeriesFav = JSON.parse(ls);
}

// function buildStorage()
// {
//     localStorage.setItem('listFav', JSON.stringify(listSeriesFav));
// }


// EL CÓDIGO EMPIEZA AQUÍ

//Evento que hace que funcione el botón
// buttonSearch.addEventListener ('click', getFromApi ); 

// para que vayan saliendo las series conforme escribes, que queda más guay
inputSearch.addEventListener ('keyup', getFromApi );

getFavStorage();
paintSeries( listSeriesFav, outputFavList ); 
