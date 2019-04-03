// ==UserScript==
// @name     OLX.pt Search Results - Number of days for ad to finish.
// @name:pt  OLX.pt Resultado Pesquisa - Número de dias para o anúncio acabar.
// @version  3
// @match   https://www.olx.pt/*
// @require https://code.jquery.com/jquery-3.3.1.min.js
// @require https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment-with-locales.min.js
// @require https://gist.github.com/raw/2625891/waitForKeyElements.js

// ==/UserScript==
const NUM_DIAS_ANUNCIO = 28;

const COLOR_RED = 'red';

const COLOR_GREEN = 'green';

const COLOR_ORANGE = 'orange';

const DIA_EM_MS = 60 * 60 * 24 * 1000;


function addDaysToEndAdFavorites(){
  console.debug("inicio - addDaysToEndAdFavorites");
  $('p.color-9.lheight16.margintop5.x-normal').each(function (index, value) {
      var texto = $(this).text().trim();
      console.debug('texto:'+ texto);
      if(texto !== undefined){
        var html = process(texto);
        html = '<p>' + html + '</p>';
        console.debug('html: ' + html);
        $(this).after(html);
      }
    });
  console.debug("fim - addDaysToEndAdFavorites");
}

function addDaysToEndAd(){
console.debug("inicio - addDaysToEndAd");
    //$('p.color-9.lheight16.marginbott5.x-normal')
    $('td.bottom-cell > div > p > small > span > i[data-icon=clock]').parent().each(function (index, value) {
      var texto = $(this).text().trim();
      console.debug('texto:'+ texto);
      if(texto !== undefined){
        var html = process(texto);
        html = '[' + html + ']';
        console.debug('html: ' + html);
        $(this).after(html);
      }
    });
    console.debug("fim - addDaysToEndAd");

}

function process(texto){
  try{
    var diasParaAcabar = 0;

    if(texto.startsWith("hoje")){
      diasParaAcabar = NUM_DIAS_ANUNCIO;
    }else if(texto.startsWith("Ontem")){
      diasParaAcabar = NUM_DIAS_ANUNCIO - 1;
    }else{
      moment.locale('pt');
      //obter a data
      var dataInicioAnuncio = moment(texto, 'DD  MMM');
      var dataFimAnuncio = dataInicioAnuncio.clone().add(NUM_DIAS_ANUNCIO, 'days');
      var dataHoje = moment();
      console.debug('dataInicioAnuncio: ' + dataInicioAnuncio.format('DD-MM-YYYY') + '\tdataFimAnuncio: '+dataFimAnuncio.format('DD-MM-YYYY'));
      //calcular o numero de dias
      diasParaAcabar = dataFimAnuncio.diff(dataHoje, 'days');
    }
    console.debug("diasParaAcabar: " + diasParaAcabar);
    var fontColor = COLOR_GREEN;

    if(diasParaAcabar <= (NUM_DIAS_ANUNCIO / 2) && diasParaAcabar > (NUM_DIAS_ANUNCIO / 4)){
        fontColor = COLOR_ORANGE;
    }else if(diasParaAcabar <= (NUM_DIAS_ANUNCIO / 4)){
      fontColor = COLOR_RED;
    }
    var html = "<span style=\"color: "+ fontColor +";\">"+ diasParaAcabar +"</span> dias para acabar";
    return html;
  }catch(error) {
     console.error(error.message);
  }
}

waitForKeyElements ("#offers_table", addDaysToEndAd);
waitForKeyElements ("table.fixed.offers.userobserved-list.margintop5.breakword", addDaysToEndAdFavorites);
console.info("acrescentados dias para anuncio terminar");
