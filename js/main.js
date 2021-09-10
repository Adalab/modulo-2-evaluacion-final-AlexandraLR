'use strict';

const seriesContainer = document.querySelector('.js_seriescontainer');
const outputFavList = document.querySelector('.js_favseries');
const inputSearch = document.querySelector('.js_searchfieldinput');
// const buttonSearch = document.querySelector('.js_searchbutton');
const buttonReset = document.querySelector('.js_resetfavs');

const defaultImagePath = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';

const keyStorageFav = 'listFav';

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
    const clickedSeries = ev.path[1].id;

    // Con el id del elemento clicado buscamos la pelicula en la lista de peliculas
    const clickedElement = listSeries.find((series) => {
      return series.show.id == clickedSeries;
    });

    // Buscamos el indice de la peli en la lista de favoritas
    const stockedFavorites = listSeriesFav.findIndex((fav) => {
         return fav.show.id == clickedSeries;
    });
    if (stockedFavorites === -1) {
        listSeriesFav.push(clickedElement);
    } else {
        listSeriesFav.splice(stockedFavorites, 1);
    }
    storageListFav();
}

function listenSeries() {
    const listenSeries = document.querySelectorAll('.js-series');
    console.log(listenSeries);
    for (const seriesEl of listenSeries) {
        seriesEl.addEventListener('click', handleSeries);
    }
}

function isFavorite(element) {
    return listSeriesFav.find((fav) => {
        return fav.show.id === element.show.id;
    });
}

function paintSeries(list, output) {
    let html = '';
    let favClass = '';
    let imageClass= '';
    let textClass= '';
    for (const itemSeries of list) {
        const isFav = isFavorite(itemSeries);
        if (isFav !== undefined) {
          favClass = 'favorite-series';
          imageClass = 'favourite-image'
          textClass = 'favourite-text'
        } else {
          favClass = '';
        }
    // console.log('paint' + itemSeries);
        html += `<li class="js-series ${favClass} csseditseries" id="${itemSeries.show.id}">`;
        // añadido if anidado para que me muestre la imagen default si no tiene imagen de serie
        html += `<img class="seriesImage ${imageClass}" src="${itemSeries.show.image !== null ? itemSeries.show.image.medium : defaultImagePath}" alt="series image"/>`
        html += `<h2 class="csstextseries ${textClass}">${itemSeries.show.name}</h2></li>`
    }
    output.innerHTML = html;
    listenSeries();
}



function buildListFav (){
    let ls = localStorage.getItem(keyStorageFav);
    if(ls !== null)
    {
        listSeriesFav = JSON.parse(ls);
        paintSeries( listSeriesFav, outputFavList ); 
    }
}

function storageListFav (){
    console.log(listSeriesFav);
    localStorage.setItem(keyStorageFav, JSON.stringify(listSeriesFav));
    paintSeries( listSeriesFav, outputFavList ); 
    paintSeries( listSeries, seriesContainer ); 

}

function cleanLS (){
    localStorage.removeItem(keyStorageFav);
    listSeriesFav = [];
    paintSeries( listSeriesFav, outputFavList );
    paintSeries( listSeries, seriesContainer );  
}


// para que vayan saliendo las series conforme escribes, que queda más guay
inputSearch.addEventListener ('keyup', getFromApi );
buttonReset.addEventListener ('click', cleanLS );
buildListFav();
