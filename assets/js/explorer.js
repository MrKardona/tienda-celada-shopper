(()=>{"use strict";const l="assets/explorer/",p=[{id:"chip",icon:"\u26A1",label:"Chip A20 Pro",title:"Chip A20 Pro.",text:"El cerebro del iPhone m\xE1s potente: velocidad y eficiencia para todo lo que hagas, desde juegos hasta edici\xF3n de video."},{id:"camara",icon:"\u{1F4F7}",label:"C\xE1mara 48 MP",title:"C\xE1mara Fusion de 48 MP con apertura variable.",text:"El diafragma se abre y se cierra como en una c\xE1mara profesional: m\xE1s luz de noche y un desenfoque natural del fondo."},{id:"pantalla",icon:"\u{1F4F1}",label:'Pantalla 6,9"',title:"Pantalla ProMotion de 6,9 pulgadas.",text:"Movimiento ultrafluido y colores vivos de borde a borde, en la pantalla m\xE1s grande de un iPhone Pro."},{id:"isla",icon:"\u{1F48A}",label:"Isla Din\xE1mica",title:"Isla Din\xE1mica.",text:"Tu m\xFAsica, alertas y actividades en vivo cobran vida alrededor de la c\xE1mara frontal, sin interrumpir lo que haces."},{id:"bateria",icon:"\u{1F50B}",label:"Bater\xEDa",title:"La mayor duraci\xF3n de bater\xEDa en un iPhone.",text:"Energ\xEDa para todo el d\xEDa y m\xE1s, con un dise\xF1o interno optimizado para rendir al m\xE1ximo."},{id:"botones",icon:"\u{1F39B}\uFE0F",label:"Botones",title:"Botones y Control de C\xE1mara.",text:"Atajos f\xEDsicos al alcance de tu dedo para abrir la c\xE1mara, cambiar de modo o activar tus funciones favoritas."}],u=r=>String(r).replace(/[&<>"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[e]);window.Explorer={html({productId:r="iphone-18-pro-max",price:e=""}={}){return`
      <section class="xp" aria-label="Explora el iPhone 18 Pro Max por dentro">
        <div class="xp__inner wrap">
          <div class="xp__head">
            <p class="xp__eyebrow">iPhone 18 Pro Max \xB7 Borgo\xF1a</p>
            <h2 class="xp__title">Desc\xFAbrelo por dentro.</h2>
            <p class="xp__lead">Toca una caracter\xEDstica y mira c\xF3mo funciona.</p>
          </div>
          <div class="xp__grid">
            <div class="xp__stage" data-xp-stage>
              <img class="xp__poster" src="${l}hero.webp" alt="iPhone 18 Pro Max color Borgo\xF1a" width="1200" height="1200" decoding="async">
              <img class="xp__frame" alt="" aria-hidden="true" decoding="async">
              <video class="xp__video" muted playsinline preload="none" aria-hidden="true"></video>
              <div class="xp__glow" aria-hidden="true"></div>
              <button class="xp__replay" type="button" data-xp-replay hidden aria-label="Repetir animaci\xF3n">\u21BB Repetir</button>
            </div>
            <div class="xp__side">
              <div class="xp__chips" role="tablist" aria-label="Caracter\xEDsticas">
                ${p.map((t,o)=>`<button class="xp__chip" role="tab" aria-selected="false" data-xp="${t.id}" style="--i:${o}"><span aria-hidden="true">${t.icon}</span>${u(t.label)}</button>`).join("")}
              </div>
              <div class="xp__info" aria-live="polite">
                <h3 class="xp__info-title" data-xp-title>Dise\xF1o en color Borgo\xF1a.</h3>
                <p class="xp__info-text" data-xp-text>Titanio pulido, c\xE1maras Pro y un acabado que no pasa desapercibido. Elige una caracter\xEDstica para explorarlo.</p>
              </div>
              <div class="xp__cta">
                <a class="btn btn--primary" href="#/p/${r}?color=borgona">Comprar${e?` \xB7 desde ${u(e)}`:""}</a>
              </div>
              <p class="xp__note">Animaciones ilustrativas con fines de presentaci\xF3n.</p>
            </div>
          </div>
        </div>
      </section>`},mount(r=document){const e=r.querySelector(".xp");if(!e)return;const t=e.querySelector("[data-xp-stage]"),o=e.querySelector(".xp__video"),m=e.querySelector(".xp__frame"),c=e.querySelector("[data-xp-replay]"),_=e.querySelector("[data-xp-title]"),v=e.querySelector("[data-xp-text]"),x=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let s=null;const d=a=>{const i=p.find(n=>n.id===a);if(i){if(s=a,e.querySelectorAll(".xp__chip").forEach(n=>n.setAttribute("aria-selected",String(n.dataset.xp===a))),e.querySelector(`.xp__chip[data-xp="${a}"]`).scrollIntoView({block:"nearest",inline:"center",behavior:x?"auto":"smooth"}),_.textContent=i.title,v.textContent=i.text,e.querySelector(".xp__info").classList.remove("is-in"),e.offsetWidth,e.querySelector(".xp__info").classList.add("is-in"),t.dataset.state="loading",c.hidden=!0,m.src=`${l}${a}.webp`,x){t.dataset.state="frame";return}o.src=`${l}${a}.mp4`,o.currentTime=0,o.play().then(()=>{t.dataset.state="video"}).catch(()=>{t.dataset.state="frame"})}};if(o.addEventListener("error",()=>{t.dataset.state="frame"}),o.addEventListener("ended",()=>{c.hidden=!1}),c.addEventListener("click",()=>s&&d(s)),e.addEventListener("click",a=>{const i=a.target.closest("[data-xp]");i&&d(i.dataset.xp)}),"IntersectionObserver"in window){const a=new IntersectionObserver(([i])=>{i.isIntersecting&&(e.classList.add("is-visible"),s||setTimeout(()=>!s&&d("chip"),700),a.disconnect())},{threshold:.35});a.observe(e)}else e.classList.add("is-visible")}}})();
