(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  $('#year').textContent = new Date().getFullYear();

  // Nav border once the page scrolls
  const nav = $('#nav');
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 10);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  const toggle = $('#navToggle');
  const links = $('#navLinks');
  const setMenu = open => {
    links.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  toggle.addEventListener('click', () => setMenu(!links.classList.contains('open')));
  $$('a', links).forEach(a => a.addEventListener('click', () => setMenu(false)));

  // Highlight the nav link for the section in view
  const navLinks = new Map($$('.nav__links a[href^="#"]:not(.btn)').map(a => [a.hash.slice(1), a]));
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      navLinks.forEach(a => a.classList.remove('is-active'));
      navLinks.get(e.target.id)?.classList.add('is-active');
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  navLinks.forEach((_, id) => { const s = document.getElementById(id); if (s) sectionObserver.observe(s); });

  // Fade sections in as they arrive
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); revealObserver.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  $$('.reveal').forEach(el => revealObserver.observe(el));

  // Hero diagram: light up the stage the dot is passing
  const loop = $('#heroLoop');
  if (loop) {
    const nodes = $$('.loop__node', loop);
    const DURATION = 12;
    let current = -1;
    const update = () => {
      const t = loop.getCurrentTime ? loop.getCurrentTime() : performance.now() / 1000;
      const i = Math.floor(((t % DURATION) / DURATION) * nodes.length + 0.5) % nodes.length;
      if (i !== current) {
        nodes.forEach((n, k) => n.classList.toggle('is-active', k === i));
        current = i;
      }
      requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  // Pilot designs
  const PILOTS = [
    {
      title: 'AI Agents and Tool Use',
      desc: 'We simulate a workflow that runs across your business tools, so you can check both the steps an agent takes and where it ends up.',
      input: 'A simulated workflow across the business tools you use.',
      output: ['Reference steps', 'Tool-use logs', 'A scorecard for the outcome']
    },
    {
      title: 'Coding and Software Engineering',
      desc: 'You approve a Python issue. We turn it into a task pack a model can be tested on.',
      input: 'A Python issue you have signed off on.',
      output: ['A reference solution', 'Tests you can run', 'A scoring report']
    },
    {
      title: 'Physical AI and Robotics',
      desc: 'We work from staged footage shot on several cameras at once.',
      input: 'Staged footage from multiple cameras.',
      output: ['Event labels lined up in time', 'Camera IDs', 'A report on missing views or timing problems']
    },
    {
      title: 'Speech and Multilingual AI',
      desc: 'We put together a sample across the languages, accents and noise conditions you pick.',
      input: 'Recordings in your chosen languages, accents and noise levels.',
      output: ['Reference transcripts', 'Errors broken down by language', 'Errors broken down by recording condition']
    },
    {
      title: 'Documents and Multimodal AI',
      desc: 'We pair questions with PDFs, screenshots or video, and every answer points back to its evidence.',
      input: 'Questions alongside PDFs, screenshots or video.',
      output: ['Reference answers', 'The page, region or timestamp that supports each one']
    },
    {
      title: 'Expert Evaluation and Safety',
      desc: 'Specialists set the scoring criteria for a workflow like healthcare intake, then apply them.',
      input: 'A workflow, such as healthcare intake, and the specialists who know it.',
      output: ['Scored examples', 'Write-ups of where experts disagreed', 'Cases that need escalating']
    },
    {
      title: 'Search and Knowledge Retrieval',
      desc: 'We build realistic queries with the right sources, plus near-misses that look right but aren’t.',
      input: 'Representative queries, relevant sources and plausible near-matches.',
      output: ['Relevance ratings', 'Checks that each answer is backed by its sources']
    }
  ];

  const tabList = $('#solTabs');
  const panel = $('#solPanel');
  const els = { title: $('#solTitle'), desc: $('#solDesc'), input: $('#solIn'), output: $('#solOut') };

  PILOTS.forEach((p, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'sol__tab';
    b.id = `sol-tab-${i}`;
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-controls', 'solPanel');
    b.textContent = p.title;
    b.addEventListener('click', () => show(i));
    tabList.appendChild(b);
  });
  const tabs = $$('.sol__tab', tabList);
  let active = 0;

  function show(i, focus) {
    active = i;
    const p = PILOTS[i];
    tabs.forEach((t, k) => {
      t.setAttribute('aria-selected', String(k === i));
      t.tabIndex = k === i ? 0 : -1;
    });
    els.title.textContent = p.title;
    els.desc.textContent = p.desc;
    els.input.textContent = p.input;
    els.output.innerHTML = '';
    p.output.forEach(o => { const li = document.createElement('li'); li.textContent = o; els.output.appendChild(li); });
    panel.setAttribute('aria-labelledby', tabs[i].id);
    panel.classList.remove('swap'); void panel.offsetWidth; panel.classList.add('swap');
    if (focus) tabs[i].focus();
  }

  tabList.addEventListener('keydown', e => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    show((active + step + tabs.length) % tabs.length, true);
  });

  show(0);
})();
