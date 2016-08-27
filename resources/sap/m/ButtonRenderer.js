/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global'],function(q){"use strict";var B={};B.render=function(r,b){var t=b.getType();var e=b.getEnabled();var w=b.getWidth();var T=b.getTooltip_AsString();var s=b._getText();var a=b.getTextDirection();var i=sap.ui.Device.browser.internet_explorer||sap.ui.Device.browser.edge;var c=sap.ui.core.IconPool.getIconURI("nav-back");r.write("<button");r.writeControlData(b);r.addClass("sapMBtnBase");if(!b._isUnstyled()){r.addClass("sapMBtn");if((t===sap.m.ButtonType.Back||t===sap.m.ButtonType.Up)&&b.getIcon()&&!s){r.addClass("sapMBtnBack");}}var A={};var d="";switch(t){case sap.m.ButtonType.Accept:d=sap.m.Button._oStaticAcceptText.getId();break;case sap.m.ButtonType.Reject:d=sap.m.Button._oStaticRejectText.getId();break;case sap.m.ButtonType.Emphasized:d=sap.m.Button._oStaticEmphasizedText.getId();break;default:break;}if(d){A["describedby"]={value:d,append:true};}if(this.renderAccessibilityAttributes){this.renderAccessibilityAttributes(r,b,A);}r.writeAccessibilityState(b,A);if(!e){r.writeAttribute("disabled","disabled");if(!b._isUnstyled()){r.addClass("sapMBtnDisabled");}}else{switch(t){case sap.m.ButtonType.Accept:case sap.m.ButtonType.Reject:case sap.m.ButtonType.Emphasized:r.addClass("sapMBtnInverted");break;default:break;}}var I=sap.ui.core.IconPool.getIconInfo(b.getIcon());if(T||(I&&I.text&&!b.getText())){r.writeAttributeEscaped("title",T||I.text);}r.writeClasses();if(w!=""||w.toLowerCase()==="auto"){r.addStyle("width",w);r.writeStyles();}r.write(">");r.write("<div");r.writeAttribute("id",b.getId()+"-inner");if(!b._isUnstyled()){r.addClass("sapMBtnInner");}if(b._isHoverable()){r.addClass("sapMBtnHoverable");}if(e){r.addClass("sapMFocusable");if(i){r.addClass("sapMIE");}}if(!b._isUnstyled()){if(s){r.addClass("sapMBtnText");}if(t===sap.m.ButtonType.Back||t===sap.m.ButtonType.Up){r.addClass("sapMBtnBack");}if(b.getIcon()){if(b.getIconFirst()){r.addClass("sapMBtnIconFirst");}else{r.addClass("sapMBtnIconLast");}}}if(this.renderButtonAttributes){this.renderButtonAttributes(r,b);}if(!b._isUnstyled()&&t!==""){r.addClass("sapMBtn"+q.sap.encodeHTML(t));}r.writeClasses();r.write(">");if(t===sap.m.ButtonType.Back||t===sap.m.ButtonType.Up){this.writeInternalIconPoolHtml(r,b,c);}if(b.getIcon()){this.writeImgHtml(r,b);}if(s){r.write("<span");r.addClass("sapMBtnContent");if(a!==sap.ui.core.TextDirection.Inherit){r.writeAttribute("dir",a.toLowerCase());}r.writeClasses();r.writeAttribute("id",b.getId()+"-content");r.write(">");r.writeEscaped(s);r.write("</span>");}if(i&&e){r.write('<div class="sapMBtnFocusDiv"></div>');}r.write("</div>");r.write("</button>");};B.writeImgHtml=function(r,b){r.renderControl(b._getImage((b.getId()+"-img"),b.getIcon(),b.getActiveIcon(),b.getIconDensityAware()));};B.writeInternalIconPoolHtml=function(r,b,u){r.renderControl(b._getInternalIconBtn((b.getId()+"-iconBtn"),u));};return B;},true);
