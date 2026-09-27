(async()=>{"use strict";const o=window.STORE,{catalog:_,live:E}=await window.loadCatalog();document.documentElement.classList.toggle("is-demo",!E);const S=window.CATEGORIES,h=Object.fromEntries(_.map(e=>[e.id,e])),r=(e,a=document)=>a.querySelector(e),k=(e,a=document)=>[...a.querySelectorAll(e)],G=r("#app"),u=e=>"$"+Math.round(e).toLocaleString("es-CO"),A=e=>u(Math.ceil(e/o.installments)),i=e=>String(e??"").replace(/[&<>"']/g,a=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[a]),ie=e=>String(e).normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase(),M=e=>(S.find(a=>a.id===e)||{}).name||"",P=(e,a)=>(a&&e.colors.find(t=>t.id===a)||e.colors[0]).images[0],U=(e,a)=>e&&/[?&]width=\d+/.test(e)?e.replace(/width=\d+/,`width=${a}`):e,$={cat:e=>`/${e}/`,p:(e,a)=>`/${e.cat}/${e.id}/${a?"?"+a:""}`},F=(e,a)=>{history[a?"replaceState":"pushState"](null,"",e),q()},T=e=>`https://wa.me/${o.whatsapp}?text=${encodeURIComponent(e)}`,B={get(e,a){try{return JSON.parse(localStorage.getItem(e))??a}catch{return a}},set(e,a){try{localStorage.setItem(e,JSON.stringify(a))}catch{}}},Q=(e,a)=>o.protection.cats.includes(e.cat)?Math.max(o.protection.min,Math.round(a*o.protection.rate/1e3)*1e3):0,re=e=>e.configs.length>1||e.configs[0]!=="Est\xE1ndar",O=e=>e.colors.some(a=>a.hex),Ee=()=>{const e=Object.fromEntries(new Intl.DateTimeFormat("en-US",{timeZone:"America/Bogota",hour:"numeric",minute:"numeric",weekday:"short",hour12:!1}).formatToParts(new Date).map(a=>[a.type,a.value]));return{h:+e.hour%24,m:+e.minute,day:e.weekday}};let ce;const ke=e=>{const a=r("#toast");a.innerHTML=e,a.classList.add("show"),clearTimeout(ce),ce=setTimeout(()=>a.classList.remove("show"),2600)};let f=B.get("nova-cart",[]).map(e=>{const a=h[e.id],t=a&&a.variants.find(s=>s.color===e.color&&s.config===e.config);return t?{...e,price:t.price,vid:t.vid}:null}).filter(Boolean);const H=()=>{B.set("nova-cart",f),pe(),me()},W=e=>(e.price+(e.protection||0))*e.qty,K=()=>{const e=f.reduce((s,n)=>s+W(n),0),a=f.reduce((s,n)=>s+(n.tradeIn?n.tradeIn.value:0),0);if(E)return{sub:e,trade:a,ship:null,total:e};const t=o.freeShippingFrom?e===0||e>=o.freeShippingFrom?0:o.shippingCost:null;return{sub:e,trade:a,ship:t,total:Math.max(0,e-a+t)}};function le({id:e,color:a,config:t,qty:s=1,protection:n=0,tradeIn:l=null}){const p=h[e],d=p.variants.find(g=>g.color===a&&g.config===t)||p.variants.find(g=>g.available)||p.variants[0];if(!d.available){ke("Este producto est\xE1 agotado. Escr\xEDbenos por WhatsApp y te avisamos.");return}const b=[e,d.color,d.config,n?"p":"",l?l.device+l.cond:""].join("|"),c=f.find(g=>g.key===b);c?c.qty+=s:f.push({key:b,id:e,color:d.color,config:d.config,qty:s,price:d.price,protection:n,tradeIn:l,sku:d.sku,vid:d.vid}),H(),ue()}const J=e=>{const t=h[e.id].colors.find(s=>s.id===e.color);return[e.config!=="Est\xE1ndar"?e.config:"",t?t.name:""].filter(Boolean).join(" \xB7 ")},de=(e="")=>{const a=K(),t=f.map(s=>`\u2022 ${s.qty} \xD7 ${h[s.id].name} (${J(s)}) \u2014 ${u(W(s))}`+(s.protection?`
   + ${o.protection.name}`:"")+(s.tradeIn?`
   Retoma: ${s.tradeIn.device} (${s.tradeIn.cond}) \u2212${u(s.tradeIn.value)}`:""));return`Hola ${o.name}, quiero hacer este pedido:

${t.join(`
`)}

Subtotal: ${u(a.sub)}`+(a.trade?`
Descuento retoma (estimado): \u2212${u(a.trade)}`:"")+`
Env\xEDo: ${a.ship===null?"Se calcula al pagar":a.ship?u(a.ship):"Gratis"}
Total: ${u(a.total)}${e}`},Pe=()=>f.filter(e=>e.tradeIn).map(e=>`Retoma solicitada para ${h[e.id].name}: ${e.tradeIn.device} (${e.tradeIn.cond}), valor estimado ${u(e.tradeIn.value)}`).join(" | "),Le=()=>window.shopifyCheckoutUrl(f,Pe());function pe(){const e=f.reduce((t,s)=>t+s.qty,0),a=r("#cartCount");a.textContent=e,a.hidden=!e}function me(){const e=r("#cart"),a=K(),t=Math.max(0,o.freeShippingFrom-a.sub),s=Math.min(100,a.sub/o.freeShippingFrom*100),n=new Set(f.map(p=>p.id)),l=["airpods-pro-3","cargador-magsafe","airtag","adaptador-40w"].filter(p=>h[p]&&h[p].available!==!1&&!n.has(p)).slice(0,2);e.innerHTML=`
      <div class="drawer__head"><h2>Tu bolsa</h2><button class="icon-btn" data-close-cart aria-label="Cerrar">\u2715</button></div>
      ${f.length?`
      ${E||!o.freeShippingFrom?"":`<div class="ship-meter">
        <p>${t?`Te faltan <b>${u(t)}</b> para tener <b>env\xEDo gratis</b>`:"\u{1F389} \xA1Tu pedido tiene <b>env\xEDo gratis</b>!"}</p>
        <div class="ship-meter__bar"><span style="width:${s}%"></span></div>
      </div>`}
      <ul class="lines">${f.map((p,d)=>{const b=h[p.id];return`<li class="line">
          <a href="${$.p(b,"color="+p.color)}" class="line__img"><img src="${P(b,p.color)}" alt="${i(b.name+" "+((b.colors.find(c=>c.id===p.color)||{}).name||""))}"></a>
          <div class="line__info">
            <a href="${$.p(b,"color="+p.color)}" class="line__name">${i(b.name)}</a>
            <p class="muted small">${i(J(p))}</p>
            ${p.protection?`<p class="small">\u{1F6E1}\uFE0F ${i(o.protection.name)} \xB7 ${u(p.protection)}</p>`:""}
            ${p.tradeIn?`<p class="small ok">\u{1F501} Retoma ${i(p.tradeIn.device)} \xB7 \u2212${u(p.tradeIn.value)}</p>`:""}
            <div class="line__row">
              <div class="qty" role="group" aria-label="Cantidad">
                <button data-qty="${d}" data-d="-1" aria-label="Menos">\u2212</button><span>${p.qty}</span><button data-qty="${d}" data-d="1" aria-label="M\xE1s">+</button>
              </div>
              <b>${u(W(p))}</b>
            </div>
            <button class="link small" data-remove="${d}">Eliminar</button>
          </div></li>`}).join("")}</ul>
      ${l.length?`<div class="drawer__suggest"><p class="eyebrow">Complementa tu compra</p>${l.map(p=>{const d=h[p];return`<div class="mini"><img src="${P(d)}" alt="${i(d.name)}" loading="lazy"><div><p class="small"><b>${i(d.name)}</b></p><p class="small muted">${u(d.fromPrice)}</p></div>
          <button class="btn btn--ghost btn--xs" data-quick="${p}">Agregar</button></div>`}).join("")}</div>`:""}
      <div class="drawer__foot">
        <dl class="sum">
          <div><dt>Subtotal</dt><dd>${u(a.sub)}</dd></div>
          ${a.trade?`<div class="ok"><dt>Retoma (estimado)</dt><dd>\u2212${u(a.trade)}</dd></div>`:""}
          <div><dt>Env\xEDo</dt><dd>${a.ship===null?"Se calcula al pagar":a.ship?u(a.ship):"Gratis"}</dd></div>
          <div class="sum__total"><dt>Total</dt><dd>${u(a.total)}</dd></div>
        </dl>
        ${E&&a.trade?'<p class="small muted center">El descuento por retoma se aplica cuando revisemos tu equipo.</p>':""}
        <p class="small muted center">o ${A(a.total)}/mes en ${o.installments} cuotas</p>
        ${E?`<a href="${i(Le())}" class="btn btn--primary btn--block">\u{1F512} Pagar de forma segura</a>${ge()}`:'<a href="/checkout/" class="btn btn--primary btn--block" data-close-cart>Finalizar compra</a>'}
        <a href="${T(de())}" target="_blank" rel="noopener" class="btn btn--wa btn--block">Pedir por WhatsApp</a>
      </div>`:`
      <div class="empty"><p>Tu bolsa est\xE1 vac\xEDa.</p><a class="btn btn--primary" href="/iphone/" data-close-cart>Ver iPhone</a></div>`}`}const ue=()=>{r("#cart").classList.add("open"),r("#cart").setAttribute("aria-hidden","false"),r("#cartBackdrop").hidden=!1,document.body.classList.add("locked")},Z=()=>{r("#cart").classList.remove("open"),r("#cart").setAttribute("aria-hidden","true"),r("#cartBackdrop").hidden=!0,document.body.classList.remove("locked")};r("#cart").addEventListener("click",e=>{const a=e.target.closest("[data-qty]"),t=e.target.closest("[data-remove]"),s=e.target.closest("[data-quick]");if(a){const n=f[+a.dataset.qty];n.qty=Math.max(1,Math.min(5,n.qty+ +a.dataset.d)),H()}if(t&&(f.splice(+t.dataset.remove,1),H()),s){const n=h[s.dataset.quick];le({id:n.id,color:n.variants[0].color,config:n.variants[0].config})}e.target.closest("[data-close-cart]")&&Z()}),r("#openCart").addEventListener("click",ue),r("#cartBackdrop").addEventListener("click",Z);const he=e=>`
    <a class="card reveal" href="${$.p(e)}">
      ${e.badge||E&&!e.available?`<div class="tags">${e.badge?`<span class="tag">${i(e.badge)}</span>`:""}${E&&!e.available?'<span class="tag tag--out">Agotado</span>':""}</div>`:""}
      <div class="card__media"><img src="${U(P(e),600)}" alt="${i(R(e))}" loading="lazy" decoding="async" data-card-img></div>
      ${O(e)?`<div class="dots">${e.colors.slice(0,7).map(a=>`<span class="dot" style="--c:${a.hex}" title="${i(a.name)}" data-swap="${U(a.images[0],600)}" data-color="${a.id}"></span>`).join("")}</div>`:'<div class="dots"></div>'}
      <h3 class="card__name">${i(e.name)}</h3>
      <p class="card__tag">${i(e.tagline)}</p>
      <p class="card__price">Desde ${u(e.fromPrice)}</p>
      <p class="card__cuota">o ${A(e.fromPrice)}/mes en ${o.installments} cuotas</p>
      <span class="btn btn--primary btn--sm">Comprar</span>
    </a>`,X=(e,a,t="")=>{const s=a.map(n=>h[n]).filter(Boolean);return s.length?`<section class="section shelf">
      <div class="section__head wrap"><div><h2 class="h2">${e}</h2>${t?`<p class="lead">${t}</p>`:""}</div>
        <div class="shelf__arrows"><button class="round" data-scroll="-1" aria-label="Anterior">\u2039</button><button class="round" data-scroll="1" aria-label="Siguiente">\u203A</button></div></div>
      <div class="shelf__track">${s.map(he).join("")}</div></section>`:""},ge=()=>'<p class="secure-note"><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5Zm-3 8V7a3 3 0 0 1 6 0v3H9Z"/></svg>Pago 100% seguro procesado por Shopify \xB7 datos cifrados</p>',Ae=()=>`<div class="trustband">${[["\u{1F512}","Pago seguro","Pagas en el checkout de Shopify con cifrado SSL. No guardamos datos de tu tarjeta."],["\u2705","Originales y sellados","Productos Apple nuevos, en su caja sellada."],["\u21A9\uFE0F","Derecho de retracto","5 d\xEDas h\xE1biles para compras en l\xEDnea (Ley 1480 de 2011)."],["\u{1F4AC}","Te acompa\xF1amos","Asesor\xEDa por WhatsApp antes y despu\xE9s de tu compra."]].map(([e,a,t])=>`<div class="trustband__item reveal"><span class="trustband__icon">${e}</span><div><b>${a}</b><span>${t}</span></div></div>`).join("")}</div>`,z=()=>`<div class="paywall">${o.paymentMethods.map(e=>`<span class="pill">${i(e)}</span>`).join("")}</div>`,be=e=>`<div class="faq">${e.map(([a,t])=>`<details><summary>${i(a)}</summary><p>${t}</p></details>`).join("")}</div>`,Y=[["\xBFLos productos son originales y nuevos?","S\xED. Todos los productos son Apple originales, nuevos y sellados de f\xE1brica."],["\xBFQu\xE9 garant\xEDa tienen?","Antes de tu compra te explicamos por WhatsApp las condiciones de garant\xEDa de cada equipo y te acompa\xF1amos si la necesitas."],["\xBFCu\xE1nto se demora el env\xEDo?",`En ${o.sameDayCity} entregamos el mismo d\xEDa. Al resto del pa\xEDs, en ${o.otherCitiesDays}, con n\xFAmero de gu\xEDa. El costo del env\xEDo se calcula al pagar seg\xFAn tu ciudad.`],["\xBFPuedo pagar a cuotas?",`S\xED, puedes diferir tu compra hasta en ${o.installments} cuotas con tu tarjeta de cr\xE9dito. Los intereses dependen de tu banco; la cuota que mostramos es el precio dividido en ${o.installments}, sin intereses.`],["\xBFPuedo devolver mi compra?","Tienes derecho de retracto de 5 d\xEDas h\xE1biles desde la entrega para compras en l\xEDnea, siempre que el producto est\xE9 sin usar y en su empaque original (Ley 1480 de 2011)."]],R=(e,a=e.colors[0],t=0)=>`${e.name}${a&&a.hex?" color "+a.name:a&&a.name!=="Est\xE1ndar"?" "+a.name:""}${t?" \u2013 vista "+(t+1):""} original en Colombia`,$e=e=>{const a=S.find(s=>s.id===e),t=a&&h[a.hero];return t&&t.badge?t:_.find(s=>s.cat===e&&s.badge)||null},ee=(e,a)=>[...e].sort((t,s)=>(s===a)-(t===a)||!!s.badge-!!t.badge),ae='<span class="launch-pill">Nuevo lanzamiento</span>',te=()=>B.get("nova-recent",[]).filter(e=>h[e]);function Se(){const e=h[o.hero.id]||_.find(n=>n.cat==="iphone")||_[0];if(!e)return'<section class="wrap section center"><h1 class="h2">Muy pronto</h1><p class="lead">Estamos preparando nuestra tienda Apple.</p></section>';const a=e.colors.find(n=>n.id===o.hero.color)||e.colors[0],t=o.tiles.map(n=>h[n]).filter(Boolean),s=o.tradeIn;return`
    <section class="hero">
      <div class="hero__copy">
        <h1 class="eyebrow eyebrow--accent">Tienda de iPhone en ${i(o.sameDayCity)} y toda Colombia</h1>
        ${e.badge?ae:""}
        <h2 class="hero__title">${i(o.hero.title)}</h2>
        <p class="hero__sub">${i(o.hero.headline)}</p>
        <p class="hero__price">Desde ${u(e.fromPrice)} o <b>${A(e.fromPrice)}/mes</b> en ${o.installments} cuotas</p>
        <div class="cta-row"><a class="btn btn--primary btn--lg" href="${$.p(e,"color="+a.id)}">Comprar</a><a class="btn btn--link" href="/iphone/">Ver todos los iPhone \u203A</a></div>
      </div>
      <div class="hero__media"><img src="${a.images[0]}" alt="${i(R(e,a))}" fetchpriority="high"></div>
    </section>

    <section class="chapters wrap" aria-label="Categor\xEDas">
      ${S.map(n=>{const l=h[n.hero]||_.find(p=>p.cat===n.id);return l?`<a class="chapter" href="${$.cat(n.id)}"><span class="chapter__img"><img src="${P(l)}" alt="${i(l.name)}" loading="lazy"></span><span>${n.name}</span></a>`:""}).join("")}
    </section>

    <section class="benefits wrap">
      ${[["\u26A1",`Hoy mismo en ${o.sameDayCity}`,"Entrega el mismo d\xEDa"],["\u{1F69A}","Env\xEDos a toda Colombia",`En ${o.otherCitiesDays}, con gu\xEDa`],["\u{1F4B3}",`Hasta ${o.installments} cuotas`,"Con tu tarjeta de cr\xE9dito"],["\u2705","Originales y sellados","Productos Apple nuevos"],["\u{1F4AC}","Asesor\xEDa por WhatsApp","Te ayudamos a elegir"]].map(([n,l,p])=>`<div class="benefit reveal"><span class="benefit__icon">${n}</span><div><b>${l}</b><p>${i(p)}</p></div></div>`).join("")}
    </section>

    ${window.Explorer?window.Explorer.html({productId:"iphone-18-pro-max",price:h["iphone-18-pro-max"]?u(h["iphone-18-pro-max"].fromPrice):""}):""}

    <section class="tiles wrap">
      ${t.map((n,l)=>`
        <article class="tile ${l%3===0?"tile--wide":""} reveal">
          <div class="tile__copy">
            ${n.badge?`<p class="eyebrow eyebrow--accent">${i(n.badge)}</p>`:""}
            <h2 class="tile__title">${i(n.name)}</h2>
            <p class="tile__sub">${i(n.tagline)}</p>
            <p class="tile__price">Desde ${u(n.fromPrice)} \xB7 ${A(n.fromPrice)}/mes</p>
            <div class="cta-row"><a class="btn btn--primary btn--sm" href="${$.p(n)}">Comprar</a><a class="btn btn--link" href="${$.cat(n.cat)}">M\xE1s ${M(n.cat)} \u203A</a></div>
          </div>
          <a class="tile__media" href="${$.p(n)}"><img src="${P(n)}" alt="${i(R(n))}" loading="lazy"></a>
        </article>`).join("")}
    </section>

    ${X("Nuestros recomendados",o.bestSellers,"Los imprescindibles para estrenar este mes.")}

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

    ${te().length?X("Vistos recientemente",te()):""}

    <section class="section wrap center">
      <h2 class="h2">Paga como prefieras.</h2>
      <p class="lead">Paga de contado o hasta en ${o.installments} cuotas ${i(o.installmentsNote)}.</p>
      ${z()}
    </section>

    <section class="section wrap">
      <h2 class="h2 center">\xBFPor qu\xE9 comprar en ${i(o.name)}?</h2>
      <div class="why">
        ${[["Productos 100% originales","Nuevos y sellados. Nada de r\xE9plicas ni reacondicionados sin avisar."],["Asesor\xEDa experta","Te ayudamos a elegir por WhatsApp, sin presi\xF3n y con respuesta r\xE1pida."],["Entrega r\xE1pida",`El mismo d\xEDa en ${o.sameDayCity} y en ${o.otherCitiesDays} al resto del pa\xEDs, con seguimiento.`],["Pago seguro","Pagas en el checkout de Shopify con tarjeta o PSE; tus datos est\xE1n protegidos."]].map(([n,l])=>`<div class="why__item reveal"><h3>${n}</h3><p>${l}</p></div>`).join("")}
      </div>
    </section>

    <section class="section wrap">
      <h2 class="h2 center">Compra con total confianza</h2>
      <p class="lead center">Tu compra est\xE1 protegida de principio a fin.</p>
      ${Ae()}
    </section>

    <section class="section wrap narrow seo-text">
      <h2 class="h2">Tu tienda Apple en ${i(o.sameDayCity)}, con env\xEDos a toda Colombia</h2>
      <p>En ${i(o.name)} vendemos productos Apple originales, nuevos y sellados: <a href="/iphone/">iPhone</a>, <a href="/mac/">MacBook</a>, <a href="/ipad/">iPad</a>, <a href="/watch/">Apple Watch</a>, <a href="/airpods/">AirPods</a> y <a href="/accesorios/">accesorios</a>. Si buscas una tienda de iPhone en ${i(o.sameDayCity)}, te lo entregamos el mismo d\xEDa; al resto del pa\xEDs enviamos en ${i(o.otherCitiesDays)} con n\xFAmero de gu\xEDa.</p>
      <p>Paga de contado o hasta en ${o.installments} cuotas con tu tarjeta de cr\xE9dito, en el checkout seguro de Shopify. ${["iphone-18-pro-max","iphone-17","airpods-pro-3","macbook-air-13-m5"].filter(n=>h[n]).map(n=>`<a href="${$.p(h[n])}">${i(h[n].name)}</a>`).join(", ")} y m\xE1s modelos, con asesor\xEDa por WhatsApp para que elijas el ideal.</p>
    </section>

    <section class="section wrap narrow">
      <h2 class="h2 center">Preguntas frecuentes</h2>
      ${be(Y)}
    </section>`}function Ie(e,a){const t=S.find(d=>d.id===e);if(!t)return se();const s=$e(e);let n=ee(_.filter(d=>d.cat===e),s);const l=a.get("orden")||"rec";l==="asc"&&(n=[...n].sort((d,b)=>d.fromPrice-b.fromPrice)),l==="desc"&&(n=[...n].sort((d,b)=>b.fromPrice-d.fromPrice));const p=d=>[...new Set(d.configs.map(b=>(/(\d+\s?(GB|TB))/.exec(b)||[])[1]).filter(Boolean))];return`
    <section class="cat-hero wrap">
      <h1 class="display">${i(t.name)}</h1>
      <p class="lead">${i(t.blurb)}</p>
    </section>
    ${s?(()=>{const d=e==="iphone"&&s.colors.find(b=>b.id===o.hero.color)||s.colors[0];return`
    <section class="hero hero--cat" aria-label="Nuevo lanzamiento">
      <div class="hero__copy">
        ${ae}
        <h2 class="hero__title">${i(s.name)}</h2>
        <p class="hero__sub">${i(s.tagline)}</p>
        <p class="hero__price">Desde ${u(s.fromPrice)} o <b>${A(s.fromPrice)}/mes</b> en ${o.installments} cuotas</p>
        <div class="cta-row"><a class="btn btn--primary btn--lg" href="${$.p(s,"color="+d.id)}">Comprar</a>${E&&!s.available?'<span class="muted small">Agotado por ahora \xB7 preg\xFAntanos por WhatsApp</span>':""}</div>
      </div>
      <a class="hero__media" href="${$.p(s,"color="+d.id)}"><img src="${d.images[0]}" alt="${i(R(s,d))}" fetchpriority="high"></a>
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
    <section class="grid wrap">${n.map(he).join("")}</section>
    ${["iphone","ipad","mac","watch"].includes(e)?`
    <section class="section wrap">
      <h2 class="h2">Compara los modelos</h2>
      <div class="compare-wrap"><table class="compare">
        <thead><tr><th>Modelo</th><th>Precio desde</th><th>Cuota desde</th><th>${e==="watch"?"Tama\xF1os":"Almacenamiento"}</th><th>Acabados</th><th></th></tr></thead>
        <tbody>${ee(_.filter(d=>d.cat===e),s).map(d=>`<tr>
          <td><a href="${$.p(d)}"><img src="${P(d)}" alt="" loading="lazy">${i(d.name)}</a></td>
          <td>${u(d.fromPrice)}</td><td>${A(d.fromPrice)}/mes</td>
          <td>${e==="watch"?[...new Set(d.configs.map(b=>b.split(" \xB7 ")[0]))].join(", "):p(d).join(", ")}</td>
          <td><span class="dots dots--inline">${d.colors.map(b=>`<span class="dot" style="--c:${b.hex}" title="${i(b.name)}"></span>`).join("")}</span></td>
          <td><a class="btn btn--primary btn--xs" href="${$.p(d)}">Comprar</a></td></tr>`).join("")}</tbody>
      </table></div>
    </section>`:""}
    ${t.seo?`<section class="section wrap narrow seo-text"><h2 class="h2">${i(t.seo.h2)}</h2><p>${i(t.seo.text)}</p></section>`:""}
    <section class="section wrap center">${z()}</section>`}let m=null;function xe(e,a){const t=h[e];if(!t)return se();const s=[e,...te().filter(c=>c!==e)].slice(0,10);B.set("nova-recent",s);const n=t.colors.find(c=>c.id===a.get("color"))?a.get("color"):t.colors[0].id,l=t.variants.filter(c=>c.color===n).sort((c,g)=>c.price-g.price),p=l.find(c=>c.config===a.get("config"))?a.get("config"):l[0].config;m={m:t,color:n,config:p,img:0,protect:!1,trade:null};const d=(o.crossSell[t.cat]||[]).filter(c=>c!==e),b=t.cat==="iphone";return`
    <nav class="crumbs wrap" aria-label="Ruta"><a href="/">Inicio</a><span>\u203A</span><a href="${$.cat(t.cat)}">${M(t.cat)}</a><span>\u203A</span><span>${i(t.name)}</span></nav>
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
        ${t.badge?ae:""}
        <h1 class="pdp__title">${i(t.name)}</h1>
        <p class="pdp__tag">${i(t.tagline)}</p>
        <div class="price-box" id="priceBox"></div>

        <fieldset class="opt">
          <legend>${O(t)?"Color":"Modelo"}. <b id="colorName"></b></legend>
          <div class="${O(t)?"swatches":"chips"}" id="colorOpts">
            ${t.colors.map(c=>O(t)?`<button class="swatch" style="--c:${c.hex}" data-color="${c.id}" aria-label="${i(c.name)}" title="${i(c.name)}"></button>`:`<button class="chip" data-color="${c.id}">${i(c.name)}</button>`).join("")}
          </div>
        </fieldset>

        ${re(t)?`<fieldset class="opt">
          <legend>${t.cat==="watch"?"Tama\xF1o y conectividad":t.cat==="mac"?"Configuraci\xF3n":"Capacidad"}.</legend>
          <div class="configs" id="configOpts"></div>
        </fieldset>`:""}

        ${b&&o.tradeIn.enabled?`<fieldset class="opt tradein" id="tradeBox">
          <legend>\xBFTienes un smartphone para entregar como parte de pago?</legend>
          <div class="seg"><button class="seg__btn" data-trade="yes">S\xED, cotizar retoma</button><button class="seg__btn is-on" data-trade="no">No, gracias</button></div>
          <div class="tradein__form" id="tradeForm" hidden>
            <label>Modelo<select id="tradeDevice">${o.tradeIn.devices.map(([c],g)=>`<option value="${g}">${i(c)}</option>`).join("")}</select></label>
            <label>Estado<select id="tradeCond">${o.tradeIn.conditions.map(([c],g)=>`<option value="${g}">${c}</option>`).join("")}</select></label>
            <p class="small muted">Valor estimado. Se confirma con la revisi\xF3n t\xE9cnica al entregar tu equipo.</p>
          </div>
        </fieldset>`:""}

        ${o.protection.cats.includes(t.cat)?`<label class="protect">
          <input type="checkbox" id="protect">
          <span><b>Agrega ${i(o.protection.name)}</b> por <b id="protectPrice"></b><br><span class="small muted">Cubre da\xF1os accidentales, pantalla rota y contacto con l\xEDquidos. Reemplazo r\xE1pido.</span></span>
        </label>`:""}

        <div class="buy-actions">
          <button class="btn btn--primary btn--lg btn--block" id="addBtn">Agregar a la bolsa</button>
          <a class="btn btn--wa btn--lg btn--block" id="waBuy" target="_blank" rel="noopener">Comprar con asesor por WhatsApp</a>
          ${ge()}
        </div>

        <ul class="delivery">
          <li><span>\u26A1</span><div id="sameDay"></div></li>
          <li><span>\u{1F69A}</span><div><b>Env\xEDos a toda Colombia</b><br><span class="muted small">Llega en ${o.otherCitiesDays} con n\xFAmero de gu\xEDa. El costo se calcula al pagar.</span></div></li>
          <li><span>\u{1F4AC}</span><div><b>\xBFDudas? Te asesoramos</b><br><span class="muted small">Escr\xEDbenos por WhatsApp y te respondemos en minutos.</span></div></li>
        </ul>
        <ul class="trust">
          <li>\u2705 Original y sellado</li><li>\u{1F512} Pago seguro en Shopify</li><li>\u21A9\uFE0F Retracto 5 d\xEDas h\xE1biles</li>
        </ul>
        ${z()}
      </div>
    </section>

    ${/^iphone-18-pro/.test(t.id)&&window.Explorer?window.Explorer.html({productId:"iphone-18-pro-max",price:h["iphone-18-pro-max"]?u(h["iphone-18-pro-max"].fromPrice):""}):""}
    <section class="section wrap narrow about reveal"><h2 class="eyebrow">Acerca del ${i(t.name)}</h2>${t.description?`<p class="about__text">${i(t.description)}</p>`:""}
      <p class="about__seo">Compra tu ${i(t.name)} original y sellado en ${i(o.name)}: entrega el mismo d\xEDa en ${i(o.sameDayCity)}, env\xEDos a toda Colombia en ${i(o.otherCitiesDays)} y pago hasta en ${o.installments} cuotas con tu tarjeta de cr\xE9dito. Mira todos los <a href="${$.cat(t.cat)}">${i(M(t.cat))} disponibles</a>.</p></section>
    ${d.length?X("Arma tu combo perfecto",d,`Lo que m\xE1s compran junto con ${i(t.name)}.`):""}
    <section class="section wrap narrow"><h2 class="h2 center">Preguntas frecuentes</h2>${be(Y)}</section>

    <div class="buybar" id="buybar" aria-hidden="true">
      <div class="buybar__inner wrap">
        <div><b>${i(t.name)}</b><span class="muted small" id="barLabel"></span></div>
        <div class="buybar__right"><span id="barPrice"></span><button class="btn btn--primary btn--sm" id="barAdd">Agregar</button></div>
      </div>
    </div>`}function De(){const{m:e}=m,a=()=>e.variants.find(c=>c.color===m.color&&c.config===m.config),t=()=>{if(!m.trade)return 0;const[,c]=o.tradeIn.devices[m.trade.d],[,g]=o.tradeIn.conditions[m.trade.c];return Math.round(c*g/1e4)*1e4},s=()=>{const c=a(),g=e.colors.find(L=>L.id===m.color),w=m.protect?Q(e,c.price):0,y=t(),I=c.price+w-y;r("#priceBox").innerHTML=`
        <p class="price">${u(c.price)} ${c.compare&&c.compare>c.price?`<s>${u(c.compare)}</s>`:""}</p>
        <p class="price__cuota">o <b>${A(c.price)}/mes</b> en ${o.installments} cuotas \xB7 ${i(o.installmentsNote)}</p>
        ${y||w?`<p class="price__total">Total con ${[w?"protecci\xF3n":"",y?"retoma":""].filter(Boolean).join(" y ")}: <b>${u(I)}</b>${y?` <span class="ok">(\u2212${u(y)})</span>`:""}</p>`:""}`,r("#colorName").textContent=g.name,k("#colorOpts [data-color]").forEach(L=>L.classList.toggle("is-on",L.dataset.color===m.color)),r("#configOpts")&&(r("#configOpts").innerHTML=e.configs.map(L=>{const j=e.variants.find(Ce=>Ce.config===L&&Ce.color===m.color);return`<button class="config ${L===m.config?"is-on":""}" data-config="${i(L)}" ${j?"":"disabled"}>
            <span>${i(L)}</span><span class="config__price">${j?u(j.price)+(E&&!j.available?" \xB7 Agotado":""):"No disponible en este color"}</span></button>`}).join("")),r("#protectPrice")&&(r("#protectPrice").textContent=u(Q(e,c.price)));const x=g.images;m.img=Math.min(m.img,x.length-1);const v=r("#galMain");v.alt=R(e,g,m.img),v.getAttribute("src")!==x[m.img]&&(v.classList.remove("fade"),v.offsetWidth,v.classList.add("fade"),v.src=x[m.img]),r("#thumbs").innerHTML=x.map((L,j)=>`<button class="thumb ${j===m.img?"is-on":""}" data-img="${j}" aria-label="Ver imagen ${j+1} de ${i(e.name)}"><img src="${L}" alt="" loading="lazy"></button>`).join("");const D=[m.config!=="Est\xE1ndar"?m.config:"",g.name].filter(Boolean).join(" \xB7 ");r("#barLabel").textContent=" "+D,r("#barPrice").textContent=u(c.price);const V=!c.available;r("#addBtn").disabled=V,r("#barAdd").disabled=V,r("#addBtn").textContent=V?E?"Agotado":"Disponible muy pronto":"Agregar a la bolsa",r("#barAdd").textContent=V?"Agotado":"Agregar",r("#waBuy").href=T(`Hola ${o.name}, me interesa el ${e.name} (${D}) de ${u(c.price)}.`+(y?` Quiero entregar mi ${o.tradeIn.devices[m.trade.d][0]} (${o.tradeIn.conditions[m.trade.c][0]}) en retoma.`:"")+" \xBFEst\xE1 disponible?"),r("#waFloat").href=r("#waBuy").href,history.replaceState(null,"",$.p(e,`color=${m.color}${re(e)?"&config="+encodeURIComponent(m.config):""}`))},n=()=>{const c=a(),g=t();le({id:e.id,color:c.color,config:c.config,protection:m.protect?Q(e,c.price):0,tradeIn:g?{device:o.tradeIn.devices[m.trade.d][0],cond:o.tradeIn.conditions[m.trade.c][0],value:g}:null})},l=r(".pdp");l.addEventListener("click",c=>{const g=c.target.closest("[data-color]"),w=c.target.closest("[data-config]"),y=c.target.closest("[data-img]"),I=c.target.closest("[data-gal]"),x=c.target.closest("[data-trade]");if(g&&(m.color=g.dataset.color,m.img=0,a()||(m.config=e.variants.filter(v=>v.color===m.color).sort((v,D)=>v.price-D.price)[0].config)),w&&!w.disabled&&(m.config=w.dataset.config),y&&(m.img=+y.dataset.img),I){const v=e.colors.find(D=>D.id===m.color).images.length;m.img=(m.img+ +I.dataset.gal+v)%v}if(x){const v=x.dataset.trade==="yes";k("[data-trade]").forEach(D=>D.classList.toggle("is-on",D===x)),r("#tradeForm").hidden=!v,m.trade=v?{d:+r("#tradeDevice").value,c:+r("#tradeCond").value}:null}(g||w||y||I||x)&&s()}),l.addEventListener("change",c=>{c.target.id==="protect"&&(m.protect=c.target.checked),(c.target.id==="tradeDevice"||c.target.id==="tradeCond")&&(m.trade={d:+r("#tradeDevice").value,c:+r("#tradeCond").value}),s()}),r("#addBtn").addEventListener("click",n),r("#barAdd").addEventListener("click",n);let p=null;r(".gallery").addEventListener("touchstart",c=>{p=c.touches[0].clientX},{passive:!0}),r(".gallery").addEventListener("touchend",c=>{if(p===null)return;const g=c.changedTouches[0].clientX-p;p=null,Math.abs(g)>40&&r(`[data-gal="${g<0?1:-1}"]`).click()});const d=()=>{const c=r("#sameDay");if(!c)return clearInterval(m.timer);if(!o.sameDayCutoff){c.innerHTML=`<b>Rec\xEDbelo hoy en ${o.sameDayCity}</b><br><span class="muted small">Entrega el mismo d\xEDa en ${o.sameDayCity}.</span>`;return}const{h:g,m:w,day:y}=Ee(),I=o.sameDayCutoff*60-(g*60+w);c.innerHTML=I>0&&y!=="Sun"?`<b>Rec\xEDbelo hoy en ${o.sameDayCity}</b><br><span class="muted small">Compra en las pr\xF3ximas <b class="accent">${Math.floor(I/60)} h ${I%60} min</b></span>`:`<b>Rec\xEDbelo ${y==="Sat"||y==="Sun"?"el lunes":"ma\xF1ana"} en ${o.sameDayCity}</b><br><span class="muted small">Pide antes de las ${o.sameDayCutoff}:00 para entrega el mismo d\xEDa.</span>`};d(),m.timer=setInterval(d,3e4),new IntersectionObserver(([c])=>{const g=r("#buybar");if(!g)return;const w=!c.isIntersecting&&c.boundingClientRect.top<0;g.classList.toggle("show",w),g.setAttribute("aria-hidden",String(!w))}).observe(r("#addBtn")),s()}function Te(){if(!f.length)return'<section class="wrap narrow section center"><h1 class="h2">Tu bolsa est\xE1 vac\xEDa</h1><p class="lead">Agrega un producto para continuar.</p><a class="btn btn--primary" href="/">Ir a la tienda</a></section>';const e=K(),a=[["tarjeta","Tarjeta de cr\xE9dito",`Hasta ${o.installments} cuotas \xB7 ${o.installmentsNote}`],["pse","PSE","D\xE9bito desde tu cuenta de ahorros o corriente"],["nequi","Nequi o Daviplata","Paga desde tu celular"],["addi","Addi","Compra ahora y paga a cuotas, aprobaci\xF3n en minutos"],["sistecredito","Sistecr\xE9dito","Cr\xE9dito con tu c\xE9dula"]];return`
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
            <label class="radio"><input type="radio" name="entrega" value="envio" checked><span><b>Env\xEDo a domicilio</b><br><span class="small muted">${e.ship===null?"Se calcula al pagar":e.ship?u(e.ship):"Gratis"} \xB7 Mismo d\xEDa en ${o.sameDayCity}, ${o.otherCitiesDays} al resto del pa\xEDs</span></span></label>
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
        <button class="btn btn--primary btn--lg btn--block" type="submit">Confirmar pedido \xB7 ${u(e.total)}</button>
        <p class="small muted center">Al confirmar, un asesor te enviar\xE1 el enlace de pago seguro por WhatsApp.</p>
      </form>
      <aside class="checkout__summary">
        <h2 class="h3">Resumen</h2>
        <ul class="lines lines--compact">${f.map(t=>`<li class="line"><span class="line__img"><img src="${P(h[t.id],t.color)}" alt=""><i>${t.qty}</i></span>
          <div class="line__info"><b class="small">${i(h[t.id].name)}</b><p class="small muted">${i(J(t))}</p>${t.protection?`<p class="small">+ ${i(o.protection.name)}</p>`:""}${t.tradeIn?`<p class="small ok">Retoma \u2212${u(t.tradeIn.value)}</p>`:""}</div>
          <b class="small">${u(W(t))}</b></li>`).join("")}</ul>
        <dl class="sum">
          <div><dt>Subtotal</dt><dd>${u(e.sub)}</dd></div>
          ${e.trade?`<div class="ok"><dt>Retoma (estimado)</dt><dd>\u2212${u(e.trade)}</dd></div>`:""}
          <div><dt>Env\xEDo</dt><dd>${e.ship===null?"Se calcula al pagar":e.ship?u(e.ship):"Gratis"}</dd></div>
          <div class="sum__total"><dt>Total</dt><dd>${u(e.total)}</dd></div>
        </dl>
        <p class="small muted">o ${A(e.total)}/mes en ${o.installments} cuotas</p>
        <ul class="trust trust--col"><li>\u2705 Productos originales y sellados</li><li>\u21A9\uFE0F Derecho de retracto de 5 d\xEDas h\xE1biles</li></ul>
      </aside>
    </section>`}function qe(){const e=r("#checkoutForm");e&&(e.addEventListener("change",a=>{if(a.target.name==="entrega"){const t=a.target.value==="envio";r("#shipFields").hidden=!t,k("#shipFields input").forEach(s=>{s.required=t})}}),e.addEventListener("submit",a=>{a.preventDefault(),k(".invalid",e).forEach(p=>p.classList.remove("invalid"));const t=k("input",e).filter(p=>!p.checkValidity());if(t.forEach(p=>(p.closest("label")||p).classList.add("invalid")),r("#formError").hidden=!t.length,t.length){t[0].focus();return}const s=Object.fromEntries(new FormData(e)),n="NV-"+Date.now().toString(36).toUpperCase().slice(-6),l=de(`

Pedido ${n}
Cliente: ${s.nombre} \xB7 CC ${s.cedula}
Correo: ${s.email} \xB7 Cel: ${s.celular}
`+(s.entrega==="envio"?`Entrega: ${s.direccion}, ${s.ciudad} (${s.departamento})`:"Entrega: Retiro en tienda")+`
Pago: ${s.pago}`);B.set("nova-last-order",{order:n,name:s.nombre.split(" ")[0],wa:T(l)}),window.open(T(l),"_blank","noopener"),f=[],H(),F("/gracias/")}))}function je(){const e=B.get("nova-last-order",null);return`<section class="wrap narrow section center thanks">
      <div class="thanks__icon">\u2713</div>
      <h1 class="h2">\xA1Gracias${e?", "+i(e.name):""}! Recibimos tu pedido.</h1>
      ${e?`<p class="lead">N\xFAmero de pedido <b>${i(e.order)}</b>. Un asesor te escribir\xE1 por WhatsApp con el enlace de pago seguro y la confirmaci\xF3n de entrega.</p>
      <a class="btn btn--wa" href="${e.wa}" target="_blank" rel="noopener">Abrir WhatsApp de nuevo</a>`:""}
      <p><a class="btn btn--link" href="/">Seguir comprando \u203A</a></p></section>`}const C=o.siteUrl||location.origin,Me=(e,a=158)=>e.length>a?e.slice(0,a-1).replace(/\s+\S*$/,"")+"\u2026":e,N=e=>U(e,1200)||"",fe=e=>({"@type":"BreadcrumbList",itemListElement:e.map(([a,t],s)=>({"@type":"ListItem",position:s+1,name:a,item:C+t}))}),ve={"@id":C+"/#tienda"};function Be(e){const a=S.find(s=>s.id===e[0]);if(!e.length){const s=h[o.hero.id]||_[0];return{title:`Tienda de iPhone en ${o.sameDayCity} y Colombia \xB7 ${o.name}`,desc:`Compra iPhone, MacBook, iPad, AirPods y Apple Watch originales y sellados. Entrega el mismo d\xEDa en ${o.sameDayCity}, env\xEDos a toda Colombia y hasta ${o.installments} cuotas.`,image:s&&N(P(s)),ld:[{"@type":"WebPage","@id":C+"/#portada",url:C+"/",name:`Tienda de iPhone en ${o.sameDayCity} y Colombia`,isPartOf:{"@id":C+"/#sitio"},about:ve,inLanguage:"es-CO"},{"@type":"FAQPage",mainEntity:Y.map(([n,l])=>({"@type":"Question",name:n,acceptedAnswer:{"@type":"Answer",text:l}}))}]}}if(a&&e.length===1){const s=ee(_.filter(l=>l.cat===a.id),$e(a.id)),n=a.seo||{};return{title:`${n.title||a.name+" en Colombia"} \xB7 ${o.name}`,desc:n.desc||`${a.name} originales en Colombia. Entrega el mismo d\xEDa en ${o.sameDayCity}.`,image:s[0]&&N(P(s[0])),ld:[{"@type":"CollectionPage",url:C+$.cat(a.id),name:n.title||a.name,isPartOf:{"@id":C+"/#sitio"},inLanguage:"es-CO",mainEntity:{"@type":"ItemList",itemListElement:s.map((l,p)=>({"@type":"ListItem",position:p+1,url:C+$.p(l),name:l.name}))}},fe([["Inicio","/"],[a.name,$.cat(a.id)]])]}}const t=e.length===2&&h[e[1]];if(t){const s=t.variants.map(l=>l.price),n={"@type":"AggregateOffer",priceCurrency:"COP",lowPrice:Math.min(...s),highPrice:Math.max(...s),offerCount:t.variants.length,url:C+$.p(t),seller:ve,itemCondition:"https://schema.org/NewCondition"};return E&&(n.availability=t.variants.some(l=>l.available)?"https://schema.org/InStock":"https://schema.org/OutOfStock"),{title:`${t.name} precio en Colombia \xB7 ${o.name}`,desc:Me(`Compra ${t.name} original y sellado desde ${u(t.fromPrice)} o ${A(t.fromPrice)}/mes en ${o.installments} cuotas. Entrega el mismo d\xEDa en ${o.sameDayCity} y env\xEDos a toda Colombia.`),image:N(P(t)),type:"product",ld:[{"@type":"Product",name:t.name,url:C+$.p(t),description:t.description||t.tagline||t.name,brand:{"@type":"Brand",name:"Apple"},category:M(t.cat),image:t.colors.flatMap(l=>l.images.slice(0,2)).slice(0,8).map(N),...t.colors.length>1&&O(t)?{color:t.colors.map(l=>l.name).join(", ")}:{},offers:n},fe([["Inicio","/"],[M(t.cat),$.cat(t.cat)],[t.name,$.p(t)]])]}}return null}function Oe(e,a){const t=e||{title:`P\xE1gina no encontrada \xB7 ${o.name}`,desc:"",noindex:!0},s=(l,p)=>{const d=document.head.querySelector(l);d&&d.setAttribute(d.tagName==="LINK"?"href":"content",p)};document.title=t.title,s('meta[name="description"]',t.desc),s('meta[name="robots"]',t.noindex?"noindex,follow":"index,follow,max-image-preview:large"),s('link[rel="canonical"]',C+a),s('meta[property="og:type"]',t.type||"website"),s('meta[property="og:url"]',C+a),s('meta[property="og:title"]',t.title),s('meta[property="og:description"]',t.desc),t.image&&(s('meta[property="og:image"]',t.image),s('meta[name="twitter:image"]',t.image)),s('meta[name="twitter:title"]',t.title),s('meta[name="twitter:description"]',t.desc);const n=r("#ldPage");n&&(n.textContent=t.ld?JSON.stringify({"@context":"https://schema.org","@graph":t.ld}):"{}")}window.STORE_PAGES=()=>["/",...S.filter(e=>_.some(a=>a.cat===e.id)).map(e=>$.cat(e.id)),..._.map(e=>$.p(e))].map(e=>{const a=h[e.split("/").filter(Boolean)[1]];return{path:e,images:a?a.colors.flatMap(t=>t.images.slice(0,2)).slice(0,8).map(N):[],title:a?a.name:""}});const se=()=>'<section class="wrap narrow section center"><h1 class="h2">No encontramos esta p\xE1gina</h1><a class="btn btn--primary" href="/">Volver al inicio</a></section>';function Re(){if(!location.hash.startsWith("#/"))return;const[e,a]=location.hash.slice(1).split("?"),[t,s]=e.split("/").filter(Boolean),n=t==="c"&&s?$.cat(s):t==="p"&&h[s]?$.p(h[s]):t?`/${t}/`:"/";history.replaceState(null,"",n+(a?"?"+a:""))}function q(){Re();const e=new URLSearchParams(location.search);let a=location.pathname.split("/").filter(Boolean);a.length===2&&h[a[1]]&&h[a[1]].cat!==a[0]&&(history.replaceState(null,"",$.p(h[a[1]],location.search.slice(1))),a=[h[a[1]].cat,a[1]]),m&&m.timer&&clearInterval(m.timer),m=null;const t=a.length===1&&S.some(b=>b.id===a[0]);let s,n=Be(a);a.length?t?s=Ie(a[0],e):a.length===2&&h[a[1]]?s=xe(a[1],e):a[0]==="checkout"?(s=Te(),n={title:`Finalizar compra \xB7 ${o.name}`,desc:"",noindex:!0}):a[0]==="gracias"?(s=je(),n={title:`Gracias por tu compra \xB7 ${o.name}`,desc:"",noindex:!0}):(s=se(),n=null):s=Se();const l=!q.done;q.done=!0,G.innerHTML=s,G.removeAttribute("data-prerendered"),Oe(n,a.length?`/${a.join("/")}/`:"/");const p=t?a[0]:a.length===2&&h[a[1]]?h[a[1]].cat:"";k("#navLinks a").forEach(b=>b.classList.toggle("is-on",b.dataset.cat===p)),r("#waFloat").href=T(`Hola ${o.name}, quiero asesor\xEDa para comprar un producto Apple.`),window.Explorer&&window.Explorer.mount(G),m&&De(),a[0]==="checkout"&&qe(),Ne(),_e();const d=location.pathname;q.last!==d&&(l||window.scrollTo({top:0}),q.last=d),l&&!window.__PRERENDER&&(document.documentElement.classList.add("no-anim"),k(".reveal").forEach(b=>{b.getBoundingClientRect().top<innerHeight&&b.classList.add("in")}),requestAnimationFrame(()=>requestAnimationFrame(()=>document.documentElement.classList.remove("no-anim")))),document.documentElement.dataset.ready=d}function Ne(){k(".shelf").forEach(t=>t.addEventListener("click",s=>{const n=s.target.closest("[data-scroll]");if(!n)return;const l=r(".shelf__track",t);l.scrollBy({left:+n.dataset.scroll*l.clientWidth*.8,behavior:"smooth"})})),k(".card").forEach(t=>{t.addEventListener("mouseover",s=>{const n=s.target.closest("[data-swap]");n&&(r("[data-card-img]",t).src=n.dataset.swap)}),t.addEventListener("click",s=>{const n=s.target.closest("[data-color]");n&&(s.preventDefault(),F(t.getAttribute("href")+"?color="+n.dataset.color))})});const e=r("#sortSel");e&&e.addEventListener("change",()=>{F(location.pathname+"?orden="+e.value,!0)});const a=r("#tradeQuick");if(a){const t=()=>{const[,s]=o.tradeIn.devices[a.device.value],[,n]=o.tradeIn.conditions[a.cond.value];r("#tradeQuickVal").textContent=u(Math.round(s*n/1e4)*1e4)};a.addEventListener("change",t),t()}Fe()}const oe="IntersectionObserver"in window?new IntersectionObserver(e=>e.forEach(a=>{a.isIntersecting&&(a.target.classList.add("in"),oe.unobserve(a.target))}),{rootMargin:"0px 0px -8% 0px"}):null,Fe=()=>k(".reveal:not(.in)").forEach(e=>oe&&!window.__PRERENDER?oe.observe(e):e.classList.add("in")),ye=()=>{r("#search").hidden=!1,document.body.classList.add("locked"),r("#searchInput").value="",ne(""),setTimeout(()=>r("#searchInput").focus(),30)},we=()=>{r("#search").hidden=!0,document.body.classList.remove("locked")};function ne(e){const a=ie(e.trim()),t=a?_.filter(s=>a.split(/\s+/).every(n=>ie(`${s.name} ${M(s.cat)} ${s.tagline}`).includes(n))).slice(0,8):[];r("#searchResults").innerHTML=a?t.length?t.map(s=>`<a class="sres" href="${$.p(s)}"><img src="${P(s)}" alt="${i(s.name)}"><span><b>${i(s.name)}</b><span class="small muted">Desde ${u(s.fromPrice)} \xB7 ${A(s.fromPrice)}/mes</span></span></a>`).join(""):`<p class="muted">Sin resultados para \u201C${i(e)}\u201D. <a href="${T("Hola, busco: "+e)}" target="_blank" rel="noopener">Preg\xFAntanos por WhatsApp</a>.</p>`:`<p class="eyebrow">B\xFAsquedas populares</p><div class="chips">${["iPhone 18 Pro","AirPods Pro 3","MacBook Air","iPad","Apple Watch","Cargador"].map(s=>`<button class="chip" data-q="${s}">${s}</button>`).join("")}</div>`}r("#openSearch").addEventListener("click",ye),r("#searchInput").addEventListener("input",e=>ne(e.target.value)),r("#search").addEventListener("click",e=>{(e.target.id==="search"||e.target.closest("[data-close]")||e.target.closest(".sres"))&&we();const a=e.target.closest("[data-q]");a&&(r("#searchInput").value=a.dataset.q,ne(a.dataset.q))}),document.addEventListener("keydown",e=>{e.key==="Escape"&&(we(),Z(),_e()),e.key==="/"&&!/input|textarea|select/i.test(document.activeElement.tagName)&&(e.preventDefault(),ye())});function He(){r(".nav__name").textContent=o.name,r("#navLinks").innerHTML=S.map(t=>`<a href="${$.cat(t.id)}" data-cat="${t.id}">${t.name}</a>`).join("")+`<a href="${T("Hola, quiero asesor\xEDa")}" target="_blank" rel="noopener" class="nav__help">Asesor\xEDa</a>`;const e=r("#announce");e.innerHTML=o.announcements.map((t,s)=>`<p class="${s?"":"on"}">${i(t)}</p>`).join("");let a=0;setInterval(()=>{const t=k("p",e);t[a].classList.remove("on"),a=(a+1)%t.length,t[a].classList.add("on")},4200),r("#footer").innerHTML=`
      <div class="wrap">
        <div class="footer__cols">
          <div><h4>Comprar</h4>${S.map(t=>`<a href="${$.cat(t.id)}">${t.name}</a>`).join("")}</div>
          <div><h4>Ayuda</h4><a href="https://${o.shopifyDomain}/policies/shipping-policy">Env\xEDos y entregas</a><a href="https://${o.shopifyDomain}/policies/refund-policy">Devoluciones y retracto</a><a href="https://${o.shopifyDomain}/pages/contact">Contacto</a></div>
          <div><h4>${i(o.name)}</h4><a href="https://${o.shopifyDomain}">Celada Shopper</a><a href="https://${o.shopifyDomain}/pages/quienes-somos">Qui\xE9nes somos</a><a href="https://${o.shopifyDomain}/policies/terms-of-service">T\xE9rminos y condiciones</a><a href="https://${o.shopifyDomain}/policies/privacy-policy">Pol\xEDtica de privacidad</a></div>
          <div><h4>Contacto</h4><a href="${T("Hola "+o.name)}" target="_blank" rel="noopener">WhatsApp ${i(o.phone)}</a><a href="mailto:${o.email}">${i(o.email)}</a>${o.address?`<p>${i(o.address)}</p>`:""}${o.hours?`<p>${i(o.hours)}</p>`:""}
            <p><a href="${o.instagram}" target="_blank" rel="noopener">Instagram</a> \xB7 <a href="${o.tiktok}" target="_blank" rel="noopener">TikTok</a></p></div>
        </div>
        ${z()}
        <div class="footer__legal">
          <p>${o.legalName?i(o.legalName)+" \xB7 ":""}${o.nit?"NIT "+i(o.nit)+" \xB7 ":""}Precios en pesos colombianos. Im\xE1genes de referencia.</p>
          <p>Apple, iPhone, iPad, Mac, Apple Watch y AirPods son marcas registradas de Apple Inc. ${i(o.name)} es un comercio independiente.</p>
          <p><a href="https://www.sic.gov.co" target="_blank" rel="noopener">Superintendencia de Industria y Comercio</a> \xB7 \xA9 ${new Date().getFullYear()} ${i(o.name)}</p>
        </div>
      </div>`}const _e=()=>{document.body.classList.remove("menu-open"),r("#burger").setAttribute("aria-expanded","false")};r("#burger").addEventListener("click",()=>{const e=document.body.classList.toggle("menu-open");r("#burger").setAttribute("aria-expanded",String(e))}),window.addEventListener("scroll",()=>r("#nav").classList.toggle("scrolled",window.scrollY>8),{passive:!0}),He(),pe(),me(),document.addEventListener("click",e=>{const a=e.target.closest("a[href]");if(!a||e.defaultPrevented||e.button||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||a.target==="_blank"||a.hasAttribute("download"))return;const t=new URL(a.href,location.href);t.origin!==location.origin||/\.[a-z0-9]+$/i.test(t.pathname)||t.pathname===location.pathname&&t.search===location.search&&t.hash||(e.preventDefault(),F(t.pathname+t.search))}),window.addEventListener("popstate",q),window.addEventListener("hashchange",()=>location.hash.startsWith("#/")&&q()),q()})();
