// ==UserScript==
// @name         StandVirtual Search Results Tweaks
// @namespace    https://www.standvirtual.com
// @version      0.1
// @description  Tweaks to the search results page
// @author       Epaminondas
// @match        https://www.standvirtual.com/carros/*
// @require https://code.jquery.com/jquery-3.3.1.min.js
// @require https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment-with-locales.min.js
// ==/UserScript==

(function() {
    moment.locale('pt');
    $("article").each(function(index){
        var elm = $(this).find("li[data-code='mileage']>span");
        var skms = $(elm).text().trim();
        if(skms !== undefined){
            var regex = /(\s+)|(km)/gi
            skms = skms.replace(regex, '');
        }
        console.debug('skms: '+ skms);
        var sdia = '1';
        var sano=$(this).find("li[data-code='first_registration_year']>span").text().trim();
        var smes=$(this).find("li[data-code='first_registration_month']>span").text().trim();
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
        $(elm).after(' <span>[' + skmsano +' /ano]</span>');
    });
})();