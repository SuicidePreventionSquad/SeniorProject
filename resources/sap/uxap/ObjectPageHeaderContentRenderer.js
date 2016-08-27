/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ObjectPageHeaderRenderer","./ObjectPageLayout","sap/ui/core/Icon"],function(O,a,I){"use strict";var b={};b.render=function(r,c){var p=c.getParent(),P=(p instanceof a),h=(p&&P)?p.getHeaderTitle():false,R=(p&&P)?((p instanceof a)&&p.getShowTitleInHeaderContent()):false,d=P&&p.getShowEditHeaderButton()&&c.getContent()&&c.getContent().length>0;if(d){r.write("<div ");r.addClass("sapUxAPObjectPageHeaderContentFlexBox");r.addClass("sapUxAPObjectPageHeaderContentDesign-"+c.getContentDesign());if(h){r.addClass('sapUxAPObjectPageContentObjectImage-'+h.getObjectImageShape());}r.writeClasses();r.write(">");}r.write("<div ");r.writeControlData(c);if(d){r.addClass("sapUxAPObjectPageHeaderContentCellLeft");}else{r.addClass("sapUxAPObjectPageHeaderContentDesign-"+c.getContentDesign());if(h){r.addClass('sapUxAPObjectPageContentObjectImage-'+h.getObjectImageShape());}}r.addClass("ui-helper-clearfix");r.addClass("sapUxAPObjectPageHeaderContent");if(!c.getVisible()){r.addClass("sapUxAPObjectPageHeaderContentHidden");}r.writeClasses();r.write(">");if(P&&p.getIsChildPage()){r.write("<div");r.addClass('sapUxAPObjectChildPage');r.writeClasses();r.write("></div>");}if(R){this._renderTitleImage(r,h);if(c.getContent().length==0){r.write("<span class=\"sapUxAPObjectPageHeaderContentItem\">");this._renderTitle(r,h);r.write("</span>");}}c.getContent().forEach(function(i,e){this._renderHeaderContent(i,e,r,R,h,c);},this);r.write("</div>");if(d){this._renderEditButton(r,c);r.write("</div>");}};b._renderHeaderContent=function(h,i,r,R,H,c){var d=false,e=false,l=c._getLayoutDataForControl(h),f=i===0,g=i===(c.getContent().length-1);if(l){d=l.getShowSeparatorBefore();e=l.getShowSeparatorAfter();r.write("<span ");r.addClass("sapUxAPObjectPageHeaderWidthContainer");r.addClass("sapUxAPObjectPageHeaderContentItem");r.addStyle("width",l.getWidth());r.writeStyles();if(e||d){r.addClass("sapUxAPObjectPageHeaderSeparatorContainer");}if(!l.getVisibleL()){r.addClass("sapUxAPObjectPageHeaderLayoutHiddenL");}if(!l.getVisibleM()){r.addClass("sapUxAPObjectPageHeaderLayoutHiddenM");}if(!l.getVisibleS()){r.addClass("sapUxAPObjectPageHeaderLayoutHiddenS");}r.writeClasses();r.write(">");if(d){r.write("<span class=\"sapUxAPObjectPageHeaderSeparatorBefore\"/>");}if(f&&R){this._renderTitle(r,H);}}else{if(f&&R){r.write("<span class=\"sapUxAPObjectPageHeaderContentItem\">");this._renderTitle(r,H);}else{h.addStyleClass("sapUxAPObjectPageHeaderContentItem");}}r.renderControl(h);if(e){r.write("<span class=\"sapUxAPObjectPageHeaderSeparatorAfter\"/>");}if(l||(f&&R)||g){r.write("</span>");}};b._renderTitleImage=function(r,h){var o=h._getInternalAggregation("_objectImage");if(h.getObjectImageURI()||h.getShowPlaceholder()){r.write("<span");r.addClass("sapUxAPObjectPageHeaderContentImageContainer");r.addClass("sapUxAPObjectPageHeaderObjectImage-"+h.getObjectImageShape());r.writeClasses();r.write(">");O._renderInProperContainer(function(){r.renderControl(o);O._renderPlaceholder(r,h,!(h.getObjectImageShape()||h.getShowPlaceholder()));},o,r);r.write("</span>");}};b._renderTitle=function(r,h){O._renderObjectPageTitle(r,h,true);};b._renderEditButton=function(r,h){r.write("<div class=\"sapUxAPObjectPageHeaderContentCellRight\">");r.renderControl(h.getAggregation("_editHeaderButton"));r.write("</div>");};return b;},true);
