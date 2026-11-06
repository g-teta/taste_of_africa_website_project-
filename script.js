/* =====================================================
   Tastes of Africa — script.js
   One file linked on every page. Each feature first checks that
   its elements exist, so the same file works on all pages.
   Features: theme toggle · mobile menu · favourites (localStorage) ·
   recipe filter + search · saved-recipes page · ingredient scaler ·
   contact form validation · newsletter
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ---------- Recipe data (used by the Saved recipes page) ---------- */
  const RECIPES = {
  "jollof-rice": {
    "title": "Smoky Party Jollof Rice",
    "country": "Nigeria",
    "region": "west-africa",
    "time": "55 min",
    "file": "recipe-jollof-rice.html",
    "img": "C:\\Users\\tetag\\Downloads\\taste_of_africa_website_project\\taste_of_africa_website_project\\images\\Smoky Jollof rice.jpg",
    "short": "A celebratory one-pot rice, layered with fire-roasted peppers, tomatoes and the unmistakable smoky flavour of a Nigerian gathering."
  },
  "egusi-soup": {
    "title": "Rich Egusi Soup",
    "country": "Nigeria",
    "region": "west-africa",
    "time": "1 hr 20",
    "file": "recipe-egusi-soup.html",
    "img": "https://images.unsplash.com/photo-1763048443535-1243379234e2?auto=format&fit=crop&w=1200&q=85",
    "short": "A deeply savoury melon-seed soup enriched with leafy greens and slow-cooked aromatics, served at tables across West Africa."
  },
  "lentils-injera": {
    "title": "Berbere Lentils & Injera",
    "country": "Ethiopia",
    "region": "east-africa",
    "time": "45 min",
    "file": "recipe-lentils-injera.html",
    "img": "https://images.unsplash.com/photo-1517314597476-e1788060b6cb?auto=format&fit=crop&w=1200&q=85",
    "short": "Earthy red lentils simmered with fragrant berbere, traditionally gathered with pieces of tangy, cloud-soft injera."
  },
  "tagine": {
    "title": "Preserved Lemon Tagine",
    "country": "Morocco",
    "region": "north-africa",
    "time": "1 hr 35",
    "file": "recipe-tagine.html",
    "img": "https://images.unsplash.com/photo-1682370207954-c8a9cccaabb4?auto=format&fit=crop&w=1200&q=85",
    "short": "A fragrant, slow-cooked Moroccan classic with saffron, green olives and the bright complexity of preserved lemon."
  },
  "cape-malay-curry": {
    "title": "Cape Malay Curry",
    "country": "South Africa",
    "region": "southern-africa",
    "time": "1 hr 10",
    "file": "recipe-cape-malay-curry.html",
    "img": "https://images.unsplash.com/photo-1577639179427-6e2d26f92285?auto=format&fit=crop&w=1200&q=85",
    "short": "An aromatic Cape Town curry balancing gentle spice, fruit and savoury depth, a recipe shaped by generations of exchange."
  },
  "pilau": {
    "title": "East African Pilau",
    "country": "Kenya",
    "region": "east-africa",
    "time": "50 min",
    "file": "recipe-pilau.html",
    "img": "https://images.unsplash.com/photo-1661081988119-58e40ee39201?auto=format&fit=crop&w=1400&q=85",
    "short": "Perfumed basmati rice with toasted whole spices, a Swahili coast staple made for generous sharing."
  }
};
  const ICONS = {"heart": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z\"/></svg>", "clock": "<svg width=\"15\" height=\"15\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 7v5l3 2\"/></svg>", "arrow": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M5 12h14M14 7l5 5-5 5\"/></svg>", "arrow17": "<svg width=\"17\" height=\"17\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M5 12h14M14 7l5 5-5 5\"/></svg>"};

  /* ---------- Safe localStorage helpers ---------- */
  const store = {
    get(key, fallback) {
      try { const raw = localStorage.getItem(key); return raw === null ? fallback : JSON.parse(raw); }
      catch (e) { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* storage blocked */ }
    }
  };
  const FAV_KEY = 'toa-favourites';
  const getFavourites = () => store.get(FAV_KEY, []);


  /* ===== 1. DARK / LIGHT THEME (remembered between visits) ===== */
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (themeToggle) {
      themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Use light mode' : 'Use dark mode');
    }
  }
  applyTheme(store.get('toa-theme', 'light'));

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      store.set('toa-theme', next);
    });
  }


  /* ===== 2. MOBILE MENU ===== */
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');

  function setMenu(open) {
    mainNav.classList.toggle('open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
  }
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => setMenu(!mainNav.classList.contains('open')));
    mainNav.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
  }


  /* ===== 3. FAVOURITES (saved in localStorage) ===== */
  const favCount = document.getElementById('fav-count');
  const favLink = document.getElementById('fav-link');

  // Paint every heart button + the header counter from the saved list
  function paintFavourites() {
    const favs = getFavourites();
    if (favCount) {
      favCount.textContent = favs.length;
      favCount.hidden = favs.length === 0;
    }
    if (favLink) favLink.setAttribute('aria-label', favs.length + ' saved recipes');

    document.querySelectorAll('.heart-button, .save-pill').forEach(btn => {
      const saved = favs.includes(btn.dataset.id);
      btn.classList.toggle('saved', saved);
      btn.setAttribute('aria-pressed', String(saved));
      const svg = btn.querySelector('svg');
      if (svg) svg.setAttribute('fill', saved ? 'currentColor' : 'none');
      const label = btn.querySelector('.save-label');
      if (label) label.textContent = saved ? 'Saved' : 'Save recipe';
    });
  }

  function toggleFavourite(id) {
    let favs = getFavourites();
    favs = favs.includes(id) ? favs.filter(f => f !== id) : favs.concat(id);
    store.set(FAV_KEY, favs);
    paintFavourites();
  }

  // One delegated listener handles every heart on every page
  document.addEventListener('click', event => {
    const btn = event.target.closest('.heart-button, .save-pill');
    if (!btn) return;
    event.preventDefault();
    toggleFavourite(btn.dataset.id);
    if (document.body.dataset.page === 'favorites') renderFavourites();
  });
  window.addEventListener('storage', paintFavourites);
  paintFavourites();   // restore saved favourites when the page loads


  /* ===== 4. RECIPES PAGE: region filter + live search ===== */
  const grid = document.getElementById('recipe-grid');

  if (grid) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('recipe-search');
    const items = Array.from(grid.querySelectorAll('.grid-item'));
    const resultCount = document.getElementById('result-count');
    const emptyState = document.getElementById('empty-state');
    let region = 'all';
    let query = '';

    function applyFilters() {
      let visible = 0;
      const q = query.trim().toLowerCase();

      // Loop through every recipe card: show matches, hide the rest
      items.forEach(item => {
        const info = RECIPES[item.dataset.id];
        const text = (info.title + ' ' + info.country + ' ' + item.dataset.region.replace('-', ' ')).toLowerCase();
        const show = (region === 'all' || item.dataset.region === region) && (!q || text.includes(q));
        item.classList.toggle('hidden', !show);

        if (show) {
          // Re-apply the magazine layout classes to the visible cards
          item.className = item.className.replace(/\bitem-\d\b/g, '').trim() + ' item-' + (visible % 4);
          item.querySelector('.recipe-feature').classList.toggle('large', visible % 4 === 0);
          visible++;
        }
      });

      resultCount.textContent = visible === items.length
        ? 'Showing all ' + items.length + ' dishes'
        : 'Showing ' + visible + (visible === 1 ? ' dish' : ' dishes');
      grid.classList.toggle('hidden', visible === 0);
      emptyState.classList.toggle('hidden', visible !== 0);
    }

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        button.classList.add('active');
        region = button.dataset.filter;
        applyFilters();
      });
    });

    searchInput.addEventListener('input', () => { query = searchInput.value; applyFilters(); });

    document.getElementById('reset-filters').addEventListener('click', () => {
      region = 'all'; query = ''; searchInput.value = '';
      filterButtons.forEach(b => b.classList.toggle('active', b.dataset.filter === 'all'));
      applyFilters();
    });

    if (location.hash === '#recipe-search') searchInput.focus();   // arrive from the header search icon
  }


  /* ===== 5. SAVED RECIPES PAGE ===== */
  const favGrid = document.getElementById('favorites-grid');

  function renderFavourites() {
    const ids = getFavourites().filter(id => RECIPES[id]);
    favGrid.innerHTML = '';
    favGrid.classList.toggle('hidden', ids.length === 0);
    document.getElementById('no-favorites').classList.toggle('hidden', ids.length > 0);

    ids.forEach((id, i) => {
      const r = RECIPES[id];
      const cell = document.createElement('div');
      cell.className = 'grid-item item-' + (i % 4);
      cell.innerHTML =
        '<figure class="recipe-feature' + (i % 4 === 0 ? ' large' : '') + '">' +
          '<div class="recipe-image">' +
            '<a href="' + r.file + '"><img src="' + r.img + '" alt="' + r.title + '"></a>' +
            '<button type="button" class="heart-button" data-id="' + id + '" aria-label="Remove ' + r.title + ' from saved recipes">' + ICONS.heart + '</button>' +
          '</div>' +
          '<figcaption>' +
            '<div class="recipe-meta"><span>' + r.country + '</span><span>' + ICONS.clock + ' ' + r.time + '</span></div>' +
            '<h3><a href="' + r.file + '">' + r.title + '</a></h3>' +
            '<p class="intro">' + r.short + '</p>' +
            '<a class="recipe-link" href="' + r.file + '">Explore recipe ' + ICONS.arrow17 + '</a>' +
          '</figcaption></figure>';
      favGrid.appendChild(cell);
    });
    paintFavourites();
  }
  if (favGrid) renderFavourites();


  /* ===== 6. INGREDIENT SCALER (recipe pages) ===== */
  const servUp = document.getElementById('serv-up');
  const servDown = document.getElementById('serv-down');

  if (servUp && servDown) {
    const BASE = Number(document.getElementById('ingredients').dataset.baseServings);
    const quantities = document.querySelectorAll('#ingredients .qty');
    const countEl = document.getElementById('serv-count');
    let servings = BASE;

    function formatQty(n) {
      return Number.isInteger(n) ? String(n) : String(Math.round(n * 10) / 10);   // max 1 decimal
    }

    function updateServings() {
      const factor = servings / BASE;
      quantities.forEach(el => { el.textContent = formatQty(Number(el.dataset.base) * factor); });
      countEl.textContent = servings;
      document.getElementById('serves-label').textContent = servings + ' people';
      document.getElementById('scaling-note').textContent = 'Quantities scale automatically for ' + servings + ' servings.';
    }

    servUp.addEventListener('click', () => { servings = Math.min(12, servings + 1); updateServings(); });
    servDown.addEventListener('click', () => { servings = Math.max(2, servings - 1); updateServings(); });
  }


  /* ===== 7. CONTACT FORM: validation + confirmation ===== */
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const charCount = document.getElementById('char-count');

    const setError = (input, text) => {
      document.getElementById(input.id + '-error').textContent = text;
      input.setAttribute('aria-invalid', text ? 'true' : 'false');
    };

    messageInput.addEventListener('input', () => {
      charCount.textContent = messageInput.value.trim().length + ' characters';
    });

    contactForm.addEventListener('submit', event => {
      event.preventDefault();                       // stop the page from reloading

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const message = messageInput.value.trim();
      let valid = true;

      setError(nameInput, name ? '' : 'Please tell us your name.');
      if (!name) valid = false;

      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      setError(emailInput, emailOk ? '' : 'Enter a valid email address.');
      if (!emailOk) valid = false;

      if (message.length <= 20) {
        setError(messageInput, 'Your message must be more than 20 characters (currently ' + message.length + ').');
        valid = false;
      } else {
        setError(messageInput, '');
      }
      if (!valid) return;

      // Success: hide the form and greet the visitor by name
      document.getElementById('confirmation-text').textContent = 'Thank you, ' + name + "! We've received your message.";
      contactForm.classList.add('hidden');
      document.getElementById('confirmation').classList.remove('hidden');
    });
  }


  /* ===== 8. NEWSLETTER (footer on every page) ===== */
  const newsletter = document.getElementById('newsletter-form');

  if (newsletter) {
    newsletter.addEventListener('submit', event => {
      event.preventDefault();
      const input = document.getElementById('news-email');
      const error = document.getElementById('news-error');

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
        error.textContent = 'Please enter a valid email address.';
        input.focus();
        return;
      }
      newsletter.innerHTML = '<p style="font-family:\'DM Serif Display\',serif;font-size:28px;opacity:1">Welcome to the table. Thank you for subscribing!</p>';
    });
  }

});
