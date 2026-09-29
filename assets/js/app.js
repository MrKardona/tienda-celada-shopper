(async()=>{"use strict";const o=window.STORE,{catalog:I,live:q}=await window.loadCatalog();document.documentElement.classList.toggle("is-demo",!q);const N=window.CATEGORIES,v=Object.fromEntries(I.map(e=>[e.id,e])),l=(e,a=document)=>a.querySelector(e),L=(e,a=document)=>[...a.querySelectorAll(e)],ne=l("#app"),h=e=>"$"+Math.round(e).toLocaleString("es-CO"),O=e=>h(Math.ceil(e/o.installments)),i=e=>String(e??"").replace(/[&<>"']/g,a=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[a]),_e=e=>String(e).normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase(),W=e=>(N.find(a=>a.id===e)||{}).name||"",j=(e,a)=>(a&&e.colors.find(t=>t.id===a)||e.colors[0]).images[0],z=(e,a)=>e&&/[?&]width=\d+/.test(e)?e.replace(/width=\d+/,`width=${a}`):e,f={cat:e=>`/${e}/`,p:(e,a)=>`/${e.cat}/${e.id}/${a?"?"+a:""}`},X=(e,a)=>{history[a?"replaceState":"pushState"](null,"",e),F()},S=e=>`https://wa.me/${o.whatsapp}?text=${encodeURIComponent(e)}`,H={get(e,a){try{return JSON.parse(localStorage.getItem(e))??a}catch{return a}},set(e,a){try{localStorage.setItem(e,JSON.stringify(a))}catch{}}},ie=(e,a)=>o.protection.cats.includes(e.cat)?Math.max(o.protection.min,Math.round(a*o.protection.rate/1e3)*1e3):0,we=e=>e.configs.length>1||e.configs[0]!=="Est\xE1ndar",U=e=>e.colors.some(a=>a.hex),Ve=()=>{const e=Object.fromEntries(new Intl.DateTimeFormat("en-US",{timeZone:"America/Bogota",hour:"numeric",minute:"numeric",weekday:"short",hour12:!1}).formatToParts(new Date).map(a=>[a.type,a.value]));return{h:+e.hour%24,m:+e.minute,day:e.weekday}},We=".card__media,.gallery,.thumb,.chapter__img,.line__img,.tile__media,.hero__media",ze=".compare img,.mini img,.sres img,.combo__item img",J=(()=>{try{const e=document.createElement("canvas");return e.width=e.height=1,e.getContext("2d",{willReadFrequently:!0})}catch{return null}})(),Ce=e=>{if(!J||!e.complete||!e.naturalWidth)return;const a=e.closest(We),t=e.matches(ze);if(!(!a&&!t))try{J.clearRect(0,0,1,1),J.drawImage(e,3,3,1,1,0,0,1,1);const[s,n,r,d]=J.getImageData(0,0,1,1).data;d>250&&((t?e:a).style.backgroundColor=`rgb(${s}, ${n}, ${r})`)}catch{}};document.addEventListener("load",e=>{e.target.tagName==="IMG"&&Ce(e.target)},!0);let ke;const Ue=e=>{const a=l("#toast");a.innerHTML=e,a.classList.add("show"),clearTimeout(ke),ke=setTimeout(()=>a.classList.remove("show"),2600)},Z=o.marketing||{},re=()=>H.get("cs-consent",null);let ce=!1;function Ee(){if(!(ce||window.__PRERENDER||re()!=="all")&&(ce=!0,Z.metaPixelId&&((function(e,a,t,s,n,r,d){e.fbq||(n=e.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)},e._fbq||(e._fbq=n),n.push=n,n.loaded=!0,n.version="2.0",n.queue=[],r=a.createElement(t),r.async=!0,r.src=s,d=a.getElementsByTagName(t)[0],d.parentNode.insertBefore(r,d))})(window,document,"script","https://connect.facebook.net/en_US/fbevents.js"),window.fbq("init",Z.metaPixelId)),Z.ga4Id)){const e=document.createElement("script");e.async=!0,e.src=`https://www.googletagmanager.com/gtag/js?id=${Z.ga4Id}`,document.head.appendChild(e),window.dataLayer=window.dataLayer||[],window.gtag=function(){window.dataLayer.push(arguments)},window.gtag("js",new Date),window.gtag("config",Z.ga4Id,{send_page_view:!1})}}const Me={PageView:"page_view",ViewContent:"view_item",AddToCart:"add_to_cart",InitiateCheckout:"begin_checkout",Contact:"generate_lead"},V=(e,a={})=>{ce&&(window.fbq&&window.fbq("track",e,a),window.gtag&&Me[e]&&window.gtag("event",Me[e],{value:a.value,currency:a.currency,page_path:location.pathname}))};function Pe(e){if(window.__PRERENDER||!e&&re())return;let a=l("#cookies");a||(a=document.createElement("div"),a.id="cookies",a.className="cookies",document.body.appendChild(a)),a.innerHTML=`<p><b>Usamos cookies</b> para que la tienda funcione, recordar tu bolsa y mostrarte ofertas relevantes en redes sociales. Puedes aceptar todas o solo las necesarias. <a href="https://${o.shopifyDomain}/policies/privacy-policy" target="_blank" rel="noopener">Pol\xEDtica de privacidad</a> (Ley 1581 de 2012).</p>
      <div class="cookies__btns"><button class="btn btn--ghost btn--sm" data-consent="necessary">Solo necesarias</button><button class="btn btn--primary btn--sm" data-consent="all">Aceptar todas</button></div>`,a.hidden=!1,a.onclick=t=>{const s=t.target.closest("[data-consent]");s&&(H.set("cs-consent",s.dataset.consent),a.hidden=!0,s.dataset.consent==="all"&&(Ee(),V("PageView")))}}Ee(),document.addEventListener("click",e=>{e.target.closest('a[href*="wa.me"]')&&V("Contact")});let E=H.get("nova-cart",[]).map(e=>{const a=v[e.id],t=a&&a.variants.find(s=>s.color===e.color&&s.config===e.config);return t?{...e,price:t.price,vid:t.vid}:null}).filter(Boolean);const Y=()=>{H.set("nova-cart",E),xe(),Ae()},ee=e=>(e.price+(e.protection||0))*e.qty,ae=()=>{const e=E.reduce((s,n)=>s+ee(n),0),a=E.reduce((s,n)=>s+(n.tradeIn?n.tradeIn.value:0),0);if(q)return{sub:e,trade:a,ship:null,total:e};const t=o.freeShippingFrom?e===0||e>=o.freeShippingFrom?0:o.shippingCost:null;return{sub:e,trade:a,ship:t,total:Math.max(0,e-a+t)}};function te({id:e,color:a,config:t,qty:s=1,protection:n=0,tradeIn:r=null}){const d=v[e],u=d.variants.find(m=>m.color===a&&m.config===t)||d.variants.find(m=>m.available)||d.variants[0];if(!u.available){Ue("Este producto es bajo encargo: te lo traemos con Celada Shopper.");return}const c=[e,u.color,u.config,n?"p":"",r?r.device+r.cond:""].join("|"),b=E.find(m=>m.key===c);b?b.qty+=s:E.push({key:c,id:e,color:u.color,config:u.config,qty:s,price:u.price,protection:n,tradeIn:r,sku:u.sku,vid:u.vid}),Y(),V("AddToCart",{content_ids:[String(u.vid||e)],content_type:"product",content_name:d.name,value:u.price*s,currency:"COP"}),Se()}const le=e=>{const t=v[e.id].colors.find(s=>s.id===e.color);return[e.config!=="Est\xE1ndar"?e.config:"",t?t.name:""].filter(Boolean).join(" \xB7 ")},Le=(e="")=>{const a=ae(),t=E.map(s=>`\u2022 ${s.qty} \xD7 ${v[s.id].name} (${le(s)}) \u2014 ${h(ee(s))}`+(s.protection?`
   + ${o.protection.name}`:"")+(s.tradeIn?`
   Retoma: ${s.tradeIn.device} (${s.tradeIn.cond}) \u2212${h(s.tradeIn.value)}`:""));return`Hola ${o.name}, quiero hacer este pedido:

${t.join(`
`)}

Subtotal: ${h(a.sub)}`+(a.trade?`
Descuento retoma (estimado): \u2212${h(a.trade)}`:"")+`
Env\xEDo: ${a.ship===null?"Se calcula al pagar":a.ship?h(a.ship):"Gratis"}
Total: ${h(a.total)}${e}`},Ze=()=>E.filter(e=>e.tradeIn).map(e=>`Retoma solicitada para ${v[e.id].name}: ${e.tradeIn.device} (${e.tradeIn.cond}), valor estimado ${h(e.tradeIn.value)}`).join(" | "),Ge=()=>window.shopifyCheckoutUrl(E,Ze());function xe(){const e=E.reduce((t,s)=>t+s.qty,0),a=l("#cartCount");a.textContent=e,a.hidden=!e}function Ae(){const e=l("#cart"),a=ae(),t=Math.max(0,o.freeShippingFrom-a.sub),s=Math.min(100,a.sub/o.freeShippingFrom*100),n=new Set(E.map(d=>d.id)),r=["airpods-pro-3","cargador-magsafe","airtag","adaptador-40w"].filter(d=>v[d]&&v[d].available!==!1&&!n.has(d)).slice(0,2);e.innerHTML=`
      <div class="drawer__head"><h2>Tu bolsa</h2><button class="icon-btn" data-close-cart aria-label="Cerrar">\u2715</button></div>
      ${E.length?`
      ${q||!o.freeShippingFrom?"":`<div class="ship-meter">
        <p>${t?`Te faltan <b>${h(t)}</b> para tener <b>env\xEDo gratis</b>`:"\xA1Tu pedido tiene <b>env\xEDo gratis</b>!"}</p>
        <div class="ship-meter__bar"><span style="width:${s}%"></span></div>
      </div>`}
      <ul class="lines">${E.map((d,u)=>{const c=v[d.id];return`<li class="line">
          <a href="${f.p(c,"color="+d.color)}" class="line__img"><img crossorigin="anonymous" src="${j(c,d.color)}" alt="${i(c.name+" "+((c.colors.find(b=>b.id===d.color)||{}).name||""))}"></a>
          <div class="line__info">
            <a href="${f.p(c,"color="+d.color)}" class="line__name">${i(c.name)}</a>
            <p class="muted small">${i(le(d))}</p>
            ${d.protection?`<p class="small with-ico">${w("shield",16)} ${i(o.protection.name)} \xB7 ${h(d.protection)}</p>`:""}
            ${d.tradeIn?`<p class="small ok with-ico">${w("swap",16)} Retoma ${i(d.tradeIn.device)} \xB7 \u2212${h(d.tradeIn.value)}</p>`:""}
            <div class="line__row">
              <div class="qty" role="group" aria-label="Cantidad">
                <button data-qty="${u}" data-d="-1" aria-label="Menos">\u2212</button><span>${d.qty}</span><button data-qty="${u}" data-d="1" aria-label="M\xE1s">+</button>
              </div>
              <b>${h(ee(d))}</b>
            </div>
            <button class="link small" data-remove="${u}">Eliminar</button>
          </div></li>`}).join("")}</ul>
      ${r.length?`<div class="drawer__suggest"><p class="eyebrow">Complementa tu compra</p>${r.map(d=>{const u=v[d];return`<div class="mini"><img crossorigin="anonymous" src="${j(u)}" alt="${i(u.name)}" loading="lazy"><div><p class="small"><b>${i(u.name)}</b></p><p class="small muted">${h(u.fromPrice)}</p></div>
          <button class="btn btn--ghost btn--xs" data-quick="${d}">Agregar</button></div>`}).join("")}</div>`:""}
      <div class="drawer__foot">
        <dl class="sum">
          <div><dt>Subtotal</dt><dd>${h(a.sub)}</dd></div>
          ${a.trade?`<div class="ok"><dt>Retoma (estimado)</dt><dd>\u2212${h(a.trade)}</dd></div>`:""}
          <div><dt>Env\xEDo</dt><dd>${a.ship===null?"Se calcula al pagar":a.ship?h(a.ship):"Gratis"}</dd></div>
          <div class="sum__total"><dt>Total</dt><dd>${h(a.total)}</dd></div>
        </dl>
        ${q&&a.trade?'<p class="small muted center">El descuento por retoma se aplica cuando revisemos tu equipo.</p>':""}
        <p class="small muted center">o ${O(a.total)}/mes en ${o.installments} cuotas</p>
        ${q?`<a href="${i(Ge())}" class="btn btn--primary btn--block btn--ico">${w("lock",18)} Pagar de forma segura</a>${Ie()}`:'<a href="/checkout/" class="btn btn--primary btn--block" data-close-cart>Finalizar compra</a>'}
        <a href="${S(Le())}" target="_blank" rel="noopener" class="btn btn--wa btn--block">Pedir por WhatsApp</a>
      </div>`:`
      <div class="empty"><p>Tu bolsa est\xE1 vac\xEDa.</p><a class="btn btn--primary" href="/iphone/" data-close-cart>Ver iPhone</a></div>`}`}const Se=()=>{l("#cart").classList.add("open"),l("#cart").setAttribute("aria-hidden","false"),l("#cartBackdrop").hidden=!1,document.body.classList.add("locked")},de=()=>{l("#cart").classList.remove("open"),l("#cart").setAttribute("aria-hidden","true"),l("#cartBackdrop").hidden=!0,document.body.classList.remove("locked")};l("#cart").addEventListener("click",e=>{const a=e.target.closest("[data-qty]"),t=e.target.closest("[data-remove]"),s=e.target.closest("[data-quick]");if(a){const n=E[+a.dataset.qty];n.qty=Math.max(1,Math.min(5,n.qty+ +a.dataset.d)),Y()}if(t&&(E.splice(+t.dataset.remove,1),Y()),s){const n=v[s.dataset.quick];te({id:n.id,color:n.variants[0].color,config:n.variants[0].config})}e.target.closest("[data-close-cart]")&&de()}),l("#openCart").addEventListener("click",Se),l("#cart").addEventListener("click",e=>{e.target.closest('a[href*="/cart/"]')&&V("InitiateCheckout",{value:ae().total,currency:"COP",num_items:E.reduce((a,t)=>a+t.qty,0)})}),l("#cartBackdrop").addEventListener("click",de);const pe=e=>`
    <a class="card reveal" href="${f.p(e)}">
      ${e.badge||A(e)||q&&!e.available?`<div class="tags">${A(e)?'<span class="tag tag--used">Usado</span>':""}${e.badge?`<span class="tag">${i(e.badge)}</span>`:""}${q&&!e.available?'<span class="tag tag--out">Bajo encargo</span>':""}</div>`:""}
      <div class="card__media"><img crossorigin="anonymous" src="${z(j(e),600)}" alt="${i(G(e))}" loading="lazy" decoding="async" data-card-img></div>
      ${U(e)?`<div class="dots">${e.colors.slice(0,7).map(a=>`<span class="dot" style="--c:${a.hex}" title="${i(a.name)}" data-swap="${z(a.images[0],600)}" data-color="${a.id}"></span>`).join("")}</div>`:'<div class="dots"></div>'}
      <h3 class="card__name">${i(e.name)}</h3>
      <p class="card__tag">${A(e)&&Be(e)?`Bater\xEDa ${Be(e)}`:i(e.tagline)}</p>
      <p class="card__price">${A(e)&&e.variants.every(a=>a.price===e.fromPrice)?"":"Desde "}${h(e.fromPrice)}</p>
      <p class="card__cuota">o ${O(e.fromPrice)}/mes en ${o.installments} cuotas</p>
      <span class="btn btn--primary btn--sm">Comprar</span>
    </a>`,me=(e,a,t="")=>{const s=a.map(n=>v[n]).filter(Boolean);return s.length?`<section class="section shelf">
      <div class="section__head wrap"><div><h2 class="h2">${e}</h2>${t?`<p class="lead">${t}</p>`:""}</div>
        <div class="shelf__arrows"><button class="round" data-scroll="-1" aria-label="Anterior">\u2039</button><button class="round" data-scroll="1" aria-label="Siguiente">\u203A</button></div></div>
      <div class="shelf__track">${s.map(pe).join("")}</div></section>`:""},Ie=()=>'<p class="secure-note"><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5Zm-3 8V7a3 3 0 0 1 6 0v3H9Z"/></svg>Pago 100% seguro procesado por Shopify \xB7 datos cifrados</p>',Qe=()=>`<div class="trustband">${[["lock","Pago seguro","Pagas en el checkout de Shopify con cifrado SSL. No guardamos datos de tu tarjeta."],["shield","Originales y con garant\xEDa","Productos Apple nuevos y sellados, con garant\xEDa de un a\xF1o y el respaldo de Celada Shopper."],["back","Derecho de retracto","5 d\xEDas h\xE1biles para compras en l\xEDnea (Ley 1480 de 2011)."],["chat","Te acompa\xF1amos","Asesor\xEDa por WhatsApp antes y despu\xE9s de tu compra."]].map(([e,a,t])=>`<div class="trustband__item reveal"><span class="trustband__icon">${w(e)}</span><div><b>${a}</b><span>${t}</span></div></div>`).join("")}</div>`,oe=()=>`<div class="paywall">${o.paymentMethods.map(e=>`<span class="pill">${i(e)}</span>`).join("")}</div>`,je=e=>`<div class="faq">${e.map(([a,t])=>`<details><summary>${i(a)}</summary><p>${t}</p></details>`).join("")}</div>`,ue=[["\xBFLos productos son originales y nuevos?","S\xED. Todos los productos son Apple originales, nuevos y sellados de f\xE1brica."],["\xBFQu\xE9 garant\xEDa tienen?",o.warranty||"Antes de tu compra te explicamos por WhatsApp las condiciones de garant\xEDa de cada equipo."],["\xBFCon qu\xE9 transportadoras env\xEDan?",`En ${o.sameDayCity} entregamos el mismo d\xEDa. Al resto de Colombia enviamos con ${(o.carriers||[]).join(", ").replace(/, ([^,]*)$/," y $1")}, con n\xFAmero de gu\xEDa para rastrear tu pedido.`],["\xBFCu\xE1nto se demora el env\xEDo?",`En ${o.sameDayCity} entregamos el mismo d\xEDa. Al resto del pa\xEDs, en ${o.otherCitiesDays}, con n\xFAmero de gu\xEDa. El costo del env\xEDo se calcula al pagar seg\xFAn tu ciudad.`],...o.financing?[["\xBFPuedo comprar sin tarjeta de cr\xE9dito?",`S\xED. Puedes pagar a cuotas con ${o.financing.name}: ${o.financing.text}. La aprobaci\xF3n es r\xE1pida y te acompa\xF1amos por WhatsApp.`]]:[],["\xBFPuedo pagar a cuotas?",`S\xED, con tu tarjeta de cr\xE9dito${o.financing?" o con "+o.financing.name:""}. El n\xFAmero de cuotas y los intereses dependen de tu banco o de tu cr\xE9dito; escr\xEDbenos por WhatsApp y te asesoramos para elegir la mejor opci\xF3n.`],["\xBFPuedo pagar por transferencia bancaria?","S\xED. Puedes pagar por transferencia desde cualquier banco (Bancolombia, Davivienda, BBVA, Banco de Bogot\xE1 y m\xE1s). Coord\xEDnalo con un asesor por WhatsApp y te enviamos los datos de pago."],["\xBFPuedo devolver mi compra?","Tienes derecho de retracto de 5 d\xEDas h\xE1biles desde la entrega para compras en l\xEDnea, siempre que el producto est\xE9 sin usar y en su empaque original (Ley 1480 de 2011)."]],G=(e,a=e.colors[0],t=0)=>`${e.name}${a&&a.hex?" color "+a.name:a&&a.name!=="Est\xE1ndar"?" "+a.name:""}${t?" \u2013 vista "+(t+1):""} original en Colombia`,Te=e=>{const a=N.find(s=>s.id===e),t=a&&v[a.hero];return t&&t.badge?t:I.find(s=>s.cat===e&&s.badge)||null},he=(e,a)=>[...e].sort((t,s)=>(s===a)-(t===a)||!!s.badge-!!t.badge),qe={chip:'<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9.5 9.5h5v5h-5zM9 2.5V6M15 2.5V6M9 18v3.5M15 18v3.5M2.5 9H6M2.5 15H6M18 9h3.5M18 15h3.5"/>',battery:'<rect x="2.5" y="7" width="17" height="10" rx="2.5"/><path d="M21.5 10.5v3M6 10v4M9.5 10v4"/>',camera:'<path d="M3 8.5A2 2 0 0 1 5 6.5h2.2l1.6-2h6.4l1.6 2H19a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8.5Z"/><circle cx="12" cy="13" r="3.8"/>',display:'<rect x="2.5" y="4" width="19" height="13" rx="2"/><path d="M8.5 20.5h7M12 17v3.5"/>',sound:'<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/>',magsafe:'<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><path d="M12 20.5v1.5"/>',water:'<path d="M12 3s6.5 7.2 6.5 11.5a6.5 6.5 0 0 1-13 0C5.5 10.2 12 3 12 3Z"/>',location:'<path d="M12 21s7-6.2 7-11.5a7 7 0 1 0-14 0C5 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>',pencil:'<path d="m4 20 1.2-4.6L16.6 4a2 2 0 0 1 2.8 2.8L8 18.2 4 20Z"/><path d="m14.5 6 3.5 3.5"/>',cable:'<path d="M7 3v4M11 3v4M5.5 7h7v3.5a3.5 3.5 0 0 1-7 0V7ZM9 14v2.5a4.5 4.5 0 0 0 9 0V4"/>',heart:'<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20Z"/>',sparkle:'<path d="M12 3.5 13.8 10 20.5 12l-6.7 2L12 20.5 10.2 14 3.5 12l6.7-2L12 3.5Z"/>',bolt:'<path d="M13 2 4.5 13.5H11L10 22l8.5-11.5H12L13 2Z"/>',truck:'<path d="M2.5 6.5h11v9h-11zM13.5 9.5h4l3 3.2v2.8h-7"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="16.5" cy="17.5" r="1.8"/>',card:'<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 9.5h19M6 15h4"/>',shield:'<path d="M12 2.8 4.5 5.8v5.7c0 4.6 3.1 7.9 7.5 9.7 4.4-1.8 7.5-5.1 7.5-9.7V5.8L12 2.8Z"/><path d="m8.7 12 2.3 2.3 4.4-4.6"/>',box:'<path d="M3.5 7.5 12 3l8.5 4.5v9L12 21l-8.5-4.5v-9Z"/><path d="m3.5 7.5 8.5 4.5 8.5-4.5M12 12v9"/>',moto:'<circle cx="5.5" cy="16.5" r="3"/><circle cx="18.5" cy="16.5" r="3"/><path d="M5.5 16.5h7l3.5-6.5h2.5M14 10l-1.8-3.5H9.5M18.5 16.5 16 10"/>',store:'<path d="M3 20.5V9.2l9-5 9 5v11.3"/><path d="M7.5 20.5v-7h9v7M7.5 17h9"/>',home:'<path d="M4 11 12 4.2l8 6.8v9.5H4V11Z"/><path d="M9.5 20.5v-5.5h5v5.5"/>',bank:'<path d="M3 9.5 12 4l9 5.5M4.5 10.5v7.5M9.5 10.5v7.5M14.5 10.5v7.5M19.5 10.5v7.5M3 20.5h18"/>',idcard:'<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><circle cx="8.5" cy="11" r="2.2"/><path d="M5.3 16.2c.6-1.6 1.8-2.4 3.2-2.4s2.6.8 3.2 2.4M14 10h4.5M14 13.5h3"/>',lock:'<rect x="4.5" y="10.5" width="15" height="10.5" rx="2.5"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/>',back:'<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>',check:'<path d="m5 12.5 4.5 4.5L19 7.5"/>',swap:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16m0 4v-4h-4"/>',chat:'<path d="M20.5 11.6a8.3 8.3 0 0 1-12 7.4L3.5 20.5l1.4-4.4a8.3 8.3 0 1 1 15.6-4.5Z"/><path d="M8.5 11.8h.01M12 11.8h.01M15.5 11.8h.01" stroke-width="2.4"/>'},w=(e,a=24)=>`<svg class="ico" viewBox="0 0 24 24" width="${a}" height="${a}" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${qe[e]}</svg>`,Ke=(e,a,t,s,n)=>`
    <div class="ship" data-ship="${e}">
      <div class="ship__head"><span class="ship__badge">${a}</span>${t}</div>
      <div class="ship__track" style="--n:${n.length}">
        <div class="ship__line"><span class="ship__fill"></span><span class="ship__vehicle">${w(s,18)}</span></div>
        <ol class="ship__steps">${n.map(([r,d])=>`<li class="ship__step"><span class="ship__dot">${w(r,16)}</span><span class="ship__label">${d}</span></li>`).join("")}</ol>
      </div>
    </div>`,A=e=>!!e.used,Be=e=>{const a=e.configs.map(t=>parseInt(t,10)).filter(t=>!isNaN(t));return a.length?Math.min(...a)===Math.max(...a)?`${a[0]}%`:`${Math.min(...a)}\u2013${Math.max(...a)}%`:""},Xe='<span class="used-pill">Usado \xB7 revisado</span>',ge='<span class="launch-pill">Nuevo lanzamiento</span>',De=(e,a)=>o.hero.video&&e.id===o.hero.id&&a.id===o.hero.color?`<video class="hero__video" src="${o.hero.video}" muted loop playsinline preload="auto" aria-hidden="true"></video>`:"",be=()=>H.get("nova-recent",[]).filter(e=>v[e]);function Je(){const e=v[o.hero.id]||I.find(n=>n.cat==="iphone")||I[0];if(!e)return'<section class="wrap section center"><h1 class="h2">Muy pronto</h1><p class="lead">Estamos preparando nuestra tienda Apple.</p></section>';const a=e.colors.find(n=>n.id===o.hero.color)||e.colors[0],t=o.tiles.map(n=>v[n]).filter(Boolean),s=o.tradeIn;return`
    <section class="hero">
      <div class="hero__copy">
        ${e.badge?ge:""}
        <h2 class="hero__title">${i(o.hero.title)}</h2>
        <p class="hero__sub">${i(o.hero.headline)}</p>
        <p class="hero__price">Desde ${h(e.fromPrice)} o <b>${O(e.fromPrice)}/mes</b> en ${o.installments} cuotas</p>
        <div class="cta-row"><a class="btn btn--primary btn--lg" href="${f.p(e,"color="+a.id)}">Comprar</a><a class="btn btn--link" href="/iphone/">Ver todos los iPhone \u203A</a></div>
      </div>
      <div class="hero__media"><img crossorigin="anonymous" src="${a.images[0]}" alt="${i(G(e,a))}" fetchpriority="high">${De(e,a)}</div>
    </section>

    <section class="trustline wrap">
      <h1 class="trustline__title">Tienda de productos Apple en ${i(o.sameDayCity)} \xB7 Env\xEDos a toda Colombia</h1>
      <ul class="trustline__items">
        <li>${w("shield",18)} Originales y sellados</li>
        <li>${w("lock",18)} Pago protegido por Shopify</li>
        <li>${w("check",18)} Si no lo tenemos, te lo traemos de USA</li>
        <li>${w("chat",18)} Atenci\xF3n real por WhatsApp</li>
      </ul>
    </section>

    <section class="chapters wrap" aria-label="Categor\xEDas">
      ${N.map(n=>{const r=v[n.hero]||I.find(d=>d.cat===n.id);return r?`<a class="chapter" href="${f.cat(n.id)}"><span class="chapter__img"><img crossorigin="anonymous" src="${j(r)}" alt="${i(r.name)}" loading="lazy"></span><span>${n.name}</span></a>`:""}).join("")}
    </section>

    <section class="benefits wrap" aria-label="Por qu\xE9 comprar con nosotros">
      ${[["bolt",`Entrega hoy en ${o.sameDayCity}`,"Rec\xEDbelo el mismo d\xEDa de tu compra"],["truck","Env\xEDos a toda Colombia",`En ${o.otherCitiesDays}, con n\xFAmero de gu\xEDa`],["card",`Hasta ${o.installments} cuotas`,o.financing?`Con tarjeta de cr\xE9dito o ${o.financing.name}`:"Con tu tarjeta de cr\xE9dito"],["shield","Originales y sellados","Productos Apple nuevos de f\xE1brica"],["chat","Asesor\xEDa experta","Te ayudamos a elegir por WhatsApp"]].map(([n,r,d])=>`<div class="benefit"><span class="benefit__icon">${w(n)}</span><div class="benefit__txt"><b>${r}</b><p>${i(d)}</p></div></div>`).join("")}
      <div class="benefits__line" aria-hidden="true"><span></span></div>
    </section>

    ${window.Explorer?window.Explorer.html({productId:"iphone-18-pro-max",price:v["iphone-18-pro-max"]?h(v["iphone-18-pro-max"].fromPrice):""}):""}

    <section class="tiles wrap">
      ${t.map((n,r)=>`
        <article class="tile ${r%3===0?"tile--wide":""} reveal">
          <div class="tile__copy">
            ${n.badge?`<p class="eyebrow eyebrow--accent">${i(n.badge)}</p>`:""}
            <h2 class="tile__title">${i(n.name)}</h2>
            <p class="tile__sub">${i(n.tagline)}</p>
            <p class="tile__price">Desde ${h(n.fromPrice)} \xB7 ${O(n.fromPrice)}/mes</p>
            <div class="cta-row"><a class="btn btn--primary btn--sm" href="${f.p(n)}">Comprar</a><a class="btn btn--link" href="${f.cat(n.cat)}">M\xE1s ${W(n.cat)} \u203A</a></div>
          </div>
          <a class="tile__media" href="${f.p(n)}"><img crossorigin="anonymous" src="${j(n)}" alt="${i(G(n))}" loading="lazy"></a>
        </article>`).join("")}
    </section>

    ${me("Nuestros recomendados",o.bestSellers,"Los imprescindibles para estrenar este mes.")}

    ${o.tradeIn.enabled?`<section class="section wrap">
      <div class="tradein-band reveal">
        <div>
          <p class="eyebrow">Plan Retoma</p>
          <h2 class="h2">Tu iPhone vale m\xE1s de lo que crees.</h2>
          <p class="lead">Entr\xE9galo como parte de pago y estrena hoy. Cotiza en segundos.</p>
        </div>
        <form class="tradein-quick" id="tradeQuick">
          <label>Tu equipo<select name="device">${s.devices.map(([n],r)=>`<option value="${r}">${i(n)}</option>`).join("")}</select></label>
          <label>Estado<select name="cond">${s.conditions.map(([n],r)=>`<option value="${r}">${n}</option>`).join("")}</select></label>
          <p class="tradein-quick__value">Recibe hasta <b id="tradeQuickVal"></b></p>
          <a class="btn btn--primary btn--block" href="/iphone/">Elegir mi nuevo iPhone</a>
        </form>
      </div>
    </section>`:""}

    ${be().length?me("Vistos recientemente",be()):""}

    <section class="section wrap center">
      <h2 class="h2">Paga como prefieras.</h2>
      <p class="lead">Paga con tarjeta de cr\xE9dito, transferencia desde cualquier banco${o.financing?` o con <b>${i(o.financing.name)}</b>, ${i(o.financing.text)}`:""}. \xBFQuieres pagar a cuotas? <a href="${S("Hola, quiero asesor\xEDa para pagar a cuotas")}" target="_blank" rel="noopener">Pide asesor\xEDa</a>.</p>
      ${oe()}
    </section>

    <section class="section wrap">
      <h2 class="h2 center">\xBFPor qu\xE9 comprar en ${i(o.name)}?</h2>
      <div class="why">
        ${[["Productos 100% originales","Nuevos y sellados. Nada de r\xE9plicas ni reacondicionados sin avisar."],["Asesor\xEDa experta","Te ayudamos a elegir por WhatsApp, sin presi\xF3n y con respuesta r\xE1pida."],["Entrega r\xE1pida",`El mismo d\xEDa en ${o.sameDayCity} y en ${o.otherCitiesDays} al resto del pa\xEDs, con seguimiento.`],["Pago seguro",`Pagas en el checkout seguro de Shopify con tarjeta de cr\xE9dito${o.financing?" o "+o.financing.name:""}; tus datos est\xE1n protegidos.`]].map(([n,r])=>`<div class="why__item reveal"><h3>${n}</h3><p>${r}</p></div>`).join("")}
      </div>
    </section>

    <section class="section wrap">
      <h2 class="h2 center">Compra con total confianza</h2>
      <p class="lead center">Tu compra est\xE1 protegida de principio a fin.</p>
      ${Qe()}
    </section>

    <section class="section wrap narrow seo-text">
      <h2 class="h2">Tu tienda Apple en ${i(o.sameDayCity)}, con env\xEDos a toda Colombia</h2>
      <p>En ${i(o.name)} vendemos productos Apple originales, nuevos y sellados: <a href="/iphone/">iPhone</a>, <a href="/mac/">MacBook</a>, <a href="/ipad/">iPad</a>, <a href="/watch/">Apple Watch</a>, <a href="/airpods/">AirPods</a> y <a href="/accesorios/">accesorios</a>. Si buscas una tienda de iPhone en ${i(o.sameDayCity)}, te lo entregamos el mismo d\xEDa; al resto del pa\xEDs enviamos en ${i(o.otherCitiesDays)} con n\xFAmero de gu\xEDa.</p>
      <p>Paga con tarjeta de cr\xE9dito en el checkout seguro de Shopify, por transferencia desde cualquier banco${o.financing?" o con "+i(o.financing.name):""}; si quieres pagar a cuotas, te asesoramos. ${["iphone-18-pro-max","iphone-17","airpods-pro-3","macbook-air-13-m5"].filter(n=>v[n]).map(n=>`<a href="${f.p(v[n])}">${i(v[n].name)}</a>`).join(", ")} y m\xE1s modelos, con asesor\xEDa por WhatsApp para que elijas el ideal.</p>
    </section>

    <section class="section wrap narrow">
      <h2 class="h2 center">Preguntas frecuentes</h2>
      ${je(ue)}
    </section>`}function Ye(e,a){const t=N.find(c=>c.id===e);if(!t)return ve();const s=Te(e);let n=he(I.filter(c=>c.cat===e&&!A(c)),s);const r=I.filter(c=>c.cat===e&&A(c)).sort((c,b)=>b.fromPrice-c.fromPrice),d=a.get("orden")||"rec";d==="asc"&&(n=[...n].sort((c,b)=>c.fromPrice-b.fromPrice)),d==="desc"&&(n=[...n].sort((c,b)=>b.fromPrice-c.fromPrice));const u=c=>[...new Set(c.configs.map(b=>(/(\d+\s?(GB|TB))/.exec(b)||[])[1]).filter(Boolean))];return`
    <section class="cat-hero wrap">
      <h1 class="display">${i(t.name)}</h1>
      <p class="lead">${i(t.blurb)}</p>
    </section>
    ${s?(()=>{const c=e==="iphone"&&s.colors.find(b=>b.id===o.hero.color)||s.colors[0];return`
    <section class="hero hero--cat" aria-label="Nuevo lanzamiento">
      <div class="hero__copy">
        ${ge}
        <h2 class="hero__title">${i(s.name)}</h2>
        <p class="hero__sub">${i(s.tagline)}</p>
        <p class="hero__price">Desde ${h(s.fromPrice)} o <b>${O(s.fromPrice)}/mes</b> en ${o.installments} cuotas</p>
        <div class="cta-row"><a class="btn btn--primary btn--lg" href="${f.p(s,"color="+c.id)}">Comprar</a>${q&&!s.available?'<span class="muted small">Bajo encargo \xB7 te lo traemos desde USA</span>':""}</div>
      </div>
      <a class="hero__media" href="${f.p(s,"color="+c.id)}"><img crossorigin="anonymous" src="${c.images[0]}" alt="${i(G(s,c))}" fetchpriority="high">${De(s,c)}</a>
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
      <div class="used__head"><p class="label">Seminuevos</p><h2 class="h2">${i(t.name)} usados</h2><p class="lead">${i(o.usedText||"")}</p></div>
      ${r.length?`<div class="grid">${r.map(pe).join("")}</div>`:`<div class="used__empty"><p><b>Muy pronto tendremos ${i(t.name)} usados.</b> \xBFBuscas uno en particular? Te avisamos cuando llegue.</p><a class="btn btn--wa btn--sm" target="_blank" rel="noopener" href="${S(`Hola ${o.name}, busco un ${t.name} usado. \xBFMe avisan cuando tengan?`)}">Av\xEDsame por WhatsApp</a></div>`}
    </section>
    ${["iphone","ipad","mac","watch"].includes(e)?`
    <section class="section wrap">
      <h2 class="h2">Compara los modelos</h2>
      <div class="compare-wrap"><table class="compare">
        <thead><tr><th>Modelo</th><th>Precio desde</th><th>Cuota desde</th><th>${e==="watch"?"Tama\xF1os":"Almacenamiento"}</th><th>Acabados</th><th></th></tr></thead>
        <tbody>${he(I.filter(c=>c.cat===e&&!A(c)),s).map(c=>`<tr>
          <td><a href="${f.p(c)}"><img crossorigin="anonymous" src="${j(c)}" alt="" loading="lazy">${i(c.name)}</a></td>
          <td>${h(c.fromPrice)}</td><td>${O(c.fromPrice)}/mes</td>
          <td>${e==="watch"?[...new Set(c.configs.map(b=>b.split(" \xB7 ")[0]))].join(", "):u(c).join(", ")}</td>
          <td><span class="dots dots--inline">${c.colors.map(b=>`<span class="dot" style="--c:${b.hex}" title="${i(b.name)}"></span>`).join("")}</span></td>
          <td><a class="btn btn--primary btn--xs" href="${f.p(c)}">Comprar</a></td></tr>`).join("")}</tbody>
      </table></div>
    </section>`:""}
    ${t.seo?`<section class="section wrap narrow seo-text"><h2 class="h2">${i(t.seo.h2)}</h2><p>${i(t.seo.text)}</p></section>`:""}
    <section class="section wrap center">${oe()}</section>`}let g=null;function ea(e,a){const t=v[e];if(!t)return ve();const s=[e,...be().filter(m=>m!==e)].slice(0,10);H.set("nova-recent",s);const n=q&&t.variants.filter(m=>m.available).sort((m,T)=>t.colors.findIndex(p=>p.id===m.color)-t.colors.findIndex(p=>p.id===T.color)||m.price-T.price)[0],r=t.colors.find(m=>m.id===a.get("color"))?a.get("color"):n?n.color:t.colors[0].id,d=t.variants.filter(m=>m.color===r).sort((m,T)=>m.price-T.price),u=d.find(m=>m.config===a.get("config"))?a.get("config"):(d.find(m=>m.available)||d[0]).config;g={m:t,color:r,config:u,img:0,protect:!1,trade:null};const c=(o.crossSell[t.cat]||[]).filter(m=>m!==e),b=t.cat==="iphone";return`
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
        ${A(t)?Xe:t.badge?ge:""}
        <h1 class="pdp__title">${i(t.name)}</h1>
        <p class="pdp__tag">${i(t.tagline)}</p>
        <div class="price-box" id="priceBox"></div>

        <fieldset class="opt">
          <legend>${U(t)?"Color":"Modelo"}. <b id="colorName"></b></legend>
          <div class="${U(t)?"swatches":"chips"}" id="colorOpts">
            ${t.colors.map(m=>U(t)?`<button class="swatch" style="--c:${m.hex}" data-color="${m.id}" aria-label="${i(m.name)}" title="${i(m.name)}"></button>`:`<button class="chip" data-color="${m.id}">${i(m.name)}</button>`).join("")}
          </div>
        </fieldset>

        ${we(t)?`<fieldset class="opt">
          <legend>${A(t)?"Salud de bater\xEDa":t.cat==="watch"?"Tama\xF1o y conectividad":t.cat==="mac"?"Configuraci\xF3n":"Capacidad"}.</legend>
          <div class="configs" id="configOpts"></div>
        </fieldset>`:""}

        ${b&&o.tradeIn.enabled?`<fieldset class="opt tradein" id="tradeBox">
          <legend>\xBFTienes un smartphone para entregar como parte de pago?</legend>
          <div class="seg"><button class="seg__btn" data-trade="yes">S\xED, cotizar retoma</button><button class="seg__btn is-on" data-trade="no">No, gracias</button></div>
          <div class="tradein__form" id="tradeForm" hidden>
            <label>Modelo<select id="tradeDevice">${o.tradeIn.devices.map(([m],T)=>`<option value="${T}">${i(m)}</option>`).join("")}</select></label>
            <label>Estado<select id="tradeCond">${o.tradeIn.conditions.map(([m],T)=>`<option value="${T}">${m}</option>`).join("")}</select></label>
            <p class="small muted">Valor estimado. Se confirma con la revisi\xF3n t\xE9cnica al entregar tu equipo.</p>
          </div>
        </fieldset>`:""}

        ${o.protection.cats.includes(t.cat)?`<label class="protect">
          <input type="checkbox" id="protect">
          <span><b>Agrega ${i(o.protection.name)}</b> por <b id="protectPrice"></b><br><span class="small muted">Cubre da\xF1os accidentales, pantalla rota y contacto con l\xEDquidos. Reemplazo r\xE1pido.</span></span>
        </label>`:""}

        <div class="buy-actions">
          <button class="btn btn--primary btn--lg btn--block" id="addBtn">Comprar</button>
          ${o.partner?`<div class="partner-note" id="partnerNote" hidden><p>${i(o.partner.text)}</p><a class="btn btn--wa btn--lg btn--block" id="partnerBtn" target="_blank" rel="noopener">Traerlo bajo encargo con Celada Shopper</a></div>`:""}
          <a class="btn btn--wa btn--lg btn--block" id="waBuy" target="_blank" rel="noopener">Comprar con asesor por WhatsApp</a>
          ${Ie()}
        </div>

        <div id="combo"></div>
        <div class="paybox" id="pagos">
          <p class="paybox__title">Formas de pago</p>
          <ul class="paybox__list">
            <li><span class="paybox__ico">${w("card",20)}</span><div><b>Tarjeta de cr\xE9dito</b><span>Pago seguro y cifrado en el checkout de Shopify</span></div></li>
            <li><span class="paybox__ico">${w("bank",20)}</span><div><b>Transferencia bancaria</b><span>Desde cualquier banco: Bancolombia, Davivienda, BBVA, Banco de Bogot\xE1 y m\xE1s</span></div></li>
            ${o.financing?`<li><span class="paybox__ico">${w("idcard",20)}</span><div><b>${i(o.financing.name)}</b><span>Cr\xE9dito solo con tu c\xE9dula, sin tarjeta de cr\xE9dito</span></div></li>`:""}
          </ul>
          <div class="paybox__cuotas">
            <div><b>\xBFQuieres pagarlo a cuotas?</b><span>Te asesoramos para elegir el plan de cuotas con tu tarjeta o ${o.financing?i(o.financing.name):"tu banco"}.</span></div>
            <a class="btn btn--wa btn--sm" id="payAdvice" target="_blank" rel="noopener">Pedir asesor\xEDa</a>
          </div>
        </div>
        <div class="ships">
          ${Ke("nacional",`${i(o.otherCitiesDays)}`,`<div><b>Env\xEDos a toda Colombia</b><br><span class="muted small">Con n\xFAmero de gu\xEDa para rastrear tu pedido. El costo se calcula al pagar.</span>${o.carriers&&o.carriers.length?`<div class="ship__carriers"><span>Env\xEDo realizado por</span>${o.carriers.map(m=>`<b>${i(m)}</b>`).join("")}</div>`:""}</div>`,"truck",[["store",`Bodega ${i(o.sameDayCity)}`],["truck","Transportadora"],["store","Bodega destino"],["home","En tus manos"]])}
        </div>
        <ul class="delivery">
          <li><span class="delivery__ico">${w("chat",22)}</span><div><b>\xBFDudas? Te asesoramos</b><br><span class="muted small">Escr\xEDbenos por WhatsApp y te respondemos en minutos.</span></div></li>
        </ul>
        <ul class="trust">
          ${A(t)?`<li>${w("shield",16)} Original Apple \xB7 usado revisado</li><li>${w("check",16)} Fotos y video reales antes de comprar</li>`:`<li>${w("shield",16)} Original y sellado</li><li>${w("check",16)} Garant\xEDa de 1 a\xF1o</li>`}<li>${w("lock",16)} Pago seguro en Shopify</li><li>${w("back",16)} Retracto 5 d\xEDas h\xE1biles</li>
        </ul>
        ${oe()}
      </div>
    </section>

    ${/^iphone-18-pro/.test(t.id)&&window.Explorer?window.Explorer.html({productId:"iphone-18-pro-max",price:v["iphone-18-pro-max"]?h(v["iphone-18-pro-max"].fromPrice):""}):""}
    ${aa(t)}
    <section class="section wrap narrow pinfo">
      <details><summary>Garant\xEDa, env\xEDo y retracto</summary><div class="pinfo__text"><p><b>Garant\xEDa:</b> ${i((A(t)?o.usedWarranty:o.warranty)||"")}</p><p><b>Env\xEDo:</b> mismo d\xEDa en ${i(o.sameDayCity)} y ${i(o.otherCitiesDays)} al resto de Colombia con ${i((o.carriers||[]).join(", "))}.</p><p><b>Retracto:</b> 5 d\xEDas h\xE1biles desde la entrega para compras en l\xEDnea, con el producto sin usar y en su empaque original (Ley 1480 de 2011).</p></div></details>
      <p class="about__seo">Compra tu ${i(t.name)} ${A(t)?"usado, original y revisado,":"original y sellado"} en ${i(o.name)}: entrega el mismo d\xEDa en ${i(o.sameDayCity)}, env\xEDos a toda Colombia en ${i(o.otherCitiesDays)} y pago hasta en ${o.installments} cuotas con tu tarjeta de cr\xE9dito. Mira todos los <a href="${f.cat(t.cat)}">${i(W(t.cat))} disponibles</a>.</p>
    </section>
    ${c.length?me("Arma tu combo perfecto",c,`Lo que m\xE1s compran junto con ${i(t.name)}.`):""}
    <section class="section wrap narrow"><h2 class="h2 center">Preguntas frecuentes</h2>${je(ue)}</section>

    <div class="buybar" id="buybar" aria-hidden="true">
      <div class="buybar__inner wrap">
        <div><b>${i(t.name)}</b><span class="muted small" id="barLabel"></span></div>
        <div class="buybar__right"><span id="barPrice"></span><button class="btn btn--primary btn--sm" id="barAdd">Comprar</button></div>
      </div>
    </div>`}function aa(e){const a=(window.PRODUCT_INFO||{})[e.id]||{},t=a.highlights||[],s=a.gallery||[],n=a.features||[],r=a.inBox||[],d=A(e),u=d?[["shield","Original Apple revisado","Equipo original, revisado antes de la venta y con su salud de bater\xEDa real."],["camera","Fotos y video reales","Antes de comprar te enviamos fotos y video del equipo exacto por WhatsApp."],["store","Respaldo Celada Shopper","Compras con el respaldo de Celada Shopper, una empresa real con operaci\xF3n en Colombia y USA."],["chat","Te acompa\xF1amos","Resolvemos tus dudas por WhatsApp antes y despu\xE9s de la compra."]]:[["shield","Garant\xEDa de 1 a\xF1o","Todos nuestros productos nuevos, incluidos los celulares, tienen un a\xF1o de garant\xEDa."],["check","100 % originales","Productos Apple originales, nuevos y en su caja sellada."],["store","Respaldo Celada Shopper","Cuentas con el respaldo y la garant\xEDa de Celada Shopper, una empresa real con operaci\xF3n en Colombia y USA."],["chat","Te acompa\xF1amos","Si necesitas usar la garant\xEDa, te ayudamos por WhatsApp en todo el proceso."]],c=o.team&&o.team.photo;return`<section class="pstory">
      <div class="wrap narrow pstory__head reveal">
        <p class="eyebrow">Acerca del ${i(e.name)}</p>
        <h2 class="pstory__title">${i(a.headline||e.tagline||e.name)}</h2>
        ${a.intro||e.description?`<p class="pstory__intro">${i(a.intro||e.description)}</p>`:""}
      </div>
      ${t.length?`<div class="wrap hl hl--${Math.min(t.length,4)}">${t.map(([b,m,T])=>`<div class="hl__item reveal"><span class="hl__ico">${w(qe[b]?b:"sparkle",26)}</span><h3>${i(m)}</h3><p>${i(T)}</p></div>`).join("")}</div>`:""}
      ${s.length?`<div class="wrap pgal pgal--${Math.min(s.length,4)}">${s.slice(0,4).map((b,m)=>`<figure class="pgal__item reveal"><img src="${i(b)}" alt="${i(e.name)} \u2013 detalle ${m+1}" loading="lazy" decoding="async"></figure>`).join("")}</div>`:""}
      ${n.length||r.length||a.compat?`<div class="wrap narrow pspec">
        ${n.length?`<div class="pspec__block reveal"><h3 class="pspec__h">Especificaciones</h3><dl class="pspec__list">${n.map(([b,m])=>`<div><dt>${i(b)}</dt><dd>${i(m)}</dd></div>`).join("")}</dl></div>`:""}
        ${r.length?`<div class="pspec__block reveal"><h3 class="pspec__h">En la caja</h3><ul class="pspec__box">${r.map(b=>`<li>${w("box",18)} ${i(b)}</li>`).join("")}</ul>${a.note?`<p class="muted small">${i(a.note)}</p>`:""}</div>`:""}
        ${a.compat?`<p class="pspec__compat reveal">${w("check",18)} <span><b>Compatibilidad:</b> ${i(a.compat)}</span></p>`:""}
      </div>`:""}
      <div class="wrap backing reveal${c?" backing--team":""}">
        ${c?`<figure class="backing__photo"><img src="${i(o.team.photo)}" alt="${i(o.team.caption||"Nuestro equipo")}" loading="lazy">${o.team.caption?`<figcaption>${i(o.team.caption)}</figcaption>`:""}</figure>`:""}
        <div class="backing__body">
          <p class="eyebrow">Compra con respaldo</p>
          <h2 class="h2">${d?"Usado, pero con la tranquilidad de siempre.":"Original, con garant\xEDa de un a\xF1o."}</h2>
          <ul class="backing__list">${u.map(([b,m,T])=>`<li><span class="backing__ico">${w(b,22)}</span><div><b>${i(m)}</b><span>${i(T)}</span></div></li>`).join("")}</ul>
          <a class="btn btn--wa btn--sm" target="_blank" rel="noopener" href="${S(`Hola ${o.name}, tengo una pregunta sobre la garant\xEDa del ${e.name}.`)}">Preguntar por WhatsApp</a>
        </div>
      </div>
    </section>`}function ta(){const{m:e}=g,a=()=>e.variants.find(p=>p.color===g.color&&p.config===g.config),t=()=>{if(!g.trade)return 0;const[,p]=o.tradeIn.devices[g.trade.d],[,y]=o.tradeIn.conditions[g.trade.c];return Math.round(p*y/1e4)*1e4},s=()=>{const p=a(),y=e.colors.find(x=>x.id===g.color),_=g.protect?ie(e,p.price):0,$=t(),k=p.price+_-$;l("#priceBox").innerHTML=`
        <p class="price">${h(p.price)} ${p.compare&&p.compare>p.price?`<s>${h(p.compare)}</s>`:""}</p>
        <p class="price__cuota">P\xE1galo a cuotas con tu tarjeta de cr\xE9dito o Sistecr\xE9dito \xB7 <a href="#pagos" class="price__link">pide asesor\xEDa</a></p>
        ${$||_?`<p class="price__total">Total con ${[_?"protecci\xF3n":"",$?"retoma":""].filter(Boolean).join(" y ")}: <b>${h(k)}</b>${$?` <span class="ok">(\u2212${h($)})</span>`:""}</p>`:""}`,l("#colorName").textContent=y.name,L("#colorOpts [data-color]").forEach(x=>x.classList.toggle("is-on",x.dataset.color===g.color)),l("#configOpts")&&(l("#configOpts").innerHTML=e.configs.map(x=>{const D=e.variants.find(K=>K.config===x&&K.color===g.color);return`<button class="config ${x===g.config?"is-on":""}" data-config="${i(x)}" ${D?"":"disabled"}>
            <span>${i(x)}</span><span class="config__price">${D?h(D.price)+(q&&!D.available?" \xB7 Bajo encargo":""):"No disponible en este color"}</span></button>`}).join("")),l("#protectPrice")&&(l("#protectPrice").textContent=h(ie(e,p.price)));const M=y.images;g.img=Math.min(g.img,M.length-1);const C=l("#galMain");C.alt=G(e,y,g.img),C.getAttribute("src")!==M[g.img]&&(C.classList.remove("fade"),C.offsetWidth,C.classList.add("fade"),C.src=M[g.img]),l("#thumbs").innerHTML=M.map((x,D)=>`<button class="thumb ${D===g.img?"is-on":""}" data-img="${D}" aria-label="Ver imagen ${D+1} de ${i(e.name)}"><img crossorigin="anonymous" src="${x}" alt="" loading="lazy"></button>`).join("");const P=[g.config!=="Est\xE1ndar"?g.config:"",y.name].filter(Boolean).join(" \xB7 ");l("#barLabel").textContent=" "+P,l("#barPrice").textContent=h(p.price);const R=!p.available;l("#addBtn").disabled=R,l("#barAdd").disabled=R,l("#waBuy").hidden=R&&!!o.partner,l("#waFloat").hidden=R&&!!o.partner,l("#partnerNote")&&(l("#partnerNote").hidden=!(R&&o.partner),o.partner&&(l("#partnerBtn").href=`https://wa.me/${o.partner.whatsapp}?text=${encodeURIComponent(`Hola Celada Shopper, vi en la tienda iC el ${e.name} (${P}) y aparece bajo encargo. Quiero traerlo bajo encargo desde USA con el servicio de casillero. \xBFMe cotizan?`)}`)),l("#addBtn").textContent=R?q?"Bajo encargo":"Disponible muy pronto":"Comprar",l("#barAdd").textContent=R?"Bajo encargo":"Comprar",l("#waBuy").href=S(`Hola ${o.name}, me interesa el ${e.name} (${P}) de ${h(p.price)}.`+($?` Quiero entregar mi ${o.tradeIn.devices[g.trade.d][0]} (${o.tradeIn.conditions[g.trade.c][0]}) en retoma.`:"")+" \xBFEst\xE1 disponible?"),l("#waFloat").href=l("#waBuy").href,r(p,P),l("#payAdvice")&&(l("#payAdvice").href=S(`Hola ${o.name}, quiero pagar a cuotas el ${e.name} (${P}) de ${h(p.price)}. \xBFMe asesoran con las opciones?`)),history.replaceState(null,"",f.p(e,`color=${g.color}${we(e)?"&config="+encodeURIComponent(g.config):""}`))},n=()=>{const y=((o.combos||{})[e.id]||(o.combos||{})[e.cat]||[]).map(_=>v[_]).filter(_=>_&&_.id!==e.id);return y.find(_=>_.variants.some($=>$.available))||y[0]||null},r=(p,y)=>{const _=l("#combo"),$=n();if(!_||!$){_&&(_.innerHTML="");return}const k=$.variants.find(R=>R.available)||$.variants[0],M=p.available&&k.available,C=p.price+k.price;_.innerHTML=`<div class="combo">
        <p class="combo__title">El complemento perfecto</p>
        <div class="combo__items">
          <div class="combo__item"><img crossorigin="anonymous" src="${z(j(e,g.color),200)}" alt="${i(e.name)}"><span>${i(e.name)}</span><b>${h(p.price)}</b></div>
          <span class="combo__plus">+</span>
          <div class="combo__item"><img crossorigin="anonymous" src="${z(j($),200)}" alt="${i($.name)}"><span>${i($.name)}</span><b>${h(k.price)}</b></div>
        </div>
        <div class="combo__foot"><p>Total: <b>${h(C)}</b></p>
          ${M?'<button class="btn btn--primary btn--sm" id="comboAdd">Agregar combo</button>':`<a class="btn btn--wa btn--sm" target="_blank" rel="noopener" href="${S(`Hola ${o.name}, quiero el combo ${e.name} (${y}) + ${$.name}. \xBFEst\xE1 disponible?`)}">Pedir combo por WhatsApp</a>`}</div>
      </div>`;const P=l("#comboAdd",_);P&&(P.onclick=()=>{te({id:e.id,color:p.color,config:p.config}),te({id:$.id,color:k.color,config:k.config})})},d=()=>{const p=a(),y=t();te({id:e.id,color:p.color,config:p.config,protection:g.protect?ie(e,p.price):0,tradeIn:y?{device:o.tradeIn.devices[g.trade.d][0],cond:o.tradeIn.conditions[g.trade.c][0],value:y}:null})},u=l(".pdp");u.addEventListener("click",p=>{const y=p.target.closest("[data-color]"),_=p.target.closest("[data-config]"),$=p.target.closest("[data-img]"),k=p.target.closest("[data-gal]"),M=p.target.closest("[data-trade]");if(y&&(g.color=y.dataset.color,g.img=0,a()||(g.config=e.variants.filter(C=>C.color===g.color).sort((C,P)=>C.price-P.price)[0].config)),_&&!_.disabled&&(g.config=_.dataset.config),$&&(g.img=+$.dataset.img),k){const C=e.colors.find(P=>P.id===g.color).images.length;g.img=(g.img+ +k.dataset.gal+C)%C}if(M){const C=M.dataset.trade==="yes";L("[data-trade]").forEach(P=>P.classList.toggle("is-on",P===M)),l("#tradeForm").hidden=!C,g.trade=C?{d:+l("#tradeDevice").value,c:+l("#tradeCond").value}:null}(y||_||$||k||M)&&s()}),u.addEventListener("change",p=>{p.target.id==="protect"&&(g.protect=p.target.checked),(p.target.id==="tradeDevice"||p.target.id==="tradeCond")&&(g.trade={d:+l("#tradeDevice").value,c:+l("#tradeCond").value}),s()}),l("#addBtn").addEventListener("click",d),l("#barAdd").addEventListener("click",d);let c=null;l(".gallery").addEventListener("touchstart",p=>{c=p.touches[0].clientX},{passive:!0}),l(".gallery").addEventListener("touchend",p=>{if(c===null)return;const y=p.changedTouches[0].clientX-c;c=null,Math.abs(y)>40&&l(`[data-gal="${y<0?1:-1}"]`).click()});const b=()=>{const p=l("#sameDay");if(!p)return clearInterval(g.timer);if(!o.sameDayCutoff){p.innerHTML=`<b>Rec\xEDbelo hoy en ${o.sameDayCity}</b><br><span class="muted small">Entrega el mismo d\xEDa en ${o.sameDayCity}.</span>`;return}const{h:y,m:_,day:$}=Ve(),k=o.sameDayCutoff*60-(y*60+_);p.innerHTML=k>0&&$!=="Sun"?`<b>Rec\xEDbelo hoy en ${o.sameDayCity}</b><br><span class="muted small">Compra en las pr\xF3ximas <b class="accent">${Math.floor(k/60)} h ${k%60} min</b></span>`:`<b>Rec\xEDbelo ${$==="Sat"||$==="Sun"?"el lunes":"ma\xF1ana"} en ${o.sameDayCity}</b><br><span class="muted small">Pide antes de las ${o.sameDayCutoff}:00 para entrega el mismo d\xEDa.</span>`};b(),g.timer=setInterval(b,3e4);const m=matchMedia("(prefers-reduced-motion: reduce)").matches;L(".ship").forEach((p,y)=>{const _=L(".ship__step",p),$=_.length,k=x=>{p.style.setProperty("--p",String(x/($-1))),_.forEach((D,K)=>{D.classList.toggle("is-done",K<x),D.classList.toggle("is-now",K===x)})};if(m)return k($-1);let M=0,C=null;const P=()=>{k(M),C=setTimeout(()=>{M=M>=$-1?0:M+1,P()},M>=$-1?2600:1100)};k(0),new IntersectionObserver(([x])=>{clearTimeout(C),x.isIntersecting&&(M=0,setTimeout(P,y*500))},{threshold:.6}).observe(p)}),new IntersectionObserver(([p])=>{const y=l("#buybar");if(!y)return;const _=!p.isIntersecting&&p.boundingClientRect.top<0;y.classList.toggle("show",_),y.setAttribute("aria-hidden",String(!_))}).observe(l("#addBtn")),s();{const p=a();V("ViewContent",{content_ids:[String(p.vid||e.id)],content_type:"product",content_name:e.name,value:p.price,currency:"COP"})}}function oa(){if(!E.length)return'<section class="wrap narrow section center"><h1 class="h2">Tu bolsa est\xE1 vac\xEDa</h1><p class="lead">Agrega un producto para continuar.</p><a class="btn btn--primary" href="/">Ir a la tienda</a></section>';const e=ae(),a=[["tarjeta","Tarjeta de cr\xE9dito",`Hasta ${o.installments} cuotas \xB7 ${o.installmentsNote}`],["sistecredito","Sistecr\xE9dito","Cr\xE9dito solo con tu c\xE9dula, sin tarjeta"]];return`
    <section class="checkout wrap">
      <form class="checkout__form" id="checkoutForm" novalidate>
        <h1 class="h2">Finalizar compra</h1>
        <p class="muted small with-ico">${w("lock",16)} Compra segura. Tus datos se usan solo para procesar tu pedido.</p>
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
            <label class="radio"><input type="radio" name="entrega" value="envio" checked><span><b>Env\xEDo a domicilio</b><br><span class="small muted">${e.ship===null?"Se calcula al pagar":e.ship?h(e.ship):"Gratis"} \xB7 Mismo d\xEDa en ${o.sameDayCity}, ${o.otherCitiesDays} al resto del pa\xEDs</span></span></label>
          </div>
          <div class="fields" id="shipFields">
            <label>Departamento<input name="departamento" required autocomplete="address-level1" value=""></label>
            <label>Ciudad<input name="ciudad" required autocomplete="address-level2" value=""></label>
            <label class="span2">Direcci\xF3n<input name="direccion" required autocomplete="street-address" placeholder="Calle 00 # 00-00, apto"></label>
          </div>
        </fieldset>
        <fieldset><legend>3. Pago</legend>
          <div class="radios">${a.map(([t,s,n],r)=>`<label class="radio"><input type="radio" name="pago" value="${s}" ${r?"":"checked"}><span><b>${s}</b><br><span class="small muted">${n}</span></span></label>`).join("")}</div>
        </fieldset>
        <label class="check"><input type="checkbox" name="acepto" required> Acepto los t\xE9rminos y condiciones y autorizo el tratamiento de mis datos personales (Ley 1581 de 2012).</label>
        <p class="form-error" id="formError" hidden>Revisa los campos marcados.</p>
        <button class="btn btn--primary btn--lg btn--block" type="submit">Confirmar pedido \xB7 ${h(e.total)}</button>
        <p class="small muted center">Al confirmar, un asesor te enviar\xE1 el enlace de pago seguro por WhatsApp.</p>
      </form>
      <aside class="checkout__summary">
        <h2 class="h3">Resumen</h2>
        <ul class="lines lines--compact">${E.map(t=>`<li class="line"><span class="line__img"><img crossorigin="anonymous" src="${j(v[t.id],t.color)}" alt=""><i>${t.qty}</i></span>
          <div class="line__info"><b class="small">${i(v[t.id].name)}</b><p class="small muted">${i(le(t))}</p>${t.protection?`<p class="small">+ ${i(o.protection.name)}</p>`:""}${t.tradeIn?`<p class="small ok">Retoma \u2212${h(t.tradeIn.value)}</p>`:""}</div>
          <b class="small">${h(ee(t))}</b></li>`).join("")}</ul>
        <dl class="sum">
          <div><dt>Subtotal</dt><dd>${h(e.sub)}</dd></div>
          ${e.trade?`<div class="ok"><dt>Retoma (estimado)</dt><dd>\u2212${h(e.trade)}</dd></div>`:""}
          <div><dt>Env\xEDo</dt><dd>${e.ship===null?"Se calcula al pagar":e.ship?h(e.ship):"Gratis"}</dd></div>
          <div class="sum__total"><dt>Total</dt><dd>${h(e.total)}</dd></div>
        </dl>
        <p class="small muted">o ${O(e.total)}/mes en ${o.installments} cuotas</p>
        <ul class="trust trust--col"><li>${w("shield",16)} Productos originales y sellados</li><li>${w("back",16)} Derecho de retracto de 5 d\xEDas h\xE1biles</li></ul>
      </aside>
    </section>`}function sa(){const e=l("#checkoutForm");e&&(e.addEventListener("change",a=>{if(a.target.name==="entrega"){const t=a.target.value==="envio";l("#shipFields").hidden=!t,L("#shipFields input").forEach(s=>{s.required=t})}}),e.addEventListener("submit",a=>{a.preventDefault(),L(".invalid",e).forEach(d=>d.classList.remove("invalid"));const t=L("input",e).filter(d=>!d.checkValidity());if(t.forEach(d=>(d.closest("label")||d).classList.add("invalid")),l("#formError").hidden=!t.length,t.length){t[0].focus();return}const s=Object.fromEntries(new FormData(e)),n="NV-"+Date.now().toString(36).toUpperCase().slice(-6),r=Le(`

Pedido ${n}
Cliente: ${s.nombre} \xB7 CC ${s.cedula}
Correo: ${s.email} \xB7 Cel: ${s.celular}
`+(s.entrega==="envio"?`Entrega: ${s.direccion}, ${s.ciudad} (${s.departamento})`:"Entrega: Retiro en tienda")+`
Pago: ${s.pago}`);H.set("nova-last-order",{order:n,name:s.nombre.split(" ")[0],wa:S(r)}),window.open(S(r),"_blank","noopener"),E=[],Y(),X("/gracias/")}))}function na(){const e=H.get("nova-last-order",null);return`<section class="wrap narrow section center thanks">
      <div class="thanks__icon">\u2713</div>
      <h1 class="h2">\xA1Gracias${e?", "+i(e.name):""}! Recibimos tu pedido.</h1>
      ${e?`<p class="lead">N\xFAmero de pedido <b>${i(e.order)}</b>. Un asesor te escribir\xE1 por WhatsApp con el enlace de pago seguro y la confirmaci\xF3n de entrega.</p>
      <a class="btn btn--wa" href="${e.wa}" target="_blank" rel="noopener">Abrir WhatsApp de nuevo</a>`:""}
      <p><a class="btn btn--link" href="/">Seguir comprando \u203A</a></p></section>`}const B=o.siteUrl||location.origin,ia=(e,a=158)=>e.length>a?e.slice(0,a-1).replace(/\s+\S*$/,"")+"\u2026":e,Q=e=>z(e,1200)||"",Re=e=>({"@type":"BreadcrumbList",itemListElement:e.map(([a,t],s)=>({"@type":"ListItem",position:s+1,name:a,item:B+t}))}),Ne={"@id":B+"/#tienda"};function ra(e){const a=N.find(s=>s.id===e[0]);if(!e.length){const s=v[o.hero.id]||I[0];return{title:`Tienda de iPhone en ${o.sameDayCity} y Colombia \xB7 ${o.name}`,desc:`Compra iPhone, MacBook, iPad, AirPods y Apple Watch originales y sellados. Entrega el mismo d\xEDa en ${o.sameDayCity}, env\xEDos a toda Colombia y hasta ${o.installments} cuotas.`,image:s&&Q(j(s)),ld:[{"@type":"WebPage","@id":B+"/#portada",url:B+"/",name:`Tienda de iPhone en ${o.sameDayCity} y Colombia`,isPartOf:{"@id":B+"/#sitio"},about:Ne,inLanguage:"es-CO"},{"@type":"FAQPage",mainEntity:ue.map(([n,r])=>({"@type":"Question",name:n,acceptedAnswer:{"@type":"Answer",text:r}}))}]}}if(a&&e.length===1){const s=he(I.filter(r=>r.cat===a.id&&!A(r)),Te(a.id)),n=a.seo||{};return{title:`${n.title||a.name+" en Colombia"} \xB7 ${o.name}`,desc:n.desc||`${a.name} originales en Colombia. Entrega el mismo d\xEDa en ${o.sameDayCity}.`,image:s[0]&&Q(j(s[0])),ld:[{"@type":"CollectionPage",url:B+f.cat(a.id),name:n.title||a.name,isPartOf:{"@id":B+"/#sitio"},inLanguage:"es-CO",mainEntity:{"@type":"ItemList",itemListElement:s.map((r,d)=>({"@type":"ListItem",position:d+1,url:B+f.p(r),name:r.name}))}},Re([["Inicio","/"],[a.name,f.cat(a.id)]])]}}const t=e.length===2&&v[e[1]];if(t){const s=t.variants.map(r=>r.price),n={"@type":"AggregateOffer",priceCurrency:"COP",lowPrice:Math.min(...s),highPrice:Math.max(...s),offerCount:t.variants.length,url:B+f.p(t),seller:Ne,itemCondition:A(t)?"https://schema.org/UsedCondition":"https://schema.org/NewCondition"};return q&&(n.availability=t.variants.some(r=>r.available)?"https://schema.org/InStock":"https://schema.org/BackOrder"),{title:`${t.name}${A(t)?" usado":""} precio en Colombia \xB7 ${o.name}`,desc:ia(`Compra ${t.name} original y sellado desde ${h(t.fromPrice)} o ${O(t.fromPrice)}/mes en ${o.installments} cuotas. Entrega el mismo d\xEDa en ${o.sameDayCity} y env\xEDos a toda Colombia.`),image:Q(j(t)),type:"product",ld:[{"@type":"Product",name:t.name,url:B+f.p(t),description:t.description||t.tagline||t.name,brand:{"@type":"Brand",name:"Apple"},category:W(t.cat),image:t.colors.flatMap(r=>r.images.slice(0,2)).slice(0,8).map(Q),...t.colors.length>1&&U(t)?{color:t.colors.map(r=>r.name).join(", ")}:{},offers:n},Re([["Inicio","/"],[W(t.cat),f.cat(t.cat)],[t.name,f.p(t)]])]}}return null}function ca(e,a){const t=e||{title:`P\xE1gina no encontrada \xB7 ${o.name}`,desc:"",noindex:!0},s=(r,d)=>{const u=document.head.querySelector(r);u&&u.setAttribute(u.tagName==="LINK"?"href":"content",d)};document.title=t.title,s('meta[name="description"]',t.desc),s('meta[name="robots"]',t.noindex?"noindex,follow":"index,follow,max-image-preview:large"),s('link[rel="canonical"]',B+a),s('meta[property="og:type"]',t.type||"website"),s('meta[property="og:url"]',B+a),s('meta[property="og:title"]',t.title),s('meta[property="og:description"]',t.desc),t.image&&(s('meta[property="og:image"]',t.image),s('meta[name="twitter:image"]',t.image)),s('meta[name="twitter:title"]',t.title),s('meta[name="twitter:description"]',t.desc);const n=l("#ldPage");n&&(n.textContent=t.ld?JSON.stringify({"@context":"https://schema.org","@graph":t.ld}):"{}")}window.STORE_PAGES=()=>["/",...N.filter(e=>I.some(a=>a.cat===e.id)).map(e=>f.cat(e.id)),...I.map(e=>f.p(e))].map(e=>{const a=v[e.split("/").filter(Boolean)[1]];return{path:e,images:a?a.colors.flatMap(t=>t.images.slice(0,2)).slice(0,8).map(Q):[],title:a?a.name:""}});const ve=()=>'<section class="wrap narrow section center"><h1 class="h2">No encontramos esta p\xE1gina</h1><a class="btn btn--primary" href="/">Volver al inicio</a></section>';function la(){if(!location.hash.startsWith("#/"))return;const[e,a]=location.hash.slice(1).split("?"),[t,s]=e.split("/").filter(Boolean),n=t==="c"&&s?f.cat(s):t==="p"&&v[s]?f.p(v[s]):t?`/${t}/`:"/";history.replaceState(null,"",n+(a?"?"+a:""))}function F(){la();const e=new URLSearchParams(location.search);let a=location.pathname.split("/").filter(Boolean);a.length===2&&v[a[1]]&&v[a[1]].cat!==a[0]&&(history.replaceState(null,"",f.p(v[a[1]],location.search.slice(1))),a=[v[a[1]].cat,a[1]]),g&&g.timer&&clearInterval(g.timer),g=null;const t=a.length===1&&N.some(c=>c.id===a[0]);let s,n=ra(a);a.length?t?s=Ye(a[0],e):a.length===2&&v[a[1]]?s=ea(a[1],e):a[0]==="checkout"?(s=oa(),n={title:`Finalizar compra \xB7 ${o.name}`,desc:"",noindex:!0}):a[0]==="gracias"?(s=na(),n={title:`Gracias por tu compra \xB7 ${o.name}`,desc:"",noindex:!0}):(s=ve(),n=null):s=Je();const r=!F.done;F.done=!0,ne.innerHTML=s,ne.removeAttribute("data-prerendered"),ca(n,a.length?`/${a.join("/")}/`:"/");const d=t?a[0]:a.length===2&&v[a[1]]?v[a[1]].cat:"";L("#navLinks a").forEach(c=>c.classList.toggle("is-on",c.dataset.cat===d)),l("#waFloat").hidden=!1,l("#waFloat").href=S(`Hola ${o.name}, quiero asesor\xEDa para comprar un producto Apple.`),window.Explorer&&window.Explorer.mount(ne),g&&ta(),a[0]==="checkout"&&sa(),da(),Fe();const u=location.pathname;F.last!==u&&(r||window.scrollTo({top:0}),F.last=u),r&&!window.__PRERENDER&&(document.documentElement.classList.add("no-anim"),L(".reveal").forEach(c=>{c.getBoundingClientRect().top<innerHeight&&c.classList.add("in")}),requestAnimationFrame(()=>requestAnimationFrame(()=>document.documentElement.classList.remove("no-anim")))),document.documentElement.dataset.ready=u,r||V("PageView")}function da(){L(".shelf").forEach(t=>t.addEventListener("click",s=>{const n=s.target.closest("[data-scroll]");if(!n)return;const r=l(".shelf__track",t);r.scrollBy({left:+n.dataset.scroll*r.clientWidth*.8,behavior:"smooth"})})),L(".card").forEach(t=>{t.addEventListener("mouseover",s=>{const n=s.target.closest("[data-swap]");n&&(l("[data-card-img]",t).src=n.dataset.swap)}),t.addEventListener("click",s=>{const n=s.target.closest("[data-color]");n&&(s.preventDefault(),X(t.getAttribute("href")+"?color="+n.dataset.color))})});const e=l("#sortSel");e&&e.addEventListener("change",()=>{X(location.pathname+"?orden="+e.value,!0)});const a=l("#tradeQuick");if(a){const t=()=>{const[,s]=o.tradeIn.devices[a.device.value],[,n]=o.tradeIn.conditions[a.cond.value];l("#tradeQuickVal").textContent=h(Math.round(s*n/1e4)*1e4)};a.addEventListener("change",t),t()}pa(),se(),L("img").forEach(Ce),ma()}let fe=null;function se(){const e=l(".benefits");if(!e)return;const a=L(".benefit",e),t=a.length,s=matchMedia("(max-width: 900px)");if(matchMedia("(prefers-reduced-motion: reduce)").matches||window.__PRERENDER){e.style.setProperty("--bp","1"),a.forEach(d=>d.classList.add("is-lit"));return}const n=()=>{if(fe=null,!document.body.contains(e))return;const d=innerHeight;let u;if(s.matches){const c=l(".benefits__line",e).getBoundingClientRect();u=(d*.72-c.top)/Math.max(1,c.height)}else{const c=e.getBoundingClientRect();u=(d*.92-c.top)/(d*.5)}u=Math.max(0,Math.min(1,u)),e.style.setProperty("--bp",u.toFixed(3)),a.forEach((c,b)=>c.classList.toggle("is-lit",u>.01&&u>=b/(t-1)-.02))},r=()=>{fe||(fe=requestAnimationFrame(n))};window.removeEventListener("scroll",se.handler),window.removeEventListener("resize",se.handler),se.handler=r,window.addEventListener("scroll",r,{passive:!0}),window.addEventListener("resize",r),n()}function pa(){const e=matchMedia("(prefers-reduced-motion: reduce)").matches;L(".hero__media").forEach(a=>{const t=l(".hero__video",a);if(t&&!e&&!window.__PRERENDER&&(t.addEventListener("playing",()=>a.classList.add("is-playing"),{once:!0}),new IntersectionObserver(([r])=>{r.isIntersecting?t.play().catch(()=>{}):t.pause()},{threshold:.2}).observe(a)),e||!matchMedia("(hover: hover) and (pointer: fine)").matches)return;const s=a.closest(".hero");s.addEventListener("pointermove",n=>{const r=a.getBoundingClientRect(),d=(n.clientX-r.left)/r.width-.5,u=(n.clientY-r.top)/r.height-.5;a.style.setProperty("--rx",`${(-u*10).toFixed(2)}deg`),a.style.setProperty("--ry",`${(d*14).toFixed(2)}deg`)}),s.addEventListener("pointerleave",()=>{a.style.setProperty("--rx","0deg"),a.style.setProperty("--ry","0deg")})})}const $e="IntersectionObserver"in window?new IntersectionObserver(e=>e.forEach(a=>{a.isIntersecting&&(a.target.classList.add("in"),$e.unobserve(a.target))}),{rootMargin:"0px 0px -8% 0px"}):null,ma=()=>L(".reveal:not(.in)").forEach(e=>$e&&!window.__PRERENDER?$e.observe(e):e.classList.add("in")),Oe=()=>{l("#search").hidden=!1,document.body.classList.add("locked"),l("#searchInput").value="",ye(""),setTimeout(()=>l("#searchInput").focus(),30)},He=()=>{l("#search").hidden=!0,document.body.classList.remove("locked")};function ye(e){const a=_e(e.trim()),t=a?I.filter(s=>a.split(/\s+/).every(n=>_e(`${s.name} ${W(s.cat)} ${s.tagline}`).includes(n))).slice(0,8):[];l("#searchResults").innerHTML=a?t.length?t.map(s=>`<a class="sres" href="${f.p(s)}"><img crossorigin="anonymous" src="${j(s)}" alt="${i(s.name)}"><span><b>${i(s.name)}</b><span class="small muted">Desde ${h(s.fromPrice)} \xB7 ${O(s.fromPrice)}/mes</span></span></a>`).join(""):`<p class="muted">Sin resultados para \u201C${i(e)}\u201D. <a href="${S("Hola, busco: "+e)}" target="_blank" rel="noopener">Preg\xFAntanos por WhatsApp</a>.</p>`:`<p class="eyebrow">B\xFAsquedas populares</p><div class="chips">${["iPhone 18 Pro","AirPods Pro 3","MacBook Air","iPad","Apple Watch","Cargador"].map(s=>`<button class="chip" data-q="${s}">${s}</button>`).join("")}</div>`}l("#openSearch").addEventListener("click",Oe),l("#searchInput").addEventListener("input",e=>ye(e.target.value)),l("#search").addEventListener("click",e=>{(e.target.id==="search"||e.target.closest("[data-close]")||e.target.closest(".sres"))&&He();const a=e.target.closest("[data-q]");a&&(l("#searchInput").value=a.dataset.q,ye(a.dataset.q))}),document.addEventListener("keydown",e=>{e.key==="Escape"&&(He(),de(),Fe()),e.key==="/"&&!/input|textarea|select/i.test(document.activeElement.tagName)&&(e.preventDefault(),Oe())});function ua(){l(".nav__name").textContent=o.name,l("#navLinks").innerHTML=N.map(c=>`<a href="${f.cat(c.id)}" data-cat="${c.id}">${c.name}</a>`).join("")+`<a href="${S("Hola, quiero asesor\xEDa")}" target="_blank" rel="noopener" class="nav__help">Asesor\xEDa</a>`+(o.partner?`<a href="${o.partner.url}" class="nav__back" rel="noopener" aria-label="Ir al casillero Celada Shopper"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 8l-9-5-9 5v8l9 5 9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/></svg>Casillero Celada Shopper</a>`:"");const e=l("#announce");e.innerHTML=o.announcements.map((c,b)=>`<p class="${b?"":"on"}">${i(c)}</p>`).join("");let a=0;setInterval(()=>{const c=L("p",e);c[a].classList.remove("on"),a=(a+1)%c.length,c[a].classList.add("on")},4200);const t=(c,b)=>`<details class="footer__col"><summary>${c}<svg class="footer__chev" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></summary><div class="footer__links">${b}</div></details>`,s=`https://${o.shopifyDomain}`,n={whatsapp:'<path d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3Zm0 23.7c-2 0-4-.5-5.7-1.6l-.4-.2-3.9 1 1-3.8-.3-.4A10.7 10.7 0 1 1 16 26.7Zm5.9-8c-.3-.2-1.9-1-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1a8.8 8.8 0 0 1-4.4-3.8c-.3-.6.3-.5 1-1.7.1-.2 0-.4 0-.6l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.3 1.4 3.5c.2.2 2.4 3.7 5.8 5.1 2.2.9 3 1 4.1.8.7-.1 1.9-.8 2.2-1.5.3-.8.3-1.4.2-1.5l-.6-.3Z"/>',instagram:'<path d="M16 5.6c3.4 0 3.8 0 5.1.1 3.4.2 5 1.8 5.2 5.2.1 1.3.1 1.7.1 5.1s0 3.8-.1 5.1c-.2 3.4-1.8 5-5.2 5.2-1.3.1-1.7.1-5.1.1s-3.8 0-5.1-.1c-3.4-.2-5-1.8-5.2-5.2-.1-1.3-.1-1.7-.1-5.1s0-3.8.1-5.1c.2-3.4 1.8-5 5.2-5.2 1.3-.1 1.7-.1 5.1-.1ZM16 3c-3.5 0-4 0-5.3.1C6 3.3 3.3 6 3.1 10.7 3 12 3 12.5 3 16s0 4 .1 5.3C3.3 26 6 28.7 10.7 28.9c1.3.1 1.8.1 5.3.1s4 0 5.3-.1c4.7-.2 7.4-2.9 7.6-7.6.1-1.3.1-1.8.1-5.3s0-4-.1-5.3C28.7 6 26 3.3 21.3 3.1 20 3 19.5 3 16 3Zm0 6.3a6.7 6.7 0 1 0 0 13.4 6.7 6.7 0 0 0 0-13.4Zm0 11a4.3 4.3 0 1 1 0-8.6 4.3 4.3 0 0 1 0 8.6Zm7-12.9a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z"/>',tiktok:'<path d="M22.5 3h-4.3v17.4a3.8 3.8 0 1 1-3.8-3.8c.4 0 .8.1 1.1.2v-4.4a8.1 8.1 0 1 0 7 8V11.6a10.3 10.3 0 0 0 6 1.9V9.2a6 6 0 0 1-6-6.2Z"/>'},r=(c,b,m)=>`<a class="footer__social" href="${b}" target="_blank" rel="noopener" aria-label="${m}"><svg viewBox="0 0 32 32" width="18" height="18" fill="currentColor" aria-hidden="true">${n[c]}</svg></a>`;l("#footer").innerHTML=`
      <div class="wrap">
        <div class="footer__top">
          <div class="footer__brand">
            <a class="footer__logo" href="/" aria-label="iC, inicio">${document.querySelector(".nav__word")?document.querySelector(".nav__word").outerHTML:i(o.name)}</a>
            <p class="footer__slogan">${i(o.slogan||"")}</p>
            <p>Productos Apple originales y sellados. Entrega el mismo d\xEDa en ${i(o.sameDayCity)} y env\xEDos a toda Colombia.</p>
            <div class="footer__socials">${r("whatsapp",S("Hola "+o.name),"WhatsApp")}${r("instagram",o.instagram,"Instagram")}${r("tiktok",o.tiktok,"TikTok")}</div>
          </div>
          <nav class="footer__cols" aria-label="Pie de p\xE1gina">
            ${t("Comprar",N.map(c=>`<a href="${f.cat(c.id)}">${c.name}</a>`).join(""))}
            ${t("Ayuda",`<a href="${s}/policies/shipping-policy">Env\xEDos y entregas</a><a href="${s}/policies/refund-policy">Devoluciones y retracto</a><a href="${s}/pages/contact">Contacto</a>`)}
            ${t("Nosotros",`<a href="${o.partner?o.partner.url:s}" target="_blank" rel="noopener">Pedidos especiales desde USA</a><a href="${s}/pages/quienes-somos">Qui\xE9nes somos</a><a href="${s}/policies/terms-of-service">T\xE9rminos y condiciones</a><a href="${s}/policies/privacy-policy">Pol\xEDtica de privacidad</a>`)}
          </nav>
          <div class="footer__contact">
            <p class="footer__contact-title">\xBFNecesitas ayuda para elegir?</p>
            <a class="btn btn--wa btn--sm" href="${S("Hola "+o.name+", necesito asesor\xEDa")}" target="_blank" rel="noopener">Escr\xEDbenos por WhatsApp</a>
            <p class="footer__contact-meta"><a href="tel:${o.phone.replace(/\s/g,"")}">${i(o.phone)}</a><br><a href="mailto:${o.email}">${i(o.email)}</a>${o.address?"<br>"+i(o.address):""}${o.hours?"<br>"+i(o.hours):""}</p>
          </div>
        </div>
        <div class="footer__pay"><span>Medios de pago</span>${oe()}</div>
        <div class="footer__legal">
          <p>${o.legalName?i(o.legalName)+" \xB7 ":""}${o.nit?"NIT "+i(o.nit)+" \xB7 ":""}Precios en pesos colombianos. Im\xE1genes de referencia.</p>
          <p>Apple, iPhone, iPad, Mac, Apple Watch y AirPods son marcas registradas de Apple Inc. ${i(o.name)} es un comercio independiente.</p>
          <p><button class="link small" id="cookiePrefs" type="button">Preferencias de cookies</button> \xB7 <a href="https://www.sic.gov.co" target="_blank" rel="noopener">Superintendencia de Industria y Comercio</a> \xB7 \xA9 ${new Date().getFullYear()} ${i(o.name)}</p>
        </div>
      </div>`;const d=matchMedia("(max-width: 700px)"),u=()=>L("#footer .footer__col").forEach(c=>{c.open=!d.matches});u(),d.addEventListener("change",u),l("#cookiePrefs").addEventListener("click",()=>Pe(!0))}const Fe=()=>{document.body.classList.remove("menu-open"),l("#burger").setAttribute("aria-expanded","false")};l("#burger").addEventListener("click",()=>{const e=document.body.classList.toggle("menu-open");l("#burger").setAttribute("aria-expanded",String(e))}),window.addEventListener("scroll",()=>l("#nav").classList.toggle("scrolled",window.scrollY>8),{passive:!0}),ua(),Pe(),re()==="all"&&V("PageView"),xe(),Ae(),document.addEventListener("click",e=>{const a=e.target.closest("a[href]");if(!a||e.defaultPrevented||e.button||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||a.target==="_blank"||a.hasAttribute("download"))return;const t=new URL(a.href,location.href);t.origin!==location.origin||/\.[a-z0-9]+$/i.test(t.pathname)||t.pathname===location.pathname&&t.search===location.search&&t.hash||(e.preventDefault(),X(t.pathname+t.search))}),window.addEventListener("popstate",F),window.addEventListener("hashchange",()=>location.hash.startsWith("#/")&&F()),F()})();
