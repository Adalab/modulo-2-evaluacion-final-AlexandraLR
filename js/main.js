'use strict';

const seriesContainer = document.querySelector('.js_seriescontainer');
const outputFavList = document.querySelector('.js_favseries');
const inputSearch = document.querySelector('.js_searchfieldinput');
// const buttonSearch = document.querySelector('.js_searchbutton');
const buttonReset = document.querySelector('.js_resetfavs');
const eraseFavs = document.querySelector('.js_resetfavs');

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
        paintSeries(listSeries, seriesContainer, false);
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
    // comprobamos si está o no en favoritos para hacer push en caso de que no esté o splice si está, porque si está es que el click es el de sacarla de la lista
    if (stockedFavorites === -1) {
        listSeriesFav.push(clickedElement);
    } else {
        listSeriesFav.splice(stockedFavorites, 1);
    }

    // activamos la función para que lo guarde
    storageListFav();
}

// LISTENER DE LAS SERIES CLICKADAS
function listenSeries() {
    const listenSeries = document.querySelectorAll('.js-series');
    console.log(listenSeries);
    for (const seriesEl of listenSeries) {
        seriesEl.addEventListener('click', handleSeries);
    }
}

function listenCloseSeries() {
    const listenCloseSeries = document.querySelectorAll('.js-series-close');
    for (const seriesFav of listenCloseSeries) {
        seriesFav.addEventListener('click', handleSeries);
    }
}

// Comprobación de si es o no favorito, por ID para usarla después.
function isFavorite(element) {
    return listSeriesFav.find((fav) => {
        return fav.show.id === element.show.id;
    });
}


// La función paintSeries, función principal de la composición del HTML, se ha tenido que dividir en dos, para sacar por un lado la lista de FAVs con sus estilos y la lista de series con los suyos. 
function paintSeries(list, output, isFav) {
    let html = '';

    for (const itemSeries of list) {
    // Si el item es Fav, te saca la función con las clases de fav, sino, las de List normal.
        html += isFav ? buildHtmlListFav(itemSeries) : buildHtmlList(itemSeries);
    }
    output.innerHTML = html;
    listenSeries();
}

function buildHtmlList(itemSeries)
{
    let html = '';
    let isFav = isFavorite(itemSeries);
    let favClass = 'favorite-series';

    html += `<li class="js-series ${isFav !== undefined ? favClass : ''} csseditseries" id="${itemSeries.show.id}">`;
    // añadido if anidado para que me muestre la imagen default si no tiene imagen de serie
    html += `<img class="seriesImage " src="${itemSeries.show.image !== null ? itemSeries.show.image.medium : defaultImagePath}" alt="series image"/>`
    html += `<h2 class="csstextseries ">${itemSeries.show.name}</h2></li>`
    return html;
}

function buildHtmlListFav(itemSeries)
{
    let favSecondClass = 'favorite-second-series';
    let imageClass = 'favorite-image';
    let textClass = 'favorite-text';

    let html = '';
    html += `<div class="flexboxfav">`
    html += `<li class="js-series ${favSecondClass}" id="${itemSeries.show.id}">`;
    // añadido if anidado para que me muestre la imagen default si no tiene imagen de serie
    html += `<img class="${imageClass}" src="${itemSeries.show.image !== null ? itemSeries.show.image.medium : defaultImagePath}" alt="series image"/>`
    html += `<h2 class="csstextseries ${textClass}">${itemSeries.show.name}</h2></li>`
    html += `<button class="closeButton js-series-close">
    <i class="fas fa-trash-alt"></i>
  </button>`
    html += `</div>`
    return html;
}
 
//SACAR DEL LOCAL STORAGE AL INICIALIZAR LA PÁGINA
function buildListFav (){
    let ls = localStorage.getItem(keyStorageFav);
    if(ls !== null)
    {
        listSeriesFav = JSON.parse(ls);
        paintSeries( listSeriesFav, outputFavList, true ); 
    }
}

// GUARDAR EN LOCAL STORAGE
function storageListFav (){
    localStorage.setItem(keyStorageFav, JSON.stringify(listSeriesFav));
    paintSeries( listSeriesFav, outputFavList, true ); 
    paintSeries( listSeries, seriesContainer ); 
}


// BORAR EL LOCAL STORAGE
function cleanLS (){
    //Añadimos pantalla de verificación de borrado de datos de localstorage
    let buttonConfirm = confirm("¿Está seguro de que desea eliminar toda la lista de favoritos?");
    // Para que no siga borrando al darle a cancelar al pop up, le ponemos return en void, eso nos saca de la función sin cumplir lo siguiente
    if (!buttonConfirm) return;
    localStorage.removeItem(keyStorageFav);
    listSeriesFav = [];
    paintSeries( listSeriesFav, outputFavList, true );
    paintSeries( listSeries, seriesContainer, false );  
}


// para que vayan saliendo las series conforme escribes, que queda más guay que el botón de buscar.
inputSearch.addEventListener ('keyup', getFromApi );
buttonReset.addEventListener ('click', cleanLS );
buildListFav();
