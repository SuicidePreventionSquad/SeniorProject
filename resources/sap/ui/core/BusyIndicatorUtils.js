/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/Device'],function(q,D){"use strict";var B=function(){};B.getElement=function(s){var S="sapUiLocalBusyIndicatorSizeMedium";if(s==="Big"){S="sapUiLocalBusyIndicatorSizeBig";}var c=document.createElement("div");c.className="sapUiLocalBusyIndicator "+S;c.setAttribute("role","progressbar");c.setAttribute("aria-valuemin","0");c.setAttribute("aria-valuemax","100");c.setAttribute("alt","");c.setAttribute("tabIndex","0");var a=document.createElement("div");a.className="sapUiLocalBusyIndicatorAnimation sapUiLocalBusyIndicatorAnimStandard";a.appendChild(document.createElement("div"));a.appendChild(document.createElement("div"));a.appendChild(document.createElement("div"));c.appendChild(a);return c;};B.addHTML=function($,b,s){var e=B.getElement(s);e.id=b;var d=$.get(0);d.appendChild(e);d.className+=" sapUiLocalBusy";var a=e.children[0];var w=a.offsetWidth;e.className+=" sapUiLocalBusyIndicatorFade";if($[0].offsetWidth<w){a.className="sapUiLocalBusyIndicatorAnimation sapUiLocalBusyIndicatorAnimStandard";}$.attr('aria-busy',true);return q(e);};B.animateIE9={start:function(b){if(b&&D.browser.msie&&D.browser.version<=9){var a=function($,c){var s=function(t){$.animate({opacity:t},{step:function(n){$.css("-ms-transform","scale("+n+","+n+")");},complete:function(){s(t==1?0.3:1);},duration:700},"linear");};setTimeout(function(){s(0.3);},c);};var d=b.find(".sapUiLocalBusyIndicatorAnimation > div");for(var i=0;i<d.length;i++){a(q(d[i]),i*300);}}},stop:function(b){if(b&&D.browser.msie&&D.browser.version<=9){var d=b.find(".sapUiLocalBusyIndicatorAnimation > div");for(var i=0;i<d.length;i++){q(d[i]).stop();}}}};return B;},true);
