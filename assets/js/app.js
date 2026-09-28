(async()=>{"use strict";const s=window.STORE,{catalog:S,live:j}=await window.loadCatalog();document.documentElement.classList.toggle("is-demo",!j);const R=window.CATEGORIES,b=Object.fromEntries(S.map(e=>[e.id,e])),l=(e,a=document)=>a.querySelector(e),x=(e,a=document)=>[...a.querySelectorAll(e)],ne=l("#app"),u=e=>"$"+Math.round(e).toLocaleString("es-CO"),N=e=>u(Math.ceil(e/s.installments)),i=e=>String(e??"").replace(/[&<>"']/g,a=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[a]),_e=e=>String(e).normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase(),V=e=>(R.find(a=>a.id===e)||{}).name||"",I=(e,a)=>(a&&e.colors.find(t=>t.id===a)||e.colors[0]).images[0],z=(e,a)=>e&&/[?&]width=\d+/.test(e)?e.replace(/width=\d+/,`width=${a}`):e,f={cat:e=>`/${e}/`,p:(e,a)=>`/${e.cat}/${e.id}/${a?"?"+a:""}`},X=(e,a)=>{history[a?"replaceState":"pushState"](null,"",e),H()},T=e=>`https://wa.me/${s.whatsapp}?text=${encodeURIComponent(e)}`,O={get(e,a){try{return JSON.parse(localStorage.getItem(e))??a}catch{return a}},set(e,a){try{localStorage.setItem(e,JSON.stringify(a))}catch{}}},ie=(e,a)=>s.protection.cats.includes(e.cat)?Math.max(s.protection.min,Math.round(a*s.protection.rate/1e3)*1e3):0,we=e=>e.configs.length>1||e.configs[0]!=="Est\xE1ndar",U=e=>e.colors.some(a=>a.hex),He=()=>{const e=Object.fromEntries(new Intl.DateTimeFormat("en-US",{timeZone:"America/Bogota",hour:"numeric",minute:"numeric",weekday:"short",hour12:!1}).formatToParts(new Date).map(a=>[a.type,a.value]));return{h:+e.hour%24,m:+e.minute,day:e.weekday}},Fe=".card__media,.gallery,.thumb,.chapter__img,.line__img,.tile__media,.hero__media",We=".compare img,.mini img,.sres img,.combo__item img",J=(()=>{try{const e=document.createElement("canvas");return e.width=e.height=1,e.getContext("2d",{willReadFrequently:!0})}catch{return null}})(),Ce=e=>{if(!J||!e.complete||!e.naturalWidth)return;const a=e.closest(Fe),t=e.matches(We);if(!(!a&&!t))try{J.clearRect(0,0,1,1),J.drawImage(e,3,3,1,1,0,0,1,1);const[o,n,c,d]=J.getImageData(0,0,1,1).data;d>250&&((t?e:a).style.backgroundColor=`rgb(${o}, ${n}, ${c})`)}catch{}};document.addEventListener("load",e=>{e.target.tagName==="IMG"&&Ce(e.target)},!0);let ke;const Ve=e=>{const a=l("#toast");a.innerHTML=e,a.classList.add("show"),clearTimeout(ke),ke=setTimeout(()=>a.classList.remove("show"),2600)},G=s.marketing||{},re=()=>O.get("cs-consent",null);let ce=!1;function Ee(){if(!(ce||window.__PRERENDER||re()!=="all")&&(ce=!0,G.metaPixelId&&((function(e,a,t,o,n,c,d){e.fbq||(n=e.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)},e._fbq||(e._fbq=n),n.push=n,n.loaded=!0,n.version="2.0",n.queue=[],c=a.createElement(t),c.async=!0,c.src=o,d=a.getElementsByTagName(t)[0],d.parentNode.insertBefore(c,d))})(window,document,"script","https://connect.facebook.net/en_US/fbevents.js"),window.fbq("init",G.metaPixelId)),G.ga4Id)){const e=document.createElement("script");e.async=!0,e.src=`https://www.googletagmanager.com/gtag/js?id=${G.ga4Id}`,document.head.appendChild(e),window.dataLayer=window.dataLayer||[],window.gtag=function(){window.dataLayer.push(arguments)},window.gtag("js",new Date),window.gtag("config",G.ga4Id,{send_page_view:!1})}}const Pe={PageView:"page_view",ViewContent:"view_item",AddToCart:"add_to_cart",InitiateCheckout:"begin_checkout",Contact:"generate_lead"},W=(e,a={})=>{ce&&(window.fbq&&window.fbq("track",e,a),window.gtag&&Pe[e]&&window.gtag("event",Pe[e],{value:a.value,currency:a.currency,page_path:location.pathname}))};function Le(e){if(window.__PRERENDER||!e&&re())return;let a=l("#cookies");a||(a=document.createElement("div"),a.id="cookies",a.className="cookies",document.body.appendChild(a)),a.innerHTML=`<p><b>Usamos cookies</b> para que la tienda funcione, recordar tu bolsa y mostrarte ofertas relevantes en redes sociales. Puedes aceptar todas o solo las necesarias. <a href="https://${s.shopifyDomain}/policies/privacy-policy" target="_blank" rel="noopener">Pol\xEDtica de privacidad</a> (Ley 1581 de 2012).</p>
      <div class="cookies__btns"><button class="btn btn--ghost btn--sm" data-consent="necessary">Solo necesarias</button><button class="btn btn--primary btn--sm" data-consent="all">Aceptar todas</button></div>`,a.hidden=!1,a.onclick=t=>{const o=t.target.closest("[data-consent]");o&&(O.set("cs-consent",o.dataset.consent),a.hidden=!0,o.dataset.consent==="all"&&(Ee(),W("PageView")))}}Ee(),document.addEventListener("click",e=>{e.target.closest('a[href*="wa.me"]')&&W("Contact")});let E=O.get("nova-cart",[]).map(e=>{const a=b[e.id],t=a&&a.variants.find(o=>o.color===e.color&&o.config===e.config);return t?{...e,price:t.price,vid:t.vid}:null}).filter(Boolean);const Y=()=>{O.set("nova-cart",E),Ae(),Me()},ee=e=>(e.price+(e.protection||0))*e.qty,ae=()=>{const e=E.reduce((o,n)=>o+ee(n),0),a=E.reduce((o,n)=>o+(n.tradeIn?n.tradeIn.value:0),0);if(j)return{sub:e,trade:a,ship:null,total:e};const t=s.freeShippingFrom?e===0||e>=s.freeShippingFrom?0:s.shippingCost:null;return{sub:e,trade:a,ship:t,total:Math.max(0,e-a+t)}};function te({id:e,color:a,config:t,qty:o=1,protection:n=0,tradeIn:c=null}){const d=b[e],g=d.variants.find(m=>m.color===a&&m.config===t)||d.variants.find(m=>m.available)||d.variants[0];if(!g.available){Ve("Este producto est\xE1 agotado. Escr\xEDbenos por WhatsApp y te avisamos.");return}const r=[e,g.color,g.config,n?"p":"",c?c.device+c.cond:""].join("|"),v=E.find(m=>m.key===r);v?v.qty+=o:E.push({key:r,id:e,color:g.color,config:g.config,qty:o,price:g.price,protection:n,tradeIn:c,sku:g.sku,vid:g.vid}),Y(),W("AddToCart",{content_ids:[String(g.vid||e)],content_type:"product",content_name:d.name,value:g.price*o,currency:"COP"}),Se()}const le=e=>{const t=b[e.id].colors.find(o=>o.id===e.color);return[e.config!=="Est\xE1ndar"?e.config:"",t?t.name:""].filter(Boolean).join(" \xB7 ")},xe=(e="")=>{const a=ae(),t=E.map(o=>`\u2022 ${o.qty} \xD7 ${b[o.id].name} (${le(o)}) \u2014 ${u(ee(o))}`+(o.protection?`
   + ${s.protection.name}`:"")+(o.tradeIn?`
   Retoma: ${o.tradeIn.device} (${o.tradeIn.cond}) \u2212${u(o.tradeIn.value)}`:""));return`Hola ${s.name}, quiero hacer este pedido:

${t.join(`
`)}

Subtotal: ${u(a.sub)}`+(a.trade?`
Descuento retoma (estimado): \u2212${u(a.trade)}`:"")+`
Env\xEDo: ${a.ship===null?"Se calcula al pagar":a.ship?u(a.ship):"Gratis"}
Total: ${u(a.total)}${e}`},ze=()=>E.filter(e=>e.tradeIn).map(e=>`Retoma solicitada para ${b[e.id].name}: ${e.tradeIn.device} (${e.tradeIn.cond}), valor estimado ${u(e.tradeIn.value)}`).join(" | "),Ue=()=>window.shopifyCheckoutUrl(E,ze());function Ae(){const e=E.reduce((t,o)=>t+o.qty,0),a=l("#cartCount");a.textContent=e,a.hidden=!e}function Me(){const e=l("#cart"),a=ae(),t=Math.max(0,s.freeShippingFrom-a.sub),o=Math.min(100,a.sub/s.freeShippingFrom*100),n=new Set(E.map(d=>d.id)),c=["airpods-pro-3","cargador-magsafe","airtag","adaptador-40w"].filter(d=>b[d]&&b[d].available!==!1&&!n.has(d)).slice(0,2);e.innerHTML=`
      <div class="drawer__head"><h2>Tu bolsa</h2><button class="icon-btn" data-close-cart aria-label="Cerrar">\u2715</button></div>
      ${E.length?`
      ${j||!s.freeShippingFrom?"":`<div class="ship-meter">
        <p>${t?`Te faltan <b>${u(t)}</b> para tener <b>env\xEDo gratis</b>`:"\xA1Tu pedido tiene <b>env\xEDo gratis</b>!"}</p>
        <div class="ship-meter__bar"><span style="width:${o}%"></span></div>
      </div>`}
      <ul class="lines">${E.map((d,g)=>{const r=b[d.id];return`<li class="line">
          <a href="${f.p(r,"color="+d.color)}" class="line__img"><img crossorigin="anonymous" src="${I(r,d.color)}" alt="${i(r.name+" "+((r.colors.find(v=>v.id===d.color)||{}).name||""))}"></a>
          <div class="line__info">
            <a href="${f.p(r,"color="+d.color)}" class="line__name">${i(r.name)}</a>
            <p class="muted small">${i(le(d))}</p>
            ${d.protection?`<p class="small with-ico">${w("shield",16)} ${i(s.protection.name)} \xB7 ${u(d.protection)}</p>`:""}
            ${d.tradeIn?`<p class="small ok with-ico">${w("swap",16)} Retoma ${i(d.tradeIn.device)} \xB7 \u2212${u(d.tradeIn.value)}</p>`:""}
            <div class="line__row">
              <div class="qty" role="group" aria-label="Cantidad">
                <button data-qty="${g}" data-d="-1" aria-label="Menos">\u2212</button><span>${d.qty}</span><button data-qty="${g}" data-d="1" aria-label="M\xE1s">+</button>
              </div>
              <b>${u(ee(d))}</b>
            </div>
            <button class="link small" data-remove="${g}">Eliminar</button>
          </div></li>`}).join("")}</ul>
      ${c.length?`<div class="drawer__suggest"><p class="eyebrow">Complementa tu compra</p>${c.map(d=>{const g=b[d];return`<div class="mini"><img crossorigin="anonymous" src="${I(g)}" alt="${i(g.name)}" loading="lazy"><div><p class="small"><b>${i(g.name)}</b></p><p class="small muted">${u(g.fromPrice)}</p></div>
          <button class="btn btn--ghost btn--xs" data-quick="${d}">Agregar</button></div>`}).join("")}</div>`:""}
      <div class="drawer__foot">
        <dl class="sum">
          <div><dt>Subtotal</dt><dd>${u(a.sub)}</dd></div>
          ${a.trade?`<div class="ok"><dt>Retoma (estimado)</dt><dd>\u2212${u(a.trade)}</dd></div>`:""}
          <div><dt>Env\xEDo</dt><dd>${a.ship===null?"Se calcula al pagar":a.ship?u(a.ship):"Gratis"}</dd></div>
          <div class="sum__total"><dt>Total</dt><dd>${u(a.total)}</dd></div>
        </dl>
        ${j&&a.trade?'<p class="small muted center">El descuento por retoma se aplica cuando revisemos tu equipo.</p>':""}
        <p class="small muted center">o ${N(a.total)}/mes en ${s.installments} cuotas</p>
        ${j?`<a href="${i(Ue())}" class="btn btn--primary btn--block btn--ico">${w("lock",18)} Pagar de forma segura</a>${Ie()}`:'<a href="/checkout/" class="btn btn--primary btn--block" data-close-cart>Finalizar compra</a>'}
        <a href="${T(xe())}" target="_blank" rel="noopener" class="btn btn--wa btn--block">Pedir por WhatsApp</a>
      </div>`:`
      <div class="empty"><p>Tu bolsa est\xE1 vac\xEDa.</p><a class="btn btn--primary" href="/iphone/" data-close-cart>Ver iPhone</a></div>`}`}const Se=()=>{l("#cart").classList.add("open"),l("#cart").setAttribute("aria-hidden","false"),l("#cartBackdrop").hidden=!1,document.body.classList.add("locked")},de=()=>{l("#cart").classList.remove("open"),l("#cart").setAttribute("aria-hidden","true"),l("#cartBackdrop").hidden=!0,document.body.classList.remove("locked")};l("#cart").addEventListener("click",e=>{const a=e.target.closest("[data-qty]"),t=e.target.closest("[data-remove]"),o=e.target.closest("[data-quick]");if(a){const n=E[+a.dataset.qty];n.qty=Math.max(1,Math.min(5,n.qty+ +a.dataset.d)),Y()}if(t&&(E.splice(+t.dataset.remove,1),Y()),o){const n=b[o.dataset.quick];te({id:n.id,color:n.variants[0].color,config:n.variants[0].config})}e.target.closest("[data-close-cart]")&&de()}),l("#openCart").addEventListener("click",Se),l("#cart").addEventListener("click",e=>{e.target.closest('a[href*="/cart/"]')&&W("InitiateCheckout",{value:ae().total,currency:"COP",num_items:E.reduce((a,t)=>a+t.qty,0)})}),l("#cartBackdrop").addEventListener("click",de);const pe=e=>`
    <a class="card reveal" href="${f.p(e)}">
      ${e.badge||M(e)||j&&!e.available?`<div class="tags">${M(e)?'<span class="tag tag--used">Usado</span>':""}${e.badge?`<span class="tag">${i(e.badge)}</span>`:""}${j&&!e.available?'<span class="tag tag--out">Agotado</span>':""}</div>`:""}
      <div class="card__media"><img crossorigin="anonymous" src="${z(I(e),600)}" alt="${i(Z(e))}" loading="lazy" decoding="async" data-card-img></div>
      ${U(e)?`<div class="dots">${e.colors.slice(0,7).map(a=>`<span class="dot" style="--c:${a.hex}" title="${i(a.name)}" data-swap="${z(a.images[0],600)}" data-color="${a.id}"></span>`).join("")}</div>`:'<div class="dots"></div>'}
      <h3 class="card__name">${i(e.name)}</h3>
      <p class="card__tag">${M(e)?`Bater\xEDa ${Ke(e)}`:i(e.tagline)}</p>
      <p class="card__price">${M(e)&&e.variants.every(a=>a.price===e.fromPrice)?"":"Desde "}${u(e.fromPrice)}</p>
      <p class="card__cuota">o ${N(e.fromPrice)}/mes en ${s.installments} cuotas</p>
      <span class="btn btn--primary btn--sm">Comprar</span>
    </a>`,me=(e,a,t="")=>{const o=a.map(n=>b[n]).filter(Boolean);return o.length?`<section class="section shelf">
      <div class="section__head wrap"><div><h2 class="h2">${e}</h2>${t?`<p class="lead">${t}</p>`:""}</div>
        <div class="shelf__arrows"><button class="round" data-scroll="-1" aria-label="Anterior">\u2039</button><button class="round" data-scroll="1" aria-label="Siguiente">\u203A</button></div></div>
      <div class="shelf__track">${o.map(pe).join("")}</div></section>`:""},Ie=()=>'<p class="secure-note"><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5Zm-3 8V7a3 3 0 0 1 6 0v3H9Z"/></svg>Pago 100% seguro procesado por Shopify \xB7 datos cifrados</p>',Ge=()=>`<div class="trustband">${[["lock","Pago seguro","Pagas en el checkout de Shopify con cifrado SSL. No guardamos datos de tu tarjeta."],["shield","Originales y sellados","Productos Apple nuevos, en su caja sellada y con garant\xEDa directa de Apple."],["back","Derecho de retracto","5 d\xEDas h\xE1biles para compras en l\xEDnea (Ley 1480 de 2011)."],["chat","Te acompa\xF1amos","Asesor\xEDa por WhatsApp antes y despu\xE9s de tu compra."]].map(([e,a,t])=>`<div class="trustband__item reveal"><span class="trustband__icon">${w(e)}</span><div><b>${a}</b><span>${t}</span></div></div>`).join("")}</div>`,oe=()=>`<div class="paywall">${s.paymentMethods.map(e=>`<span class="pill">${i(e)}</span>`).join("")}</div>`,Te=e=>`<div class="faq">${e.map(([a,t])=>`<details><summary>${i(a)}</summary><p>${t}</p></details>`).join("")}</div>`,ue=[["\xBFLos productos son originales y nuevos?","S\xED. Todos los productos son Apple originales, nuevos y sellados de f\xE1brica."],["\xBFQu\xE9 garant\xEDa tienen?",s.warranty||"Antes de tu compra te explicamos por WhatsApp las condiciones de garant\xEDa de cada equipo."],["\xBFCon qu\xE9 transportadoras env\xEDan?",`En ${s.sameDayCity} entregamos el mismo d\xEDa. Al resto de Colombia enviamos con ${(s.carriers||[]).join(", ").replace(/, ([^,]*)$/," y $1")}, con n\xFAmero de gu\xEDa para rastrear tu pedido.`],["\xBFCu\xE1nto se demora el env\xEDo?",`En ${s.sameDayCity} entregamos el mismo d\xEDa. Al resto del pa\xEDs, en ${s.otherCitiesDays}, con n\xFAmero de gu\xEDa. El costo del env\xEDo se calcula al pagar seg\xFAn tu ciudad.`],...s.financing?[["\xBFPuedo comprar sin tarjeta de cr\xE9dito?",`S\xED. Puedes pagar a cuotas con ${s.financing.name}: ${s.financing.text}. La aprobaci\xF3n es r\xE1pida y te acompa\xF1amos por WhatsApp.`]]:[],["\xBFPuedo pagar a cuotas?",`S\xED, con tu tarjeta de cr\xE9dito${s.financing?" o con "+s.financing.name:""}. El n\xFAmero de cuotas y los intereses dependen de tu banco o de tu cr\xE9dito; escr\xEDbenos por WhatsApp y te asesoramos para elegir la mejor opci\xF3n.`],["\xBFPuedo pagar por transferencia bancaria?","S\xED. Puedes pagar por transferencia desde cualquier banco (Bancolombia, Davivienda, BBVA, Banco de Bogot\xE1 y m\xE1s). Coord\xEDnalo con un asesor por WhatsApp y te enviamos los datos de pago."],["\xBFPuedo devolver mi compra?","Tienes derecho de retracto de 5 d\xEDas h\xE1biles desde la entrega para compras en l\xEDnea, siempre que el producto est\xE9 sin usar y en su empaque original (Ley 1480 de 2011)."]],Z=(e,a=e.colors[0],t=0)=>`${e.name}${a&&a.hex?" color "+a.name:a&&a.name!=="Est\xE1ndar"?" "+a.name:""}${t?" \u2013 vista "+(t+1):""} original en Colombia`,qe=e=>{const a=R.find(o=>o.id===e),t=a&&b[a.hero];return t&&t.badge?t:S.find(o=>o.cat===e&&o.badge)||null},he=(e,a)=>[...e].sort((t,o)=>(o===a)-(t===a)||!!o.badge-!!t.badge),Ze={bolt:'<path d="M13 2 4.5 13.5H11L10 22l8.5-11.5H12L13 2Z"/>',truck:'<path d="M2.5 6.5h11v9h-11zM13.5 9.5h4l3 3.2v2.8h-7"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="16.5" cy="17.5" r="1.8"/>',card:'<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 9.5h19M6 15h4"/>',shield:'<path d="M12 2.8 4.5 5.8v5.7c0 4.6 3.1 7.9 7.5 9.7 4.4-1.8 7.5-5.1 7.5-9.7V5.8L12 2.8Z"/><path d="m8.7 12 2.3 2.3 4.4-4.6"/>',box:'<path d="M3.5 7.5 12 3l8.5 4.5v9L12 21l-8.5-4.5v-9Z"/><path d="m3.5 7.5 8.5 4.5 8.5-4.5M12 12v9"/>',moto:'<circle cx="5.5" cy="16.5" r="3"/><circle cx="18.5" cy="16.5" r="3"/><path d="M5.5 16.5h7l3.5-6.5h2.5M14 10l-1.8-3.5H9.5M18.5 16.5 16 10"/>',store:'<path d="M3 20.5V9.2l9-5 9 5v11.3"/><path d="M7.5 20.5v-7h9v7M7.5 17h9"/>',home:'<path d="M4 11 12 4.2l8 6.8v9.5H4V11Z"/><path d="M9.5 20.5v-5.5h5v5.5"/>',bank:'<path d="M3 9.5 12 4l9 5.5M4.5 10.5v7.5M9.5 10.5v7.5M14.5 10.5v7.5M19.5 10.5v7.5M3 20.5h18"/>',idcard:'<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><circle cx="8.5" cy="11" r="2.2"/><path d="M5.3 16.2c.6-1.6 1.8-2.4 3.2-2.4s2.6.8 3.2 2.4M14 10h4.5M14 13.5h3"/>',lock:'<rect x="4.5" y="10.5" width="15" height="10.5" rx="2.5"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/>',back:'<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>',check:'<path d="m5 12.5 4.5 4.5L19 7.5"/>',swap:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16m0 4v-4h-4"/>',chat:'<path d="M20.5 11.6a8.3 8.3 0 0 1-12 7.4L3.5 20.5l1.4-4.4a8.3 8.3 0 1 1 15.6-4.5Z"/><path d="M8.5 11.8h.01M12 11.8h.01M15.5 11.8h.01" stroke-width="2.4"/>'},w=(e,a=24)=>`<svg class="ico" viewBox="0 0 24 24" width="${a}" height="${a}" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${Ze[e]}</svg>`,Qe=(e,a,t,o,n)=>`
    <div class="ship" data-ship="${e}">
      <div class="ship__head"><span class="ship__badge">${a}</span>${t}</div>
      <div class="ship__track" style="--n:${n.length}">
        <div class="ship__line"><span class="ship__fill"></span><span class="ship__vehicle">${w(o,18)}</span></div>
        <ol class="ship__steps">${n.map(([c,d])=>`<li class="ship__step"><span class="ship__dot">${w(c,16)}</span><span class="ship__label">${d}</span></li>`).join("")}</ol>
      </div>
    </div>`,M=e=>!!e.used,Ke=e=>{const a=e.configs.map(t=>parseInt(t,10)).filter(t=>!isNaN(t));return a.length?Math.min(...a)===Math.max(...a)?`${a[0]}%`:`${Math.min(...a)}\u2013${Math.max(...a)}%`:""},Xe='<span class="used-pill">Usado \xB7 revisado</span>',ge='<span class="launch-pill">Nuevo lanzamiento</span>',je=(e,a)=>s.hero.video&&e.id===s.hero.id&&a.id===s.hero.color?`<video class="hero__video" src="${s.hero.video}" muted loop playsinline preload="auto" aria-hidden="true"></video>`:"",be=()=>O.get("nova-recent",[]).filter(e=>b[e]);function Je(){const e=b[s.hero.id]||S.find(n=>n.cat==="iphone")||S[0];if(!e)return'<section class="wrap section center"><h1 class="h2">Muy pronto</h1><p class="lead">Estamos preparando nuestra tienda Apple.</p></section>';const a=e.colors.find(n=>n.id===s.hero.color)||e.colors[0],t=s.tiles.map(n=>b[n]).filter(Boolean),o=s.tradeIn;return`
    <section class="hero">
      <div class="hero__copy">
        ${e.badge?ge:""}
        <h2 class="hero__title">${i(s.hero.title)}</h2>
        <p class="hero__sub">${i(s.hero.headline)}</p>
        <p class="hero__price">Desde ${u(e.fromPrice)} o <b>${N(e.fromPrice)}/mes</b> en ${s.installments} cuotas</p>
        <div class="cta-row"><a class="btn btn--primary btn--lg" href="${f.p(e,"color="+a.id)}">Comprar</a><a class="btn btn--link" href="/iphone/">Ver todos los iPhone \u203A</a></div>
      </div>
      <div class="hero__media"><img crossorigin="anonymous" src="${a.images[0]}" alt="${i(Z(e,a))}" fetchpriority="high">${je(e,a)}</div>
    </section>

    <section class="trustline wrap">
      <h1 class="trustline__title">Tienda de productos Apple en ${i(s.sameDayCity)} \xB7 Env\xEDos a toda Colombia</h1>
      <ul class="trustline__items">
        <li>${w("shield",18)} Originales y sellados</li>
        <li>${w("lock",18)} Pago protegido por Shopify</li>
        <li>${w("check",18)} Si no lo tenemos, te lo traemos de USA</li>
        <li>${w("chat",18)} Atenci\xF3n real por WhatsApp</li>
      </ul>
    </section>

    <section class="chapters wrap" aria-label="Categor\xEDas">
      ${R.map(n=>{const c=b[n.hero]||S.find(d=>d.cat===n.id);return c?`<a class="chapter" href="${f.cat(n.id)}"><span class="chapter__img"><img crossorigin="anonymous" src="${I(c)}" alt="${i(c.name)}" loading="lazy"></span><span>${n.name}</span></a>`:""}).join("")}
    </section>

    <section class="benefits wrap" aria-label="Por qu\xE9 comprar con nosotros">
      ${[["bolt",`Entrega hoy en ${s.sameDayCity}`,"Rec\xEDbelo el mismo d\xEDa de tu compra"],["truck","Env\xEDos a toda Colombia",`En ${s.otherCitiesDays}, con n\xFAmero de gu\xEDa`],["card",`Hasta ${s.installments} cuotas`,s.financing?`Con tarjeta de cr\xE9dito o ${s.financing.name}`:"Con tu tarjeta de cr\xE9dito"],["shield","Originales y sellados","Productos Apple nuevos de f\xE1brica"],["chat","Asesor\xEDa experta","Te ayudamos a elegir por WhatsApp"]].map(([n,c,d])=>`<div class="benefit"><span class="benefit__icon">${w(n)}</span><div class="benefit__txt"><b>${c}</b><p>${i(d)}</p></div></div>`).join("")}
      <div class="benefits__line" aria-hidden="true"><span></span></div>
    </section>

    ${window.Explorer?window.Explorer.html({productId:"iphone-18-pro-max",price:b["iphone-18-pro-max"]?u(b["iphone-18-pro-max"].fromPrice):""}):""}

    <section class="tiles wrap">
      ${t.map((n,c)=>`
        <article class="tile ${c%3===0?"tile--wide":""} reveal">
          <div class="tile__copy">
            ${n.badge?`<p class="eyebrow eyebrow--accent">${i(n.badge)}</p>`:""}
            <h2 class="tile__title">${i(n.name)}</h2>
            <p class="tile__sub">${i(n.tagline)}</p>
            <p class="tile__price">Desde ${u(n.fromPrice)} \xB7 ${N(n.fromPrice)}/mes</p>
            <div class="cta-row"><a class="btn btn--primary btn--sm" href="${f.p(n)}">Comprar</a><a class="btn btn--link" href="${f.cat(n.cat)}">M\xE1s ${V(n.cat)} \u203A</a></div>
          </div>
          <a class="tile__media" href="${f.p(n)}"><img crossorigin="anonymous" src="${I(n)}" alt="${i(Z(n))}" loading="lazy"></a>
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
          <label>Tu equipo<select name="device">${o.devices.map(([n],c)=>`<option value="${c}">${i(n)}</option>`).join("")}</select></label>
          <label>Estado<select name="cond">${o.conditions.map(([n],c)=>`<option value="${c}">${n}</option>`).join("")}</select></label>
          <p class="tradein-quick__value">Recibe hasta <b id="tradeQuickVal"></b></p>
          <a class="btn btn--primary btn--block" href="/iphone/">Elegir mi nuevo iPhone</a>
        </form>
      </div>
    </section>`:""}

    ${be().length?me("Vistos recientemente",be()):""}

    <section class="section wrap center">
      <h2 class="h2">Paga como prefieras.</h2>
      <p class="lead">Paga con tarjeta de cr\xE9dito, transferencia desde cualquier banco${s.financing?` o con <b>${i(s.financing.name)}</b>, ${i(s.financing.text)}`:""}. \xBFQuieres pagar a cuotas? <a href="${T("Hola, quiero asesor\xEDa para pagar a cuotas")}" target="_blank" rel="noopener">Pide asesor\xEDa</a>.</p>
      ${oe()}
    </section>

    <section class="section wrap">
      <h2 class="h2 center">\xBFPor qu\xE9 comprar en ${i(s.name)}?</h2>
      <div class="why">
        ${[["Productos 100% originales","Nuevos y sellados. Nada de r\xE9plicas ni reacondicionados sin avisar."],["Asesor\xEDa experta","Te ayudamos a elegir por WhatsApp, sin presi\xF3n y con respuesta r\xE1pida."],["Entrega r\xE1pida",`El mismo d\xEDa en ${s.sameDayCity} y en ${s.otherCitiesDays} al resto del pa\xEDs, con seguimiento.`],["Pago seguro",`Pagas en el checkout seguro de Shopify con tarjeta de cr\xE9dito${s.financing?" o "+s.financing.name:""}; tus datos est\xE1n protegidos.`]].map(([n,c])=>`<div class="why__item reveal"><h3>${n}</h3><p>${c}</p></div>`).join("")}
      </div>
    </section>

    <section class="section wrap">
      <h2 class="h2 center">Compra con total confianza</h2>
      <p class="lead center">Tu compra est\xE1 protegida de principio a fin.</p>
      ${Ge()}
    </section>

    <section class="section wrap narrow seo-text">
      <h2 class="h2">Tu tienda Apple en ${i(s.sameDayCity)}, con env\xEDos a toda Colombia</h2>
      <p>En ${i(s.name)} vendemos productos Apple originales, nuevos y sellados: <a href="/iphone/">iPhone</a>, <a href="/mac/">MacBook</a>, <a href="/ipad/">iPad</a>, <a href="/watch/">Apple Watch</a>, <a href="/airpods/">AirPods</a> y <a href="/accesorios/">accesorios</a>. Si buscas una tienda de iPhone en ${i(s.sameDayCity)}, te lo entregamos el mismo d\xEDa; al resto del pa\xEDs enviamos en ${i(s.otherCitiesDays)} con n\xFAmero de gu\xEDa.</p>
      <p>Paga con tarjeta de cr\xE9dito en el checkout seguro de Shopify, por transferencia desde cualquier banco${s.financing?" o con "+i(s.financing.name):""}; si quieres pagar a cuotas, te asesoramos. ${["iphone-18-pro-max","iphone-17","airpods-pro-3","macbook-air-13-m5"].filter(n=>b[n]).map(n=>`<a href="${f.p(b[n])}">${i(b[n].name)}</a>`).join(", ")} y m\xE1s modelos, con asesor\xEDa por WhatsApp para que elijas el ideal.</p>
    </section>

    <section class="section wrap narrow">
      <h2 class="h2 center">Preguntas frecuentes</h2>
      ${Te(ue)}
    </section>`}function Ye(e,a){const t=R.find(r=>r.id===e);if(!t)return ve();const o=qe(e);let n=he(S.filter(r=>r.cat===e&&!M(r)),o);const c=S.filter(r=>r.cat===e&&M(r)).sort((r,v)=>v.fromPrice-r.fromPrice),d=a.get("orden")||"rec";d==="asc"&&(n=[...n].sort((r,v)=>r.fromPrice-v.fromPrice)),d==="desc"&&(n=[...n].sort((r,v)=>v.fromPrice-r.fromPrice));const g=r=>[...new Set(r.configs.map(v=>(/(\d+\s?(GB|TB))/.exec(v)||[])[1]).filter(Boolean))];return`
    <section class="cat-hero wrap">
      <h1 class="display">${i(t.name)}</h1>
      <p class="lead">${i(t.blurb)}</p>
    </section>
    ${o?(()=>{const r=e==="iphone"&&o.colors.find(v=>v.id===s.hero.color)||o.colors[0];return`
    <section class="hero hero--cat" aria-label="Nuevo lanzamiento">
      <div class="hero__copy">
        ${ge}
        <h2 class="hero__title">${i(o.name)}</h2>
        <p class="hero__sub">${i(o.tagline)}</p>
        <p class="hero__price">Desde ${u(o.fromPrice)} o <b>${N(o.fromPrice)}/mes</b> en ${s.installments} cuotas</p>
        <div class="cta-row"><a class="btn btn--primary btn--lg" href="${f.p(o,"color="+r.id)}">Comprar</a>${j&&!o.available?'<span class="muted small">Agotado por ahora \xB7 preg\xFAntanos por WhatsApp</span>':""}</div>
      </div>
      <a class="hero__media" href="${f.p(o,"color="+r.id)}"><img crossorigin="anonymous" src="${r.images[0]}" alt="${i(Z(o,r))}" fetchpriority="high">${je(o,r)}</a>
    </section>`})():""}
    <div class="wrap toolbar">
      <p class="muted">${n.length} modelos nuevos \xB7 <a href="#usados">${c.length?`Ver usados (${c.length})`:"Usados"}</a></p>
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
      ${c.length?`<div class="grid">${c.map(pe).join("")}</div>`:`<div class="used__empty"><p><b>Muy pronto tendremos ${i(t.name)} usados.</b> \xBFBuscas uno en particular? Te avisamos cuando llegue.</p><a class="btn btn--wa btn--sm" target="_blank" rel="noopener" href="${T(`Hola ${s.name}, busco un ${t.name} usado. \xBFMe avisan cuando tengan?`)}">Av\xEDsame por WhatsApp</a></div>`}
    </section>
    ${["iphone","ipad","mac","watch"].includes(e)?`
    <section class="section wrap">
      <h2 class="h2">Compara los modelos</h2>
      <div class="compare-wrap"><table class="compare">
        <thead><tr><th>Modelo</th><th>Precio desde</th><th>Cuota desde</th><th>${e==="watch"?"Tama\xF1os":"Almacenamiento"}</th><th>Acabados</th><th></th></tr></thead>
        <tbody>${he(S.filter(r=>r.cat===e&&!M(r)),o).map(r=>`<tr>
          <td><a href="${f.p(r)}"><img crossorigin="anonymous" src="${I(r)}" alt="" loading="lazy">${i(r.name)}</a></td>
          <td>${u(r.fromPrice)}</td><td>${N(r.fromPrice)}/mes</td>
          <td>${e==="watch"?[...new Set(r.configs.map(v=>v.split(" \xB7 ")[0]))].join(", "):g(r).join(", ")}</td>
          <td><span class="dots dots--inline">${r.colors.map(v=>`<span class="dot" style="--c:${v.hex}" title="${i(v.name)}"></span>`).join("")}</span></td>
          <td><a class="btn btn--primary btn--xs" href="${f.p(r)}">Comprar</a></td></tr>`).join("")}</tbody>
      </table></div>
    </section>`:""}
    ${t.seo?`<section class="section wrap narrow seo-text"><h2 class="h2">${i(t.seo.h2)}</h2><p>${i(t.seo.text)}</p></section>`:""}
    <section class="section wrap center">${oe()}</section>`}let h=null;function ea(e,a){const t=b[e];if(!t)return ve();const o=[e,...be().filter(m=>m!==e)].slice(0,10);O.set("nova-recent",o);const n=j&&t.variants.filter(m=>m.available).sort((m,q)=>t.colors.findIndex(p=>p.id===m.color)-t.colors.findIndex(p=>p.id===q.color)||m.price-q.price)[0],c=t.colors.find(m=>m.id===a.get("color"))?a.get("color"):n?n.color:t.colors[0].id,d=t.variants.filter(m=>m.color===c).sort((m,q)=>m.price-q.price),g=d.find(m=>m.config===a.get("config"))?a.get("config"):(d.find(m=>m.available)||d[0]).config;h={m:t,color:c,config:g,img:0,protect:!1,trade:null};const r=(s.crossSell[t.cat]||[]).filter(m=>m!==e),v=t.cat==="iphone";return`
    <nav class="crumbs wrap" aria-label="Ruta"><a href="/">Inicio</a><span>\u203A</span><a href="${f.cat(t.cat)}">${V(t.cat)}</a><span>\u203A</span><span>${i(t.name)}</span></nav>
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
        ${M(t)?Xe:t.badge?ge:""}
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
          <legend>${M(t)?"Salud de bater\xEDa":t.cat==="watch"?"Tama\xF1o y conectividad":t.cat==="mac"?"Configuraci\xF3n":"Capacidad"}.</legend>
          <div class="configs" id="configOpts"></div>
        </fieldset>`:""}

        ${v&&s.tradeIn.enabled?`<fieldset class="opt tradein" id="tradeBox">
          <legend>\xBFTienes un smartphone para entregar como parte de pago?</legend>
          <div class="seg"><button class="seg__btn" data-trade="yes">S\xED, cotizar retoma</button><button class="seg__btn is-on" data-trade="no">No, gracias</button></div>
          <div class="tradein__form" id="tradeForm" hidden>
            <label>Modelo<select id="tradeDevice">${s.tradeIn.devices.map(([m],q)=>`<option value="${q}">${i(m)}</option>`).join("")}</select></label>
            <label>Estado<select id="tradeCond">${s.tradeIn.conditions.map(([m],q)=>`<option value="${q}">${m}</option>`).join("")}</select></label>
            <p class="small muted">Valor estimado. Se confirma con la revisi\xF3n t\xE9cnica al entregar tu equipo.</p>
          </div>
        </fieldset>`:""}

        ${s.protection.cats.includes(t.cat)?`<label class="protect">
          <input type="checkbox" id="protect">
          <span><b>Agrega ${i(s.protection.name)}</b> por <b id="protectPrice"></b><br><span class="small muted">Cubre da\xF1os accidentales, pantalla rota y contacto con l\xEDquidos. Reemplazo r\xE1pido.</span></span>
        </label>`:""}

        <div class="buy-actions">
          <button class="btn btn--primary btn--lg btn--block" id="addBtn">Comprar</button>
          ${s.partner?`<div class="partner-note" id="partnerNote" hidden><p>${i(s.partner.text)}</p><a class="btn btn--ghost btn--sm" id="partnerBtn" target="_blank" rel="noopener">Traerlo bajo encargo con Celada Shopper</a></div>`:""}
          <a class="btn btn--wa btn--lg btn--block" id="waBuy" target="_blank" rel="noopener">Comprar con asesor por WhatsApp</a>
          ${Ie()}
        </div>

        <div id="combo"></div>
        <div class="paybox" id="pagos">
          <p class="paybox__title">Formas de pago</p>
          <ul class="paybox__list">
            <li><span class="paybox__ico">${w("card",20)}</span><div><b>Tarjeta de cr\xE9dito</b><span>Pago seguro y cifrado en el checkout de Shopify</span></div></li>
            <li><span class="paybox__ico">${w("bank",20)}</span><div><b>Transferencia bancaria</b><span>Desde cualquier banco: Bancolombia, Davivienda, BBVA, Banco de Bogot\xE1 y m\xE1s</span></div></li>
            ${s.financing?`<li><span class="paybox__ico">${w("idcard",20)}</span><div><b>${i(s.financing.name)}</b><span>Cr\xE9dito solo con tu c\xE9dula, sin tarjeta de cr\xE9dito</span></div></li>`:""}
          </ul>
          <div class="paybox__cuotas">
            <div><b>\xBFQuieres pagarlo a cuotas?</b><span>Te asesoramos para elegir el plan de cuotas con tu tarjeta o ${s.financing?i(s.financing.name):"tu banco"}.</span></div>
            <a class="btn btn--wa btn--sm" id="payAdvice" target="_blank" rel="noopener">Pedir asesor\xEDa</a>
          </div>
        </div>
        <div class="ships">
          ${Qe("nacional",`${i(s.otherCitiesDays)}`,`<div><b>Env\xEDos a toda Colombia</b><br><span class="muted small">Con n\xFAmero de gu\xEDa para rastrear tu pedido. El costo se calcula al pagar.</span>${s.carriers&&s.carriers.length?`<div class="ship__carriers"><span>Env\xEDo realizado por</span>${s.carriers.map(m=>`<b>${i(m)}</b>`).join("")}</div>`:""}</div>`,"truck",[["store",`Bodega ${i(s.sameDayCity)}`],["truck","Transportadora"],["store","Bodega destino"],["home","En tus manos"]])}
        </div>
        <ul class="delivery">
          <li><span class="delivery__ico">${w("chat",22)}</span><div><b>\xBFDudas? Te asesoramos</b><br><span class="muted small">Escr\xEDbenos por WhatsApp y te respondemos en minutos.</span></div></li>
        </ul>
        <ul class="trust">
          ${M(t)?`<li>${w("shield",16)} Original Apple \xB7 usado revisado</li><li>${w("check",16)} Fotos y video reales antes de comprar</li>`:`<li>${w("shield",16)} Original y sellado</li><li>${w("check",16)} Garant\xEDa directa de Apple</li>`}<li>${w("lock",16)} Pago seguro en Shopify</li><li>${w("back",16)} Retracto 5 d\xEDas h\xE1biles</li>
        </ul>
        ${oe()}
      </div>
    </section>

    ${/^iphone-18-pro/.test(t.id)&&window.Explorer?window.Explorer.html({productId:"iphone-18-pro-max",price:b["iphone-18-pro-max"]?u(b["iphone-18-pro-max"].fromPrice):""}):""}
    <section class="section wrap narrow about reveal"><h2 class="eyebrow">Acerca del ${i(t.name)}</h2>${t.description?`<p class="about__text">${i(t.description)}</p>`:""}
      <p class="about__seo">Compra tu ${i(t.name)} ${M(t)?"usado, original y revisado,":"original y sellado"} en ${i(s.name)}: entrega el mismo d\xEDa en ${i(s.sameDayCity)}, env\xEDos a toda Colombia en ${i(s.otherCitiesDays)} y pago hasta en ${s.installments} cuotas con tu tarjeta de cr\xE9dito. Mira todos los <a href="${f.cat(t.cat)}">${i(V(t.cat))} disponibles</a>.</p></section>
    ${(()=>{const m=(window.PRODUCT_INFO||{})[t.id]||{features:[],inBox:[]};return`<section class="section wrap narrow pinfo">
      <h2 class="h2">Informaci\xF3n del producto</h2>
      ${m.features.length?`<details open><summary>Caracter\xEDsticas</summary><dl class="pinfo__features">${m.features.map(([q,p])=>`<div><dt>${i(q)}</dt><dd>${i(p)}</dd></div>`).join("")}</dl></details>`:""}
      ${m.inBox.length?`<details><summary>En la caja</summary><ul class="pinfo__box">${m.inBox.map(q=>`<li>${w("check",16)} ${i(q)}</li>`).join("")}</ul>${m.note?`<p class="muted small">${i(m.note)}</p>`:""}</details>`:""}
      <details${m.features.length?"":" open"}><summary>Garant\xEDa y env\xEDo</summary><div class="pinfo__text"><p><b>Garant\xEDa:</b> ${i((M(t)?s.usedWarranty:s.warranty)||"")}</p><p><b>Env\xEDo:</b> mismo d\xEDa en ${i(s.sameDayCity)} y ${i(s.otherCitiesDays)} al resto de Colombia con ${i((s.carriers||[]).join(", "))}.</p><p><b>Retracto:</b> 5 d\xEDas h\xE1biles desde la entrega para compras en l\xEDnea, con el producto sin usar y en su empaque original (Ley 1480 de 2011).</p></div></details>
    </section>`})()}
    ${r.length?me("Arma tu combo perfecto",r,`Lo que m\xE1s compran junto con ${i(t.name)}.`):""}
    <section class="section wrap narrow"><h2 class="h2 center">Preguntas frecuentes</h2>${Te(ue)}</section>

    <div class="buybar" id="buybar" aria-hidden="true">
      <div class="buybar__inner wrap">
        <div><b>${i(t.name)}</b><span class="muted small" id="barLabel"></span></div>
        <div class="buybar__right"><span id="barPrice"></span><button class="btn btn--primary btn--sm" id="barAdd">Comprar</button></div>
      </div>
    </div>`}function aa(){const{m:e}=h,a=()=>e.variants.find(p=>p.color===h.color&&p.config===h.config),t=()=>{if(!h.trade)return 0;const[,p]=s.tradeIn.devices[h.trade.d],[,y]=s.tradeIn.conditions[h.trade.c];return Math.round(p*y/1e4)*1e4},o=()=>{const p=a(),y=e.colors.find(A=>A.id===h.color),_=h.protect?ie(e,p.price):0,$=t(),k=p.price+_-$;l("#priceBox").innerHTML=`
        <p class="price">${u(p.price)} ${p.compare&&p.compare>p.price?`<s>${u(p.compare)}</s>`:""}</p>
        <p class="price__cuota">P\xE1galo a cuotas con tu tarjeta de cr\xE9dito o Sistecr\xE9dito \xB7 <a href="#pagos" class="price__link">pide asesor\xEDa</a></p>
        ${$||_?`<p class="price__total">Total con ${[_?"protecci\xF3n":"",$?"retoma":""].filter(Boolean).join(" y ")}: <b>${u(k)}</b>${$?` <span class="ok">(\u2212${u($)})</span>`:""}</p>`:""}`,l("#colorName").textContent=y.name,x("#colorOpts [data-color]").forEach(A=>A.classList.toggle("is-on",A.dataset.color===h.color)),l("#configOpts")&&(l("#configOpts").innerHTML=e.configs.map(A=>{const B=e.variants.find(K=>K.config===A&&K.color===h.color);return`<button class="config ${A===h.config?"is-on":""}" data-config="${i(A)}" ${B?"":"disabled"}>
            <span>${i(A)}</span><span class="config__price">${B?u(B.price)+(j&&!B.available?" \xB7 Agotado":""):"No disponible en este color"}</span></button>`}).join("")),l("#protectPrice")&&(l("#protectPrice").textContent=u(ie(e,p.price)));const P=y.images;h.img=Math.min(h.img,P.length-1);const C=l("#galMain");C.alt=Z(e,y,h.img),C.getAttribute("src")!==P[h.img]&&(C.classList.remove("fade"),C.offsetWidth,C.classList.add("fade"),C.src=P[h.img]),l("#thumbs").innerHTML=P.map((A,B)=>`<button class="thumb ${B===h.img?"is-on":""}" data-img="${B}" aria-label="Ver imagen ${B+1} de ${i(e.name)}"><img crossorigin="anonymous" src="${A}" alt="" loading="lazy"></button>`).join("");const L=[h.config!=="Est\xE1ndar"?h.config:"",y.name].filter(Boolean).join(" \xB7 ");l("#barLabel").textContent=" "+L,l("#barPrice").textContent=u(p.price);const F=!p.available;l("#addBtn").disabled=F,l("#barAdd").disabled=F,l("#partnerNote")&&(l("#partnerNote").hidden=!(F&&s.partner),s.partner&&(l("#partnerBtn").href=`https://wa.me/${s.partner.whatsapp}?text=${encodeURIComponent(`Hola Celada Shopper, vi en la tienda iC el ${e.name} (${L}) y est\xE1 agotado. Quiero traerlo bajo encargo desde USA con el servicio de casillero. \xBFMe cotizan?`)}`)),l("#addBtn").textContent=F?j?"Agotado":"Disponible muy pronto":"Comprar",l("#barAdd").textContent=F?"Agotado":"Comprar",l("#waBuy").href=T(`Hola ${s.name}, me interesa el ${e.name} (${L}) de ${u(p.price)}.`+($?` Quiero entregar mi ${s.tradeIn.devices[h.trade.d][0]} (${s.tradeIn.conditions[h.trade.c][0]}) en retoma.`:"")+" \xBFEst\xE1 disponible?"),l("#waFloat").href=l("#waBuy").href,c(p,L),l("#payAdvice")&&(l("#payAdvice").href=T(`Hola ${s.name}, quiero pagar a cuotas el ${e.name} (${L}) de ${u(p.price)}. \xBFMe asesoran con las opciones?`)),history.replaceState(null,"",f.p(e,`color=${h.color}${we(e)?"&config="+encodeURIComponent(h.config):""}`))},n=()=>{const y=((s.combos||{})[e.id]||(s.combos||{})[e.cat]||[]).map(_=>b[_]).filter(_=>_&&_.id!==e.id);return y.find(_=>_.variants.some($=>$.available))||y[0]||null},c=(p,y)=>{const _=l("#combo"),$=n();if(!_||!$){_&&(_.innerHTML="");return}const k=$.variants.find(F=>F.available)||$.variants[0],P=p.available&&k.available,C=p.price+k.price;_.innerHTML=`<div class="combo">
        <p class="combo__title">El complemento perfecto</p>
        <div class="combo__items">
          <div class="combo__item"><img crossorigin="anonymous" src="${z(I(e,h.color),200)}" alt="${i(e.name)}"><span>${i(e.name)}</span><b>${u(p.price)}</b></div>
          <span class="combo__plus">+</span>
          <div class="combo__item"><img crossorigin="anonymous" src="${z(I($),200)}" alt="${i($.name)}"><span>${i($.name)}</span><b>${u(k.price)}</b></div>
        </div>
        <div class="combo__foot"><p>Total: <b>${u(C)}</b></p>
          ${P?'<button class="btn btn--primary btn--sm" id="comboAdd">Agregar combo</button>':`<a class="btn btn--wa btn--sm" target="_blank" rel="noopener" href="${T(`Hola ${s.name}, quiero el combo ${e.name} (${y}) + ${$.name}. \xBFEst\xE1 disponible?`)}">Pedir combo por WhatsApp</a>`}</div>
      </div>`;const L=l("#comboAdd",_);L&&(L.onclick=()=>{te({id:e.id,color:p.color,config:p.config}),te({id:$.id,color:k.color,config:k.config})})},d=()=>{const p=a(),y=t();te({id:e.id,color:p.color,config:p.config,protection:h.protect?ie(e,p.price):0,tradeIn:y?{device:s.tradeIn.devices[h.trade.d][0],cond:s.tradeIn.conditions[h.trade.c][0],value:y}:null})},g=l(".pdp");g.addEventListener("click",p=>{const y=p.target.closest("[data-color]"),_=p.target.closest("[data-config]"),$=p.target.closest("[data-img]"),k=p.target.closest("[data-gal]"),P=p.target.closest("[data-trade]");if(y&&(h.color=y.dataset.color,h.img=0,a()||(h.config=e.variants.filter(C=>C.color===h.color).sort((C,L)=>C.price-L.price)[0].config)),_&&!_.disabled&&(h.config=_.dataset.config),$&&(h.img=+$.dataset.img),k){const C=e.colors.find(L=>L.id===h.color).images.length;h.img=(h.img+ +k.dataset.gal+C)%C}if(P){const C=P.dataset.trade==="yes";x("[data-trade]").forEach(L=>L.classList.toggle("is-on",L===P)),l("#tradeForm").hidden=!C,h.trade=C?{d:+l("#tradeDevice").value,c:+l("#tradeCond").value}:null}(y||_||$||k||P)&&o()}),g.addEventListener("change",p=>{p.target.id==="protect"&&(h.protect=p.target.checked),(p.target.id==="tradeDevice"||p.target.id==="tradeCond")&&(h.trade={d:+l("#tradeDevice").value,c:+l("#tradeCond").value}),o()}),l("#addBtn").addEventListener("click",d),l("#barAdd").addEventListener("click",d);let r=null;l(".gallery").addEventListener("touchstart",p=>{r=p.touches[0].clientX},{passive:!0}),l(".gallery").addEventListener("touchend",p=>{if(r===null)return;const y=p.changedTouches[0].clientX-r;r=null,Math.abs(y)>40&&l(`[data-gal="${y<0?1:-1}"]`).click()});const v=()=>{const p=l("#sameDay");if(!p)return clearInterval(h.timer);if(!s.sameDayCutoff){p.innerHTML=`<b>Rec\xEDbelo hoy en ${s.sameDayCity}</b><br><span class="muted small">Entrega el mismo d\xEDa en ${s.sameDayCity}.</span>`;return}const{h:y,m:_,day:$}=He(),k=s.sameDayCutoff*60-(y*60+_);p.innerHTML=k>0&&$!=="Sun"?`<b>Rec\xEDbelo hoy en ${s.sameDayCity}</b><br><span class="muted small">Compra en las pr\xF3ximas <b class="accent">${Math.floor(k/60)} h ${k%60} min</b></span>`:`<b>Rec\xEDbelo ${$==="Sat"||$==="Sun"?"el lunes":"ma\xF1ana"} en ${s.sameDayCity}</b><br><span class="muted small">Pide antes de las ${s.sameDayCutoff}:00 para entrega el mismo d\xEDa.</span>`};v(),h.timer=setInterval(v,3e4);const m=matchMedia("(prefers-reduced-motion: reduce)").matches;x(".ship").forEach((p,y)=>{const _=x(".ship__step",p),$=_.length,k=A=>{p.style.setProperty("--p",String(A/($-1))),_.forEach((B,K)=>{B.classList.toggle("is-done",K<A),B.classList.toggle("is-now",K===A)})};if(m)return k($-1);let P=0,C=null;const L=()=>{k(P),C=setTimeout(()=>{P=P>=$-1?0:P+1,L()},P>=$-1?2600:1100)};k(0),new IntersectionObserver(([A])=>{clearTimeout(C),A.isIntersecting&&(P=0,setTimeout(L,y*500))},{threshold:.6}).observe(p)}),new IntersectionObserver(([p])=>{const y=l("#buybar");if(!y)return;const _=!p.isIntersecting&&p.boundingClientRect.top<0;y.classList.toggle("show",_),y.setAttribute("aria-hidden",String(!_))}).observe(l("#addBtn")),o();{const p=a();W("ViewContent",{content_ids:[String(p.vid||e.id)],content_type:"product",content_name:e.name,value:p.price,currency:"COP"})}}function ta(){if(!E.length)return'<section class="wrap narrow section center"><h1 class="h2">Tu bolsa est\xE1 vac\xEDa</h1><p class="lead">Agrega un producto para continuar.</p><a class="btn btn--primary" href="/">Ir a la tienda</a></section>';const e=ae(),a=[["tarjeta","Tarjeta de cr\xE9dito",`Hasta ${s.installments} cuotas \xB7 ${s.installmentsNote}`],["sistecredito","Sistecr\xE9dito","Cr\xE9dito solo con tu c\xE9dula, sin tarjeta"]];return`
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
            <label class="radio"><input type="radio" name="entrega" value="envio" checked><span><b>Env\xEDo a domicilio</b><br><span class="small muted">${e.ship===null?"Se calcula al pagar":e.ship?u(e.ship):"Gratis"} \xB7 Mismo d\xEDa en ${s.sameDayCity}, ${s.otherCitiesDays} al resto del pa\xEDs</span></span></label>
          </div>
          <div class="fields" id="shipFields">
            <label>Departamento<input name="departamento" required autocomplete="address-level1" value=""></label>
            <label>Ciudad<input name="ciudad" required autocomplete="address-level2" value=""></label>
            <label class="span2">Direcci\xF3n<input name="direccion" required autocomplete="street-address" placeholder="Calle 00 # 00-00, apto"></label>
          </div>
        </fieldset>
        <fieldset><legend>3. Pago</legend>
          <div class="radios">${a.map(([t,o,n],c)=>`<label class="radio"><input type="radio" name="pago" value="${o}" ${c?"":"checked"}><span><b>${o}</b><br><span class="small muted">${n}</span></span></label>`).join("")}</div>
        </fieldset>
        <label class="check"><input type="checkbox" name="acepto" required> Acepto los t\xE9rminos y condiciones y autorizo el tratamiento de mis datos personales (Ley 1581 de 2012).</label>
        <p class="form-error" id="formError" hidden>Revisa los campos marcados.</p>
        <button class="btn btn--primary btn--lg btn--block" type="submit">Confirmar pedido \xB7 ${u(e.total)}</button>
        <p class="small muted center">Al confirmar, un asesor te enviar\xE1 el enlace de pago seguro por WhatsApp.</p>
      </form>
      <aside class="checkout__summary">
        <h2 class="h3">Resumen</h2>
        <ul class="lines lines--compact">${E.map(t=>`<li class="line"><span class="line__img"><img crossorigin="anonymous" src="${I(b[t.id],t.color)}" alt=""><i>${t.qty}</i></span>
          <div class="line__info"><b class="small">${i(b[t.id].name)}</b><p class="small muted">${i(le(t))}</p>${t.protection?`<p class="small">+ ${i(s.protection.name)}</p>`:""}${t.tradeIn?`<p class="small ok">Retoma \u2212${u(t.tradeIn.value)}</p>`:""}</div>
          <b class="small">${u(ee(t))}</b></li>`).join("")}</ul>
        <dl class="sum">
          <div><dt>Subtotal</dt><dd>${u(e.sub)}</dd></div>
          ${e.trade?`<div class="ok"><dt>Retoma (estimado)</dt><dd>\u2212${u(e.trade)}</dd></div>`:""}
          <div><dt>Env\xEDo</dt><dd>${e.ship===null?"Se calcula al pagar":e.ship?u(e.ship):"Gratis"}</dd></div>
          <div class="sum__total"><dt>Total</dt><dd>${u(e.total)}</dd></div>
        </dl>
        <p class="small muted">o ${N(e.total)}/mes en ${s.installments} cuotas</p>
        <ul class="trust trust--col"><li>${w("shield",16)} Productos originales y sellados</li><li>${w("back",16)} Derecho de retracto de 5 d\xEDas h\xE1biles</li></ul>
      </aside>
    </section>`}function oa(){const e=l("#checkoutForm");e&&(e.addEventListener("change",a=>{if(a.target.name==="entrega"){const t=a.target.value==="envio";l("#shipFields").hidden=!t,x("#shipFields input").forEach(o=>{o.required=t})}}),e.addEventListener("submit",a=>{a.preventDefault(),x(".invalid",e).forEach(d=>d.classList.remove("invalid"));const t=x("input",e).filter(d=>!d.checkValidity());if(t.forEach(d=>(d.closest("label")||d).classList.add("invalid")),l("#formError").hidden=!t.length,t.length){t[0].focus();return}const o=Object.fromEntries(new FormData(e)),n="NV-"+Date.now().toString(36).toUpperCase().slice(-6),c=xe(`

Pedido ${n}
Cliente: ${o.nombre} \xB7 CC ${o.cedula}
Correo: ${o.email} \xB7 Cel: ${o.celular}
`+(o.entrega==="envio"?`Entrega: ${o.direccion}, ${o.ciudad} (${o.departamento})`:"Entrega: Retiro en tienda")+`
Pago: ${o.pago}`);O.set("nova-last-order",{order:n,name:o.nombre.split(" ")[0],wa:T(c)}),window.open(T(c),"_blank","noopener"),E=[],Y(),X("/gracias/")}))}function sa(){const e=O.get("nova-last-order",null);return`<section class="wrap narrow section center thanks">
      <div class="thanks__icon">\u2713</div>
      <h1 class="h2">\xA1Gracias${e?", "+i(e.name):""}! Recibimos tu pedido.</h1>
      ${e?`<p class="lead">N\xFAmero de pedido <b>${i(e.order)}</b>. Un asesor te escribir\xE1 por WhatsApp con el enlace de pago seguro y la confirmaci\xF3n de entrega.</p>
      <a class="btn btn--wa" href="${e.wa}" target="_blank" rel="noopener">Abrir WhatsApp de nuevo</a>`:""}
      <p><a class="btn btn--link" href="/">Seguir comprando \u203A</a></p></section>`}const D=s.siteUrl||location.origin,na=(e,a=158)=>e.length>a?e.slice(0,a-1).replace(/\s+\S*$/,"")+"\u2026":e,Q=e=>z(e,1200)||"",De=e=>({"@type":"BreadcrumbList",itemListElement:e.map(([a,t],o)=>({"@type":"ListItem",position:o+1,name:a,item:D+t}))}),Be={"@id":D+"/#tienda"};function ia(e){const a=R.find(o=>o.id===e[0]);if(!e.length){const o=b[s.hero.id]||S[0];return{title:`Tienda de iPhone en ${s.sameDayCity} y Colombia \xB7 ${s.name}`,desc:`Compra iPhone, MacBook, iPad, AirPods y Apple Watch originales y sellados. Entrega el mismo d\xEDa en ${s.sameDayCity}, env\xEDos a toda Colombia y hasta ${s.installments} cuotas.`,image:o&&Q(I(o)),ld:[{"@type":"WebPage","@id":D+"/#portada",url:D+"/",name:`Tienda de iPhone en ${s.sameDayCity} y Colombia`,isPartOf:{"@id":D+"/#sitio"},about:Be,inLanguage:"es-CO"},{"@type":"FAQPage",mainEntity:ue.map(([n,c])=>({"@type":"Question",name:n,acceptedAnswer:{"@type":"Answer",text:c}}))}]}}if(a&&e.length===1){const o=he(S.filter(c=>c.cat===a.id&&!M(c)),qe(a.id)),n=a.seo||{};return{title:`${n.title||a.name+" en Colombia"} \xB7 ${s.name}`,desc:n.desc||`${a.name} originales en Colombia. Entrega el mismo d\xEDa en ${s.sameDayCity}.`,image:o[0]&&Q(I(o[0])),ld:[{"@type":"CollectionPage",url:D+f.cat(a.id),name:n.title||a.name,isPartOf:{"@id":D+"/#sitio"},inLanguage:"es-CO",mainEntity:{"@type":"ItemList",itemListElement:o.map((c,d)=>({"@type":"ListItem",position:d+1,url:D+f.p(c),name:c.name}))}},De([["Inicio","/"],[a.name,f.cat(a.id)]])]}}const t=e.length===2&&b[e[1]];if(t){const o=t.variants.map(c=>c.price),n={"@type":"AggregateOffer",priceCurrency:"COP",lowPrice:Math.min(...o),highPrice:Math.max(...o),offerCount:t.variants.length,url:D+f.p(t),seller:Be,itemCondition:M(t)?"https://schema.org/UsedCondition":"https://schema.org/NewCondition"};return j&&(n.availability=t.variants.some(c=>c.available)?"https://schema.org/InStock":"https://schema.org/OutOfStock"),{title:`${t.name}${M(t)?" usado":""} precio en Colombia \xB7 ${s.name}`,desc:na(`Compra ${t.name} original y sellado desde ${u(t.fromPrice)} o ${N(t.fromPrice)}/mes en ${s.installments} cuotas. Entrega el mismo d\xEDa en ${s.sameDayCity} y env\xEDos a toda Colombia.`),image:Q(I(t)),type:"product",ld:[{"@type":"Product",name:t.name,url:D+f.p(t),description:t.description||t.tagline||t.name,brand:{"@type":"Brand",name:"Apple"},category:V(t.cat),image:t.colors.flatMap(c=>c.images.slice(0,2)).slice(0,8).map(Q),...t.colors.length>1&&U(t)?{color:t.colors.map(c=>c.name).join(", ")}:{},offers:n},De([["Inicio","/"],[V(t.cat),f.cat(t.cat)],[t.name,f.p(t)]])]}}return null}function ra(e,a){const t=e||{title:`P\xE1gina no encontrada \xB7 ${s.name}`,desc:"",noindex:!0},o=(c,d)=>{const g=document.head.querySelector(c);g&&g.setAttribute(g.tagName==="LINK"?"href":"content",d)};document.title=t.title,o('meta[name="description"]',t.desc),o('meta[name="robots"]',t.noindex?"noindex,follow":"index,follow,max-image-preview:large"),o('link[rel="canonical"]',D+a),o('meta[property="og:type"]',t.type||"website"),o('meta[property="og:url"]',D+a),o('meta[property="og:title"]',t.title),o('meta[property="og:description"]',t.desc),t.image&&(o('meta[property="og:image"]',t.image),o('meta[name="twitter:image"]',t.image)),o('meta[name="twitter:title"]',t.title),o('meta[name="twitter:description"]',t.desc);const n=l("#ldPage");n&&(n.textContent=t.ld?JSON.stringify({"@context":"https://schema.org","@graph":t.ld}):"{}")}window.STORE_PAGES=()=>["/",...R.filter(e=>S.some(a=>a.cat===e.id)).map(e=>f.cat(e.id)),...S.map(e=>f.p(e))].map(e=>{const a=b[e.split("/").filter(Boolean)[1]];return{path:e,images:a?a.colors.flatMap(t=>t.images.slice(0,2)).slice(0,8).map(Q):[],title:a?a.name:""}});const ve=()=>'<section class="wrap narrow section center"><h1 class="h2">No encontramos esta p\xE1gina</h1><a class="btn btn--primary" href="/">Volver al inicio</a></section>';function ca(){if(!location.hash.startsWith("#/"))return;const[e,a]=location.hash.slice(1).split("?"),[t,o]=e.split("/").filter(Boolean),n=t==="c"&&o?f.cat(o):t==="p"&&b[o]?f.p(b[o]):t?`/${t}/`:"/";history.replaceState(null,"",n+(a?"?"+a:""))}function H(){ca();const e=new URLSearchParams(location.search);let a=location.pathname.split("/").filter(Boolean);a.length===2&&b[a[1]]&&b[a[1]].cat!==a[0]&&(history.replaceState(null,"",f.p(b[a[1]],location.search.slice(1))),a=[b[a[1]].cat,a[1]]),h&&h.timer&&clearInterval(h.timer),h=null;const t=a.length===1&&R.some(r=>r.id===a[0]);let o,n=ia(a);a.length?t?o=Ye(a[0],e):a.length===2&&b[a[1]]?o=ea(a[1],e):a[0]==="checkout"?(o=ta(),n={title:`Finalizar compra \xB7 ${s.name}`,desc:"",noindex:!0}):a[0]==="gracias"?(o=sa(),n={title:`Gracias por tu compra \xB7 ${s.name}`,desc:"",noindex:!0}):(o=ve(),n=null):o=Je();const c=!H.done;H.done=!0,ne.innerHTML=o,ne.removeAttribute("data-prerendered"),ra(n,a.length?`/${a.join("/")}/`:"/");const d=t?a[0]:a.length===2&&b[a[1]]?b[a[1]].cat:"";x("#navLinks a").forEach(r=>r.classList.toggle("is-on",r.dataset.cat===d)),l("#waFloat").href=T(`Hola ${s.name}, quiero asesor\xEDa para comprar un producto Apple.`),window.Explorer&&window.Explorer.mount(ne),h&&aa(),a[0]==="checkout"&&oa(),la(),Oe();const g=location.pathname;H.last!==g&&(c||window.scrollTo({top:0}),H.last=g),c&&!window.__PRERENDER&&(document.documentElement.classList.add("no-anim"),x(".reveal").forEach(r=>{r.getBoundingClientRect().top<innerHeight&&r.classList.add("in")}),requestAnimationFrame(()=>requestAnimationFrame(()=>document.documentElement.classList.remove("no-anim")))),document.documentElement.dataset.ready=g,c||W("PageView")}function la(){x(".shelf").forEach(t=>t.addEventListener("click",o=>{const n=o.target.closest("[data-scroll]");if(!n)return;const c=l(".shelf__track",t);c.scrollBy({left:+n.dataset.scroll*c.clientWidth*.8,behavior:"smooth"})})),x(".card").forEach(t=>{t.addEventListener("mouseover",o=>{const n=o.target.closest("[data-swap]");n&&(l("[data-card-img]",t).src=n.dataset.swap)}),t.addEventListener("click",o=>{const n=o.target.closest("[data-color]");n&&(o.preventDefault(),X(t.getAttribute("href")+"?color="+n.dataset.color))})});const e=l("#sortSel");e&&e.addEventListener("change",()=>{X(location.pathname+"?orden="+e.value,!0)});const a=l("#tradeQuick");if(a){const t=()=>{const[,o]=s.tradeIn.devices[a.device.value],[,n]=s.tradeIn.conditions[a.cond.value];l("#tradeQuickVal").textContent=u(Math.round(o*n/1e4)*1e4)};a.addEventListener("change",t),t()}da(),se(),x("img").forEach(Ce),pa()}let fe=null;function se(){const e=l(".benefits");if(!e)return;const a=x(".benefit",e),t=a.length,o=matchMedia("(max-width: 900px)");if(matchMedia("(prefers-reduced-motion: reduce)").matches||window.__PRERENDER){e.style.setProperty("--bp","1"),a.forEach(d=>d.classList.add("is-lit"));return}const n=()=>{if(fe=null,!document.body.contains(e))return;const d=innerHeight;let g;if(o.matches){const r=l(".benefits__line",e).getBoundingClientRect();g=(d*.72-r.top)/Math.max(1,r.height)}else{const r=e.getBoundingClientRect();g=(d*.92-r.top)/(d*.5)}g=Math.max(0,Math.min(1,g)),e.style.setProperty("--bp",g.toFixed(3)),a.forEach((r,v)=>r.classList.toggle("is-lit",g>.01&&g>=v/(t-1)-.02))},c=()=>{fe||(fe=requestAnimationFrame(n))};window.removeEventListener("scroll",se.handler),window.removeEventListener("resize",se.handler),se.handler=c,window.addEventListener("scroll",c,{passive:!0}),window.addEventListener("resize",c),n()}function da(){const e=matchMedia("(prefers-reduced-motion: reduce)").matches;x(".hero__media").forEach(a=>{const t=l(".hero__video",a);if(t&&!e&&!window.__PRERENDER&&(t.addEventListener("playing",()=>a.classList.add("is-playing"),{once:!0}),new IntersectionObserver(([c])=>{c.isIntersecting?t.play().catch(()=>{}):t.pause()},{threshold:.2}).observe(a)),e||!matchMedia("(hover: hover) and (pointer: fine)").matches)return;const o=a.closest(".hero");o.addEventListener("pointermove",n=>{const c=a.getBoundingClientRect(),d=(n.clientX-c.left)/c.width-.5,g=(n.clientY-c.top)/c.height-.5;a.style.setProperty("--rx",`${(-g*10).toFixed(2)}deg`),a.style.setProperty("--ry",`${(d*14).toFixed(2)}deg`)}),o.addEventListener("pointerleave",()=>{a.style.setProperty("--rx","0deg"),a.style.setProperty("--ry","0deg")})})}const $e="IntersectionObserver"in window?new IntersectionObserver(e=>e.forEach(a=>{a.isIntersecting&&(a.target.classList.add("in"),$e.unobserve(a.target))}),{rootMargin:"0px 0px -8% 0px"}):null,pa=()=>x(".reveal:not(.in)").forEach(e=>$e&&!window.__PRERENDER?$e.observe(e):e.classList.add("in")),Re=()=>{l("#search").hidden=!1,document.body.classList.add("locked"),l("#searchInput").value="",ye(""),setTimeout(()=>l("#searchInput").focus(),30)},Ne=()=>{l("#search").hidden=!0,document.body.classList.remove("locked")};function ye(e){const a=_e(e.trim()),t=a?S.filter(o=>a.split(/\s+/).every(n=>_e(`${o.name} ${V(o.cat)} ${o.tagline}`).includes(n))).slice(0,8):[];l("#searchResults").innerHTML=a?t.length?t.map(o=>`<a class="sres" href="${f.p(o)}"><img crossorigin="anonymous" src="${I(o)}" alt="${i(o.name)}"><span><b>${i(o.name)}</b><span class="small muted">Desde ${u(o.fromPrice)} \xB7 ${N(o.fromPrice)}/mes</span></span></a>`).join(""):`<p class="muted">Sin resultados para \u201C${i(e)}\u201D. <a href="${T("Hola, busco: "+e)}" target="_blank" rel="noopener">Preg\xFAntanos por WhatsApp</a>.</p>`:`<p class="eyebrow">B\xFAsquedas populares</p><div class="chips">${["iPhone 18 Pro","AirPods Pro 3","MacBook Air","iPad","Apple Watch","Cargador"].map(o=>`<button class="chip" data-q="${o}">${o}</button>`).join("")}</div>`}l("#openSearch").addEventListener("click",Re),l("#searchInput").addEventListener("input",e=>ye(e.target.value)),l("#search").addEventListener("click",e=>{(e.target.id==="search"||e.target.closest("[data-close]")||e.target.closest(".sres"))&&Ne();const a=e.target.closest("[data-q]");a&&(l("#searchInput").value=a.dataset.q,ye(a.dataset.q))}),document.addEventListener("keydown",e=>{e.key==="Escape"&&(Ne(),de(),Oe()),e.key==="/"&&!/input|textarea|select/i.test(document.activeElement.tagName)&&(e.preventDefault(),Re())});function ma(){l(".nav__name").textContent=s.name,l("#navLinks").innerHTML=R.map(r=>`<a href="${f.cat(r.id)}" data-cat="${r.id}">${r.name}</a>`).join("")+`<a href="${T("Hola, quiero asesor\xEDa")}" target="_blank" rel="noopener" class="nav__help">Asesor\xEDa</a>`;const e=l("#announce");e.innerHTML=s.announcements.map((r,v)=>`<p class="${v?"":"on"}">${i(r)}</p>`).join("");let a=0;setInterval(()=>{const r=x("p",e);r[a].classList.remove("on"),a=(a+1)%r.length,r[a].classList.add("on")},4200);const t=(r,v)=>`<details class="footer__col"><summary>${r}<svg class="footer__chev" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></summary><div class="footer__links">${v}</div></details>`,o=`https://${s.shopifyDomain}`,n={whatsapp:'<path d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3Zm0 23.7c-2 0-4-.5-5.7-1.6l-.4-.2-3.9 1 1-3.8-.3-.4A10.7 10.7 0 1 1 16 26.7Zm5.9-8c-.3-.2-1.9-1-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1a8.8 8.8 0 0 1-4.4-3.8c-.3-.6.3-.5 1-1.7.1-.2 0-.4 0-.6l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.3 1.4 3.5c.2.2 2.4 3.7 5.8 5.1 2.2.9 3 1 4.1.8.7-.1 1.9-.8 2.2-1.5.3-.8.3-1.4.2-1.5l-.6-.3Z"/>',instagram:'<path d="M16 5.6c3.4 0 3.8 0 5.1.1 3.4.2 5 1.8 5.2 5.2.1 1.3.1 1.7.1 5.1s0 3.8-.1 5.1c-.2 3.4-1.8 5-5.2 5.2-1.3.1-1.7.1-5.1.1s-3.8 0-5.1-.1c-3.4-.2-5-1.8-5.2-5.2-.1-1.3-.1-1.7-.1-5.1s0-3.8.1-5.1c.2-3.4 1.8-5 5.2-5.2 1.3-.1 1.7-.1 5.1-.1ZM16 3c-3.5 0-4 0-5.3.1C6 3.3 3.3 6 3.1 10.7 3 12 3 12.5 3 16s0 4 .1 5.3C3.3 26 6 28.7 10.7 28.9c1.3.1 1.8.1 5.3.1s4 0 5.3-.1c4.7-.2 7.4-2.9 7.6-7.6.1-1.3.1-1.8.1-5.3s0-4-.1-5.3C28.7 6 26 3.3 21.3 3.1 20 3 19.5 3 16 3Zm0 6.3a6.7 6.7 0 1 0 0 13.4 6.7 6.7 0 0 0 0-13.4Zm0 11a4.3 4.3 0 1 1 0-8.6 4.3 4.3 0 0 1 0 8.6Zm7-12.9a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z"/>',tiktok:'<path d="M22.5 3h-4.3v17.4a3.8 3.8 0 1 1-3.8-3.8c.4 0 .8.1 1.1.2v-4.4a8.1 8.1 0 1 0 7 8V11.6a10.3 10.3 0 0 0 6 1.9V9.2a6 6 0 0 1-6-6.2Z"/>'},c=(r,v,m)=>`<a class="footer__social" href="${v}" target="_blank" rel="noopener" aria-label="${m}"><svg viewBox="0 0 32 32" width="18" height="18" fill="currentColor" aria-hidden="true">${n[r]}</svg></a>`;l("#footer").innerHTML=`
      <div class="wrap">
        <div class="footer__top">
          <div class="footer__brand">
            <a class="footer__logo" href="/" aria-label="iC, inicio">${document.querySelector(".nav__word")?document.querySelector(".nav__word").outerHTML:i(s.name)}</a>
            <p class="footer__slogan">${i(s.slogan||"")}</p>
            <p>Productos Apple originales y sellados. Entrega el mismo d\xEDa en ${i(s.sameDayCity)} y env\xEDos a toda Colombia.</p>
            <div class="footer__socials">${c("whatsapp",T("Hola "+s.name),"WhatsApp")}${c("instagram",s.instagram,"Instagram")}${c("tiktok",s.tiktok,"TikTok")}</div>
          </div>
          <nav class="footer__cols" aria-label="Pie de p\xE1gina">
            ${t("Comprar",R.map(r=>`<a href="${f.cat(r.id)}">${r.name}</a>`).join(""))}
            ${t("Ayuda",`<a href="${o}/policies/shipping-policy">Env\xEDos y entregas</a><a href="${o}/policies/refund-policy">Devoluciones y retracto</a><a href="${o}/pages/contact">Contacto</a>`)}
            ${t("Nosotros",`<a href="${s.partner?s.partner.url:o}" target="_blank" rel="noopener">Pedidos especiales desde USA</a><a href="${o}/pages/quienes-somos">Qui\xE9nes somos</a><a href="${o}/policies/terms-of-service">T\xE9rminos y condiciones</a><a href="${o}/policies/privacy-policy">Pol\xEDtica de privacidad</a>`)}
          </nav>
          <div class="footer__contact">
            <p class="footer__contact-title">\xBFNecesitas ayuda para elegir?</p>
            <a class="btn btn--wa btn--sm" href="${T("Hola "+s.name+", necesito asesor\xEDa")}" target="_blank" rel="noopener">Escr\xEDbenos por WhatsApp</a>
            <p class="footer__contact-meta"><a href="tel:${s.phone.replace(/\s/g,"")}">${i(s.phone)}</a><br><a href="mailto:${s.email}">${i(s.email)}</a>${s.address?"<br>"+i(s.address):""}${s.hours?"<br>"+i(s.hours):""}</p>
          </div>
        </div>
        <div class="footer__pay"><span>Medios de pago</span>${oe()}</div>
        <div class="footer__legal">
          <p>${s.legalName?i(s.legalName)+" \xB7 ":""}${s.nit?"NIT "+i(s.nit)+" \xB7 ":""}Precios en pesos colombianos. Im\xE1genes de referencia.</p>
          <p>Apple, iPhone, iPad, Mac, Apple Watch y AirPods son marcas registradas de Apple Inc. ${i(s.name)} es un comercio independiente.</p>
          <p><button class="link small" id="cookiePrefs" type="button">Preferencias de cookies</button> \xB7 <a href="https://www.sic.gov.co" target="_blank" rel="noopener">Superintendencia de Industria y Comercio</a> \xB7 \xA9 ${new Date().getFullYear()} ${i(s.name)}</p>
        </div>
      </div>`;const d=matchMedia("(max-width: 700px)"),g=()=>x("#footer .footer__col").forEach(r=>{r.open=!d.matches});g(),d.addEventListener("change",g),l("#cookiePrefs").addEventListener("click",()=>Le(!0))}const Oe=()=>{document.body.classList.remove("menu-open"),l("#burger").setAttribute("aria-expanded","false")};l("#burger").addEventListener("click",()=>{const e=document.body.classList.toggle("menu-open");l("#burger").setAttribute("aria-expanded",String(e))}),window.addEventListener("scroll",()=>l("#nav").classList.toggle("scrolled",window.scrollY>8),{passive:!0}),ma(),Le(),re()==="all"&&W("PageView"),Ae(),Me(),document.addEventListener("click",e=>{const a=e.target.closest("a[href]");if(!a||e.defaultPrevented||e.button||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||a.target==="_blank"||a.hasAttribute("download"))return;const t=new URL(a.href,location.href);t.origin!==location.origin||/\.[a-z0-9]+$/i.test(t.pathname)||t.pathname===location.pathname&&t.search===location.search&&t.hash||(e.preventDefault(),X(t.pathname+t.search))}),window.addEventListener("popstate",H),window.addEventListener("hashchange",()=>location.hash.startsWith("#/")&&H()),H()})();
