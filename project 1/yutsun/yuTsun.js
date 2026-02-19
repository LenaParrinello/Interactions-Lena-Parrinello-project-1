document.addEventListener('DOMContentLoaded', function() {
    const revealElements = document.querySelectorAll('.reveal');
    let currentIndex = 0;
    let isRevealing = false;

    // Hide all reveal elements at start
    revealElements.forEach((element) => {
        element.style.display = 'none';
    });

    function dismissHint() {
        const hint = document.getElementById('clickHint');
        if (hint) {
            hint.style.transition = 'opacity 0.5s';
            hint.style.opacity = '0';
            setTimeout(() => hint.remove(), 500);
        }
    }

    function revealNext() {
        if (isRevealing) return;
        if (currentIndex >= revealElements.length) return;

        isRevealing = true;
        const el = revealElements[currentIndex];
        el.style.display = 'block';
        el.style.opacity = '0';
        setTimeout(() => {
            el.style.transition = 'opacity 0.5s';
            el.style.opacity = '1';
            currentIndex++;
            isRevealing = false;
        }, 50);
    }

    document.addEventListener('click', function(e) {
        dismissHint();

        const link = e.target.closest('a');

        // Clicking a non-reveal link (like Character Select) — let it navigate
        if (link && !link.classList.contains('reveal')) {
            return;
        }

        // Clicking a reveal link that is visible — let it navigate
        if (link && link.classList.contains('reveal') && link.style.display !== 'none') {
            return;
        }

        // Everything else: reveal next (including clicks on hidden reveal links/images)
        e.preventDefault();
        revealNext();
    });
});