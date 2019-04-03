// ==UserScript==
// @name         StandVirtual Ad Tweaks
// @namespace    https://www.standvirtual.com
// @version      0.2
// @description  Tweaks to the ad page
// @author       Epaminondas
// @match        https://www.standvirtual.com/anuncio/*
// @require https://code.jquery.com/jquery-3.3.1.min.js
// @require https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment-with-locales.min.js
// @require https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==

function processarKmsAno() {
    moment.locale('pt');
    var elm = $("li > span.offer-params__label:contains('Quilómetros')");
    var skms = $(elm).next().text().trim();
    if(skms !== undefined){
        var regex = /(\s+)|(km)/gi
        skms = skms.replace(regex, '');
    }
    console.debug('skms: '+ skms);
    var sdia = '1';
    var smes=$("li > span.offer-params__label:contains('Mês de Registo')").next().text().trim();
    var sano=$("li > span.offer-params__label:contains('Ano de Registo')").next().text().trim();
    var sregisto = sdia + '-' + smes + '-' + sano;
    console.debug('sregisto: "'+ sregisto + '"');
    var registo = moment(sregisto, 'D-MMMM-YYYY');
    var now = moment();
    var meses = now.diff(registo, 'months');
    console.debug('meses: ' + meses);
    //var anos = now.diff(registo, 'years', true);
    //console.debug('anos: ' + anos);
    var nkms = new Number(skms);
    if(Number.isNaN(nkms)){
        console.error("não foi possível converter o valor dos kms em numero: "+ skms);
        return;
    }
    var kmsmes = (nkms / meses);
    var kmsano = kmsmes * 12;
    console.debug('kms/ano: ' + kmsano);
    var skmsano = Number.parseInt(kmsano).toLocaleString('pt-PT', {useGrouping:true});
    console.debug('skmsano: ' + skmsano);
    $(elm).parent().last().append(' <div class="offer-params__value"> [' + skmsano +' km/ano]</div>');
}

waitForKeyElements ("#parameters", processarKmsAno);