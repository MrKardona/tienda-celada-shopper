(async()=>{"use strict";const o=window.STORE,{catalog:k,live:L}=await window.loadCatalog();document.documentElement.classList.toggle("is-demo",!L);const S=window.CATEGORIES,g=Object.fromEntries(k.map(e=>[e.id,e])),c=(e,a=document)=>a.querySelector(e),w=(e,a=document)=>[...a.querySelectorAll(e)],G=c("#app"),h=e=>"$"+Math.round(e).toLocaleString("es-CO"),x=e=>h(Math.ceil(e/o.installments)),i=e=>String(e??"").replace(/[&<>"']/g,a=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[a]),re=e=>String(e).normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase(),B=e=>(S.find(a=>a.id===e)||{}).name||"",P=(e,a)=>(a&&e.colors.find(t=>t.id===a)||e.colors[0]).images[0],U=(e,a)=>e&&/[?&]width=\d+/.test(e)?e.replace(/width=\d+/,`width=${a}`):e,$={cat:e=>`/${e}/`,p:(e,a)=>`/${e.cat}/${e.id}/${a?"?"+a:""}`},H=(e,a)=>{history[a?"replaceState":"pushState"](null,"",e),j()},I=e=>`https://wa.me/${o.whatsapp}?text=${encodeURIComponent(e)}`,R={get(e,a){try{return JSON.parse(localStorage.getItem(e))??a}catch{return a}},set(e,a){try{localStorage.setItem(e,JSON.stringify(a))}catch{}}},Q=(e,a)=>o.protection.cats.includes(e.cat)?Math.max(o.protection.min,Math.round(a*o.protection.rate/1e3)*1e3):0,ce=e=>e.configs.length>1||e.configs[0]!=="Est\xE1ndar",O=e=>e.colors.some(a=>a.hex),Le=()=>{const e=Object.fromEntries(new Intl.DateTimeFormat("en-US",{timeZone:"America/Bogota",hour:"numeric",minute:"numeric",weekday:"short",hour12:!1}).formatToParts(new Date).map(a=>[a.type,a.value]));return{h:+e.hour%24,m:+e.minute,day:e.weekday}};let le;const Pe=e=>{const a=c("#toast");a.innerHTML=e,a.classList.add("show"),clearTimeout(le),le=setTimeout(()=>a.classList.remove("show"),2600)};let v=R.get("nova-cart",[]).map(e=>{const a=g[e.id],t=a&&a.variants.find(s=>s.color===e.color&&s.config===e.config);return t?{...e,price:t.price,vid:t.vid}:null}).filter(Boolean);const W=()=>{R.set("nova-cart",v),me(),ue()},V=e=>(e.price+(e.protection||0))*e.qty,K=()=>{const e=v.reduce((s,n)=>s+V(n),0),a=v.reduce((s,n)=>s+(n.tradeIn?n.tradeIn.value:0),0);if(L)return{sub:e,trade:a,ship:null,total:e};const t=o.freeShippingFrom?e===0||e>=o.freeShippingFrom?0:o.shippingCost:null;return{sub:e,trade:a,ship:t,total:Math.max(0,e-a+t)}};function de({id:e,color:a,config:t,qty:s=1,protection:n=0,tradeIn:l=null}){const p=g[e],d=p.variants.find(b=>b.color===a&&b.config===t)||p.variants.find(b=>b.available)||p.variants[0];if(!d.available){Pe("Este producto est\xE1 agotado. Escr\xEDbenos por WhatsApp y te avisamos.");return}const m=[e,d.color,d.config,n?"p":"",l?l.device+l.cond:""].join("|"),r=v.find(b=>b.key===m);r?r.qty+=s:v.push({key:m,id:e,color:d.color,config:d.config,qty:s,price:d.price,protection:n,tradeIn:l,sku:d.sku,vid:d.vid}),W(),he()}const J=e=>{const t=g[e.id].colors.find(s=>s.id===e.color);return[e.config!=="Est\xE1ndar"?e.config:"",t?t.name:""].filter(Boolean).join(" \xB7 ")},pe=(e="")=>{const a=K(),t=v.map(s=>`\u2022 ${s.qty} \xD7 ${g[s.id].name} (${J(s)}) \u2014 ${h(V(s))}`+(s.protection?`
   + ${o.protection.name}`:"")+(s.tradeIn?`
   Retoma: ${s.tradeIn.device} (${s.tradeIn.cond}) \u2212${h(s.tradeIn.value)}`:""));return`Hola ${o.name}, quiero hacer este pedido:

${t.join(`
`)}

Subtotal: ${h(a.sub)}`+(a.trade?`
Descuento retoma (estimado): \u2212${h(a.trade)}`:"")+`
Env\xEDo: ${a.ship===null?"Se calcula al pagar":a.ship?h(a.ship):"Gratis"}
Total: ${h(a.total)}${e}`},Ae=()=>v.filter(e=>e.tradeIn).map(e=>`Retoma solicitada para ${g[e.id].name}: ${e.tradeIn.device} (${e.tradeIn.cond}), valor estimado ${h(e.tradeIn.value)}`).join(" | "),xe=()=>window.shopifyCheckoutUrl(v,Ae());function me(){const e=v.reduce((t,s)=>t+s.qty,0),a=c("#cartCount");a.textContent=e,a.hidden=!e}function ue(){const e=c("#cart"),a=K(),t=Math.max(0,o.freeShippingFrom-a.sub),s=Math.min(100,a.sub/o.freeShippingFrom*100),n=new Set(v.map(p=>p.id)),l=["airpods-pro-3","cargador-magsafe","airtag","adaptador-40w"].filter(p=>g[p]&&g[p].available!==!1&&!n.has(p)).slice(0,2);e.innerHTML=`
      <div class="drawer__head"><h2>Tu bolsa</h2><button class="icon-btn" data-close-cart aria-label="Cerrar">\u2715</button></div>
      ${v.length?`
      ${L||!o.freeShippingFrom?"":`<div class="ship-meter">
        <p>${t?`Te faltan <b>${h(t)}</b> para tener <b>env\xEDo gratis</b>`:"\xA1Tu pedido tiene <b>env\xEDo gratis</b>!"}</p>
        <div class="ship-meter__bar"><span style="width:${s}%"></span></div>
      </div>`}
      <ul class="lines">${v.map((p,d)=>{const m=g[p.id];return`<li class="line">
          <a href="${$.p(m,"color="+p.color)}" class="line__img"><img src="${P(m,p.color)}" alt="${i(m.name+" "+((m.colors.find(r=>r.id===p.color)||{}).name||""))}"></a>
          <div class="line__info">
            <a href="${$.p(m,"color="+p.color)}" class="line__name">${i(m.name)}</a>
            <p class="muted small">${i(J(p))}</p>
            ${p.protection?`<p class="small with-ico">${y("shield",16)} ${i(o.protection.name)} \xB7 ${h(p.protection)}</p>`:""}
            ${p.tradeIn?`<p class="small ok with-ico">${y("swap",16)} Retoma ${i(p.tradeIn.device)} \xB7 \u2212${h(p.tradeIn.value)}</p>`:""}
            <div class="line__row">
              <div class="qty" role="group" aria-label="Cantidad">
                <button data-qty="${d}" data-d="-1" aria-label="Menos">\u2212</button><span>${p.qty}</span><button data-qty="${d}" data-d="1" aria-label="M\xE1s">+</button>
              </div>
              <b>${h(V(p))}</b>
            </div>
            <button class="link small" data-remove="${d}">Eliminar</button>
          </div></li>`}).join("")}</ul>
      ${l.length?`<div class="drawer__suggest"><p class="eyebrow">Complementa tu compra</p>${l.map(p=>{const d=g[p];return`<div class="mini"><img src="${P(d)}" alt="${i(d.name)}" loading="lazy"><div><p class="small"><b>${i(d.name)}</b></p><p class="small muted">${h(d.fromPrice)}</p></div>
          <button class="btn btn--ghost btn--xs" data-quick="${p}">Agregar</button></div>`}).join("")}</div>`:""}
      <div class="drawer__foot">
        <dl class="sum">
          <div><dt>Subtotal</dt><dd>${h(a.sub)}</dd></div>
          ${a.trade?`<div class="ok"><dt>Retoma (estimado)</dt><dd>\u2212${h(a.trade)}</dd></div>`:""}
          <div><dt>Env\xEDo</dt><dd>${a.ship===null?"Se calcula al pagar":a.ship?h(a.ship):"Gratis"}</dd></div>
          <div class="sum__total"><dt>Total</dt><dd>${h(a.total)}</dd></div>
        </dl>
        ${L&&a.trade?'<p class="small muted center">El descuento por retoma se aplica cuando revisemos tu equipo.</p>':""}
        <p class="small muted center">o ${x(a.total)}/mes en ${o.installments} cuotas</p>
        ${L?`<a href="${i(xe())}" class="btn btn--primary btn--block btn--ico">${y("lock",18)} Pagar de forma segura</a>${be()}`:'<a href="/checkout/" class="btn btn--primary btn--block" data-close-cart>Finalizar compra</a>'}
        <a href="${I(pe())}" target="_blank" rel="noopener" class="btn btn--wa btn--block">Pedir por WhatsApp</a>
      </div>`:`
      <div class="empty"><p>Tu bolsa est\xE1 vac\xEDa.</p><a class="btn btn--primary" href="/iphone/" data-close-cart>Ver iPhone</a></div>`}`}const he=()=>{c("#cart").classList.add("open"),c("#cart").setAttribute("aria-hidden","false"),c("#cartBackdrop").hidden=!1,document.body.classList.add("locked")},X=()=>{c("#cart").classList.remove("open"),c("#cart").setAttribute("aria-hidden","true"),c("#cartBackdrop").hidden=!0,document.body.classList.remove("locked")};c("#cart").addEventListener("click",e=>{const a=e.target.closest("[data-qty]"),t=e.target.closest("[data-remove]"),s=e.target.closest("[data-quick]");if(a){const n=v[+a.dataset.qty];n.qty=Math.max(1,Math.min(5,n.qty+ +a.dataset.d)),W()}if(t&&(v.splice(+t.dataset.remove,1),W()),s){const n=g[s.dataset.quick];de({id:n.id,color:n.variants[0].color,config:n.variants[0].config})}e.target.closest("[data-close-cart]")&&X()}),c("#openCart").addEventListener("click",he),c("#cartBackdrop").addEventListener("click",X);const ge=e=>`
    <a class="card reveal" href="${$.p(e)}">
      ${e.badge||L&&!e.available?`<div class="tags">${e.badge?`<span class="tag">${i(e.badge)}</span>`:""}${L&&!e.available?'<span class="tag tag--out">Agotado</span>':""}</div>`:""}
      <div class="card__media"><img src="${U(P(e),600)}" alt="${i(N(e))}" loading="lazy" decoding="async" data-card-img></div>
      ${O(e)?`<div class="dots">${e.colors.slice(0,7).map(a=>`<span class="dot" style="--c:${a.hex}" title="${i(a.name)}" data-swap="${U(a.images[0],600)}" data-color="${a.id}"></span>`).join("")}</div>`:'<div class="dots"></div>'}
      <h3 class="card__name">${i(e.name)}</h3>
      <p class="card__tag">${i(e.tagline)}</p>
      <p class="card__price">Desde ${h(e.fromPrice)}</p>
      <p class="card__cuota">o ${x(e.fromPrice)}/mes en ${o.installments} cuotas</p>
      <span class="btn btn--primary btn--sm">Comprar</span>
    </a>`,Y=(e,a,t="")=>{const s=a.map(n=>g[n]).filter(Boolean);return s.length?`<section class="section shelf">
      <div class="section__head wrap"><div><h2 class="h2">${e}</h2>${t?`<p class="lead">${t}</p>`:""}</div>
        <div class="shelf__arrows"><button class="round" data-scroll="-1" aria-label="Anterior">\u2039</button><button class="round" data-scroll="1" aria-label="Siguiente">\u203A</button></div></div>
      <div class="shelf__track">${s.map(ge).join("")}</div></section>`:""},be=()=>'<p class="secure-note"><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5Zm-3 8V7a3 3 0 0 1 6 0v3H9Z"/></svg>Pago 100% seguro procesado por Shopify \xB7 datos cifrados</p>',Se=()=>`<div class="trustband">${[["lock","Pago seguro","Pagas en el checkout de Shopify con cifrado SSL. No guardamos datos de tu tarjeta."],["shield","Originales y sellados","Productos Apple nuevos, en su caja sellada."],["back","Derecho de retracto","5 d\xEDas h\xE1biles para compras en l\xEDnea (Ley 1480 de 2011)."],["chat","Te acompa\xF1amos","Asesor\xEDa por WhatsApp antes y despu\xE9s de tu compra."]].map(([e,a,t])=>`<div class="trustband__item reveal"><span class="trustband__icon">${y(e)}</span><div><b>${a}</b><span>${t}</span></div></div>`).join("")}</div>`,z=()=>`<div class="paywall">${o.paymentMethods.map(e=>`<span class="pill">${i(e)}</span>`).join("")}</div>`,$e=e=>`<div class="faq">${e.map(([a,t])=>`<details><summary>${i(a)}</summary><p>${t}</p></details>`).join("")}</div>`,ee=[["\xBFLos productos son originales y nuevos?","S\xED. Todos los productos son Apple originales, nuevos y sellados de f\xE1brica."],["\xBFQu\xE9 garant\xEDa tienen?","Antes de tu compra te explicamos por WhatsApp las condiciones de garant\xEDa de cada equipo y te acompa\xF1amos si la necesitas."],["\xBFCu\xE1nto se demora el env\xEDo?",`En ${o.sameDayCity} entregamos el mismo d\xEDa. Al resto del pa\xEDs, en ${o.otherCitiesDays}, con n\xFAmero de gu\xEDa. El costo del env\xEDo se calcula al pagar seg\xFAn tu ciudad.`],...o.financing?[["\xBFPuedo comprar sin tarjeta de cr\xE9dito?",`S\xED. Puedes pagar a cuotas con ${o.financing.name}: ${o.financing.text}. La aprobaci\xF3n es r\xE1pida y te acompa\xF1amos por WhatsApp.`]]:[],["\xBFPuedo pagar a cuotas?",`S\xED, puedes diferir tu compra hasta en ${o.installments} cuotas con tu tarjeta de cr\xE9dito. Los intereses dependen de tu banco; la cuota que mostramos es el precio dividido en ${o.installments}, sin intereses.`],["\xBFPuedo devolver mi compra?","Tienes derecho de retracto de 5 d\xEDas h\xE1biles desde la entrega para compras en l\xEDnea, siempre que el producto est\xE9 sin usar y en su empaque original (Ley 1480 de 2011)."]],N=(e,a=e.colors[0],t=0)=>`${e.name}${a&&a.hex?" color "+a.name:a&&a.name!=="Est\xE1ndar"?" "+a.name:""}${t?" \u2013 vista "+(t+1):""} original en Colombia`,ve=e=>{const a=S.find(s=>s.id===e),t=a&&g[a.hero];return t&&t.badge?t:k.find(s=>s.cat===e&&s.badge)||null},ae=(e,a)=>[...e].sort((t,s)=>(s===a)-(t===a)||!!s.badge-!!t.badge),Ie={bolt:'<path d="M13 2 4.5 13.5H11L10 22l8.5-11.5H12L13 2Z"/>',truck:'<path d="M2.5 6.5h11v9h-11zM13.5 9.5h4l3 3.2v2.8h-7"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="16.5" cy="17.5" r="1.8"/>',card:'<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 9.5h19M6 15h4"/>',shield:'<path d="M12 2.8 4.5 5.8v5.7c0 4.6 3.1 7.9 7.5 9.7 4.4-1.8 7.5-5.1 7.5-9.7V5.8L12 2.8Z"/><path d="m8.7 12 2.3 2.3 4.4-4.6"/>',lock:'<rect x="4.5" y="10.5" width="15" height="10.5" rx="2.5"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/>',back:'<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>',check:'<path d="m5 12.5 4.5 4.5L19 7.5"/>',swap:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16m0 4v-4h-4"/>',chat:'<path d="M20.5 11.6a8.3 8.3 0 0 1-12 7.4L3.5 20.5l1.4-4.4a8.3 8.3 0 1 1 15.6-4.5Z"/><path d="M8.5 11.8h.01M12 11.8h.01M15.5 11.8h.01" stroke-width="2.4"/>'},y=(e,a=24)=>`<svg class="ico" viewBox="0 0 24 24" width="${a}" height="${a}" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${Ie[e]}</svg>`,te='<span class="launch-pill">Nuevo lanzamiento</span>',fe=(e,a)=>o.hero.video&&e.id===o.hero.id&&a.id===o.hero.color?`<video class="hero__video" src="${o.hero.video}" muted loop playsinline preload="auto" aria-hidden="true"></video>`:"",se=()=>R.get("nova-recent",[]).filter(e=>g[e]);function Me(){const e=g[o.hero.id]||k.find(n=>n.cat==="iphone")||k[0];if(!e)return'<section class="wrap section center"><h1 class="h2">Muy pronto</h1><p class="lead">Estamos preparando nuestra tienda Apple.</p></section>';const a=e.colors.find(n=>n.id===o.hero.color)||e.colors[0],t=o.tiles.map(n=>g[n]).filter(Boolean),s=o.tradeIn;return`
    <section class="hero">
      <div class="hero__copy">
        <h1 class="eyebrow eyebrow--accent">Tienda de iPhone en ${i(o.sameDayCity)} y toda Colombia</h1>
        ${e.badge?te:""}
        <h2 class="hero__title">${i(o.hero.title)}</h2>
        <p class="hero__sub">${i(o.hero.headline)}</p>
        <p class="hero__price">Desde ${h(e.fromPrice)} o <b>${x(e.fromPrice)}/mes</b> en ${o.installments} cuotas</p>
        <div class="cta-row"><a class="btn btn--primary btn--lg" href="${$.p(e,"color="+a.id)}">Comprar</a><a class="btn btn--link" href="/iphone/">Ver todos los iPhone \u203A</a></div>
      </div>
      <div class="hero__media"><img src="${a.images[0]}" alt="${i(N(e,a))}" fetchpriority="high">${fe(e,a)}</div>
    </section>

    <section class="chapters wrap" aria-label="Categor\xEDas">
      ${S.map(n=>{const l=g[n.hero]||k.find(p=>p.cat===n.id);return l?`<a class="chapter" href="${$.cat(n.id)}"><span class="chapter__img"><img src="${P(l)}" alt="${i(l.name)}" loading="lazy"></span><span>${n.name}</span></a>`:""}).join("")}
    </section>

    <section class="benefits wrap" aria-label="Por qu\xE9 comprar con nosotros">
      ${[["bolt",`Entrega hoy en ${o.sameDayCity}`,"Rec\xEDbelo el mismo d\xEDa de tu compra"],["truck","Env\xEDos a toda Colombia",`En ${o.otherCitiesDays}, con n\xFAmero de gu\xEDa`],["card",`Hasta ${o.installments} cuotas`,o.financing?`Con tarjeta de cr\xE9dito o ${o.financing.name}`:"Con tu tarjeta de cr\xE9dito"],["shield","Originales y sellados","Productos Apple nuevos de f\xE1brica"],["chat","Asesor\xEDa experta","Te ayudamos a elegir por WhatsApp"]].map(([n,l,p])=>`<div class="benefit reveal"><span class="benefit__icon">${y(n)}</span><b>${l}</b><p>${i(p)}</p></div>`).join("")}
    </section>

    ${window.Explorer?window.Explorer.html({productId:"iphone-18-pro-max",price:g["iphone-18-pro-max"]?h(g["iphone-18-pro-max"].fromPrice):""}):""}

    <section class="tiles wrap">
      ${t.map((n,l)=>`
        <article class="tile ${l%3===0?"tile--wide":""} reveal">
          <div class="tile__copy">
            ${n.badge?`<p class="eyebrow eyebrow--accent">${i(n.badge)}</p>`:""}
            <h2 class="tile__title">${i(n.name)}</h2>
            <p class="tile__sub">${i(n.tagline)}</p>
            <p class="tile__price">Desde ${h(n.fromPrice)} \xB7 ${x(n.fromPrice)}/mes</p>
            <div class="cta-row"><a class="btn btn--primary btn--sm" href="${$.p(n)}">Comprar</a><a class="btn btn--link" href="${$.cat(n.cat)}">M\xE1s ${B(n.cat)} \u203A</a></div>
          </div>
          <a class="tile__media" href="${$.p(n)}"><img src="${P(n)}" alt="${i(N(n))}" loading="lazy"></a>
        </article>`).join("")}
    </section>

    ${Y("Nuestros recomendados",o.bestSellers,"Los imprescindibles para estrenar este mes.")}

    ${o.tradeIn.enabled?`<section class="section wrap">
      <div class="tradein-band reveal">
        <div>
          <p class="eyebrow">Plan Retoma</p>
          <h2 class="h2">Tu iPhone vale m\xE1s de lo que crees.</h2>
          <p class="lead">Entr\xE9galo como parte de pago y estrena hoy. Cotiza en segundos.</p>
        </div>
        <form class="tradein-quick" id="tradeQuick">
          <label>Tu equipo<select name="device">${s.devices.map(([n],l)=>`<option value="${l}">${i(n)}</option>`).join("")}</select></label>
          <label>Estado<select name="cond">${s.conditions.map(([n],l)=>`<option value="${l}">${n}</option>`).join("")}</select></label>
          <p class="tradein-quick__value">Recibe hasta <b id="tradeQuickVal"></b></p>
          <a class="btn btn--primary btn--block" href="/iphone/">Elegir mi nuevo iPhone</a>
        </form>
      </div>
    </section>`:""}

    ${se().length?Y("Vistos recientemente",se()):""}

    <section class="section wrap center">
      <h2 class="h2">Paga como prefieras.</h2>
      <p class="lead">Paga de contado o hasta en ${o.installments} cuotas ${i(o.installmentsNote)}${o.financing?`, o a cuotas con <b>${i(o.financing.name)}</b>: ${i(o.financing.text)}`:""}.</p>
      ${z()}
    </section>

    <section class="section wrap">
      <h2 class="h2 center">\xBFPor qu\xE9 comprar en ${i(o.name)}?</h2>
      <div class="why">
        ${[["Productos 100% originales","Nuevos y sellados. Nada de r\xE9plicas ni reacondicionados sin avisar."],["Asesor\xEDa experta","Te ayudamos a elegir por WhatsApp, sin presi\xF3n y con respuesta r\xE1pida."],["Entrega r\xE1pida",`El mismo d\xEDa en ${o.sameDayCity} y en ${o.otherCitiesDays} al resto del pa\xEDs, con seguimiento.`],["Pago seguro",`Pagas en el checkout seguro de Shopify con tarjeta de cr\xE9dito${o.financing?" o "+o.financing.name:""}; tus datos est\xE1n protegidos.`]].map(([n,l])=>`<div class="why__item reveal"><h3>${n}</h3><p>${l}</p></div>`).join("")}
      </div>
    </section>

    <section class="section wrap">
      <h2 class="h2 center">Compra con total confianza</h2>
      <p class="lead center">Tu compra est\xE1 protegida de principio a fin.</p>
      ${Se()}
    </section>

    <section class="section wrap narrow seo-text">
      <h2 class="h2">Tu tienda Apple en ${i(o.sameDayCity)}, con env\xEDos a toda Colombia</h2>
      <p>En ${i(o.name)} vendemos productos Apple originales, nuevos y sellados: <a href="/iphone/">iPhone</a>, <a href="/mac/">MacBook</a>, <a href="/ipad/">iPad</a>, <a href="/watch/">Apple Watch</a>, <a href="/airpods/">AirPods</a> y <a href="/accesorios/">accesorios</a>. Si buscas una tienda de iPhone en ${i(o.sameDayCity)}, te lo entregamos el mismo d\xEDa; al resto del pa\xEDs enviamos en ${i(o.otherCitiesDays)} con n\xFAmero de gu\xEDa.</p>
      <p>Paga de contado o hasta en ${o.installments} cuotas con tu tarjeta de cr\xE9dito, en el checkout seguro de Shopify. ${["iphone-18-pro-max","iphone-17","airpods-pro-3","macbook-air-13-m5"].filter(n=>g[n]).map(n=>`<a href="${$.p(g[n])}">${i(g[n].name)}</a>`).join(", ")} y m\xE1s modelos, con asesor\xEDa por WhatsApp para que elijas el ideal.</p>
    </section>

    <section class="section wrap narrow">
      <h2 class="h2 center">Preguntas frecuentes</h2>
      ${$e(ee)}
    </section>`}function Te(e,a){const t=S.find(d=>d.id===e);if(!t)return oe();const s=ve(e);let n=ae(k.filter(d=>d.cat===e),s);const l=a.get("orden")||"rec";l==="asc"&&(n=[...n].sort((d,m)=>d.fromPrice-m.fromPrice)),l==="desc"&&(n=[...n].sort((d,m)=>m.fromPrice-d.fromPrice));const p=d=>[...new Set(d.configs.map(m=>(/(\d+\s?(GB|TB))/.exec(m)||[])[1]).filter(Boolean))];return`
    <section class="cat-hero wrap">
      <h1 class="display">${i(t.name)}</h1>
      <p class="lead">${i(t.blurb)}</p>
    </section>
    ${s?(()=>{const d=e==="iphone"&&s.colors.find(m=>m.id===o.hero.color)||s.colors[0];return`
    <section class="hero hero--cat" aria-label="Nuevo lanzamiento">
      <div class="hero__copy">
        ${te}
        <h2 class="hero__title">${i(s.name)}</h2>
        <p class="hero__sub">${i(s.tagline)}</p>
        <p class="hero__price">Desde ${h(s.fromPrice)} o <b>${x(s.fromPrice)}/mes</b> en ${o.installments} cuotas</p>
        <div class="cta-row"><a class="btn btn--primary btn--lg" href="${$.p(s,"color="+d.id)}">Comprar</a>${L&&!s.available?'<span class="muted small">Agotado por ahora \xB7 preg\xFAntanos por WhatsApp</span>':""}</div>
      </div>
      <a class="hero__media" href="${$.p(s,"color="+d.id)}"><img src="${d.images[0]}" alt="${i(N(s,d))}" fetchpriority="high">${fe(s,d)}</a>
    </section>`})():""}
    <div class="wrap toolbar">
      <p class="muted">${n.length} modelos</p>
      <label class="select">Ordenar
        <select id="sortSel">
          <option value="rec" ${l==="rec"?"selected":""}>Recomendados</option>
          <option value="asc" ${l==="asc"?"selected":""}>Menor precio</option>
          <option value="desc" ${l==="desc"?"selected":""}>Mayor precio</option>
        </select></label>
    </div>
    <section class="grid wrap">${n.map(ge).join("")}</section>
    ${["iphone","ipad","mac","watch"].includes(e)?`
    <section class="section wrap">
      <h2 class="h2">Compara los modelos</h2>
      <div class="compare-wrap"><table class="compare">
        <thead><tr><th>Modelo</th><th>Precio desde</th><th>Cuota desde</th><th>${e==="watch"?"Tama\xF1os":"Almacenamiento"}</th><th>Acabados</th><th></th></tr></thead>
        <tbody>${ae(k.filter(d=>d.cat===e),s).map(d=>`<tr>
          <td><a href="${$.p(d)}"><img src="${P(d)}" alt="" loading="lazy">${i(d.name)}</a></td>
          <td>${h(d.fromPrice)}</td><td>${x(d.fromPrice)}/mes</td>
          <td>${e==="watch"?[...new Set(d.configs.map(m=>m.split(" \xB7 ")[0]))].join(", "):p(d).join(", ")}</td>
          <td><span class="dots dots--inline">${d.colors.map(m=>`<span class="dot" style="--c:${m.hex}" title="${i(m.name)}"></span>`).join("")}</span></td>
          <td><a class="btn btn--primary btn--xs" href="${$.p(d)}">Comprar</a></td></tr>`).join("")}</tbody>
      </table></div>
    </section>`:""}
    ${t.seo?`<section class="section wrap narrow seo-text"><h2 class="h2">${i(t.seo.h2)}</h2><p>${i(t.seo.text)}</p></section>`:""}
    <section class="section wrap center">${z()}</section>`}let u=null;function De(e,a){const t=g[e];if(!t)return oe();const s=[e,...se().filter(r=>r!==e)].slice(0,10);R.set("nova-recent",s);const n=t.colors.find(r=>r.id===a.get("color"))?a.get("color"):t.colors[0].id,l=t.variants.filter(r=>r.color===n).sort((r,b)=>r.price-b.price),p=l.find(r=>r.config===a.get("config"))?a.get("config"):l[0].config;u={m:t,color:n,config:p,img:0,protect:!1,trade:null};const d=(o.crossSell[t.cat]||[]).filter(r=>r!==e),m=t.cat==="iphone";return`
    <nav class="crumbs wrap" aria-label="Ruta"><a href="/">Inicio</a><span>\u203A</span><a href="${$.cat(t.cat)}">${B(t.cat)}</a><span>\u203A</span><span>${i(t.name)}</span></nav>
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
        ${t.badge?te:""}
        <h1 class="pdp__title">${i(t.name)}</h1>
        <p class="pdp__tag">${i(t.tagline)}</p>
        <div class="price-box" id="priceBox"></div>

        <fieldset class="opt">
          <legend>${O(t)?"Color":"Modelo"}. <b id="colorName"></b></legend>
          <div class="${O(t)?"swatches":"chips"}" id="colorOpts">
            ${t.colors.map(r=>O(t)?`<button class="swatch" style="--c:${r.hex}" data-color="${r.id}" aria-label="${i(r.name)}" title="${i(r.name)}"></button>`:`<button class="chip" data-color="${r.id}">${i(r.name)}</button>`).join("")}
          </div>
        </fieldset>

        ${ce(t)?`<fieldset class="opt">
          <legend>${t.cat==="watch"?"Tama\xF1o y conectividad":t.cat==="mac"?"Configuraci\xF3n":"Capacidad"}.</legend>
          <div class="configs" id="configOpts"></div>
        </fieldset>`:""}

        ${m&&o.tradeIn.enabled?`<fieldset class="opt tradein" id="tradeBox">
          <legend>\xBFTienes un smartphone para entregar como parte de pago?</legend>
          <div class="seg"><button class="seg__btn" data-trade="yes">S\xED, cotizar retoma</button><button class="seg__btn is-on" data-trade="no">No, gracias</button></div>
          <div class="tradein__form" id="tradeForm" hidden>
            <label>Modelo<select id="tradeDevice">${o.tradeIn.devices.map(([r],b)=>`<option value="${b}">${i(r)}</option>`).join("")}</select></label>
            <label>Estado<select id="tradeCond">${o.tradeIn.conditions.map(([r],b)=>`<option value="${b}">${r}</option>`).join("")}</select></label>
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
          ${be()}
        </div>

        <ul class="delivery">
          <li><span class="delivery__ico">${y("bolt",22)}</span><div id="sameDay"></div></li>
          <li><span class="delivery__ico">${y("truck",22)}</span><div><b>Env\xEDos a toda Colombia</b><br><span class="muted small">Llega en ${o.otherCitiesDays} con n\xFAmero de gu\xEDa. El costo se calcula al pagar.</span></div></li>
          <li><span class="delivery__ico">${y("chat",22)}</span><div><b>\xBFDudas? Te asesoramos</b><br><span class="muted small">Escr\xEDbenos por WhatsApp y te respondemos en minutos.</span></div></li>
        </ul>
        <ul class="trust">
          <li>${y("shield",16)} Original y sellado</li><li>${y("lock",16)} Pago seguro en Shopify</li><li>${y("back",16)} Retracto 5 d\xEDas h\xE1biles</li>
        </ul>
        ${z()}
      </div>
    </section>

    ${/^iphone-18-pro/.test(t.id)&&window.Explorer?window.Explorer.html({productId:"iphone-18-pro-max",price:g["iphone-18-pro-max"]?h(g["iphone-18-pro-max"].fromPrice):""}):""}
    <section class="section wrap narrow about reveal"><h2 class="eyebrow">Acerca del ${i(t.name)}</h2>${t.description?`<p class="about__text">${i(t.description)}</p>`:""}
      <p class="about__seo">Compra tu ${i(t.name)} original y sellado en ${i(o.name)}: entrega el mismo d\xEDa en ${i(o.sameDayCity)}, env\xEDos a toda Colombia en ${i(o.otherCitiesDays)} y pago hasta en ${o.installments} cuotas con tu tarjeta de cr\xE9dito. Mira todos los <a href="${$.cat(t.cat)}">${i(B(t.cat))} disponibles</a>.</p></section>
    ${d.length?Y("Arma tu combo perfecto",d,`Lo que m\xE1s compran junto con ${i(t.name)}.`):""}
    <section class="section wrap narrow"><h2 class="h2 center">Preguntas frecuentes</h2>${$e(ee)}</section>

    <div class="buybar" id="buybar" aria-hidden="true">
      <div class="buybar__inner wrap">
        <div><b>${i(t.name)}</b><span class="muted small" id="barLabel"></span></div>
        <div class="buybar__right"><span id="barPrice"></span><button class="btn btn--primary btn--sm" id="barAdd">Comprar</button></div>
      </div>
    </div>`}function je(){const{m:e}=u,a=()=>e.variants.find(r=>r.color===u.color&&r.config===u.config),t=()=>{if(!u.trade)return 0;const[,r]=o.tradeIn.devices[u.trade.d],[,b]=o.tradeIn.conditions[u.trade.c];return Math.round(r*b/1e4)*1e4},s=()=>{const r=a(),b=e.colors.find(A=>A.id===u.color),C=u.protect?Q(e,r.price):0,_=t(),M=r.price+C-_;c("#priceBox").innerHTML=`
        <p class="price">${h(r.price)} ${r.compare&&r.compare>r.price?`<s>${h(r.compare)}</s>`:""}</p>
        <p class="price__cuota">o <b>${x(r.price)}/mes</b> en ${o.installments} cuotas \xB7 ${i(o.installmentsNote)}</p>
        ${o.financing?`<p class="price__alt">${y("card",16)} \xBFSin tarjeta de cr\xE9dito? P\xE1galo a cuotas con <b>${i(o.financing.name)}</b>, solo con tu c\xE9dula.</p>`:""}
        ${_||C?`<p class="price__total">Total con ${[C?"protecci\xF3n":"",_?"retoma":""].filter(Boolean).join(" y ")}: <b>${h(M)}</b>${_?` <span class="ok">(\u2212${h(_)})</span>`:""}</p>`:""}`,c("#colorName").textContent=b.name,w("#colorOpts [data-color]").forEach(A=>A.classList.toggle("is-on",A.dataset.color===u.color)),c("#configOpts")&&(c("#configOpts").innerHTML=e.configs.map(A=>{const q=e.variants.find(Ee=>Ee.config===A&&Ee.color===u.color);return`<button class="config ${A===u.config?"is-on":""}" data-config="${i(A)}" ${q?"":"disabled"}>
            <span>${i(A)}</span><span class="config__price">${q?h(q.price)+(L&&!q.available?" \xB7 Agotado":""):"No disponible en este color"}</span></button>`}).join("")),c("#protectPrice")&&(c("#protectPrice").textContent=h(Q(e,r.price)));const T=b.images;u.img=Math.min(u.img,T.length-1);const f=c("#galMain");f.alt=N(e,b,u.img),f.getAttribute("src")!==T[u.img]&&(f.classList.remove("fade"),f.offsetWidth,f.classList.add("fade"),f.src=T[u.img]),c("#thumbs").innerHTML=T.map((A,q)=>`<button class="thumb ${q===u.img?"is-on":""}" data-img="${q}" aria-label="Ver imagen ${q+1} de ${i(e.name)}"><img src="${A}" alt="" loading="lazy"></button>`).join("");const D=[u.config!=="Est\xE1ndar"?u.config:"",b.name].filter(Boolean).join(" \xB7 ");c("#barLabel").textContent=" "+D,c("#barPrice").textContent=h(r.price);const Z=!r.available;c("#addBtn").disabled=Z,c("#barAdd").disabled=Z,c("#addBtn").textContent=Z?L?"Agotado":"Disponible muy pronto":"Comprar",c("#barAdd").textContent=Z?"Agotado":"Comprar",c("#waBuy").href=I(`Hola ${o.name}, me interesa el ${e.name} (${D}) de ${h(r.price)}.`+(_?` Quiero entregar mi ${o.tradeIn.devices[u.trade.d][0]} (${o.tradeIn.conditions[u.trade.c][0]}) en retoma.`:"")+" \xBFEst\xE1 disponible?"),c("#waFloat").href=c("#waBuy").href,history.replaceState(null,"",$.p(e,`color=${u.color}${ce(e)?"&config="+encodeURIComponent(u.config):""}`))},n=()=>{const r=a(),b=t();de({id:e.id,color:r.color,config:r.config,protection:u.protect?Q(e,r.price):0,tradeIn:b?{device:o.tradeIn.devices[u.trade.d][0],cond:o.tradeIn.conditions[u.trade.c][0],value:b}:null})},l=c(".pdp");l.addEventListener("click",r=>{const b=r.target.closest("[data-color]"),C=r.target.closest("[data-config]"),_=r.target.closest("[data-img]"),M=r.target.closest("[data-gal]"),T=r.target.closest("[data-trade]");if(b&&(u.color=b.dataset.color,u.img=0,a()||(u.config=e.variants.filter(f=>f.color===u.color).sort((f,D)=>f.price-D.price)[0].config)),C&&!C.disabled&&(u.config=C.dataset.config),_&&(u.img=+_.dataset.img),M){const f=e.colors.find(D=>D.id===u.color).images.length;u.img=(u.img+ +M.dataset.gal+f)%f}if(T){const f=T.dataset.trade==="yes";w("[data-trade]").forEach(D=>D.classList.toggle("is-on",D===T)),c("#tradeForm").hidden=!f,u.trade=f?{d:+c("#tradeDevice").value,c:+c("#tradeCond").value}:null}(b||C||_||M||T)&&s()}),l.addEventListener("change",r=>{r.target.id==="protect"&&(u.protect=r.target.checked),(r.target.id==="tradeDevice"||r.target.id==="tradeCond")&&(u.trade={d:+c("#tradeDevice").value,c:+c("#tradeCond").value}),s()}),c("#addBtn").addEventListener("click",n),c("#barAdd").addEventListener("click",n);let p=null;c(".gallery").addEventListener("touchstart",r=>{p=r.touches[0].clientX},{passive:!0}),c(".gallery").addEventListener("touchend",r=>{if(p===null)return;const b=r.changedTouches[0].clientX-p;p=null,Math.abs(b)>40&&c(`[data-gal="${b<0?1:-1}"]`).click()});const d=()=>{const r=c("#sameDay");if(!r)return clearInterval(u.timer);if(!o.sameDayCutoff){r.innerHTML=`<b>Rec\xEDbelo hoy en ${o.sameDayCity}</b><br><span class="muted small">Entrega el mismo d\xEDa en ${o.sameDayCity}.</span>`;return}const{h:b,m:C,day:_}=Le(),M=o.sameDayCutoff*60-(b*60+C);r.innerHTML=M>0&&_!=="Sun"?`<b>Rec\xEDbelo hoy en ${o.sameDayCity}</b><br><span class="muted small">Compra en las pr\xF3ximas <b class="accent">${Math.floor(M/60)} h ${M%60} min</b></span>`:`<b>Rec\xEDbelo ${_==="Sat"||_==="Sun"?"el lunes":"ma\xF1ana"} en ${o.sameDayCity}</b><br><span class="muted small">Pide antes de las ${o.sameDayCutoff}:00 para entrega el mismo d\xEDa.</span>`};d(),u.timer=setInterval(d,3e4),new IntersectionObserver(([r])=>{const b=c("#buybar");if(!b)return;const C=!r.isIntersecting&&r.boundingClientRect.top<0;b.classList.toggle("show",C),b.setAttribute("aria-hidden",String(!C))}).observe(c("#addBtn")),s()}function qe(){if(!v.length)return'<section class="wrap narrow section center"><h1 class="h2">Tu bolsa est\xE1 vac\xEDa</h1><p class="lead">Agrega un producto para continuar.</p><a class="btn btn--primary" href="/">Ir a la tienda</a></section>';const e=K(),a=[["tarjeta","Tarjeta de cr\xE9dito",`Hasta ${o.installments} cuotas \xB7 ${o.installmentsNote}`],["sistecredito","Sistecr\xE9dito","Cr\xE9dito solo con tu c\xE9dula, sin tarjeta"]];return`
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
            <label class="radio"><input type="radio" name="entrega" value="envio" checked><span><b>Env\xEDo a domicilio</b><br><span class="small muted">${e.ship===null?"Se calcula al pagar":e.ship?h(e.ship):"Gratis"} \xB7 Mismo d\xEDa en ${o.sameDayCity}, ${o.otherCitiesDays} al resto del pa\xEDs</span></span></label>
          </div>
          <div class="fields" id="shipFields">
            <label>Departamento<input name="departamento" required autocomplete="address-level1" value=""></label>
            <label>Ciudad<input name="ciudad" required autocomplete="address-level2" value=""></label>
            <label class="span2">Direcci\xF3n<input name="direccion" required autocomplete="street-address" placeholder="Calle 00 # 00-00, apto"></label>
          </div>
        </fieldset>
        <fieldset><legend>3. Pago</legend>
          <div class="radios">${a.map(([t,s,n],l)=>`<label class="radio"><input type="radio" name="pago" value="${s}" ${l?"":"checked"}><span><b>${s}</b><br><span class="small muted">${n}</span></span></label>`).join("")}</div>
        </fieldset>
        <label class="check"><input type="checkbox" name="acepto" required> Acepto los t\xE9rminos y condiciones y autorizo el tratamiento de mis datos personales (Ley 1581 de 2012).</label>
        <p class="form-error" id="formError" hidden>Revisa los campos marcados.</p>
        <button class="btn btn--primary btn--lg btn--block" type="submit">Confirmar pedido \xB7 ${h(e.total)}</button>
        <p class="small muted center">Al confirmar, un asesor te enviar\xE1 el enlace de pago seguro por WhatsApp.</p>
      </form>
      <aside class="checkout__summary">
        <h2 class="h3">Resumen</h2>
        <ul class="lines lines--compact">${v.map(t=>`<li class="line"><span class="line__img"><img src="${P(g[t.id],t.color)}" alt=""><i>${t.qty}</i></span>
          <div class="line__info"><b class="small">${i(g[t.id].name)}</b><p class="small muted">${i(J(t))}</p>${t.protection?`<p class="small">+ ${i(o.protection.name)}</p>`:""}${t.tradeIn?`<p class="small ok">Retoma \u2212${h(t.tradeIn.value)}</p>`:""}</div>
          <b class="small">${h(V(t))}</b></li>`).join("")}</ul>
        <dl class="sum">
          <div><dt>Subtotal</dt><dd>${h(e.sub)}</dd></div>
          ${e.trade?`<div class="ok"><dt>Retoma (estimado)</dt><dd>\u2212${h(e.trade)}</dd></div>`:""}
          <div><dt>Env\xEDo</dt><dd>${e.ship===null?"Se calcula al pagar":e.ship?h(e.ship):"Gratis"}</dd></div>
          <div class="sum__total"><dt>Total</dt><dd>${h(e.total)}</dd></div>
        </dl>
        <p class="small muted">o ${x(e.total)}/mes en ${o.installments} cuotas</p>
        <ul class="trust trust--col"><li>${y("shield",16)} Productos originales y sellados</li><li>${y("back",16)} Derecho de retracto de 5 d\xEDas h\xE1biles</li></ul>
      </aside>
    </section>`}function Be(){const e=c("#checkoutForm");e&&(e.addEventListener("change",a=>{if(a.target.name==="entrega"){const t=a.target.value==="envio";c("#shipFields").hidden=!t,w("#shipFields input").forEach(s=>{s.required=t})}}),e.addEventListener("submit",a=>{a.preventDefault(),w(".invalid",e).forEach(p=>p.classList.remove("invalid"));const t=w("input",e).filter(p=>!p.checkValidity());if(t.forEach(p=>(p.closest("label")||p).classList.add("invalid")),c("#formError").hidden=!t.length,t.length){t[0].focus();return}const s=Object.fromEntries(new FormData(e)),n="NV-"+Date.now().toString(36).toUpperCase().slice(-6),l=pe(`

Pedido ${n}
Cliente: ${s.nombre} \xB7 CC ${s.cedula}
Correo: ${s.email} \xB7 Cel: ${s.celular}
`+(s.entrega==="envio"?`Entrega: ${s.direccion}, ${s.ciudad} (${s.departamento})`:"Entrega: Retiro en tienda")+`
Pago: ${s.pago}`);R.set("nova-last-order",{order:n,name:s.nombre.split(" ")[0],wa:I(l)}),window.open(I(l),"_blank","noopener"),v=[],W(),H("/gracias/")}))}function Re(){const e=R.get("nova-last-order",null);return`<section class="wrap narrow section center thanks">
      <div class="thanks__icon">\u2713</div>
      <h1 class="h2">\xA1Gracias${e?", "+i(e.name):""}! Recibimos tu pedido.</h1>
      ${e?`<p class="lead">N\xFAmero de pedido <b>${i(e.order)}</b>. Un asesor te escribir\xE1 por WhatsApp con el enlace de pago seguro y la confirmaci\xF3n de entrega.</p>
      <a class="btn btn--wa" href="${e.wa}" target="_blank" rel="noopener">Abrir WhatsApp de nuevo</a>`:""}
      <p><a class="btn btn--link" href="/">Seguir comprando \u203A</a></p></section>`}const E=o.siteUrl||location.origin,Oe=(e,a=158)=>e.length>a?e.slice(0,a-1).replace(/\s+\S*$/,"")+"\u2026":e,F=e=>U(e,1200)||"",ye=e=>({"@type":"BreadcrumbList",itemListElement:e.map(([a,t],s)=>({"@type":"ListItem",position:s+1,name:a,item:E+t}))}),_e={"@id":E+"/#tienda"};function Ne(e){const a=S.find(s=>s.id===e[0]);if(!e.length){const s=g[o.hero.id]||k[0];return{title:`Tienda de iPhone en ${o.sameDayCity} y Colombia \xB7 ${o.name}`,desc:`Compra iPhone, MacBook, iPad, AirPods y Apple Watch originales y sellados. Entrega el mismo d\xEDa en ${o.sameDayCity}, env\xEDos a toda Colombia y hasta ${o.installments} cuotas.`,image:s&&F(P(s)),ld:[{"@type":"WebPage","@id":E+"/#portada",url:E+"/",name:`Tienda de iPhone en ${o.sameDayCity} y Colombia`,isPartOf:{"@id":E+"/#sitio"},about:_e,inLanguage:"es-CO"},{"@type":"FAQPage",mainEntity:ee.map(([n,l])=>({"@type":"Question",name:n,acceptedAnswer:{"@type":"Answer",text:l}}))}]}}if(a&&e.length===1){const s=ae(k.filter(l=>l.cat===a.id),ve(a.id)),n=a.seo||{};return{title:`${n.title||a.name+" en Colombia"} \xB7 ${o.name}`,desc:n.desc||`${a.name} originales en Colombia. Entrega el mismo d\xEDa en ${o.sameDayCity}.`,image:s[0]&&F(P(s[0])),ld:[{"@type":"CollectionPage",url:E+$.cat(a.id),name:n.title||a.name,isPartOf:{"@id":E+"/#sitio"},inLanguage:"es-CO",mainEntity:{"@type":"ItemList",itemListElement:s.map((l,p)=>({"@type":"ListItem",position:p+1,url:E+$.p(l),name:l.name}))}},ye([["Inicio","/"],[a.name,$.cat(a.id)]])]}}const t=e.length===2&&g[e[1]];if(t){const s=t.variants.map(l=>l.price),n={"@type":"AggregateOffer",priceCurrency:"COP",lowPrice:Math.min(...s),highPrice:Math.max(...s),offerCount:t.variants.length,url:E+$.p(t),seller:_e,itemCondition:"https://schema.org/NewCondition"};return L&&(n.availability=t.variants.some(l=>l.available)?"https://schema.org/InStock":"https://schema.org/OutOfStock"),{title:`${t.name} precio en Colombia \xB7 ${o.name}`,desc:Oe(`Compra ${t.name} original y sellado desde ${h(t.fromPrice)} o ${x(t.fromPrice)}/mes en ${o.installments} cuotas. Entrega el mismo d\xEDa en ${o.sameDayCity} y env\xEDos a toda Colombia.`),image:F(P(t)),type:"product",ld:[{"@type":"Product",name:t.name,url:E+$.p(t),description:t.description||t.tagline||t.name,brand:{"@type":"Brand",name:"Apple"},category:B(t.cat),image:t.colors.flatMap(l=>l.images.slice(0,2)).slice(0,8).map(F),...t.colors.length>1&&O(t)?{color:t.colors.map(l=>l.name).join(", ")}:{},offers:n},ye([["Inicio","/"],[B(t.cat),$.cat(t.cat)],[t.name,$.p(t)]])]}}return null}function Fe(e,a){const t=e||{title:`P\xE1gina no encontrada \xB7 ${o.name}`,desc:"",noindex:!0},s=(l,p)=>{const d=document.head.querySelector(l);d&&d.setAttribute(d.tagName==="LINK"?"href":"content",p)};document.title=t.title,s('meta[name="description"]',t.desc),s('meta[name="robots"]',t.noindex?"noindex,follow":"index,follow,max-image-preview:large"),s('link[rel="canonical"]',E+a),s('meta[property="og:type"]',t.type||"website"),s('meta[property="og:url"]',E+a),s('meta[property="og:title"]',t.title),s('meta[property="og:description"]',t.desc),t.image&&(s('meta[property="og:image"]',t.image),s('meta[name="twitter:image"]',t.image)),s('meta[name="twitter:title"]',t.title),s('meta[name="twitter:description"]',t.desc);const n=c("#ldPage");n&&(n.textContent=t.ld?JSON.stringify({"@context":"https://schema.org","@graph":t.ld}):"{}")}window.STORE_PAGES=()=>["/",...S.filter(e=>k.some(a=>a.cat===e.id)).map(e=>$.cat(e.id)),...k.map(e=>$.p(e))].map(e=>{const a=g[e.split("/").filter(Boolean)[1]];return{path:e,images:a?a.colors.flatMap(t=>t.images.slice(0,2)).slice(0,8).map(F):[],title:a?a.name:""}});const oe=()=>'<section class="wrap narrow section center"><h1 class="h2">No encontramos esta p\xE1gina</h1><a class="btn btn--primary" href="/">Volver al inicio</a></section>';function He(){if(!location.hash.startsWith("#/"))return;const[e,a]=location.hash.slice(1).split("?"),[t,s]=e.split("/").filter(Boolean),n=t==="c"&&s?$.cat(s):t==="p"&&g[s]?$.p(g[s]):t?`/${t}/`:"/";history.replaceState(null,"",n+(a?"?"+a:""))}function j(){He();const e=new URLSearchParams(location.search);let a=location.pathname.split("/").filter(Boolean);a.length===2&&g[a[1]]&&g[a[1]].cat!==a[0]&&(history.replaceState(null,"",$.p(g[a[1]],location.search.slice(1))),a=[g[a[1]].cat,a[1]]),u&&u.timer&&clearInterval(u.timer),u=null;const t=a.length===1&&S.some(m=>m.id===a[0]);let s,n=Ne(a);a.length?t?s=Te(a[0],e):a.length===2&&g[a[1]]?s=De(a[1],e):a[0]==="checkout"?(s=qe(),n={title:`Finalizar compra \xB7 ${o.name}`,desc:"",noindex:!0}):a[0]==="gracias"?(s=Re(),n={title:`Gracias por tu compra \xB7 ${o.name}`,desc:"",noindex:!0}):(s=oe(),n=null):s=Me();const l=!j.done;j.done=!0,G.innerHTML=s,G.removeAttribute("data-prerendered"),Fe(n,a.length?`/${a.join("/")}/`:"/");const p=t?a[0]:a.length===2&&g[a[1]]?g[a[1]].cat:"";w("#navLinks a").forEach(m=>m.classList.toggle("is-on",m.dataset.cat===p)),c("#waFloat").href=I(`Hola ${o.name}, quiero asesor\xEDa para comprar un producto Apple.`),window.Explorer&&window.Explorer.mount(G),u&&je(),a[0]==="checkout"&&Be(),We(),ke();const d=location.pathname;j.last!==d&&(l||window.scrollTo({top:0}),j.last=d),l&&!window.__PRERENDER&&(document.documentElement.classList.add("no-anim"),w(".reveal").forEach(m=>{m.getBoundingClientRect().top<innerHeight&&m.classList.add("in")}),requestAnimationFrame(()=>requestAnimationFrame(()=>document.documentElement.classList.remove("no-anim")))),document.documentElement.dataset.ready=d}function We(){w(".shelf").forEach(t=>t.addEventListener("click",s=>{const n=s.target.closest("[data-scroll]");if(!n)return;const l=c(".shelf__track",t);l.scrollBy({left:+n.dataset.scroll*l.clientWidth*.8,behavior:"smooth"})})),w(".card").forEach(t=>{t.addEventListener("mouseover",s=>{const n=s.target.closest("[data-swap]");n&&(c("[data-card-img]",t).src=n.dataset.swap)}),t.addEventListener("click",s=>{const n=s.target.closest("[data-color]");n&&(s.preventDefault(),H(t.getAttribute("href")+"?color="+n.dataset.color))})});const e=c("#sortSel");e&&e.addEventListener("change",()=>{H(location.pathname+"?orden="+e.value,!0)});const a=c("#tradeQuick");if(a){const t=()=>{const[,s]=o.tradeIn.devices[a.device.value],[,n]=o.tradeIn.conditions[a.cond.value];c("#tradeQuickVal").textContent=h(Math.round(s*n/1e4)*1e4)};a.addEventListener("change",t),t()}Ve(),ze()}function Ve(){const e=matchMedia("(prefers-reduced-motion: reduce)").matches;w(".hero__media").forEach(a=>{const t=c(".hero__video",a);if(t&&!e&&!window.__PRERENDER&&(t.addEventListener("playing",()=>a.classList.add("is-playing"),{once:!0}),new IntersectionObserver(([l])=>{l.isIntersecting?t.play().catch(()=>{}):t.pause()},{threshold:.2}).observe(a)),e||!matchMedia("(hover: hover) and (pointer: fine)").matches)return;const s=a.closest(".hero");s.addEventListener("pointermove",n=>{const l=a.getBoundingClientRect(),p=(n.clientX-l.left)/l.width-.5,d=(n.clientY-l.top)/l.height-.5;a.style.setProperty("--rx",`${(-d*10).toFixed(2)}deg`),a.style.setProperty("--ry",`${(p*14).toFixed(2)}deg`)}),s.addEventListener("pointerleave",()=>{a.style.setProperty("--rx","0deg"),a.style.setProperty("--ry","0deg")})})}const ne="IntersectionObserver"in window?new IntersectionObserver(e=>e.forEach(a=>{a.isIntersecting&&(a.target.classList.add("in"),ne.unobserve(a.target))}),{rootMargin:"0px 0px -8% 0px"}):null,ze=()=>w(".reveal:not(.in)").forEach(e=>ne&&!window.__PRERENDER?ne.observe(e):e.classList.add("in")),we=()=>{c("#search").hidden=!1,document.body.classList.add("locked"),c("#searchInput").value="",ie(""),setTimeout(()=>c("#searchInput").focus(),30)},Ce=()=>{c("#search").hidden=!0,document.body.classList.remove("locked")};function ie(e){const a=re(e.trim()),t=a?k.filter(s=>a.split(/\s+/).every(n=>re(`${s.name} ${B(s.cat)} ${s.tagline}`).includes(n))).slice(0,8):[];c("#searchResults").innerHTML=a?t.length?t.map(s=>`<a class="sres" href="${$.p(s)}"><img src="${P(s)}" alt="${i(s.name)}"><span><b>${i(s.name)}</b><span class="small muted">Desde ${h(s.fromPrice)} \xB7 ${x(s.fromPrice)}/mes</span></span></a>`).join(""):`<p class="muted">Sin resultados para \u201C${i(e)}\u201D. <a href="${I("Hola, busco: "+e)}" target="_blank" rel="noopener">Preg\xFAntanos por WhatsApp</a>.</p>`:`<p class="eyebrow">B\xFAsquedas populares</p><div class="chips">${["iPhone 18 Pro","AirPods Pro 3","MacBook Air","iPad","Apple Watch","Cargador"].map(s=>`<button class="chip" data-q="${s}">${s}</button>`).join("")}</div>`}c("#openSearch").addEventListener("click",we),c("#searchInput").addEventListener("input",e=>ie(e.target.value)),c("#search").addEventListener("click",e=>{(e.target.id==="search"||e.target.closest("[data-close]")||e.target.closest(".sres"))&&Ce();const a=e.target.closest("[data-q]");a&&(c("#searchInput").value=a.dataset.q,ie(a.dataset.q))}),document.addEventListener("keydown",e=>{e.key==="Escape"&&(Ce(),X(),ke()),e.key==="/"&&!/input|textarea|select/i.test(document.activeElement.tagName)&&(e.preventDefault(),we())});function Ze(){c(".nav__name").textContent=o.name,c("#navLinks").innerHTML=S.map(m=>`<a href="${$.cat(m.id)}" data-cat="${m.id}">${m.name}</a>`).join("")+`<a href="${I("Hola, quiero asesor\xEDa")}" target="_blank" rel="noopener" class="nav__help">Asesor\xEDa</a><a href="https://${o.shopifyDomain}" class="nav__back" title="Ir a la p\xE1gina principal de Celada Shopper">\u2190 Volver a Celada Shopper</a>`;const e=c("#announce");e.innerHTML=o.announcements.map((m,r)=>`<p class="${r?"":"on"}">${i(m)}</p>`).join("");let a=0;setInterval(()=>{const m=w("p",e);m[a].classList.remove("on"),a=(a+1)%m.length,m[a].classList.add("on")},4200);const t=(m,r)=>`<details class="footer__col"><summary>${m}<svg class="footer__chev" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></summary><div class="footer__links">${r}</div></details>`,s=`https://${o.shopifyDomain}`,n={whatsapp:'<path d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3Zm0 23.7c-2 0-4-.5-5.7-1.6l-.4-.2-3.9 1 1-3.8-.3-.4A10.7 10.7 0 1 1 16 26.7Zm5.9-8c-.3-.2-1.9-1-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1a8.8 8.8 0 0 1-4.4-3.8c-.3-.6.3-.5 1-1.7.1-.2 0-.4 0-.6l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.3 1.4 3.5c.2.2 2.4 3.7 5.8 5.1 2.2.9 3 1 4.1.8.7-.1 1.9-.8 2.2-1.5.3-.8.3-1.4.2-1.5l-.6-.3Z"/>',instagram:'<path d="M16 5.6c3.4 0 3.8 0 5.1.1 3.4.2 5 1.8 5.2 5.2.1 1.3.1 1.7.1 5.1s0 3.8-.1 5.1c-.2 3.4-1.8 5-5.2 5.2-1.3.1-1.7.1-5.1.1s-3.8 0-5.1-.1c-3.4-.2-5-1.8-5.2-5.2-.1-1.3-.1-1.7-.1-5.1s0-3.8.1-5.1c.2-3.4 1.8-5 5.2-5.2 1.3-.1 1.7-.1 5.1-.1ZM16 3c-3.5 0-4 0-5.3.1C6 3.3 3.3 6 3.1 10.7 3 12 3 12.5 3 16s0 4 .1 5.3C3.3 26 6 28.7 10.7 28.9c1.3.1 1.8.1 5.3.1s4 0 5.3-.1c4.7-.2 7.4-2.9 7.6-7.6.1-1.3.1-1.8.1-5.3s0-4-.1-5.3C28.7 6 26 3.3 21.3 3.1 20 3 19.5 3 16 3Zm0 6.3a6.7 6.7 0 1 0 0 13.4 6.7 6.7 0 0 0 0-13.4Zm0 11a4.3 4.3 0 1 1 0-8.6 4.3 4.3 0 0 1 0 8.6Zm7-12.9a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z"/>',tiktok:'<path d="M22.5 3h-4.3v17.4a3.8 3.8 0 1 1-3.8-3.8c.4 0 .8.1 1.1.2v-4.4a8.1 8.1 0 1 0 7 8V11.6a10.3 10.3 0 0 0 6 1.9V9.2a6 6 0 0 1-6-6.2Z"/>'},l=(m,r,b)=>`<a class="footer__social" href="${r}" target="_blank" rel="noopener" aria-label="${b}"><svg viewBox="0 0 32 32" width="18" height="18" fill="currentColor" aria-hidden="true">${n[m]}</svg></a>`;c("#footer").innerHTML=`
      <div class="wrap">
        <div class="footer__top">
          <div class="footer__brand">
            <a class="footer__logo" href="/"><span class="nav__mark">C</span><span>${i(o.name)}</span></a>
            <p>Productos Apple originales y sellados. Entrega el mismo d\xEDa en ${i(o.sameDayCity)} y env\xEDos a toda Colombia.</p>
            <div class="footer__socials">${l("whatsapp",I("Hola "+o.name),"WhatsApp")}${l("instagram",o.instagram,"Instagram")}${l("tiktok",o.tiktok,"TikTok")}</div>
          </div>
          <nav class="footer__cols" aria-label="Pie de p\xE1gina">
            ${t("Comprar",S.map(m=>`<a href="${$.cat(m.id)}">${m.name}</a>`).join(""))}
            ${t("Ayuda",`<a href="${s}/policies/shipping-policy">Env\xEDos y entregas</a><a href="${s}/policies/refund-policy">Devoluciones y retracto</a><a href="${s}/pages/contact">Contacto</a>`)}
            ${t("Nosotros",`<a href="${s}">Casillero Celada Shopper</a><a href="${s}/pages/quienes-somos">Qui\xE9nes somos</a><a href="${s}/policies/terms-of-service">T\xE9rminos y condiciones</a><a href="${s}/policies/privacy-policy">Pol\xEDtica de privacidad</a>`)}
          </nav>
          <div class="footer__contact">
            <p class="footer__contact-title">\xBFNecesitas ayuda para elegir?</p>
            <a class="btn btn--wa btn--sm" href="${I("Hola "+o.name+", necesito asesor\xEDa")}" target="_blank" rel="noopener">Escr\xEDbenos por WhatsApp</a>
            <p class="footer__contact-meta"><a href="tel:${o.phone.replace(/\s/g,"")}">${i(o.phone)}</a><br><a href="mailto:${o.email}">${i(o.email)}</a>${o.address?"<br>"+i(o.address):""}${o.hours?"<br>"+i(o.hours):""}</p>
          </div>
        </div>
        <div class="footer__pay"><span>Medios de pago</span>${z()}</div>
        <div class="footer__legal">
          <p>${o.legalName?i(o.legalName)+" \xB7 ":""}${o.nit?"NIT "+i(o.nit)+" \xB7 ":""}Precios en pesos colombianos. Im\xE1genes de referencia.</p>
          <p>Apple, iPhone, iPad, Mac, Apple Watch y AirPods son marcas registradas de Apple Inc. ${i(o.name)} es un comercio independiente.</p>
          <p><a href="https://www.sic.gov.co" target="_blank" rel="noopener">Superintendencia de Industria y Comercio</a> \xB7 \xA9 ${new Date().getFullYear()} ${i(o.name)}</p>
        </div>
      </div>`;const p=matchMedia("(max-width: 700px)"),d=()=>w("#footer .footer__col").forEach(m=>{m.open=!p.matches});d(),p.addEventListener("change",d)}const ke=()=>{document.body.classList.remove("menu-open"),c("#burger").setAttribute("aria-expanded","false")};c("#burger").addEventListener("click",()=>{const e=document.body.classList.toggle("menu-open");c("#burger").setAttribute("aria-expanded",String(e))}),window.addEventListener("scroll",()=>c("#nav").classList.toggle("scrolled",window.scrollY>8),{passive:!0}),Ze(),me(),ue(),document.addEventListener("click",e=>{const a=e.target.closest("a[href]");if(!a||e.defaultPrevented||e.button||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||a.target==="_blank"||a.hasAttribute("download"))return;const t=new URL(a.href,location.href);t.origin!==location.origin||/\.[a-z0-9]+$/i.test(t.pathname)||t.pathname===location.pathname&&t.search===location.search&&t.hash||(e.preventDefault(),H(t.pathname+t.search))}),window.addEventListener("popstate",j),window.addEventListener("hashchange",()=>location.hash.startsWith("#/")&&j()),j()})();
