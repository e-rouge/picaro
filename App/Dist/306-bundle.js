(self.webpackChunkjavascript_development_environment=self.webpackChunkjavascript_development_environment||[]).push([[306],{8546:(e,t,n)=>{"use strict";n.d(t,{Z:()=>d});var i=n(4015),a=n.n(i),l=n(3645),o=n.n(l)()(a());o.push([e.id,"\n.rf-setting-category-list[data-v-d7917f54] {\n  margin: 0 20px;\n}\n","",{version:3,sources:["webpack://./App/Ui/Components/categories.vue"],names:[],mappings:";AACA;EACE,cAAc;AAChB",sourcesContent:["\n.rf-setting-category-list[data-v-d7917f54] {\n  margin: 0 20px;\n}\n"],sourceRoot:""}]);const d=o},5374:(e,t,n)=>{"use strict";n.d(t,{Z:()=>d});var i=n(4015),a=n.n(i),l=n(3645),o=n.n(l)()(a());o.push([e.id,'\nselect[data-v-2b8119d6] {\n  padding: 10px;\n  width: 100%;\n}\n.select-container[data-v-2b8119d6] {\n  border: 1px solid black;\n  position: relative;\n  border-radius: 5px;\n  background: #fefefe;\n  margin: 20px 0;\n}\n.select-container[data-v-2b8119d6]::after {\n  content: "\\25BC";\n  pointer-events: none;\n  position: absolute;\n  right: 20px;\n  top: 10px;\n  color: #555;\n}\n',"",{version:3,sources:["webpack://./App/Ui/Components/modelPanel.vue"],names:[],mappings:";AACA;EACE,aAAa;EACb,WAAW;AACb;AACA;EACE,uBAAuB;EACvB,kBAAkB;EAClB,kBAAkB;EAClB,mBAAmB;EACnB,cAAc;AAChB;AACA;EACE,gBAAgB;EAChB,oBAAoB;EACpB,kBAAkB;EAClB,WAAW;EACX,SAAS;EACT,WAAW;AACb",sourcesContent:['\nselect[data-v-2b8119d6] {\n  padding: 10px;\n  width: 100%;\n}\n.select-container[data-v-2b8119d6] {\n  border: 1px solid black;\n  position: relative;\n  border-radius: 5px;\n  background: #fefefe;\n  margin: 20px 0;\n}\n.select-container[data-v-2b8119d6]::after {\n  content: "\\25BC";\n  pointer-events: none;\n  position: absolute;\n  right: 20px;\n  top: 10px;\n  color: #555;\n}\n'],sourceRoot:""}]);const d=o},9738:(e,t,n)=>{"use strict";n.d(t,{Z:()=>d});var i=n(4015),a=n.n(i),l=n(3645),o=n.n(l)()(a());o.push([e.id,"\n.rf-model-info[data-v-bc945334] {\n  display: inline-block;\n  margin-right: 10px;\n  padding: 0 10px;\n  font-size: 16px;\n  line-height: 28px;\n  vertical-align: middle;\n}\n.rf-model-info.--tag[data-v-bc945334] {\n    background: #ddd;\n    border-radius: 4px;\n}\n","",{version:3,sources:["webpack://./App/Ui/Components/partials/model/panelEdit/_modelField.vue"],names:[],mappings:";AACA;EACE,qBAAqB;EACrB,kBAAkB;EAClB,eAAe;EACf,eAAe;EACf,iBAAiB;EACjB,sBAAsB;AACxB;AACA;IACI,gBAAgB;IAChB,kBAAkB;AACtB",sourcesContent:["\n.rf-model-info[data-v-bc945334] {\n  display: inline-block;\n  margin-right: 10px;\n  padding: 0 10px;\n  font-size: 16px;\n  line-height: 28px;\n  vertical-align: middle;\n}\n.rf-model-info.--tag[data-v-bc945334] {\n    background: #ddd;\n    border-radius: 4px;\n}\n"],sourceRoot:""}]);const d=o},3552:(e,t,n)=>{"use strict";n.d(t,{Z:()=>d});var i=n(4015),a=n.n(i),l=n(3645),o=n.n(l)()(a());o.push([e.id,"\n.editor-textarea[data-v-55c6d27e] {\n  border: 1px solid #ddd;\n}\n","",{version:3,sources:["webpack://./App/Ui/Components/partials/model/panelEdit/_richText.vue"],names:[],mappings:";AACA;EACE,sBAAsB;AACxB",sourcesContent:["\n.editor-textarea[data-v-55c6d27e] {\n  border: 1px solid #ddd;\n}\n"],sourceRoot:""}]);const d=o},9306:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>we});var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("categories"),n("h2",[e._v("Models")]),n("div",{staticClass:"rf-side-button-container"},[e.currentEditModelName?e._e():n("v-text-field",{attrs:{"data-jest":"model-name",outlined:"",dense:"",label:"New model name"},model:{value:e.modelNameInput,callback:function(t){e.modelNameInput=t},expression:"modelNameInput"}}),e.currentEditModelName?e._e():n("v-btn",{attrs:{"data-jest":"add-model",disabled:!e.modelNameInput||!e.modelNameIsUnique,elevation:"0",dark:""},on:{click:e.createNewModel}},[e._v("Add")])],1),e._l(e.modelCollection,(function(t,i){return n("div",{staticClass:"current-model-elements"},[n("div",{staticClass:"rf-setting-sheet"},[e.noEdition(i)?n("v-card",{staticClass:"pa-3 my-3",class:{"elevation-6":i===e.currentEditModelName},attrs:{outlined:""}},[n("div",{staticClass:"--title-with-cta"},[n("h3",{class:{closed:e.currentEditModelName!==i}},[e.currentEditModelName===i?n("span",[e._v("Editing :")]):e._e(),n("span",[e._v(e._s(i))])]),e.currentEditModelName===i||e.currentEditModelName?n("v-btn",{staticClass:"mx-2",attrs:{outlined:"",small:""},on:{click:e.cancelEditModel}},[e._v("Cancel")]):n("v-btn",{staticClass:"mx-2",attrs:{outlined:"",small:""},on:{click:function(t){e.currentEditModelName=i}}},[e._v("Edit")])],1),n("div",{staticClass:"model-type"},[i===e.currentEditModelName||e.modelNameInput?n("div",{staticClass:"select-container"},[n("select",{directives:[{name:"model",rawName:"v-model",value:e.selectedFieldType,expression:"selectedFieldType"}],attrs:{"data-jest":"select-input"},on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.selectedFieldType=t.target.multiple?n:n[0]}}},[n("option",{attrs:{value:"none"}},[e._v("Select…")]),e._l(e.fieldType,(function(t,i){return n("option",{domProps:{value:i}},[e._v(e._s(t.name))])}))],2)]):e._e()]),"none"!==e.selectedFieldType?n("ModelField",{ref:e.selectedFieldType,refInFor:!0,attrs:{"is-created":!0,type:e.selectedFieldType},on:{addFieldData:e.addFieldToModel}}):e._e(),i===e.currentEditModelName?n("div",[n("v-card-text",e._l(t,(function(a,l){return i===e.currentEditModelName?n("div",[null!==e.currentMovingField&&l<e.currentMovingField?n("v-btn",{attrs:{"data-jest":"move-field-destination",outlined:"",color:"primary"},on:{click:function(t){return e.moveField(l)}}},[e._v("Move here")]):e._e(),n("v-card",{staticClass:"pa-1 my-2",attrs:{outlined:"",loading:l===e.currentMovingField}},[n("ModelField",{ref:a.type,refInFor:!0,attrs:{fieldData:a,type:a.type},on:{deletField:function(t){return e.deleteField(l)},updateEditedFieldData:function(t){return e.saveEditedField(t,l)}}}),n("span",[t.length>1&&l!==e.currentMovingField?n("v-btn",{attrs:{"data-jest":"move-field",outlined:"",small:""},on:{click:function(t){return e.moveField(l)}}},[e._v("Move")]):e._e(),n("v-btn",{attrs:{"data-jest":"delete-button",text:"","x-small":""},on:{click:function(t){return e.deleteField(l)}}},[n("v-icon",[e._v("mdi-delete-outline")])],1)],1)],1),null!==e.currentMovingField&&l>e.currentMovingField?n("v-btn",{attrs:{"data-jest":"move-field-destination",outlined:"",color:"primary",small:""},on:{click:function(t){return e.moveField(l)}}},[e._v("Move here")]):e._e()],1):e._e()})),0)],1):e._e()],1):e._e()],1)])}))],2)};i._withStripped=!0,n(8674);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("span",[e.isEdited||e.isCreated?n("v-text-field",{attrs:{label:"Label","data-jest":"rf-form-label",rules:e.labelRules,dense:"",outlined:""},model:{value:e.label,callback:function(t){e.label="string"==typeof t?t.trim():t},expression:"label"}}):e._e(),e.isEdited||e.isCreated?n("v-text-field",{attrs:{label:"name","data-jest":"rf-form-name",rules:e.nameRules,dense:"",outlined:""},model:{value:e.name,callback:function(t){e.name="string"==typeof t?t.trim():t},expression:"name"}}):e._e(),e.isEdited||e.isCreated?n("v-text-field",{attrs:{label:"template (or tag)","data-jest":"rf-form-label",dense:"",outlined:""},model:{value:e.template,callback:function(t){e.template="string"==typeof t?t.trim():t},expression:"template"}}):e._e(),e.isEdited||e.isCreated?n("v-text-field",{attrs:{label:"attributes","data-jest":"rf-form-label",dense:"",outlined:""},model:{value:e.attributes,callback:function(t){e.attributes="string"==typeof t?t.trim():t},expression:"attributes"}}):e._e(),e.isEdited||e.isCreated?n("v-switch",{attrs:{"data-jest":"rf-form-required",label:"Required"},model:{value:e.required,callback:function(t){e.required=t},expression:"required"}}):e._e(),e.isEdited||e.isCreated?n("v-switch",{attrs:{label:"Hidden"},model:{value:e.hidden,callback:function(t){e.hidden=t},expression:"hidden"}}):e._e(),e.isEdited||e.isCreated&&e.hasRegEx.includes(e.type)?n("v-text-field",{attrs:{label:"Regex"},model:{value:e.regex,callback:function(t){e.regex=t},expression:"regex"}}):e._e(),n("h3",[e.type?n("span",{staticClass:"rf-model-info --tag"},[e._v(e._s(e.type))]):e._e(),e.label?n("span",{staticClass:"rf-model-info"},[e._v(e._s(e.label))]):e._e()]),e.isEdited||e.isCreated?e._e():n("v-btn",{attrs:{"data-jest":"edit-boolean",edit:"",outlined:"",small:""},on:{click:function(t){e.isEdited=!0}}},[e._v("Edit")]),e.isEdited?n("v-btn",{attrs:{"data-jest":"cancel-boolean",outlined:"",small:""},on:{click:function(t){e.isEdited=!1}}},[e._v("Cancel")]):e._e(),e.isEdited?n("v-btn",{attrs:{"data-jest":"saveStyleSet-boolean",disabled:!e.valid,outlined:"",small:""},on:{click:e.saveEdit}},[e._v("Save")]):e.isCreated?n("v-btn",{attrs:{"data-jest":"add-button",disabled:!e.valid,outlined:""},on:{click:e.addField}},[e._v("Add field")]):e._e()],1)};function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){d(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function d(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}a._withStripped=!0;const r={name:"ModelFieldPanel",props:{fieldData:{type:Object,default:()=>null},type:{String,default:null},isCreated:{Boolean,default:!1}},data:()=>({hasRegEx:["Text"],valid:!0,isEdited:!1,label:"",name:"",regex:"",hidden:!1,template:"",attributes:"",required:!1,labelRules:[e=>!!e||"Label is required"],nameRules:[e=>!!e||"Name is required",e=>/^[a-z0-9-]+$/.test(e)||'The name must use lower case letters, numbers or "-"']}),created(){this.fieldData&&({name:this.name,label:this.label,required:this.required,regex:this.regex,hidden:this.hidden,template:this.template,attributes:this.attributes}=this.fieldData)},methods:{addField:function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};e.target&&(e={}),this.$emit("addFieldData",o({label:this.label,name:this.name,regex:this.regex,required:this.required,hidden:this.hidden,template:this.template,attributes:this.attributes,type:this.type},e))},saveEdit(){this.$emit("updateEditedFieldData",{label:this.label,name:this.name,regex:this.regex,required:this.required,hidden:this.hidden,template:this.template,attributes:this.attributes,type:this.type}),this.isEdited=!1}}};var s=n(3379),c=n.n(s),u=n(7795),m=n.n(u),p=n(569),v=n.n(p),f=n(3565),b=n.n(f),h=n(9216),g=n.n(h),_=n(4589),C=n.n(_),E=n(9738),y={};y.styleTagTransform=C(),y.setAttributes=b(),y.insert=v().bind(null,"head"),y.domAPI=m(),y.insertStyleElement=g(),c()(E.Z,y),E.Z&&E.Z.locals&&E.Z.locals;var A=n(1900),x=(0,A.Z)(r,a,[],!1,null,"bc945334",null);x.options.__file="App/Ui/Components/partials/model/panelEdit/_modelField.vue";const k=x.exports;var w=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("v-switch",{attrs:{"data-jest":"rf-form-switch",label:e.commonData.label?e.commonData.label:e.fieldData.label}}),e.edit||e.isEdited?e._e():n("v-btn",{attrs:{"data-jest":"edit-boolean",outlined:""},on:{click:e.editField}},[e._v("Edit")]),n("v-form",{model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[n("formFieldEditCommon",{attrs:{edit:e.editOrAdd,fieldData:e.fieldData},on:{changeParentCommonData:function(t){return e.getCommonData(t)},updateEditedFieldData:function(t){return e.saveEdit()}}}),e.isEdited?n("v-btn",{attrs:{"data-jest":"cancel-boolean"},on:{click:e.cancelEdit}},[e._v("Cancel")]):e._e(),e.isEdited?n("v-btn",{attrs:{"data-jest":"saveStyleSet-boolean",disabled:!e.valid},on:{click:e.saveEdit}},[e._v("Save")]):e.edit&&!e.isEdited?n("v-btn",{attrs:{"data-jest":"add-button",disabled:!e.valid},on:{click:e.addField}},[e._v("Add field")]):e._e()],1)],1)};w._withStripped=!0;var j=function(){var e=this.$createElement;return(this._self._c||e)("div")};j._withStripped=!0;const F={props:{edit:{type:Boolean,default:!1},fieldData:Object},data:()=>({name:"",label:"",required:!1,labelRules:[e=>!!e||"Label is required"],nameRules:[e=>!!e||"Name is required",e=>/^[a-z0-9-]+$/.test(e)||'The name must use lower case letters, numbers or "-"']}),created(){this.fieldData.label&&(this.label=this.fieldData.label,this.name=this.fieldData.name,this.required=this.fieldData.required)},methods:{updateCommonData(){this.$emit("changeParentCommonData",{name:this.name,required:this.required,label:this.label})}}};var O=(0,A.Z)(F,j,[],!1,null,null,null);O.options.__file="App/Ui/Components/partials/model/panelEdit/formEditCommons/_formFieldEditCommon.vue";const N=O.exports,D={name:"BooleanPanelEdit",components:{formFieldEditCommon:N},methods:{getCommonData(e){e.type="Boolean",this.commonData=e}}};var M=(0,A.Z)(D,w,[],!1,null,null,null);M.options.__file="App/Ui/Components/partials/model/panelEdit/_booleanSwitchEdit.vue";const B=M.exports;var S=n(454),P=n.n(S),T=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("formFieldEditCommon",{attrs:{edit:e.editOrAdd,fieldData:e.fieldData},on:{changeParentCommonData:function(t){return e.getCommonData(t)},updateEditedFieldData:function(t){return e.saveEdit()}}}),e.isEdited?n("v-btn",{attrs:{"data-jest":"cancel-boolean"},on:{click:e.cancelEdit}},[e._v("Cancel")]):e._e(),e.isEdited?n("v-btn",{attrs:{"data-jest":"save-boolean",disabled:!e.valid},on:{click:e.saveEdit}},[e._v("Save")]):e.edit&&!e.isEdited?n("v-btn",{attrs:{"data-jest":"add-button",disabled:!e.valid,outlined:""},on:{click:e.addField}},[e._v("Add field")]):e._e()],1)};T._withStripped=!0;var Z=n(7049),$=n(5058);const q={name:"RichText",components:{EditorContent:Z.kg,formFieldEditCommon:N},data:function(){return{editor:null,editorString:""}},mounted(){this.editor=new Z.ML({extensions:[$.Z],onUpdate:e=>{let{editor:t}=e;this.editorString=JSON.stringify(t.getJSON())}})},beforeDestroy(){this.editor.destroy()},methods:{getCommonData:function(e){e.type="RichText",this.commonData=e}}};var I=n(3552),R={};R.styleTagTransform=C(),R.setAttributes=b(),R.insert=v().bind(null,"head"),R.domAPI=m(),R.insertStyleElement=g(),c()(I.Z,R),I.Z&&I.Z.locals&&I.Z.locals;var U=(0,A.Z)(q,T,[],!1,null,"55c6d27e",null);U.options.__file="App/Ui/Components/partials/model/panelEdit/_richText.vue";const W=U.exports;var z=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n(e.type,{tag:"component",attrs:{name:e.commonData.name,labe:e.commonData.label,data:e.options}}),n("v-form",{model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[n("formFieldEditCommon",{attrs:{edit:e.editOrAdd,fieldData:e.fieldData},on:{changeParentCommonData:function(t){return e.getCommonData(t)},updateEditedFieldData:function(t){return e.saveEdit(t)}}}),n("select",{directives:[{name:"model",rawName:"v-model",value:e.type,expression:"type"}],on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.type=t.target.multiple?n:n[0]}}},[n("option",{attrs:{value:"rfRadio"}},[e._v("Radio")]),n("option",{attrs:{value:"rfCheckbox"}},[e._v("Checkbox")]),n("option",{attrs:{value:"rfSelect"}},[e._v("Select")])]),n("h3",[e._v("Options")]),e._l(e.options,(function(t,i){return n("div",[n("v-text-field",{model:{value:t.label,callback:function(n){e.$set(t,"label",n)},expression:"option.label"}}),n("v-btn",{on:{click:function(t){return e.removeOption(i)}}},[e._v("remove")])],1)})),n("v-btn",{on:{click:e.addOption}},[e._v("Add")]),e.edit||e.isEdited?e._e():n("v-btn",{attrs:{"data-jest":"edit-boolean",edit:""},on:{click:e.editField}},[e._v("Edit")]),e.isEdited?n("v-btn",{attrs:{"data-jest":"cancel-boolean"},on:{click:e.cancelEdit}},[e._v("Cancel")]):e._e(),e.isEdited?n("v-btn",{attrs:{"data-jest":"saveStyleSet-boolean",disabled:!e.valid},on:{click:e.saveEdit}},[e._v("Save")]):e.edit&&!e.isEdited?n("v-btn",{attrs:{"data-jest":"add-button",disabled:!e.valid},on:{click:e.addField}},[e._v("Add field")]):e._e()],2)],1)};z._withStripped=!0;var L=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.selected,expression:"selected"}],attrs:{type:"hidden",name:e.name},domProps:{value:e.selected},on:{input:function(t){t.target.composing||(e.selected=t.target.value)}}}),n("v-radio-group",{model:{value:e.selected,callback:function(t){e.selected=t},expression:"selected"}},e._l(e.data,(function(e,t){return n("v-radio",{key:t,attrs:{label:e.label}})})),1)],1)};L._withStripped=!0;const K={name:"radio",data:function(){return{selected:""}},props:{data:Array,name:{type:String,default:""},label:{type:String,default:""}}};var J=(0,A.Z)(K,L,[],!1,null,"33efe790",null);J.options.__file="App/Ui/Components/partials/model/edit/_radio.vue";const H=J.exports;var X=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.selected,expression:"selected"}],attrs:{type:"hidden",name:e.name},domProps:{value:e.selected},on:{input:function(t){t.target.composing||(e.selected=t.target.value)}}}),n("v-select",{attrs:{items:e.data,label:e.label,"item-text":"label"},model:{value:e.selected,callback:function(t){e.selected=t},expression:"selected"}})],1)};X._withStripped=!0;const G={name:"rfSelect",data:function(){return{selected:""}},props:{data:Array,name:{type:String,default:""},label:{type:String,default:""}}};var Q=(0,A.Z)(G,X,[],!1,null,"7b04b30f",null);Q.options.__file="App/Ui/Components/partials/model/edit/_select.vue";const V=Q.exports;var Y=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.selected,expression:"selected"}],attrs:{type:"hidden",name:e.name},domProps:{value:e.selected},on:{input:function(t){t.target.composing||(e.selected=t.target.value)}}}),e._l(e.data,(function(e,t){return n("v-checkbox",{key:t,attrs:{label:e.label,name:e.label}})}))],2)};Y._withStripped=!0;const ee={name:"rfCheckbox",data:function(){return{selected:""}},props:{data:Array,name:{type:String,default:""},label:{type:String,default:""}}};var te=(0,A.Z)(ee,Y,[],!1,null,"2f6d6b96",null);te.options.__file="App/Ui/Components/partials/model/edit/_checkbox.vue";const ne={name:"MultiChoicePanelEdit",components:{formFieldEditCommon:N,rfRadio:H,rfSelect:V,rfCheckbox:te.exports},data:function(){return{type:"rfRadio",options:[]}},methods:{getCommonData(e){e.type="Text",e.regex=this.regex,this.commonData=e},removeOption(e){this.options.splice(e,1)},addOption(){this.options.push({label:""})}}};var ie=(0,A.Z)(ne,z,[],!1,null,null,null);ie.options.__file="App/Ui/Components/partials/model/panelEdit/_multiChoiceEdit.vue";const ae=ie.exports;var le=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("v-form",{model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[n("formFieldEditCommon",{attrs:{edit:e.editOrAdd,fieldData:e.fieldData},on:{changeParentCommonData:function(t){return e.getCommonData(t)},updateEditedFieldData:function(t){return e.saveEdit(t)}}}),n("h3",[e._v("Options")]),e._l(e.options,(function(t,i){return n("div",[n("v-text-field",{model:{value:t.label,callback:function(n){e.$set(t,"label",n)},expression:"option.label"}}),n("v-btn",{on:{click:function(t){return e.removeOption(i)}}},[e._v("remove")])],1)})),n("v-btn",{on:{click:e.addOption}},[e._v("Add")]),e.edit||e.isEdited?e._e():n("v-btn",{attrs:{"data-jest":"edit-boolean",edit:""},on:{click:e.editField}},[e._v("Edit")]),e.isEdited?n("v-btn",{attrs:{"data-jest":"cancel-boolean"},on:{click:e.cancelEdit}},[e._v("Cancel")]):e._e(),e.isEdited?n("v-btn",{attrs:{"data-jest":"saveStyleSet-boolean",disabled:!e.valid},on:{click:e.saveEdit}},[e._v("Save")]):e.edit&&!e.isEdited?n("v-btn",{attrs:{"data-jest":"add-button",disabled:!e.valid},on:{click:function(t){return e.addField({options:e.options,type:e.type})}}},[e._v("Add field")]):e._e()],2)],1)};le._withStripped=!0;const oe={name:"CategoryFilter",components:{formFieldEditCommon:N},data:function(){return{type:"CategoryFilter",options:[]}},created(){this.fieldData.options.length>0&&(this.options=this.fieldData.options)},methods:{getCommonData(e){e.type="Text",e.regex=this.regex,this.commonData=e},removeOption(e){this.options.splice(e,1)},addOption(){this.options.push({label:""})}}};var de=(0,A.Z)(oe,le,[],!1,null,null,null);de.options.__file="App/Ui/Components/partials/model/panelEdit/_categoryFilterEdit.vue";const re=de.exports;var se=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h2",[e._v("Categories")]),e.categoryCollection.length>0?n("div",{staticClass:"rf-setting-sheet"},[n("h3",[e._v(" Available categories")]),e._l(e.categoryCollection,(function(t,i){return n("div",[n("v-text-field",{staticClass:"rf-setting-category-list",attrs:{value:t.label,dense:"","append-icon":"mdi-delete-outline"},on:{change:function(n){return e.$set(t,"label",n)},"click:append":function(t){return e.remove(i)}}})],1)}))],2):e._e(),n("div",{staticClass:"rf-side-button-container"},[n("v-text-field",{attrs:{label:"New category name",dense:"",outlined:"",error:e.categoryCollection.includes(e.newCategoryName)},on:{"keyup:enter":e.add},model:{value:e.newCategoryName,callback:function(t){e.newCategoryName=t},expression:"newCategoryName"}}),n("v-btn",{attrs:{disabled:!e.newCategoryName,elevation:"0",dark:""},on:{click:e.add}},[e._v("add")])],1)])};se._withStripped=!0;var ce=n(629),ue=n(8917);function me(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function pe(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?me(Object(n),!0).forEach((function(t){ve(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):me(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function ve(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}const fe={name:"Categories",data:()=>({newCategoryName:"",error:""}),computed:pe(pe({},(0,ce.Se)(["settings"])),{},{categoryCollection(){return this.settings.availableFilterCollection.categories}}),methods:{add(){this.categoryCollection.push({id:(0,ue.x0)(6),label:this.newCategoryName}),this.newCategoryName=""},remove(e){this.categoryCollection.splice(e,1)}}};var be=n(8546),he={};he.styleTagTransform=C(),he.setAttributes=b(),he.insert=v().bind(null,"head"),he.domAPI=m(),he.insertStyleElement=g(),c()(be.Z,he),be.Z&&be.Z.locals&&be.Z.locals;var ge=(0,A.Z)(fe,se,[],!1,null,"d7917f54",null);function _e(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function Ce(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?_e(Object(n),!0).forEach((function(t){Ee(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):_e(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function Ee(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}ge.options.__file="App/Ui/Components/categories.vue";const ye={components:{categoryFilter:re,categories:ge.exports,ModelField:k},data:function(){return{modelNameInput:"",valid:!0,displayNewModelButton:!0,currentEditModelName:null,selectedFieldType:"none",currentMovingField:null,standardFieldType:{Boolean:{name:"Boolean",component:B},Text:{name:"Text",component:k},RichText:{name:"Rich Text Editor",component:W},MultiChoice:{name:"Multiple Choices",component:ae}}}},methods:{moveField(e){if(null===this.currentMovingField)this.currentMovingField=e;else{let t=(this.currentEditModelName,this.currentEditModelName);this.modelCollection[t]=P()(this.modelCollection[t],this.currentMovingField,e),this.$store.commit("modelCollection",this.modelCollection),this.currentMovingField=null}},async cancelEditModel(){this.currentEditModelName&&(await this.$store.dispatch("awaitConfirmation",{text:"Are you sure you want to abandon the creation of this new model ?",type:"warning"}),await this.$store.dispatch("removeKeyFromCollection",{collection:"modelCollection",key:this.modelNameInput}),this.modelNameInput="",this.currentEditModelName=null,this.displayNewModelButton=!0),this.currentEditModelName=null},deleteField(e){this.modelCollection[this.currentEditModelName].splice(e,1),this.$store.commit("modelCollection",this.modelCollection)},addFieldToModel(e){let t="";this.currentEditModelName,t=this.currentEditModelName,this.modelCollection[t].push(e),this.$store.commit("modelCollection",this.modelCollection),this.selectedFieldType="none"},saveEditedField(e,t){e.isTrusted&&delete e.isTrusted,this.modelCollection[this.currentEditModelName][t]=e,this.$store.commit("modelCollection",this.modelCollection)},createNewModel(){this.$store.dispatch("addKeyToCollection",{collection:"modelCollection",key:this.modelNameInput,value:[]}),this.currentEditModelName=this.modelNameInput,this.displayNewModelButton=!1},async deleteModel(){await this.$store.dispatch("awaitConfirmation",{text:"Are you sure you want to delete this model :  ".concat(this.currentEditModelName,"?"),type:"error"}),await this.$store.dispatch("removeKeyFromCollection",{collection:"modelCollection",key:this.currentEditModelName}),await this.$nextTick(),document.getElementById("_admin-form-ext-submit").click()},saveModel:async function(){this.$store.commit("newModelName",this.modelNameInput),await this.$nextTick(),document.getElementById("_admin-form-ext-submit").click()},noEdition:function(e){return!this.currentEditModelName||e===this.currentEditModelName}},computed:Ce(Ce({},(0,ce.Se)(["modelCollection"])),{},{modelNameIsUnique(){return 0===Object.keys(this.modelCollection).filter((e=>e===this.modelNameInput)).length},fieldType(){return this.standardFieldType}})};var Ae=n(5374),xe={};xe.styleTagTransform=C(),xe.setAttributes=b(),xe.insert=v().bind(null,"head"),xe.domAPI=m(),xe.insertStyleElement=g(),c()(Ae.Z,xe),Ae.Z&&Ae.Z.locals&&Ae.Z.locals;var ke=(0,A.Z)(ye,i,[],!1,null,"2b8119d6",null);ke.options.__file="App/Ui/Components/modelPanel.vue";const we=ke.exports}}]);