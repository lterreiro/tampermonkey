// ==UserScript==
// @name        AutoUncle
// @namespace   www.autouncle.pt
// @include     https://www.autouncle.pt/*/cars_search*
// @require https://code.jquery.com/jquery-3.3.1.min.js
// @require https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment-with-locales.min.js
// @version     2
// @grant       none
// ==/UserScript==

var $ = window.jQuery;
var moment = window.moment;

function findKmsPerYear()
{
     $('div.details.right-half ul:first-of-type').each(function(index, value){
         try{
             var car_year_node = $( this ).find( 'li.year span:first').text().trim();
             var car_year = moment(car_year_node, 'YYYY');
             var car_age = moment().diff(car_year, 'years');
             console.debug('car_year_node: ' + car_year_node + 'car_year: ' + car_year.format('YYYY') + 'car_age: ' + car_age);
             var car_kms_node=$( this ).find( 'li.km').text().trim();
             var car_kms=parseInt(/(\d+,\d+)/.exec(car_kms_node)[0].replace(",","").trim(), 0);
             var car_kms_year = car_kms;
             if(car_age > 0) {
               car_kms_year = (car_kms / car_age).toFixed(0);
             }
             console.debug('car_kms_node: ' + car_kms_node + 'car_kms: ' + car_kms +'car_kms_year: ' + car_kms_year);
             //var new_li = '<li class="kmYear"><dfn>KmsPerYear</dfn><span>' + car_kms_year.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1\.") + '<span class="unit">kms/year</span></span></li>';
             //$( this ).find( 'li.km' ).after(new_li);
             var kmsStr= "[" + car_kms_year.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1\.") + " kms/year]";
             $( this ).find( 'li.km' ).append(kmsStr);
         }catch(error) {
             console.error(error);
             return false;
         }
     });
     return true;
}

try{
    console.info('START');
    findKmsPerYear();
}catch(error) {
    console.error(error);
}
console.info('FINISH');