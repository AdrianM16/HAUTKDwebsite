/* HAU Taekwondo */
(function () {
    'use strict';

    document.documentElement.classList.add('js');

    var CONTACT_EMAIL = 'hautaekwondo@gmail.com';

    /* ---- mobile menu ---- */
    var toggle = document.querySelector('.menu-toggle');
    var menu = document.getElementById('nav-menu');

    function setMenu(open) {
        if (!toggle || !menu) return;
        toggle.setAttribute('aria-expanded', String(open));
        menu.classList.toggle('open', open);
        document.body.style.overflow = open ? 'hidden' : '';
    }

    if (toggle && menu) {
        toggle.addEventListener('click', function () {
            setMenu(toggle.getAttribute('aria-expanded') !== 'true');
        });
        menu.addEventListener('click', function (e) {
            if (e.target.closest('a')) setMenu(false);
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') setMenu(false);
        });
        document.addEventListener('click', function (e) {
            if (menu.classList.contains('open') && !e.target.closest('.nav')) setMenu(false);
        });
        window.matchMedia('(min-width: 861px)').addEventListener('change', function (mq) {
            if (mq.matches) setMenu(false);
        });
    }

    /* ---- header + progress ---- */
    var header = document.querySelector('.site-header');
    var bar = document.querySelector('.progress span');
    var ticking = false;

    function onScroll() {
        var y = window.scrollY;
        if (header) header.classList.toggle('scrolled', y > 12);
        if (bar) {
            var max = document.documentElement.scrollHeight - window.innerHeight;
            bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(y / max, 1) : 0) + ')';
        }
        ticking = false;
    }
    window.addEventListener('scroll', function () {
        if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
    }, { passive: true });
    onScroll();

    /* ---- reveal ---- */
    var revealables = document.querySelectorAll('[data-reveal]');
    if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0, rootMargin: '0px 0px -12% 0px' });
        revealables.forEach(function (el) { io.observe(el); });
    } else {
        revealables.forEach(function (el) { el.classList.add('in'); });
    }

    /* ---- videos ---- */
    var videos = document.querySelectorAll('video');
    if (videos.length && 'IntersectionObserver' in window) {
        var vio = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting && !entry.target.paused) entry.target.pause();
            });
        }, { threshold: 0.25 });
        videos.forEach(function (v) {
            vio.observe(v);
            v.addEventListener('play', function () {
                videos.forEach(function (other) { if (other !== v) other.pause(); });
            });
        });
    }

    /* ---- event status ---- */
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    document.querySelectorAll('.event[data-end]').forEach(function (ev) {
        var chip = ev.querySelector('.status');
        if (!chip) return;
        var end = new Date(ev.getAttribute('data-end') + 'T23:59:59');
        if (end < today) {
            chip.textContent = 'Completed';
            chip.classList.add('is-past');
        } else {
            chip.textContent = 'Upcoming';
        }
    });

    /* ---- forms ---- */
    document.querySelectorAll('form[data-mailto]').forEach(function (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (!form.reportValidity()) return;

            var data = new FormData(form);
            var lines = [];
            data.forEach(function (value, key) {
                var field = form.querySelector('[name="' + key + '"]');
                var label = field && field.labels && field.labels[0] ? field.labels[0].textContent : key;
                if (field && field.tagName === 'SELECT') value = field.options[field.selectedIndex].text;
                lines.push(label.replace(/\s*\*$/, '') + ': ' + value);
            });

            var subject = form.getAttribute('data-subject') || 'HAU Taekwondo inquiry';
            var name = data.get('name');
            if (name) subject += " - " + name;

            window.location.href = 'mailto:' + CONTACT_EMAIL +
                '?subject=' + encodeURIComponent(subject) +
                '&body=' + encodeURIComponent(lines.join('\n'));

            var msg = form.querySelector('.form-msg');
            if (msg) msg.textContent = 'Opening your email app… if nothing happens, email us at ' + CONTACT_EMAIL + '.';
        });
    });

    /* ---- footer year ---- */
    document.querySelectorAll('[data-year]').forEach(function (el) {
        el.textContent = new Date().getFullYear();
    });
})();
