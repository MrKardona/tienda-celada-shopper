(async()=>{"use strict";const s=window.STORE,{catalog:I,live:j}=await window.loadCatalog();document.documentElement.classList.toggle("is-demo",!j);const N=window.CATEGORIES,v=Object.fromEntries(I.map(e=>[e.id,e])),l=(e,a=document)=>a.querySelector(e),L=(e,a=document)=>[...a.querySelectorAll(e)],ne=l("#app"),g=e=>"$"+Math.round(e).toLocaleString("es-CO"),F=e=>g(Math.ceil(e/s.installments)),i=e=>String(e??"").replace(/[&<>"']/g,a=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[a]),_e=e=>String(e).normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase(),W=e=>(N.find(a=>a.id===e)||{}).name||"",T=(e,a)=>(a&&e.colors.find(t=>t.id===a)||e.colors[0]).images[0],z=(e,a)=>e&&/[?&]width=\d+/.test(e)?e.replace(/width=\d+/,`width=${a}`):e,f={cat:e=>`/${e}/`,p:(e,a)=>`/${e.cat}/${e.id}/${a?"?"+a:""}`},X=(e,a)=>{history[a?"replaceState":"pushState"](null,"",e),V()},S=e=>`https://wa.me/${s.whatsapp}?text=${encodeURIComponent(e)}`,O={get(e,a){try{return JSON.parse(localStorage.getItem(e))??a}catch{return a}},set(e,a){try{localStorage.setItem(e,JSON.stringify(a))}catch{}}},ie=(e,a)=>s.protection.cats.includes(e.cat)?Math.max(s.protection.min,Math.round(a*s.protection.rate/1e3)*1e3):0,we=e=>e.configs.length>1||e.configs[0]!=="Est\xE1ndar",U=e=>e.colors.some(a=>a.hex),Ve=()=>{const e=Object.fromEntries(new Intl.DateTimeFormat("en-US",{timeZone:"America/Bogota",hour:"numeric",minute:"numeric",weekday:"short",hour12:!1}).formatToParts(new Date).map(a=>[a.type,a.value]));return{h:+e.hour%24,m:+e.minute,day:e.weekday}},We=".card__media,.gallery,.thumb,.chapter__img,.line__img,.tile__media,.hero__media",ze=".compare img,.mini img,.sres img,.combo__item img",J=(()=>{try{const e=document.createElement("canvas");return e.width=e.height=1,e.getContext("2d",{willReadFrequently:!0})}catch{return null}})(),Ce=e=>{if(!J||!e.complete||!e.naturalWidth)return;const a=e.closest(We),t=e.matches(ze);if(!(!a&&!t))try{J.clearRect(0,0,1,1),J.drawImage(e,3,3,1,1,0,0,1,1);const[o,n,r,d]=J.getImageData(0,0,1,1).data;d>250&&((t?e:a).style.backgroundColor=`rgb(${o}, ${n}, ${r})`)}catch{}};document.addEventListener("load",e=>{e.target.tagName==="IMG"&&Ce(e.target)},!0);let ke;const Ue=e=>{const a=l("#toast");a.innerHTML=e,a.classList.add("show"),clearTimeout(ke),ke=setTimeout(()=>a.classList.remove("show"),2600)},Z=s.marketing||{},re=()=>O.get("cs-consent",null);let ce=!1;function Ee(){if(!(ce||window.__PRERENDER||re()!=="all")&&(ce=!0,Z.metaPixelId&&((function(e,a,t,o,n,r,d){e.fbq||(n=e.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)},e._fbq||(e._fbq=n),n.push=n,n.loaded=!0,n.version="2.0",n.queue=[],r=a.createElement(t),r.async=!0,r.src=o,d=a.getElementsByTagName(t)[0],d.parentNode.insertBefore(r,d))})(window,document,"script","https://connect.facebook.net/en_US/fbevents.js"),window.fbq("init",Z.metaPixelId)),Z.ga4Id)){const e=document.createElement("script");e.async=!0,e.src=`https://www.googletagmanager.com/gtag/js?id=${Z.ga4Id}`,document.head.appendChild(e),window.dataLayer=window.dataLayer||[],window.gtag=function(){window.dataLayer.push(arguments)},window.gtag("js",new Date),window.gtag("config",Z.ga4Id,{send_page_view:!1})}}const Me={PageView:"page_view",ViewContent:"view_item",AddToCart:"add_to_cart",InitiateCheckout:"begin_checkout",Contact:"generate_lead"},H=(e,a={})=>{ce&&(window.fbq&&window.fbq("track",e,a),window.gtag&&Me[e]&&window.gtag("event",Me[e],{value:a.value,currency:a.currency,page_path:location.pathname}))};function Ze(){if(window.__PRERENDER)return;const e=(r,d)=>{try{if(d===void 0)return sessionStorage.getItem(r);sessionStorage.setItem(r,d)}catch{return null}};if(e("ic-help")==="closed")return;const a=+(e("ic-t0")||0)||Date.now();e("ic-t0",String(a));const t=25e3,o='<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="32" fill="#e8e8ed"/><path d="M12 60c2-11 10-17 20-17s18 6 20 17" fill="#1d1d1f"/><path d="M26 42h12l-2 6h-8z" fill="#f1c7a8"/><circle cx="32" cy="29" r="12" fill="#f5d2b5"/><path d="M20 28c0-9 5-14 12-14s12 5 12 13c-3-4-8-6-13-6-4 0-8 2-11 7z" fill="#2b2b2e"/><circle cx="27.5" cy="30" r="1.4" fill="#1d1d1f"/><circle cx="36.5" cy="30" r="1.4" fill="#1d1d1f"/><path d="M28 35.5c2.4 2 5.6 2 8 0" stroke="#1d1d1f" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M19 30a13 13 0 0 1 26 0" stroke="#FF5A36" stroke-width="2.2" fill="none"/><rect x="16.5" y="28" width="5" height="8" rx="2.5" fill="#FF5A36"/><rect x="42.5" y="28" width="5" height="8" rx="2.5" fill="#FF5A36"/><path d="M45 35c0 4-3 6-7 6" stroke="#FF5A36" stroke-width="1.8" fill="none"/></svg>',n=()=>{if(l(".cookies:not([hidden])")||document.body.classList.contains("menu-open")||l("#waFloat")&&l("#waFloat").hidden){setTimeout(n,5e3);return}const r=u&&u.m?u.m.name:"",d=r?`\xBFTienes dudas sobre el ${r}? Escr\xEDbeme y te ayudo a elegir.`:"\xBFBuscas algo en especial? Escr\xEDbeme y te ayudo a elegir.",p=document.createElement("div");p.className="helpb",p.setAttribute("role","dialog"),p.setAttribute("aria-label","Asesor por WhatsApp"),p.innerHTML=`<button class="helpb__x" type="button" aria-label="Cerrar">\xD7</button>
        <a class="helpb__card" target="_blank" rel="noopener" href="${S(`Hola ${s.name}, ${r?`estoy viendo el ${r} y `:""}quiero hablar con un asesor.`)}">
          <span class="helpb__av">${o}<i class="helpb__on"></i><span class="helpb__wave" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18"><path d="M8 13V6.5a1.5 1.5 0 0 1 3 0V11m0-5.5V4.5a1.5 1.5 0 0 1 3 0V11m0-5a1.5 1.5 0 0 1 3 0v6m0-3.5a1.5 1.5 0 0 1 3 0V15a7 7 0 0 1-7 7h-1a7 7 0 0 1-6-3.4l-2.6-4.4a1.5 1.5 0 0 1 2.5-1.6L8 15" fill="#FFD1A6" stroke="#1d1d1f" stroke-width="1.2" stroke-linejoin="round" stroke-linecap="round"/></svg></span></span>
          <span class="helpb__body"><b>Asesor iC <small>\xB7 en l\xEDnea</small></b>
            <span class="helpb__typing" aria-hidden="true"><i></i><i></i><i></i></span>
            <span class="helpb__msg">Hola, estoy aqu\xED para ayudarte. ${i(d)}</span>
            <span class="helpb__cta">${y("chat",16)} Escribir por WhatsApp</span></span>
        </a>`,document.body.appendChild(p),requestAnimationFrame(()=>p.classList.add("in")),setTimeout(()=>p.classList.add("typed"),1600);const c=()=>{e("ic-help","closed"),p.classList.remove("in"),setTimeout(()=>p.remove(),400)};p.querySelector(".helpb__x").addEventListener("click",c),p.querySelector(".helpb__card").addEventListener("click",()=>{H("Contact",{content_name:r||"asesor"}),e("ic-help","closed"),setTimeout(()=>p.remove(),300)})};setTimeout(n,Math.max(0,t-(Date.now()-a)))}function xe(e){if(window.__PRERENDER||!e&&re())return;let a=l("#cookies");a||(a=document.createElement("div"),a.id="cookies",a.className="cookies",document.body.appendChild(a)),a.innerHTML=`<p><b>Usamos cookies</b> para que la tienda funcione, recordar tu bolsa y mostrarte ofertas relevantes en redes sociales. Puedes aceptar todas o solo las necesarias. <a href="https://${s.shopifyDomain}/policies/privacy-policy" target="_blank" rel="noopener">Pol\xEDtica de privacidad</a> (Ley 1581 de 2012).</p>
      <div class="cookies__btns"><button class="btn btn--ghost btn--sm" data-consent="necessary">Solo necesarias</button><button class="btn btn--primary btn--sm" data-consent="all">Aceptar todas</button></div>`,a.hidden=!1,a.onclick=t=>{const o=t.target.closest("[data-consent]");o&&(O.set("cs-consent",o.dataset.consent),a.hidden=!0,o.dataset.consent==="all"&&(Ee(),H("PageView")))}}Ee(),document.addEventListener("click",e=>{e.target.closest('a[href*="wa.me"]')&&H("Contact")});let E=O.get("nova-cart",[]).map(e=>{const a=v[e.id],t=a&&a.variants.find(o=>o.color===e.color&&o.config===e.config);return t?{...e,price:t.price,vid:t.vid}:null}).filter(Boolean);const Y=()=>{O.set("nova-cart",E),Pe(),Ae()},ee=e=>(e.price+(e.protection||0))*e.qty,ae=()=>{const e=E.reduce((o,n)=>o+ee(n),0),a=E.reduce((o,n)=>o+(n.tradeIn?n.tradeIn.value:0),0);if(j)return{sub:e,trade:a,ship:null,total:e};const t=s.freeShippingFrom?e===0||e>=s.freeShippingFrom?0:s.shippingCost:null;return{sub:e,trade:a,ship:t,total:Math.max(0,e-a+t)}};function te({id:e,color:a,config:t,qty:o=1,protection:n=0,tradeIn:r=null}){const d=v[e],p=d.variants.find(h=>h.color===a&&h.config===t)||d.variants.find(h=>h.available)||d.variants[0];if(!p.available){Ue("Este producto es bajo encargo: te lo traemos con Celada Shopper.");return}const c=[e,p.color,p.config,n?"p":"",r?r.device+r.cond:""].join("|"),b=E.find(h=>h.key===c);b?b.qty+=o:E.push({key:c,id:e,color:p.color,config:p.config,qty:o,price:p.price,protection:n,tradeIn:r,sku:p.sku,vid:p.vid}),Y(),H("AddToCart",{content_ids:[String(p.vid||e)],content_type:"product",content_name:d.name,value:p.price*o,currency:"COP"}),Se()}const le=e=>{const t=v[e.id].colors.find(o=>o.id===e.color);return[e.config!=="Est\xE1ndar"?e.config:"",t?t.name:""].filter(Boolean).join(" \xB7 ")},Le=(e="")=>{const a=ae(),t=E.map(o=>`\u2022 ${o.qty} \xD7 ${v[o.id].name} (${le(o)}) \u2014 ${g(ee(o))}`+(o.protection?`
   + ${s.protection.name}`:"")+(o.tradeIn?`
   Retoma: ${o.tradeIn.device} (${o.tradeIn.cond}) \u2212${g(o.tradeIn.value)}`:""));return`Hola ${s.name}, quiero hacer este pedido:

${t.join(`
`)}

Subtotal: ${g(a.sub)}`+(a.trade?`
Descuento retoma (estimado): \u2212${g(a.trade)}`:"")+`
Env\xEDo: ${a.ship===null?"Se calcula al pagar":a.ship?g(a.ship):"Gratis"}
Total: ${g(a.total)}${e}`},Ge=()=>E.filter(e=>e.tradeIn).map(e=>`Retoma solicitada para ${v[e.id].name}: ${e.tradeIn.device} (${e.tradeIn.cond}), valor estimado ${g(e.tradeIn.value)}`).join(" | "),Qe=()=>window.shopifyCheckoutUrl(E,Ge());function Pe(){const e=E.reduce((t,o)=>t+o.qty,0),a=l("#cartCount");a.textContent=e,a.hidden=!e}function Ae(){const e=l("#cart"),a=ae(),t=Math.max(0,s.freeShippingFrom-a.sub),o=Math.min(100,a.sub/s.freeShippingFrom*100),n=new Set(E.map(d=>d.id)),r=["airpods-pro-3","cargador-magsafe","airtag","adaptador-40w"].filter(d=>v[d]&&v[d].available!==!1&&!n.has(d)).slice(0,2);e.innerHTML=`
      <div class="drawer__head"><h2>Tu bolsa</h2><button class="icon-btn" data-close-cart aria-label="Cerrar">\u2715</button></div>
      ${E.length?`
      ${j||!s.freeShippingFrom?"":`<div class="ship-meter">
        <p>${t?`Te faltan <b>${g(t)}</b> para tener <b>env\xEDo gratis</b>`:"\xA1Tu pedido tiene <b>env\xEDo gratis</b>!"}</p>
        <div class="ship-meter__bar"><span style="width:${o}%"></span></div>
      </div>`}
      <ul class="lines">${E.map((d,p)=>{const c=v[d.id];return`<li class="line">
          <a href="${f.p(c,"color="+d.color)}" class="line__img"><img crossorigin="anonymous" src="${T(c,d.color)}" alt="${i(c.name+" "+((c.colors.find(b=>b.id===d.color)||{}).name||""))}"></a>
          <div class="line__info">
            <a href="${f.p(c,"color="+d.color)}" class="line__name">${i(c.name)}</a>
            <p class="muted small">${i(le(d))}</p>
            ${d.protection?`<p class="small with-ico">${y("shield",16)} ${i(s.protection.name)} \xB7 ${g(d.protection)}</p>`:""}
            ${d.tradeIn?`<p class="small ok with-ico">${y("swap",16)} Retoma ${i(d.tradeIn.device)} \xB7 \u2212${g(d.tradeIn.value)}</p>`:""}
            <div class="line__row">
              <div class="qty" role="group" aria-label="Cantidad">
                <button data-qty="${p}" data-d="-1" aria-label="Menos">\u2212</button><span>${d.qty}</span><button data-qty="${p}" data-d="1" aria-label="M\xE1s">+</button>
              </div>
              <b>${g(ee(d))}</b>
            </div>
            <button class="link small" data-remove="${p}">Eliminar</button>
          </div></li>`}).join("")}</ul>
      ${r.length?`<div class="drawer__suggest"><p class="eyebrow">Complementa tu compra</p>${r.map(d=>{const p=v[d];return`<div class="mini"><img crossorigin="anonymous" src="${T(p)}" alt="${i(p.name)}" loading="lazy"><div><p class="small"><b>${i(p.name)}</b></p><p class="small muted">${g(p.fromPrice)}</p></div>
          <button class="btn btn--ghost btn--xs" data-quick="${d}">Agregar</button></div>`}).join("")}</div>`:""}
      <div class="drawer__foot">
        <dl class="sum">
          <div><dt>Subtotal</dt><dd>${g(a.sub)}</dd></div>
          ${a.trade?`<div class="ok"><dt>Retoma (estimado)</dt><dd>\u2212${g(a.trade)}</dd></div>`:""}
          <div><dt>Env\xEDo</dt><dd>${a.ship===null?"Se calcula al pagar":a.ship?g(a.ship):"Gratis"}</dd></div>
          <div class="sum__total"><dt>Total</dt><dd>${g(a.total)}</dd></div>
        </dl>
        ${j&&a.trade?'<p class="small muted center">El descuento por retoma se aplica cuando revisemos tu equipo.</p>':""}
        <p class="small muted center">o ${F(a.total)}/mes en ${s.installments} cuotas</p>
        ${j?`<a href="${i(Qe())}" class="btn btn--primary btn--block btn--ico">${y("lock",18)} Pagar de forma segura</a>${Ie()}`:'<a href="/checkout/" class="btn btn--primary btn--block" data-close-cart>Finalizar compra</a>'}
        <a href="${S(Le())}" target="_blank" rel="noopener" class="btn btn--wa btn--block">Pedir por WhatsApp</a>
      </div>`:`
      <div class="empty"><p>Tu bolsa est\xE1 vac\xEDa.</p><a class="btn btn--primary" href="/iphone/" data-close-cart>Ver iPhone</a></div>`}`}const Se=()=>{l("#cart").classList.add("open"),l("#cart").setAttribute("aria-hidden","false"),l("#cartBackdrop").hidden=!1,document.body.classList.add("locked")},de=()=>{l("#cart").classList.remove("open"),l("#cart").setAttribute("aria-hidden","true"),l("#cartBackdrop").hidden=!0,document.body.classList.remove("locked")};l("#cart").addEventListener("click",e=>{const a=e.target.closest("[data-qty]"),t=e.target.closest("[data-remove]"),o=e.target.closest("[data-quick]");if(a){const n=E[+a.dataset.qty];n.qty=Math.max(1,Math.min(5,n.qty+ +a.dataset.d)),Y()}if(t&&(E.splice(+t.dataset.remove,1),Y()),o){const n=v[o.dataset.quick];te({id:n.id,color:n.variants[0].color,config:n.variants[0].config})}e.target.closest("[data-close-cart]")&&de()}),l("#openCart").addEventListener("click",Se),l("#cart").addEventListener("click",e=>{e.target.closest('a[href*="/cart/"]')&&H("InitiateCheckout",{value:ae().total,currency:"COP",num_items:E.reduce((a,t)=>a+t.qty,0)})}),l("#cartBackdrop").addEventListener("click",de);const pe=e=>`
    <a class="card reveal" href="${f.p(e)}">
      ${e.badge||A(e)||j&&!e.available?`<div class="tags">${A(e)?'<span class="tag tag--used">Usado</span>':""}${e.badge?`<span class="tag">${i(e.badge)}</span>`:""}${j&&!e.available?'<span class="tag tag--out">Bajo encargo</span>':""}</div>`:""}
      <div class="card__media"><img crossorigin="anonymous" src="${z(T(e),600)}" alt="${i(G(e))}" loading="lazy" decoding="async" data-card-img></div>
      ${U(e)?`<div class="dots">${e.colors.slice(0,7).map(a=>`<span class="dot" style="--c:${a.hex}" title="${i(a.name)}" data-swap="${z(a.images[0],600)}" data-color="${a.id}"></span>`).join("")}</div>`:'<div class="dots"></div>'}
      <h3 class="card__name">${i(e.name)}</h3>
      <p class="card__tag">${A(e)&&Be(e)?`Bater\xEDa ${Be(e)}`:i(e.tagline)}</p>
      <p class="card__price">${A(e)&&e.variants.every(a=>a.price===e.fromPrice)?"":"Desde "}${g(e.fromPrice)}</p>
      <p class="card__cuota">o ${F(e.fromPrice)}/mes en ${s.installments} cuotas</p>
      <span class="btn btn--primary btn--sm">Comprar</span>
    </a>`,me=(e,a,t="")=>{const o=a.map(n=>v[n]).filter(Boolean);return o.length?`<section class="section shelf">
      <div class="section__head wrap"><div><h2 class="h2">${e}</h2>${t?`<p class="lead">${t}</p>`:""}</div>
        <div class="shelf__arrows"><button class="round" data-scroll="-1" aria-label="Anterior">\u2039</button><button class="round" data-scroll="1" aria-label="Siguiente">\u203A</button></div></div>
      <div class="shelf__track">${o.map(pe).join("")}</div></section>`:""},Ie=()=>'<p class="secure-note"><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5Zm-3 8V7a3 3 0 0 1 6 0v3H9Z"/></svg>Pago 100% seguro procesado por Shopify \xB7 datos cifrados</p>',Ke=()=>`<div class="trustband">${[["lock","Pago seguro","Pagas en el checkout de Shopify con cifrado SSL. No guardamos datos de tu tarjeta."],["shield","Originales y con garant\xEDa","Productos Apple nuevos y sellados, con garant\xEDa de un a\xF1o y el respaldo de Celada Shopper."],["back","Derecho de retracto","5 d\xEDas h\xE1biles para compras en l\xEDnea (Ley 1480 de 2011)."],["chat","Te acompa\xF1amos","Asesor\xEDa por WhatsApp antes y despu\xE9s de tu compra."]].map(([e,a,t])=>`<div class="trustband__item reveal"><span class="trustband__icon">${y(e)}</span><div><b>${a}</b><span>${t}</span></div></div>`).join("")}</div>`,se=()=>`<div class="paywall">${s.paymentMethods.map(e=>`<span class="pill">${i(e)}</span>`).join("")}</div>`,Te=e=>`<div class="faq">${e.map(([a,t])=>`<details><summary>${i(a)}</summary><p>${t}</p></details>`).join("")}</div>`,ue=[["\xBFLos productos son originales y nuevos?","S\xED. Todos los productos son Apple originales, nuevos y sellados de f\xE1brica."],["\xBFQu\xE9 garant\xEDa tienen?",s.warranty||"Antes de tu compra te explicamos por WhatsApp las condiciones de garant\xEDa de cada equipo."],["\xBFCon qu\xE9 transportadoras env\xEDan?",`En ${s.sameDayCity} entregamos el mismo d\xEDa. Al resto de Colombia enviamos con ${(s.carriers||[]).join(", ").replace(/, ([^,]*)$/," y $1")}, con n\xFAmero de gu\xEDa para rastrear tu pedido.`],["\xBFCu\xE1nto se demora el env\xEDo?",`En ${s.sameDayCity} entregamos el mismo d\xEDa. Al resto del pa\xEDs, en ${s.otherCitiesDays}, con n\xFAmero de gu\xEDa. El costo del env\xEDo se calcula al pagar seg\xFAn tu ciudad.`],...s.financing?[["\xBFPuedo comprar sin tarjeta de cr\xE9dito?",`S\xED. Puedes pagar a cuotas con ${s.financing.name}: ${s.financing.text}. La aprobaci\xF3n es r\xE1pida y te acompa\xF1amos por WhatsApp.`]]:[],["\xBFPuedo pagar a cuotas?",`S\xED, con tu tarjeta de cr\xE9dito${s.financing?" o con "+s.financing.name:""}. El n\xFAmero de cuotas y los intereses dependen de tu banco o de tu cr\xE9dito; escr\xEDbenos por WhatsApp y te asesoramos para elegir la mejor opci\xF3n.`],["\xBFPuedo pagar por transferencia bancaria?","S\xED. Puedes pagar por transferencia desde cualquier banco (Bancolombia, Davivienda, BBVA, Banco de Bogot\xE1 y m\xE1s). Coord\xEDnalo con un asesor por WhatsApp y te enviamos los datos de pago."],["\xBFPuedo devolver mi compra?","Tienes derecho de retracto de 5 d\xEDas h\xE1biles desde la entrega para compras en l\xEDnea, siempre que el producto est\xE9 sin usar y en su empaque original (Ley 1480 de 2011)."]],G=(e,a=e.colors[0],t=0)=>`${e.name}${a&&a.hex?" color "+a.name:a&&a.name!=="Est\xE1ndar"?" "+a.name:""}${t?" \u2013 vista "+(t+1):""} original en Colombia`,qe=e=>{const a=N.find(o=>o.id===e),t=a&&v[a.hero];return t&&t.badge?t:I.find(o=>o.cat===e&&o.badge)||null},he=(e,a)=>[...e].sort((t,o)=>(o===a)-(t===a)||!!o.badge-!!t.badge),je={chip:'<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9.5 9.5h5v5h-5zM9 2.5V6M15 2.5V6M9 18v3.5M15 18v3.5M2.5 9H6M2.5 15H6M18 9h3.5M18 15h3.5"/>',battery:'<rect x="2.5" y="7" width="17" height="10" rx="2.5"/><path d="M21.5 10.5v3M6 10v4M9.5 10v4"/>',camera:'<path d="M3 8.5A2 2 0 0 1 5 6.5h2.2l1.6-2h6.4l1.6 2H19a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8.5Z"/><circle cx="12" cy="13" r="3.8"/>',display:'<rect x="2.5" y="4" width="19" height="13" rx="2"/><path d="M8.5 20.5h7M12 17v3.5"/>',sound:'<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/>',magsafe:'<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><path d="M12 20.5v1.5"/>',water:'<path d="M12 3s6.5 7.2 6.5 11.5a6.5 6.5 0 0 1-13 0C5.5 10.2 12 3 12 3Z"/>',location:'<path d="M12 21s7-6.2 7-11.5a7 7 0 1 0-14 0C5 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>',pencil:'<path d="m4 20 1.2-4.6L16.6 4a2 2 0 0 1 2.8 2.8L8 18.2 4 20Z"/><path d="m14.5 6 3.5 3.5"/>',cable:'<path d="M7 3v4M11 3v4M5.5 7h7v3.5a3.5 3.5 0 0 1-7 0V7ZM9 14v2.5a4.5 4.5 0 0 0 9 0V4"/>',heart:'<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20Z"/>',sparkle:'<path d="M12 3.5 13.8 10 20.5 12l-6.7 2L12 20.5 10.2 14 3.5 12l6.7-2L12 3.5Z"/>',bolt:'<path d="M13 2 4.5 13.5H11L10 22l8.5-11.5H12L13 2Z"/>',truck:'<path d="M2.5 6.5h11v9h-11zM13.5 9.5h4l3 3.2v2.8h-7"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="16.5" cy="17.5" r="1.8"/>',card:'<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 9.5h19M6 15h4"/>',shield:'<path d="M12 2.8 4.5 5.8v5.7c0 4.6 3.1 7.9 7.5 9.7 4.4-1.8 7.5-5.1 7.5-9.7V5.8L12 2.8Z"/><path d="m8.7 12 2.3 2.3 4.4-4.6"/>',box:'<path d="M3.5 7.5 12 3l8.5 4.5v9L12 21l-8.5-4.5v-9Z"/><path d="m3.5 7.5 8.5 4.5 8.5-4.5M12 12v9"/>',moto:'<circle cx="5.5" cy="16.5" r="3"/><circle cx="18.5" cy="16.5" r="3"/><path d="M5.5 16.5h7l3.5-6.5h2.5M14 10l-1.8-3.5H9.5M18.5 16.5 16 10"/>',store:'<path d="M3 20.5V9.2l9-5 9 5v11.3"/><path d="M7.5 20.5v-7h9v7M7.5 17h9"/>',home:'<path d="M4 11 12 4.2l8 6.8v9.5H4V11Z"/><path d="M9.5 20.5v-5.5h5v5.5"/>',bank:'<path d="M3 9.5 12 4l9 5.5M4.5 10.5v7.5M9.5 10.5v7.5M14.5 10.5v7.5M19.5 10.5v7.5M3 20.5h18"/>',idcard:'<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><circle cx="8.5" cy="11" r="2.2"/><path d="M5.3 16.2c.6-1.6 1.8-2.4 3.2-2.4s2.6.8 3.2 2.4M14 10h4.5M14 13.5h3"/>',lock:'<rect x="4.5" y="10.5" width="15" height="10.5" rx="2.5"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/>',back:'<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>',check:'<path d="m5 12.5 4.5 4.5L19 7.5"/>',swap:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16m0 4v-4h-4"/>',chat:'<path d="M20.5 11.6a8.3 8.3 0 0 1-12 7.4L3.5 20.5l1.4-4.4a8.3 8.3 0 1 1 15.6-4.5Z"/><path d="M8.5 11.8h.01M12 11.8h.01M15.5 11.8h.01" stroke-width="2.4"/>'},y=(e,a=24)=>`<svg class="ico" viewBox="0 0 24 24" width="${a}" height="${a}" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${je[e]}</svg>`,Xe=(e,a,t,o,n)=>`
    <div class="ship" data-ship="${e}">
      <div class="ship__head"><span class="ship__badge">${a}</span>${t}</div>
      <div class="ship__track" style="--n:${n.length}">
        <div class="ship__line"><span class="ship__fill"></span><span class="ship__vehicle">${y(o,18)}</span></div>
        <ol class="ship__steps">${n.map(([r,d])=>`<li class="ship__step"><span class="ship__dot">${y(r,16)}</span><span class="ship__label">${d}</span></li>`).join("")}</ol>
      </div>
    </div>`,A=e=>!!e.used,Be=e=>{const a=e.configs.map(t=>parseInt(t,10)).filter(t=>!isNaN(t));return a.length?Math.min(...a)===Math.max(...a)?`${a[0]}%`:`${Math.min(...a)}\u2013${Math.max(...a)}%`:""},Je='<span class="used-pill">Usado \xB7 revisado</span>',ge='<span class="launch-pill">Nuevo lanzamiento</span>',De=(e,a)=>s.hero.video&&e.id===s.hero.id&&a.id===s.hero.color?`<video class="hero__video" src="${s.hero.video}" muted loop playsinline preload="auto" aria-hidden="true"></video>`:"",be=()=>O.get("nova-recent",[]).filter(e=>v[e]);function Ye(){const e=v[s.hero.id]||I.find(n=>n.cat==="iphone")||I[0];if(!e)return'<section class="wrap section center"><h1 class="h2">Muy pronto</h1><p class="lead">Estamos preparando nuestra tienda Apple.</p></section>';const a=e.colors.find(n=>n.id===s.hero.color)||e.colors[0],t=s.tiles.map(n=>v[n]).filter(Boolean),o=s.tradeIn;return`
    <section class="hero">
      <div class="hero__copy">
        ${e.badge?ge:""}
        <h2 class="hero__title">${i(s.hero.title)}</h2>
        <p class="hero__sub">${i(s.hero.headline)}</p>
        <p class="hero__price">Desde ${g(e.fromPrice)} o <b>${F(e.fromPrice)}/mes</b> en ${s.installments} cuotas</p>
        <div class="cta-row"><a class="btn btn--primary btn--lg" href="${f.p(e,"color="+a.id)}">Comprar</a><a class="btn btn--link" href="/iphone/">Ver todos los iPhone \u203A</a></div>
      </div>
      <div class="hero__media"><img crossorigin="anonymous" src="${a.images[0]}" alt="${i(G(e,a))}" fetchpriority="high">${De(e,a)}</div>
    </section>

    <section class="trustline wrap">
      <h1 class="trustline__title">Tienda de productos Apple en ${i(s.sameDayCity)} \xB7 Env\xEDos a toda Colombia</h1>
      <ul class="trustline__items">
        <li>${y("shield",18)} Originales y sellados</li>
        <li>${y("lock",18)} Pago protegido por Shopify</li>
        <li>${y("check",18)} Si no lo tenemos, te lo traemos de USA</li>
        <li>${y("chat",18)} Atenci\xF3n real por WhatsApp</li>
      </ul>
    </section>

    <section class="chapters wrap" aria-label="Categor\xEDas">
      ${N.map(n=>{const r=v[n.hero]||I.find(d=>d.cat===n.id);return r?`<a class="chapter" href="${f.cat(n.id)}"><span class="chapter__img"><img crossorigin="anonymous" src="${T(r)}" alt="${i(r.name)}" loading="lazy"></span><span>${n.name}</span></a>`:""}).join("")}
    </section>

    <section class="benefits wrap" aria-label="Por qu\xE9 comprar con nosotros">
      ${[["bolt",`Entrega hoy en ${s.sameDayCity}`,"Rec\xEDbelo el mismo d\xEDa de tu compra"],["truck","Env\xEDos a toda Colombia",`En ${s.otherCitiesDays}, con n\xFAmero de gu\xEDa`],["card",`Hasta ${s.installments} cuotas`,s.financing?`Con tarjeta de cr\xE9dito o ${s.financing.name}`:"Con tu tarjeta de cr\xE9dito"],["shield","Originales y sellados","Productos Apple nuevos de f\xE1brica"],["chat","Asesor\xEDa experta","Te ayudamos a elegir por WhatsApp"]].map(([n,r,d])=>`<div class="benefit"><span class="benefit__icon">${y(n)}</span><div class="benefit__txt"><b>${r}</b><p>${i(d)}</p></div></div>`).join("")}
      <div class="benefits__line" aria-hidden="true"><span></span></div>
    </section>

    ${window.Explorer?window.Explorer.html({productId:"iphone-18-pro-max",price:v["iphone-18-pro-max"]?g(v["iphone-18-pro-max"].fromPrice):""}):""}

    <section class="tiles wrap">
      ${t.map((n,r)=>`
        <article class="tile ${r%3===0?"tile--wide":""} reveal">
          <div class="tile__copy">
            ${n.badge?`<p class="eyebrow eyebrow--accent">${i(n.badge)}</p>`:""}
            <h2 class="tile__title">${i(n.name)}</h2>
            <p class="tile__sub">${i(n.tagline)}</p>
            <p class="tile__price">Desde ${g(n.fromPrice)} \xB7 ${F(n.fromPrice)}/mes</p>
            <div class="cta-row"><a class="btn btn--primary btn--sm" href="${f.p(n)}">Comprar</a><a class="btn btn--link" href="${f.cat(n.cat)}">M\xE1s ${W(n.cat)} \u203A</a></div>
          </div>
          <a class="tile__media" href="${f.p(n)}"><img crossorigin="anonymous" src="${T(n)}" alt="${i(G(n))}" loading="lazy"></a>
        </article>`).join("")}
    </section>

    ${me("Nuestros recomendados",s.bestSellers,"Los imprescindibles para estrenar este mes.")}

    ${s.tradeIn.enabled?`<section class="section wrap">
      <div class="tradein-band reveal">
        <div>
          <p class="eyebrow">Plan Retoma</p>
          <h2 class="h2">Tu iPhone vale m\xE1s de lo que crees.</h2>
          <p class="lead">Entr\xE9galo como parte de pago y estrena hoy. Cotiza en segundos.</p>
        </div>
        <form class="tradein-quick" id="tradeQuick">
          <label>Tu equipo<select name="device">${o.devices.map(([n],r)=>`<option value="${r}">${i(n)}</option>`).join("")}</select></label>
          <label>Estado<select name="cond">${o.conditions.map(([n],r)=>`<option value="${r}">${n}</option>`).join("")}</select></label>
          <p class="tradein-quick__value">Recibe hasta <b id="tradeQuickVal"></b></p>
          <a class="btn btn--primary btn--block" href="/iphone/">Elegir mi nuevo iPhone</a>
        </form>
      </div>
    </section>`:""}

    ${be().length?me("Vistos recientemente",be()):""}

    <section class="section wrap center">
      <h2 class="h2">Paga como prefieras.</h2>
      <p class="lead">Paga con tarjeta de cr\xE9dito, transferencia desde cualquier banco${s.financing?` o con <b>${i(s.financing.name)}</b>, ${i(s.financing.text)}`:""}. \xBFQuieres pagar a cuotas? <a href="${S("Hola, quiero asesor\xEDa para pagar a cuotas")}" target="_blank" rel="noopener">Pide asesor\xEDa</a>.</p>
      ${se()}
    </section>

    <section class="section wrap">
      <h2 class="h2 center">\xBFPor qu\xE9 comprar en ${i(s.name)}?</h2>
      <div class="why">
        ${[["Productos 100% originales","Nuevos y sellados. Nada de r\xE9plicas ni reacondicionados sin avisar."],["Asesor\xEDa experta","Te ayudamos a elegir por WhatsApp, sin presi\xF3n y con respuesta r\xE1pida."],["Entrega r\xE1pida",`El mismo d\xEDa en ${s.sameDayCity} y en ${s.otherCitiesDays} al resto del pa\xEDs, con seguimiento.`],["Pago seguro",`Pagas en el checkout seguro de Shopify con tarjeta de cr\xE9dito${s.financing?" o "+s.financing.name:""}; tus datos est\xE1n protegidos.`]].map(([n,r])=>`<div class="why__item reveal"><h3>${n}</h3><p>${r}</p></div>`).join("")}
      </div>
    </section>

    <section class="section wrap">
      <h2 class="h2 center">Compra con total confianza</h2>
      <p class="lead center">Tu compra est\xE1 protegida de principio a fin.</p>
      ${Ke()}
    </section>

    <section class="section wrap narrow seo-text">
      <h2 class="h2">Tu tienda Apple en ${i(s.sameDayCity)}, con env\xEDos a toda Colombia</h2>
      <p>En ${i(s.name)} vendemos productos Apple originales, nuevos y sellados: <a href="/iphone/">iPhone</a>, <a href="/mac/">MacBook</a>, <a href="/ipad/">iPad</a>, <a href="/watch/">Apple Watch</a>, <a href="/airpods/">AirPods</a> y <a href="/accesorios/">accesorios</a>. Si buscas una tienda de iPhone en ${i(s.sameDayCity)}, te lo entregamos el mismo d\xEDa; al resto del pa\xEDs enviamos en ${i(s.otherCitiesDays)} con n\xFAmero de gu\xEDa.</p>
      <p>Paga con tarjeta de cr\xE9dito en el checkout seguro de Shopify, por transferencia desde cualquier banco${s.financing?" o con "+i(s.financing.name):""}; si quieres pagar a cuotas, te asesoramos. ${["iphone-18-pro-max","iphone-17","airpods-pro-3","macbook-air-13-m5"].filter(n=>v[n]).map(n=>`<a href="${f.p(v[n])}">${i(v[n].name)}</a>`).join(", ")} y m\xE1s modelos, con asesor\xEDa por WhatsApp para que elijas el ideal.</p>
    </section>

    <section class="section wrap narrow">
      <h2 class="h2 center">Preguntas frecuentes</h2>
      ${Te(ue)}
    </section>`}function ea(e,a){const t=N.find(c=>c.id===e);if(!t)return ve();const o=qe(e);let n=he(I.filter(c=>c.cat===e&&!A(c)),o);const r=I.filter(c=>c.cat===e&&A(c)).sort((c,b)=>b.fromPrice-c.fromPrice),d=a.get("orden")||"rec";d==="asc"&&(n=[...n].sort((c,b)=>c.fromPrice-b.fromPrice)),d==="desc"&&(n=[...n].sort((c,b)=>b.fromPrice-c.fromPrice));const p=c=>[...new Set(c.configs.map(b=>(/(\d+\s?(GB|TB))/.exec(b)||[])[1]).filter(Boolean))];return`
    <section class="cat-hero wrap">
      <h1 class="display">${i(t.name)}</h1>
      <p class="lead">${i(t.blurb)}</p>
    </section>
    ${o?(()=>{const c=e==="iphone"&&o.colors.find(b=>b.id===s.hero.color)||o.colors[0];return`
    <section class="hero hero--cat" aria-label="Nuevo lanzamiento">
      <div class="hero__copy">
        ${ge}
        <h2 class="hero__title">${i(o.name)}</h2>
        <p class="hero__sub">${i(o.tagline)}</p>
        <p class="hero__price">Desde ${g(o.fromPrice)} o <b>${F(o.fromPrice)}/mes</b> en ${s.installments} cuotas</p>
        <div class="cta-row"><a class="btn btn--primary btn--lg" href="${f.p(o,"color="+c.id)}">Comprar</a>${j&&!o.available?'<span class="muted small">Bajo encargo \xB7 te lo traemos desde USA</span>':""}</div>
      </div>
      <a class="hero__media" href="${f.p(o,"color="+c.id)}"><img crossorigin="anonymous" src="${c.images[0]}" alt="${i(G(o,c))}" fetchpriority="high">${De(o,c)}</a>
    </section>`})():""}
    <div class="wrap toolbar">
      <p class="muted">${n.length} modelos nuevos \xB7 <a href="#usados">${r.length?`Ver usados (${r.length})`:"Usados"}</a></p>
      <label class="select">Ordenar
        <select id="sortSel">
          <option value="rec" ${d==="rec"?"selected":""}>Recomendados</option>
          <option value="asc" ${d==="asc"?"selected":""}>Menor precio</option>
          <option value="desc" ${d==="desc"?"selected":""}>Mayor precio</option>
        </select></label>
    </div>
    <section class="grid wrap">${n.map(pe).join("")}</section>
    <section class="section wrap used" id="usados" aria-label="${i(t.name)} usados">
      <div class="used__head"><p class="label">Seminuevos</p><h2 class="h2">${i(t.name)} usados</h2><p class="lead">${i(s.usedText||"")}</p></div>
      ${r.length?`<div class="grid">${r.map(pe).join("")}</div>`:`<div class="used__empty"><p><b>Muy pronto tendremos ${i(t.name)} usados.</b> \xBFBuscas uno en particular? Te avisamos cuando llegue.</p><a class="btn btn--wa btn--sm" target="_blank" rel="noopener" href="${S(`Hola ${s.name}, busco un ${t.name} usado. \xBFMe avisan cuando tengan?`)}">Av\xEDsame por WhatsApp</a></div>`}
    </section>
    ${["iphone","ipad","mac","watch"].includes(e)?`
    <section class="section wrap">
      <h2 class="h2">Compara los modelos</h2>
      <div class="compare-wrap"><table class="compare">
        <thead><tr><th>Modelo</th><th>Precio desde</th><th>Cuota desde</th><th>${e==="watch"?"Tama\xF1os":"Almacenamiento"}</th><th>Acabados</th><th></th></tr></thead>
        <tbody>${he(I.filter(c=>c.cat===e&&!A(c)),o).map(c=>`<tr>
          <td><a href="${f.p(c)}"><img crossorigin="anonymous" src="${T(c)}" alt="" loading="lazy">${i(c.name)}</a></td>
          <td>${g(c.fromPrice)}</td><td>${F(c.fromPrice)}/mes</td>
          <td>${e==="watch"?[...new Set(c.configs.map(b=>b.split(" \xB7 ")[0]))].join(", "):p(c).join(", ")}</td>
          <td><span class="dots dots--inline">${c.colors.map(b=>`<span class="dot" style="--c:${b.hex}" title="${i(b.name)}"></span>`).join("")}</span></td>
          <td><a class="btn btn--primary btn--xs" href="${f.p(c)}">Comprar</a></td></tr>`).join("")}</tbody>
      </table></div>
    </section>`:""}
    ${t.seo?`<section class="section wrap narrow seo-text"><h2 class="h2">${i(t.seo.h2)}</h2><p>${i(t.seo.text)}</p></section>`:""}
    <section class="section wrap center">${se()}</section>`}let u=null;function aa(e,a){const t=v[e];if(!t)return ve();const o=[e,...be().filter(h=>h!==e)].slice(0,10);O.set("nova-recent",o);const n=j&&t.variants.filter(h=>h.available).sort((h,q)=>t.colors.findIndex(m=>m.id===h.color)-t.colors.findIndex(m=>m.id===q.color)||h.price-q.price)[0],r=t.colors.find(h=>h.id===a.get("color"))?a.get("color"):n?n.color:t.colors[0].id,d=t.variants.filter(h=>h.color===r).sort((h,q)=>h.price-q.price),p=d.find(h=>h.config===a.get("config"))?a.get("config"):(d.find(h=>h.available)||d[0]).config;u={m:t,color:r,config:p,img:0,protect:!1,trade:null};const c=(s.crossSell[t.cat]||[]).filter(h=>h!==e),b=t.cat==="iphone";return`
    <nav class="crumbs wrap" aria-label="Ruta"><a href="/">Inicio</a><span>\u203A</span><a href="${f.cat(t.cat)}">${W(t.cat)}</a><span>\u203A</span><span>${i(t.name)}</span></nav>
    <section class="pdp wrap">
      <div class="pdp__gallery">
        <div class="gallery">
          <button class="round gallery__nav gallery__nav--prev" data-gal="-1" aria-label="Imagen anterior">\u2039</button>
          <img id="galMain" crossorigin="anonymous" src="" alt="${i(t.name)}">
          <button class="round gallery__nav gallery__nav--next" data-gal="1" aria-label="Imagen siguiente">\u203A</button>
        </div>
        <div class="thumbs" id="thumbs"></div>
      </div>

      <div class="pdp__buy" id="buyBox">
        ${A(t)?Je:t.badge?ge:""}
        <h1 class="pdp__title">${i(t.name)}</h1>
        <p class="pdp__tag">${i(t.tagline)}</p>
        <div class="price-box" id="priceBox"></div>

        <fieldset class="opt">
          <legend>${U(t)?"Color":"Modelo"}. <b id="colorName"></b></legend>
          <div class="${U(t)?"swatches":"chips"}" id="colorOpts">
            ${t.colors.map(h=>U(t)?`<button class="swatch" style="--c:${h.hex}" data-color="${h.id}" aria-label="${i(h.name)}" title="${i(h.name)}"></button>`:`<button class="chip" data-color="${h.id}">${i(h.name)}</button>`).join("")}
          </div>
        </fieldset>

        ${we(t)?`<fieldset class="opt">
          <legend>${A(t)?"Salud de bater\xEDa":t.cat==="watch"?"Tama\xF1o y conectividad":t.cat==="mac"?"Configuraci\xF3n":"Capacidad"}.</legend>
          <div class="configs" id="configOpts"></div>
        </fieldset>`:""}

        ${b&&s.tradeIn.enabled?`<fieldset class="opt tradein" id="tradeBox">
          <legend>\xBFTienes un smartphone para entregar como parte de pago?</legend>
          <div class="seg"><button class="seg__btn" data-trade="yes">S\xED, cotizar retoma</button><button class="seg__btn is-on" data-trade="no">No, gracias</button></div>
          <div class="tradein__form" id="tradeForm" hidden>
            <label>Modelo<select id="tradeDevice">${s.tradeIn.devices.map(([h],q)=>`<option value="${q}">${i(h)}</option>`).join("")}</select></label>
            <label>Estado<select id="tradeCond">${s.tradeIn.conditions.map(([h],q)=>`<option value="${q}">${h}</option>`).join("")}</select></label>
            <p class="small muted">Valor estimado. Se confirma con la revisi\xF3n t\xE9cnica al entregar tu equipo.</p>
          </div>
        </fieldset>`:""}

        ${s.protection.cats.includes(t.cat)?`<label class="protect">
          <input type="checkbox" id="protect">
          <span><b>Agrega ${i(s.protection.name)}</b> por <b id="protectPrice"></b><br><span class="small muted">Cubre da\xF1os accidentales, pantalla rota y contacto con l\xEDquidos. Reemplazo r\xE1pido.</span></span>
        </label>`:""}

        <div class="buy-actions">
          <button class="btn btn--primary btn--lg btn--block" id="addBtn">Comprar</button>
          ${s.partner?`<div class="partner-note" id="partnerNote" hidden><p>${i(s.partner.text)}</p><a class="btn btn--wa btn--lg btn--block" id="partnerBtn" target="_blank" rel="noopener">Traerlo bajo encargo con Celada Shopper</a></div>`:""}
          <a class="btn btn--wa btn--lg btn--block" id="waBuy" target="_blank" rel="noopener">Comprar con asesor por WhatsApp</a>
          ${Ie()}
        </div>

        <div id="combo"></div>
        <div class="paybox" id="pagos">
          <p class="paybox__title">Formas de pago</p>
          <ul class="paybox__list">
            <li><span class="paybox__ico">${y("card",20)}</span><div><b>Tarjeta de cr\xE9dito</b><span>Pago seguro y cifrado en el checkout de Shopify</span></div></li>
            <li><span class="paybox__ico">${y("bank",20)}</span><div><b>Transferencia bancaria</b><span>Desde cualquier banco: Bancolombia, Davivienda, BBVA, Banco de Bogot\xE1 y m\xE1s</span></div></li>
            ${s.financing?`<li><span class="paybox__ico">${y("idcard",20)}</span><div><b>${i(s.financing.name)}</b><span>Cr\xE9dito solo con tu c\xE9dula, sin tarjeta de cr\xE9dito</span></div></li>`:""}
          </ul>
          <div class="paybox__cuotas">
            <div><b>\xBFQuieres pagarlo a cuotas?</b><span>Te asesoramos para elegir el plan de cuotas con tu tarjeta o ${s.financing?i(s.financing.name):"tu banco"}.</span></div>
            <a class="btn btn--wa btn--sm" id="payAdvice" target="_blank" rel="noopener">Pedir asesor\xEDa</a>
          </div>
        </div>
        <div class="ships">
          ${Xe("nacional",`${i(s.otherCitiesDays)}`,`<div><b>Env\xEDos a toda Colombia</b><br><span class="muted small">Con n\xFAmero de gu\xEDa para rastrear tu pedido. El costo se calcula al pagar.</span>${s.carriers&&s.carriers.length?`<div class="ship__carriers"><span>Env\xEDo realizado por</span>${s.carriers.map(h=>`<b>${i(h)}</b>`).join("")}</div>`:""}</div>`,"truck",[["store",`Bodega ${i(s.sameDayCity)}`],["truck","Transportadora"],["store","Bodega destino"],["home","En tus manos"]])}
        </div>
        <ul class="delivery">
          <li><span class="delivery__ico">${y("chat",22)}</span><div><b>\xBFDudas? Te asesoramos</b><br><span class="muted small">Escr\xEDbenos por WhatsApp y te respondemos en minutos.</span></div></li>
        </ul>
        <ul class="trust">
          ${A(t)?`<li>${y("shield",16)} Original Apple \xB7 usado revisado</li><li>${y("check",16)} Fotos y video reales antes de comprar</li>`:`<li>${y("shield",16)} Original y sellado</li><li>${y("check",16)} Garant\xEDa de 1 a\xF1o</li>`}<li>${y("lock",16)} Pago seguro en Shopify</li><li>${y("back",16)} Retracto 5 d\xEDas h\xE1biles</li>
        </ul>
        ${se()}
      </div>
    </section>

    ${/^iphone-18-pro/.test(t.id)&&window.Explorer?window.Explorer.html({productId:"iphone-18-pro-max",price:v["iphone-18-pro-max"]?g(v["iphone-18-pro-max"].fromPrice):""}):""}
    ${ta(t)}
    <section class="section wrap narrow pinfo">
      <details><summary>Garant\xEDa, env\xEDo y retracto</summary><div class="pinfo__text"><p><b>Garant\xEDa:</b> ${i((A(t)?s.usedWarranty:s.warranty)||"")}</p><p><b>Env\xEDo:</b> mismo d\xEDa en ${i(s.sameDayCity)} y ${i(s.otherCitiesDays)} al resto de Colombia con ${i((s.carriers||[]).join(", "))}.</p><p><b>Retracto:</b> 5 d\xEDas h\xE1biles desde la entrega para compras en l\xEDnea, con el producto sin usar y en su empaque original (Ley 1480 de 2011).</p></div></details>
      <p class="about__seo">Compra tu ${i(t.name)} ${A(t)?"usado, original y revisado,":"original y sellado"} en ${i(s.name)}: entrega el mismo d\xEDa en ${i(s.sameDayCity)}, env\xEDos a toda Colombia en ${i(s.otherCitiesDays)} y pago hasta en ${s.installments} cuotas con tu tarjeta de cr\xE9dito. Mira todos los <a href="${f.cat(t.cat)}">${i(W(t.cat))} disponibles</a>.</p>
    </section>
    ${c.length?me("Arma tu combo perfecto",c,`Lo que m\xE1s compran junto con ${i(t.name)}.`):""}
    <section class="section wrap narrow"><h2 class="h2 center">Preguntas frecuentes</h2>${Te(ue)}</section>

    <div class="buybar" id="buybar" aria-hidden="true">
      <div class="buybar__inner wrap">
        <div><b>${i(t.name)}</b><span class="muted small" id="barLabel"></span></div>
        <div class="buybar__right"><span id="barPrice"></span><button class="btn btn--primary btn--sm" id="barAdd">Comprar</button></div>
      </div>
    </div>`}function ta(e){const a=(window.PRODUCT_INFO||{})[e.id]||{},t=a.highlights||[],o=a.gallery||[],n=a.features||[],r=a.inBox||[],d=A(e),p=d?[["shield","Original Apple revisado","Equipo original, revisado antes de la venta y con su salud de bater\xEDa real."],["camera","Fotos y video reales","Antes de comprar te enviamos fotos y video del equipo exacto por WhatsApp."],["store","Respaldo Celada Shopper","Compras con el respaldo de Celada Shopper, una empresa real con operaci\xF3n en Colombia y USA."],["chat","Te acompa\xF1amos","Resolvemos tus dudas por WhatsApp antes y despu\xE9s de la compra."]]:[["shield","Garant\xEDa de 1 a\xF1o","Todos nuestros productos nuevos, incluidos los celulares, tienen un a\xF1o de garant\xEDa."],["check","100 % originales","Productos Apple originales, nuevos y en su caja sellada."],["store","Respaldo Celada Shopper","Cuentas con el respaldo y la garant\xEDa de Celada Shopper, una empresa real con operaci\xF3n en Colombia y USA."],["chat","Te acompa\xF1amos","Si necesitas usar la garant\xEDa, te ayudamos por WhatsApp en todo el proceso."]],c=s.team&&s.team.photo;return`<section class="pstory">
      <div class="wrap narrow pstory__head reveal">
        <p class="eyebrow">Acerca del ${i(e.name)}</p>
        <h2 class="pstory__title">${i(a.headline||e.tagline||e.name)}</h2>
        ${a.intro||e.description?`<p class="pstory__intro">${i(a.intro||e.description)}</p>`:""}
      </div>
      ${t.length?`<div class="wrap hl hl--${Math.min(t.length,4)}">${t.map(([b,h,q])=>`<div class="hl__item reveal"><span class="hl__ico">${y(je[b]?b:"sparkle",26)}</span><h3>${i(h)}</h3><p>${i(q)}</p></div>`).join("")}</div>`:""}
      ${o.length?`<div class="wrap pgal pgal--${Math.min(o.length,4)}">${o.slice(0,4).map((b,h)=>`<figure class="pgal__item reveal"><img src="${i(b)}" alt="${i(e.name)} \u2013 detalle ${h+1}" loading="lazy" decoding="async"></figure>`).join("")}</div>`:""}
      ${n.length||r.length||a.compat?`<div class="wrap narrow pspec">
        ${n.length?`<div class="pspec__block reveal"><h3 class="pspec__h">Especificaciones</h3><dl class="pspec__list">${n.map(([b,h])=>`<div><dt>${i(b)}</dt><dd>${i(h)}</dd></div>`).join("")}</dl></div>`:""}
        ${r.length?`<div class="pspec__block reveal"><h3 class="pspec__h">En la caja</h3><ul class="pspec__box">${r.map(b=>`<li>${y("box",18)} ${i(b)}</li>`).join("")}</ul>${a.note?`<p class="muted small">${i(a.note)}</p>`:""}</div>`:""}
        ${a.compat?`<p class="pspec__compat reveal">${y("check",18)} <span><b>Compatibilidad:</b> ${i(a.compat)}</span></p>`:""}
      </div>`:""}
      <div class="wrap backing reveal${c?" backing--team":""}">
        ${c?`<figure class="backing__photo"><img src="${i(s.team.photo)}" alt="${i(s.team.caption||"Nuestro equipo")}" loading="lazy">${s.team.caption?`<figcaption>${i(s.team.caption)}</figcaption>`:""}</figure>`:""}
        <div class="backing__body">
          <p class="eyebrow">Compra con respaldo</p>
          <h2 class="h2">${d?"Usado, pero con la tranquilidad de siempre.":"Original, con garant\xEDa de un a\xF1o."}</h2>
          <ul class="backing__list">${p.map(([b,h,q])=>`<li><span class="backing__ico">${y(b,22)}</span><div><b>${i(h)}</b><span>${i(q)}</span></div></li>`).join("")}</ul>
          <a class="btn btn--wa btn--sm" target="_blank" rel="noopener" href="${S(`Hola ${s.name}, tengo una pregunta sobre la garant\xEDa del ${e.name}.`)}">Preguntar por WhatsApp</a>
        </div>
      </div>
    </section>`}function sa(){const{m:e}=u,a=()=>e.variants.find(m=>m.color===u.color&&m.config===u.config),t=()=>{if(!u.trade)return 0;const[,m]=s.tradeIn.devices[u.trade.d],[,_]=s.tradeIn.conditions[u.trade.c];return Math.round(m*_/1e4)*1e4},o=()=>{const m=a(),_=e.colors.find(P=>P.id===u.color),w=u.protect?ie(e,m.price):0,$=t(),k=m.price+w-$;l("#priceBox").innerHTML=`
        <p class="price">${g(m.price)} ${m.compare&&m.compare>m.price?`<s>${g(m.compare)}</s>`:""}</p>
        <p class="price__cuota">P\xE1galo a cuotas con tu tarjeta de cr\xE9dito o Sistecr\xE9dito \xB7 <a href="#pagos" class="price__link">pide asesor\xEDa</a></p>
        ${$||w?`<p class="price__total">Total con ${[w?"protecci\xF3n":"",$?"retoma":""].filter(Boolean).join(" y ")}: <b>${g(k)}</b>${$?` <span class="ok">(\u2212${g($)})</span>`:""}</p>`:""}`,l("#colorName").textContent=_.name,L("#colorOpts [data-color]").forEach(P=>P.classList.toggle("is-on",P.dataset.color===u.color)),l("#configOpts")&&(l("#configOpts").innerHTML=e.configs.map(P=>{const D=e.variants.find(K=>K.config===P&&K.color===u.color);return`<button class="config ${P===u.config?"is-on":""}" data-config="${i(P)}" ${D?"":"disabled"}>
            <span>${i(P)}</span><span class="config__price">${D?g(D.price)+(j&&!D.available?" \xB7 Bajo encargo":""):"No disponible en este color"}</span></button>`}).join("")),l("#protectPrice")&&(l("#protectPrice").textContent=g(ie(e,m.price)));const M=_.images;u.img=Math.min(u.img,M.length-1);const C=l("#galMain");C.alt=G(e,_,u.img),C.getAttribute("src")!==M[u.img]&&(C.classList.remove("fade"),C.offsetWidth,C.classList.add("fade"),C.src=M[u.img]),l("#thumbs").innerHTML=M.map((P,D)=>`<button class="thumb ${D===u.img?"is-on":""}" data-img="${D}" aria-label="Ver imagen ${D+1} de ${i(e.name)}"><img crossorigin="anonymous" src="${P}" alt="" loading="lazy"></button>`).join("");const x=[u.config!=="Est\xE1ndar"?u.config:"",_.name].filter(Boolean).join(" \xB7 ");l("#barLabel").textContent=" "+x,l("#barPrice").textContent=g(m.price);const R=!m.available;l("#addBtn").disabled=R,l("#barAdd").disabled=R,l("#waBuy").hidden=R&&!!s.partner,l("#waFloat").hidden=R&&!!s.partner,l("#partnerNote")&&(l("#partnerNote").hidden=!(R&&s.partner),s.partner&&(l("#partnerBtn").href=`https://wa.me/${s.partner.whatsapp}?text=${encodeURIComponent(`Hola Celada Shopper, vi en la tienda iC el ${e.name} (${x}) y aparece bajo encargo. Quiero traerlo bajo encargo desde USA con el servicio de casillero. \xBFMe cotizan?`)}`)),l("#addBtn").textContent=R?j?"Bajo encargo":"Disponible muy pronto":"Comprar",l("#barAdd").textContent=R?"Bajo encargo":"Comprar",l("#waBuy").href=S(`Hola ${s.name}, me interesa el ${e.name} (${x}) de ${g(m.price)}.`+($?` Quiero entregar mi ${s.tradeIn.devices[u.trade.d][0]} (${s.tradeIn.conditions[u.trade.c][0]}) en retoma.`:"")+" \xBFEst\xE1 disponible?"),l("#waFloat").href=l("#waBuy").href,r(m,x),l("#payAdvice")&&(l("#payAdvice").href=S(`Hola ${s.name}, quiero pagar a cuotas el ${e.name} (${x}) de ${g(m.price)}. \xBFMe asesoran con las opciones?`)),history.replaceState(null,"",f.p(e,`color=${u.color}${we(e)?"&config="+encodeURIComponent(u.config):""}`))},n=()=>{const _=((s.combos||{})[e.id]||(s.combos||{})[e.cat]||[]).map(w=>v[w]).filter(w=>w&&w.id!==e.id);return _.find(w=>w.variants.some($=>$.available))||_[0]||null},r=(m,_)=>{const w=l("#combo"),$=n();if(!w||!$){w&&(w.innerHTML="");return}const k=$.variants.find(R=>R.available)||$.variants[0],M=m.available&&k.available,C=m.price+k.price;w.innerHTML=`<div class="combo">
        <p class="combo__title">El complemento perfecto</p>
        <div class="combo__items">
          <div class="combo__item"><img crossorigin="anonymous" src="${z(T(e,u.color),200)}" alt="${i(e.name)}"><span>${i(e.name)}</span><b>${g(m.price)}</b></div>
          <span class="combo__plus">+</span>
          <div class="combo__item"><img crossorigin="anonymous" src="${z(T($),200)}" alt="${i($.name)}"><span>${i($.name)}</span><b>${g(k.price)}</b></div>
        </div>
        <div class="combo__foot"><p>Total: <b>${g(C)}</b></p>
          ${M?'<button class="btn btn--primary btn--sm" id="comboAdd">Agregar combo</button>':`<a class="btn btn--wa btn--sm" target="_blank" rel="noopener" href="${S(`Hola ${s.name}, quiero el combo ${e.name} (${_}) + ${$.name}. \xBFEst\xE1 disponible?`)}">Pedir combo por WhatsApp</a>`}</div>
      </div>`;const x=l("#comboAdd",w);x&&(x.onclick=()=>{te({id:e.id,color:m.color,config:m.config}),te({id:$.id,color:k.color,config:k.config})})},d=()=>{const m=a(),_=t();te({id:e.id,color:m.color,config:m.config,protection:u.protect?ie(e,m.price):0,tradeIn:_?{device:s.tradeIn.devices[u.trade.d][0],cond:s.tradeIn.conditions[u.trade.c][0],value:_}:null})},p=l(".pdp");p.addEventListener("click",m=>{const _=m.target.closest("[data-color]"),w=m.target.closest("[data-config]"),$=m.target.closest("[data-img]"),k=m.target.closest("[data-gal]"),M=m.target.closest("[data-trade]");if(_&&(u.color=_.dataset.color,u.img=0,a()||(u.config=e.variants.filter(C=>C.color===u.color).sort((C,x)=>C.price-x.price)[0].config)),w&&!w.disabled&&(u.config=w.dataset.config),$&&(u.img=+$.dataset.img),k){const C=e.colors.find(x=>x.id===u.color).images.length;u.img=(u.img+ +k.dataset.gal+C)%C}if(M){const C=M.dataset.trade==="yes";L("[data-trade]").forEach(x=>x.classList.toggle("is-on",x===M)),l("#tradeForm").hidden=!C,u.trade=C?{d:+l("#tradeDevice").value,c:+l("#tradeCond").value}:null}(_||w||$||k||M)&&o()}),p.addEventListener("change",m=>{m.target.id==="protect"&&(u.protect=m.target.checked),(m.target.id==="tradeDevice"||m.target.id==="tradeCond")&&(u.trade={d:+l("#tradeDevice").value,c:+l("#tradeCond").value}),o()}),l("#addBtn").addEventListener("click",d),l("#barAdd").addEventListener("click",d);let c=null;l(".gallery").addEventListener("touchstart",m=>{c=m.touches[0].clientX},{passive:!0}),l(".gallery").addEventListener("touchend",m=>{if(c===null)return;const _=m.changedTouches[0].clientX-c;c=null,Math.abs(_)>40&&l(`[data-gal="${_<0?1:-1}"]`).click()});const b=()=>{const m=l("#sameDay");if(!m)return clearInterval(u.timer);if(!s.sameDayCutoff){m.innerHTML=`<b>Rec\xEDbelo hoy en ${s.sameDayCity}</b><br><span class="muted small">Entrega el mismo d\xEDa en ${s.sameDayCity}.</span>`;return}const{h:_,m:w,day:$}=Ve(),k=s.sameDayCutoff*60-(_*60+w);m.innerHTML=k>0&&$!=="Sun"?`<b>Rec\xEDbelo hoy en ${s.sameDayCity}</b><br><span class="muted small">Compra en las pr\xF3ximas <b class="accent">${Math.floor(k/60)} h ${k%60} min</b></span>`:`<b>Rec\xEDbelo ${$==="Sat"||$==="Sun"?"el lunes":"ma\xF1ana"} en ${s.sameDayCity}</b><br><span class="muted small">Pide antes de las ${s.sameDayCutoff}:00 para entrega el mismo d\xEDa.</span>`};b(),u.timer=setInterval(b,3e4);const h=matchMedia("(prefers-reduced-motion: reduce)").matches;L(".ship").forEach((m,_)=>{const w=L(".ship__step",m),$=w.length,k=P=>{m.style.setProperty("--p",String(P/($-1))),w.forEach((D,K)=>{D.classList.toggle("is-done",K<P),D.classList.toggle("is-now",K===P)})};if(h)return k($-1);let M=0,C=null;const x=()=>{k(M),C=setTimeout(()=>{M=M>=$-1?0:M+1,x()},M>=$-1?2600:1100)};k(0),new IntersectionObserver(([P])=>{clearTimeout(C),P.isIntersecting&&(M=0,setTimeout(x,_*500))},{threshold:.6}).observe(m)}),new IntersectionObserver(([m])=>{const _=l("#buybar");if(!_)return;const w=!m.isIntersecting&&m.boundingClientRect.top<0;_.classList.toggle("show",w),_.setAttribute("aria-hidden",String(!w))}).observe(l("#addBtn")),o();{const m=a();H("ViewContent",{content_ids:[String(m.vid||e.id)],content_type:"product",content_name:e.name,value:m.price,currency:"COP"})}}function oa(){if(!E.length)return'<section class="wrap narrow section center"><h1 class="h2">Tu bolsa est\xE1 vac\xEDa</h1><p class="lead">Agrega un producto para continuar.</p><a class="btn btn--primary" href="/">Ir a la tienda</a></section>';const e=ae(),a=[["tarjeta","Tarjeta de cr\xE9dito",`Hasta ${s.installments} cuotas \xB7 ${s.installmentsNote}`],["sistecredito","Sistecr\xE9dito","Cr\xE9dito solo con tu c\xE9dula, sin tarjeta"]];return`
    <section class="checkout wrap">
      <form class="checkout__form" id="checkoutForm" novalidate>
        <h1 class="h2">Finalizar compra</h1>
        <p class="muted small with-ico">${y("lock",16)} Compra segura. Tus datos se usan solo para procesar tu pedido.</p>
        <fieldset><legend>1. Tus datos</legend>
          <div class="fields">
            <label>Nombre completo<input name="nombre" required autocomplete="name"></label>
            <label>C\xE9dula<input name="cedula" required inputmode="numeric" pattern="[0-9]{5,12}"></label>
            <label>Correo electr\xF3nico<input name="email" type="email" required autocomplete="email"></label>
            <label>Celular<input name="celular" required inputmode="tel" pattern="3[0-9]{9}" placeholder="3001234567" autocomplete="tel-national"></label>
          </div>
        </fieldset>
        <fieldset><legend>2. Entrega</legend>
          <div class="radios">
            <label class="radio"><input type="radio" name="entrega" value="envio" checked><span><b>Env\xEDo a domicilio</b><br><span class="small muted">${e.ship===null?"Se calcula al pagar":e.ship?g(e.ship):"Gratis"} \xB7 Mismo d\xEDa en ${s.sameDayCity}, ${s.otherCitiesDays} al resto del pa\xEDs</span></span></label>
          </div>
          <div class="fields" id="shipFields">
            <label>Departamento<input name="departamento" required autocomplete="address-level1" value=""></label>
            <label>Ciudad<input name="ciudad" required autocomplete="address-level2" value=""></label>
            <label class="span2">Direcci\xF3n<input name="direccion" required autocomplete="street-address" placeholder="Calle 00 # 00-00, apto"></label>
          </div>
        </fieldset>
        <fieldset><legend>3. Pago</legend>
          <div class="radios">${a.map(([t,o,n],r)=>`<label class="radio"><input type="radio" name="pago" value="${o}" ${r?"":"checked"}><span><b>${o}</b><br><span class="small muted">${n}</span></span></label>`).join("")}</div>
        </fieldset>
        <label class="check"><input type="checkbox" name="acepto" required> Acepto los t\xE9rminos y condiciones y autorizo el tratamiento de mis datos personales (Ley 1581 de 2012).</label>
        <p class="form-error" id="formError" hidden>Revisa los campos marcados.</p>
        <button class="btn btn--primary btn--lg btn--block" type="submit">Confirmar pedido \xB7 ${g(e.total)}</button>
        <p class="small muted center">Al confirmar, un asesor te enviar\xE1 el enlace de pago seguro por WhatsApp.</p>
      </form>
      <aside class="checkout__summary">
        <h2 class="h3">Resumen</h2>
        <ul class="lines lines--compact">${E.map(t=>`<li class="line"><span class="line__img"><img crossorigin="anonymous" src="${T(v[t.id],t.color)}" alt=""><i>${t.qty}</i></span>
          <div class="line__info"><b class="small">${i(v[t.id].name)}</b><p class="small muted">${i(le(t))}</p>${t.protection?`<p class="small">+ ${i(s.protection.name)}</p>`:""}${t.tradeIn?`<p class="small ok">Retoma \u2212${g(t.tradeIn.value)}</p>`:""}</div>
          <b class="small">${g(ee(t))}</b></li>`).join("")}</ul>
        <dl class="sum">
          <div><dt>Subtotal</dt><dd>${g(e.sub)}</dd></div>
          ${e.trade?`<div class="ok"><dt>Retoma (estimado)</dt><dd>\u2212${g(e.trade)}</dd></div>`:""}
          <div><dt>Env\xEDo</dt><dd>${e.ship===null?"Se calcula al pagar":e.ship?g(e.ship):"Gratis"}</dd></div>
          <div class="sum__total"><dt>Total</dt><dd>${g(e.total)}</dd></div>
        </dl>
        <p class="small muted">o ${F(e.total)}/mes en ${s.installments} cuotas</p>
        <ul class="trust trust--col"><li>${y("shield",16)} Productos originales y sellados</li><li>${y("back",16)} Derecho de retracto de 5 d\xEDas h\xE1biles</li></ul>
      </aside>
    </section>`}function na(){const e=l("#checkoutForm");e&&(e.addEventListener("change",a=>{if(a.target.name==="entrega"){const t=a.target.value==="envio";l("#shipFields").hidden=!t,L("#shipFields input").forEach(o=>{o.required=t})}}),e.addEventListener("submit",a=>{a.preventDefault(),L(".invalid",e).forEach(d=>d.classList.remove("invalid"));const t=L("input",e).filter(d=>!d.checkValidity());if(t.forEach(d=>(d.closest("label")||d).classList.add("invalid")),l("#formError").hidden=!t.length,t.length){t[0].focus();return}const o=Object.fromEntries(new FormData(e)),n="NV-"+Date.now().toString(36).toUpperCase().slice(-6),r=Le(`

Pedido ${n}
Cliente: ${o.nombre} \xB7 CC ${o.cedula}
Correo: ${o.email} \xB7 Cel: ${o.celular}
`+(o.entrega==="envio"?`Entrega: ${o.direccion}, ${o.ciudad} (${o.departamento})`:"Entrega: Retiro en tienda")+`
Pago: ${o.pago}`);O.set("nova-last-order",{order:n,name:o.nombre.split(" ")[0],wa:S(r)}),window.open(S(r),"_blank","noopener"),E=[],Y(),X("/gracias/")}))}function ia(){const e=O.get("nova-last-order",null);return`<section class="wrap narrow section center thanks">
      <div class="thanks__icon">\u2713</div>
      <h1 class="h2">\xA1Gracias${e?", "+i(e.name):""}! Recibimos tu pedido.</h1>
      ${e?`<p class="lead">N\xFAmero de pedido <b>${i(e.order)}</b>. Un asesor te escribir\xE1 por WhatsApp con el enlace de pago seguro y la confirmaci\xF3n de entrega.</p>
      <a class="btn btn--wa" href="${e.wa}" target="_blank" rel="noopener">Abrir WhatsApp de nuevo</a>`:""}
      <p><a class="btn btn--link" href="/">Seguir comprando \u203A</a></p></section>`}const B=s.siteUrl||location.origin,ra=(e,a=158)=>e.length>a?e.slice(0,a-1).replace(/\s+\S*$/,"")+"\u2026":e,Q=e=>z(e,1200)||"",Re=e=>({"@type":"BreadcrumbList",itemListElement:e.map(([a,t],o)=>({"@type":"ListItem",position:o+1,name:a,item:B+t}))}),Ne={"@id":B+"/#tienda"};function ca(e){const a=N.find(o=>o.id===e[0]);if(!e.length){const o=v[s.hero.id]||I[0];return{title:`Tienda de iPhone en ${s.sameDayCity} y Colombia \xB7 ${s.name}`,desc:`Compra iPhone, MacBook, iPad, AirPods y Apple Watch originales y sellados. Entrega el mismo d\xEDa en ${s.sameDayCity}, env\xEDos a toda Colombia y hasta ${s.installments} cuotas.`,image:o&&Q(T(o)),ld:[{"@type":"WebPage","@id":B+"/#portada",url:B+"/",name:`Tienda de iPhone en ${s.sameDayCity} y Colombia`,isPartOf:{"@id":B+"/#sitio"},about:Ne,inLanguage:"es-CO"},{"@type":"FAQPage",mainEntity:ue.map(([n,r])=>({"@type":"Question",name:n,acceptedAnswer:{"@type":"Answer",text:r}}))}]}}if(a&&e.length===1){const o=he(I.filter(r=>r.cat===a.id&&!A(r)),qe(a.id)),n=a.seo||{};return{title:`${n.title||a.name+" en Colombia"} \xB7 ${s.name}`,desc:n.desc||`${a.name} originales en Colombia. Entrega el mismo d\xEDa en ${s.sameDayCity}.`,image:o[0]&&Q(T(o[0])),ld:[{"@type":"CollectionPage",url:B+f.cat(a.id),name:n.title||a.name,isPartOf:{"@id":B+"/#sitio"},inLanguage:"es-CO",mainEntity:{"@type":"ItemList",itemListElement:o.map((r,d)=>({"@type":"ListItem",position:d+1,url:B+f.p(r),name:r.name}))}},Re([["Inicio","/"],[a.name,f.cat(a.id)]])]}}const t=e.length===2&&v[e[1]];if(t){const o=t.variants.map(r=>r.price),n={"@type":"AggregateOffer",priceCurrency:"COP",lowPrice:Math.min(...o),highPrice:Math.max(...o),offerCount:t.variants.length,url:B+f.p(t),seller:Ne,itemCondition:A(t)?"https://schema.org/UsedCondition":"https://schema.org/NewCondition"};return j&&(n.availability=t.variants.some(r=>r.available)?"https://schema.org/InStock":"https://schema.org/BackOrder"),{title:`${t.name}${A(t)?" usado":""} precio en Colombia \xB7 ${s.name}`,desc:ra(`Compra ${t.name} original y sellado desde ${g(t.fromPrice)} o ${F(t.fromPrice)}/mes en ${s.installments} cuotas. Entrega el mismo d\xEDa en ${s.sameDayCity} y env\xEDos a toda Colombia.`),image:Q(T(t)),type:"product",ld:[{"@type":"Product",name:t.name,url:B+f.p(t),description:t.description||t.tagline||t.name,brand:{"@type":"Brand",name:"Apple"},category:W(t.cat),image:t.colors.flatMap(r=>r.images.slice(0,2)).slice(0,8).map(Q),...t.colors.length>1&&U(t)?{color:t.colors.map(r=>r.name).join(", ")}:{},offers:n},Re([["Inicio","/"],[W(t.cat),f.cat(t.cat)],[t.name,f.p(t)]])]}}return null}function la(e,a){const t=e||{title:`P\xE1gina no encontrada \xB7 ${s.name}`,desc:"",noindex:!0},o=(r,d)=>{const p=document.head.querySelector(r);p&&p.setAttribute(p.tagName==="LINK"?"href":"content",d)};document.title=t.title,o('meta[name="description"]',t.desc),o('meta[name="robots"]',t.noindex?"noindex,follow":"index,follow,max-image-preview:large"),o('link[rel="canonical"]',B+a),o('meta[property="og:type"]',t.type||"website"),o('meta[property="og:url"]',B+a),o('meta[property="og:title"]',t.title),o('meta[property="og:description"]',t.desc),t.image&&(o('meta[property="og:image"]',t.image),o('meta[name="twitter:image"]',t.image)),o('meta[name="twitter:title"]',t.title),o('meta[name="twitter:description"]',t.desc);const n=l("#ldPage");n&&(n.textContent=t.ld?JSON.stringify({"@context":"https://schema.org","@graph":t.ld}):"{}")}window.STORE_PAGES=()=>["/",...N.filter(e=>I.some(a=>a.cat===e.id)).map(e=>f.cat(e.id)),...I.map(e=>f.p(e))].map(e=>{const a=v[e.split("/").filter(Boolean)[1]];return{path:e,images:a?a.colors.flatMap(t=>t.images.slice(0,2)).slice(0,8).map(Q):[],title:a?a.name:""}});const ve=()=>'<section class="wrap narrow section center"><h1 class="h2">No encontramos esta p\xE1gina</h1><a class="btn btn--primary" href="/">Volver al inicio</a></section>';function da(){if(!location.hash.startsWith("#/"))return;const[e,a]=location.hash.slice(1).split("?"),[t,o]=e.split("/").filter(Boolean),n=t==="c"&&o?f.cat(o):t==="p"&&v[o]?f.p(v[o]):t?`/${t}/`:"/";history.replaceState(null,"",n+(a?"?"+a:""))}function V(){da();const e=new URLSearchParams(location.search);let a=location.pathname.split("/").filter(Boolean);a.length===2&&v[a[1]]&&v[a[1]].cat!==a[0]&&(history.replaceState(null,"",f.p(v[a[1]],location.search.slice(1))),a=[v[a[1]].cat,a[1]]),u&&u.timer&&clearInterval(u.timer),u=null;const t=a.length===1&&N.some(c=>c.id===a[0]);let o,n=ca(a);a.length?t?o=ea(a[0],e):a.length===2&&v[a[1]]?o=aa(a[1],e):a[0]==="checkout"?(o=oa(),n={title:`Finalizar compra \xB7 ${s.name}`,desc:"",noindex:!0}):a[0]==="gracias"?(o=ia(),n={title:`Gracias por tu compra \xB7 ${s.name}`,desc:"",noindex:!0}):(o=ve(),n=null):o=Ye();const r=!V.done;V.done=!0,ne.innerHTML=o,ne.removeAttribute("data-prerendered"),la(n,a.length?`/${a.join("/")}/`:"/");const d=t?a[0]:a.length===2&&v[a[1]]?v[a[1]].cat:"";L("#navLinks a").forEach(c=>c.classList.toggle("is-on",c.dataset.cat===d)),l("#waFloat").hidden=!1,l("#waFloat").href=S(`Hola ${s.name}, quiero asesor\xEDa para comprar un producto Apple.`),window.Explorer&&window.Explorer.mount(ne),u&&sa(),a[0]==="checkout"&&na(),pa(),He();const p=location.pathname;V.last!==p&&(r||window.scrollTo({top:0}),V.last=p),r&&!window.__PRERENDER&&(document.documentElement.classList.add("no-anim"),L(".reveal").forEach(c=>{c.getBoundingClientRect().top<innerHeight&&c.classList.add("in")}),requestAnimationFrame(()=>requestAnimationFrame(()=>document.documentElement.classList.remove("no-anim")))),document.documentElement.dataset.ready=p,r||H("PageView")}function pa(){L(".shelf").forEach(t=>t.addEventListener("click",o=>{const n=o.target.closest("[data-scroll]");if(!n)return;const r=l(".shelf__track",t);r.scrollBy({left:+n.dataset.scroll*r.clientWidth*.8,behavior:"smooth"})})),L(".card").forEach(t=>{t.addEventListener("mouseover",o=>{const n=o.target.closest("[data-swap]");n&&(l("[data-card-img]",t).src=n.dataset.swap)}),t.addEventListener("click",o=>{const n=o.target.closest("[data-color]");n&&(o.preventDefault(),X(t.getAttribute("href")+"?color="+n.dataset.color))})});const e=l("#sortSel");e&&e.addEventListener("change",()=>{X(location.pathname+"?orden="+e.value,!0)});const a=l("#tradeQuick");if(a){const t=()=>{const[,o]=s.tradeIn.devices[a.device.value],[,n]=s.tradeIn.conditions[a.cond.value];l("#tradeQuickVal").textContent=g(Math.round(o*n/1e4)*1e4)};a.addEventListener("change",t),t()}ma(),oe(),L("img").forEach(Ce),ua()}let fe=null;function oe(){const e=l(".benefits");if(!e)return;const a=L(".benefit",e),t=a.length,o=matchMedia("(max-width: 900px)");if(matchMedia("(prefers-reduced-motion: reduce)").matches||window.__PRERENDER){e.style.setProperty("--bp","1"),a.forEach(d=>d.classList.add("is-lit"));return}const n=()=>{if(fe=null,!document.body.contains(e))return;const d=innerHeight;let p;if(o.matches){const c=l(".benefits__line",e).getBoundingClientRect();p=(d*.72-c.top)/Math.max(1,c.height)}else{const c=e.getBoundingClientRect();p=(d*.92-c.top)/(d*.5)}p=Math.max(0,Math.min(1,p)),e.style.setProperty("--bp",p.toFixed(3)),a.forEach((c,b)=>c.classList.toggle("is-lit",p>.01&&p>=b/(t-1)-.02))},r=()=>{fe||(fe=requestAnimationFrame(n))};window.removeEventListener("scroll",oe.handler),window.removeEventListener("resize",oe.handler),oe.handler=r,window.addEventListener("scroll",r,{passive:!0}),window.addEventListener("resize",r),n()}function ma(){const e=matchMedia("(prefers-reduced-motion: reduce)").matches;L(".hero__media").forEach(a=>{const t=l(".hero__video",a);if(t&&!e&&!window.__PRERENDER&&(t.addEventListener("playing",()=>a.classList.add("is-playing"),{once:!0}),new IntersectionObserver(([r])=>{r.isIntersecting?t.play().catch(()=>{}):t.pause()},{threshold:.2}).observe(a)),e||!matchMedia("(hover: hover) and (pointer: fine)").matches)return;const o=a.closest(".hero");o.addEventListener("pointermove",n=>{const r=a.getBoundingClientRect(),d=(n.clientX-r.left)/r.width-.5,p=(n.clientY-r.top)/r.height-.5;a.style.setProperty("--rx",`${(-p*10).toFixed(2)}deg`),a.style.setProperty("--ry",`${(d*14).toFixed(2)}deg`)}),o.addEventListener("pointerleave",()=>{a.style.setProperty("--rx","0deg"),a.style.setProperty("--ry","0deg")})})}const $e="IntersectionObserver"in window?new IntersectionObserver(e=>e.forEach(a=>{a.isIntersecting&&(a.target.classList.add("in"),$e.unobserve(a.target))}),{rootMargin:"0px 0px -8% 0px"}):null,ua=()=>L(".reveal:not(.in)").forEach(e=>$e&&!window.__PRERENDER?$e.observe(e):e.classList.add("in")),Fe=()=>{l("#search").hidden=!1,document.body.classList.add("locked"),l("#searchInput").value="",ye(""),setTimeout(()=>l("#searchInput").focus(),30)},Oe=()=>{l("#search").hidden=!0,document.body.classList.remove("locked")};function ye(e){const a=_e(e.trim()),t=a?I.filter(o=>a.split(/\s+/).every(n=>_e(`${o.name} ${W(o.cat)} ${o.tagline}`).includes(n))).slice(0,8):[];l("#searchResults").innerHTML=a?t.length?t.map(o=>`<a class="sres" href="${f.p(o)}"><img crossorigin="anonymous" src="${T(o)}" alt="${i(o.name)}"><span><b>${i(o.name)}</b><span class="small muted">Desde ${g(o.fromPrice)} \xB7 ${F(o.fromPrice)}/mes</span></span></a>`).join(""):`<p class="muted">Sin resultados para \u201C${i(e)}\u201D. <a href="${S("Hola, busco: "+e)}" target="_blank" rel="noopener">Preg\xFAntanos por WhatsApp</a>.</p>`:`<p class="eyebrow">B\xFAsquedas populares</p><div class="chips">${["iPhone 18 Pro","AirPods Pro 3","MacBook Air","iPad","Apple Watch","Cargador"].map(o=>`<button class="chip" data-q="${o}">${o}</button>`).join("")}</div>`}l("#openSearch").addEventListener("click",Fe),l("#searchInput").addEventListener("input",e=>ye(e.target.value)),l("#search").addEventListener("click",e=>{(e.target.id==="search"||e.target.closest("[data-close]")||e.target.closest(".sres"))&&Oe();const a=e.target.closest("[data-q]");a&&(l("#searchInput").value=a.dataset.q,ye(a.dataset.q))}),document.addEventListener("keydown",e=>{e.key==="Escape"&&(Oe(),de(),He()),e.key==="/"&&!/input|textarea|select/i.test(document.activeElement.tagName)&&(e.preventDefault(),Fe())});function ha(){l(".nav__name").textContent=s.name,l("#navLinks").innerHTML=N.map(c=>`<a href="${f.cat(c.id)}" data-cat="${c.id}">${c.name}</a>`).join("")+`<a href="${S("Hola, quiero asesor\xEDa")}" target="_blank" rel="noopener" class="nav__help">Asesor\xEDa</a>`+(s.partner?`<a href="${s.partner.url}" class="nav__back" rel="noopener" aria-label="Ir al casillero Celada Shopper"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 8l-9-5-9 5v8l9 5 9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/></svg>Casillero Celada Shopper</a>`:"");const e=l("#announce");e.innerHTML=s.announcements.map((c,b)=>`<p class="${b?"":"on"}">${i(c)}</p>`).join("");let a=0;setInterval(()=>{const c=L("p",e);c[a].classList.remove("on"),a=(a+1)%c.length,c[a].classList.add("on")},4200);const t=(c,b)=>`<details class="footer__col"><summary>${c}<svg class="footer__chev" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></summary><div class="footer__links">${b}</div></details>`,o=`https://${s.shopifyDomain}`,n={whatsapp:'<path d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3Zm0 23.7c-2 0-4-.5-5.7-1.6l-.4-.2-3.9 1 1-3.8-.3-.4A10.7 10.7 0 1 1 16 26.7Zm5.9-8c-.3-.2-1.9-1-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1a8.8 8.8 0 0 1-4.4-3.8c-.3-.6.3-.5 1-1.7.1-.2 0-.4 0-.6l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.3 1.4 3.5c.2.2 2.4 3.7 5.8 5.1 2.2.9 3 1 4.1.8.7-.1 1.9-.8 2.2-1.5.3-.8.3-1.4.2-1.5l-.6-.3Z"/>',instagram:'<path d="M16 5.6c3.4 0 3.8 0 5.1.1 3.4.2 5 1.8 5.2 5.2.1 1.3.1 1.7.1 5.1s0 3.8-.1 5.1c-.2 3.4-1.8 5-5.2 5.2-1.3.1-1.7.1-5.1.1s-3.8 0-5.1-.1c-3.4-.2-5-1.8-5.2-5.2-.1-1.3-.1-1.7-.1-5.1s0-3.8.1-5.1c.2-3.4 1.8-5 5.2-5.2 1.3-.1 1.7-.1 5.1-.1ZM16 3c-3.5 0-4 0-5.3.1C6 3.3 3.3 6 3.1 10.7 3 12 3 12.5 3 16s0 4 .1 5.3C3.3 26 6 28.7 10.7 28.9c1.3.1 1.8.1 5.3.1s4 0 5.3-.1c4.7-.2 7.4-2.9 7.6-7.6.1-1.3.1-1.8.1-5.3s0-4-.1-5.3C28.7 6 26 3.3 21.3 3.1 20 3 19.5 3 16 3Zm0 6.3a6.7 6.7 0 1 0 0 13.4 6.7 6.7 0 0 0 0-13.4Zm0 11a4.3 4.3 0 1 1 0-8.6 4.3 4.3 0 0 1 0 8.6Zm7-12.9a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z"/>',tiktok:'<path d="M22.5 3h-4.3v17.4a3.8 3.8 0 1 1-3.8-3.8c.4 0 .8.1 1.1.2v-4.4a8.1 8.1 0 1 0 7 8V11.6a10.3 10.3 0 0 0 6 1.9V9.2a6 6 0 0 1-6-6.2Z"/>'},r=(c,b,h)=>`<a class="footer__social" href="${b}" target="_blank" rel="noopener" aria-label="${h}"><svg viewBox="0 0 32 32" width="18" height="18" fill="currentColor" aria-hidden="true">${n[c]}</svg></a>`;l("#footer").innerHTML=`
      <div class="wrap">
        <div class="footer__top">
          <div class="footer__brand">
            <a class="footer__logo" href="/" aria-label="iC, inicio">${document.querySelector(".nav__word")?document.querySelector(".nav__word").outerHTML:i(s.name)}</a>
            <p class="footer__slogan">${i(s.slogan||"")}</p>
            <p>Productos Apple originales y sellados. Entrega el mismo d\xEDa en ${i(s.sameDayCity)} y env\xEDos a toda Colombia.</p>
            <div class="footer__socials">${r("whatsapp",S("Hola "+s.name),"WhatsApp")}${r("instagram",s.instagram,"Instagram")}${r("tiktok",s.tiktok,"TikTok")}</div>
          </div>
          <nav class="footer__cols" aria-label="Pie de p\xE1gina">
            ${t("Comprar",N.map(c=>`<a href="${f.cat(c.id)}">${c.name}</a>`).join(""))}
            ${t("Ayuda",`<a href="${o}/policies/shipping-policy">Env\xEDos y entregas</a><a href="${o}/policies/refund-policy">Devoluciones y retracto</a><a href="${o}/pages/contact">Contacto</a>`)}
            ${t("Nosotros",`<a href="${s.partner?s.partner.url:o}" target="_blank" rel="noopener">Pedidos especiales desde USA</a><a href="${o}/pages/quienes-somos">Qui\xE9nes somos</a><a href="${o}/policies/terms-of-service">T\xE9rminos y condiciones</a><a href="${o}/policies/privacy-policy">Pol\xEDtica de privacidad</a>`)}
          </nav>
          <div class="footer__contact">
            <p class="footer__contact-title">\xBFNecesitas ayuda para elegir?</p>
            <a class="btn btn--wa btn--sm" href="${S("Hola "+s.name+", necesito asesor\xEDa")}" target="_blank" rel="noopener">Escr\xEDbenos por WhatsApp</a>
            <p class="footer__contact-meta"><a href="tel:${s.phone.replace(/\s/g,"")}">${i(s.phone)}</a><br><a href="mailto:${s.email}">${i(s.email)}</a>${s.address?"<br>"+i(s.address):""}${s.hours?"<br>"+i(s.hours):""}</p>
          </div>
        </div>
        <div class="footer__pay"><span>Medios de pago</span>${se()}</div>
        <div class="footer__legal">
          <p>${s.legalName?i(s.legalName)+" \xB7 ":""}${s.nit?"NIT "+i(s.nit)+" \xB7 ":""}Precios en pesos colombianos. Im\xE1genes de referencia.</p>
          <p>Apple, iPhone, iPad, Mac, Apple Watch y AirPods son marcas registradas de Apple Inc. ${i(s.name)} es un comercio independiente.</p>
          <p><button class="link small" id="cookiePrefs" type="button">Preferencias de cookies</button> \xB7 <a href="https://www.sic.gov.co" target="_blank" rel="noopener">Superintendencia de Industria y Comercio</a> \xB7 \xA9 ${new Date().getFullYear()} ${i(s.name)}</p>
        </div>
      </div>`;const d=matchMedia("(max-width: 700px)"),p=()=>L("#footer .footer__col").forEach(c=>{c.open=!d.matches});p(),d.addEventListener("change",p),l("#cookiePrefs").addEventListener("click",()=>xe(!0))}const He=()=>{document.body.classList.remove("menu-open"),l("#burger").setAttribute("aria-expanded","false")};l("#burger").addEventListener("click",()=>{const e=document.body.classList.toggle("menu-open");l("#burger").setAttribute("aria-expanded",String(e))}),window.addEventListener("scroll",()=>l("#nav").classList.toggle("scrolled",window.scrollY>8),{passive:!0}),ha(),xe(),Ze(),re()==="all"&&H("PageView"),Pe(),Ae(),document.addEventListener("click",e=>{const a=e.target.closest("a[href]");if(!a||e.defaultPrevented||e.button||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||a.target==="_blank"||a.hasAttribute("download"))return;const t=new URL(a.href,location.href);t.origin!==location.origin||/\.[a-z0-9]+$/i.test(t.pathname)||t.pathname===location.pathname&&t.search===location.search&&t.hash||(e.preventDefault(),X(t.pathname+t.search))}),window.addEventListener("popstate",V),window.addEventListener("hashchange",()=>location.hash.startsWith("#/")&&V()),V()})();
