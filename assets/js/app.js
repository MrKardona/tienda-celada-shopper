(async()=>{"use strict";const o=window.STORE,{catalog:T,live:L}=await window.loadCatalog();document.documentElement.classList.toggle("is-demo",!L);const x=window.CATEGORIES,g=Object.fromEntries(T.map(e=>[e.id,e])),i=(e,a=document)=>a.querySelector(e),w=(e,a=document)=>[...a.querySelectorAll(e)],J=i("#app"),p=e=>"$"+Math.round(e).toLocaleString("es-CO"),P=e=>p(Math.ceil(e/o.installments)),l=e=>String(e??"").replace(/[&<>"']/g,a=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[a]),X=e=>String(e).normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase(),D=e=>(x.find(a=>a.id===e)||{}).name||"",A=(e,a)=>(a&&e.colors.find(t=>t.id===a)||e.colors[0]).images[0],Y=(e,a)=>e&&/[?&]width=\d+/.test(e)?e.replace(/width=\d+/,`width=${a}`):e,S=e=>`https://wa.me/${o.whatsapp}?text=${encodeURIComponent(e)}`,q={get(e,a){try{return JSON.parse(localStorage.getItem(e))??a}catch{return a}},set(e,a){try{localStorage.setItem(e,JSON.stringify(a))}catch{}}},H=(e,a)=>o.protection.cats.includes(e.cat)?Math.max(o.protection.min,Math.round(a*o.protection.rate/1e3)*1e3):0,K=e=>e.configs.length>1||e.configs[0]!=="Est\xE1ndar",j=e=>e.colors.some(a=>a.hex),he=()=>{const e=Object.fromEntries(new Intl.DateTimeFormat("en-US",{timeZone:"America/Bogota",hour:"numeric",minute:"numeric",weekday:"short",hour12:!1}).formatToParts(new Date).map(a=>[a.type,a.value]));return{h:+e.hour%24,m:+e.minute,day:e.weekday}};let ee;const ge=e=>{const a=i("#toast");a.innerHTML=e,a.classList.add("show"),clearTimeout(ee),ee=setTimeout(()=>a.classList.remove("show"),2600)};let b=q.get("nova-cart",[]).map(e=>{const a=g[e.id],t=a&&a.variants.find(s=>s.color===e.color&&s.config===e.config);return t?{...e,price:t.price,vid:t.vid}:null}).filter(Boolean);const M=()=>{q.set("nova-cart",b),se(),oe()},B=e=>(e.price+(e.protection||0))*e.qty,F=()=>{const e=b.reduce((s,n)=>s+B(n),0),a=b.reduce((s,n)=>s+(n.tradeIn?n.tradeIn.value:0),0);if(L)return{sub:e,trade:a,ship:null,total:e};const t=o.freeShippingFrom?e===0||e>=o.freeShippingFrom?0:o.shippingCost:null;return{sub:e,trade:a,ship:t,total:Math.max(0,e-a+t)}};function ae({id:e,color:a,config:t,qty:s=1,protection:n=0,tradeIn:m=null}){const c=g[e],u=c.variants.find(h=>h.color===a&&h.config===t)||c.variants.find(h=>h.available)||c.variants[0];if(!u.available){ge("Este producto est\xE1 agotado. Escr\xEDbenos por WhatsApp y te avisamos.");return}const _=[e,u.color,u.config,n?"p":"",m?m.device+m.cond:""].join("|"),r=b.find(h=>h.key===_);r?r.qty+=s:b.push({key:_,id:e,color:u.color,config:u.config,qty:s,price:u.price,protection:n,tradeIn:m,sku:u.sku,vid:u.vid}),M(),ne()}const W=e=>{const t=g[e.id].colors.find(s=>s.id===e.color);return[e.config!=="Est\xE1ndar"?e.config:"",t?t.name:""].filter(Boolean).join(" \xB7 ")},te=(e="")=>{const a=F(),t=b.map(s=>`\u2022 ${s.qty} \xD7 ${g[s.id].name} (${W(s)}) \u2014 ${p(B(s))}`+(s.protection?`
   + ${o.protection.name}`:"")+(s.tradeIn?`
   Retoma: ${s.tradeIn.device} (${s.tradeIn.cond}) \u2212${p(s.tradeIn.value)}`:""));return`Hola ${o.name}, quiero hacer este pedido:

${t.join(`
`)}

Subtotal: ${p(a.sub)}`+(a.trade?`
Descuento retoma (estimado): \u2212${p(a.trade)}`:"")+`
Env\xEDo: ${a.ship===null?"Se calcula al pagar":a.ship?p(a.ship):"Gratis"}
Total: ${p(a.total)}${e}`},be=()=>b.filter(e=>e.tradeIn).map(e=>`Retoma solicitada para ${g[e.id].name}: ${e.tradeIn.device} (${e.tradeIn.cond}), valor estimado ${p(e.tradeIn.value)}`).join(" | "),ve=()=>window.shopifyCheckoutUrl(b,be());function se(){const e=b.reduce((t,s)=>t+s.qty,0),a=i("#cartCount");a.textContent=e,a.hidden=!e}function oe(){const e=i("#cart"),a=F(),t=Math.max(0,o.freeShippingFrom-a.sub),s=Math.min(100,a.sub/o.freeShippingFrom*100),n=new Set(b.map(c=>c.id)),m=["airpods-pro-3","cargador-magsafe","airtag","adaptador-40w"].filter(c=>g[c]&&g[c].available!==!1&&!n.has(c)).slice(0,2);e.innerHTML=`
      <div class="drawer__head"><h2>Tu bolsa</h2><button class="icon-btn" data-close-cart aria-label="Cerrar">\u2715</button></div>
      ${b.length?`
      ${L||!o.freeShippingFrom?"":`<div class="ship-meter">
        <p>${t?`Te faltan <b>${p(t)}</b> para tener <b>env\xEDo gratis</b>`:"\u{1F389} \xA1Tu pedido tiene <b>env\xEDo gratis</b>!"}</p>
        <div class="ship-meter__bar"><span style="width:${s}%"></span></div>
      </div>`}
      <ul class="lines">${b.map((c,u)=>{const _=g[c.id];return`<li class="line">
          <a href="#/p/${_.id}?color=${c.color}" class="line__img"><img src="${A(_,c.color)}" alt=""></a>
          <div class="line__info">
            <a href="#/p/${_.id}?color=${c.color}" class="line__name">${l(_.name)}</a>
            <p class="muted small">${l(W(c))}</p>
            ${c.protection?`<p class="small">\u{1F6E1}\uFE0F ${l(o.protection.name)} \xB7 ${p(c.protection)}</p>`:""}
            ${c.tradeIn?`<p class="small ok">\u{1F501} Retoma ${l(c.tradeIn.device)} \xB7 \u2212${p(c.tradeIn.value)}</p>`:""}
            <div class="line__row">
              <div class="qty" role="group" aria-label="Cantidad">
                <button data-qty="${u}" data-d="-1" aria-label="Menos">\u2212</button><span>${c.qty}</span><button data-qty="${u}" data-d="1" aria-label="M\xE1s">+</button>
              </div>
              <b>${p(B(c))}</b>
            </div>
            <button class="link small" data-remove="${u}">Eliminar</button>
          </div></li>`}).join("")}</ul>
      ${m.length?`<div class="drawer__suggest"><p class="eyebrow">Complementa tu compra</p>${m.map(c=>{const u=g[c];return`<div class="mini"><img src="${A(u)}" alt=""><div><p class="small"><b>${l(u.name)}</b></p><p class="small muted">${p(u.fromPrice)}</p></div>
          <button class="btn btn--ghost btn--xs" data-quick="${c}">Agregar</button></div>`}).join("")}</div>`:""}
      <div class="drawer__foot">
        <dl class="sum">
          <div><dt>Subtotal</dt><dd>${p(a.sub)}</dd></div>
          ${a.trade?`<div class="ok"><dt>Retoma (estimado)</dt><dd>\u2212${p(a.trade)}</dd></div>`:""}
          <div><dt>Env\xEDo</dt><dd>${a.ship===null?"Se calcula al pagar":a.ship?p(a.ship):"Gratis"}</dd></div>
          <div class="sum__total"><dt>Total</dt><dd>${p(a.total)}</dd></div>
        </dl>
        ${L&&a.trade?'<p class="small muted center">El descuento por retoma se aplica cuando revisemos tu equipo.</p>':""}
        <p class="small muted center">o ${P(a.total)}/mes en ${o.installments} cuotas</p>
        ${L?`<a href="${l(ve())}" class="btn btn--primary btn--block">\u{1F512} Pagar de forma segura</a>${re()}`:'<a href="#/checkout" class="btn btn--primary btn--block" data-close-cart>Finalizar compra</a>'}
        <a href="${S(te())}" target="_blank" rel="noopener" class="btn btn--wa btn--block">Pedir por WhatsApp</a>
      </div>`:`
      <div class="empty"><p>Tu bolsa est\xE1 vac\xEDa.</p><a class="btn btn--primary" href="#/c/iphone" data-close-cart>Ver iPhone</a></div>`}`}const ne=()=>{i("#cart").classList.add("open"),i("#cart").setAttribute("aria-hidden","false"),i("#cartBackdrop").hidden=!1,document.body.classList.add("locked")},z=()=>{i("#cart").classList.remove("open"),i("#cart").setAttribute("aria-hidden","true"),i("#cartBackdrop").hidden=!0,document.body.classList.remove("locked")};i("#cart").addEventListener("click",e=>{const a=e.target.closest("[data-qty]"),t=e.target.closest("[data-remove]"),s=e.target.closest("[data-quick]");if(a){const n=b[+a.dataset.qty];n.qty=Math.max(1,Math.min(5,n.qty+ +a.dataset.d)),M()}if(t&&(b.splice(+t.dataset.remove,1),M()),s){const n=g[s.dataset.quick];ae({id:n.id,color:n.variants[0].color,config:n.variants[0].config})}e.target.closest("[data-close-cart]")&&z()}),i("#openCart").addEventListener("click",ne),i("#cartBackdrop").addEventListener("click",z);const ie=e=>`
    <a class="card reveal" href="#/p/${e.id}">
      ${L&&!e.available?'<span class="tag tag--out">Agotado</span>':e.badge?`<span class="tag">${l(e.badge)}</span>`:""}
      <div class="card__media"><img src="${Y(A(e),600)}" alt="${l(e.name)}" loading="lazy" decoding="async" data-card-img></div>
      ${j(e)?`<div class="dots">${e.colors.slice(0,7).map(a=>`<span class="dot" style="--c:${a.hex}" title="${l(a.name)}" data-swap="${Y(a.images[0],600)}" data-color="${a.id}"></span>`).join("")}</div>`:'<div class="dots"></div>'}
      <h3 class="card__name">${l(e.name)}</h3>
      <p class="card__tag">${l(e.tagline)}</p>
      <p class="card__price">Desde ${p(e.fromPrice)}</p>
      <p class="card__cuota">o ${P(e.fromPrice)}/mes en ${o.installments} cuotas</p>
      <span class="btn btn--primary btn--sm">Comprar</span>
    </a>`,V=(e,a,t="")=>{const s=a.map(n=>g[n]).filter(Boolean);return s.length?`<section class="section shelf">
      <div class="section__head wrap"><div><h2 class="h2">${e}</h2>${t?`<p class="lead">${t}</p>`:""}</div>
        <div class="shelf__arrows"><button class="round" data-scroll="-1" aria-label="Anterior">\u2039</button><button class="round" data-scroll="1" aria-label="Siguiente">\u203A</button></div></div>
      <div class="shelf__track">${s.map(ie).join("")}</div></section>`:""},re=()=>'<p class="secure-note"><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5Zm-3 8V7a3 3 0 0 1 6 0v3H9Z"/></svg>Pago 100% seguro procesado por Shopify \xB7 datos cifrados</p>',$e=()=>`<div class="trustband">${[["\u{1F512}","Pago seguro","Pagas en el checkout de Shopify con cifrado SSL. No guardamos datos de tu tarjeta."],["\u2705","Originales y sellados","Productos Apple nuevos, en su caja sellada."],["\u21A9\uFE0F","Derecho de retracto","5 d\xEDas h\xE1biles para compras en l\xEDnea (Ley 1480 de 2011)."],["\u{1F4AC}","Te acompa\xF1amos","Asesor\xEDa por WhatsApp antes y despu\xE9s de tu compra."]].map(([e,a,t])=>`<div class="trustband__item reveal"><span class="trustband__icon">${e}</span><div><b>${a}</b><span>${t}</span></div></div>`).join("")}</div>`,N=()=>`<div class="paywall">${o.paymentMethods.map(e=>`<span class="pill">${l(e)}</span>`).join("")}</div>`,ce=e=>`<div class="faq">${e.map(([a,t])=>`<details><summary>${l(a)}</summary><p>${t}</p></details>`).join("")}</div>`,le=[["\xBFLos productos son originales y nuevos?","S\xED. Todos los productos son Apple originales, nuevos y sellados de f\xE1brica."],["\xBFQu\xE9 garant\xEDa tienen?","Antes de tu compra te explicamos por WhatsApp las condiciones de garant\xEDa de cada equipo y te acompa\xF1amos si la necesitas."],["\xBFCu\xE1nto se demora el env\xEDo?",`En ${o.sameDayCity} entregamos el mismo d\xEDa. Al resto del pa\xEDs, en ${o.otherCitiesDays}, con n\xFAmero de gu\xEDa. El costo del env\xEDo se calcula al pagar seg\xFAn tu ciudad.`],["\xBFPuedo pagar a cuotas?",`S\xED, puedes diferir tu compra hasta en ${o.installments} cuotas con tu tarjeta de cr\xE9dito. Los intereses dependen de tu banco; la cuota que mostramos es el precio dividido en ${o.installments}, sin intereses.`],["\xBFPuedo devolver mi compra?","Tienes derecho de retracto de 5 d\xEDas h\xE1biles desde la entrega para compras en l\xEDnea, siempre que el producto est\xE9 sin usar y en su empaque original (Ley 1480 de 2011)."]],G=()=>q.get("nova-recent",[]).filter(e=>g[e]);function fe(){const e=g[o.hero.id]||T.find(n=>n.cat==="iphone")||T[0];if(!e)return'<section class="wrap section center"><h1 class="h2">Muy pronto</h1><p class="lead">Estamos preparando nuestra tienda Apple.</p></section>';const a=e.colors.find(n=>n.id===o.hero.color)||e.colors[0],t=o.tiles.map(n=>g[n]).filter(Boolean),s=o.tradeIn;return`
    <section class="hero">
      <div class="hero__copy">
        <p class="eyebrow eyebrow--accent">Nuevo</p>
        <h1 class="hero__title">${l(o.hero.title)}</h1>
        <p class="hero__sub">${l(o.hero.headline)}</p>
        <p class="hero__price">Desde ${p(e.fromPrice)} o <b>${P(e.fromPrice)}/mes</b> en ${o.installments} cuotas</p>
        <div class="cta-row"><a class="btn btn--primary btn--lg" href="#/p/${e.id}?color=${a.id}">Comprar</a><a class="btn btn--link" href="#/c/iphone">Ver todos los iPhone \u203A</a></div>
      </div>
      <div class="hero__media"><img src="${a.images[0]}" alt="${l(e.name)}" fetchpriority="high"></div>
    </section>

    <section class="chapters wrap" aria-label="Categor\xEDas">
      ${x.map(n=>{const m=g[n.hero]||T.find(c=>c.cat===n.id);return m?`<a class="chapter" href="#/c/${n.id}"><span class="chapter__img"><img src="${A(m)}" alt="" loading="lazy"></span><span>${n.name}</span></a>`:""}).join("")}
    </section>

    <section class="benefits wrap">
      ${[["\u26A1",`Hoy mismo en ${o.sameDayCity}`,"Entrega el mismo d\xEDa"],["\u{1F69A}","Env\xEDos a toda Colombia",`En ${o.otherCitiesDays}, con gu\xEDa`],["\u{1F4B3}",`Hasta ${o.installments} cuotas`,"Con tu tarjeta de cr\xE9dito"],["\u2705","Originales y sellados","Productos Apple nuevos"],["\u{1F4AC}","Asesor\xEDa por WhatsApp","Te ayudamos a elegir"]].map(([n,m,c])=>`<div class="benefit reveal"><span class="benefit__icon">${n}</span><div><b>${m}</b><p>${l(c)}</p></div></div>`).join("")}
    </section>

    ${window.Explorer?window.Explorer.html({productId:"iphone-18-pro-max",price:g["iphone-18-pro-max"]?p(g["iphone-18-pro-max"].fromPrice):""}):""}

    <section class="tiles wrap">
      ${t.map((n,m)=>`
        <article class="tile ${m%3===0?"tile--wide":""} reveal">
          <div class="tile__copy">
            ${n.badge?`<p class="eyebrow eyebrow--accent">${l(n.badge)}</p>`:""}
            <h2 class="tile__title">${l(n.name)}</h2>
            <p class="tile__sub">${l(n.tagline)}</p>
            <p class="tile__price">Desde ${p(n.fromPrice)} \xB7 ${P(n.fromPrice)}/mes</p>
            <div class="cta-row"><a class="btn btn--primary btn--sm" href="#/p/${n.id}">Comprar</a><a class="btn btn--link" href="#/c/${n.cat}">M\xE1s ${D(n.cat)} \u203A</a></div>
          </div>
          <a class="tile__media" href="#/p/${n.id}"><img src="${A(n)}" alt="${l(n.name)}" loading="lazy"></a>
        </article>`).join("")}
    </section>

    ${V("Nuestros recomendados",o.bestSellers,"Los imprescindibles para estrenar este mes.")}

    ${o.tradeIn.enabled?`<section class="section wrap">
      <div class="tradein-band reveal">
        <div>
          <p class="eyebrow">Plan Retoma</p>
          <h2 class="h2">Tu iPhone vale m\xE1s de lo que crees.</h2>
          <p class="lead">Entr\xE9galo como parte de pago y estrena hoy. Cotiza en segundos.</p>
        </div>
        <form class="tradein-quick" id="tradeQuick">
          <label>Tu equipo<select name="device">${s.devices.map(([n],m)=>`<option value="${m}">${l(n)}</option>`).join("")}</select></label>
          <label>Estado<select name="cond">${s.conditions.map(([n],m)=>`<option value="${m}">${n}</option>`).join("")}</select></label>
          <p class="tradein-quick__value">Recibe hasta <b id="tradeQuickVal"></b></p>
          <a class="btn btn--primary btn--block" href="#/c/iphone">Elegir mi nuevo iPhone</a>
        </form>
      </div>
    </section>`:""}

    ${G().length?V("Vistos recientemente",G()):""}

    <section class="section wrap center">
      <h2 class="h2">Paga como prefieras.</h2>
      <p class="lead">Paga de contado o hasta en ${o.installments} cuotas ${l(o.installmentsNote)}.</p>
      ${N()}
    </section>

    <section class="section wrap">
      <h2 class="h2 center">\xBFPor qu\xE9 comprar en ${l(o.name)}?</h2>
      <div class="why">
        ${[["Productos 100% originales","Nuevos y sellados. Nada de r\xE9plicas ni reacondicionados sin avisar."],["Asesor\xEDa experta","Te ayudamos a elegir por WhatsApp, sin presi\xF3n y con respuesta r\xE1pida."],["Entrega r\xE1pida",`El mismo d\xEDa en ${o.sameDayCity} y en ${o.otherCitiesDays} al resto del pa\xEDs, con seguimiento.`],["Pago seguro","Pagas en el checkout de Shopify con tarjeta o PSE; tus datos est\xE1n protegidos."]].map(([n,m])=>`<div class="why__item reveal"><h3>${n}</h3><p>${m}</p></div>`).join("")}
      </div>
    </section>

    <section class="section wrap">
      <h2 class="h2 center">Compra con total confianza</h2>
      <p class="lead center">Tu compra est\xE1 protegida de principio a fin.</p>
      ${$e()}
    </section>

    <section class="section wrap narrow">
      <h2 class="h2 center">Preguntas frecuentes</h2>
      ${ce(le)}
    </section>`}function ye(e,a){const t=x.find(c=>c.id===e);if(!t)return Q();let s=T.filter(c=>c.cat===e);const n=a.get("orden")||"rec";n==="asc"&&(s=[...s].sort((c,u)=>c.fromPrice-u.fromPrice)),n==="desc"&&(s=[...s].sort((c,u)=>u.fromPrice-c.fromPrice));const m=c=>[...new Set(c.configs.map(u=>(/(\d+\s?(GB|TB))/.exec(u)||[])[1]).filter(Boolean))];return`
    <section class="cat-hero wrap">
      <h1 class="display">${l(t.name)}</h1>
      <p class="lead">${l(t.blurb)}</p>
    </section>
    <div class="wrap toolbar">
      <p class="muted">${s.length} modelos</p>
      <label class="select">Ordenar
        <select id="sortSel">
          <option value="rec" ${n==="rec"?"selected":""}>Recomendados</option>
          <option value="asc" ${n==="asc"?"selected":""}>Menor precio</option>
          <option value="desc" ${n==="desc"?"selected":""}>Mayor precio</option>
        </select></label>
    </div>
    <section class="grid wrap">${s.map(ie).join("")}</section>
    ${["iphone","ipad","mac","watch"].includes(e)?`
    <section class="section wrap">
      <h2 class="h2">Compara los modelos</h2>
      <div class="compare-wrap"><table class="compare">
        <thead><tr><th>Modelo</th><th>Precio desde</th><th>Cuota desde</th><th>${e==="watch"?"Tama\xF1os":"Almacenamiento"}</th><th>Acabados</th><th></th></tr></thead>
        <tbody>${T.filter(c=>c.cat===e).map(c=>`<tr>
          <td><a href="#/p/${c.id}"><img src="${A(c)}" alt="" loading="lazy">${l(c.name)}</a></td>
          <td>${p(c.fromPrice)}</td><td>${P(c.fromPrice)}/mes</td>
          <td>${e==="watch"?[...new Set(c.configs.map(u=>u.split(" \xB7 ")[0]))].join(", "):m(c).join(", ")}</td>
          <td><span class="dots dots--inline">${c.colors.map(u=>`<span class="dot" style="--c:${u.hex}" title="${l(u.name)}"></span>`).join("")}</span></td>
          <td><a class="btn btn--primary btn--xs" href="#/p/${c.id}">Comprar</a></td></tr>`).join("")}</tbody>
      </table></div>
    </section>`:""}
    <section class="section wrap center">${N()}</section>`}let d=null;function we(e,a){const t=g[e];if(!t)return Q();const s=[e,...G().filter(r=>r!==e)].slice(0,10);q.set("nova-recent",s);const n=t.colors.find(r=>r.id===a.get("color"))?a.get("color"):t.colors[0].id,m=t.variants.filter(r=>r.color===n).sort((r,h)=>r.price-h.price),c=m.find(r=>r.config===a.get("config"))?a.get("config"):m[0].config;d={m:t,color:n,config:c,img:0,protect:!1,trade:null};const u=(o.crossSell[t.cat]||[]).filter(r=>r!==e),_=t.cat==="iphone";return`
    <nav class="crumbs wrap" aria-label="Ruta"><a href="#/">Inicio</a><span>\u203A</span><a href="#/c/${t.cat}">${D(t.cat)}</a><span>\u203A</span><span>${l(t.name)}</span></nav>
    <section class="pdp wrap">
      <div class="pdp__gallery">
        <div class="gallery">
          <button class="round gallery__nav gallery__nav--prev" data-gal="-1" aria-label="Imagen anterior">\u2039</button>
          <img id="galMain" src="" alt="${l(t.name)}">
          <button class="round gallery__nav gallery__nav--next" data-gal="1" aria-label="Imagen siguiente">\u203A</button>
        </div>
        <div class="thumbs" id="thumbs"></div>
      </div>

      <div class="pdp__buy" id="buyBox">
        ${t.badge?`<p class="eyebrow eyebrow--accent">${l(t.badge)}</p>`:""}
        <h1 class="pdp__title">${l(t.name)}</h1>
        <p class="pdp__tag">${l(t.tagline)}</p>
        <div class="price-box" id="priceBox"></div>

        <fieldset class="opt">
          <legend>${j(t)?"Color":"Modelo"}. <b id="colorName"></b></legend>
          <div class="${j(t)?"swatches":"chips"}" id="colorOpts">
            ${t.colors.map(r=>j(t)?`<button class="swatch" style="--c:${r.hex}" data-color="${r.id}" aria-label="${l(r.name)}" title="${l(r.name)}"></button>`:`<button class="chip" data-color="${r.id}">${l(r.name)}</button>`).join("")}
          </div>
        </fieldset>

        ${K(t)?`<fieldset class="opt">
          <legend>${t.cat==="watch"?"Tama\xF1o y conectividad":t.cat==="mac"?"Configuraci\xF3n":"Capacidad"}.</legend>
          <div class="configs" id="configOpts"></div>
        </fieldset>`:""}

        ${_&&o.tradeIn.enabled?`<fieldset class="opt tradein" id="tradeBox">
          <legend>\xBFTienes un smartphone para entregar como parte de pago?</legend>
          <div class="seg"><button class="seg__btn" data-trade="yes">S\xED, cotizar retoma</button><button class="seg__btn is-on" data-trade="no">No, gracias</button></div>
          <div class="tradein__form" id="tradeForm" hidden>
            <label>Modelo<select id="tradeDevice">${o.tradeIn.devices.map(([r],h)=>`<option value="${h}">${l(r)}</option>`).join("")}</select></label>
            <label>Estado<select id="tradeCond">${o.tradeIn.conditions.map(([r],h)=>`<option value="${h}">${r}</option>`).join("")}</select></label>
            <p class="small muted">Valor estimado. Se confirma con la revisi\xF3n t\xE9cnica al entregar tu equipo.</p>
          </div>
        </fieldset>`:""}

        ${o.protection.cats.includes(t.cat)?`<label class="protect">
          <input type="checkbox" id="protect">
          <span><b>Agrega ${l(o.protection.name)}</b> por <b id="protectPrice"></b><br><span class="small muted">Cubre da\xF1os accidentales, pantalla rota y contacto con l\xEDquidos. Reemplazo r\xE1pido.</span></span>
        </label>`:""}

        <div class="buy-actions">
          <button class="btn btn--primary btn--lg btn--block" id="addBtn">Agregar a la bolsa</button>
          <a class="btn btn--wa btn--lg btn--block" id="waBuy" target="_blank" rel="noopener">Comprar con asesor por WhatsApp</a>
          ${re()}
        </div>

        <ul class="delivery">
          <li><span>\u26A1</span><div id="sameDay"></div></li>
          <li><span>\u{1F69A}</span><div><b>Env\xEDos a toda Colombia</b><br><span class="muted small">Llega en ${o.otherCitiesDays} con n\xFAmero de gu\xEDa. El costo se calcula al pagar.</span></div></li>
          <li><span>\u{1F4AC}</span><div><b>\xBFDudas? Te asesoramos</b><br><span class="muted small">Escr\xEDbenos por WhatsApp y te respondemos en minutos.</span></div></li>
        </ul>
        <ul class="trust">
          <li>\u2705 Original y sellado</li><li>\u{1F512} Pago seguro en Shopify</li><li>\u21A9\uFE0F Retracto 5 d\xEDas h\xE1biles</li>
        </ul>
        ${N()}
      </div>
    </section>

    ${/^iphone-18-pro/.test(t.id)&&window.Explorer?window.Explorer.html({productId:"iphone-18-pro-max",price:g["iphone-18-pro-max"]?p(g["iphone-18-pro-max"].fromPrice):""}):""}
    ${t.description?`<section class="section wrap narrow about reveal"><p class="eyebrow">Acerca de</p><p class="about__text">${l(t.description)}</p></section>`:""}
    ${u.length?V("Arma tu combo perfecto",u,`Lo que m\xE1s compran junto con ${l(t.name)}.`):""}
    <section class="section wrap narrow"><h2 class="h2 center">Preguntas frecuentes</h2>${ce(le)}</section>

    <div class="buybar" id="buybar" aria-hidden="true">
      <div class="buybar__inner wrap">
        <div><b>${l(t.name)}</b><span class="muted small" id="barLabel"></span></div>
        <div class="buybar__right"><span id="barPrice"></span><button class="btn btn--primary btn--sm" id="barAdd">Agregar</button></div>
      </div>
    </div>`}function _e(){const{m:e}=d,a=()=>e.variants.find(r=>r.color===d.color&&r.config===d.config),t=()=>{if(!d.trade)return 0;const[,r]=o.tradeIn.devices[d.trade.d],[,h]=o.tradeIn.conditions[d.trade.c];return Math.round(r*h/1e4)*1e4},s=()=>{const r=a(),h=e.colors.find(y=>y.id===d.color),f=d.protect?H(e,r.price):0,$=t(),C=r.price+f-$;i("#priceBox").innerHTML=`
        <p class="price">${p(r.price)} ${r.compare&&r.compare>r.price?`<s>${p(r.compare)}</s>`:""}</p>
        <p class="price__cuota">o <b>${P(r.price)}/mes</b> en ${o.installments} cuotas \xB7 ${l(o.installmentsNote)}</p>
        ${$||f?`<p class="price__total">Total con ${[f?"protecci\xF3n":"",$?"retoma":""].filter(Boolean).join(" y ")}: <b>${p(C)}</b>${$?` <span class="ok">(\u2212${p($)})</span>`:""}</p>`:""}`,i("#colorName").textContent=h.name,w("#colorOpts [data-color]").forEach(y=>y.classList.toggle("is-on",y.dataset.color===d.color)),i("#configOpts")&&(i("#configOpts").innerHTML=e.configs.map(y=>{const I=e.variants.find(ue=>ue.config===y&&ue.color===d.color);return`<button class="config ${y===d.config?"is-on":""}" data-config="${l(y)}" ${I?"":"disabled"}>
            <span>${l(y)}</span><span class="config__price">${I?p(I.price)+(L&&!I.available?" \xB7 Agotado":""):"No disponible en este color"}</span></button>`}).join("")),i("#protectPrice")&&(i("#protectPrice").textContent=p(H(e,r.price)));const k=h.images;d.img=Math.min(d.img,k.length-1);const v=i("#galMain");v.getAttribute("src")!==k[d.img]&&(v.classList.remove("fade"),v.offsetWidth,v.classList.add("fade"),v.src=k[d.img]),i("#thumbs").innerHTML=k.map((y,I)=>`<button class="thumb ${I===d.img?"is-on":""}" data-img="${I}" aria-label="Imagen ${I+1}"><img src="${y}" alt=""></button>`).join("");const E=[d.config!=="Est\xE1ndar"?d.config:"",h.name].filter(Boolean).join(" \xB7 ");i("#barLabel").textContent=" "+E,i("#barPrice").textContent=p(r.price);const O=!r.available;i("#addBtn").disabled=O,i("#barAdd").disabled=O,i("#addBtn").textContent=O?L?"Agotado":"Disponible muy pronto":"Agregar a la bolsa",i("#barAdd").textContent=O?"Agotado":"Agregar",i("#waBuy").href=S(`Hola ${o.name}, me interesa el ${e.name} (${E}) de ${p(r.price)}.`+($?` Quiero entregar mi ${o.tradeIn.devices[d.trade.d][0]} (${o.tradeIn.conditions[d.trade.c][0]}) en retoma.`:"")+" \xBFEst\xE1 disponible?"),i("#waFloat").href=i("#waBuy").href,history.replaceState(null,"",`#/p/${e.id}?color=${d.color}${K(e)?"&config="+encodeURIComponent(d.config):""}`)},n=()=>{const r=a(),h=t();ae({id:e.id,color:r.color,config:r.config,protection:d.protect?H(e,r.price):0,tradeIn:h?{device:o.tradeIn.devices[d.trade.d][0],cond:o.tradeIn.conditions[d.trade.c][0],value:h}:null})},m=i(".pdp");m.addEventListener("click",r=>{const h=r.target.closest("[data-color]"),f=r.target.closest("[data-config]"),$=r.target.closest("[data-img]"),C=r.target.closest("[data-gal]"),k=r.target.closest("[data-trade]");if(h&&(d.color=h.dataset.color,d.img=0,a()||(d.config=e.variants.filter(v=>v.color===d.color).sort((v,E)=>v.price-E.price)[0].config)),f&&!f.disabled&&(d.config=f.dataset.config),$&&(d.img=+$.dataset.img),C){const v=e.colors.find(E=>E.id===d.color).images.length;d.img=(d.img+ +C.dataset.gal+v)%v}if(k){const v=k.dataset.trade==="yes";w("[data-trade]").forEach(E=>E.classList.toggle("is-on",E===k)),i("#tradeForm").hidden=!v,d.trade=v?{d:+i("#tradeDevice").value,c:+i("#tradeCond").value}:null}(h||f||$||C||k)&&s()}),m.addEventListener("change",r=>{r.target.id==="protect"&&(d.protect=r.target.checked),(r.target.id==="tradeDevice"||r.target.id==="tradeCond")&&(d.trade={d:+i("#tradeDevice").value,c:+i("#tradeCond").value}),s()}),i("#addBtn").addEventListener("click",n),i("#barAdd").addEventListener("click",n);let c=null;i(".gallery").addEventListener("touchstart",r=>{c=r.touches[0].clientX},{passive:!0}),i(".gallery").addEventListener("touchend",r=>{if(c===null)return;const h=r.changedTouches[0].clientX-c;c=null,Math.abs(h)>40&&i(`[data-gal="${h<0?1:-1}"]`).click()});const u=()=>{const r=i("#sameDay");if(!r)return clearInterval(d.timer);if(!o.sameDayCutoff){r.innerHTML=`<b>Rec\xEDbelo hoy en ${o.sameDayCity}</b><br><span class="muted small">Entrega el mismo d\xEDa en ${o.sameDayCity}.</span>`;return}const{h,m:f,day:$}=he(),C=o.sameDayCutoff*60-(h*60+f);r.innerHTML=C>0&&$!=="Sun"?`<b>Rec\xEDbelo hoy en ${o.sameDayCity}</b><br><span class="muted small">Compra en las pr\xF3ximas <b class="accent">${Math.floor(C/60)} h ${C%60} min</b></span>`:`<b>Rec\xEDbelo ${$==="Sat"||$==="Sun"?"el lunes":"ma\xF1ana"} en ${o.sameDayCity}</b><br><span class="muted small">Pide antes de las ${o.sameDayCutoff}:00 para entrega el mismo d\xEDa.</span>`};u(),d.timer=setInterval(u,3e4),new IntersectionObserver(([r])=>{const h=i("#buybar");if(!h)return;const f=!r.isIntersecting&&r.boundingClientRect.top<0;h.classList.toggle("show",f),h.setAttribute("aria-hidden",String(!f))}).observe(i("#addBtn")),s()}function Ce(){if(!b.length)return'<section class="wrap narrow section center"><h1 class="h2">Tu bolsa est\xE1 vac\xEDa</h1><p class="lead">Agrega un producto para continuar.</p><a class="btn btn--primary" href="#/">Ir a la tienda</a></section>';const e=F(),a=[["tarjeta","Tarjeta de cr\xE9dito",`Hasta ${o.installments} cuotas \xB7 ${o.installmentsNote}`],["pse","PSE","D\xE9bito desde tu cuenta de ahorros o corriente"],["nequi","Nequi o Daviplata","Paga desde tu celular"],["addi","Addi","Compra ahora y paga a cuotas, aprobaci\xF3n en minutos"],["sistecredito","Sistecr\xE9dito","Cr\xE9dito con tu c\xE9dula"]];return`
    <section class="checkout wrap">
      <form class="checkout__form" id="checkoutForm" novalidate>
        <h1 class="h2">Finalizar compra</h1>
        <p class="muted small">\u{1F512} Compra segura. Tus datos se usan solo para procesar tu pedido.</p>
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
            <label class="radio"><input type="radio" name="entrega" value="envio" checked><span><b>Env\xEDo a domicilio</b><br><span class="small muted">${e.ship===null?"Se calcula al pagar":e.ship?p(e.ship):"Gratis"} \xB7 Mismo d\xEDa en ${o.sameDayCity}, ${o.otherCitiesDays} al resto del pa\xEDs</span></span></label>
          </div>
          <div class="fields" id="shipFields">
            <label>Departamento<input name="departamento" required autocomplete="address-level1" value=""></label>
            <label>Ciudad<input name="ciudad" required autocomplete="address-level2" value=""></label>
            <label class="span2">Direcci\xF3n<input name="direccion" required autocomplete="street-address" placeholder="Calle 00 # 00-00, apto"></label>
          </div>
        </fieldset>
        <fieldset><legend>3. Pago</legend>
          <div class="radios">${a.map(([t,s,n],m)=>`<label class="radio"><input type="radio" name="pago" value="${s}" ${m?"":"checked"}><span><b>${s}</b><br><span class="small muted">${n}</span></span></label>`).join("")}</div>
        </fieldset>
        <label class="check"><input type="checkbox" name="acepto" required> Acepto los t\xE9rminos y condiciones y autorizo el tratamiento de mis datos personales (Ley 1581 de 2012).</label>
        <p class="form-error" id="formError" hidden>Revisa los campos marcados.</p>
        <button class="btn btn--primary btn--lg btn--block" type="submit">Confirmar pedido \xB7 ${p(e.total)}</button>
        <p class="small muted center">Al confirmar, un asesor te enviar\xE1 el enlace de pago seguro por WhatsApp.</p>
      </form>
      <aside class="checkout__summary">
        <h2 class="h3">Resumen</h2>
        <ul class="lines lines--compact">${b.map(t=>`<li class="line"><span class="line__img"><img src="${A(g[t.id],t.color)}" alt=""><i>${t.qty}</i></span>
          <div class="line__info"><b class="small">${l(g[t.id].name)}</b><p class="small muted">${l(W(t))}</p>${t.protection?`<p class="small">+ ${l(o.protection.name)}</p>`:""}${t.tradeIn?`<p class="small ok">Retoma \u2212${p(t.tradeIn.value)}</p>`:""}</div>
          <b class="small">${p(B(t))}</b></li>`).join("")}</ul>
        <dl class="sum">
          <div><dt>Subtotal</dt><dd>${p(e.sub)}</dd></div>
          ${e.trade?`<div class="ok"><dt>Retoma (estimado)</dt><dd>\u2212${p(e.trade)}</dd></div>`:""}
          <div><dt>Env\xEDo</dt><dd>${e.ship===null?"Se calcula al pagar":e.ship?p(e.ship):"Gratis"}</dd></div>
          <div class="sum__total"><dt>Total</dt><dd>${p(e.total)}</dd></div>
        </dl>
        <p class="small muted">o ${P(e.total)}/mes en ${o.installments} cuotas</p>
        <ul class="trust trust--col"><li>\u2705 Productos originales y sellados</li><li>\u21A9\uFE0F Derecho de retracto de 5 d\xEDas h\xE1biles</li></ul>
      </aside>
    </section>`}function ke(){const e=i("#checkoutForm");e&&(e.addEventListener("change",a=>{if(a.target.name==="entrega"){const t=a.target.value==="envio";i("#shipFields").hidden=!t,w("#shipFields input").forEach(s=>{s.required=t})}}),e.addEventListener("submit",a=>{a.preventDefault(),w(".invalid",e).forEach(c=>c.classList.remove("invalid"));const t=w("input",e).filter(c=>!c.checkValidity());if(t.forEach(c=>(c.closest("label")||c).classList.add("invalid")),i("#formError").hidden=!t.length,t.length){t[0].focus();return}const s=Object.fromEntries(new FormData(e)),n="NV-"+Date.now().toString(36).toUpperCase().slice(-6),m=te(`

Pedido ${n}
Cliente: ${s.nombre} \xB7 CC ${s.cedula}
Correo: ${s.email} \xB7 Cel: ${s.celular}
`+(s.entrega==="envio"?`Entrega: ${s.direccion}, ${s.ciudad} (${s.departamento})`:"Entrega: Retiro en tienda")+`
Pago: ${s.pago}`);q.set("nova-last-order",{order:n,name:s.nombre.split(" ")[0],wa:S(m)}),window.open(S(m),"_blank","noopener"),b=[],M(),location.hash="#/gracias"}))}function Ee(){const e=q.get("nova-last-order",null);return`<section class="wrap narrow section center thanks">
      <div class="thanks__icon">\u2713</div>
      <h1 class="h2">\xA1Gracias${e?", "+l(e.name):""}! Recibimos tu pedido.</h1>
      ${e?`<p class="lead">N\xFAmero de pedido <b>${l(e.order)}</b>. Un asesor te escribir\xE1 por WhatsApp con el enlace de pago seguro y la confirmaci\xF3n de entrega.</p>
      <a class="btn btn--wa" href="${e.wa}" target="_blank" rel="noopener">Abrir WhatsApp de nuevo</a>`:""}
      <p><a class="btn btn--link" href="#/">Seguir comprando \u203A</a></p></section>`}const Q=()=>'<section class="wrap narrow section center"><h1 class="h2">No encontramos esta p\xE1gina</h1><a class="btn btn--primary" href="#/">Volver al inicio</a></section>';function R(){const[e,a]=location.hash.replace(/^#/,"").split("?"),t=new URLSearchParams(a||""),s=(e||"/").split("/").filter(Boolean);d&&d.timer&&clearInterval(d.timer),d=null;let n,m=`${o.name} \xB7 iPhone, Mac, iPad y AirPods en Colombia`;s.length?s[0]==="c"?(n=ye(s[1],t),m=`${D(s[1])} \xB7 ${o.name}`):s[0]==="p"?(n=we(s[1],t),g[s[1]]&&(m=`Comprar ${g[s[1]].name} \xB7 ${o.name}`)):s[0]==="checkout"?(n=Ce(),m=`Finalizar compra \xB7 ${o.name}`):s[0]==="gracias"?n=Ee():n=Q():n=fe(),J.innerHTML=n,document.title=m,w("#navLinks a").forEach(u=>u.classList.toggle("is-on",u.dataset.cat===(s[0]==="c"?s[1]:s[0]==="p"&&g[s[1]]?g[s[1]].cat:""))),i("#waFloat").href=S(`Hola ${o.name}, quiero asesor\xEDa para comprar un producto Apple.`),window.Explorer&&window.Explorer.mount(J),d&&_e(),s[0]==="checkout"&&ke(),Le(),me();const c=location.hash.split("?")[0];R.last!==c&&(window.scrollTo({top:0}),R.last=c)}function Le(){w(".shelf").forEach(t=>t.addEventListener("click",s=>{const n=s.target.closest("[data-scroll]");if(!n)return;const m=i(".shelf__track",t);m.scrollBy({left:+n.dataset.scroll*m.clientWidth*.8,behavior:"smooth"})})),w(".card").forEach(t=>{t.addEventListener("mouseover",s=>{const n=s.target.closest("[data-swap]");n&&(i("[data-card-img]",t).src=n.dataset.swap)}),t.addEventListener("click",s=>{const n=s.target.closest("[data-color]");n&&(s.preventDefault(),location.hash=t.getAttribute("href")+"?color="+n.dataset.color)})});const e=i("#sortSel");e&&e.addEventListener("change",()=>{location.hash=location.hash.split("?")[0]+"?orden="+e.value});const a=i("#tradeQuick");if(a){const t=()=>{const[,s]=o.tradeIn.devices[a.device.value],[,n]=o.tradeIn.conditions[a.cond.value];i("#tradeQuickVal").textContent=p(Math.round(s*n/1e4)*1e4)};a.addEventListener("change",t),t()}Pe()}const U="IntersectionObserver"in window?new IntersectionObserver(e=>e.forEach(a=>{a.isIntersecting&&(a.target.classList.add("in"),U.unobserve(a.target))}),{rootMargin:"0px 0px -8% 0px"}):null,Pe=()=>w(".reveal:not(.in)").forEach(e=>U?U.observe(e):e.classList.add("in")),de=()=>{i("#search").hidden=!1,document.body.classList.add("locked"),i("#searchInput").value="",Z(""),setTimeout(()=>i("#searchInput").focus(),30)},pe=()=>{i("#search").hidden=!0,document.body.classList.remove("locked")};function Z(e){const a=X(e.trim()),t=a?T.filter(s=>a.split(/\s+/).every(n=>X(`${s.name} ${D(s.cat)} ${s.tagline}`).includes(n))).slice(0,8):[];i("#searchResults").innerHTML=a?t.length?t.map(s=>`<a class="sres" href="#/p/${s.id}"><img src="${A(s)}" alt=""><span><b>${l(s.name)}</b><span class="small muted">Desde ${p(s.fromPrice)} \xB7 ${P(s.fromPrice)}/mes</span></span></a>`).join(""):`<p class="muted">Sin resultados para \u201C${l(e)}\u201D. <a href="${S("Hola, busco: "+e)}" target="_blank" rel="noopener">Preg\xFAntanos por WhatsApp</a>.</p>`:`<p class="eyebrow">B\xFAsquedas populares</p><div class="chips">${["iPhone 18 Pro","AirPods Pro 3","MacBook Air","iPad","Apple Watch","Cargador"].map(s=>`<button class="chip" data-q="${s}">${s}</button>`).join("")}</div>`}i("#openSearch").addEventListener("click",de),i("#searchInput").addEventListener("input",e=>Z(e.target.value)),i("#search").addEventListener("click",e=>{(e.target.id==="search"||e.target.closest("[data-close]")||e.target.closest(".sres"))&&pe();const a=e.target.closest("[data-q]");a&&(i("#searchInput").value=a.dataset.q,Z(a.dataset.q))}),document.addEventListener("keydown",e=>{e.key==="Escape"&&(pe(),z(),me()),e.key==="/"&&!/input|textarea|select/i.test(document.activeElement.tagName)&&(e.preventDefault(),de())});function Ae(){i(".nav__name").textContent=o.name,i("#navLinks").innerHTML=x.map(t=>`<a href="#/c/${t.id}" data-cat="${t.id}">${t.name}</a>`).join("")+`<a href="${S("Hola, quiero asesor\xEDa")}" target="_blank" rel="noopener" class="nav__help">Asesor\xEDa</a>`;const e=i("#announce");e.innerHTML=o.announcements.map((t,s)=>`<p class="${s?"":"on"}">${l(t)}</p>`).join("");let a=0;setInterval(()=>{const t=w("p",e);t[a].classList.remove("on"),a=(a+1)%t.length,t[a].classList.add("on")},4200),i("#footer").innerHTML=`
      <div class="wrap">
        <div class="footer__cols">
          <div><h4>Comprar</h4>${x.map(t=>`<a href="#/c/${t.id}">${t.name}</a>`).join("")}</div>
          <div><h4>Ayuda</h4><a href="https://${o.shopifyDomain}/policies/shipping-policy">Env\xEDos y entregas</a><a href="https://${o.shopifyDomain}/policies/refund-policy">Devoluciones y retracto</a><a href="https://${o.shopifyDomain}/pages/contact">Contacto</a></div>
          <div><h4>${l(o.name)}</h4><a href="https://${o.shopifyDomain}">Celada Shopper</a><a href="https://${o.shopifyDomain}/pages/quienes-somos">Qui\xE9nes somos</a><a href="https://${o.shopifyDomain}/policies/terms-of-service">T\xE9rminos y condiciones</a><a href="https://${o.shopifyDomain}/policies/privacy-policy">Pol\xEDtica de privacidad</a></div>
          <div><h4>Contacto</h4><a href="${S("Hola "+o.name)}" target="_blank" rel="noopener">WhatsApp ${l(o.phone)}</a><a href="mailto:${o.email}">${l(o.email)}</a>${o.address?`<p>${l(o.address)}</p>`:""}${o.hours?`<p>${l(o.hours)}</p>`:""}
            <p><a href="${o.instagram}" target="_blank" rel="noopener">Instagram</a> \xB7 <a href="${o.tiktok}" target="_blank" rel="noopener">TikTok</a></p></div>
        </div>
        ${N()}
        <div class="footer__legal">
          <p>${o.legalName?l(o.legalName)+" \xB7 ":""}${o.nit?"NIT "+l(o.nit)+" \xB7 ":""}Precios en pesos colombianos. Im\xE1genes de referencia.</p>
          <p>Apple, iPhone, iPad, Mac, Apple Watch y AirPods son marcas registradas de Apple Inc. ${l(o.name)} es un comercio independiente.</p>
          <p><a href="https://www.sic.gov.co" target="_blank" rel="noopener">Superintendencia de Industria y Comercio</a> \xB7 \xA9 ${new Date().getFullYear()} ${l(o.name)}</p>
        </div>
      </div>`}const me=()=>{document.body.classList.remove("menu-open"),i("#burger").setAttribute("aria-expanded","false")};i("#burger").addEventListener("click",()=>{const e=document.body.classList.toggle("menu-open");i("#burger").setAttribute("aria-expanded",String(e))}),window.addEventListener("scroll",()=>i("#nav").classList.toggle("scrolled",window.scrollY>8),{passive:!0}),Ae(),se(),oe(),window.addEventListener("hashchange",R),R()})();
