/* =========================================================
   BELLA BLINKSS: script.js
   ★ Everything you'll want to edit is in the CONFIG block ★
   ========================================================= */

/* ---------------- CONFIG (EDIT HERE) ---------------- */
// WhatsApp number: country code + number, digits only (no +, spaces or dashes).
// 07031701276 → Nigeria country code 234, drop the leading 0.
const WHATSAPP_NUMBER = "2348081640057";

// Photos live in the assets folder. IMG("look1") loads ./assets/look1.jpg
// To use Esther's photos, save them into assets with the same names.
const IMG = name => `./assets/${name}.jpg`;

const CONFIG = {
  tiktokUrl: "https://www.tiktok.com/@Bella_Blinkss",
  tiktokHandle: "@Bella_Blinkss",
  instagramUrl: "",           // ← add later, e.g. "https://instagram.com/yourhandle" (appears automatically)
  email: "",                  // ← add later (appears automatically)
  location: "Unilag Pako, Lagos, Nigeria",
  hours: [
    ["Monday – Saturday", "9:00 AM – 5:00 PM"],
    ["Sunday", "12:00 PM – 7:00 PM"]
  ],
  // Start-time options offered in the booking form, by day.
  slots: {
    week:   ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM"],  // Mon–Sat
    sunday: ["12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"]
  },

  // `amount` is used for the estimated total. `addon: true` shows it as an add-on.
  services: [
    { name: "Classic Lash Set",     desc: "One extension per natural lash for a soft, neat, natural definition.",       price: "₦8,000",  amount: 8000,  duration: "1 hr 20 min",  img: IMG("look2") },
    { name: "Hybrid Lash Set",      desc: "A textured blend of classic and volume lashes for added dimension.",         price: "₦12,000", amount: 12000, duration: "2 hrs 20 min", img: IMG("look1") },
    { name: "Volume Lash Set",      desc: "Lightweight handmade fans for a fuller, fluffier finish.",                   price: "₦17,000", amount: 17000, duration: "3 hrs",        img: IMG("closeup2") },
    { name: "Mega Volume Lash Set", desc: "Ultra-fine, dense fans for the most dramatic, high-impact look.",            price: "₦21,000", amount: 21000, duration: "3 hrs 30 min", img: IMG("look3") },
    { name: "Lash Removal",         desc: "Safe, careful removal that protects your natural lashes.",                   price: "₦5,000",  amount: 5000,  duration: "—",            img: IMG("studio1") },
    { name: "Wispy Effect",         desc: "Add a feathery, wispy texture to your set.",                                 price: "₦3,000",  amount: 3000,  addon: true },
    { name: "Bottom Lashes",        desc: "Frame the eye with delicate lower lashes.",                                  price: "₦3,000",  amount: 3000,  addon: true }
  ],

  // Gallery. category: "sets" | "ba" (before & after) | "closeup" | "studio"
  // For before & after: { title: "...", category: "ba", img: "./assets/after1.jpg", before: "./assets/before1.jpg" }
  // and add { key: "ba", label: "Before & After" } to galleryFilters below.
  gallery: [
    { title: "Soft Lash Look",     category: "sets",    tone: 1, tall: true, img: IMG("look1") },
    { title: "Natural Lash Look",  category: "sets",    tone: 2, img: IMG("look2") },
    { title: "Full Lash Look",     category: "sets",    tone: 4, img: IMG("look3") },
    { title: "Lash Detail",        category: "closeup", tone: 3, img: IMG("closeup1") },
    { title: "Long Lash Close-up", category: "closeup", tone: 1, tall: true, img: IMG("closeup2") },
    { title: "Lash Station",       category: "studio",  tone: 2, img: IMG("studio1") },
    { title: "In the Chair",       category: "studio",  tone: 4, img: IMG("studio2") }
  ],
  galleryFilters: [
    { key: "all", label: "All" }, { key: "sets", label: "Lash Looks" },
    { key: "closeup", label: "Close-ups" }, { key: "studio", label: "Studio" }
  ],

  // Add real client reviews here (with permission). Leave empty to show a "coming soon" card.
  // Example: { text: "Review text…", name: "Client Name", stars: 5 }
  reviews: []
};

/* ---------------- HELPERS ---------------- */
const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));
const naira = n => "₦" + n.toLocaleString("en-NG");
const waLink = (msg = "") => `https://wa.me/${WHATSAPP_NUMBER}${msg ? "?text=" + encodeURIComponent(msg) : ""}`;
const mediaHTML = (img, alt) =>
  img ? `<img src="${esc(img)}" alt="${esc(alt)}" loading="lazy" decoding="async">`
      : `<svg class="art" aria-hidden="true"><use href="#art-eye"/></svg>`;

/* ---------------- RENDER FROM CONFIG ---------------- */
function renderServices() {
  const main = CONFIG.services.filter(s => !s.addon);
  const addons = CONFIG.services.filter(s => s.addon);

  let html = main.map((s, i) => `
    <article class="service-card reveal">
      <div class="service-img slot tone-${(i % 4) + 1}"${s.img ? "" : ` role="img" aria-label="${esc(s.name)} image"`}>${mediaHTML(s.img, s.name)}</div>
      <div class="service-body">
        <h3>${esc(s.name)}</h3>
        <p>${esc(s.desc)}</p>
        <div class="service-meta"><span class="price">${esc(s.price)}</span><span>${esc(s.duration || "—")}</span></div>
        <a href="#booking" class="btn btn-outline btn-sm" data-service="${esc(s.name)}">Book This Service</a>
      </div>
    </article>`).join("");

  if (addons.length) {
    html += `
    <article class="service-card addon-card reveal">
      <h3>Lash Add-ons</h3>
      <p>Customise any lash set with these extras.</p>
      ${addons.map(a => `<div class="addon-row"><div><strong>${esc(a.name)}</strong><br><small>${esc(a.desc)}</small></div><span class="price">${esc(a.price)}</span></div>`).join("")}
      <a href="#booking" class="btn btn-outline btn-sm">Book With Add-ons</a>
    </article>`;
  }
  $("#serviceGrid").innerHTML = html;

  // Booking form options
  $("#service").insertAdjacentHTML("beforeend",
    main.map(s => `<option value="${esc(s.name)}">${esc(s.name)} (${esc(s.price)})</option>`).join(""));
  const box = $("#addonChecks");
  if (addons.length) {
    box.innerHTML = addons.map(a => `
      <label class="check"><input type="checkbox" name="addons" value="${esc(a.name)}"><span>${esc(a.name)}</span><b>${esc(a.price)}</b></label>`).join("");
  } else { $("#addonBox").hidden = true; }

  // "Book This Service" preselects the service
  $$("[data-service]").forEach(btn => btn.addEventListener("click", () => {
    $("#service").value = btn.dataset.service; $("#service").dispatchEvent(new Event("change"));
  }));
}

function renderGallery() {
  $("#galleryFilters").innerHTML = CONFIG.galleryFilters.map((f, i) =>
    `<button class="filter-btn${i === 0 ? " active" : ""}" data-filter="${f.key}" aria-pressed="${i === 0}">${esc(f.label)}</button>`).join("");

  const label = k => (CONFIG.galleryFilters.find(f => f.key === k) || {}).label || "";
  $("#galleryGrid").innerHTML = CONFIG.gallery.map((g, i) => `
    <button class="g-item reveal${g.tall ? " tall" : ""}" data-index="${i}" data-cat="${g.category}" aria-label="View ${esc(g.title)}">
      <div class="slot tone-${g.tone || 1}">${mediaHTML(g.img, g.title)}</div>
      <div class="g-over"><span>${esc(label(g.category))}</span><strong>${esc(g.title)}</strong></div>
    </button>`).join("");

  $("#galleryFilters").addEventListener("click", e => {
    const b = e.target.closest(".filter-btn"); if (!b) return;
    $$(".filter-btn").forEach(x => { x.classList.toggle("active", x === b); x.setAttribute("aria-pressed", x === b); });
    $$(".g-item").forEach(it => {
      it.hidden = !(b.dataset.filter === "all" || it.dataset.cat === b.dataset.filter);
      it.classList.add("visible");
    });
  });
}

function renderReviews() {
  const track = $("#sliderTrack");
  if (!CONFIG.reviews.length) {
    track.innerHTML = `
      <div class="review empty">
        <div class="stars" aria-hidden="true">★★★★★</div>
        <p>Genuine client reviews are coming soon. Had a lash set with us? We'd love to hear from you.</p>
        <a class="btn btn-outline btn-sm" href="${waLink("Hello Bella Blinkss! I'd like to share my review.")}" target="_blank" rel="noopener">Share Your Experience</a>
      </div>`;
    return;
  }
  track.innerHTML = CONFIG.reviews.map(r => `
    <figure class="review">
      <div class="stars" aria-label="${r.stars} out of 5 stars">${"★".repeat(r.stars)}${"☆".repeat(5 - r.stars)}</div>
      <blockquote>“${esc(r.text)}”</blockquote>
      <cite>${esc(r.name)}</cite>
    </figure>`).join("");
}

function renderContact() {
  $("#cLocation").textContent = CONFIG.location;
  $("#cHours").innerHTML = CONFIG.hours.map(([d, t]) => `<div class="hours-row"><strong>${esc(d)}</strong><span>${esc(t)}</span></div>`).join("");

  const tt = $("#cTiktok"); tt.textContent = CONFIG.tiktokHandle; tt.href = CONFIG.tiktokUrl;
  $("#ttBtn").href = CONFIG.tiktokUrl; $("#fTt").href = CONFIG.tiktokUrl;
  const wa = waLink("Hello Bella Blinkss! I'd like to make an enquiry.");
  $("#waBtn").href = wa; $("#fWa").href = wa;

  // Optional channels: shown only when filled in
  if (CONFIG.instagramUrl) { ["#igBtn", "#fIg"].forEach(s => { $(s).href = CONFIG.instagramUrl; $(s).hidden = false; }); }
  if (CONFIG.email) {
    const m = $("#cEmail"); m.textContent = CONFIG.email; m.href = `mailto:${CONFIG.email}`;
    $("#cEmailCard").hidden = false; $("#fMail").href = `mailto:${CONFIG.email}`; $("#fMail").hidden = false;
  }
}

/* ---------------- NAVIGATION ---------------- */
function initNav() {
  const header = $("#header"), toggle = $("#navToggle"), menu = $("#navMenu");
  const setMenu = open => {
    menu.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open);
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.style.overflow = open ? "hidden" : "";
  };
  toggle.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
  $$("a", menu).forEach(a => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });
  window.addEventListener("resize", () => { if (innerWidth >= 960) setMenu(false); });

  const onScroll = () => header.classList.toggle("scrolled", scrollY > 30);
  onScroll(); window.addEventListener("scroll", onScroll, { passive: true });

  const links = $$(".nav-link");
  const spy = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + en.target.id)); });
  }, { rootMargin: "-45% 0px -50% 0px" });
  $$("main section[id]").forEach(s => spy.observe(s));
}

/* ---------------- SCROLL REVEAL ---------------- */
function initReveal() {
  const items = $$(".reveal");
  if (!("IntersectionObserver" in window)) { items.forEach(i => i.classList.add("visible")); return; }
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("visible"); obs.unobserve(en.target); } });
  }, { threshold: .12, rootMargin: "0px 0px -40px 0px" });
  items.forEach((el, i) => { el.style.transitionDelay = `${(i % 3) * 90}ms`; io.observe(el); });
}

/* ---------------- LIGHTBOX (before/after aware, respects filter) ---------------- */
function initLightbox() {
  const box = $("#lightbox"), body = $("#lbBody");
  let list = [], pos = 0, lastFocus = null;

  const panel = (img, alt, tone, tag) => `<div class="lb-panel slot tone-${tone}">${tag ? `<span class="tag">${tag}</span>` : ""}${mediaHTML(img, alt)}</div>`;

  function show(p) {
    pos = (p + list.length) % list.length;
    const g = CONFIG.gallery[list[pos]], tone = g.tone || 1;
    const isBA = g.category === "ba";
    body.innerHTML = `
      <div class="lb-pair${isBA ? "" : " single"}">
        ${isBA ? panel(g.before, g.title + " before", tone === 2 ? 1 : 2, "Before") : ""}
        ${panel(g.img, g.title, tone, isBA ? "After" : "")}
      </div>
      <figcaption>${esc(g.title)}</figcaption>`;
  }
  function open(index) {
    list = $$(".g-item:not([hidden])").map(el => +el.dataset.index);
    lastFocus = document.activeElement;
    show(list.indexOf(index));
    box.hidden = false; document.body.style.overflow = "hidden"; $("#lbClose").focus();
  }
  function close() { box.hidden = true; document.body.style.overflow = ""; lastFocus && lastFocus.focus(); }

  $("#galleryGrid").addEventListener("click", e => { const it = e.target.closest(".g-item"); if (it) open(+it.dataset.index); });
  $("#lbClose").addEventListener("click", close);
  $("#lbPrev").addEventListener("click", () => show(pos - 1));
  $("#lbNext").addEventListener("click", () => show(pos + 1));
  box.addEventListener("click", e => { if (e.target === box) close(); });
  document.addEventListener("keydown", e => {
    if (box.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(pos - 1);
    if (e.key === "ArrowRight") show(pos + 1);
  });
  let x0 = null;
  box.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; }, { passive: true });
  box.addEventListener("touchend", e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) show(pos + (dx < 0 ? 1 : -1));
    x0 = null;
  });
}

/* ---------------- TESTIMONIAL SLIDER ---------------- */
function initSlider() {
  const total = CONFIG.reviews.length;
  const slider = $("#slider"), track = $("#sliderTrack"), dotsWrap = $("#sliderDots");
  if (total < 2) { $("#prevBtn").hidden = true; $("#nextBtn").hidden = true; dotsWrap.hidden = true; return; }

  let index = 0, timer = null;
  dotsWrap.innerHTML = CONFIG.reviews.map((_, i) => `<button class="dot" role="tab" aria-label="Review ${i + 1}" data-i="${i}"></button>`).join("");
  const dots = $$(".dot", dotsWrap);

  function go(i) {
    index = (i + total) % total;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, k) => { d.classList.toggle("active", k === index); d.setAttribute("aria-selected", k === index); });
  }
  const stop = () => clearInterval(timer);
  const start = () => { stop(); timer = setInterval(() => go(index + 1), 6500); };

  $("#prevBtn").addEventListener("click", () => { go(index - 1); start(); });
  $("#nextBtn").addEventListener("click", () => { go(index + 1); start(); });
  dotsWrap.addEventListener("click", e => { const d = e.target.closest(".dot"); if (d) { go(+d.dataset.i); start(); } });
  slider.addEventListener("mouseenter", stop);
  slider.addEventListener("mouseleave", start);
  slider.addEventListener("focusin", stop);
  let x0 = null;
  slider.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; stop(); }, { passive: true });
  slider.addEventListener("touchend", e => {
    if (x0 !== null) { const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1)); }
    x0 = null; start();
  });
  go(0);
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) start();
}

/* ---------------- BOOKING FORM → WHATSAPP ---------------- */
function initBooking() {
  const form = $("#bookingForm"), status = $("#formStatus");
  const dateInput = $("#date"), timeSel = $("#time"), totalLine = $("#totalLine");

  // No past dates
  const t = new Date(); t.setMinutes(t.getMinutes() - t.getTimezoneOffset());
  dateInput.min = t.toISOString().split("T")[0];

  // Time options depend on the weekday (Sunday has different hours)
  function fillTimes() {
    const prev = timeSel.value;
    if (!dateInput.value) { timeSel.innerHTML = `<option value="">Choose a date first</option>`; return; }
    const isSunday = new Date(dateInput.value + "T00:00").getDay() === 0;
    const slots = isSunday ? CONFIG.slots.sunday : CONFIG.slots.week;
    timeSel.innerHTML = `<option value="">Select a time</option>` + slots.map(s => `<option value="${esc(s)}">${esc(s)}</option>`).join("");
    if (slots.includes(prev)) timeSel.value = prev;
  }
  dateInput.addEventListener("change", fillTimes);

  // Live estimated total
  const priceOf = name => (CONFIG.services.find(s => s.name === name) || {}).amount || 0;
  function updateTotal() {
    const base = $("#service").value;
    const extras = $$("input[name=addons]:checked", form).map(c => c.value);
    if (!base) { totalLine.innerHTML = ""; return; }
    totalLine.innerHTML = `Estimated total: <strong>${naira(priceOf(base) + extras.reduce((a, n) => a + priceOf(n), 0))}</strong>`;
  }
  $("#service").addEventListener("change", updateTotal);
  $("#addonChecks").addEventListener("change", updateTotal);

  const rules = {
    name:    v => v.trim().length >= 2 ? "" : "Please enter your full name.",
    phone:   v => /^[+()\d\s-]{7,18}$/.test(v.trim()) && v.replace(/\D/g, "").length >= 7 ? "" : "Enter a valid phone number.",
    email:   v => !v.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Enter a valid email address.",
    service: v => v ? "" : "Please choose a service.",
    date:    v => !v ? "Please choose a date." : (v < dateInput.min ? "Date can't be in the past." : ""),
    time:    v => v ? "" : "Please choose a time."
  };
  function check(field) {
    const el = form.elements[field], msg = rules[field](el.value);
    $(`#${field}Error`).textContent = msg;
    el.closest(".field").classList.toggle("invalid", !!msg);
    el.setAttribute("aria-invalid", !!msg);
    return !msg;
  }
  Object.keys(rules).forEach(f => {
    form.elements[f].addEventListener("blur", () => check(f));
    form.elements[f].addEventListener("input", () => { if (form.elements[f].closest(".field").classList.contains("invalid")) check(f); });
  });

  form.addEventListener("submit", e => {
    e.preventDefault();
    status.className = "form-status";
    const valid = Object.keys(rules).map(check).every(Boolean);
    if (!valid) {
      status.classList.add("err");
      status.textContent = "Please correct the highlighted fields and try again.";
      const first = $(".field.invalid input, .field.invalid select", form); first && first.focus();
      return;
    }

    const d = Object.fromEntries(new FormData(form));
    const extras = $$("input[name=addons]:checked", form).map(c => c.value);
    const total = priceOf(d.service) + extras.reduce((a, n) => a + priceOf(n), 0);
    const niceDate = new Date(d.date + "T00:00").toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

    const message = [
      "*New Appointment Request: Bella Blinkss*", "",
      `*Name:* ${d.name.trim()}`,
      `*Phone:* ${d.phone.trim()}`,
      `*Email:* ${d.email.trim() || "Not provided"}`,
      `*Service:* ${d.service}`,
      `*Add-ons:* ${extras.length ? extras.join(", ") : "None"}`,
      `*Estimated total:* ${naira(total)}`,
      `*Preferred date:* ${niceDate}`,
      `*Preferred time:* ${d.time}`,
      `*Notes:* ${d.notes.trim() || "None"}`, "",
      "_I understand my booking is validated upon payment. Please confirm availability. Thank you!_"
    ].join("\n");

    const win = window.open(waLink(message), "_blank", "noopener");
    if (!win) window.location.href = waLink(message);   // popup-blocked fallback

    status.classList.add("ok");
    status.textContent = "Thank you! WhatsApp has opened with your request. Please press Send to submit it. This is a request only: your booking is validated once payment is made and we've confirmed your slot.";
    form.reset(); fillTimes(); updateTotal();
  });
}

/* ---------------- BACK TO TOP + YEAR ---------------- */
function initMisc() {
  const btn = $("#toTop");
  const toggle = () => btn.classList.toggle("show", scrollY > 600);
  toggle(); window.addEventListener("scroll", toggle, { passive: true });
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  $("#year").textContent = new Date().getFullYear();
}

/* ---------------- INIT ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  renderServices(); renderGallery(); renderReviews(); renderContact();
  initNav(); initLightbox(); initSlider(); initBooking(); initMisc();
  initReveal();   // last, so generated elements are observed too
});
