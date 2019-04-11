// ==UserScript==
// @name         StandVirtual Ad Tweaks
// @namespace    https://www.standvirtual.com
// @version      0.3
// @description  Tweaks to the ad page
// @author       Epaminondas
// @match        https://www.standvirtual.com/anuncio/*
// @require https://code.jquery.com/jquery-3.3.1.min.js
// @require https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment-with-locales.min.js
// @require https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==

function processarKmsAno(skms, sdia, smes, sano, target) {
    console.debug(`Processar Kms Ano`);
    moment.locale('pt');
    if(skms !== undefined){
        var regex = /(\s+)|(km)/gi
        skms = skms.replace(regex, '');
    }
    //console.debug('skms: '+ skms);
    var sregisto = sdia + '-' + smes + '-' + sano;
    //console.debug('sregisto: "'+ sregisto + '"');
    var registo = moment(sregisto, 'D-MMMM-YYYY');
    var now = moment();
    var meses = now.diff(registo, 'months');
    //console.debug('meses: ' + meses);
    var anos = now.diff(registo, 'years', true);
    //console.debug('anos: ' + anos);
    var nkms = new Number(skms);
    if(Number.isNaN(nkms)){
        console.error("não foi possível converter o valor dos kms em numero: "+ skms);
        return;
    }
    var kmsmes = (nkms / meses);
    var kmsano = kmsmes * 12;
    //console.debug('kms/ano: ' + kmsano);
    var skmsano = Number.parseInt(kmsano).toLocaleString('pt-PT', {useGrouping:true});
    //console.debug('skmsano: ' + skmsano);
    $(target).append(' <div class="offer-params__value"> [' + skmsano +' km/ano]</div>');
}

function processarUrlCotacaoUsado(marca, modelo, ano, target){
    console.debug(`Processar Url`);
    var url = `https://volantesic.pt/marcas-carros-usados/${marca}/${modelo}/${ano}`;
    var html = `<li class='offer-params__item'><span class="offer-params__label">Cotação</span><div class="offer-params__value"><a class="offer-params__link" target="_blank" href="${url}" title="Cotação de Usado">Ver Cotação</a></div></li>`;
    $(html).insertAfter(target);
}

const mCar = new Map();

function processarCarro(){
    console.debug(`Processar Carro`);
    $("#parameters ul li.offer-params__item").each(function (index){
        var label = $(this).find("span.offer-params__label").text().trim();
        var value = $(this).find("div.offer-params__value").text().trim();
        mCar.set(label, value);
    });
    //for (const [k, v] of mCar) console.debug(`${k} -> ${v}`);
    processarKmsAno(mCar.get('Quilómetros'), "1", mCar.get('Mês de Registo'), mCar.get('Ano de Registo'), $("li > span.offer-params__label:contains('Quilómetros')").parent().last());
    processarUrlCotacaoUsado(mCar.get('Marca'), mCar.get('Modelo'), mCar.get('Ano de Registo'), $("li > span.offer-params__label:contains('Condição')").parent());
}

waitForKeyElements ("#parameters", processarCarro);