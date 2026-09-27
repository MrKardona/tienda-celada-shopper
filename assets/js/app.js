(async()=>{"use strict";const o=window.STORE,{catalog:C,live:L}=await window.loadCatalog();document.documentElement.classList.toggle("is-demo",!L);const D=window.CATEGORIES,h=Object.fromEntries(C.map(e=>[e.id,e])),c=(e,a=document)=>a.querySelector(e),E=(e,a=document)=>[...a.querySelectorAll(e)],G=c("#app"),m=e=>"$"+Math.round(e).toLocaleString("es-CO"),A=e=>m(Math.ceil(e/o.installments)),i=e=>String(e??"").replace(/[&<>"']/g,a=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[a]),oe=e=>String(e).normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase(),M=e=>(D.find(a=>a.id===e)||{}).name||"",k=(e,a)=>(a&&e.colors.find(t=>t.id===a)||e.colors[0]).images[0],U=(e,a)=>e&&/[?&]width=\d+/.test(e)?e.replace(/width=\d+/,`width=${a}`):e,b={cat:e=>`/${e}/`,p:(e,a)=>`/${e.cat}/${e.id}/${a?"?"+a:""}`},N=(e,a)=>{history[a?"replaceState":"pushState"](null,"",e),q()},T=e=>`https://wa.me/${o.whatsapp}?text=${encodeURIComponent(e)}`,B={get(e,a){try{return JSON.parse(localStorage.getItem(e))??a}catch{return a}},set(e,a){try{localStorage.setItem(e,JSON.stringify(a))}catch{}}},Q=(e,a)=>o.protection.cats.includes(e.cat)?Math.max(o.protection.min,Math.round(a*o.protection.rate/1e3)*1e3):0,ne=e=>e.configs.length>1||e.configs[0]!=="Est\xE1ndar",R=e=>e.colors.some(a=>a.hex),we=()=>{const e=Object.fromEntries(new Intl.DateTimeFormat("en-US",{timeZone:"America/Bogota",hour:"numeric",minute:"numeric",weekday:"short",hour12:!1}).formatToParts(new Date).map(a=>[a.type,a.value]));return{h:+e.hour%24,m:+e.minute,day:e.weekday}};let ie;const _e=e=>{const a=c("#toast");a.innerHTML=e,a.classList.add("show"),clearTimeout(ie),ie=setTimeout(()=>a.classList.remove("show"),2600)};let $=B.get("nova-cart",[]).map(e=>{const a=h[e.id],t=a&&a.variants.find(s=>s.color===e.color&&s.config===e.config);return t?{...e,price:t.price,vid:t.vid}:null}).filter(Boolean);const F=()=>{B.set("nova-cart",$),le(),de()},H=e=>(e.price+(e.protection||0))*e.qty,K=()=>{const e=$.reduce((s,n)=>s+H(n),0),a=$.reduce((s,n)=>s+(n.tradeIn?n.tradeIn.value:0),0);if(L)return{sub:e,trade:a,ship:null,total:e};const t=o.freeShippingFrom?e===0||e>=o.freeShippingFrom?0:o.shippingCost:null;return{sub:e,trade:a,ship:t,total:Math.max(0,e-a+t)}};function re({id:e,color:a,config:t,qty:s=1,protection:n=0,tradeIn:d=null}){const r=h[e],u=r.variants.find(g=>g.color===a&&g.config===t)||r.variants.find(g=>g.available)||r.variants[0];if(!u.available){_e("Este producto est\xE1 agotado. Escr\xEDbenos por WhatsApp y te avisamos.");return}const f=[e,u.color,u.config,n?"p":"",d?d.device+d.cond:""].join("|"),l=$.find(g=>g.key===f);l?l.qty+=s:$.push({key:f,id:e,color:u.color,config:u.config,qty:s,price:u.price,protection:n,tradeIn:d,sku:u.sku,vid:u.vid}),F(),pe()}const J=e=>{const t=h[e.id].colors.find(s=>s.id===e.color);return[e.config!=="Est\xE1ndar"?e.config:"",t?t.name:""].filter(Boolean).join(" \xB7 ")},ce=(e="")=>{const a=K(),t=$.map(s=>`\u2022 ${s.qty} \xD7 ${h[s.id].name} (${J(s)}) \u2014 ${m(H(s))}`+(s.protection?`
   + ${o.protection.name}`:"")+(s.tradeIn?`
   Retoma: ${s.tradeIn.device} (${s.tradeIn.cond}) \u2212${m(s.tradeIn.value)}`:""));return`Hola ${o.name}, quiero hacer este pedido:

${t.join(`
`)}

Subtotal: ${m(a.sub)}`+(a.trade?`
Descuento retoma (estimado): \u2212${m(a.trade)}`:"")+`
Env\xEDo: ${a.ship===null?"Se calcula al pagar":a.ship?m(a.ship):"Gratis"}
Total: ${m(a.total)}${e}`},Ce=()=>$.filter(e=>e.tradeIn).map(e=>`Retoma solicitada para ${h[e.id].name}: ${e.tradeIn.device} (${e.tradeIn.cond}), valor estimado ${m(e.tradeIn.value)}`).join(" | "),Ee=()=>window.shopifyCheckoutUrl($,Ce());function le(){const e=$.reduce((t,s)=>t+s.qty,0),a=c("#cartCount");a.textContent=e,a.hidden=!e}function de(){const e=c("#cart"),a=K(),t=Math.max(0,o.freeShippingFrom-a.sub),s=Math.min(100,a.sub/o.freeShippingFrom*100),n=new Set($.map(r=>r.id)),d=["airpods-pro-3","cargador-magsafe","airtag","adaptador-40w"].filter(r=>h[r]&&h[r].available!==!1&&!n.has(r)).slice(0,2);e.innerHTML=`
      <div class="drawer__head"><h2>Tu bolsa</h2><button class="icon-btn" data-close-cart aria-label="Cerrar">\u2715</button></div>
      ${$.length?`
      ${L||!o.freeShippingFrom?"":`<div class="ship-meter">
        <p>${t?`Te faltan <b>${m(t)}</b> para tener <b>env\xEDo gratis</b>`:"\u{1F389} \xA1Tu pedido tiene <b>env\xEDo gratis</b>!"}</p>
        <div class="ship-meter__bar"><span style="width:${s}%"></span></div>
      </div>`}
      <ul class="lines">${$.map((r,u)=>{const f=h[r.id];return`<li class="line">
          <a href="${b.p(f,"color="+r.color)}" class="line__img"><img src="${k(f,r.color)}" alt="${i(f.name+" "+((f.colors.find(l=>l.id===r.color)||{}).name||""))}"></a>
          <div class="line__info">
            <a href="${b.p(f,"color="+r.color)}" class="line__name">${i(f.name)}</a>
            <p class="muted small">${i(J(r))}</p>
            ${r.protection?`<p class="small">\u{1F6E1}\uFE0F ${i(o.protection.name)} \xB7 ${m(r.protection)}</p>`:""}
            ${r.tradeIn?`<p class="small ok">\u{1F501} Retoma ${i(r.tradeIn.device)} \xB7 \u2212${m(r.tradeIn.value)}</p>`:""}
            <div class="line__row">
              <div class="qty" role="group" aria-label="Cantidad">
                <button data-qty="${u}" data-d="-1" aria-label="Menos">\u2212</button><span>${r.qty}</span><button data-qty="${u}" data-d="1" aria-label="M\xE1s">+</button>
              </div>
              <b>${m(H(r))}</b>
            </div>
            <button class="link small" data-remove="${u}">Eliminar</button>
          </div></li>`}).join("")}</ul>
      ${d.length?`<div class="drawer__suggest"><p class="eyebrow">Complementa tu compra</p>${d.map(r=>{const u=h[r];return`<div class="mini"><img src="${k(u)}" alt="${i(u.name)}" loading="lazy"><div><p class="small"><b>${i(u.name)}</b></p><p class="small muted">${m(u.fromPrice)}</p></div>
          <button class="btn btn--ghost btn--xs" data-quick="${r}">Agregar</button></div>`}).join("")}</div>`:""}
      <div class="drawer__foot">
        <dl class="sum">
          <div><dt>Subtotal</dt><dd>${m(a.sub)}</dd></div>
          ${a.trade?`<div class="ok"><dt>Retoma (estimado)</dt><dd>\u2212${m(a.trade)}</dd></div>`:""}
          <div><dt>Env\xEDo</dt><dd>${a.ship===null?"Se calcula al pagar":a.ship?m(a.ship):"Gratis"}</dd></div>
          <div class="sum__total"><dt>Total</dt><dd>${m(a.total)}</dd></div>
        </dl>
        ${L&&a.trade?'<p class="small muted center">El descuento por retoma se aplica cuando revisemos tu equipo.</p>':""}
        <p class="small muted center">o ${A(a.total)}/mes en ${o.installments} cuotas</p>
        ${L?`<a href="${i(Ee())}" class="btn btn--primary btn--block">\u{1F512} Pagar de forma segura</a>${ue()}`:'<a href="/checkout/" class="btn btn--primary btn--block" data-close-cart>Finalizar compra</a>'}
        <a href="${T(ce())}" target="_blank" rel="noopener" class="btn btn--wa btn--block">Pedir por WhatsApp</a>
      </div>`:`
      <div class="empty"><p>Tu bolsa est\xE1 vac\xEDa.</p><a class="btn btn--primary" href="/iphone/" data-close-cart>Ver iPhone</a></div>`}`}const pe=()=>{c("#cart").classList.add("open"),c("#cart").setAttribute("aria-hidden","false"),c("#cartBackdrop").hidden=!1,document.body.classList.add("locked")},Z=()=>{c("#cart").classList.remove("open"),c("#cart").setAttribute("aria-hidden","true"),c("#cartBackdrop").hidden=!0,document.body.classList.remove("locked")};c("#cart").addEventListener("click",e=>{const a=e.target.closest("[data-qty]"),t=e.target.closest("[data-remove]"),s=e.target.closest("[data-quick]");if(a){const n=$[+a.dataset.qty];n.qty=Math.max(1,Math.min(5,n.qty+ +a.dataset.d)),F()}if(t&&($.splice(+t.dataset.remove,1),F()),s){const n=h[s.dataset.quick];re({id:n.id,color:n.variants[0].color,config:n.variants[0].config})}e.target.closest("[data-close-cart]")&&Z()}),c("#openCart").addEventListener("click",pe),c("#cartBackdrop").addEventListener("click",Z);const me=e=>`
    <a class="card reveal" href="${b.p(e)}">
      ${L&&!e.available?'<span class="tag tag--out">Agotado</span>':e.badge?`<span class="tag">${i(e.badge)}</span>`:""}
      <div class="card__media"><img src="${U(k(e),600)}" alt="${i(z(e))}" loading="lazy" decoding="async" data-card-img></div>
      ${R(e)?`<div class="dots">${e.colors.slice(0,7).map(a=>`<span class="dot" style="--c:${a.hex}" title="${i(a.name)}" data-swap="${U(a.images[0],600)}" data-color="${a.id}"></span>`).join("")}</div>`:'<div class="dots"></div>'}
      <h3 class="card__name">${i(e.name)}</h3>
      <p class="card__tag">${i(e.tagline)}</p>
      <p class="card__price">Desde ${m(e.fromPrice)}</p>
      <p class="card__cuota">o ${A(e.fromPrice)}/mes en ${o.installments} cuotas</p>
      <span class="btn btn--primary btn--sm">Comprar</span>
    </a>`,X=(e,a,t="")=>{const s=a.map(n=>h[n]).filter(Boolean);return s.length?`<section class="section shelf">
      <div class="section__head wrap"><div><h2 class="h2">${e}</h2>${t?`<p class="lead">${t}</p>`:""}</div>
        <div class="shelf__arrows"><button class="round" data-scroll="-1" aria-label="Anterior">\u2039</button><button class="round" data-scroll="1" aria-label="Siguiente">\u203A</button></div></div>
      <div class="shelf__track">${s.map(me).join("")}</div></section>`:""},ue=()=>'<p class="secure-note"><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5Zm-3 8V7a3 3 0 0 1 6 0v3H9Z"/></svg>Pago 100% seguro procesado por Shopify \xB7 datos cifrados</p>',ke=()=>`<div class="trustband">${[["\u{1F512}","Pago seguro","Pagas en el checkout de Shopify con cifrado SSL. No guardamos datos de tu tarjeta."],["\u2705","Originales y sellados","Productos Apple nuevos, en su caja sellada."],["\u21A9\uFE0F","Derecho de retracto","5 d\xEDas h\xE1biles para compras en l\xEDnea (Ley 1480 de 2011)."],["\u{1F4AC}","Te acompa\xF1amos","Asesor\xEDa por WhatsApp antes y despu\xE9s de tu compra."]].map(([e,a,t])=>`<div class="trustband__item reveal"><span class="trustband__icon">${e}</span><div><b>${a}</b><span>${t}</span></div></div>`).join("")}</div>`,W=()=>`<div class="paywall">${o.paymentMethods.map(e=>`<span class="pill">${i(e)}</span>`).join("")}</div>`,he=e=>`<div class="faq">${e.map(([a,t])=>`<details><summary>${i(a)}</summary><p>${t}</p></details>`).join("")}</div>`,Y=[["\xBFLos productos son originales y nuevos?","S\xED. Todos los productos son Apple originales, nuevos y sellados de f\xE1brica."],["\xBFQu\xE9 garant\xEDa tienen?","Antes de tu compra te explicamos por WhatsApp las condiciones de garant\xEDa de cada equipo y te acompa\xF1amos si la necesitas."],["\xBFCu\xE1nto se demora el env\xEDo?",`En ${o.sameDayCity} entregamos el mismo d\xEDa. Al resto del pa\xEDs, en ${o.otherCitiesDays}, con n\xFAmero de gu\xEDa. El costo del env\xEDo se calcula al pagar seg\xFAn tu ciudad.`],["\xBFPuedo pagar a cuotas?",`S\xED, puedes diferir tu compra hasta en ${o.installments} cuotas con tu tarjeta de cr\xE9dito. Los intereses dependen de tu banco; la cuota que mostramos es el precio dividido en ${o.installments}, sin intereses.`],["\xBFPuedo devolver mi compra?","Tienes derecho de retracto de 5 d\xEDas h\xE1biles desde la entrega para compras en l\xEDnea, siempre que el producto est\xE9 sin usar y en su empaque original (Ley 1480 de 2011)."]],z=(e,a=e.colors[0],t=0)=>`${e.name}${a&&a.hex?" color "+a.name:a&&a.name!=="Est\xE1ndar"?" "+a.name:""}${t?" \u2013 vista "+(t+1):""} original en Colombia`,ee=()=>B.get("nova-recent",[]).filter(e=>h[e]);function Pe(){const e=h[o.hero.id]||C.find(n=>n.cat==="iphone")||C[0];if(!e)return'<section class="wrap section center"><h1 class="h2">Muy pronto</h1><p class="lead">Estamos preparando nuestra tienda Apple.</p></section>';const a=e.colors.find(n=>n.id===o.hero.color)||e.colors[0],t=o.tiles.map(n=>h[n]).filter(Boolean),s=o.tradeIn;return`
    <section class="hero">
      <div class="hero__copy">
        <h1 class="eyebrow eyebrow--accent">Tienda de iPhone en ${i(o.sameDayCity)} y toda Colombia</h1>
        <h2 class="hero__title">${i(o.hero.title)}</h2>
        <p class="hero__sub">${i(o.hero.headline)}</p>
        <p class="hero__price">Desde ${m(e.fromPrice)} o <b>${A(e.fromPrice)}/mes</b> en ${o.installments} cuotas</p>
        <div class="cta-row"><a class="btn btn--primary btn--lg" href="${b.p(e,"color="+a.id)}">Comprar</a><a class="btn btn--link" href="/iphone/">Ver todos los iPhone \u203A</a></div>
      </div>
      <div class="hero__media"><img src="${a.images[0]}" alt="${i(z(e,a))}" fetchpriority="high"></div>
    </section>

    <section class="chapters wrap" aria-label="Categor\xEDas">
      ${D.map(n=>{const d=h[n.hero]||C.find(r=>r.cat===n.id);return d?`<a class="chapter" href="${b.cat(n.id)}"><span class="chapter__img"><img src="${k(d)}" alt="${i(d.name)}" loading="lazy"></span><span>${n.name}</span></a>`:""}).join("")}
    </section>

    <section class="benefits wrap">
      ${[["\u26A1",`Hoy mismo en ${o.sameDayCity}`,"Entrega el mismo d\xEDa"],["\u{1F69A}","Env\xEDos a toda Colombia",`En ${o.otherCitiesDays}, con gu\xEDa`],["\u{1F4B3}",`Hasta ${o.installments} cuotas`,"Con tu tarjeta de cr\xE9dito"],["\u2705","Originales y sellados","Productos Apple nuevos"],["\u{1F4AC}","Asesor\xEDa por WhatsApp","Te ayudamos a elegir"]].map(([n,d,r])=>`<div class="benefit reveal"><span class="benefit__icon">${n}</span><div><b>${d}</b><p>${i(r)}</p></div></div>`).join("")}
    </section>

    ${window.Explorer?window.Explorer.html({productId:"iphone-18-pro-max",price:h["iphone-18-pro-max"]?m(h["iphone-18-pro-max"].fromPrice):""}):""}

    <section class="tiles wrap">
      ${t.map((n,d)=>`
        <article class="tile ${d%3===0?"tile--wide":""} reveal">
          <div class="tile__copy">
            ${n.badge?`<p class="eyebrow eyebrow--accent">${i(n.badge)}</p>`:""}
            <h2 class="tile__title">${i(n.name)}</h2>
            <p class="tile__sub">${i(n.tagline)}</p>
            <p class="tile__price">Desde ${m(n.fromPrice)} \xB7 ${A(n.fromPrice)}/mes</p>
            <div class="cta-row"><a class="btn btn--primary btn--sm" href="${b.p(n)}">Comprar</a><a class="btn btn--link" href="${b.cat(n.cat)}">M\xE1s ${M(n.cat)} \u203A</a></div>
          </div>
          <a class="tile__media" href="${b.p(n)}"><img src="${k(n)}" alt="${i(z(n))}" loading="lazy"></a>
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
          <label>Tu equipo<select name="device">${s.devices.map(([n],d)=>`<option value="${d}">${i(n)}</option>`).join("")}</select></label>
          <label>Estado<select name="cond">${s.conditions.map(([n],d)=>`<option value="${d}">${n}</option>`).join("")}</select></label>
          <p class="tradein-quick__value">Recibe hasta <b id="tradeQuickVal"></b></p>
          <a class="btn btn--primary btn--block" href="/iphone/">Elegir mi nuevo iPhone</a>
        </form>
      </div>
    </section>`:""}

    ${ee().length?X("Vistos recientemente",ee()):""}

    <section class="section wrap center">
      <h2 class="h2">Paga como prefieras.</h2>
      <p class="lead">Paga de contado o hasta en ${o.installments} cuotas ${i(o.installmentsNote)}.</p>
      ${W()}
    </section>

    <section class="section wrap">
      <h2 class="h2 center">\xBFPor qu\xE9 comprar en ${i(o.name)}?</h2>
      <div class="why">
        ${[["Productos 100% originales","Nuevos y sellados. Nada de r\xE9plicas ni reacondicionados sin avisar."],["Asesor\xEDa experta","Te ayudamos a elegir por WhatsApp, sin presi\xF3n y con respuesta r\xE1pida."],["Entrega r\xE1pida",`El mismo d\xEDa en ${o.sameDayCity} y en ${o.otherCitiesDays} al resto del pa\xEDs, con seguimiento.`],["Pago seguro","Pagas en el checkout de Shopify con tarjeta o PSE; tus datos est\xE1n protegidos."]].map(([n,d])=>`<div class="why__item reveal"><h3>${n}</h3><p>${d}</p></div>`).join("")}
      </div>
    </section>

    <section class="section wrap">
      <h2 class="h2 center">Compra con total confianza</h2>
      <p class="lead center">Tu compra est\xE1 protegida de principio a fin.</p>
      ${ke()}
    </section>

    <section class="section wrap narrow seo-text">
      <h2 class="h2">Tu tienda Apple en ${i(o.sameDayCity)}, con env\xEDos a toda Colombia</h2>
      <p>En ${i(o.name)} vendemos productos Apple originales, nuevos y sellados: <a href="/iphone/">iPhone</a>, <a href="/mac/">MacBook</a>, <a href="/ipad/">iPad</a>, <a href="/watch/">Apple Watch</a>, <a href="/airpods/">AirPods</a> y <a href="/accesorios/">accesorios</a>. Si buscas una tienda de iPhone en ${i(o.sameDayCity)}, te lo entregamos el mismo d\xEDa; al resto del pa\xEDs enviamos en ${i(o.otherCitiesDays)} con n\xFAmero de gu\xEDa.</p>
      <p>Paga de contado o hasta en ${o.installments} cuotas con tu tarjeta de cr\xE9dito, en el checkout seguro de Shopify. ${["iphone-18-pro-max","iphone-17","airpods-pro-3","macbook-air-13-m5"].filter(n=>h[n]).map(n=>`<a href="${b.p(h[n])}">${i(h[n].name)}</a>`).join(", ")} y m\xE1s modelos, con asesor\xEDa por WhatsApp para que elijas el ideal.</p>
    </section>

    <section class="section wrap narrow">
      <h2 class="h2 center">Preguntas frecuentes</h2>
      ${he(Y)}
    </section>`}function Le(e,a){const t=D.find(r=>r.id===e);if(!t)return ae();let s=C.filter(r=>r.cat===e);const n=a.get("orden")||"rec";n==="asc"&&(s=[...s].sort((r,u)=>r.fromPrice-u.fromPrice)),n==="desc"&&(s=[...s].sort((r,u)=>u.fromPrice-r.fromPrice));const d=r=>[...new Set(r.configs.map(u=>(/(\d+\s?(GB|TB))/.exec(u)||[])[1]).filter(Boolean))];return`
    <section class="cat-hero wrap">
      <h1 class="display">${i(t.name)}</h1>
      <p class="lead">${i(t.blurb)}</p>
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
    <section class="grid wrap">${s.map(me).join("")}</section>
    ${["iphone","ipad","mac","watch"].includes(e)?`
    <section class="section wrap">
      <h2 class="h2">Compara los modelos</h2>
      <div class="compare-wrap"><table class="compare">
        <thead><tr><th>Modelo</th><th>Precio desde</th><th>Cuota desde</th><th>${e==="watch"?"Tama\xF1os":"Almacenamiento"}</th><th>Acabados</th><th></th></tr></thead>
        <tbody>${C.filter(r=>r.cat===e).map(r=>`<tr>
          <td><a href="${b.p(r)}"><img src="${k(r)}" alt="" loading="lazy">${i(r.name)}</a></td>
          <td>${m(r.fromPrice)}</td><td>${A(r.fromPrice)}/mes</td>
          <td>${e==="watch"?[...new Set(r.configs.map(u=>u.split(" \xB7 ")[0]))].join(", "):d(r).join(", ")}</td>
          <td><span class="dots dots--inline">${r.colors.map(u=>`<span class="dot" style="--c:${u.hex}" title="${i(u.name)}"></span>`).join("")}</span></td>
          <td><a class="btn btn--primary btn--xs" href="${b.p(r)}">Comprar</a></td></tr>`).join("")}</tbody>
      </table></div>
    </section>`:""}
    ${t.seo?`<section class="section wrap narrow seo-text"><h2 class="h2">${i(t.seo.h2)}</h2><p>${i(t.seo.text)}</p></section>`:""}
    <section class="section wrap center">${W()}</section>`}let p=null;function Ae(e,a){const t=h[e];if(!t)return ae();const s=[e,...ee().filter(l=>l!==e)].slice(0,10);B.set("nova-recent",s);const n=t.colors.find(l=>l.id===a.get("color"))?a.get("color"):t.colors[0].id,d=t.variants.filter(l=>l.color===n).sort((l,g)=>l.price-g.price),r=d.find(l=>l.config===a.get("config"))?a.get("config"):d[0].config;p={m:t,color:n,config:r,img:0,protect:!1,trade:null};const u=(o.crossSell[t.cat]||[]).filter(l=>l!==e),f=t.cat==="iphone";return`
    <nav class="crumbs wrap" aria-label="Ruta"><a href="/">Inicio</a><span>\u203A</span><a href="${b.cat(t.cat)}">${M(t.cat)}</a><span>\u203A</span><span>${i(t.name)}</span></nav>
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
        ${t.badge?`<p class="eyebrow eyebrow--accent">${i(t.badge)}</p>`:""}
        <h1 class="pdp__title">${i(t.name)}</h1>
        <p class="pdp__tag">${i(t.tagline)}</p>
        <div class="price-box" id="priceBox"></div>

        <fieldset class="opt">
          <legend>${R(t)?"Color":"Modelo"}. <b id="colorName"></b></legend>
          <div class="${R(t)?"swatches":"chips"}" id="colorOpts">
            ${t.colors.map(l=>R(t)?`<button class="swatch" style="--c:${l.hex}" data-color="${l.id}" aria-label="${i(l.name)}" title="${i(l.name)}"></button>`:`<button class="chip" data-color="${l.id}">${i(l.name)}</button>`).join("")}
          </div>
        </fieldset>

        ${ne(t)?`<fieldset class="opt">
          <legend>${t.cat==="watch"?"Tama\xF1o y conectividad":t.cat==="mac"?"Configuraci\xF3n":"Capacidad"}.</legend>
          <div class="configs" id="configOpts"></div>
        </fieldset>`:""}

        ${f&&o.tradeIn.enabled?`<fieldset class="opt tradein" id="tradeBox">
          <legend>\xBFTienes un smartphone para entregar como parte de pago?</legend>
          <div class="seg"><button class="seg__btn" data-trade="yes">S\xED, cotizar retoma</button><button class="seg__btn is-on" data-trade="no">No, gracias</button></div>
          <div class="tradein__form" id="tradeForm" hidden>
            <label>Modelo<select id="tradeDevice">${o.tradeIn.devices.map(([l],g)=>`<option value="${g}">${i(l)}</option>`).join("")}</select></label>
            <label>Estado<select id="tradeCond">${o.tradeIn.conditions.map(([l],g)=>`<option value="${g}">${l}</option>`).join("")}</select></label>
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
          ${ue()}
        </div>

        <ul class="delivery">
          <li><span>\u26A1</span><div id="sameDay"></div></li>
          <li><span>\u{1F69A}</span><div><b>Env\xEDos a toda Colombia</b><br><span class="muted small">Llega en ${o.otherCitiesDays} con n\xFAmero de gu\xEDa. El costo se calcula al pagar.</span></div></li>
          <li><span>\u{1F4AC}</span><div><b>\xBFDudas? Te asesoramos</b><br><span class="muted small">Escr\xEDbenos por WhatsApp y te respondemos en minutos.</span></div></li>
        </ul>
        <ul class="trust">
          <li>\u2705 Original y sellado</li><li>\u{1F512} Pago seguro en Shopify</li><li>\u21A9\uFE0F Retracto 5 d\xEDas h\xE1biles</li>
        </ul>
        ${W()}
      </div>
    </section>

    ${/^iphone-18-pro/.test(t.id)&&window.Explorer?window.Explorer.html({productId:"iphone-18-pro-max",price:h["iphone-18-pro-max"]?m(h["iphone-18-pro-max"].fromPrice):""}):""}
    <section class="section wrap narrow about reveal"><h2 class="eyebrow">Acerca del ${i(t.name)}</h2>${t.description?`<p class="about__text">${i(t.description)}</p>`:""}
      <p class="about__seo">Compra tu ${i(t.name)} original y sellado en ${i(o.name)}: entrega el mismo d\xEDa en ${i(o.sameDayCity)}, env\xEDos a toda Colombia en ${i(o.otherCitiesDays)} y pago hasta en ${o.installments} cuotas con tu tarjeta de cr\xE9dito. Mira todos los <a href="${b.cat(t.cat)}">${i(M(t.cat))} disponibles</a>.</p></section>
    ${u.length?X("Arma tu combo perfecto",u,`Lo que m\xE1s compran junto con ${i(t.name)}.`):""}
    <section class="section wrap narrow"><h2 class="h2 center">Preguntas frecuentes</h2>${he(Y)}</section>

    <div class="buybar" id="buybar" aria-hidden="true">
      <div class="buybar__inner wrap">
        <div><b>${i(t.name)}</b><span class="muted small" id="barLabel"></span></div>
        <div class="buybar__right"><span id="barPrice"></span><button class="btn btn--primary btn--sm" id="barAdd">Agregar</button></div>
      </div>
    </div>`}function Se(){const{m:e}=p,a=()=>e.variants.find(l=>l.color===p.color&&l.config===p.config),t=()=>{if(!p.trade)return 0;const[,l]=o.tradeIn.devices[p.trade.d],[,g]=o.tradeIn.conditions[p.trade.c];return Math.round(l*g/1e4)*1e4},s=()=>{const l=a(),g=e.colors.find(P=>P.id===p.color),w=p.protect?Q(e,l.price):0,y=t(),S=l.price+w-y;c("#priceBox").innerHTML=`
        <p class="price">${m(l.price)} ${l.compare&&l.compare>l.price?`<s>${m(l.compare)}</s>`:""}</p>
        <p class="price__cuota">o <b>${A(l.price)}/mes</b> en ${o.installments} cuotas \xB7 ${i(o.installmentsNote)}</p>
        ${y||w?`<p class="price__total">Total con ${[w?"protecci\xF3n":"",y?"retoma":""].filter(Boolean).join(" y ")}: <b>${m(S)}</b>${y?` <span class="ok">(\u2212${m(y)})</span>`:""}</p>`:""}`,c("#colorName").textContent=g.name,E("#colorOpts [data-color]").forEach(P=>P.classList.toggle("is-on",P.dataset.color===p.color)),c("#configOpts")&&(c("#configOpts").innerHTML=e.configs.map(P=>{const j=e.variants.find(ye=>ye.config===P&&ye.color===p.color);return`<button class="config ${P===p.config?"is-on":""}" data-config="${i(P)}" ${j?"":"disabled"}>
            <span>${i(P)}</span><span class="config__price">${j?m(j.price)+(L&&!j.available?" \xB7 Agotado":""):"No disponible en este color"}</span></button>`}).join("")),c("#protectPrice")&&(c("#protectPrice").textContent=m(Q(e,l.price)));const I=g.images;p.img=Math.min(p.img,I.length-1);const v=c("#galMain");v.alt=z(e,g,p.img),v.getAttribute("src")!==I[p.img]&&(v.classList.remove("fade"),v.offsetWidth,v.classList.add("fade"),v.src=I[p.img]),c("#thumbs").innerHTML=I.map((P,j)=>`<button class="thumb ${j===p.img?"is-on":""}" data-img="${j}" aria-label="Ver imagen ${j+1} de ${i(e.name)}"><img src="${P}" alt="" loading="lazy"></button>`).join("");const x=[p.config!=="Est\xE1ndar"?p.config:"",g.name].filter(Boolean).join(" \xB7 ");c("#barLabel").textContent=" "+x,c("#barPrice").textContent=m(l.price);const V=!l.available;c("#addBtn").disabled=V,c("#barAdd").disabled=V,c("#addBtn").textContent=V?L?"Agotado":"Disponible muy pronto":"Agregar a la bolsa",c("#barAdd").textContent=V?"Agotado":"Agregar",c("#waBuy").href=T(`Hola ${o.name}, me interesa el ${e.name} (${x}) de ${m(l.price)}.`+(y?` Quiero entregar mi ${o.tradeIn.devices[p.trade.d][0]} (${o.tradeIn.conditions[p.trade.c][0]}) en retoma.`:"")+" \xBFEst\xE1 disponible?"),c("#waFloat").href=c("#waBuy").href,history.replaceState(null,"",b.p(e,`color=${p.color}${ne(e)?"&config="+encodeURIComponent(p.config):""}`))},n=()=>{const l=a(),g=t();re({id:e.id,color:l.color,config:l.config,protection:p.protect?Q(e,l.price):0,tradeIn:g?{device:o.tradeIn.devices[p.trade.d][0],cond:o.tradeIn.conditions[p.trade.c][0],value:g}:null})},d=c(".pdp");d.addEventListener("click",l=>{const g=l.target.closest("[data-color]"),w=l.target.closest("[data-config]"),y=l.target.closest("[data-img]"),S=l.target.closest("[data-gal]"),I=l.target.closest("[data-trade]");if(g&&(p.color=g.dataset.color,p.img=0,a()||(p.config=e.variants.filter(v=>v.color===p.color).sort((v,x)=>v.price-x.price)[0].config)),w&&!w.disabled&&(p.config=w.dataset.config),y&&(p.img=+y.dataset.img),S){const v=e.colors.find(x=>x.id===p.color).images.length;p.img=(p.img+ +S.dataset.gal+v)%v}if(I){const v=I.dataset.trade==="yes";E("[data-trade]").forEach(x=>x.classList.toggle("is-on",x===I)),c("#tradeForm").hidden=!v,p.trade=v?{d:+c("#tradeDevice").value,c:+c("#tradeCond").value}:null}(g||w||y||S||I)&&s()}),d.addEventListener("change",l=>{l.target.id==="protect"&&(p.protect=l.target.checked),(l.target.id==="tradeDevice"||l.target.id==="tradeCond")&&(p.trade={d:+c("#tradeDevice").value,c:+c("#tradeCond").value}),s()}),c("#addBtn").addEventListener("click",n),c("#barAdd").addEventListener("click",n);let r=null;c(".gallery").addEventListener("touchstart",l=>{r=l.touches[0].clientX},{passive:!0}),c(".gallery").addEventListener("touchend",l=>{if(r===null)return;const g=l.changedTouches[0].clientX-r;r=null,Math.abs(g)>40&&c(`[data-gal="${g<0?1:-1}"]`).click()});const u=()=>{const l=c("#sameDay");if(!l)return clearInterval(p.timer);if(!o.sameDayCutoff){l.innerHTML=`<b>Rec\xEDbelo hoy en ${o.sameDayCity}</b><br><span class="muted small">Entrega el mismo d\xEDa en ${o.sameDayCity}.</span>`;return}const{h:g,m:w,day:y}=we(),S=o.sameDayCutoff*60-(g*60+w);l.innerHTML=S>0&&y!=="Sun"?`<b>Rec\xEDbelo hoy en ${o.sameDayCity}</b><br><span class="muted small">Compra en las pr\xF3ximas <b class="accent">${Math.floor(S/60)} h ${S%60} min</b></span>`:`<b>Rec\xEDbelo ${y==="Sat"||y==="Sun"?"el lunes":"ma\xF1ana"} en ${o.sameDayCity}</b><br><span class="muted small">Pide antes de las ${o.sameDayCutoff}:00 para entrega el mismo d\xEDa.</span>`};u(),p.timer=setInterval(u,3e4),new IntersectionObserver(([l])=>{const g=c("#buybar");if(!g)return;const w=!l.isIntersecting&&l.boundingClientRect.top<0;g.classList.toggle("show",w),g.setAttribute("aria-hidden",String(!w))}).observe(c("#addBtn")),s()}function Ie(){if(!$.length)return'<section class="wrap narrow section center"><h1 class="h2">Tu bolsa est\xE1 vac\xEDa</h1><p class="lead">Agrega un producto para continuar.</p><a class="btn btn--primary" href="/">Ir a la tienda</a></section>';const e=K(),a=[["tarjeta","Tarjeta de cr\xE9dito",`Hasta ${o.installments} cuotas \xB7 ${o.installmentsNote}`],["pse","PSE","D\xE9bito desde tu cuenta de ahorros o corriente"],["nequi","Nequi o Daviplata","Paga desde tu celular"],["addi","Addi","Compra ahora y paga a cuotas, aprobaci\xF3n en minutos"],["sistecredito","Sistecr\xE9dito","Cr\xE9dito con tu c\xE9dula"]];return`
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
            <label class="radio"><input type="radio" name="entrega" value="envio" checked><span><b>Env\xEDo a domicilio</b><br><span class="small muted">${e.ship===null?"Se calcula al pagar":e.ship?m(e.ship):"Gratis"} \xB7 Mismo d\xEDa en ${o.sameDayCity}, ${o.otherCitiesDays} al resto del pa\xEDs</span></span></label>
          </div>
          <div class="fields" id="shipFields">
            <label>Departamento<input name="departamento" required autocomplete="address-level1" value=""></label>
            <label>Ciudad<input name="ciudad" required autocomplete="address-level2" value=""></label>
            <label class="span2">Direcci\xF3n<input name="direccion" required autocomplete="street-address" placeholder="Calle 00 # 00-00, apto"></label>
          </div>
        </fieldset>
        <fieldset><legend>3. Pago</legend>
          <div class="radios">${a.map(([t,s,n],d)=>`<label class="radio"><input type="radio" name="pago" value="${s}" ${d?"":"checked"}><span><b>${s}</b><br><span class="small muted">${n}</span></span></label>`).join("")}</div>
        </fieldset>
        <label class="check"><input type="checkbox" name="acepto" required> Acepto los t\xE9rminos y condiciones y autorizo el tratamiento de mis datos personales (Ley 1581 de 2012).</label>
        <p class="form-error" id="formError" hidden>Revisa los campos marcados.</p>
        <button class="btn btn--primary btn--lg btn--block" type="submit">Confirmar pedido \xB7 ${m(e.total)}</button>
        <p class="small muted center">Al confirmar, un asesor te enviar\xE1 el enlace de pago seguro por WhatsApp.</p>
      </form>
      <aside class="checkout__summary">
        <h2 class="h3">Resumen</h2>
        <ul class="lines lines--compact">${$.map(t=>`<li class="line"><span class="line__img"><img src="${k(h[t.id],t.color)}" alt=""><i>${t.qty}</i></span>
          <div class="line__info"><b class="small">${i(h[t.id].name)}</b><p class="small muted">${i(J(t))}</p>${t.protection?`<p class="small">+ ${i(o.protection.name)}</p>`:""}${t.tradeIn?`<p class="small ok">Retoma \u2212${m(t.tradeIn.value)}</p>`:""}</div>
          <b class="small">${m(H(t))}</b></li>`).join("")}</ul>
        <dl class="sum">
          <div><dt>Subtotal</dt><dd>${m(e.sub)}</dd></div>
          ${e.trade?`<div class="ok"><dt>Retoma (estimado)</dt><dd>\u2212${m(e.trade)}</dd></div>`:""}
          <div><dt>Env\xEDo</dt><dd>${e.ship===null?"Se calcula al pagar":e.ship?m(e.ship):"Gratis"}</dd></div>
          <div class="sum__total"><dt>Total</dt><dd>${m(e.total)}</dd></div>
        </dl>
        <p class="small muted">o ${A(e.total)}/mes en ${o.installments} cuotas</p>
        <ul class="trust trust--col"><li>\u2705 Productos originales y sellados</li><li>\u21A9\uFE0F Derecho de retracto de 5 d\xEDas h\xE1biles</li></ul>
      </aside>
    </section>`}function xe(){const e=c("#checkoutForm");e&&(e.addEventListener("change",a=>{if(a.target.name==="entrega"){const t=a.target.value==="envio";c("#shipFields").hidden=!t,E("#shipFields input").forEach(s=>{s.required=t})}}),e.addEventListener("submit",a=>{a.preventDefault(),E(".invalid",e).forEach(r=>r.classList.remove("invalid"));const t=E("input",e).filter(r=>!r.checkValidity());if(t.forEach(r=>(r.closest("label")||r).classList.add("invalid")),c("#formError").hidden=!t.length,t.length){t[0].focus();return}const s=Object.fromEntries(new FormData(e)),n="NV-"+Date.now().toString(36).toUpperCase().slice(-6),d=ce(`

Pedido ${n}
Cliente: ${s.nombre} \xB7 CC ${s.cedula}
Correo: ${s.email} \xB7 Cel: ${s.celular}
`+(s.entrega==="envio"?`Entrega: ${s.direccion}, ${s.ciudad} (${s.departamento})`:"Entrega: Retiro en tienda")+`
Pago: ${s.pago}`);B.set("nova-last-order",{order:n,name:s.nombre.split(" ")[0],wa:T(d)}),window.open(T(d),"_blank","noopener"),$=[],F(),N("/gracias/")}))}function De(){const e=B.get("nova-last-order",null);return`<section class="wrap narrow section center thanks">
      <div class="thanks__icon">\u2713</div>
      <h1 class="h2">\xA1Gracias${e?", "+i(e.name):""}! Recibimos tu pedido.</h1>
      ${e?`<p class="lead">N\xFAmero de pedido <b>${i(e.order)}</b>. Un asesor te escribir\xE1 por WhatsApp con el enlace de pago seguro y la confirmaci\xF3n de entrega.</p>
      <a class="btn btn--wa" href="${e.wa}" target="_blank" rel="noopener">Abrir WhatsApp de nuevo</a>`:""}
      <p><a class="btn btn--link" href="/">Seguir comprando \u203A</a></p></section>`}const _=o.siteUrl||location.origin,Te=(e,a=158)=>e.length>a?e.slice(0,a-1).replace(/\s+\S*$/,"")+"\u2026":e,O=e=>U(e,1200)||"",ge=e=>({"@type":"BreadcrumbList",itemListElement:e.map(([a,t],s)=>({"@type":"ListItem",position:s+1,name:a,item:_+t}))}),be={"@id":_+"/#tienda"};function qe(e){const a=D.find(s=>s.id===e[0]);if(!e.length){const s=h[o.hero.id]||C[0];return{title:`Tienda de iPhone en ${o.sameDayCity} y Colombia \xB7 ${o.name}`,desc:`Compra iPhone, MacBook, iPad, AirPods y Apple Watch originales y sellados. Entrega el mismo d\xEDa en ${o.sameDayCity}, env\xEDos a toda Colombia y hasta ${o.installments} cuotas.`,image:s&&O(k(s)),ld:[{"@type":"WebPage","@id":_+"/#portada",url:_+"/",name:`Tienda de iPhone en ${o.sameDayCity} y Colombia`,isPartOf:{"@id":_+"/#sitio"},about:be,inLanguage:"es-CO"},{"@type":"FAQPage",mainEntity:Y.map(([n,d])=>({"@type":"Question",name:n,acceptedAnswer:{"@type":"Answer",text:d}}))}]}}if(a&&e.length===1){const s=C.filter(d=>d.cat===a.id),n=a.seo||{};return{title:`${n.title||a.name+" en Colombia"} \xB7 ${o.name}`,desc:n.desc||`${a.name} originales en Colombia. Entrega el mismo d\xEDa en ${o.sameDayCity}.`,image:s[0]&&O(k(s[0])),ld:[{"@type":"CollectionPage",url:_+b.cat(a.id),name:n.title||a.name,isPartOf:{"@id":_+"/#sitio"},inLanguage:"es-CO",mainEntity:{"@type":"ItemList",itemListElement:s.map((d,r)=>({"@type":"ListItem",position:r+1,url:_+b.p(d),name:d.name}))}},ge([["Inicio","/"],[a.name,b.cat(a.id)]])]}}const t=e.length===2&&h[e[1]];if(t){const s=t.variants.map(d=>d.price),n={"@type":"AggregateOffer",priceCurrency:"COP",lowPrice:Math.min(...s),highPrice:Math.max(...s),offerCount:t.variants.length,url:_+b.p(t),seller:be,itemCondition:"https://schema.org/NewCondition"};return L&&(n.availability=t.variants.some(d=>d.available)?"https://schema.org/InStock":"https://schema.org/OutOfStock"),{title:`${t.name} precio en Colombia \xB7 ${o.name}`,desc:Te(`Compra ${t.name} original y sellado desde ${m(t.fromPrice)} o ${A(t.fromPrice)}/mes en ${o.installments} cuotas. Entrega el mismo d\xEDa en ${o.sameDayCity} y env\xEDos a toda Colombia.`),image:O(k(t)),type:"product",ld:[{"@type":"Product",name:t.name,url:_+b.p(t),description:t.description||t.tagline||t.name,brand:{"@type":"Brand",name:"Apple"},category:M(t.cat),image:t.colors.flatMap(d=>d.images.slice(0,2)).slice(0,8).map(O),...t.colors.length>1&&R(t)?{color:t.colors.map(d=>d.name).join(", ")}:{},offers:n},ge([["Inicio","/"],[M(t.cat),b.cat(t.cat)],[t.name,b.p(t)]])]}}return null}function je(e,a){const t=e||{title:`P\xE1gina no encontrada \xB7 ${o.name}`,desc:"",noindex:!0},s=(d,r)=>{const u=document.head.querySelector(d);u&&u.setAttribute(u.tagName==="LINK"?"href":"content",r)};document.title=t.title,s('meta[name="description"]',t.desc),s('meta[name="robots"]',t.noindex?"noindex,follow":"index,follow,max-image-preview:large"),s('link[rel="canonical"]',_+a),s('meta[property="og:type"]',t.type||"website"),s('meta[property="og:url"]',_+a),s('meta[property="og:title"]',t.title),s('meta[property="og:description"]',t.desc),t.image&&(s('meta[property="og:image"]',t.image),s('meta[name="twitter:image"]',t.image)),s('meta[name="twitter:title"]',t.title),s('meta[name="twitter:description"]',t.desc);const n=c("#ldPage");n&&(n.textContent=t.ld?JSON.stringify({"@context":"https://schema.org","@graph":t.ld}):"{}")}window.STORE_PAGES=()=>["/",...D.filter(e=>C.some(a=>a.cat===e.id)).map(e=>b.cat(e.id)),...C.map(e=>b.p(e))].map(e=>{const a=h[e.split("/").filter(Boolean)[1]];return{path:e,images:a?a.colors.flatMap(t=>t.images.slice(0,2)).slice(0,8).map(O):[],title:a?a.name:""}});const ae=()=>'<section class="wrap narrow section center"><h1 class="h2">No encontramos esta p\xE1gina</h1><a class="btn btn--primary" href="/">Volver al inicio</a></section>';function Me(){if(!location.hash.startsWith("#/"))return;const[e,a]=location.hash.slice(1).split("?"),[t,s]=e.split("/").filter(Boolean),n=t==="c"&&s?b.cat(s):t==="p"&&h[s]?b.p(h[s]):t?`/${t}/`:"/";history.replaceState(null,"",n+(a?"?"+a:""))}function q(){Me();const e=new URLSearchParams(location.search);let a=location.pathname.split("/").filter(Boolean);a.length===2&&h[a[1]]&&h[a[1]].cat!==a[0]&&(history.replaceState(null,"",b.p(h[a[1]],location.search.slice(1))),a=[h[a[1]].cat,a[1]]),p&&p.timer&&clearInterval(p.timer),p=null;const t=a.length===1&&D.some(f=>f.id===a[0]);let s,n=qe(a);a.length?t?s=Le(a[0],e):a.length===2&&h[a[1]]?s=Ae(a[1],e):a[0]==="checkout"?(s=Ie(),n={title:`Finalizar compra \xB7 ${o.name}`,desc:"",noindex:!0}):a[0]==="gracias"?(s=De(),n={title:`Gracias por tu compra \xB7 ${o.name}`,desc:"",noindex:!0}):(s=ae(),n=null):s=Pe();const d=!q.done;q.done=!0,G.innerHTML=s,G.removeAttribute("data-prerendered"),je(n,a.length?`/${a.join("/")}/`:"/");const r=t?a[0]:a.length===2&&h[a[1]]?h[a[1]].cat:"";E("#navLinks a").forEach(f=>f.classList.toggle("is-on",f.dataset.cat===r)),c("#waFloat").href=T(`Hola ${o.name}, quiero asesor\xEDa para comprar un producto Apple.`),window.Explorer&&window.Explorer.mount(G),p&&Se(),a[0]==="checkout"&&xe(),Be(),ve();const u=location.pathname;q.last!==u&&(d||window.scrollTo({top:0}),q.last=u),d&&!window.__PRERENDER&&(document.documentElement.classList.add("no-anim"),E(".reveal").forEach(f=>{f.getBoundingClientRect().top<innerHeight&&f.classList.add("in")}),requestAnimationFrame(()=>requestAnimationFrame(()=>document.documentElement.classList.remove("no-anim")))),document.documentElement.dataset.ready=u}function Be(){E(".shelf").forEach(t=>t.addEventListener("click",s=>{const n=s.target.closest("[data-scroll]");if(!n)return;const d=c(".shelf__track",t);d.scrollBy({left:+n.dataset.scroll*d.clientWidth*.8,behavior:"smooth"})})),E(".card").forEach(t=>{t.addEventListener("mouseover",s=>{const n=s.target.closest("[data-swap]");n&&(c("[data-card-img]",t).src=n.dataset.swap)}),t.addEventListener("click",s=>{const n=s.target.closest("[data-color]");n&&(s.preventDefault(),N(t.getAttribute("href")+"?color="+n.dataset.color))})});const e=c("#sortSel");e&&e.addEventListener("change",()=>{N(location.pathname+"?orden="+e.value,!0)});const a=c("#tradeQuick");if(a){const t=()=>{const[,s]=o.tradeIn.devices[a.device.value],[,n]=o.tradeIn.conditions[a.cond.value];c("#tradeQuickVal").textContent=m(Math.round(s*n/1e4)*1e4)};a.addEventListener("change",t),t()}Re()}const te="IntersectionObserver"in window?new IntersectionObserver(e=>e.forEach(a=>{a.isIntersecting&&(a.target.classList.add("in"),te.unobserve(a.target))}),{rootMargin:"0px 0px -8% 0px"}):null,Re=()=>E(".reveal:not(.in)").forEach(e=>te&&!window.__PRERENDER?te.observe(e):e.classList.add("in")),fe=()=>{c("#search").hidden=!1,document.body.classList.add("locked"),c("#searchInput").value="",se(""),setTimeout(()=>c("#searchInput").focus(),30)},$e=()=>{c("#search").hidden=!0,document.body.classList.remove("locked")};function se(e){const a=oe(e.trim()),t=a?C.filter(s=>a.split(/\s+/).every(n=>oe(`${s.name} ${M(s.cat)} ${s.tagline}`).includes(n))).slice(0,8):[];c("#searchResults").innerHTML=a?t.length?t.map(s=>`<a class="sres" href="${b.p(s)}"><img src="${k(s)}" alt="${i(s.name)}"><span><b>${i(s.name)}</b><span class="small muted">Desde ${m(s.fromPrice)} \xB7 ${A(s.fromPrice)}/mes</span></span></a>`).join(""):`<p class="muted">Sin resultados para \u201C${i(e)}\u201D. <a href="${T("Hola, busco: "+e)}" target="_blank" rel="noopener">Preg\xFAntanos por WhatsApp</a>.</p>`:`<p class="eyebrow">B\xFAsquedas populares</p><div class="chips">${["iPhone 18 Pro","AirPods Pro 3","MacBook Air","iPad","Apple Watch","Cargador"].map(s=>`<button class="chip" data-q="${s}">${s}</button>`).join("")}</div>`}c("#openSearch").addEventListener("click",fe),c("#searchInput").addEventListener("input",e=>se(e.target.value)),c("#search").addEventListener("click",e=>{(e.target.id==="search"||e.target.closest("[data-close]")||e.target.closest(".sres"))&&$e();const a=e.target.closest("[data-q]");a&&(c("#searchInput").value=a.dataset.q,se(a.dataset.q))}),document.addEventListener("keydown",e=>{e.key==="Escape"&&($e(),Z(),ve()),e.key==="/"&&!/input|textarea|select/i.test(document.activeElement.tagName)&&(e.preventDefault(),fe())});function Oe(){c(".nav__name").textContent=o.name,c("#navLinks").innerHTML=D.map(t=>`<a href="${b.cat(t.id)}" data-cat="${t.id}">${t.name}</a>`).join("")+`<a href="${T("Hola, quiero asesor\xEDa")}" target="_blank" rel="noopener" class="nav__help">Asesor\xEDa</a>`;const e=c("#announce");e.innerHTML=o.announcements.map((t,s)=>`<p class="${s?"":"on"}">${i(t)}</p>`).join("");let a=0;setInterval(()=>{const t=E("p",e);t[a].classList.remove("on"),a=(a+1)%t.length,t[a].classList.add("on")},4200),c("#footer").innerHTML=`
      <div class="wrap">
        <div class="footer__cols">
          <div><h4>Comprar</h4>${D.map(t=>`<a href="${b.cat(t.id)}">${t.name}</a>`).join("")}</div>
          <div><h4>Ayuda</h4><a href="https://${o.shopifyDomain}/policies/shipping-policy">Env\xEDos y entregas</a><a href="https://${o.shopifyDomain}/policies/refund-policy">Devoluciones y retracto</a><a href="https://${o.shopifyDomain}/pages/contact">Contacto</a></div>
          <div><h4>${i(o.name)}</h4><a href="https://${o.shopifyDomain}">Celada Shopper</a><a href="https://${o.shopifyDomain}/pages/quienes-somos">Qui\xE9nes somos</a><a href="https://${o.shopifyDomain}/policies/terms-of-service">T\xE9rminos y condiciones</a><a href="https://${o.shopifyDomain}/policies/privacy-policy">Pol\xEDtica de privacidad</a></div>
          <div><h4>Contacto</h4><a href="${T("Hola "+o.name)}" target="_blank" rel="noopener">WhatsApp ${i(o.phone)}</a><a href="mailto:${o.email}">${i(o.email)}</a>${o.address?`<p>${i(o.address)}</p>`:""}${o.hours?`<p>${i(o.hours)}</p>`:""}
            <p><a href="${o.instagram}" target="_blank" rel="noopener">Instagram</a> \xB7 <a href="${o.tiktok}" target="_blank" rel="noopener">TikTok</a></p></div>
        </div>
        ${W()}
        <div class="footer__legal">
          <p>${o.legalName?i(o.legalName)+" \xB7 ":""}${o.nit?"NIT "+i(o.nit)+" \xB7 ":""}Precios en pesos colombianos. Im\xE1genes de referencia.</p>
          <p>Apple, iPhone, iPad, Mac, Apple Watch y AirPods son marcas registradas de Apple Inc. ${i(o.name)} es un comercio independiente.</p>
          <p><a href="https://www.sic.gov.co" target="_blank" rel="noopener">Superintendencia de Industria y Comercio</a> \xB7 \xA9 ${new Date().getFullYear()} ${i(o.name)}</p>
        </div>
      </div>`}const ve=()=>{document.body.classList.remove("menu-open"),c("#burger").setAttribute("aria-expanded","false")};c("#burger").addEventListener("click",()=>{const e=document.body.classList.toggle("menu-open");c("#burger").setAttribute("aria-expanded",String(e))}),window.addEventListener("scroll",()=>c("#nav").classList.toggle("scrolled",window.scrollY>8),{passive:!0}),Oe(),le(),de(),document.addEventListener("click",e=>{const a=e.target.closest("a[href]");if(!a||e.defaultPrevented||e.button||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||a.target==="_blank"||a.hasAttribute("download"))return;const t=new URL(a.href,location.href);t.origin!==location.origin||/\.[a-z0-9]+$/i.test(t.pathname)||t.pathname===location.pathname&&t.search===location.search&&t.hash||(e.preventDefault(),N(t.pathname+t.search))}),window.addEventListener("popstate",q),window.addEventListener("hashchange",()=>location.hash.startsWith("#/")&&q()),q()})();
