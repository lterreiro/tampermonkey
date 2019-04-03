// ==UserScript==
// @name     OLX.pt Ad- Number of days for ad to finish.
// @name:pt  OLX.pt Ad - Número de dias para o anúncio acabar.
// @version  1
// @grant    GM_addStyle
// @match    https://www.olx.pt/anuncio/*
// @require  https://code.jquery.com/jquery-3.3.1.min.js
// @require  https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment-with-locales.min.js
// ==/UserScript==


const NUM_DIAS_ANUNCIO = 28;

const COLOR_RED = 'red';

const COLOR_GREEN = 'green';

const COLOR_ORANGE = 'orange';

const COLOR_WHITE = 'white';

const COLOR_BLACK = 'black';

const DIA_EM_MS = 60 * 60 * 24 * 1000;


function addDaysToEndAd(){
  try{
    console.debug("inicio");
    moment.locale('pt');
    var dataStr = $('div.offer-titlebox__details em').text().trim().split(',')[1].trim();
    console.debug("dataStr: '" + dataStr + "'");
    var dataInicioAnuncio = moment(dataStr, 'DD MMMM YYYY');
    var dataFimAnuncio = dataInicioAnuncio.clone().add(NUM_DIAS_ANUNCIO, 'days');
    var dataHoje = moment();
    console.debug('dataInicioAnuncio: ' + dataInicioAnuncio.format('DD-MM-YYYY') + '\tdataFimAnuncio: '+dataFimAnuncio.format('DD-MM-YYYY') + ' hoje: '+ dataHoje.format('DD-MM-YYYY'));
    //calcular o numero de dias
    var diasParaAcabar = dataFimAnuncio.diff(dataHoje, 'days');
    var fontColor;
    var backGroundColor;
    if(diasParaAcabar <= (NUM_DIAS_ANUNCIO / 2) && diasParaAcabar > (NUM_DIAS_ANUNCIO / 4)){
      fontColor = COLOR_WHITE;
      backGroundColor = COLOR_ORANGE;
    }else if(diasParaAcabar <= (NUM_DIAS_ANUNCIO / 4)){
      fontColor = COLOR_WHITE;
      backGroundColor = COLOR_RED;
    }else{
      fontColor = COLOR_WHITE;
      backGroundColor = COLOR_GREEN;
    }
    var spanHtml = '<span style="font-weight:bold;color: '+ fontColor +'; background-color: '+ backGroundColor +';"\>' + diasParaAcabar + '</span> dias';
    var tableHtml = '<tr><td><table class="item" cellspacing="0" cellpadding="0"><tbody><tr><th>Dias Acabar</th><td class="value">'+ spanHtml +'</td></tr></tbody></table></td></tr>'
    console.debug('tableHtml: "'+ tableHtml +'"')
    $('table.details.fixed.marginbott20.margintop5.full').append(tableHtml);

  }catch(error) {
    console.error(error);
  }
}


addDaysToEndAd();