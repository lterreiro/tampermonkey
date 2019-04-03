// ==UserScript==
// @name          RedHotPawn (based on userstyle rhp tahoma)
// @namespace     http://userstyles.org
// @description	  Makes www.redhotpawn.com websites much more readable and cleaner.
// @author        vinayakjoshi
// @homepage      https://userstyles.org/styles/8003
// @include       http://www.redhotpawn.com/*
// @include       https://www.redhotpawn.com/*
// @include       http://*.www.redhotpawn.com/*
// @include       https://*.www.redhotpawn.com/*
// @include       http://www.chessatwork.com/*
// @include       https://www.chessatwork.com/*
// @include       http://*.www.chessatwork.com/*
// @include       https://*.www.chessatwork.com/*
// @include       http://www.timeforchess.com/*
// @include       https://www.timeforchess.com/*
// @include       http://*.www.timeforchess.com/*
// @include       https://*.www.timeforchess.com/*
// @include       http://www.redhotchess.com/*
// @include       https://www.redhotchess.com/*
// @include       http://*.www.redhotchess.com/*
// @include       https://*.www.redhotchess.com/*
// @include       http://www.playtheimmortalgame.com/*
// @include       https://www.playtheimmortalgame.com/*
// @include       http://*.www.playtheimmortalgame.com/*
// @include       https://*.www.playtheimmortalgame.com/*
// @run-at        document-start
// @version       0.20110313172313
// ==/UserScript==
(function() {var css = [
	"@namespace url(http://www.w3.org/1999/xhtml);",
    "    input,textArea {",
    "        background-color: #ffffff !important;",
	"    }"
].join("\n");
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		heads[0].appendChild(node);
	} else {
		// no head yet, stick it whereever
		document.documentElement.appendChild(node);
	}
}
})();
