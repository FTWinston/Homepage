(()=>{"use strict";const e=document.querySelector("body"),t=document.querySelector(".header"),a=document.querySelector(".header__text"),s=document.getElementsByClassName("header__letter"),c=s[0],d=s[1],n=s[2],r=s[3],i=(s[4],s[5],s[6]);s[7],s[8],a.addEventListener("animationend",(()=>a.classList.remove("header__text--animateIn")));for(const e of s)e.addEventListener("click",(e=>e.target.classList.toggle("header__letter--active")));c.addEventListener("click",(()=>t.classList.toggle("header--font"))),d.addEventListener("click",(()=>t.classList.toggle("header--background"))),n.addEventListener("click",(()=>a.classList.toggle("header__text--animateLetters"))),r.addEventListener("click",(()=>e.classList.toggle("inverted"))),i.addEventListener("click",(()=>a.classList.toggle("header__text--animate")))})();