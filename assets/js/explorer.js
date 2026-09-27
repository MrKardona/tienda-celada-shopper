(()=>{"use strict";const p="assets/explorer/",_=[{id:"chip",icon:"\u26A1",label:"Chip A20 Pro",title:"Chip A20 Pro.",text:"El cerebro del iPhone m\xE1s potente: velocidad y eficiencia para todo lo que hagas, desde juegos hasta edici\xF3n de video."},{id:"camara",icon:"\u{1F4F7}",label:"C\xE1mara 48 MP",title:"C\xE1mara Fusion de 48 MP con apertura variable.",text:"El diafragma se abre y se cierra como en una c\xE1mara profesional: m\xE1s luz de noche y un desenfoque natural del fondo."},{id:"pantalla",icon:"\u{1F4F1}",label:'Pantalla 6,9"',title:"Pantalla ProMotion de 6,9 pulgadas.",text:"Movimiento ultrafluido y colores vivos de borde a borde, en la pantalla m\xE1s grande de un iPhone Pro."},{id:"isla",icon:"\u{1F48A}",label:"Isla Din\xE1mica",title:"Isla Din\xE1mica.",text:"Tu m\xFAsica, alertas y actividades en vivo cobran vida alrededor de la c\xE1mara frontal, sin interrumpir lo que haces."},{id:"bateria",icon:"\u{1F50B}",label:"Bater\xEDa",title:"La mayor duraci\xF3n de bater\xEDa en un iPhone.",text:"Energ\xEDa para todo el d\xEDa y m\xE1s, con un dise\xF1o interno optimizado para rendir al m\xE1ximo."},{id:"botones",icon:"\u{1F39B}\uFE0F",label:"Botones",title:"Botones y Control de C\xE1mara.",text:"Atajos f\xEDsicos al alcance de tu dedo para abrir la c\xE1mara, cambiar de modo o activar tus funciones favoritas."}],x={title:"Dise\xF1o en color Borgo\xF1a.",text:"Titanio pulido, c\xE1maras Pro y un acabado que no pasa desapercibido. Elige una caracter\xEDstica para explorarlo."},E=u=>String(u).replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]);window.Explorer={html({productId:u="iphone-18-pro-max",price:t=""}={}){return`
      <section class="xp" aria-label="Explora el iPhone 18 Pro Max por dentro">
        <div class="xp__inner wrap">
          <div class="xp__head">
            <p class="xp__eyebrow">iPhone 18 Pro Max \xB7 Borgo\xF1a</p>
            <h2 class="xp__title">Desc\xFAbrelo por dentro.</h2>
            <p class="xp__lead">Toca una caracter\xEDstica y mira c\xF3mo funciona.</p>
          </div>
          <div class="xp__grid">
            <div class="xp__stage" data-xp-stage>
              <img class="xp__poster" src="${p}hero.webp" alt="iPhone 18 Pro Max color Borgo\xF1a" width="720" height="720" decoding="async">
              <img class="xp__frame" alt="" aria-hidden="true" decoding="async">
              <video class="xp__video" muted playsinline preload="auto" aria-hidden="true"></video>
              <video class="xp__video" muted playsinline preload="auto" aria-hidden="true"></video>
              <div class="xp__glow" aria-hidden="true"></div>
              <button class="xp__replay" type="button" data-xp-replay hidden aria-label="Repetir animaci\xF3n">\u21BB Repetir</button>
            </div>
            <div class="xp__side">
              <div class="xp__chips" role="tablist" aria-label="Caracter\xEDsticas">
                ${_.map((s,m)=>`<button class="xp__chip" role="tab" aria-selected="false" data-xp="${s.id}" style="--i:${m}"><span aria-hidden="true">${s.icon}</span>${E(s.label)}</button>`).join("")}
              </div>
              <div class="xp__info" aria-live="polite">
                <h3 class="xp__info-title" data-xp-title>${x.title}</h3>
                <p class="xp__info-text" data-xp-text>${x.text}</p>
              </div>
              <div class="xp__cta">
                <a class="btn btn--primary" href="#/p/${u}?color=borgona">Comprar${t?` \xB7 desde ${E(t)}`:""}</a>
              </div>
              <p class="xp__note">Animaciones ilustrativas con fines de presentaci\xF3n.</p>
            </div>
          </div>
        </div>
      </section>`},mount(u=document){const t=u.querySelector(".xp");if(!t||t.dataset.mounted)return;t.dataset.mounted="1";const s=t.querySelector("[data-xp-stage]"),m=[...t.querySelectorAll(".xp__video")],C=t.querySelector(".xp__frame"),h=t.querySelector("[data-xp-replay]"),f=t.querySelector(".xp__info"),M=t.querySelector("[data-xp-title]"),A=t.querySelector("[data-xp-text]"),P=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let r=null,l=null,n="idle",o=null,b=0;const L=e=>{M.textContent=e?e.title:x.title,A.textContent=e?e.text:x.text,f.classList.remove("is-in"),f.offsetWidth,f.classList.add("is-in")},T=e=>t.querySelectorAll(".xp__chip").forEach(a=>a.setAttribute("aria-selected",String(a.dataset.xp===e))),$=(e,a=0)=>new Promise((d,v)=>{const q=++b,i=m.find(c=>c!==r)||m[0],w=()=>{i.onplaying=i.onended=i.onerror=i.onloadedmetadata=null};i.onerror=()=>{w(),v(new Error("video"))},i.onloadedmetadata=()=>{i.currentTime=Math.max(0,Math.min(a,(i.duration||0)-.05)),i.play().catch(c=>{w(),v(c)})},i.onplaying=()=>{if(q===b){if(i.classList.add("is-on"),r&&r!==i){const c=r;setTimeout(()=>{c.classList.remove("is-on"),c.pause()},120)}r=i,s.dataset.state="video"}},i.onended=()=>{w(),q===b&&d()},i.getAttribute("src")===e?i.onloadedmetadata():(i.src=e,i.load())}),S=e=>{s.dataset.state="frame",C.src=`${p}${e}.webp`,m.forEach(a=>{a.classList.remove("is-on"),a.pause()}),r=null,l=e,n="idle",h.hidden=!1},y=async()=>{const e=o;try{if(l&&(l!==e||n==="end")){const a=r,d=n==="fwd"&&a?Math.max(0,a.duration-a.currentTime)/1.5:0;if(n="rev",await $(`${p}${l}-rev.mp4`,d),l=null,n="idle",o!==e)return y()}if(l=e,n="fwd",await $(`${p}${e}.mp4`,0),o!==e)return y();n="end",h.hidden=!1}catch{o===e&&S(e)}},g=(e,{force:a=!1}={})=>{const d=_.find(v=>v.id===e);if(d&&!(e===o&&!a&&n!=="end")){if(o=e,T(e),L(d),h.hidden=!0,t.querySelector(`.xp__chip[data-xp="${e}"]`).scrollIntoView({block:"nearest",inline:"center",behavior:P?"auto":"smooth"}),P)return S(e);n!=="rev"&&y()}};h.addEventListener("click",()=>o&&g(o,{force:!0})),t.addEventListener("click",e=>{const a=e.target.closest("[data-xp]");a&&g(a.dataset.xp)});const I=()=>_.forEach(e=>{const a=document.createElement("link");a.rel="preload",a.as="video",a.href=`${p}${e.id}.mp4`,document.head.appendChild(a)});if("IntersectionObserver"in window){const e=new IntersectionObserver(([a])=>{a.isIntersecting&&(t.classList.add("is-visible"),I(),o||setTimeout(()=>!o&&g("chip"),700),e.disconnect())},{threshold:.35});e.observe(t)}else t.classList.add("is-visible")}}})();
