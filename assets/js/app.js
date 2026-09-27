(async()=>{"use strict";const o=window.STORE,{catalog:I,live:T}=await window.loadCatalog();document.documentElement.classList.toggle("is-demo",!T);const B=window.CATEGORIES,b=Object.fromEntries(I.map(e=>[e.id,e])),c=(e,a=document)=>a.querySelector(e),A=(e,a=document)=>[...a.querySelectorAll(e)],se=c("#app"),h=e=>"$"+Math.round(e).toLocaleString("es-CO"),R=e=>h(Math.ceil(e/o.installments)),i=e=>String(e??"").replace(/[&<>"']/g,a=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[a]),ve=e=>String(e).normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase(),V=e=>(B.find(a=>a.id===e)||{}).name||"",M=(e,a)=>(a&&e.colors.find(t=>t.id===a)||e.colors[0]).images[0],W=(e,a)=>e&&/[?&]width=\d+/.test(e)?e.replace(/width=\d+/,`width=${a}`):e,f={cat:e=>`/${e}/`,p:(e,a)=>`/${e.cat}/${e.id}/${a?"?"+a:""}`},K=(e,a)=>{history[a?"replaceState":"pushState"](null,"",e),N()},q=e=>`https://wa.me/${o.whatsapp}?text=${encodeURIComponent(e)}`,O={get(e,a){try{return JSON.parse(localStorage.getItem(e))??a}catch{return a}},set(e,a){try{localStorage.setItem(e,JSON.stringify(a))}catch{}}},oe=(e,a)=>o.protection.cats.includes(e.cat)?Math.max(o.protection.min,Math.round(a*o.protection.rate/1e3)*1e3):0,$e=e=>e.configs.length>1||e.configs[0]!=="Est\xE1ndar",z=e=>e.colors.some(a=>a.hex),Re=()=>{const e=Object.fromEntries(new Intl.DateTimeFormat("en-US",{timeZone:"America/Bogota",hour:"numeric",minute:"numeric",weekday:"short",hour12:!1}).formatToParts(new Date).map(a=>[a.type,a.value]));return{h:+e.hour%24,m:+e.minute,day:e.weekday}};let ye;const Oe=e=>{const a=c("#toast");a.innerHTML=e,a.classList.add("show"),clearTimeout(ye),ye=setTimeout(()=>a.classList.remove("show"),2600)},Z=o.marketing||{},ne=()=>O.get("cs-consent",null);let ie=!1;function _e(){if(!(ie||window.__PRERENDER||ne()!=="all")&&(ie=!0,Z.metaPixelId&&((function(e,a,t,s,n,r,d){e.fbq||(n=e.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)},e._fbq||(e._fbq=n),n.push=n,n.loaded=!0,n.version="2.0",n.queue=[],r=a.createElement(t),r.async=!0,r.src=s,d=a.getElementsByTagName(t)[0],d.parentNode.insertBefore(r,d))})(window,document,"script","https://connect.facebook.net/en_US/fbevents.js"),window.fbq("init",Z.metaPixelId)),Z.ga4Id)){const e=document.createElement("script");e.async=!0,e.src=`https://www.googletagmanager.com/gtag/js?id=${Z.ga4Id}`,document.head.appendChild(e),window.dataLayer=window.dataLayer||[],window.gtag=function(){window.dataLayer.push(arguments)},window.gtag("js",new Date),window.gtag("config",Z.ga4Id,{send_page_view:!1})}}const we={PageView:"page_view",ViewContent:"view_item",AddToCart:"add_to_cart",InitiateCheckout:"begin_checkout",Contact:"generate_lead"},H=(e,a={})=>{ie&&(window.fbq&&window.fbq("track",e,a),window.gtag&&we[e]&&window.gtag("event",we[e],{value:a.value,currency:a.currency,page_path:location.pathname}))};function Ce(e){if(window.__PRERENDER||!e&&ne())return;let a=c("#cookies");a||(a=document.createElement("div"),a.id="cookies",a.className="cookies",document.body.appendChild(a)),a.innerHTML=`<p><b>Usamos cookies</b> para que la tienda funcione, recordar tu bolsa y mostrarte ofertas relevantes en redes sociales. Puedes aceptar todas o solo las necesarias. <a href="https://${o.shopifyDomain}/policies/privacy-policy" target="_blank" rel="noopener">Pol\xEDtica de privacidad</a> (Ley 1581 de 2012).</p>
      <div class="cookies__btns"><button class="btn btn--ghost btn--sm" data-consent="necessary">Solo necesarias</button><button class="btn btn--primary btn--sm" data-consent="all">Aceptar todas</button></div>`,a.hidden=!1,a.onclick=t=>{const s=t.target.closest("[data-consent]");s&&(O.set("cs-consent",s.dataset.consent),a.hidden=!0,s.dataset.consent==="all"&&(_e(),H("PageView")))}}_e(),document.addEventListener("click",e=>{e.target.closest('a[href*="wa.me"]')&&H("Contact")});let k=O.get("nova-cart",[]).map(e=>{const a=b[e.id],t=a&&a.variants.find(s=>s.color===e.color&&s.config===e.config);return t?{...e,price:t.price,vid:t.vid}:null}).filter(Boolean);const J=()=>{O.set("nova-cart",k),Ee(),Pe()},X=e=>(e.price+(e.protection||0))*e.qty,Y=()=>{const e=k.reduce((s,n)=>s+X(n),0),a=k.reduce((s,n)=>s+(n.tradeIn?n.tradeIn.value:0),0);if(T)return{sub:e,trade:a,ship:null,total:e};const t=o.freeShippingFrom?e===0||e>=o.freeShippingFrom?0:o.shippingCost:null;return{sub:e,trade:a,ship:t,total:Math.max(0,e-a+t)}};function ee({id:e,color:a,config:t,qty:s=1,protection:n=0,tradeIn:r=null}){const d=b[e],l=d.variants.find(u=>u.color===a&&u.config===t)||d.variants.find(u=>u.available)||d.variants[0];if(!l.available){Oe("Este producto est\xE1 agotado. Escr\xEDbenos por WhatsApp y te avisamos.");return}const p=[e,l.color,l.config,n?"p":"",r?r.device+r.cond:""].join("|"),P=k.find(u=>u.key===p);P?P.qty+=s:k.push({key:p,id:e,color:l.color,config:l.config,qty:s,price:l.price,protection:n,tradeIn:r,sku:l.sku,vid:l.vid}),J(),H("AddToCart",{content_ids:[String(l.vid||e)],content_type:"product",content_name:d.name,value:l.price*s,currency:"COP"}),Le()}const re=e=>{const t=b[e.id].colors.find(s=>s.id===e.color);return[e.config!=="Est\xE1ndar"?e.config:"",t?t.name:""].filter(Boolean).join(" \xB7 ")},ke=(e="")=>{const a=Y(),t=k.map(s=>`\u2022 ${s.qty} \xD7 ${b[s.id].name} (${re(s)}) \u2014 ${h(X(s))}`+(s.protection?`
   + ${o.protection.name}`:"")+(s.tradeIn?`
   Retoma: ${s.tradeIn.device} (${s.tradeIn.cond}) \u2212${h(s.tradeIn.value)}`:""));return`Hola ${o.name}, quiero hacer este pedido:

${t.join(`
`)}

Subtotal: ${h(a.sub)}`+(a.trade?`
Descuento retoma (estimado): \u2212${h(a.trade)}`:"")+`
Env\xEDo: ${a.ship===null?"Se calcula al pagar":a.ship?h(a.ship):"Gratis"}
Total: ${h(a.total)}${e}`},Ne=()=>k.filter(e=>e.tradeIn).map(e=>`Retoma solicitada para ${b[e.id].name}: ${e.tradeIn.device} (${e.tradeIn.cond}), valor estimado ${h(e.tradeIn.value)}`).join(" | "),He=()=>window.shopifyCheckoutUrl(k,Ne());function Ee(){const e=k.reduce((t,s)=>t+s.qty,0),a=c("#cartCount");a.textContent=e,a.hidden=!e}function Pe(){const e=c("#cart"),a=Y(),t=Math.max(0,o.freeShippingFrom-a.sub),s=Math.min(100,a.sub/o.freeShippingFrom*100),n=new Set(k.map(d=>d.id)),r=["airpods-pro-3","cargador-magsafe","airtag","adaptador-40w"].filter(d=>b[d]&&b[d].available!==!1&&!n.has(d)).slice(0,2);e.innerHTML=`
      <div class="drawer__head"><h2>Tu bolsa</h2><button class="icon-btn" data-close-cart aria-label="Cerrar">\u2715</button></div>
      ${k.length?`
      ${T||!o.freeShippingFrom?"":`<div class="ship-meter">
        <p>${t?`Te faltan <b>${h(t)}</b> para tener <b>env\xEDo gratis</b>`:"\xA1Tu pedido tiene <b>env\xEDo gratis</b>!"}</p>
        <div class="ship-meter__bar"><span style="width:${s}%"></span></div>
      </div>`}
      <ul class="lines">${k.map((d,l)=>{const p=b[d.id];return`<li class="line">
          <a href="${f.p(p,"color="+d.color)}" class="line__img"><img src="${M(p,d.color)}" alt="${i(p.name+" "+((p.colors.find(P=>P.id===d.color)||{}).name||""))}"></a>
          <div class="line__info">
            <a href="${f.p(p,"color="+d.color)}" class="line__name">${i(p.name)}</a>
            <p class="muted small">${i(re(d))}</p>
            ${d.protection?`<p class="small with-ico">${_("shield",16)} ${i(o.protection.name)} \xB7 ${h(d.protection)}</p>`:""}
            ${d.tradeIn?`<p class="small ok with-ico">${_("swap",16)} Retoma ${i(d.tradeIn.device)} \xB7 \u2212${h(d.tradeIn.value)}</p>`:""}
            <div class="line__row">
              <div class="qty" role="group" aria-label="Cantidad">
                <button data-qty="${l}" data-d="-1" aria-label="Menos">\u2212</button><span>${d.qty}</span><button data-qty="${l}" data-d="1" aria-label="M\xE1s">+</button>
              </div>
              <b>${h(X(d))}</b>
            </div>
            <button class="link small" data-remove="${l}">Eliminar</button>
          </div></li>`}).join("")}</ul>
      ${r.length?`<div class="drawer__suggest"><p class="eyebrow">Complementa tu compra</p>${r.map(d=>{const l=b[d];return`<div class="mini"><img src="${M(l)}" alt="${i(l.name)}" loading="lazy"><div><p class="small"><b>${i(l.name)}</b></p><p class="small muted">${h(l.fromPrice)}</p></div>
          <button class="btn btn--ghost btn--xs" data-quick="${d}">Agregar</button></div>`}).join("")}</div>`:""}
      <div class="drawer__foot">
        <dl class="sum">
          <div><dt>Subtotal</dt><dd>${h(a.sub)}</dd></div>
          ${a.trade?`<div class="ok"><dt>Retoma (estimado)</dt><dd>\u2212${h(a.trade)}</dd></div>`:""}
          <div><dt>Env\xEDo</dt><dd>${a.ship===null?"Se calcula al pagar":a.ship?h(a.ship):"Gratis"}</dd></div>
          <div class="sum__total"><dt>Total</dt><dd>${h(a.total)}</dd></div>
        </dl>
        ${T&&a.trade?'<p class="small muted center">El descuento por retoma se aplica cuando revisemos tu equipo.</p>':""}
        <p class="small muted center">o ${R(a.total)}/mes en ${o.installments} cuotas</p>
        ${T?`<a href="${i(He())}" class="btn btn--primary btn--block btn--ico">${_("lock",18)} Pagar de forma segura</a>${Ae()}`:'<a href="/checkout/" class="btn btn--primary btn--block" data-close-cart>Finalizar compra</a>'}
        <a href="${q(ke())}" target="_blank" rel="noopener" class="btn btn--wa btn--block">Pedir por WhatsApp</a>
      </div>`:`
      <div class="empty"><p>Tu bolsa est\xE1 vac\xEDa.</p><a class="btn btn--primary" href="/iphone/" data-close-cart>Ver iPhone</a></div>`}`}const Le=()=>{c("#cart").classList.add("open"),c("#cart").setAttribute("aria-hidden","false"),c("#cartBackdrop").hidden=!1,document.body.classList.add("locked")},ce=()=>{c("#cart").classList.remove("open"),c("#cart").setAttribute("aria-hidden","true"),c("#cartBackdrop").hidden=!0,document.body.classList.remove("locked")};c("#cart").addEventListener("click",e=>{const a=e.target.closest("[data-qty]"),t=e.target.closest("[data-remove]"),s=e.target.closest("[data-quick]");if(a){const n=k[+a.dataset.qty];n.qty=Math.max(1,Math.min(5,n.qty+ +a.dataset.d)),J()}if(t&&(k.splice(+t.dataset.remove,1),J()),s){const n=b[s.dataset.quick];ee({id:n.id,color:n.variants[0].color,config:n.variants[0].config})}e.target.closest("[data-close-cart]")&&ce()}),c("#openCart").addEventListener("click",Le),c("#cart").addEventListener("click",e=>{e.target.closest('a[href*="/cart/"]')&&H("InitiateCheckout",{value:Y().total,currency:"COP",num_items:k.reduce((a,t)=>a+t.qty,0)})}),c("#cartBackdrop").addEventListener("click",ce);const xe=e=>`
    <a class="card reveal" href="${f.p(e)}">
      ${e.badge||T&&!e.available?`<div class="tags">${e.badge?`<span class="tag">${i(e.badge)}</span>`:""}${T&&!e.available?'<span class="tag tag--out">Agotado</span>':""}</div>`:""}
      <div class="card__media"><img src="${W(M(e),600)}" alt="${i(G(e))}" loading="lazy" decoding="async" data-card-img></div>
      ${z(e)?`<div class="dots">${e.colors.slice(0,7).map(a=>`<span class="dot" style="--c:${a.hex}" title="${i(a.name)}" data-swap="${W(a.images[0],600)}" data-color="${a.id}"></span>`).join("")}</div>`:'<div class="dots"></div>'}
      <h3 class="card__name">${i(e.name)}</h3>
      <p class="card__tag">${i(e.tagline)}</p>
      <p class="card__price">Desde ${h(e.fromPrice)}</p>
      <p class="card__cuota">o ${R(e.fromPrice)}/mes en ${o.installments} cuotas</p>
      <span class="btn btn--primary btn--sm">Comprar</span>
    </a>`,le=(e,a,t="")=>{const s=a.map(n=>b[n]).filter(Boolean);return s.length?`<section class="section shelf">
      <div class="section__head wrap"><div><h2 class="h2">${e}</h2>${t?`<p class="lead">${t}</p>`:""}</div>
        <div class="shelf__arrows"><button class="round" data-scroll="-1" aria-label="Anterior">\u2039</button><button class="round" data-scroll="1" aria-label="Siguiente">\u203A</button></div></div>
      <div class="shelf__track">${s.map(xe).join("")}</div></section>`:""},Ae=()=>'<p class="secure-note"><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5Zm-3 8V7a3 3 0 0 1 6 0v3H9Z"/></svg>Pago 100% seguro procesado por Shopify \xB7 datos cifrados</p>',Fe=()=>`<div class="trustband">${[["lock","Pago seguro","Pagas en el checkout de Shopify con cifrado SSL. No guardamos datos de tu tarjeta."],["shield","Originales y sellados","Productos Apple nuevos, en su caja sellada y con garant\xEDa directa de Apple."],["back","Derecho de retracto","5 d\xEDas h\xE1biles para compras en l\xEDnea (Ley 1480 de 2011)."],["chat","Te acompa\xF1amos","Asesor\xEDa por WhatsApp antes y despu\xE9s de tu compra."]].map(([e,a,t])=>`<div class="trustband__item reveal"><span class="trustband__icon">${_(e)}</span><div><b>${a}</b><span>${t}</span></div></div>`).join("")}</div>`,ae=()=>`<div class="paywall">${o.paymentMethods.map(e=>`<span class="pill">${i(e)}</span>`).join("")}</div>`,Me=e=>`<div class="faq">${e.map(([a,t])=>`<details><summary>${i(a)}</summary><p>${t}</p></details>`).join("")}</div>`,de=[["\xBFLos productos son originales y nuevos?","S\xED. Todos los productos son Apple originales, nuevos y sellados de f\xE1brica."],["\xBFQu\xE9 garant\xEDa tienen?",o.warranty||"Antes de tu compra te explicamos por WhatsApp las condiciones de garant\xEDa de cada equipo."],["\xBFCon qu\xE9 transportadoras env\xEDan?",`En ${o.sameDayCity} entregamos el mismo d\xEDa. Al resto de Colombia enviamos con ${(o.carriers||[]).join(", ").replace(/, ([^,]*)$/," y $1")}, con n\xFAmero de gu\xEDa para rastrear tu pedido.`],["\xBFCu\xE1nto se demora el env\xEDo?",`En ${o.sameDayCity} entregamos el mismo d\xEDa. Al resto del pa\xEDs, en ${o.otherCitiesDays}, con n\xFAmero de gu\xEDa. El costo del env\xEDo se calcula al pagar seg\xFAn tu ciudad.`],...o.financing?[["\xBFPuedo comprar sin tarjeta de cr\xE9dito?",`S\xED. Puedes pagar a cuotas con ${o.financing.name}: ${o.financing.text}. La aprobaci\xF3n es r\xE1pida y te acompa\xF1amos por WhatsApp.`]]:[],["\xBFPuedo pagar a cuotas?",`S\xED, con tu tarjeta de cr\xE9dito${o.financing?" o con "+o.financing.name:""}. El n\xFAmero de cuotas y los intereses dependen de tu banco o de tu cr\xE9dito; escr\xEDbenos por WhatsApp y te asesoramos para elegir la mejor opci\xF3n.`],["\xBFPuedo pagar por transferencia bancaria?","S\xED. Puedes pagar por transferencia desde cualquier banco (Bancolombia, Davivienda, BBVA, Banco de Bogot\xE1 y m\xE1s). Coord\xEDnalo con un asesor por WhatsApp y te enviamos los datos de pago."],["\xBFPuedo devolver mi compra?","Tienes derecho de retracto de 5 d\xEDas h\xE1biles desde la entrega para compras en l\xEDnea, siempre que el producto est\xE9 sin usar y en su empaque original (Ley 1480 de 2011)."]],G=(e,a=e.colors[0],t=0)=>`${e.name}${a&&a.hex?" color "+a.name:a&&a.name!=="Est\xE1ndar"?" "+a.name:""}${t?" \u2013 vista "+(t+1):""} original en Colombia`,Se=e=>{const a=B.find(s=>s.id===e),t=a&&b[a.hero];return t&&t.badge?t:I.find(s=>s.cat===e&&s.badge)||null},pe=(e,a)=>[...e].sort((t,s)=>(s===a)-(t===a)||!!s.badge-!!t.badge),Ve={bolt:'<path d="M13 2 4.5 13.5H11L10 22l8.5-11.5H12L13 2Z"/>',truck:'<path d="M2.5 6.5h11v9h-11zM13.5 9.5h4l3 3.2v2.8h-7"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="16.5" cy="17.5" r="1.8"/>',card:'<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 9.5h19M6 15h4"/>',shield:'<path d="M12 2.8 4.5 5.8v5.7c0 4.6 3.1 7.9 7.5 9.7 4.4-1.8 7.5-5.1 7.5-9.7V5.8L12 2.8Z"/><path d="m8.7 12 2.3 2.3 4.4-4.6"/>',box:'<path d="M3.5 7.5 12 3l8.5 4.5v9L12 21l-8.5-4.5v-9Z"/><path d="m3.5 7.5 8.5 4.5 8.5-4.5M12 12v9"/>',moto:'<circle cx="5.5" cy="16.5" r="3"/><circle cx="18.5" cy="16.5" r="3"/><path d="M5.5 16.5h7l3.5-6.5h2.5M14 10l-1.8-3.5H9.5M18.5 16.5 16 10"/>',store:'<path d="M3 20.5V9.2l9-5 9 5v11.3"/><path d="M7.5 20.5v-7h9v7M7.5 17h9"/>',home:'<path d="M4 11 12 4.2l8 6.8v9.5H4V11Z"/><path d="M9.5 20.5v-5.5h5v5.5"/>',bank:'<path d="M3 9.5 12 4l9 5.5M4.5 10.5v7.5M9.5 10.5v7.5M14.5 10.5v7.5M19.5 10.5v7.5M3 20.5h18"/>',idcard:'<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><circle cx="8.5" cy="11" r="2.2"/><path d="M5.3 16.2c.6-1.6 1.8-2.4 3.2-2.4s2.6.8 3.2 2.4M14 10h4.5M14 13.5h3"/>',lock:'<rect x="4.5" y="10.5" width="15" height="10.5" rx="2.5"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/>',back:'<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>',check:'<path d="m5 12.5 4.5 4.5L19 7.5"/>',swap:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16m0 4v-4h-4"/>',chat:'<path d="M20.5 11.6a8.3 8.3 0 0 1-12 7.4L3.5 20.5l1.4-4.4a8.3 8.3 0 1 1 15.6-4.5Z"/><path d="M8.5 11.8h.01M12 11.8h.01M15.5 11.8h.01" stroke-width="2.4"/>'},_=(e,a=24)=>`<svg class="ico" viewBox="0 0 24 24" width="${a}" height="${a}" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${Ve[e]}</svg>`,We=(e,a,t,s,n)=>`
    <div class="ship" data-ship="${e}">
      <div class="ship__head"><span class="ship__badge">${a}</span>${t}</div>
      <div class="ship__track" style="--n:${n.length}">
        <div class="ship__line"><span class="ship__fill"></span><span class="ship__vehicle">${_(s,18)}</span></div>
        <ol class="ship__steps">${n.map(([r,d])=>`<li class="ship__step"><span class="ship__dot">${_(r,16)}</span><span class="ship__label">${d}</span></li>`).join("")}</ol>
      </div>
    </div>`,me='<span class="launch-pill">Nuevo lanzamiento</span>',Ie=(e,a)=>o.hero.video&&e.id===o.hero.id&&a.id===o.hero.color?`<video class="hero__video" src="${o.hero.video}" muted loop playsinline preload="auto" aria-hidden="true"></video>`:"",ue=()=>O.get("nova-recent",[]).filter(e=>b[e]);function ze(){const e=b[o.hero.id]||I.find(n=>n.cat==="iphone")||I[0];if(!e)return'<section class="wrap section center"><h1 class="h2">Muy pronto</h1><p class="lead">Estamos preparando nuestra tienda Apple.</p></section>';const a=e.colors.find(n=>n.id===o.hero.color)||e.colors[0],t=o.tiles.map(n=>b[n]).filter(Boolean),s=o.tradeIn;return`
    <section class="hero">
      <div class="hero__copy">
        ${e.badge?me:""}
        <h2 class="hero__title">${i(o.hero.title)}</h2>
        <p class="hero__sub">${i(o.hero.headline)}</p>
        <p class="hero__price">Desde ${h(e.fromPrice)} o <b>${R(e.fromPrice)}/mes</b> en ${o.installments} cuotas</p>
        <div class="cta-row"><a class="btn btn--primary btn--lg" href="${f.p(e,"color="+a.id)}">Comprar</a><a class="btn btn--link" href="/iphone/">Ver todos los iPhone \u203A</a></div>
      </div>
      <div class="hero__media"><img src="${a.images[0]}" alt="${i(G(e,a))}" fetchpriority="high">${Ie(e,a)}</div>
    </section>

    <section class="trustline wrap">
      <h1 class="trustline__title">Tienda de productos Apple en ${i(o.sameDayCity)} \xB7 Env\xEDos a toda Colombia</h1>
      <ul class="trustline__items">
        <li>${_("shield",18)} Originales y sellados</li>
        <li>${_("lock",18)} Pago protegido por Shopify</li>
        <li>${_("check",18)} Respaldo de Celada Shopper</li>
        <li>${_("chat",18)} Atenci\xF3n real por WhatsApp</li>
      </ul>
    </section>

    <section class="chapters wrap" aria-label="Categor\xEDas">
      ${B.map(n=>{const r=b[n.hero]||I.find(d=>d.cat===n.id);return r?`<a class="chapter" href="${f.cat(n.id)}"><span class="chapter__img"><img src="${M(r)}" alt="${i(r.name)}" loading="lazy"></span><span>${n.name}</span></a>`:""}).join("")}
    </section>

    <section class="benefits wrap" aria-label="Por qu\xE9 comprar con nosotros">
      ${[["bolt",`Entrega hoy en ${o.sameDayCity}`,"Rec\xEDbelo el mismo d\xEDa de tu compra"],["truck","Env\xEDos a toda Colombia",`En ${o.otherCitiesDays}, con n\xFAmero de gu\xEDa`],["card",`Hasta ${o.installments} cuotas`,o.financing?`Con tarjeta de cr\xE9dito o ${o.financing.name}`:"Con tu tarjeta de cr\xE9dito"],["shield","Originales y sellados","Productos Apple nuevos de f\xE1brica"],["chat","Asesor\xEDa experta","Te ayudamos a elegir por WhatsApp"]].map(([n,r,d])=>`<div class="benefit"><span class="benefit__icon">${_(n)}</span><div class="benefit__txt"><b>${r}</b><p>${i(d)}</p></div></div>`).join("")}
      <div class="benefits__line" aria-hidden="true"><span></span></div>
    </section>

    ${window.Explorer?window.Explorer.html({productId:"iphone-18-pro-max",price:b["iphone-18-pro-max"]?h(b["iphone-18-pro-max"].fromPrice):""}):""}

    <section class="tiles wrap">
      ${t.map((n,r)=>`
        <article class="tile ${r%3===0?"tile--wide":""} reveal">
          <div class="tile__copy">
            ${n.badge?`<p class="eyebrow eyebrow--accent">${i(n.badge)}</p>`:""}
            <h2 class="tile__title">${i(n.name)}</h2>
            <p class="tile__sub">${i(n.tagline)}</p>
            <p class="tile__price">Desde ${h(n.fromPrice)} \xB7 ${R(n.fromPrice)}/mes</p>
            <div class="cta-row"><a class="btn btn--primary btn--sm" href="${f.p(n)}">Comprar</a><a class="btn btn--link" href="${f.cat(n.cat)}">M\xE1s ${V(n.cat)} \u203A</a></div>
          </div>
          <a class="tile__media" href="${f.p(n)}"><img src="${M(n)}" alt="${i(G(n))}" loading="lazy"></a>
        </article>`).join("")}
    </section>

    ${le("Nuestros recomendados",o.bestSellers,"Los imprescindibles para estrenar este mes.")}

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

    ${ue().length?le("Vistos recientemente",ue()):""}

    <section class="section wrap center">
      <h2 class="h2">Paga como prefieras.</h2>
      <p class="lead">Paga con tarjeta de cr\xE9dito, transferencia desde cualquier banco${o.financing?` o con <b>${i(o.financing.name)}</b>, ${i(o.financing.text)}`:""}. \xBFQuieres pagar a cuotas? <a href="${q("Hola, quiero asesor\xEDa para pagar a cuotas")}" target="_blank" rel="noopener">Pide asesor\xEDa</a>.</p>
      ${ae()}
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
      ${Fe()}
    </section>

    <section class="section wrap narrow seo-text">
      <h2 class="h2">Tu tienda Apple en ${i(o.sameDayCity)}, con env\xEDos a toda Colombia</h2>
      <p>En ${i(o.name)} vendemos productos Apple originales, nuevos y sellados: <a href="/iphone/">iPhone</a>, <a href="/mac/">MacBook</a>, <a href="/ipad/">iPad</a>, <a href="/watch/">Apple Watch</a>, <a href="/airpods/">AirPods</a> y <a href="/accesorios/">accesorios</a>. Si buscas una tienda de iPhone en ${i(o.sameDayCity)}, te lo entregamos el mismo d\xEDa; al resto del pa\xEDs enviamos en ${i(o.otherCitiesDays)} con n\xFAmero de gu\xEDa.</p>
      <p>Paga con tarjeta de cr\xE9dito en el checkout seguro de Shopify, por transferencia desde cualquier banco${o.financing?" o con "+i(o.financing.name):""}; si quieres pagar a cuotas, te asesoramos. ${["iphone-18-pro-max","iphone-17","airpods-pro-3","macbook-air-13-m5"].filter(n=>b[n]).map(n=>`<a href="${f.p(b[n])}">${i(b[n].name)}</a>`).join(", ")} y m\xE1s modelos, con asesor\xEDa por WhatsApp para que elijas el ideal.</p>
    </section>

    <section class="section wrap narrow">
      <h2 class="h2 center">Preguntas frecuentes</h2>
      ${Me(de)}
    </section>`}function Ze(e,a){const t=B.find(l=>l.id===e);if(!t)return he();const s=Se(e);let n=pe(I.filter(l=>l.cat===e),s);const r=a.get("orden")||"rec";r==="asc"&&(n=[...n].sort((l,p)=>l.fromPrice-p.fromPrice)),r==="desc"&&(n=[...n].sort((l,p)=>p.fromPrice-l.fromPrice));const d=l=>[...new Set(l.configs.map(p=>(/(\d+\s?(GB|TB))/.exec(p)||[])[1]).filter(Boolean))];return`
    <section class="cat-hero wrap">
      <h1 class="display">${i(t.name)}</h1>
      <p class="lead">${i(t.blurb)}</p>
    </section>
    ${s?(()=>{const l=e==="iphone"&&s.colors.find(p=>p.id===o.hero.color)||s.colors[0];return`
    <section class="hero hero--cat" aria-label="Nuevo lanzamiento">
      <div class="hero__copy">
        ${me}
        <h2 class="hero__title">${i(s.name)}</h2>
        <p class="hero__sub">${i(s.tagline)}</p>
        <p class="hero__price">Desde ${h(s.fromPrice)} o <b>${R(s.fromPrice)}/mes</b> en ${o.installments} cuotas</p>
        <div class="cta-row"><a class="btn btn--primary btn--lg" href="${f.p(s,"color="+l.id)}">Comprar</a>${T&&!s.available?'<span class="muted small">Agotado por ahora \xB7 preg\xFAntanos por WhatsApp</span>':""}</div>
      </div>
      <a class="hero__media" href="${f.p(s,"color="+l.id)}"><img src="${l.images[0]}" alt="${i(G(s,l))}" fetchpriority="high">${Ie(s,l)}</a>
    </section>`})():""}
    <div class="wrap toolbar">
      <p class="muted">${n.length} modelos</p>
      <label class="select">Ordenar
        <select id="sortSel">
          <option value="rec" ${r==="rec"?"selected":""}>Recomendados</option>
          <option value="asc" ${r==="asc"?"selected":""}>Menor precio</option>
          <option value="desc" ${r==="desc"?"selected":""}>Mayor precio</option>
        </select></label>
    </div>
    <section class="grid wrap">${n.map(xe).join("")}</section>
    ${["iphone","ipad","mac","watch"].includes(e)?`
    <section class="section wrap">
      <h2 class="h2">Compara los modelos</h2>
      <div class="compare-wrap"><table class="compare">
        <thead><tr><th>Modelo</th><th>Precio desde</th><th>Cuota desde</th><th>${e==="watch"?"Tama\xF1os":"Almacenamiento"}</th><th>Acabados</th><th></th></tr></thead>
        <tbody>${pe(I.filter(l=>l.cat===e),s).map(l=>`<tr>
          <td><a href="${f.p(l)}"><img src="${M(l)}" alt="" loading="lazy">${i(l.name)}</a></td>
          <td>${h(l.fromPrice)}</td><td>${R(l.fromPrice)}/mes</td>
          <td>${e==="watch"?[...new Set(l.configs.map(p=>p.split(" \xB7 ")[0]))].join(", "):d(l).join(", ")}</td>
          <td><span class="dots dots--inline">${l.colors.map(p=>`<span class="dot" style="--c:${p.hex}" title="${i(p.name)}"></span>`).join("")}</span></td>
          <td><a class="btn btn--primary btn--xs" href="${f.p(l)}">Comprar</a></td></tr>`).join("")}</tbody>
      </table></div>
    </section>`:""}
    ${t.seo?`<section class="section wrap narrow seo-text"><h2 class="h2">${i(t.seo.h2)}</h2><p>${i(t.seo.text)}</p></section>`:""}
    <section class="section wrap center">${ae()}</section>`}let g=null;function Ge(e,a){const t=b[e];if(!t)return he();const s=[e,...ue().filter(u=>u!==e)].slice(0,10);O.set("nova-recent",s);const n=T&&t.variants.filter(u=>u.available).sort((u,S)=>t.colors.findIndex(m=>m.id===u.color)-t.colors.findIndex(m=>m.id===S.color)||u.price-S.price)[0],r=t.colors.find(u=>u.id===a.get("color"))?a.get("color"):n?n.color:t.colors[0].id,d=t.variants.filter(u=>u.color===r).sort((u,S)=>u.price-S.price),l=d.find(u=>u.config===a.get("config"))?a.get("config"):(d.find(u=>u.available)||d[0]).config;g={m:t,color:r,config:l,img:0,protect:!1,trade:null};const p=(o.crossSell[t.cat]||[]).filter(u=>u!==e),P=t.cat==="iphone";return`
    <nav class="crumbs wrap" aria-label="Ruta"><a href="/">Inicio</a><span>\u203A</span><a href="${f.cat(t.cat)}">${V(t.cat)}</a><span>\u203A</span><span>${i(t.name)}</span></nav>
    <section class="pdp wrap">
      <div class="pdp__gallery">
        <div class="gallery">
          <button class="round gallery__nav gallery__nav--prev" data-gal="-1" aria-label="Imagen anterior">\u2039</button>
          <img id="galMain" src="" alt="${i(t.name)}">
          <button class="round gallery__nav gallery__nav--next" data-gal="1" aria-label="Imagen siguiente">\u203A</button>
        </div>
        <div class="thumbs" id="thumbs"></div>
      </div>

      <div class="pdp__buy" id="buyBox">
        ${t.badge?me:""}
        <h1 class="pdp__title">${i(t.name)}</h1>
        <p class="pdp__tag">${i(t.tagline)}</p>
        <div class="price-box" id="priceBox"></div>

        <fieldset class="opt">
          <legend>${z(t)?"Color":"Modelo"}. <b id="colorName"></b></legend>
          <div class="${z(t)?"swatches":"chips"}" id="colorOpts">
            ${t.colors.map(u=>z(t)?`<button class="swatch" style="--c:${u.hex}" data-color="${u.id}" aria-label="${i(u.name)}" title="${i(u.name)}"></button>`:`<button class="chip" data-color="${u.id}">${i(u.name)}</button>`).join("")}
          </div>
        </fieldset>

        ${$e(t)?`<fieldset class="opt">
          <legend>${t.cat==="watch"?"Tama\xF1o y conectividad":t.cat==="mac"?"Configuraci\xF3n":"Capacidad"}.</legend>
          <div class="configs" id="configOpts"></div>
        </fieldset>`:""}

        ${P&&o.tradeIn.enabled?`<fieldset class="opt tradein" id="tradeBox">
          <legend>\xBFTienes un smartphone para entregar como parte de pago?</legend>
          <div class="seg"><button class="seg__btn" data-trade="yes">S\xED, cotizar retoma</button><button class="seg__btn is-on" data-trade="no">No, gracias</button></div>
          <div class="tradein__form" id="tradeForm" hidden>
            <label>Modelo<select id="tradeDevice">${o.tradeIn.devices.map(([u],S)=>`<option value="${S}">${i(u)}</option>`).join("")}</select></label>
            <label>Estado<select id="tradeCond">${o.tradeIn.conditions.map(([u],S)=>`<option value="${S}">${u}</option>`).join("")}</select></label>
            <p class="small muted">Valor estimado. Se confirma con la revisi\xF3n t\xE9cnica al entregar tu equipo.</p>
          </div>
        </fieldset>`:""}

        ${o.protection.cats.includes(t.cat)?`<label class="protect">
          <input type="checkbox" id="protect">
          <span><b>Agrega ${i(o.protection.name)}</b> por <b id="protectPrice"></b><br><span class="small muted">Cubre da\xF1os accidentales, pantalla rota y contacto con l\xEDquidos. Reemplazo r\xE1pido.</span></span>
        </label>`:""}

        <div class="buy-actions">
          <button class="btn btn--primary btn--lg btn--block" id="addBtn">Comprar</button>
          <a class="btn btn--wa btn--lg btn--block" id="waBuy" target="_blank" rel="noopener">Comprar con asesor por WhatsApp</a>
          ${Ae()}
        </div>

        <div id="combo"></div>
        <div class="paybox" id="pagos">
          <p class="paybox__title">Formas de pago</p>
          <ul class="paybox__list">
            <li><span class="paybox__ico">${_("card",20)}</span><div><b>Tarjeta de cr\xE9dito</b><span>Pago seguro y cifrado en el checkout de Shopify</span></div></li>
            <li><span class="paybox__ico">${_("bank",20)}</span><div><b>Transferencia bancaria</b><span>Desde cualquier banco: Bancolombia, Davivienda, BBVA, Banco de Bogot\xE1 y m\xE1s</span></div></li>
            ${o.financing?`<li><span class="paybox__ico">${_("idcard",20)}</span><div><b>${i(o.financing.name)}</b><span>Cr\xE9dito solo con tu c\xE9dula, sin tarjeta de cr\xE9dito</span></div></li>`:""}
          </ul>
          <div class="paybox__cuotas">
            <div><b>\xBFQuieres pagarlo a cuotas?</b><span>Te asesoramos para elegir el plan de cuotas con tu tarjeta o ${o.financing?i(o.financing.name):"tu banco"}.</span></div>
            <a class="btn btn--wa btn--sm" id="payAdvice" target="_blank" rel="noopener">Pedir asesor\xEDa</a>
          </div>
        </div>
        <div class="ships">
          ${We("nacional",`${i(o.otherCitiesDays)}`,`<div><b>Env\xEDos a toda Colombia</b><br><span class="muted small">Con n\xFAmero de gu\xEDa para rastrear tu pedido. El costo se calcula al pagar.</span>${o.carriers&&o.carriers.length?`<div class="ship__carriers"><span>Env\xEDo realizado por</span>${o.carriers.map(u=>`<b>${i(u)}</b>`).join("")}</div>`:""}</div>`,"truck",[["store",`Bodega ${i(o.sameDayCity)}`],["truck","Transportadora"],["store","Bodega destino"],["home","En tus manos"]])}
        </div>
        <ul class="delivery">
          <li><span class="delivery__ico">${_("chat",22)}</span><div><b>\xBFDudas? Te asesoramos</b><br><span class="muted small">Escr\xEDbenos por WhatsApp y te respondemos en minutos.</span></div></li>
        </ul>
        <ul class="trust">
          <li>${_("shield",16)} Original y sellado</li><li>${_("check",16)} Garant\xEDa directa de Apple</li><li>${_("lock",16)} Pago seguro en Shopify</li><li>${_("back",16)} Retracto 5 d\xEDas h\xE1biles</li>
        </ul>
        ${ae()}
      </div>
    </section>

    ${/^iphone-18-pro/.test(t.id)&&window.Explorer?window.Explorer.html({productId:"iphone-18-pro-max",price:b["iphone-18-pro-max"]?h(b["iphone-18-pro-max"].fromPrice):""}):""}
    <section class="section wrap narrow about reveal"><h2 class="eyebrow">Acerca del ${i(t.name)}</h2>${t.description?`<p class="about__text">${i(t.description)}</p>`:""}
      <p class="about__seo">Compra tu ${i(t.name)} original y sellado en ${i(o.name)}: entrega el mismo d\xEDa en ${i(o.sameDayCity)}, env\xEDos a toda Colombia en ${i(o.otherCitiesDays)} y pago hasta en ${o.installments} cuotas con tu tarjeta de cr\xE9dito. Mira todos los <a href="${f.cat(t.cat)}">${i(V(t.cat))} disponibles</a>.</p></section>
    ${(()=>{const u=(window.PRODUCT_INFO||{})[t.id]||{features:[],inBox:[]};return`<section class="section wrap narrow pinfo">
      <h2 class="h2">Informaci\xF3n del producto</h2>
      ${u.features.length?`<details open><summary>Caracter\xEDsticas</summary><dl class="pinfo__features">${u.features.map(([S,m])=>`<div><dt>${i(S)}</dt><dd>${i(m)}</dd></div>`).join("")}</dl></details>`:""}
      ${u.inBox.length?`<details><summary>En la caja</summary><ul class="pinfo__box">${u.inBox.map(S=>`<li>${_("check",16)} ${i(S)}</li>`).join("")}</ul>${u.note?`<p class="muted small">${i(u.note)}</p>`:""}</details>`:""}
      <details${u.features.length?"":" open"}><summary>Garant\xEDa y env\xEDo</summary><div class="pinfo__text"><p><b>Garant\xEDa:</b> ${i(o.warranty||"")}</p><p><b>Env\xEDo:</b> mismo d\xEDa en ${i(o.sameDayCity)} y ${i(o.otherCitiesDays)} al resto de Colombia con ${i((o.carriers||[]).join(", "))}.</p><p><b>Retracto:</b> 5 d\xEDas h\xE1biles desde la entrega para compras en l\xEDnea, con el producto sin usar y en su empaque original (Ley 1480 de 2011).</p></div></details>
    </section>`})()}
    ${p.length?le("Arma tu combo perfecto",p,`Lo que m\xE1s compran junto con ${i(t.name)}.`):""}
    <section class="section wrap narrow"><h2 class="h2 center">Preguntas frecuentes</h2>${Me(de)}</section>

    <div class="buybar" id="buybar" aria-hidden="true">
      <div class="buybar__inner wrap">
        <div><b>${i(t.name)}</b><span class="muted small" id="barLabel"></span></div>
        <div class="buybar__right"><span id="barPrice"></span><button class="btn btn--primary btn--sm" id="barAdd">Comprar</button></div>
      </div>
    </div>`}function Ue(){const{m:e}=g,a=()=>e.variants.find(m=>m.color===g.color&&m.config===g.config),t=()=>{if(!g.trade)return 0;const[,m]=o.tradeIn.devices[g.trade.d],[,$]=o.tradeIn.conditions[g.trade.c];return Math.round(m*$/1e4)*1e4},s=()=>{const m=a(),$=e.colors.find(x=>x.id===g.color),y=g.protect?oe(e,m.price):0,v=t(),C=m.price+y-v;c("#priceBox").innerHTML=`
        <p class="price">${h(m.price)} ${m.compare&&m.compare>m.price?`<s>${h(m.compare)}</s>`:""}</p>
        <p class="price__cuota">P\xE1galo a cuotas con tu tarjeta de cr\xE9dito o Sistecr\xE9dito \xB7 <a href="#pagos" class="price__link">pide asesor\xEDa</a></p>
        ${v||y?`<p class="price__total">Total con ${[y?"protecci\xF3n":"",v?"retoma":""].filter(Boolean).join(" y ")}: <b>${h(C)}</b>${v?` <span class="ok">(\u2212${h(v)})</span>`:""}</p>`:""}`,c("#colorName").textContent=$.name,A("#colorOpts [data-color]").forEach(x=>x.classList.toggle("is-on",x.dataset.color===g.color)),c("#configOpts")&&(c("#configOpts").innerHTML=e.configs.map(x=>{const j=e.variants.find(Q=>Q.config===x&&Q.color===g.color);return`<button class="config ${x===g.config?"is-on":""}" data-config="${i(x)}" ${j?"":"disabled"}>
            <span>${i(x)}</span><span class="config__price">${j?h(j.price)+(T&&!j.available?" \xB7 Agotado":""):"No disponible en este color"}</span></button>`}).join("")),c("#protectPrice")&&(c("#protectPrice").textContent=h(oe(e,m.price)));const E=$.images;g.img=Math.min(g.img,E.length-1);const w=c("#galMain");w.alt=G(e,$,g.img),w.getAttribute("src")!==E[g.img]&&(w.classList.remove("fade"),w.offsetWidth,w.classList.add("fade"),w.src=E[g.img]),c("#thumbs").innerHTML=E.map((x,j)=>`<button class="thumb ${j===g.img?"is-on":""}" data-img="${j}" aria-label="Ver imagen ${j+1} de ${i(e.name)}"><img src="${x}" alt="" loading="lazy"></button>`).join("");const L=[g.config!=="Est\xE1ndar"?g.config:"",$.name].filter(Boolean).join(" \xB7 ");c("#barLabel").textContent=" "+L,c("#barPrice").textContent=h(m.price);const F=!m.available;c("#addBtn").disabled=F,c("#barAdd").disabled=F,c("#addBtn").textContent=F?T?"Agotado":"Disponible muy pronto":"Comprar",c("#barAdd").textContent=F?"Agotado":"Comprar",c("#waBuy").href=q(`Hola ${o.name}, me interesa el ${e.name} (${L}) de ${h(m.price)}.`+(v?` Quiero entregar mi ${o.tradeIn.devices[g.trade.d][0]} (${o.tradeIn.conditions[g.trade.c][0]}) en retoma.`:"")+" \xBFEst\xE1 disponible?"),c("#waFloat").href=c("#waBuy").href,r(m,L),c("#payAdvice")&&(c("#payAdvice").href=q(`Hola ${o.name}, quiero pagar a cuotas el ${e.name} (${L}) de ${h(m.price)}. \xBFMe asesoran con las opciones?`)),history.replaceState(null,"",f.p(e,`color=${g.color}${$e(e)?"&config="+encodeURIComponent(g.config):""}`))},n=()=>{const $=((o.combos||{})[e.cat]||[]).map(y=>b[y]).filter(y=>y&&y.id!==e.id);return $.find(y=>y.variants.some(v=>v.available))||$[0]||null},r=(m,$)=>{const y=c("#combo"),v=n();if(!y||!v){y&&(y.innerHTML="");return}const C=v.variants.find(F=>F.available)||v.variants[0],E=m.available&&C.available,w=m.price+C.price;y.innerHTML=`<div class="combo">
        <p class="combo__title">El complemento perfecto</p>
        <div class="combo__items">
          <div class="combo__item"><img src="${W(M(e,g.color),200)}" alt="${i(e.name)}"><span>${i(e.name)}</span><b>${h(m.price)}</b></div>
          <span class="combo__plus">+</span>
          <div class="combo__item"><img src="${W(M(v),200)}" alt="${i(v.name)}"><span>${i(v.name)}</span><b>${h(C.price)}</b></div>
        </div>
        <div class="combo__foot"><p>Total: <b>${h(w)}</b></p>
          ${E?'<button class="btn btn--primary btn--sm" id="comboAdd">Agregar combo</button>':`<a class="btn btn--wa btn--sm" target="_blank" rel="noopener" href="${q(`Hola ${o.name}, quiero el combo ${e.name} (${$}) + ${v.name}. \xBFEst\xE1 disponible?`)}">Pedir combo por WhatsApp</a>`}</div>
      </div>`;const L=c("#comboAdd",y);L&&(L.onclick=()=>{ee({id:e.id,color:m.color,config:m.config}),ee({id:v.id,color:C.color,config:C.config})})},d=()=>{const m=a(),$=t();ee({id:e.id,color:m.color,config:m.config,protection:g.protect?oe(e,m.price):0,tradeIn:$?{device:o.tradeIn.devices[g.trade.d][0],cond:o.tradeIn.conditions[g.trade.c][0],value:$}:null})},l=c(".pdp");l.addEventListener("click",m=>{const $=m.target.closest("[data-color]"),y=m.target.closest("[data-config]"),v=m.target.closest("[data-img]"),C=m.target.closest("[data-gal]"),E=m.target.closest("[data-trade]");if($&&(g.color=$.dataset.color,g.img=0,a()||(g.config=e.variants.filter(w=>w.color===g.color).sort((w,L)=>w.price-L.price)[0].config)),y&&!y.disabled&&(g.config=y.dataset.config),v&&(g.img=+v.dataset.img),C){const w=e.colors.find(L=>L.id===g.color).images.length;g.img=(g.img+ +C.dataset.gal+w)%w}if(E){const w=E.dataset.trade==="yes";A("[data-trade]").forEach(L=>L.classList.toggle("is-on",L===E)),c("#tradeForm").hidden=!w,g.trade=w?{d:+c("#tradeDevice").value,c:+c("#tradeCond").value}:null}($||y||v||C||E)&&s()}),l.addEventListener("change",m=>{m.target.id==="protect"&&(g.protect=m.target.checked),(m.target.id==="tradeDevice"||m.target.id==="tradeCond")&&(g.trade={d:+c("#tradeDevice").value,c:+c("#tradeCond").value}),s()}),c("#addBtn").addEventListener("click",d),c("#barAdd").addEventListener("click",d);let p=null;c(".gallery").addEventListener("touchstart",m=>{p=m.touches[0].clientX},{passive:!0}),c(".gallery").addEventListener("touchend",m=>{if(p===null)return;const $=m.changedTouches[0].clientX-p;p=null,Math.abs($)>40&&c(`[data-gal="${$<0?1:-1}"]`).click()});const P=()=>{const m=c("#sameDay");if(!m)return clearInterval(g.timer);if(!o.sameDayCutoff){m.innerHTML=`<b>Rec\xEDbelo hoy en ${o.sameDayCity}</b><br><span class="muted small">Entrega el mismo d\xEDa en ${o.sameDayCity}.</span>`;return}const{h:$,m:y,day:v}=Re(),C=o.sameDayCutoff*60-($*60+y);m.innerHTML=C>0&&v!=="Sun"?`<b>Rec\xEDbelo hoy en ${o.sameDayCity}</b><br><span class="muted small">Compra en las pr\xF3ximas <b class="accent">${Math.floor(C/60)} h ${C%60} min</b></span>`:`<b>Rec\xEDbelo ${v==="Sat"||v==="Sun"?"el lunes":"ma\xF1ana"} en ${o.sameDayCity}</b><br><span class="muted small">Pide antes de las ${o.sameDayCutoff}:00 para entrega el mismo d\xEDa.</span>`};P(),g.timer=setInterval(P,3e4);const u=matchMedia("(prefers-reduced-motion: reduce)").matches;A(".ship").forEach((m,$)=>{const y=A(".ship__step",m),v=y.length,C=x=>{m.style.setProperty("--p",String(x/(v-1))),y.forEach((j,Q)=>{j.classList.toggle("is-done",Q<x),j.classList.toggle("is-now",Q===x)})};if(u)return C(v-1);let E=0,w=null;const L=()=>{C(E),w=setTimeout(()=>{E=E>=v-1?0:E+1,L()},E>=v-1?2600:1100)};C(0),new IntersectionObserver(([x])=>{clearTimeout(w),x.isIntersecting&&(E=0,setTimeout(L,$*500))},{threshold:.6}).observe(m)}),new IntersectionObserver(([m])=>{const $=c("#buybar");if(!$)return;const y=!m.isIntersecting&&m.boundingClientRect.top<0;$.classList.toggle("show",y),$.setAttribute("aria-hidden",String(!y))}).observe(c("#addBtn")),s();{const m=a();H("ViewContent",{content_ids:[String(m.vid||e.id)],content_type:"product",content_name:e.name,value:m.price,currency:"COP"})}}function Qe(){if(!k.length)return'<section class="wrap narrow section center"><h1 class="h2">Tu bolsa est\xE1 vac\xEDa</h1><p class="lead">Agrega un producto para continuar.</p><a class="btn btn--primary" href="/">Ir a la tienda</a></section>';const e=Y(),a=[["tarjeta","Tarjeta de cr\xE9dito",`Hasta ${o.installments} cuotas \xB7 ${o.installmentsNote}`],["sistecredito","Sistecr\xE9dito","Cr\xE9dito solo con tu c\xE9dula, sin tarjeta"]];return`
    <section class="checkout wrap">
      <form class="checkout__form" id="checkoutForm" novalidate>
        <h1 class="h2">Finalizar compra</h1>
        <p class="muted small with-ico">${_("lock",16)} Compra segura. Tus datos se usan solo para procesar tu pedido.</p>
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
        <ul class="lines lines--compact">${k.map(t=>`<li class="line"><span class="line__img"><img src="${M(b[t.id],t.color)}" alt=""><i>${t.qty}</i></span>
          <div class="line__info"><b class="small">${i(b[t.id].name)}</b><p class="small muted">${i(re(t))}</p>${t.protection?`<p class="small">+ ${i(o.protection.name)}</p>`:""}${t.tradeIn?`<p class="small ok">Retoma \u2212${h(t.tradeIn.value)}</p>`:""}</div>
          <b class="small">${h(X(t))}</b></li>`).join("")}</ul>
        <dl class="sum">
          <div><dt>Subtotal</dt><dd>${h(e.sub)}</dd></div>
          ${e.trade?`<div class="ok"><dt>Retoma (estimado)</dt><dd>\u2212${h(e.trade)}</dd></div>`:""}
          <div><dt>Env\xEDo</dt><dd>${e.ship===null?"Se calcula al pagar":e.ship?h(e.ship):"Gratis"}</dd></div>
          <div class="sum__total"><dt>Total</dt><dd>${h(e.total)}</dd></div>
        </dl>
        <p class="small muted">o ${R(e.total)}/mes en ${o.installments} cuotas</p>
        <ul class="trust trust--col"><li>${_("shield",16)} Productos originales y sellados</li><li>${_("back",16)} Derecho de retracto de 5 d\xEDas h\xE1biles</li></ul>
      </aside>
    </section>`}function Ke(){const e=c("#checkoutForm");e&&(e.addEventListener("change",a=>{if(a.target.name==="entrega"){const t=a.target.value==="envio";c("#shipFields").hidden=!t,A("#shipFields input").forEach(s=>{s.required=t})}}),e.addEventListener("submit",a=>{a.preventDefault(),A(".invalid",e).forEach(d=>d.classList.remove("invalid"));const t=A("input",e).filter(d=>!d.checkValidity());if(t.forEach(d=>(d.closest("label")||d).classList.add("invalid")),c("#formError").hidden=!t.length,t.length){t[0].focus();return}const s=Object.fromEntries(new FormData(e)),n="NV-"+Date.now().toString(36).toUpperCase().slice(-6),r=ke(`

Pedido ${n}
Cliente: ${s.nombre} \xB7 CC ${s.cedula}
Correo: ${s.email} \xB7 Cel: ${s.celular}
`+(s.entrega==="envio"?`Entrega: ${s.direccion}, ${s.ciudad} (${s.departamento})`:"Entrega: Retiro en tienda")+`
Pago: ${s.pago}`);O.set("nova-last-order",{order:n,name:s.nombre.split(" ")[0],wa:q(r)}),window.open(q(r),"_blank","noopener"),k=[],J(),K("/gracias/")}))}function Je(){const e=O.get("nova-last-order",null);return`<section class="wrap narrow section center thanks">
      <div class="thanks__icon">\u2713</div>
      <h1 class="h2">\xA1Gracias${e?", "+i(e.name):""}! Recibimos tu pedido.</h1>
      ${e?`<p class="lead">N\xFAmero de pedido <b>${i(e.order)}</b>. Un asesor te escribir\xE1 por WhatsApp con el enlace de pago seguro y la confirmaci\xF3n de entrega.</p>
      <a class="btn btn--wa" href="${e.wa}" target="_blank" rel="noopener">Abrir WhatsApp de nuevo</a>`:""}
      <p><a class="btn btn--link" href="/">Seguir comprando \u203A</a></p></section>`}const D=o.siteUrl||location.origin,Xe=(e,a=158)=>e.length>a?e.slice(0,a-1).replace(/\s+\S*$/,"")+"\u2026":e,U=e=>W(e,1200)||"",Te=e=>({"@type":"BreadcrumbList",itemListElement:e.map(([a,t],s)=>({"@type":"ListItem",position:s+1,name:a,item:D+t}))}),qe={"@id":D+"/#tienda"};function Ye(e){const a=B.find(s=>s.id===e[0]);if(!e.length){const s=b[o.hero.id]||I[0];return{title:`Tienda de iPhone en ${o.sameDayCity} y Colombia \xB7 ${o.name}`,desc:`Compra iPhone, MacBook, iPad, AirPods y Apple Watch originales y sellados. Entrega el mismo d\xEDa en ${o.sameDayCity}, env\xEDos a toda Colombia y hasta ${o.installments} cuotas.`,image:s&&U(M(s)),ld:[{"@type":"WebPage","@id":D+"/#portada",url:D+"/",name:`Tienda de iPhone en ${o.sameDayCity} y Colombia`,isPartOf:{"@id":D+"/#sitio"},about:qe,inLanguage:"es-CO"},{"@type":"FAQPage",mainEntity:de.map(([n,r])=>({"@type":"Question",name:n,acceptedAnswer:{"@type":"Answer",text:r}}))}]}}if(a&&e.length===1){const s=pe(I.filter(r=>r.cat===a.id),Se(a.id)),n=a.seo||{};return{title:`${n.title||a.name+" en Colombia"} \xB7 ${o.name}`,desc:n.desc||`${a.name} originales en Colombia. Entrega el mismo d\xEDa en ${o.sameDayCity}.`,image:s[0]&&U(M(s[0])),ld:[{"@type":"CollectionPage",url:D+f.cat(a.id),name:n.title||a.name,isPartOf:{"@id":D+"/#sitio"},inLanguage:"es-CO",mainEntity:{"@type":"ItemList",itemListElement:s.map((r,d)=>({"@type":"ListItem",position:d+1,url:D+f.p(r),name:r.name}))}},Te([["Inicio","/"],[a.name,f.cat(a.id)]])]}}const t=e.length===2&&b[e[1]];if(t){const s=t.variants.map(r=>r.price),n={"@type":"AggregateOffer",priceCurrency:"COP",lowPrice:Math.min(...s),highPrice:Math.max(...s),offerCount:t.variants.length,url:D+f.p(t),seller:qe,itemCondition:"https://schema.org/NewCondition"};return T&&(n.availability=t.variants.some(r=>r.available)?"https://schema.org/InStock":"https://schema.org/OutOfStock"),{title:`${t.name} precio en Colombia \xB7 ${o.name}`,desc:Xe(`Compra ${t.name} original y sellado desde ${h(t.fromPrice)} o ${R(t.fromPrice)}/mes en ${o.installments} cuotas. Entrega el mismo d\xEDa en ${o.sameDayCity} y env\xEDos a toda Colombia.`),image:U(M(t)),type:"product",ld:[{"@type":"Product",name:t.name,url:D+f.p(t),description:t.description||t.tagline||t.name,brand:{"@type":"Brand",name:"Apple"},category:V(t.cat),image:t.colors.flatMap(r=>r.images.slice(0,2)).slice(0,8).map(U),...t.colors.length>1&&z(t)?{color:t.colors.map(r=>r.name).join(", ")}:{},offers:n},Te([["Inicio","/"],[V(t.cat),f.cat(t.cat)],[t.name,f.p(t)]])]}}return null}function ea(e,a){const t=e||{title:`P\xE1gina no encontrada \xB7 ${o.name}`,desc:"",noindex:!0},s=(r,d)=>{const l=document.head.querySelector(r);l&&l.setAttribute(l.tagName==="LINK"?"href":"content",d)};document.title=t.title,s('meta[name="description"]',t.desc),s('meta[name="robots"]',t.noindex?"noindex,follow":"index,follow,max-image-preview:large"),s('link[rel="canonical"]',D+a),s('meta[property="og:type"]',t.type||"website"),s('meta[property="og:url"]',D+a),s('meta[property="og:title"]',t.title),s('meta[property="og:description"]',t.desc),t.image&&(s('meta[property="og:image"]',t.image),s('meta[name="twitter:image"]',t.image)),s('meta[name="twitter:title"]',t.title),s('meta[name="twitter:description"]',t.desc);const n=c("#ldPage");n&&(n.textContent=t.ld?JSON.stringify({"@context":"https://schema.org","@graph":t.ld}):"{}")}window.STORE_PAGES=()=>["/",...B.filter(e=>I.some(a=>a.cat===e.id)).map(e=>f.cat(e.id)),...I.map(e=>f.p(e))].map(e=>{const a=b[e.split("/").filter(Boolean)[1]];return{path:e,images:a?a.colors.flatMap(t=>t.images.slice(0,2)).slice(0,8).map(U):[],title:a?a.name:""}});const he=()=>'<section class="wrap narrow section center"><h1 class="h2">No encontramos esta p\xE1gina</h1><a class="btn btn--primary" href="/">Volver al inicio</a></section>';function aa(){if(!location.hash.startsWith("#/"))return;const[e,a]=location.hash.slice(1).split("?"),[t,s]=e.split("/").filter(Boolean),n=t==="c"&&s?f.cat(s):t==="p"&&b[s]?f.p(b[s]):t?`/${t}/`:"/";history.replaceState(null,"",n+(a?"?"+a:""))}function N(){aa();const e=new URLSearchParams(location.search);let a=location.pathname.split("/").filter(Boolean);a.length===2&&b[a[1]]&&b[a[1]].cat!==a[0]&&(history.replaceState(null,"",f.p(b[a[1]],location.search.slice(1))),a=[b[a[1]].cat,a[1]]),g&&g.timer&&clearInterval(g.timer),g=null;const t=a.length===1&&B.some(p=>p.id===a[0]);let s,n=Ye(a);a.length?t?s=Ze(a[0],e):a.length===2&&b[a[1]]?s=Ge(a[1],e):a[0]==="checkout"?(s=Qe(),n={title:`Finalizar compra \xB7 ${o.name}`,desc:"",noindex:!0}):a[0]==="gracias"?(s=Je(),n={title:`Gracias por tu compra \xB7 ${o.name}`,desc:"",noindex:!0}):(s=he(),n=null):s=ze();const r=!N.done;N.done=!0,se.innerHTML=s,se.removeAttribute("data-prerendered"),ea(n,a.length?`/${a.join("/")}/`:"/");const d=t?a[0]:a.length===2&&b[a[1]]?b[a[1]].cat:"";A("#navLinks a").forEach(p=>p.classList.toggle("is-on",p.dataset.cat===d)),c("#waFloat").href=q(`Hola ${o.name}, quiero asesor\xEDa para comprar un producto Apple.`),window.Explorer&&window.Explorer.mount(se),g&&Ue(),a[0]==="checkout"&&Ke(),ta(),Be();const l=location.pathname;N.last!==l&&(r||window.scrollTo({top:0}),N.last=l),r&&!window.__PRERENDER&&(document.documentElement.classList.add("no-anim"),A(".reveal").forEach(p=>{p.getBoundingClientRect().top<innerHeight&&p.classList.add("in")}),requestAnimationFrame(()=>requestAnimationFrame(()=>document.documentElement.classList.remove("no-anim")))),document.documentElement.dataset.ready=l,r||H("PageView")}function ta(){A(".shelf").forEach(t=>t.addEventListener("click",s=>{const n=s.target.closest("[data-scroll]");if(!n)return;const r=c(".shelf__track",t);r.scrollBy({left:+n.dataset.scroll*r.clientWidth*.8,behavior:"smooth"})})),A(".card").forEach(t=>{t.addEventListener("mouseover",s=>{const n=s.target.closest("[data-swap]");n&&(c("[data-card-img]",t).src=n.dataset.swap)}),t.addEventListener("click",s=>{const n=s.target.closest("[data-color]");n&&(s.preventDefault(),K(t.getAttribute("href")+"?color="+n.dataset.color))})});const e=c("#sortSel");e&&e.addEventListener("change",()=>{K(location.pathname+"?orden="+e.value,!0)});const a=c("#tradeQuick");if(a){const t=()=>{const[,s]=o.tradeIn.devices[a.device.value],[,n]=o.tradeIn.conditions[a.cond.value];c("#tradeQuickVal").textContent=h(Math.round(s*n/1e4)*1e4)};a.addEventListener("change",t),t()}sa(),te(),oa()}let ge=null;function te(){const e=c(".benefits");if(!e)return;const a=A(".benefit",e),t=a.length,s=matchMedia("(max-width: 900px)");if(matchMedia("(prefers-reduced-motion: reduce)").matches||window.__PRERENDER){e.style.setProperty("--bp","1"),a.forEach(d=>d.classList.add("is-lit"));return}const n=()=>{if(ge=null,!document.body.contains(e))return;const d=innerHeight;let l;if(s.matches){const p=c(".benefits__line",e).getBoundingClientRect();l=(d*.72-p.top)/Math.max(1,p.height)}else{const p=e.getBoundingClientRect();l=(d*.92-p.top)/(d*.5)}l=Math.max(0,Math.min(1,l)),e.style.setProperty("--bp",l.toFixed(3)),a.forEach((p,P)=>p.classList.toggle("is-lit",l>.01&&l>=P/(t-1)-.02))},r=()=>{ge||(ge=requestAnimationFrame(n))};window.removeEventListener("scroll",te.handler),window.removeEventListener("resize",te.handler),te.handler=r,window.addEventListener("scroll",r,{passive:!0}),window.addEventListener("resize",r),n()}function sa(){const e=matchMedia("(prefers-reduced-motion: reduce)").matches;A(".hero__media").forEach(a=>{const t=c(".hero__video",a);if(t&&!e&&!window.__PRERENDER&&(t.addEventListener("playing",()=>a.classList.add("is-playing"),{once:!0}),new IntersectionObserver(([r])=>{r.isIntersecting?t.play().catch(()=>{}):t.pause()},{threshold:.2}).observe(a)),e||!matchMedia("(hover: hover) and (pointer: fine)").matches)return;const s=a.closest(".hero");s.addEventListener("pointermove",n=>{const r=a.getBoundingClientRect(),d=(n.clientX-r.left)/r.width-.5,l=(n.clientY-r.top)/r.height-.5;a.style.setProperty("--rx",`${(-l*10).toFixed(2)}deg`),a.style.setProperty("--ry",`${(d*14).toFixed(2)}deg`)}),s.addEventListener("pointerleave",()=>{a.style.setProperty("--rx","0deg"),a.style.setProperty("--ry","0deg")})})}const be="IntersectionObserver"in window?new IntersectionObserver(e=>e.forEach(a=>{a.isIntersecting&&(a.target.classList.add("in"),be.unobserve(a.target))}),{rootMargin:"0px 0px -8% 0px"}):null,oa=()=>A(".reveal:not(.in)").forEach(e=>be&&!window.__PRERENDER?be.observe(e):e.classList.add("in")),De=()=>{c("#search").hidden=!1,document.body.classList.add("locked"),c("#searchInput").value="",fe(""),setTimeout(()=>c("#searchInput").focus(),30)},je=()=>{c("#search").hidden=!0,document.body.classList.remove("locked")};function fe(e){const a=ve(e.trim()),t=a?I.filter(s=>a.split(/\s+/).every(n=>ve(`${s.name} ${V(s.cat)} ${s.tagline}`).includes(n))).slice(0,8):[];c("#searchResults").innerHTML=a?t.length?t.map(s=>`<a class="sres" href="${f.p(s)}"><img src="${M(s)}" alt="${i(s.name)}"><span><b>${i(s.name)}</b><span class="small muted">Desde ${h(s.fromPrice)} \xB7 ${R(s.fromPrice)}/mes</span></span></a>`).join(""):`<p class="muted">Sin resultados para \u201C${i(e)}\u201D. <a href="${q("Hola, busco: "+e)}" target="_blank" rel="noopener">Preg\xFAntanos por WhatsApp</a>.</p>`:`<p class="eyebrow">B\xFAsquedas populares</p><div class="chips">${["iPhone 18 Pro","AirPods Pro 3","MacBook Air","iPad","Apple Watch","Cargador"].map(s=>`<button class="chip" data-q="${s}">${s}</button>`).join("")}</div>`}c("#openSearch").addEventListener("click",De),c("#searchInput").addEventListener("input",e=>fe(e.target.value)),c("#search").addEventListener("click",e=>{(e.target.id==="search"||e.target.closest("[data-close]")||e.target.closest(".sres"))&&je();const a=e.target.closest("[data-q]");a&&(c("#searchInput").value=a.dataset.q,fe(a.dataset.q))}),document.addEventListener("keydown",e=>{e.key==="Escape"&&(je(),ce(),Be()),e.key==="/"&&!/input|textarea|select/i.test(document.activeElement.tagName)&&(e.preventDefault(),De())});function na(){c(".nav__name").textContent=o.name,c("#navLinks").innerHTML=B.map(p=>`<a href="${f.cat(p.id)}" data-cat="${p.id}">${p.name}</a>`).join("")+`<a href="${q("Hola, quiero asesor\xEDa")}" target="_blank" rel="noopener" class="nav__help">Asesor\xEDa</a><a href="https://${o.shopifyDomain}" class="nav__back" title="Ir a la p\xE1gina principal de Celada Shopper">\u2190 Volver a Celada Shopper</a>`;const e=c("#announce");e.innerHTML=o.announcements.map((p,P)=>`<p class="${P?"":"on"}">${i(p)}</p>`).join("");let a=0;setInterval(()=>{const p=A("p",e);p[a].classList.remove("on"),a=(a+1)%p.length,p[a].classList.add("on")},4200);const t=(p,P)=>`<details class="footer__col"><summary>${p}<svg class="footer__chev" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></summary><div class="footer__links">${P}</div></details>`,s=`https://${o.shopifyDomain}`,n={whatsapp:'<path d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3Zm0 23.7c-2 0-4-.5-5.7-1.6l-.4-.2-3.9 1 1-3.8-.3-.4A10.7 10.7 0 1 1 16 26.7Zm5.9-8c-.3-.2-1.9-1-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1a8.8 8.8 0 0 1-4.4-3.8c-.3-.6.3-.5 1-1.7.1-.2 0-.4 0-.6l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.3 1.4 3.5c.2.2 2.4 3.7 5.8 5.1 2.2.9 3 1 4.1.8.7-.1 1.9-.8 2.2-1.5.3-.8.3-1.4.2-1.5l-.6-.3Z"/>',instagram:'<path d="M16 5.6c3.4 0 3.8 0 5.1.1 3.4.2 5 1.8 5.2 5.2.1 1.3.1 1.7.1 5.1s0 3.8-.1 5.1c-.2 3.4-1.8 5-5.2 5.2-1.3.1-1.7.1-5.1.1s-3.8 0-5.1-.1c-3.4-.2-5-1.8-5.2-5.2-.1-1.3-.1-1.7-.1-5.1s0-3.8.1-5.1c.2-3.4 1.8-5 5.2-5.2 1.3-.1 1.7-.1 5.1-.1ZM16 3c-3.5 0-4 0-5.3.1C6 3.3 3.3 6 3.1 10.7 3 12 3 12.5 3 16s0 4 .1 5.3C3.3 26 6 28.7 10.7 28.9c1.3.1 1.8.1 5.3.1s4 0 5.3-.1c4.7-.2 7.4-2.9 7.6-7.6.1-1.3.1-1.8.1-5.3s0-4-.1-5.3C28.7 6 26 3.3 21.3 3.1 20 3 19.5 3 16 3Zm0 6.3a6.7 6.7 0 1 0 0 13.4 6.7 6.7 0 0 0 0-13.4Zm0 11a4.3 4.3 0 1 1 0-8.6 4.3 4.3 0 0 1 0 8.6Zm7-12.9a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z"/>',tiktok:'<path d="M22.5 3h-4.3v17.4a3.8 3.8 0 1 1-3.8-3.8c.4 0 .8.1 1.1.2v-4.4a8.1 8.1 0 1 0 7 8V11.6a10.3 10.3 0 0 0 6 1.9V9.2a6 6 0 0 1-6-6.2Z"/>'},r=(p,P,u)=>`<a class="footer__social" href="${P}" target="_blank" rel="noopener" aria-label="${u}"><svg viewBox="0 0 32 32" width="18" height="18" fill="currentColor" aria-hidden="true">${n[p]}</svg></a>`;c("#footer").innerHTML=`
      <div class="wrap">
        <div class="footer__top">
          <div class="footer__brand">
            <a class="footer__logo" href="/"><span class="nav__mark">C</span><span>${i(o.name)}</span></a>
            <p>Productos Apple originales y sellados. Entrega el mismo d\xEDa en ${i(o.sameDayCity)} y env\xEDos a toda Colombia.</p>
            <div class="footer__socials">${r("whatsapp",q("Hola "+o.name),"WhatsApp")}${r("instagram",o.instagram,"Instagram")}${r("tiktok",o.tiktok,"TikTok")}</div>
          </div>
          <nav class="footer__cols" aria-label="Pie de p\xE1gina">
            ${t("Comprar",B.map(p=>`<a href="${f.cat(p.id)}">${p.name}</a>`).join(""))}
            ${t("Ayuda",`<a href="${s}/policies/shipping-policy">Env\xEDos y entregas</a><a href="${s}/policies/refund-policy">Devoluciones y retracto</a><a href="${s}/pages/contact">Contacto</a>`)}
            ${t("Nosotros",`<a href="${s}">Casillero Celada Shopper</a><a href="${s}/pages/quienes-somos">Qui\xE9nes somos</a><a href="${s}/policies/terms-of-service">T\xE9rminos y condiciones</a><a href="${s}/policies/privacy-policy">Pol\xEDtica de privacidad</a>`)}
          </nav>
          <div class="footer__contact">
            <p class="footer__contact-title">\xBFNecesitas ayuda para elegir?</p>
            <a class="btn btn--wa btn--sm" href="${q("Hola "+o.name+", necesito asesor\xEDa")}" target="_blank" rel="noopener">Escr\xEDbenos por WhatsApp</a>
            <p class="footer__contact-meta"><a href="tel:${o.phone.replace(/\s/g,"")}">${i(o.phone)}</a><br><a href="mailto:${o.email}">${i(o.email)}</a>${o.address?"<br>"+i(o.address):""}${o.hours?"<br>"+i(o.hours):""}</p>
          </div>
        </div>
        <div class="footer__pay"><span>Medios de pago</span>${ae()}</div>
        <div class="footer__legal">
          <p>${o.legalName?i(o.legalName)+" \xB7 ":""}${o.nit?"NIT "+i(o.nit)+" \xB7 ":""}Precios en pesos colombianos. Im\xE1genes de referencia.</p>
          <p>Apple, iPhone, iPad, Mac, Apple Watch y AirPods son marcas registradas de Apple Inc. ${i(o.name)} es un comercio independiente.</p>
          <p><button class="link small" id="cookiePrefs" type="button">Preferencias de cookies</button> \xB7 <a href="https://www.sic.gov.co" target="_blank" rel="noopener">Superintendencia de Industria y Comercio</a> \xB7 \xA9 ${new Date().getFullYear()} ${i(o.name)}</p>
        </div>
      </div>`;const d=matchMedia("(max-width: 700px)"),l=()=>A("#footer .footer__col").forEach(p=>{p.open=!d.matches});l(),d.addEventListener("change",l),c("#cookiePrefs").addEventListener("click",()=>Ce(!0))}const Be=()=>{document.body.classList.remove("menu-open"),c("#burger").setAttribute("aria-expanded","false")};c("#burger").addEventListener("click",()=>{const e=document.body.classList.toggle("menu-open");c("#burger").setAttribute("aria-expanded",String(e))}),window.addEventListener("scroll",()=>c("#nav").classList.toggle("scrolled",window.scrollY>8),{passive:!0}),na(),Ce(),ne()==="all"&&H("PageView"),Ee(),Pe(),document.addEventListener("click",e=>{const a=e.target.closest("a[href]");if(!a||e.defaultPrevented||e.button||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||a.target==="_blank"||a.hasAttribute("download"))return;const t=new URL(a.href,location.href);t.origin!==location.origin||/\.[a-z0-9]+$/i.test(t.pathname)||t.pathname===location.pathname&&t.search===location.search&&t.hash||(e.preventDefault(),K(t.pathname+t.search))}),window.addEventListener("popstate",N),window.addEventListener("hashchange",()=>location.hash.startsWith("#/")&&N()),N()})();
