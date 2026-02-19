document.addEventListener('DOMContentLoaded', function() {
    const revealElements = document.querySelectorAll('.reveal');
    let currentIndex = 0;
    let isRevealing = false;
    let yuTsunShown = false;

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

    function isDoorVisible() {
        const door = document.querySelector('.door-link');
        return door && door.style.display !== 'none' && door.style.display !== '';
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

    function showYuTsun() {
        const characterReveal = document.getElementById('characterReveal');
        if (characterReveal) {
            characterReveal.style.display = 'flex';
            setTimeout(() => {
                characterReveal.classList.add('slide-in');
            }, 20);
        }
    }

    document.addEventListener('click', function(e) {
        dismissHint();

        // Let character reveal links navigate freely
        if (e.target.closest('#characterReveal')) return;

        // Door clicked
        if (e.target.closest('.door-link')) {
            e.preventDefault();

            // Door not visible yet — reveal it instead
            if (!isDoorVisible()) {
                revealNext();
                return;
            }

            // Door visible, Yu Tsun not shown — show him
            if (!yuTsunShown) {
                yuTsunShown = true;
                showYuTsun();
                return;
            }

            // Yu Tsun shown — navigate to apartment
            window.location.href = 'apartment.html';
            return;
        }

        // Let visible non-reveal links navigate
        const link = e.target.closest('a');
        if (link && !link.classList.contains('reveal')) return;
        if (link && link.classList.contains('reveal') && link.style.display !== 'none') return;

        e.preventDefault();
        revealNext();
    });
});