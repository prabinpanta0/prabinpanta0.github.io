(() => {
	// Guard for GSAP availability
		const ready = () => typeof window !== 'undefined' && window.gsap;
	const waitForGSAP = (cb) => {
		if (ready()) return cb();
		const i = setInterval(() => { if (ready()) { clearInterval(i); cb(); } }, 10);
		setTimeout(() => clearInterval(i), 5000);
	};

		waitForGSAP(() => {
			const { gsap } = window;

		// Sections and themes
		const sections = [
			{
				id: 'about', title: 'About', glow: '#7fd7ff',
				art: [
					'_____       __________ ',
					'___(_)_________(_)_  /_',
					'__  /__  __ \\_  /_  __/',
					'_  / _  / / /  / / /_  ',
					'/_/  /_/ /_//_/  \\__/  ',
					'',
					'Prabin Panta — Lamjung, Nepal',
					'BSc(hons.) Computer Systems Engineering @ ISMT College (University of Sunderland)',
					'Builds practical AI/ML and software tools; adapts quickly.',
					'',
					'+ Focus: AI/ML • Software Tools • System Customization',
					'+ Stack: Python • scikit-learn/XGBoost/Keras • React/TS • Kotlin/Android',
					'+ Currently: Explainability (SHAP), OpenResty/Nginx security, Supabase',
					'',
					'Open‑source: github.com/prabinpanta0',
					'Contact: prabinpanta30@gmail.com',
					'Availability: Internships • Remote collaboration',
					'',
					'────────────────────────────────────────────────────────',
					'',
				].join('\n')
			},
			{
				id: 'education', title: 'Education', glow: '#7fe18a',
				art: [
					'  _____    _       ',
					' | ____|__| |_   _',
					' |  _| / _` | | | |',
					' | |__| (_| | |_| |',
					' |_____\\__,_|\\__,_|',
					'',
					'ISMT College (International School of Management and Technology)',
					'Tinkune, Nepal',
					'BSc (Hons) Computer Systems Engineering',
					'Jan 2023 — Present',
					'Affiliated with University of Sunderland',
					'',
					'+ Activities: AI projects, open‑source, system customization, Expo, Hackathons',
					'+ Tools: Python, React/TS, Linux, Git/GitHub, Java, C#',
				].join('\n')
			},
			{
				id: 'projects', title: 'Projects', glow: '#9ad7ff',
				art: [
					'                        _ ',
					'    ____  _________    (_)',
					'   / __ \\/ ___/ __ \\  / / ',
					'  / /_/ / /  / /_/ / / /  ',
					' / .___/_/   \\____/_/ /   ',
					'/_/              /___/    ',
										'',
					'• Network Intrusion Detection System — ML traffic classification; Gradio UI; SHAP',
					'  github.com/prabinpanta0/Network-Intrusion-Detection-System',
					' ',
					'• Product Development — AI Solutions — React/TS; Vite; Tailwind',
					'  github.com/prabinpanta0/Product-Development--AI-Solutions',
					' ',
					'• User Registration CET324 — MFA, reCAPTCHA v3, CSRF, rate limit — OpenResty/Lua/Nim',
					'  github.com/prabinpanta0/User-Registration-CET324',
					' ',
					'• MealMate — Android recipes & meal planning; Supabase; MVVM',
					'  github.com/prabinpanta0/mealmate',
					' ',
					'• Patient Readmission Prediction — LightGBM/NN comparison; CV; metrics',
					'  github.com/prabinpanta0/Patient-Readmission-Prediction',
				].join('\n')
			},
			{
				id: 'skills', title: 'Skills', glow: '#7fe1c8',
				art: [
					' __                    __  ',
					'/__` |__/ | |    |    /__` ',
					'.__/ |  \\ | |___ |___ .__/ ',
										'',
					'AI/ML: scikit-learn, XGBoost, Keras, LightGBM, Gradio, Streamlit, SHAP',
					' ',
					'Frontend: React, TypeScript, JavaScript, Vite, Tailwind CSS',
					' ',
					'Backend/Platforms: Nix, OpenResty, Nginx, Lua, Nim',
					' ',
					'Databases: PostgreSQL, SQLite, MongoDB, Supabase',
					' ',
					'Mobile: Kotlin, Android Studio, MVVM, Glide',
					' ',
					'Dev/Tools: Linux, Git & GitHub, PlantUML, Mermaid',
					' ',
					'Core: Data preprocessing, visualization, debugging, problem-solving,',
					'      documentation, adaptability, critical thinking, logic simulation',
				].join('\n')
			},
			{
				id: 'contact', title: 'Contact', glow: '#bca7ff',
				art: [
					'   ___ ___  _ __  ',
					'  / __/ _ \\|  _ \\ ',
					' | (_| (_) | | | |',
					'  \\___\\___/|_| |_|',
					'',
					'Prabin Panta',
					'Location: Lamjung, Nepal',
					'Email: prabinpanta30@gmail.com',
					'Phone: +977-9815751715',
					'LinkedIn: linkedin.com/in/prabinpanta00',
					'GitHub: github.com/prabinpanta0',
					'Website: prabinpanta0.github.io',
					'Availability: Internships • Remote collaboration',
					'Timezone: NPT (UTC+5:45) — responsive during evenings/weekends',
				].join('\n')
			}
		];

		// Elements
		const stage = document.getElementById('stage');
		const screen = document.getElementById('ascii-screen');
		const hint = document.getElementById('screen-hint');
		const holoScreen = document.querySelector('.holo-screen');
		const base = document.querySelector('.holo-base');
		const beam = document.querySelector('.holo-beam');
		const dots = document.getElementById('dots');
		if (!stage || !screen || !dots) return;

		const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		// Accessibility hints
		const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
		if (hint) hint.textContent = isTouch ? 'Hint: Swipe to navigate sections' : 'Hint: Scroll to navigate sections';

		// Build dots as buttons
		let currentIndex = 0;
		const dotEls = sections.map((s, i) => {
			const b = document.createElement('button');
			b.className = 'dot' + (i === 0 ? ' active' : '');
			b.setAttribute('aria-label', `${s.title}`);
			if (i === 0) b.setAttribute('aria-current', 'true');
			b.type = 'button';
			b.addEventListener('click', () => jumpToIndex(i));
			dots.appendChild(b);
			return b;
		});

		// Small-screen nav buttons
		const navWrap = document.createElement('div');
		navWrap.className = 'nav-buttons';
		const prevBtn = document.createElement('button');
		prevBtn.className = 'nav-btn';
		prevBtn.type = 'button';
		prevBtn.textContent = '◀ Prev';
		prevBtn.addEventListener('click', () => jumpToIndex(Math.max(0, currentIndex - 1)));
		const nextBtn = document.createElement('button');
		nextBtn.className = 'nav-btn';
		nextBtn.type = 'button';
		nextBtn.textContent = 'Next ▶';
		nextBtn.addEventListener('click', () => jumpToIndex(Math.min(sections.length - 1, currentIndex + 1)));
		navWrap.appendChild(prevBtn);
		navWrap.appendChild(nextBtn);
		const projector = document.querySelector('.holo-projector');
		if (projector) projector.appendChild(navWrap);

			// Helper to update glow CSS variables from a hex color
			function setGlow(hex){
				const m = /^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(hex);
				if (!m) { document.documentElement.style.setProperty('--holo-glow', hex); return; }
				const r = parseInt(m[1],16), g=parseInt(m[2],16), b=parseInt(m[3],16);
				document.documentElement.style.setProperty('--holo-glow', `rgb(${r} ${g} ${b})`);
				document.documentElement.style.setProperty('--holo-glow-soft', `rgba(${r}, ${g}, ${b}, 0.45)`);
				document.documentElement.style.setProperty('--holo-glow-weak', `rgba(${r}, ${g}, ${b}, 0.20)`);
				document.documentElement.style.setProperty('--holo-glow-strong', `rgba(${r}, ${g}, ${b}, 0.8)`);
			}

			// Render function with lightweight formatting
			function linkify(text){
				// Replace raw URLs with anchor tags
				return text.replace(/(https?:\/\/[^\s]+|(?:^|\s)(?:[\w.-]+\.[a-z]{2,}[^\s]*))/gi, (m) => {
					const url = m.trim().startsWith('http') ? m.trim() : `https://${m.trim()}`;
					const label = m.trim();
					return m.startsWith(' ') ? ` <a href="${url}" class="ansi-link" target="_blank" rel="noopener noreferrer">${label}</a>` : `<a href="${url}" class="ansi-link" target="_blank" rel="noopener noreferrer">${label}</a>`;
				});
			}
			function colorTokens(text){
				// Colorize bullets, labels and keys using spans
				let t = text
					.replace(/^•/gm, '<span class="ansi-bullet">•</span>')
					.replace(/^\+\s([^\n]+)/gm, '<span class="ansi-key">+$1</span>')
					.replace(/^(AI\/ML|Frontend|Backend\/Platforms|Databases|Mobile|Dev\/Tools|Core|Coursework|Activities|Tools|Location|Email|Phone|LinkedIn|GitHub|Website|Availability|Timezone):/gm, '<span class="ansi-section">$1:</span>');
				// Highlight common tech keywords
				const techWords = ['Python','scikit-learn','XGBoost','Keras','LightGBM','Gradio','Streamlit','React','TypeScript','JavaScript','Vite','Tailwind','Tailwind CSS','Kotlin','Android','Supabase','PostgreSQL','SQLite','MongoDB','OpenResty','Nginx','Lua','Nim','SHAP','Linux','Git','GitHub','PlantUML','Mermaid','MVVM','Glide'];
				const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
				const techPattern = new RegExp('(?<![\\w-])(' + techWords.map(esc).join('|') + ')(?![\\w-])','g');
				t = t.replace(techPattern, '<span class="ansi-tech">$1</span>');
				return t;
			}
			function escapeHtml(s){
				return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
			}
			function render(idx){
				// Start with escaped text, optionally strip ASCII banner for small screens, then colorize and linkify
				const rawBase = sections[idx].art.replace(/\u00a0/g, ' ');
				const isSmall = window.matchMedia('(max-width: 600px)').matches;
				const stripped = (function stripBanner(t){
					if (!isSmall) return t;
					const lines = t.split('\n');
					const sample = lines.slice(0, 6);
					const asciiChars = /[^A-Za-z0-9\s]/g; // punctuation-heavy lines indicative of ASCII art
					let heavyCount = 0;
					sample.forEach(l => {
						const nonAlnum = (l.match(asciiChars) || []).length;
						const ratio = l.length ? nonAlnum / l.length : 0;
						if (ratio > 0.4) heavyCount++;
					});
					if (heavyCount >= 3){
						let i = 0;
						while (i < lines.length && lines[i].trim() !== '') i++; // skip banner block
						while (i < lines.length && lines[i].trim() === '') i++; // skip following blank line(s)
						return lines.slice(i).join('\n');
					}
					return t;
				})(rawBase);
				const html = linkify(colorTokens(escapeHtml(stripped))).replace(/\n/g,'<br>');
				screen.innerHTML = html;
				if (hint) hint.textContent = `${sections[idx].title}`;
				dotEls.forEach((d, i) => {
					d.classList.toggle('active', i === idx);
					if (i === idx) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current');
				});
					setGlow(sections[idx].glow);
			}

		// Particle burst effect inside screen
		function particleBurst(){
			const container = holoScreen;
			if (!container) return;
			const n = 12;
			for (let i=0; i<n; i++){
				const p = document.createElement('span');
				p.style.position = 'absolute';
				p.style.left = (12 + Math.random()* (container.clientWidth - 24)) + 'px';
				p.style.top = (12 + Math.random()* (container.clientHeight - 24)) + 'px';
				p.style.width = p.style.height = (2 + Math.random()*3) + 'px';
				p.style.borderRadius = '50%';
				p.style.pointerEvents = 'none';
				p.style.background = 'currentColor';
				p.style.color = getComputedStyle(document.documentElement).getPropertyValue('--holo-glow') || '#7fd7ff';
				container.appendChild(p);
				gsap.fromTo(p, { opacity: 0.9, y: 0, x: 0 }, { opacity: 0, duration: 0.6, ease: 'power2.out', y: (Math.random()*2-1)*30, x: (Math.random()*2-1)*40, onComplete(){ p.remove(); } });
			}
		}

		// Screen crossfade helper
		function setIndex(i){
			if (i === currentIndex) return;
			currentIndex = i;
			screen.classList.remove('fade-in');
			screen.classList.add('fade-out');
			setTimeout(() => {
				render(currentIndex);
				screen.classList.remove('fade-out');
				screen.classList.add('fade-in');
				particleBurst();
			}, 160);
		}

		render(0);

		// Deck/grid removed per request

			// Entry reveal
			stage.classList.add('holo-reveal');

			// Manual scroll scrubbing: 0..1 progress value
			let progress = 0; // 0..1
			const clamp01 = (v) => Math.max(0, Math.min(1, v));
			const step = 1 / Math.max(1, sections.length - 1);

			// Map progress to visuals
			function applyProgress(p){
				// Light-up: 0..0.15 fades in base/beam/screen
				const light = Math.min(1, p / 0.15);
				gsap.set(base, { opacity: light });
				gsap.set(beam, { opacity: 0.7 * light });
				const isFlat = window.matchMedia('(max-width: 600px)').matches;
				gsap.set(holoScreen, { opacity: light, filter: `blur(${(1-light)*6}px)`, rotateX: isFlat ? 0 : 18 });
				// Section index
				const idx = Math.round((p) / step);
				const clampedIdx = Math.max(0, Math.min(sections.length - 1, idx));
				if (clampedIdx !== currentIndex) setIndex(clampedIdx);
			}

			// Jump to a specific index by setting progress and animating
			function jumpToIndex(i){
				const target = clamp01(i * step);
				gsap.to({ p: progress }, {
					p: target,
					duration: 0.5,
					ease: 'power2.out',
					onUpdate: function(){ progress = this.targets()[0].p; applyProgress(progress); }
				});
			}

			// Wheel/touch/keyboard handlers to scrub progress
			let wheelLock = false;
			function onWheel(e){
				e.preventDefault();
				if (prefersReduced) return; // optional: ignore for reduced motion
				const isFlat = window.matchMedia('(max-width: 600px)').matches;
				const useX = Math.abs(e.deltaX) > Math.abs(e.deltaY);
				// In flat mode on small screens, never switch sections on vertical scroll; only horizontal
				if (isFlat && !useX && Math.abs(e.deltaY) > 0){
					// Let ascii-screen handle vertical scrolling; do not change section
					const maxScroll = screen.scrollHeight - screen.clientHeight;
					const atTop = screen.scrollTop <= 0;
					const atBottom = Math.ceil(screen.scrollTop) >= maxScroll;
					// Always just scroll content; do not change sections on vertical intent
					screen.scrollTop += e.deltaY;
					return;
				}
				const raw = useX ? e.deltaX : e.deltaY;
				// Require stronger horizontal intent to switch, especially on small screens
				const threshold = isFlat ? 24 : 6;
				if (useX && Math.abs(raw) < threshold) return;
				const delta = Math.sign(raw);
				if (wheelLock) return;
				wheelLock = true;
				const next = clamp01(progress + delta * step);
				gsap.to({ p: progress }, {
					p: next, duration: 0.4, ease: 'power2.out',
					onUpdate: function(){ progress = this.targets()[0].p; applyProgress(progress); },
					onComplete(){ wheelLock = false; }
				});
			}
			window.addEventListener('wheel', onWheel, { passive: false });

			// Touch swipe
			let touchStartY = null, touchStartX = null, gestureAxis = null, swipeLock = false;
			window.addEventListener('touchstart', (e) => { touchStartY = e.touches[0].clientY; touchStartX = e.touches[0].clientX; gestureAxis = null; }, { passive: true });
			window.addEventListener('touchmove', (e) => {
				if (touchStartY == null || touchStartX == null) return;
				const isFlat = window.matchMedia('(max-width: 600px)').matches;
				// Only prevent default if we're handling navigation; otherwise allow content scroll
				const dy = touchStartY - e.touches[0].clientY;
				const dx = touchStartX - e.touches[0].clientX;
				let dir = 0;
				const startThreshold = 18; // pixels before locking axis
				const horizBias = 1.2; // favor vertical unless clearly horizontal
				if (!gestureAxis){
					if (Math.abs(dx) > startThreshold || Math.abs(dy) > startThreshold){
						gestureAxis = Math.abs(dx) > Math.abs(dy) * horizBias ? 'x' : 'y';
					}
				}
				if (gestureAxis === 'y'){
					// Scroll content; never navigate in flat mode via vertical
					screen.scrollTop += dy;
					touchStartY = e.touches[0].clientY;
					return;
				}
				if (gestureAxis === 'x'){
					if (swipeLock) return;
					const swipeThreshold = isFlat ? 28 : 12;
					dir = dx > swipeThreshold ? 1 : dx < -swipeThreshold ? -1 : 0;
					if (dir !== 0){
						swipeLock = true;
						const next = clamp01(progress + dir * step); progress = next; applyProgress(progress);
						// reset lock shortly to avoid multiple jumps in a single swipe
						setTimeout(() => { swipeLock = false; }, 320);
					}
					return;
				}
				// If no axis yet and not flat, prevent default to avoid body scroll
				if (!isFlat) e.preventDefault();
			}, { passive: false });
			window.addEventListener('touchend', () => { touchStartY = null; touchStartX = null; }, { passive: true });

			// Keyboard arrows/space/enter
			window.addEventListener('keydown', (e) => {
				if (['ArrowDown','ArrowRight','PageDown',' '].includes(e.key)) { e.preventDefault(); jumpToIndex(Math.min(sections.length-1, currentIndex + 1)); }
				if (['ArrowUp','ArrowLeft','PageUp'].includes(e.key)) { e.preventDefault(); jumpToIndex(Math.max(0, currentIndex - 1)); }
				if (e.key === 'Home') { e.preventDefault(); jumpToIndex(0); }
				if (e.key === 'End') { e.preventDefault(); jumpToIndex(sections.length - 1); }
			});

			// Dots click already calls jumpToIndex via earlier setup

			// Pause animations when tab hidden
			document.addEventListener('visibilitychange', () => {
				if (document.hidden) gsap.globalTimeline.pause();
				else gsap.globalTimeline.resume();
			});

			// Initial apply
			applyProgress(progress);
	});
})();

