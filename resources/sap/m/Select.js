/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./Bar','./Dialog','./InputBase','./Popover','./SelectList','./library','sap/ui/core/Control','sap/ui/core/EnabledPropagator','sap/ui/core/IconPool'],function(q,B,D,I,P,S,l,C,E,a){"use strict";var b=C.extend("sap.m.Select",{metadata:{library:"sap.m",properties:{name:{type:"string",group:"Misc",defaultValue:""},enabled:{type:"boolean",group:"Behavior",defaultValue:true},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"auto"},maxWidth:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"100%"},selectedKey:{type:"string",group:"Data",defaultValue:""},selectedItemId:{type:"string",group:"Misc",defaultValue:""},icon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:""},type:{type:"sap.m.SelectType",group:"Appearance",defaultValue:sap.m.SelectType.Default},autoAdjustWidth:{type:"boolean",group:"Appearance",defaultValue:false},textAlign:{type:"sap.ui.core.TextAlign",group:"Appearance",defaultValue:sap.ui.core.TextAlign.Initial},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:sap.ui.core.TextDirection.Inherit},forceSelection:{type:"boolean",group:"Behavior",defaultValue:true}},defaultAggregation:"items",aggregations:{items:{type:"sap.ui.core.Item",multiple:true,singularName:"item",bindable:"bindable"},picker:{type:"sap.ui.core.PopupInterface",multiple:false,visibility:"hidden"}},associations:{selectedItem:{type:"sap.ui.core.Item",multiple:false},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{change:{parameters:{selectedItem:{type:"sap.ui.core.Item"}}}},designtime:true}});a.insertFontFaceStyle();E.apply(b.prototype,[true]);function h(i){if(i){this.setSelection(i);this.setValue(i.getText());this.scrollToItem(i);}}b.prototype._handleFocusout=function(){this._bFocusoutDueRendering=this._bRenderingPhase;if(this._bFocusoutDueRendering){this._bProcessChange=false;return;}if(this._bProcessChange){this._checkSelectionChange();this._bProcessChange=false;}else{this._bProcessChange=true;}};b.prototype._checkSelectionChange=function(){var i=this.getSelectedItem();if(this._oSelectionOnFocus!==i){this.fireChange({selectedItem:i});}};b.prototype._getSelectedItemText=function(i){i=i||this.getSelectedItem();if(!i){i=this.getDefaultSelectedItem();}if(i){return i.getText();}return"";};b.prototype._callMethodInControl=function(f,A){var L=this.getList();if(A[0]==="items"){if(L){return S.prototype[f].apply(L,A);}}else{return C.prototype[f].apply(this,A);}};b.prototype.findFirstEnabledItem=function(i){var L=this.getList();return L?L.findFirstEnabledItem(i):null;};b.prototype.findLastEnabledItem=function(i){var L=this.getList();return L?L.findLastEnabledItem(i):null;};b.prototype.setSelectedIndex=function(i,_){var o;_=_||this.getItems();i=(i>_.length-1)?_.length-1:Math.max(0,i);o=_[i];if(o){this.setSelection(o);}};b.prototype.scrollToItem=function(i){var p=this.getPicker(),o=p.getDomRef("cont"),c=i&&i.getDomRef();if(!p||!o||!c){return;}var d=o.scrollTop,e=c.offsetTop,f=o.clientHeight,g=c.offsetHeight;if(d>e){o.scrollTop=e;}else if((e+g)>(d+f)){o.scrollTop=Math.ceil(e+g-f);}};b.prototype.setValue=function(v){this.$("label").text(v);};b.prototype._isRequiredSelectElement=function(){if(this.getAutoAdjustWidth()){return false;}else if(this.getWidth()==="auto"){return true;}return false;};b.prototype._handleAriaActiveDescendant=function(i){var d=this.getDomRef(),o=i&&i.getDomRef(),A="aria-activedescendant";if(!d){return;}if(o&&this.isOpen()){d.setAttribute(A,i.getId());}else{d.removeAttribute(A);}};b.prototype.getList=function(){if(this.bIsDestroyed){return null;}return this._oList;};b.prototype.updateItems=function(r){S.prototype.updateItems.apply(this,arguments);this._oSelectionOnFocus=this.getSelectedItem();};b.prototype.refreshItems=function(){S.prototype.refreshItems.apply(this,arguments);};b.prototype.onBeforeOpen=function(){var p=this["_onBeforeOpen"+this.getPickerType()];this.addStyleClass(this.getRenderer().CSS_CLASS+"Pressed");this.addContent();p&&p.call(this);};b.prototype.onAfterOpen=function(){var d=this.getFocusDomRef(),i=null;if(!d){return;}i=this.getSelectedItem();d.setAttribute("aria-expanded","true");d.setAttribute("aria-owns",this.getList().getId());if(i){d.setAttribute("aria-activedescendant",i.getId());}};b.prototype.onBeforeClose=function(){var d=this.getFocusDomRef();if(d){d.removeAttribute("aria-owns");d.removeAttribute("aria-activedescendant");}this.removeStyleClass(this.getRenderer().CSS_CLASS+"Pressed");};b.prototype.onAfterClose=function(){var d=this.getFocusDomRef();if(d){d.setAttribute("aria-expanded","false");d.removeAttribute("aria-owns");}};b.prototype.getPicker=function(){if(this.bIsDestroyed){return null;}return this.createPicker(this.getPickerType());};b.prototype.setPickerType=function(p){this._sPickerType=p;};b.prototype.getPickerType=function(){return this._sPickerType;};b.prototype._createPopover=function(){var t=this;var p=new P({showArrow:false,showHeader:false,placement:sap.m.PlacementType.VerticalPreferredBottom,offsetX:0,offsetY:0,initialFocus:this,bounce:false});p.addEventDelegate({ontouchstart:function(e){var o=this.getDomRef("cont");if((e.target===o)||(e.srcControl instanceof sap.ui.core.Item)){t._bProcessChange=false;}}},p);this._decoratePopover(p);return p;};b.prototype._decoratePopover=function(p){var t=this;p.open=function(){return this.openBy(t);};};b.prototype._onBeforeRenderingPopover=function(){var p=this.getPicker(),w=(this.$().outerWidth()/parseFloat(sap.m.BaseFontSize))+"rem";if(p){p.setContentMinWidth(w);}};b.prototype._createDialog=function(){var c=this.getRenderer().CSS_CLASS;var d=new D({stretch:true,customHeader:new B({contentLeft:new I({width:"100%",editable:false}).addStyleClass(c+"Input")}).addStyleClass(c+"Bar")});d.getAggregation("customHeader").attachBrowserEvent("tap",function(){d.close();},this);return d;};b.prototype._onBeforeOpenDialog=function(){var i=this.getPicker().getCustomHeader().getContentLeft()[0],s=this.getSelectedItem();if(s){i.setValue(s.getText());i.setTextDirection(this.getTextDirection());i.setTextAlign(this.getTextAlign());}};b.prototype.init=function(){this.setPickerType(sap.ui.Device.system.phone?"Dialog":"Popover");this.createPicker(this.getPickerType());this._oSelectionOnFocus=null;this._bRenderingPhase=false;this._bFocusoutDueRendering=false;this._bProcessChange=false;this.sTypedChars="";this.iTypingTimeoutID=-1;};b.prototype.onBeforeRendering=function(){this._bRenderingPhase=true;if(sap.ui.Device.browser.firefox&&(this.getFocusDomRef()===document.activeElement)){this._handleFocusout();}this.synchronizeSelection();};b.prototype.onAfterRendering=function(){this._bRenderingPhase=false;};b.prototype.exit=function(){this._oSelectionOnFocus=null;};b.prototype.ontouchstart=function(e){e.setMarked();if(this.getEnabled()&&this.isOpenArea(e.target)){this.addStyleClass(this.getRenderer().CSS_CLASS+"Pressed");}};b.prototype.ontouchend=function(e){e.setMarked();if(this.getEnabled()&&!this.isOpen()&&this.isOpenArea(e.target)){this.removeStyleClass(this.getRenderer().CSS_CLASS+"Pressed");}};b.prototype.ontap=function(e){var c=this.getRenderer().CSS_CLASS;e.setMarked();if(!this.getEnabled()){return;}if(this.isOpenArea(e.target)){if(this.isOpen()){this.close();this.removeStyleClass(c+"Pressed");return;}this.open();}if(this.isOpen()){this.addStyleClass(c+"Pressed");}};b.prototype.onSelectionChange=function(c){var i=c.getParameter("selectedItem");this.close();this.setSelection(i);this.fireChange({selectedItem:i});this.setValue(this._getSelectedItemText());};b.prototype.onkeypress=function(e){if(!this.getEnabled()){return;}e.setMarked();var t=String.fromCharCode(e.which),s=this.getSelectedItem(),T=t,i=null;this.sTypedChars+=t;if((s&&q.sap.startsWithIgnoreCase(s.getText(),this.sTypedChars))||((this.sTypedChars.length===1)||((this.sTypedChars.length>1)&&(this.sTypedChars.charAt(0)!==this.sTypedChars.charAt(1))))){T=this.sTypedChars;}i=this.searchNextItemByText(T);clearTimeout(this.iTypingTimeoutID);this.iTypingTimeoutID=setTimeout(function(){this.sTypedChars="";this.iTypingTimeoutID=-1;}.bind(this),1000);h.call(this,i);};b.prototype.onsapshow=function(e){if(!this.getEnabled()){return;}e.setMarked();if(e.which===q.sap.KeyCodes.F4){e.preventDefault();}this.toggleOpenState();};b.prototype.onsaphide=b.prototype.onsapshow;b.prototype.onsapescape=function(e){if(!this.getEnabled()){return;}if(this.isOpen()){e.setMarked();this.close();this._checkSelectionChange();}};b.prototype.onsapenter=function(e){if(!this.getEnabled()){return;}e.setMarked();this.close();this._checkSelectionChange();};b.prototype.onsapspace=function(e){if(!this.getEnabled()){return;}e.setMarked();e.preventDefault();if(this.isOpen()){this._checkSelectionChange();}this.toggleOpenState();};b.prototype.onsapdown=function(e){if(!this.getEnabled()){return;}e.setMarked();e.preventDefault();var n,s=this.getSelectableItems();n=s[s.indexOf(this.getSelectedItem())+1];h.call(this,n);};b.prototype.onsapup=function(e){if(!this.getEnabled()){return;}e.setMarked();e.preventDefault();var p,s=this.getSelectableItems();p=s[s.indexOf(this.getSelectedItem())-1];h.call(this,p);};b.prototype.onsaphome=function(e){if(!this.getEnabled()){return;}e.setMarked();e.preventDefault();var f=this.getSelectableItems()[0];h.call(this,f);};b.prototype.onsapend=function(e){if(!this.getEnabled()){return;}e.setMarked();e.preventDefault();var L=this.findLastEnabledItem(this.getSelectableItems());h.call(this,L);};b.prototype.onsappagedown=function(e){if(!this.getEnabled()){return;}e.setMarked();e.preventDefault();var s=this.getSelectableItems(),o=this.getSelectedItem();this.setSelectedIndex(s.indexOf(o)+10,s);o=this.getSelectedItem();if(o){this.setValue(o.getText());}this.scrollToItem(o);};b.prototype.onsappageup=function(e){if(!this.getEnabled()){return;}e.setMarked();e.preventDefault();var s=this.getSelectableItems(),o=this.getSelectedItem();this.setSelectedIndex(s.indexOf(o)-10,s);o=this.getSelectedItem();if(o){this.setValue(o.getText());}this.scrollToItem(o);};b.prototype.onfocusin=function(e){if(!this._bFocusoutDueRendering&&!this._bProcessChange){this._oSelectionOnFocus=this.getSelectedItem();}this._bProcessChange=true;if(e.target!==this.getFocusDomRef()){this.focus();}};b.prototype.onfocusout=function(){this._handleFocusout();};b.prototype.onsapfocusleave=function(e){var p=this.getAggregation("picker");if(!e.relatedControlId||!p){return;}var c=sap.ui.getCore().byId(e.relatedControlId),f=c&&c.getFocusDomRef();if(sap.ui.Device.system.desktop&&q.sap.containsOrEquals(p.getFocusDomRef(),f)){this.focus();}};b.prototype.setSelection=function(i){var L=this.getList(),k;if(L){L.setSelection(i);}this.setAssociation("selectedItem",i,true);this.setProperty("selectedItemId",(i instanceof sap.ui.core.Item)?i.getId():i,true);if(typeof i==="string"){i=sap.ui.getCore().byId(i);}k=i?i.getKey():"";this.setProperty("selectedKey",k,true);this._handleAriaActiveDescendant(i);};b.prototype.isSelectionSynchronized=function(){var i=this.getSelectedItem();return this.getSelectedKey()===(i&&i.getKey());};b.prototype.synchronizeSelection=function(){S.prototype.synchronizeSelection.apply(this,arguments);};b.prototype.addContent=function(p){};b.prototype.createPicker=function(p){var o=this.getAggregation("picker"),c=this.getRenderer().CSS_CLASS;if(o){return o;}o=this["_create"+p]();this.setAggregation("picker",o,true);o.setHorizontalScrolling(false).addStyleClass(c+"Picker").addStyleClass(c+"Picker-CTX").attachBeforeOpen(this.onBeforeOpen,this).attachAfterOpen(this.onAfterOpen,this).attachBeforeClose(this.onBeforeClose,this).attachAfterClose(this.onAfterClose,this).addEventDelegate({onBeforeRendering:this.onBeforeRenderingPicker,onAfterRendering:this.onAfterRenderingPicker},this).addContent(this.createList());return o;};b.prototype.searchNextItemByText=function(t){var c=this.getItems(),s=this.getSelectedIndex(),d=c.splice(s+1,c.length-s),e=c.splice(0,c.length-1);c=d.concat(e);for(var i=0,o;i<c.length;i++){o=c[i];if(o.getEnabled()&&!(o instanceof sap.ui.core.SeparatorItem)&&q.sap.startsWithIgnoreCase(o.getText(),t)){return o;}}return null;};b.prototype.createList=function(){var L=sap.m.SelectListKeyboardNavigationMode,k=sap.ui.Device.system.phone?L.Delimited:L.None;this._oList=new S({width:"100%",keyboardNavigationMode:k}).addEventDelegate({ontap:function(e){this.close();}},this).attachSelectionChange(this.onSelectionChange,this);return this._oList;};b.prototype.hasContent=function(){return this.getItems().length>0;};b.prototype.onBeforeRenderingPicker=function(){var o=this["_onBeforeRendering"+this.getPickerType()];o&&o.call(this);};b.prototype.onAfterRenderingPicker=function(){var o=this["_onAfterRendering"+this.getPickerType()];o&&o.call(this);};b.prototype.open=function(){var p=this.getPicker();if(p){p.open();}return this;};b.prototype.toggleOpenState=function(){if(this.isOpen()){this.close();}else{this.open();}return this;};b.prototype.getVisibleItems=function(){var L=this.getList();return L?L.getVisibleItems():[];};b.prototype.isItemSelected=function(i){return i&&(i.getId()===this.getAssociation("selectedItem"));};b.prototype.getSelectedIndex=function(){var s=this.getSelectedItem();return s?this.indexOfItem(this.getSelectedItem()):-1;};b.prototype.getDefaultSelectedItem=function(i){return this.getForceSelection()?this.findFirstEnabledItem():null;};b.prototype.getSelectableItems=function(){var L=this.getList();return L?L.getSelectableItems():[];};b.prototype.getOpenArea=function(){return this.getDomRef();};b.prototype.isOpenArea=function(d){var o=this.getOpenArea();return o&&o.contains(d);};b.prototype.findItem=function(p,v){var L=this.getList();return L?L.findItem(p,v):null;};b.prototype.clearSelection=function(){this.setSelection(null);};b.prototype.onItemChange=function(c){var s=this.getAssociation("selectedItem"),n=c.getParameter("newValue"),p=c.getParameter("name");if(s===c.getParameter("id")){switch(p){case"text":this.setValue(n);break;case"key":if(!this.isBound("selectedKey")){this.setSelectedKey(n);}break;}}};b.prototype.fireChange=function(p){this._oSelectionOnFocus=p.selectedItem;return this.fireEvent("change",p);};b.prototype.addAggregation=function(A,o,s){this._callMethodInControl("addAggregation",arguments);if(A==="items"&&!s&&!this.isInvalidateSuppressed()){this.invalidate(o);}return this;};b.prototype.getAggregation=function(){return this._callMethodInControl("getAggregation",arguments);};b.prototype.setAssociation=function(A,i,s){var L=this.getList();if(L&&(A==="selectedItem")){S.prototype.setAssociation.apply(L,arguments);}return C.prototype.setAssociation.apply(this,arguments);};b.prototype.indexOfAggregation=function(){return this._callMethodInControl("indexOfAggregation",arguments);};b.prototype.insertAggregation=function(){this._callMethodInControl("insertAggregation",arguments);return this;};b.prototype.removeAggregation=function(){return this._callMethodInControl("removeAggregation",arguments);};b.prototype.removeAllAggregation=function(){return this._callMethodInControl("removeAllAggregation",arguments);};b.prototype.destroyAggregation=function(A,s){this._callMethodInControl("destroyAggregation",arguments);if(!s&&!this.isInvalidateSuppressed()){this.invalidate();}return this;};b.prototype.setProperty=function(p,v,s){var L=this.getList();if((p==="selectedKey")||(p==="selectedItemId")){L&&S.prototype.setProperty.apply(L,arguments);}return C.prototype.setProperty.apply(this,arguments);};b.prototype.removeAllAssociation=function(A,s){var L=this.getList();if(L&&(A==="selectedItem")){S.prototype.removeAllAssociation.apply(L,arguments);}return C.prototype.removeAllAssociation.apply(this,arguments);};b.prototype.clone=function(){var s=C.prototype.clone.apply(this,arguments),L=this.getList(),o=this.getSelectedItem(),c=this.getSelectedKey();if(!this.isBound("items")&&L){for(var i=0,d=L.getItems();i<d.length;i++){s.addItem(d[i].clone());}}if(!this.isBound("selectedKey")&&!s.isSelectionSynchronized()){if(o&&(c==="")){s.setSelectedIndex(this.indexOfItem(o));}else{s.setSelectedKey(c);}}return s;};b.prototype.addItem=function(i){this.addAggregation("items",i);if(i){i.attachEvent("_change",this.onItemChange,this);}return this;};b.prototype.insertItem=function(i,c){this.insertAggregation("items",i,c);if(i){i.attachEvent("_change",this.onItemChange,this);}return this;};b.prototype.findAggregatedObjects=function(){var L=this.getList();if(L){return S.prototype.findAggregatedObjects.apply(L,arguments);}return[];};b.prototype.getItems=function(){var L=this.getList();return L?L.getItems():[];};b.prototype.setSelectedItem=function(i){if(typeof i==="string"){this.setAssociation("selectedItem",i,true);i=sap.ui.getCore().byId(i);}if(!(i instanceof sap.ui.core.Item)&&i!==null){return this;}if(!i){i=this.getDefaultSelectedItem();}this.setSelection(i);this.setValue(this._getSelectedItemText(i));return this;};b.prototype.setSelectedItemId=function(i){i=this.validateProperty("selectedItemId",i);if(!i){i=this.getDefaultSelectedItem();}this.setSelection(i);this.setValue(this._getSelectedItemText());return this;};b.prototype.setSelectedKey=function(k){k=this.validateProperty("selectedKey",k);var d=(k==="");if(!this.getForceSelection()&&d){this.setSelection(null);this.setValue("");return this;}var i=this.getItemByKey(k);if(i||d){if(!i&&d){i=this.getDefaultSelectedItem();}this.setSelection(i);this.setValue(this._getSelectedItemText(i));return this;}return this.setProperty("selectedKey",k);};b.prototype.getItemAt=function(i){return this.getItems()[+i]||null;};b.prototype.getSelectedItem=function(){var s=this.getAssociation("selectedItem");return(s===null)?null:sap.ui.getCore().byId(s)||null;};b.prototype.getFirstItem=function(){return this.getItems()[0]||null;};b.prototype.getLastItem=function(){var i=this.getItems();return i[i.length-1]||null;};b.prototype.getEnabledItems=function(i){var L=this.getList();return L?L.getEnabledItems(i):[];};b.prototype.getItemByKey=function(k){var L=this.getList();return L?L.getItemByKey(k):null;};b.prototype.removeItem=function(i){var L=this.getList(),o;i=L?L.removeItem(i):null;if(this.getItems().length===0){this.clearSelection();}else if(this.isItemSelected(i)){o=this.findFirstEnabledItem();if(o){this.setSelection(o);}}this.setValue(this._getSelectedItemText());if(i){i.detachEvent("_change",this.onItemChange,this);}return i;};b.prototype.removeAllItems=function(){var L=this.getList(),c=L?L.removeAllItems():[];this.setValue("");if(this._isRequiredSelectElement()){this.$("select").children().remove();}for(var i=0;i<c.length;i++){c[i].detachEvent("_change",this.onItemChange,this);}return c;};b.prototype.destroyItems=function(){var L=this.getList();if(L){L.destroyItems();}this.setValue("");if(this._isRequiredSelectElement()){this.$("select").children().remove();}return this;};b.prototype.isOpen=function(){var p=this.getAggregation("picker");return!!(p&&p.isOpen());};b.prototype.close=function(){var p=this.getAggregation("picker");if(p){p.close();}return this;};b.prototype.getAccessibilityInfo=function(){var i={role:this.getRenderer().getAriaRole(this),focusable:this.getEnabled(),enabled:this.getEnabled()};if(this.getType()==="IconOnly"){var d=this.getTooltip_AsString();if(!d){var o=a.getIconInfo(this.getIcon());d=o&&o.text?o.text:"";}i.type=sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("ACC_CTR_TYPE_BUTTON");i.description=d;}else if(this.getType()==="Default"){i.type=sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("ACC_CTR_TYPE_COMBO");i.description=this._getSelectedItemText();}return i;};return b;},true);
