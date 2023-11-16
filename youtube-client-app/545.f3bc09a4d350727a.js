"use strict";(self.webpackChunkyoutube_client_app=self.webpackChunkyoutube_client_app||[]).push([[545],{6545:(Q,h,s)=>{s.r(h),s.d(h,{YoutubeModule:()=>J});var c=s(6814),n=s(6223),p=s(2490),g=s(2296),d=s(5195),l=s(1941),f=s(617),y=s(2032),t=s(5879);let M=(()=>{class e{static#t=this.\u0275fac=function(i){return new(i||e)};static#e=this.\u0275mod=t.oAB({type:e});static#r=this.\u0275inj=t.cJS({imports:[c.ez,d.QW,f.Ps,l.lN,y.c,g.ot]})}return e})();var u=s(2058);function T(e){const o=new Date(e.value);return Number(new Date)-Number(o)<0?{date:!0,requiredValue:"The date is invalid"}:null}let k=(()=>{class e{constructor(){this.required="required",this.minlength="minlength",this.maxlength="maxlength"}getErrorTitleMessage(r){return r?.touched?r.hasError(this.required)?"Please enter a title":r.hasError(this.minlength)?"The title is too short":r.hasError(this.maxlength)?"The title is too long":"":""}getErrorDescriptionMessage(r){return r?.touched&&r?.hasError(this.maxlength)?"The description is too long":""}getErrorImageMessage(r){return r?.touched&&r?.hasError(this.required)?"Please enter a link to the image":""}getErrorVideoMessage(r){return r?.touched&&r?.hasError(this.required)?"Please enter a link to the video":""}getErrorDateMessage(r){return r?.touched?r?.hasError(this.required)?"Please enter a creation date":r?.errors?"The date is invalid":"":""}static#t=this.\u0275fac=function(i){return new(i||e)};static#e=this.\u0275prov=t.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function A(e,o){if(1&e&&(t.TgZ(0,"mat-form-field",7)(1,"mat-label"),t._uU(2),t.qZA(),t._UZ(3,"input",8),t.TgZ(4,"mat-error"),t._uU(5),t.qZA()()),2&e){const r=o.$implicit;t.xp6(2),t.Oqu(r.label),t.xp6(1),t.s9C("type",r.type),t.s9C("formControlName",r.label),t.s9C("required",r.requiered),t.xp6(2),t.Oqu(r.errorMessage())}}let I=(()=>{class e{constructor(r,i){this.formBuilder=r,this.validationService=i,this.createCard=this.formBuilder.group({title:["",[n.kI.required,n.kI.minLength(3),n.kI.maxLength(20)]],description:["",[n.kI.maxLength(255)]],image:["",[n.kI.required]],video:["",[n.kI.required]],date:["",[n.kI.required,n.kI.maxLength(10),T]]}),this.arrayFields=[{label:"title",errorMessage:()=>this.validationService.getErrorTitleMessage(this.createCard.get("title")),requiered:!0,type:"text"},{label:"description",errorMessage:()=>this.validationService.getErrorDescriptionMessage(this.createCard.get("description")),requiered:!1,type:"text"},{label:"image",errorMessage:()=>this.validationService.getErrorImageMessage(this.createCard.get("image")),requiered:!0,type:"text"},{label:"video",errorMessage:()=>this.validationService.getErrorVideoMessage(this.createCard.get("video")),requiered:!0,type:"text"},{label:"date",errorMessage:()=>this.validationService.getErrorDateMessage(this.createCard.get("date")),requiered:!0,type:"date"}]}resetForm(){this.createCard.reset()}trackByIndex(r){return r}static#t=this.\u0275fac=function(i){return new(i||e)(t.Y36(n.j3),t.Y36(k))};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["yta-admin"]],decls:11,vars:4,consts:[[1,"create-card-block"],[1,"card-header"],["novalidate","",1,"form",3,"formGroup"],["appearance","outline",4,"ngFor","ngForOf","ngForTrackBy"],[1,"buttons-block"],["mat-raised-button","","color","primary","type","submit",3,"disabled"],[3,"click"],["appearance","outline"],["matInput","",3,"type","formControlName","required"]],template:function(i,a){1&i&&(t.TgZ(0,"mat-card",0)(1,"mat-card-header",1)(2,"mat-card-title"),t._uU(3,"Create new card"),t.qZA()(),t.TgZ(4,"form",2),t.YNc(5,A,6,5,"mat-form-field",3),t.TgZ(6,"div",4)(7,"button",5),t._uU(8,"Create"),t.qZA(),t.TgZ(9,"yta-button",6),t.NdJ("click",function(){return a.resetForm()}),t._uU(10,"Reset"),t.qZA()()()()),2&i&&(t.xp6(4),t.Q6J("formGroup",a.createCard),t.xp6(1),t.Q6J("ngForOf",a.arrayFields)("ngForTrackBy",a.trackByIndex),t.xp6(2),t.Q6J("disabled",!a.createCard.valid))},dependencies:[c.sg,n._Y,n.Fj,n.JJ,n.JL,n.Q7,n.sg,n.u,p.r,d.a8,d.dk,d.n5,l.KE,l.hX,l.TO,y.Nt,g.lW],styles:["[_nghost-%COMP%]{width:100%;background-color:#0003;border-radius:20px}.create-card-block[_ngcontent-%COMP%]{margin:20px auto;width:300px;padding:0 10px 20px}.card-header[_ngcontent-%COMP%]{margin:0 auto}.form[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center}.buttons-block[_ngcontent-%COMP%]{display:flex;gap:30px}"]})}return e})();var Z=s(7398),v=s(1611);let C=(()=>{class e{set publishedAt(r){this.calculationColor(r)}constructor(r,i){this.renderer=r,this.el=i}calculationColor(r){const i=Date.now()-Date.parse(r);let a;a=i>=157788e5?"red":i>=26298e5?"yellow":i>=6048e5?"green":"blue",this.renderer.setStyle(this.el.nativeElement,"borderBottom",`5px solid ${a}`)}static#t=this.\u0275fac=function(i){return new(i||e)(t.Y36(t.Qsj),t.Y36(t.SBq))};static#e=this.\u0275dir=t.lG2({type:e,selectors:[["","ytaColoring",""]],inputs:{publishedAt:"publishedAt"},standalone:!0})}return e})();function O(e,o){if(1&e&&(t.TgZ(0,"div",1),t._UZ(1,"mat-icon",2),t.TgZ(2,"span"),t._uU(3),t.qZA()()),2&e){const r=o.$implicit;t.xp6(1),t.s9C("fontIcon",r.icon),t.s9C("color",r.color),t.xp6(2),t.Oqu(r.view)}}let x=(()=>{class e{constructor(){this.arrayStatistic=[]}ngOnInit(){this.card&&this.createArr()}createArr(){this.arrayStatistic=[{view:this.card.statistics.viewCount,color:"primary",icon:"visibility"},{view:this.card.statistics.likeCount,color:"warn",icon:"thumb_up"},{view:this.card.statistics.dislikeCount,color:"accent",icon:"thumb_down"},{view:this.card.statistics.commentCount,color:"",icon:"forum"}]}trackByIndex(r){return r}static#t=this.\u0275fac=function(i){return new(i||e)};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["yta-statistic-block"]],inputs:{card:"card"},decls:1,vars:2,consts:[["class","statistic-element",4,"ngFor","ngForOf","ngForTrackBy"],[1,"statistic-element"],["aria-hidden","false","aria-label","Example icon",3,"fontIcon","color"]],template:function(i,a){1&i&&t.YNc(0,O,4,3,"div",0),2&i&&t.Q6J("ngForOf",a.arrayStatistic)("ngForTrackBy",a.trackByIndex)},dependencies:[c.sg,f.Hw],styles:["[_nghost-%COMP%]{display:flex;gap:30px;justify-content:center;align-self:stretch}[_nghost-%COMP%] > .statistic-element[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center}"]})}return e})();function _(e,o){if(1&e&&(t.TgZ(0,"div",1)(1,"div",2),t._UZ(2,"img",3),t.qZA(),t.TgZ(3,"div",4)(4,"h2",5),t._uU(5),t.qZA(),t.TgZ(6,"div",6),t._uU(7),t.ALo(8,"date"),t.qZA(),t.TgZ(9,"div",7),t._uU(10),t.qZA(),t._UZ(11,"yta-statistic-block",8),t.qZA()()),2&e){const r=o.ngIf;t.xp6(2),t.s9C("src",r.snippet.thumbnails.high.url,t.LSH),t.xp6(1),t.Q6J("publishedAt",r.snippet.publishedAt),t.xp6(2),t.Oqu(r.snippet.title),t.xp6(2),t.Oqu(t.lcZ(8,6,r.snippet.publishedAt)),t.xp6(3),t.Oqu(r.snippet.description),t.xp6(1),t.Q6J("card",r)}}let F=(()=>{class e{constructor(r,i){this.route=r,this.cardsStateService=i,this.card$=this.cardsStateService.filteredCards$.pipe((0,Z.U)(a=>a?.find(b=>b.id===this.routeId)))}get routeId(){return this.route.snapshot.paramMap.get("cardId")??""}static#t=this.\u0275fac=function(i){return new(i||e)(t.Y36(u.gz),t.Y36(v.A))};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["yta-detailed-info-page"]],decls:2,vars:3,consts:[["class","card",4,"ngIf"],[1,"card"],[1,"detailed-image"],["alt","",3,"src"],["ytaColoring","",1,"detailed-description",3,"publishedAt"],[1,"descripti0n-title"],[1,"description-published-at"],[1,"description-text"],[3,"card"]],template:function(i,a){1&i&&(t.YNc(0,_,12,8,"div",0),t.ALo(1,"async")),2&i&&t.Q6J("ngIf",t.lcZ(1,1,a.card$))},dependencies:[c.O5,C,x,c.Ov,c.uU],styles:[".card[_ngcontent-%COMP%]{display:flex;background-color:#0003;overflow:hidden;margin:20px;border-radius:20px}.detailed-image[_ngcontent-%COMP%]{display:block;height:480px}.detailed-description[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:space-between;padding:20px}.description-published-at[_ngcontent-%COMP%]{font-style:italic}.description-text[_ngcontent-%COMP%]{max-height:200px;overflow:hidden}@media (max-width: 1000px){.card[_ngcontent-%COMP%]{flex-direction:column;align-items:center}}"]})}return e})();const S=function(e){return["/youtube/cards",e]};let P=(()=>{class e{static#t=this.\u0275fac=function(i){return new(i||e)};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["yta-item"]],inputs:{card:"card"},decls:8,vars:8,consts:[["ytaColoring","",1,"card",3,"publishedAt"],["mat-card-lg-image","","alt","",3,"src"],[3,"card"],[3,"title","routerLink"]],template:function(i,a){1&i&&(t.TgZ(0,"mat-card",0)(1,"mat-card-header")(2,"mat-card-title"),t._uU(3),t.qZA()(),t._UZ(4,"img",1)(5,"yta-statistic-block",2),t.TgZ(6,"yta-button",3),t._uU(7," More... "),t.qZA()()),2&i&&(t.Q6J("publishedAt",a.card.snippet.publishedAt),t.xp6(3),t.Oqu(a.card.snippet.title),t.xp6(1),t.s9C("src",a.card.snippet.thumbnails.medium.url,t.LSH),t.xp6(1),t.Q6J("card",a.card),t.xp6(1),t.Q6J("title",a.card.snippet.title)("routerLink",t.VKq(6,S,a.card.id)))},dependencies:[p.r,d.a8,d.dk,d.WU,d.n5,u.rH,C,x],styles:[".card[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:10px;align-items:center;justify-content:space-between;height:100%;padding:10px;border-bottom:5px solid black}"]})}return e})();function q(e,o){1&e&&t._UZ(0,"yta-item",2),2&e&&t.Q6J("card",o.$implicit)}function w(e,o){if(1&e&&(t.ynx(0),t.YNc(1,q,1,1,"yta-item",1),t.BQk()),2&e){const r=o.ngIf,i=t.oxw();t.xp6(1),t.Q6J("ngForOf",r)("ngForTrackBy",i.trackByCards)}}let B=(()=>{class e{constructor(r){this.cardsStateService=r,this.cards$=this.cardsStateService.filteredCards$}trackByCards(r,i){return i.id}static#t=this.\u0275fac=function(i){return new(i||e)(t.Y36(v.A))};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["yta-search-results"]],decls:2,vars:3,consts:[[4,"ngIf"],["class","search-card",3,"card",4,"ngFor","ngForOf","ngForTrackBy"],[1,"search-card",3,"card"]],template:function(i,a){1&i&&(t.YNc(0,w,2,2,"ng-container",0),t.ALo(1,"async")),2&i&&t.Q6J("ngIf",t.lcZ(1,1,a.cards$))},dependencies:[c.sg,c.O5,P,c.Ov],styles:["[_nghost-%COMP%]{display:flex;flex-wrap:wrap;justify-content:center;gap:20px}.search-card[_ngcontent-%COMP%]{width:300px}"]})}return e})();const U=[{path:"",component:(()=>{class e{static#t=this.\u0275fac=function(i){return new(i||e)};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["yta-main-page"]],decls:1,vars:0,template:function(i,a){1&i&&t._UZ(0,"yta-search-results")},dependencies:[B]})}return e})()},{path:"cards/:cardId",component:F},{path:"admin",component:I}];let E=(()=>{class e{static#t=this.\u0275fac=function(i){return new(i||e)};static#e=this.\u0275mod=t.oAB({type:e});static#r=this.\u0275inj=t.cJS({imports:[u.Bz.forChild(U),u.Bz]})}return e})(),J=(()=>{class e{static#t=this.\u0275fac=function(i){return new(i||e)};static#e=this.\u0275mod=t.oAB({type:e});static#r=this.\u0275inj=t.cJS({imports:[c.ez,n.UX,p.r,M,E]})}return e})()}}]);