import{d as b,i as h,a as S,l as v,r as m,c as P,g as s,t as r,f as e,b as a,w as n,m as u,k as w,o as D,e as c,_ as x}from"./index-5f969e29.js";import{C as N}from"./Card-4e5cb483.js";const V={class:"row",style:{top:"100px"}},U={class:"col-12"},L={class:"description"},C={class:"col-12",style:{"margin-top":"24px"}},R={class:"col-12"},M={class:"description"},A=b({__name:"SinglePlayerMode",setup(B){const{t:l}=h.global,t=S();function _(){t.gameStarted=!0,t.gameMode=1,u.race.setAI(),u.startGame(t.trackNumber),t.mobile&&u.player.setAccelerate(!0),w(!0)}const d=v([{name:"Desktop.SinglePlayer.easy_theme",level:"Desktop.SinglePlayer.easy",img:new URL(""+new URL("track1-image-508858fb.png",import.meta.url).href,self.location)},{},{name:"Desktop.SinglePlayer.medium_theme",level:"Desktop.SinglePlayer.medium",img:new URL(""+new URL("track2-image-e38f321b.png",import.meta.url).href,self.location),onload:!1},{name:"Desktop.SinglePlayer.hard_theme",level:"Desktop.SinglePlayer.hard",img:new URL(""+new URL("track3-image-b464ff78.png",import.meta.url).href,self.location),onload:!1}]);return(g,o)=>{const p=m("el-radio-button"),f=m("el-radio-group"),y=m("el-slider"),k=m("el-button");return D(),P("div",V,[s("div",U,[s("p",L,r(e(l)("Desktop.SinglePlayer.space_select")),1),a(f,{style:{width:"100%"},modelValue:e(t).trackNumber,"onUpdate:modelValue":o[0]||(o[0]=i=>e(t).trackNumber=i),size:"large"},{default:n(()=>[a(p,{style:{width:"33%"},label:0},{default:n(()=>[c(r(e(l)("Desktop.SinglePlayer.easy_theme")),1)]),_:1}),a(p,{style:{width:"33%"},label:2},{default:n(()=>[c(r(e(l)("Desktop.SinglePlayer.medium_theme")),1)]),_:1}),a(p,{style:{width:"33%"},label:3},{default:n(()=>[c(r(e(l)("Desktop.SinglePlayer.hard_theme")),1)]),_:1})]),_:1},8,["modelValue"])]),s("div",C,[a(N,{title:e(l)(d.value[e(t).trackNumber].name),description:e(l)(d.value[e(t).trackNumber].level),img:d.value[e(t).trackNumber].img},null,8,["title","description","img"])]),s("div",R,[s("p",M,r(e(l)("Desktop.SinglePlayer.computer_amount")),1),a(y,{class:"slider",modelValue:e(t).computerAmount,"onUpdate:modelValue":o[1]||(o[1]=i=>e(t).computerAmount=i),min:0,max:14},null,8,["modelValue"]),a(k,{class:"el-btn-custom click",style:{"margin-top":"60px"},onClick:o[2]||(o[2]=i=>{g.$router.push("/"),_()})},{default:n(()=>[c("進入遊戲")]),_:1})])])}}});const $=x(A,[["__scopeId","data-v-ee17cd33"]]);export{$ as default};
