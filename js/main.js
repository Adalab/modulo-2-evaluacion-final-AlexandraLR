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
    fetch(
      '//api.tvmaze.com/search/shows?q='+ inputValue
    )
      .then((response) => response.json())
      .then((data) => {
        listSeries = data;
        paintSeries(listSeries, seriesContainer);
    });
}

function handleSeries(ev) {
    // const clickedSeries = ev.currentTarget.id;
    const clickedSeries = ev.path[1].id;

    const clickedElement = listSeries.find((series) => {
      return series.show.id == clickedSeries;
    });

    const stockedFavorites = listSeriesFav.findIndex((fav) => {
         return fav.show.id == clickedSeries;
    });
    if (stockedFavorites === -1) {
        listSeriesFav.push(clickedElement);
    } else {
        listSeriesFav.splice(stockedFavorites, 1);
    }
    console.log(listSeriesFav);
    paintSeries( listSeriesFav, outputFavList ); 
}

function listenSeries() {
    const listenSeries = document.querySelectorAll('.js-series');
    console.log(listenSeries);
    for (const seriesEl of listenSeries) {
        seriesEl.addEventListener('click', handleSeries);
    }
}


// function isFavorite(listSeries) {
//     const stockedFavorites = favorites.find((fav) => {
//      console.log(fav, listSeries);
//       return fav.id === series.id;
//     });
//     if (stockedFavorites === undefined) {
//       return false;
//     } else {
//       return true;
//     }
// }

function paintSeries(list, output) {
    let html = '';
    // let favClass = '';
     for (const itemSeries of list) {
    //     const isFav = isFavorite(listSeries);
    //     if (isFav) {
    //       favClass = 'favorite-series';
    //     } else {
    //       favClass = '';
    //     }
    console.log('paint' + itemSeries);
        html += `<li class="js-series csseditseries" id="${itemSeries.show.id}">`;
        // añadido if anidado para que me muestre la imagen default si no tiene imagen de serie
        html += `<img class="seriesImage" src="${itemSeries.show.image !== null ? itemSeries.show.image.medium : defaultImagePath}" alt="series image"/>`
        html += `<h2 class="csstextseries">${itemSeries.show.name}</h2></li>`
    }
    output.innerHTML = html;
    listenSeries();
}


function buildListFav (){
    let ls = localStorage.getItem('listFav');
    if(ls !== null)
    {
        listSeriesFav = JSON.parse(ls);
        paintSeries( listSeriesFav, outputFavList ); 
    }
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
buildListFav();
