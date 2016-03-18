/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./BindingParser','./DataType','./EventProvider','./ManagedObjectMetadata','../model/BindingMode','../model/CompositeBinding','../model/Context','../model/FormatException','../model/ListBinding','../model/Model','../model/ParseException','../model/TreeBinding','../model/Type','../model/ValidateException','jquery.sap.act','jquery.sap.script','jquery.sap.strings'],function(q,B,D,E,M,b,C,c,F,L,d,P,T,f,V){"use strict";var g=E.extend("sap.ui.base.ManagedObject",{metadata:{"abstract":true,publicMethods:["getId","getMetadata","getModel","setModel","hasModel","bindProperty","unbindProperty","bindAggregation","unbindAggregation","bindObject","unbindObject","getObjectBinding"],library:"sap.ui.core",properties:{},aggregations:{},associations:{},events:{"validationSuccess":{enableEventBubbling:true,parameters:{element:{type:'sap.ui.base.ManagedObject'},property:{type:'string'},type:{type:'sap.ui.model.Type'},newValue:{type:'any'},oldValue:{type:'any'}}},"validationError":{enableEventBubbling:true,parameters:{element:{type:'sap.ui.base.ManagedObject'},property:{type:'string'},type:{type:'sap.ui.model.Type'},newValue:{type:'any'},oldValue:{type:'any'},message:{type:'string'}}},"parseError":{enableEventBubbling:true,parameters:{element:{type:'sap.ui.base.ManagedObject'},property:{type:'string'},type:{type:'sap.ui.model.Type'},newValue:{type:'any'},oldValue:{type:'any'},message:{type:'string'}}},"formatError":{enableEventBubbling:true,parameters:{element:{type:'sap.ui.base.ManagedObject'},property:{type:'string'},type:{type:'sap.ui.model.Type'},newValue:{type:'any'},oldValue:{type:'any'}}}},specialSettings:{id:true,models:true,bindingContexts:true,objectBindings:true,Type:true}},constructor:function(i,s,S){E.call(this);if(typeof(i)!="string"&&arguments.length>0){S=s;s=i;if(s&&s.id){i=s["id"];}else{i=null;}}if(!i){i=this.getMetadata().uid()||q.sap.uid();}else{var p=g._fnIdPreprocessor;i=(p?p.call(this,i):i);var t=D.getType("sap.ui.core.ID");if(!t.isValid(i)){throw new Error("\""+i+"\" is not a valid ID.");}}this.sId=i;this.mProperties=this.getMetadata().createPropertyBag();this.mAggregations={};this.mAssociations={};this.mMethods={};this.oParent=null;this.aDelegates=[];this.aBeforeDelegates=[];this.iSuppressInvalidate=0;this.oPropagatedProperties={oModels:{},oBindingContexts:{}};this.mSkipPropagation={};this.oModels={};this.oBindingContexts={};this.mElementBindingContexts={};this.mBindingInfos={};this.sBindingPath=null;this.mBindingParameters=null;this.mBoundObjects={};this._sOwnerId=g._sOwnerId;try{if(this.register){this.register();}if(this._initCompositeSupport){this._initCompositeSupport(s);}if(this.init){this.init();}this.applySettings(s,S);}catch(e){if(this.deregister){this.deregister();}throw e;}}},M);g.create=function(v,k,s){if(!v||v instanceof g||typeof v!=="object"||v instanceof String){return v;}function a(t){if(typeof t==="function"){return t;}if(typeof t==="string"){return q.sap.getObject(t);}}var e=a(v.Type)||a(k&&k.type);if(typeof e==="function"){return new e(v,s);}var m="Don't know how to create a ManagedObject from "+v+" ("+(typeof v)+")";q.sap.log.fatal(m);throw new Error(m);};g._fnIdPreprocessor=null;g._fnSettingsPreprocessor=null;g.runWithPreprocessors=function(a,p){var o={id:this._fnIdPreprocessor,settings:this._fnSettingsPreprocessor};p=p||{};this._fnIdPreprocessor=p.id;this._fnSettingsPreprocessor=p.settings;try{var r=a.call();this._fnIdPreprocessor=o.id;this._fnSettingsPreprocessor=o.settings;return r;}catch(e){this._fnIdPreprocessor=o.id;this._fnSettingsPreprocessor=o.settings;throw e;}};g.prototype.applySettings=function(s,S){if(!s||q.isEmptyObject(s)){return this;}var t=this,m=this.getMetadata(),v=m.getJSONKeys(),a=g.create,p=g._fnSettingsPreprocessor,k,o,K;function e(O){for(var i=0,n=O.length;i<n;i++){var r=O[i];if(q.isArray(r)){e(r);}else{t[K._sMutator](a(r,K,S));}}}p&&p.call(this,s);if(s.models){if(typeof s.models!=="object"){throw new Error("models must be a simple object");}if(s.models instanceof d){this.setModel(s.models);}else{for(k in s.models){this.setModel(s.models[k],k==="undefined"?undefined:k);}}delete s.models;}if(s.bindingContexts){if(typeof s.bindingContexts!=="object"){throw new Error("bindingContexts must be a simple object");}if(s.bindingContexts instanceof c){this.setBindingContext(s.bindingContexts);}else{for(k in s.bindingContexts){this.setBindingContext(s.bindingContexts[k],k==="undefined"?undefined:k);}}delete s.bindingContexts;}if(s.objectBindings){if(typeof s.objectBindings!=="string"&&typeof s.objectBindings!=="object"){throw new Error("binding must be a string or simple object");}if(typeof s.objectBindings==="string"||s.objectBindings.path){this.bindObject(s.objectBindings);}else{for(var k in s.objectBindings){s.objectBindings.model=k;this.bindObject(s.objectBindings[k]);}}delete s.objectBindings;}for(k in s){o=s[k];if((K=v[k])!==undefined){var j;switch(K._iKind){case 0:j=this.extractBindingInfo(o,S);if(j&&typeof j==="object"){this.bindProperty(k,j);}else{this[K._sMutator](j||o);}break;case 1:j=K.altTypes&&this.extractBindingInfo(o,S);if(j&&typeof j==="object"){this.bindProperty(k,j);}else{if(q.isArray(o)){if(o.length>1){q.sap.log.error("Tried to add an array of controls to a single aggregation");}o=o[0];}this[K._sMutator](a(j||o,K,S));}break;case 2:j=this.extractBindingInfo(o,S);if(j&&typeof j==="object"){this.bindAggregation(k,j);}else{o=j||o;if(o){e(q.isArray(o)?o:[o]);}}break;case 3:this[K._sMutator](o);break;case 4:if(o&&!q.isArray(o)){o=[o];}if(o){for(var i=0,l=o.length;i<l;i++){this[K._sMutator](o[i]);}}break;case 5:if(typeof o=="function"){this[K._sMutator](o);}else{this[K._sMutator](o[0],o[1],o[2]);}break;case-1:default:break;}}else{}}return this;};g.prototype.toString=function(){return"ManagedObject "+this.getMetadata().getName()+"#"+this.getId();};g.prototype.getId=function(){return this.sId;};g.prototype.setProperty=function(p,v,s){var o=this.mProperties[p];v=this.validateProperty(p,v);if(q.sap.equal(o,v)){return this;}if(s){q.sap.act.refresh();this.iSuppressInvalidate++;}this.mProperties[p]=v;if(!this.isInvalidateSuppressed()){this.invalidate();}this.updateModelProperty(p,v,o);E.prototype.fireEvent.call(this,"_change",{"id":this.getId(),"name":p,"oldValue":o,"newValue":v});if(s){this.iSuppressInvalidate--;}return this;};g.prototype.getProperty=function(p){var v=this.mProperties[p],o=this.getMetadata().getProperty(p),t;if(!o){throw new Error("Property \""+p+"\" does not exist in "+this);}t=D.getType(o.type);if(t instanceof D&&t.isArrayType()&&q.isArray(v)){v=v.slice(0);}if(v instanceof String){v=v.valueOf();}return v;};g.prototype.validateProperty=function(p,v){var o=this.getMetadata().getProperty(p),t;if(!o){throw new Error("Property \""+p+"\" does not exist in "+this);}t=D.getType(o.type);if(t instanceof D&&t.isArrayType()&&q.isArray(v)){v=v.slice(0);}if(v===null||v===undefined){if(o.defaultValue!==null){v=o.defaultValue;}else{v=t.getDefaultValue();}}else if(t instanceof D){if(t.getName()=="string"){if(!(typeof v=="string"||v instanceof String)){v=""+v;}}else if(t.getName()=="string[]"){if(typeof v=="string"){v=[v];}if(!q.isArray(v)){throw new Error("\""+v+"\" is of type "+typeof v+", expected string[]"+" for property \""+p+"\" of "+this);}for(var i=0;i<v.length;i++){if(!typeof v[i]=="string"){v[i]=""+v[i];}}}else if(!t.isValid(v)){throw new Error("\""+v+"\" is of type "+typeof v+", expected "+t.getName()+" for property \""+p+"\" of "+this);}}if(t&&t.normalize&&typeof t.normalize==="function"){v=t.normalize(v);}return v;};g.prototype.getOriginInfo=function(p){var v=this.mProperties[p];if(!(v instanceof String&&v.originInfo)){return null;}return v.originInfo;};g.prototype.setAssociation=function(a,i,s){if(i instanceof g){i=i.getId();}else if(i!=null&&typeof i!=="string"){return this;}if(this.mAssociations[a]===i){return this;}if(s){this.iSuppressInvalidate++;}this.mAssociations[a]=i;if(!this.isInvalidateSuppressed()){this.invalidate();}if(s){this.iSuppressInvalidate--;}return this;};g.prototype.getAssociation=function(a,o){var r=this.mAssociations[a];if(!r){r=this.mAssociations[a]=o||null;}else{if(typeof r.length==='number'&&!(r.propertyIsEnumerable('length'))){return r.slice();}return r;}return r;};g.prototype.addAssociation=function(a,i,s){if(i instanceof g){i=i.getId();}else if(typeof i!=="string"){return this;}if(s){this.iSuppressInvalidate++;}var I=this.mAssociations[a];if(!I){I=this.mAssociations[a]=[i];}else{I.push(i);}if(!this.isInvalidateSuppressed()){this.invalidate();}if(s){this.iSuppressInvalidate--;}return this;};g.prototype.removeAssociation=function(a,o,s){var I=this.mAssociations[a];var e=null;if(!I){return null;}if(s){this.iSuppressInvalidate++;}if(typeof(o)=="object"&&o.getId){o=o.getId();}if(typeof(o)=="string"){for(var i=0;i<I.length;i++){if(I[i]==o){o=i;break;}}}if(typeof(o)=="number"){if(o<0||o>=I.length){q.sap.log.warning("ManagedObject.removeAssociation called with invalid index: "+a+", "+o);}else{e=I[o];I.splice(o,1);if(!this.isInvalidateSuppressed()){this.invalidate();}}}if(s){this.iSuppressInvalidate--;}return e;};g.prototype.removeAllAssociation=function(a,s){var i=this.mAssociations[a];if(!i){return[];}if(s){this.iSuppressInvalidate++;}delete this.mAssociations[a];if(!this.isInvalidateSuppressed()){this.invalidate();}if(s){this.iSuppressInvalidate--;}return i;};g.prototype.validateAggregation=function(a,o,m){var e=this.getMetadata(),A=e.getManagedAggregation(a),j,t,i,k;if(!A){throw new Error("Aggregation \""+a+"\" does not exist in "+this);}if(A.multiple!==m){throw new Error("Aggregation '"+a+"' of "+this+" used with wrong cardinality (declared as "+(A.multiple?"0..n":"0..1")+")");}if(!A.multiple&&!o){return o;}t=q.sap.getObject(A.type);if(typeof t==="function"&&o instanceof t){return o;}if(o&&o.getMetadata&&o.getMetadata().isInstanceOf(A.type)){return o;}j=A.altTypes;if(j&&j.length){if(o==null){return o;}for(i=0;i<j.length;i++){t=D.getType(j[i]);if(t instanceof D){if(t.isValid(o)){return o;}}}}k="\""+o+"\" is not valid for aggregation \""+a+"\" of "+this;if(D.isInterfaceType(A.type)){return o;}else{throw new Error(k);}};g.prototype.setAggregation=function(a,o,s){var O=this.mAggregations[a];if(O===o){return this;}o=this.validateAggregation(a,o,false);if(s){this.iSuppressInvalidate++;}if(O instanceof g){O.setParent(null);}this.mAggregations[a]=o;if(o instanceof g){o.setParent(this,a,s);}else{if(!this.isInvalidateSuppressed()){this.invalidate();}}if(s){this.iSuppressInvalidate--;}return this;};g.prototype.getAggregation=function(a,o){var e=this.mAggregations[a];if(!e){e=this.mAggregations[a]=o||null;}if(e){if(typeof e.length==='number'&&!(e.propertyIsEnumerable('length'))){return e.slice();}return e;}else{return null;}};g.prototype.indexOfAggregation=function(a,o){var e=this.mAggregations[a];if(e){if(e.length==undefined){return-2;}for(var i=0;i<e.length;i++){if(e[i]==o){return i;}}}return-1;};g.prototype.insertAggregation=function(a,o,I,s){if(!o){return this;}o=this.validateAggregation(a,o,true);var e=this.mAggregations[a]||(this.mAggregations[a]=[]);var i;if(I<0){i=0;}else if(I>e.length){i=e.length;}else{i=I;}if(i!==I){q.sap.log.warning("ManagedObject.insertAggregation: index '"+I+"' out of range [0,"+e.length+"], forced to "+i);}e.splice(i,0,o);o.setParent(this,a,s);return this;};g.prototype.addAggregation=function(a,o,s){if(!o){return this;}o=this.validateAggregation(a,o,true);var e=this.mAggregations[a];if(!e){e=this.mAggregations[a]=[o];}else{e.push(o);}o.setParent(this,a,s);return this;};g.prototype.removeAggregation=function(a,o,s){var e=this.mAggregations[a],j=null,i;if(!e){return null;}if(s){this.iSuppressInvalidate++;}if(typeof(o)=="string"){for(i=0;i<e.length;i++){if(e[i]&&e[i].getId()===o){o=i;break;}}}if(typeof(o)=="object"){for(i=0;i<e.length;i++){if(e[i]==o){o=i;break;}}}if(typeof(o)=="number"){if(o<0||o>=e.length){q.sap.log.warning("ManagedObject.removeAggregation called with invalid index: "+a+", "+o);}else{j=e[o];e.splice(o,1);j.setParent(null);if(!this.isInvalidateSuppressed()){this.invalidate();}}}if(s){this.iSuppressInvalidate--;}return j;};g.prototype.removeAllAggregation=function(a,s){var e=this.mAggregations[a];if(!e){return[];}if(s){this.iSuppressInvalidate++;}delete this.mAggregations[a];for(var i=0;i<e.length;i++){e[i].setParent(null);}if(!this.isInvalidateSuppressed()){this.invalidate();}if(s){this.iSuppressInvalidate--;}return e;};g.prototype.destroyAggregation=function(a,s){var e=this.mAggregations[a],i,j;if(!e){return this;}if(s){this.iSuppressInvalidate++;}delete this.mAggregations[a];if(e instanceof g){e.destroy(s);}else if(q.isArray(e)){for(i=e.length-1;i>=0;i--){j=e[i];if(j){j.destroy(s);}}}if(!this.isInvalidateSuppressed()){this.invalidate();}if(s){this.iSuppressInvalidate--;}return this;};g.prototype.invalidate=function(){if(this.oParent){this.oParent.invalidate(this);}};g.prototype.isInvalidateSuppressed=function(){var i=this.iSuppressInvalidate>0;if(this.oParent&&this.oParent instanceof g){i=i||this.oParent.isInvalidateSuppressed();}return i;};g.prototype._removeChild=function(o,a,s){if(!a){q.sap.log.error("Cannot remove aggregated child without aggregation name.",null,this);}else{if(s){this.iSuppressInvalidate++;}var i=this.indexOfAggregation(a,o);var A=this.getMetadata().getAggregation(a);if(i==-2){if(A&&this[A._sMutator]){this[A._sMutator](null);}else{this.setAggregation(a,null,s);}}else if(i>-1){if(A&&this[A._sRemoveMutator]){this[A._sRemoveMutator](i);}else{this.removeAggregation(a,i,s);}}if(!this.isInvalidateSuppressed()){this.invalidate();}if(s){this.iSuppressInvalidate--;}}};g.prototype.setParent=function(p,a,s){if(!p){this.oParent=null;this.sParentAggregationName=null;this.oPropagatedProperties={oModels:{},oBindingContexts:{}};q.sap.act.refresh();return;}if(s){q.sap.act.refresh();this.iSuppressInvalidate++;}var o=this.getParent();if(o){o._removeChild(this,this.sParentAggregationName);}this.oParent=p;this.sParentAggregationName=a;this.oPropagatedProperties=p._getPropertiesToPropagate();if(this.hasModel()){this.updateBindingContext(false,true,undefined,true);this.updateBindings(true,null);this.propagateProperties(true);}if(p&&!this.isInvalidateSuppressed()){p.invalidate(this);}if(s){this.iSuppressInvalidate--;}return this;};g.prototype.getParent=function(){return this.oParent;};g.prototype.destroy=function(s){var t=this;if(s){this.iSuppressInvalidate++;}if(this.exit){this.exit();}if(this._exitCompositeSupport){this._exitCompositeSupport();}for(var a in this.mAggregations){this.destroyAggregation(a,s);}if(this.deregister){this.deregister();}if(this.oParent&&this.sParentAggregationName){this.oParent._removeChild(this,this.sParentAggregationName,s);}delete this.oParent;q.each(this.mBindingInfos,function(n,o){if(o.factory){t.unbindAggregation(n,true);}else{t.unbindProperty(n,true);}});q.each(this.mBoundObjects,function(n,o){t.unbindObject(n,true);});if(s){this.iSuppressInvalidate--;}sap.ui.getCore().getMessageManager().removeMessages(this._aMessages);this._aMessages=undefined;E.prototype.destroy.apply(this,arguments);this.setParent=function(){throw Error("The object with ID "+t.getId()+" was destroyed and cannot be used anymore.");};this.bIsDestroyed=true;};g.bindingParser=B.simpleParser;g.prototype.isBinding=function(v,k){return typeof this.extractBindingInfo(v)==="object";};g.prototype.extractBindingInfo=function(v,s){if(v&&typeof v==="object"){if(v.ui5object){delete v.ui5object;}else if(v.path!=undefined||v.parts){if(v.template){v.template=g.create(v.template);}return v;}}if(typeof v==="string"){return g.bindingParser(v,s,true);}};g.prototype.getBindingInfo=function(n){return this.mBindingInfos[n];};g.prototype.bindObject=function(p,m){var a={},s,S;if(typeof p=="object"){var o=p;p=o.path;m=o.parameters;s=o.model;a.events=o.events;}S=p.indexOf(">");a.sBindingPath=p;a.mBindingParameters=m;if(S>0){s=p.substr(0,S);a.sBindingPath=p.substr(S+1);}if(this.mBoundObjects[s]){this.unbindObject(s,true);}this.mBoundObjects[s]=a;if(this.getModel(s)){this._bindObject(s,a);}return this;};g.prototype._bindObject=function(m,o){var a,e,i,t=this;var j=function(k){if(a.getBoundContext()===t.getBindingContext(m)){t.setElementBindingContext(null,m);}t.setElementBindingContext(a.getBoundContext(),m);};i=this.getModel(m);e=this.getBindingContext(m);a=i.bindContext(o.sBindingPath,e,o.mBindingParameters);a.attachChange(j);o.binding=a;o.fChangeHandler=j;a.attachEvents(o.events);a.initialize();};g.prototype.bindContext=function(p){return this.bindObject(p);};g.prototype.unbindContext=function(m){return this.unbindObject(m);};g.prototype.unbindObject=function(m,_){var o=this.mBoundObjects[m];if(o){if(o.binding){o.binding.detachChange(o.fChangeHandler);o.binding.detachEvents(o.events);o.binding.destroy();}delete this.mBoundObjects[m];delete this.mElementBindingContexts[m];if(!_){this.updateBindingContext(false,false,m);}}return this;};g.prototype.bindProperty=function(n,o){var p,a,m,e,t,s,A=true,j=this,k=this.getMetadata().getPropertyLikeSetting(n);if(!k){throw new Error("Property \""+n+"\" does not exist in "+this);}if(typeof o=="string"){p=arguments[1];a=arguments[2];m=arguments[3];if(typeof a=="function"){e=a;}else if(a instanceof f){t=a;}o={formatter:e,parts:[{path:p,type:t,mode:m}]};}if(!o.parts){o.parts=[];o.parts[0]={path:o.path,type:o.type,formatOptions:o.formatOptions,constraints:o.constraints,model:o.model,mode:o.mode};delete o.path;delete o.mode;delete o.model;}q.each(o.parts,function(i,l){if(typeof l=="string"){l={path:l};o.parts[i]=l;}s=l.path.indexOf(">");if(s>0){l.model=l.path.substr(0,s);l.path=l.path.substr(s+1);}if(o.formatter&&l.mode!=b.OneWay&&l.mode!=b.OneTime){l.mode=b.OneWay;}if(!j.getModel(l.model)){A=false;}});if(this.isBound(n)){this.unbindProperty(n,true);}this.mBindingInfos[n]=o;if(A){this._bindProperty(n,o);}return this;};g.prototype._bindProperty=function(n,o){var m,a,e,s,j=b.TwoWay,t,k,p=this.getMetadata().getPropertyLikeSetting(n),I=p._iKind===0?p.type:p.altTypes[0],l=this,r=[],u=function(i){l.updateProperty(n);var w=e.getDataState();if(w){var x=w.getControlMessages();if(x&&x.length>0){var y=sap.ui.getCore().getMessageManager();w.setControlMessages([]);if(x){y.removeMessages(x);}}w.setInvalidValue(null);}if(e.getBindingMode()===b.OneTime&&e.isResolved()){e.detachChange(u);e.detachEvents(o.events);e.destroy();}},v=function(){var i=e.getDataState();if(!i){return;}if(l.refreshDataState){l.refreshDataState(n,i);}};a=this.getBindingContext(o.model);q.each(o.parts,function(i,w){a=l.getBindingContext(w.model);m=l.getModel(w.model);t=w.type;if(typeof t=="string"){k=q.sap.getObject(t);t=new k(w.formatOptions,w.constraints);}e=m.bindProperty(w.path,a,o.parameters);e.setType(t,I);e.setFormatter(w.formatter);s=w.mode||m.getDefaultBindingMode();e.setBindingMode(s);if(s!=b.TwoWay){j=b.OneWay;}r.push(e);});if(r.length>1||(o.formatter&&o.formatter.textFragments)){t=o.type;if(typeof t=="string"){k=q.sap.getObject(t);t=new k(o.formatOptions,o.constraints);}e=new C(r,o.useRawValues);e.setType(t,I);e.setBindingMode(o.mode||j);}else{e=r[0];}e.attachChange(u);if(this.refreshDataState){e.attachAggregatedDataStateChange(v);}e.setFormatter(q.proxy(o.formatter,this));o.binding=e;o.modelChangeHandler=u;o.dataStateChangeHandler=v;e.attachEvents(o.events);e.initialize();};g.prototype.unbindProperty=function(n,s){var o=this.mBindingInfos[n],p=this.getMetadata().getPropertyLikeSetting(n);if(o){if(o.binding){o.binding.detachChange(o.modelChangeHandler);if(this.refreshDataState){o.binding.detachAggregatedDataStateChange(o.dataStateChangeHandler);}o.binding.detachEvents(o.events);o.binding.destroy();}delete this.mBindingInfos[n];if(!s){this[p._sMutator](null);}}return this;};g.prototype.updateProperty=function(n){var o=this.mBindingInfos[n],a=o.binding,p=this.getMetadata().getPropertyLikeSetting(n);if(o.skipPropertyUpdate){return;}try{var v=a.getExternalValue();o.skipModelUpdate=true;this[p._sMutator](v);o.skipModelUpdate=false;}catch(e){o.skipModelUpdate=false;if(e instanceof F){this.fireFormatError({element:this,property:n,type:a.getType(),newValue:a.getValue(),oldValue:this[p._sGetter](),exception:e,message:e.message},false,true);o.skipModelUpdate=true;this[p._sMutator](null);o.skipModelUpdate=false;}else{throw e;}}};g.prototype.updateModelProperty=function(n,v,o){if(this.isBound(n)){var a=this.mBindingInfos[n],e=a.binding;if(a.skipModelUpdate){return;}if(e&&e.getBindingMode()==b.TwoWay){try{a.skipPropertyUpdate=true;e.setExternalValue(v);a.skipPropertyUpdate=false;var i=e.getExternalValue();if(v!=i){this.updateProperty(n);}if(e.hasValidation()){this.fireValidationSuccess({element:this,property:n,type:e.getType(),newValue:v,oldValue:o},false,true);}}catch(j){a.skipPropertyUpdate=false;if(j instanceof P){this.fireParseError({element:this,property:n,type:e.getType(),newValue:v,oldValue:o,exception:j,message:j.message},false,true);}else if(j instanceof V){this.fireValidationError({element:this,property:n,type:e.getType(),newValue:v,oldValue:o,exception:j,message:j.message},false,true);}else{throw j;}}}}};var h=1;g.prototype.bindAggregation=function(n,o){var p,t,s,a,m=this.getMetadata(),A=m.getAggregation(n);if(!A){throw new Error("Aggregation \""+n+"\" does not exist in "+this);}if(!A.multiple){q.sap.log.error("Binding of single aggregation \""+n+"\" of "+this+" is not supported!");}if(typeof o=="string"){p=arguments[1];t=arguments[2];s=arguments[3];a=arguments[4];o={path:p,sorter:s,filters:a};if(t instanceof g){o.template=t;}else if(typeof t==="function"){o.factory=t;}}if(this.isBound(n)){this.unbindAggregation(n);}if(!(o.template||o.factory)){if(A._doesNotRequireFactory){o.factory=function(){throw new Error("dummy factory called unexpectedly ");};}else{throw new Error("Missing template or factory function for aggregation "+n+" of "+this+" !");}}if(o.template){if(o.template._sapui_candidateForDestroy){q.sap.log.warning("A template was reused in a binding, but was already marked as candidate for destroy. You better should declare such a usage with templateShareable:true in the binding configuration.");delete o.template._sapui_candidateForDestroy;}if(o.templateShareable===undefined){o.templateShareable=h;}o.factory=function(i){return o.template.clone(i);};}var S=o.path.indexOf(">");if(S>0){o.model=o.path.substr(0,S);o.path=o.path.substr(S+1);}this.mBindingInfos[n]=o;if(this.getModel(o.model)){this._bindAggregation(n,o);}return this;};g.prototype._bindAggregation=function(n,o){var t=this,a,m=function(j){var u="update"+n.substr(0,1).toUpperCase()+n.substr(1);if(t[u]){var s=j&&j.getParameter("reason");if(s){t[u](s);}else{t[u]();}}else{t.updateAggregation(n);}},e=function(j){var r="refresh"+n.substr(0,1).toUpperCase()+n.substr(1);if(t[r]){t[r](j.getParameter("reason"));}else{m(j);}};var i=this.getModel(o.model);if(this.isTreeBinding(n)){a=i.bindTree(o.path,this.getBindingContext(o.model),o.filters,o.parameters,o.sorter);}else{a=i.bindList(o.path,this.getBindingContext(o.model),o.sorter,o.filters,o.parameters);}if(this.bUseExtendedChangeDetection===true){a.enableExtendedChangeDetection();}o.binding=a;o.modelChangeHandler=m;o.modelRefreshHandler=e;a.attachChange(m);a.attachRefresh(e);a.attachEvents(o.events);a.initialize();};g.prototype.unbindAggregation=function(n,s){var o=this.mBindingInfos[n],a=this.getMetadata().getAggregation(n);if(o){if(o.binding){o.binding.detachChange(o.modelChangeHandler);o.binding.detachRefresh(o.modelRefreshHandler);o.binding.detachEvents(o.events);o.binding.destroy();}if(o.template){if(!o.templateShareable&&o.template.destroy){o.template.destroy();}if(o.templateShareable===h){o.template._sapui_candidateForDestroy=true;}}delete this.mBindingInfos[n];if(!s){this[a._sDestructor]();}}return this;};g.prototype.updateAggregation=function(n){var o=this.mBindingInfos[n],a=o.binding,e=o.factory,A=this.getMetadata().getAggregation(n),G,j,k,s=A._sMutator+"Group",t=this;function u(p,k,r,v){var w=p[A._sGetter]()||[],x,y;if(w.length>k.length){for(var i=k.length;i<w.length;i++){p[A._sRemoveMutator](w[i]);w[i].destroy();}}for(var i=0;i<k.length;i++){x=k[i];y=w[i];if(r){r(x);}if(y){y.setBindingContext(x,o.model);}else{var I=p.getId()+"-"+i;y=e(I,x);y.setBindingContext(x,o.model);p[A._sMutator](y);}if(v){v(x,y);}}}function l(i){var N=a.getGroup(i);if(N.key!==G){var p;if(o.groupHeaderFactory){p=o.groupHeaderFactory(N);}t[s](N,p);G=N.key;}}function m(i,p){u(i,p,null,function(r,v){m(v,a.getNodeContexts(r));});}if(!o.template){this[A._sDestructor]();}if(a instanceof L){j=a.isGrouped()&&s;if(j||a.bWasGrouped){this[A._sDestructor]();}a.bWasGrouped=j;k=a.getContexts(o.startIndex,o.length);u(this,k,j?l:null);}else if(a instanceof T){m(this,a.getRootContexts());}};g.prototype.refreshAggregation=function(n){var o=this.mBindingInfos[n],a=o.binding;a.getContexts(o.startIndex,o.length);};g.prototype.propagateMessages=function(n,m){q.sap.log.warning("Message for "+this+", Property "+n);};g.prototype.isTreeBinding=function(n){return false;};g.prototype.updateBindings=function(u,m){var t=this;function a(o){var p=o.parts,i;if(p&&p.length>1){for(i=0;i<p.length;i++){if((u||p[i].model==m)&&!o.binding.aBindings[i].updateRequired(t.getModel(p[i].model))){return true;}}}else if(o.factory){return(u||o.model==m)&&!o.binding.updateRequired(t.getModel(o.model));}else{return(u||p[0].model==m)&&!o.binding.updateRequired(t.getModel(p[0].model));}return false;}function e(o){var p=o.parts,i;if(p){for(i=0;i<p.length;i++){if(!t.getModel(p[i].model)){return false;}}return true;}else if(o.factory){return!!t.getModel(o.model);}return false;}q.each(this.mBindingInfos,function(n,o){if(o.binding&&a(o)){o.binding.detachChange(o.modelChangeHandler);if(o.modelRefreshHandler){o.binding.detachRefresh(o.modelRefreshHandler);}o.binding.detachEvents(o.events);o.binding.destroy();delete o.binding;}if(!o.binding&&e(o)){if(o.factory){t._bindAggregation(n,o);}else{t._bindProperty(n,o);}}});};g.prototype.isBound=function(n){return(n in this.mBindingInfos);};g.prototype.getObjectBinding=function(m){return this.mBoundObjects[m]&&this.mBoundObjects[m].binding;};g.prototype.getEventingParent=function(){return this.oParent;};g.prototype.getBinding=function(n){return this.mBindingInfos[n]&&this.mBindingInfos[n].binding;};g.prototype.getBindingPath=function(n){var i=this.mBindingInfos[n];return i&&(i.path||(i.parts&&i.parts[0]&&i.parts[0].path));};g.prototype.setBindingContext=function(o,m){var O=this.oBindingContexts[m];if(O!==o){this.oBindingContexts[m]=o;this.updateBindingContext(false,true,m);this.propagateProperties(m);}return this;};g.prototype.setElementBindingContext=function(o,m){var O=this.mElementBindingContexts[m];if(O!==o){this.mElementBindingContexts[m]=o;this.updateBindingContext(true,true,m);this.propagateProperties(m);}return this;};g.prototype.updateBindingContext=function(s,S,a,u){var m,o={},e,j,k,t=this;if(u){for(e in this.oModels){if(this.oModels.hasOwnProperty(e)){o[e]=e;}}for(e in this.oPropagatedProperties.oModels){if(this.oPropagatedProperties.oModels.hasOwnProperty(e)){o[e]=e;}}}else{o[a]=a;}for(e in o){if(o.hasOwnProperty(e)){e=e==="undefined"?undefined:e;m=this.getModel(e);k=this.mBoundObjects[e];if(m&&k&&k.sBindingPath&&!s){if(!k.binding){this._bindObject(e,k);}else{j=this._getBindingContext(e);if(j!==k.binding.getContext()){k.binding.setContext(j);}}continue;}q.each(this.mBindingInfos,function(n,l){var p=l.binding;var r=l.parts,i;if(!p){return;}if(r&&r.length>1){for(i=0;i<r.length;i++){if(r[i].model==e){p.aBindings[i].setContext(t.getBindingContext(r[i].model));}}}else if(l.factory){if(l.model==e){p.setContext(t.getBindingContext(l.model));}}else{if(r[0].model==e){p.setContext(t.getBindingContext(r[0].model));}}});if(!S){var j=this.getBindingContext(e);for(var n in this.mAggregations){var A=this.mAggregations[n];if(A instanceof g){A.oPropagatedProperties.oBindingContexts[e]=j;A.updateBindingContext(false,false,e);}else if(A instanceof Array){for(var i=0;i<A.length;i++){A[i].oPropagatedProperties.oBindingContexts[e]=j;A[i].updateBindingContext(false,false,e);}}}}}}};g.prototype.getBindingContext=function(m){if(this.mElementBindingContexts[m]){return this.mElementBindingContexts[m];}return this._getBindingContext(m);};g.prototype._getBindingContext=function(m){var o=this.getModel(m);if(this.oBindingContexts[m]){return this.oBindingContexts[m];}else if(o&&this.oParent&&this.oParent.getModel(m)&&o!=this.oParent.getModel(m)){return undefined;}else{return this.oPropagatedProperties.oBindingContexts[m];}};g.prototype.setModel=function(m,n){if(!m&&this.oModels[n]){delete this.oModels[n];this.propagateProperties(n);this.updateBindings(false,n);}else if(m&&m!==this.oModels[n]){this.oModels[n]=m;this.propagateProperties(n);this.updateBindingContext(false,true,n);this.updateBindings(false,n);}return this;};g.prototype.propagateProperties=function(n){var p=this._getPropertiesToPropagate(),u=n===true,N=u?undefined:n,a,A,i;for(a in this.mAggregations){if(this.mSkipPropagation[a]){continue;}A=this.mAggregations[a];if(A instanceof g){this._propagateProperties(n,A,p,u,N);}else if(A instanceof Array){for(i=0;i<A.length;i++){if(A[i]instanceof g){this._propagateProperties(n,A[i],p,u,N);}}}}};g.prototype._propagateProperties=function(n,o,p,u,N){if(!p){p=this._getPropertiesToPropagate();u=n===true;N=u?undefined:n;}o.oPropagatedProperties=p;o.updateBindings(u,N);o.updateBindingContext(false,true,N,u);o.propagateProperties(n);};g.prototype._getPropertiesToPropagate=function(){var n=q.isEmptyObject(this.oModels),N=q.isEmptyObject(this.oBindingContexts),a=q.isEmptyObject(this.mElementBindingContexts);function m(e,o,i,j){return e?o:q.extend({},o,i,j);}if(N&&n&&a){return this.oPropagatedProperties;}else{return{oModels:m(n,this.oPropagatedProperties.oModels,this.oModels),oBindingContexts:m((N&&a),this.oPropagatedProperties.oBindingContexts,this.oBindingContexts,this.mElementBindingContexts)};}};g.prototype.getModel=function(n){return this.oModels[n]||this.oPropagatedProperties.oModels[n];};g.prototype.hasModel=function(){return!(q.isEmptyObject(this.oModels)&&q.isEmptyObject(this.oPropagatedProperties.oModels));};g.prototype.clone=function(I,l,o){var a=true,e=true;if(o){a=!!o.cloneChildren;e=!!o.cloneBindings;}if(!I){I=M.uid("clone")||q.sap.uid();}if(!l&&a){l=q.map(this.findAggregatedObjects(true),function(O){return O.getId();});}var m=this.getMetadata(),j=m._oClass,s=this.getId()+"-"+I,S={},p=this.mProperties,k,n,r,t=g.bindingParser.escape;for(k in p){if(p.hasOwnProperty(k)&&!(this.isBound(k)&&e)){if(typeof p[k]==="string"){S[k]=t(p[k]);}else{S[k]=p[k];}}}S["models"]=this.oModels;S["bindingContexts"]=this.oBindingContexts;if(a){for(n in this.mAggregations){var A=this.mAggregations[n];if(m.hasAggregation(n)&&!(this.isBound(n)&&e)){if(A instanceof g){S[n]=A.clone(I,l);}else if(q.isArray(A)){S[n]=[];for(var i=0;i<A.length;i++){S[n].push(A[i].clone(I,l));}}else{S[n]=A;}}}for(n in this.mAssociations){var u=this.mAssociations[n];if(q.isArray(u)){u=u.slice(0);for(var i=0;i<u.length;i++){if(q.inArray(u[i],l)>=0){u[i]+="-"+I;}}}else if(q.inArray(u,l)>=0){u+="-"+I;}S[n]=u;}}r=new j(s,S);for(n in this.mBoundObjects){r.mBoundObjects[n]=q.extend({},this.mBoundObjects[n]);}for(n in this.mEventRegistry){r.mEventRegistry[n]=this.mEventRegistry[n].slice();}if(e){for(n in this.mBindingInfos){var v=this.mBindingInfos[n];var w=q.extend({},v);if(!v.templateShareable&&v.template&&v.template.clone){w.template=v.template.clone(I,l);delete w.factory;}else if(v.templateShareable===h){v.templateShareable=w.templateShareable=true;q.sap.log.error("A shared template must be marked with templateShareable:true in the binding info");}delete w.binding;if(v.factory||v.template){r.bindAggregation(n,w);}else{r.bindProperty(n,w);}}}return r;};g._handleLocalizationChange=function(p){var i;if(p===1){q.each(this.oModels,function(n,m){if(m&&m._handleLocalizationChange){m._handleLocalizationChange();}});}else if(p===2){q.each(this.mBindingInfos,function(n,o){var a=o.parts;if(a){for(i=0;i<a.length;i++){if(o.type&&o.type._handleLocalizationChange){o.type._handleLocalizationChange();}}if(o.modelChangeHandler){o.modelChangeHandler();}}});}};g.prototype.findAggregatedObjects=function(r,e){var A=[];if(e&&!typeof e==="function"){e=null;}function j(o){for(var n in o.mAggregations){var a=o.mAggregations[n];if(q.isArray(a)){for(var i=0;i<a.length;i++){if(!e||e(a[i])){A.push(a[i]);}if(r){j(a[i]);}}}else if(a instanceof g){if(!e||e(a)){A.push(a);}if(r){j(a);}}}}j(this);return A;};return g;});
