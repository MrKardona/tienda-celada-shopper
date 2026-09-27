(()=>{"use strict";const m="/assets/explorer/",_=[{id:"chip",icon:"\u26A1",label:"Chip A20 Pro",title:"Chip A20 Pro.",text:"El cerebro del iPhone m\xE1s potente: velocidad y eficiencia para todo lo que hagas, desde juegos hasta edici\xF3n de video."},{id:"camara",icon:"\u{1F4F7}",label:"C\xE1mara 48 MP",title:"C\xE1mara Fusion de 48 MP con apertura variable.",text:"El diafragma se abre y se cierra como en una c\xE1mara profesional: m\xE1s luz de noche y un desenfoque natural del fondo."},{id:"pantalla",icon:"\u{1F4F1}",label:'Pantalla 6,9"',title:"Pantalla ProMotion de 6,9 pulgadas.",text:"Movimiento ultrafluido y colores vivos de borde a borde, en la pantalla m\xE1s grande de un iPhone Pro."},{id:"isla",icon:"\u{1F48A}",label:"Isla Din\xE1mica",title:"Isla Din\xE1mica.",text:"Tu m\xFAsica, alertas y actividades en vivo cobran vida alrededor de la c\xE1mara frontal, sin interrumpir lo que haces."},{id:"bateria",icon:"\u{1F50B}",label:"Bater\xEDa",title:"La mayor duraci\xF3n de bater\xEDa en un iPhone.",text:"Energ\xEDa para todo el d\xEDa y m\xE1s, con un dise\xF1o interno optimizado para rendir al m\xE1ximo."},{id:"botones",icon:"\u{1F39B}\uFE0F",label:"Botones",title:"Botones y Control de C\xE1mara.",text:"Atajos f\xEDsicos al alcance de tu dedo para abrir la c\xE1mara, cambiar de modo o activar tus funciones favoritas."}],f={title:"Dise\xF1o en color Borgo\xF1a.",text:"Titanio pulido, c\xE1maras Pro y un acabado que no pasa desapercibido. Elige una caracter\xEDstica para explorarlo."},P=x=>String(x).replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]);window.Explorer={html({productId:x="iphone-18-pro-max",price:t=""}={}){return`
      <section class="xp" aria-label="Explora el iPhone 18 Pro Max por dentro">
        <div class="xp__inner wrap">
          <div class="xp__head">
            <p class="xp__eyebrow">iPhone 18 Pro Max \xB7 Borgo\xF1a</p>
            <h2 class="xp__title">Desc\xFAbrelo por dentro.</h2>
            <p class="xp__lead">Toca una caracter\xEDstica y mira c\xF3mo funciona.</p>
          </div>
          <div class="xp__grid">
            <div class="xp__stage" data-xp-stage>
              <img class="xp__poster" src="${m}hero.webp" alt="iPhone 18 Pro Max color Borgo\xF1a" width="720" height="720" decoding="async">
              <img class="xp__frame" alt="" aria-hidden="true" decoding="async">
              <video class="xp__video" muted playsinline preload="auto" aria-hidden="true"></video>
              <video class="xp__video" muted playsinline preload="auto" aria-hidden="true"></video>
              <div class="xp__glow" aria-hidden="true"></div>
              <button class="xp__replay" type="button" data-xp-replay hidden aria-label="Repetir animaci\xF3n">\u21BB Repetir</button>
            </div>
            <div class="xp__side">
              <div class="xp__chips" role="tablist" aria-label="Caracter\xEDsticas">
                ${_.map((l,h)=>`<button class="xp__chip" role="tab" aria-selected="false" data-xp="${l.id}" style="--i:${h}"><span aria-hidden="true">${l.icon}</span>${P(l.label)}</button>`).join("")}
              </div>
              <div class="xp__info" aria-live="polite">
                <h3 class="xp__info-title" data-xp-title>${f.title}</h3>
                <p class="xp__info-text" data-xp-text>${f.text}</p>
              </div>
              <div class="xp__cta">
                <a class="btn btn--primary" href="/iphone/${x}/?color=borgona">Comprar${t?` \xB7 desde ${P(t)}`:""}</a>
              </div>
              <p class="xp__note">Animaciones ilustrativas con fines de presentaci\xF3n.</p>
            </div>
          </div>
        </div>
      </section>`},mount(x=document){const t=x.querySelector(".xp");if(!t||t.dataset.mounted||window.__PRERENDER)return;t.dataset.mounted="1";const l=t.querySelector("[data-xp-stage]"),h=[...t.querySelectorAll(".xp__video")],C=t.querySelector(".xp__frame"),v=t.querySelector("[data-xp-replay]"),b=t.querySelector(".xp__info"),L=t.querySelector("[data-xp-title]"),M=t.querySelector("[data-xp-text]"),$=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let r=null,d=null,n="idle",o=null,y=0;const A=e=>{L.textContent=e?e.title:f.title,M.textContent=e?e.text:f.text,b.classList.remove("is-in"),b.offsetWidth,b.classList.add("is-in")},T=e=>t.querySelectorAll(".xp__chip").forEach(a=>a.setAttribute("aria-selected",String(a.dataset.xp===e))),S=(e,a=0)=>new Promise((c,p)=>{const s=++y,i=h.find(u=>u!==r)||h[0],w=()=>{i.onplaying=i.onended=i.onerror=i.onloadedmetadata=null};i.onerror=()=>{w(),p(new Error("video"))},i.onloadedmetadata=()=>{i.currentTime=Math.max(0,Math.min(a,(i.duration||0)-.05)),i.play().catch(u=>{w(),p(u)})},i.onplaying=()=>{if(s===y){if(i.classList.add("is-on"),r&&r!==i){const u=r;setTimeout(()=>{u.classList.remove("is-on"),u.pause()},120)}r=i,l.dataset.state="video"}},i.onended=()=>{w(),s===y&&c()},i.getAttribute("src")===e?i.onloadedmetadata():(i.src=e,i.load())}),q=e=>{l.dataset.state="frame",C.src=`${m}${e}.webp`,h.forEach(a=>{a.classList.remove("is-on"),a.pause()}),r=null,d=e,n="idle",v.hidden=!1},g=async()=>{const e=o;try{if(d&&(d!==e||n==="end")){const a=r,c=n==="fwd"&&a?Math.max(0,a.duration-a.currentTime)/1.5:0;if(n="rev",await S(`${m}${d}-rev.mp4`,c),d=null,n="idle",o!==e)return g()}if(d=e,n="fwd",await S(`${m}${e}.mp4`,0),o!==e)return g();n="end",v.hidden=!1}catch{o===e&&q(e)}},E=(e,{force:a=!1}={})=>{const c=_.find(i=>i.id===e);if(!c||e===o&&!a&&n!=="end")return;o=e,T(e),A(c),v.hidden=!0;const p=t.querySelector(`.xp__chip[data-xp="${e}"]`),s=p.parentElement;if(s.scrollWidth>s.clientWidth&&s.scrollTo({left:p.offsetLeft-(s.clientWidth-p.offsetWidth)/2,behavior:$?"auto":"smooth"}),$)return q(e);n!=="rev"&&g()};v.addEventListener("click",()=>o&&E(o,{force:!0})),t.addEventListener("click",e=>{const a=e.target.closest("[data-xp]");a&&E(a.dataset.xp)});const R=()=>_.forEach(e=>{const a=document.createElement("link");a.rel="preload",a.as="video",a.href=`${m}${e.id}.mp4`,document.head.appendChild(a)});if("IntersectionObserver"in window){const e=new IntersectionObserver(([a])=>{a.isIntersecting&&(t.classList.add("is-visible"),R(),o||setTimeout(()=>!o&&E("chip"),700),e.disconnect())},{threshold:.35});e.observe(t)}else t.classList.add("is-visible")}}})();
