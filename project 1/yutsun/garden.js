document.addEventListener('DOMContentLoaded', function() {
    const revealElements = document.querySelectorAll('.reveal');
    const bookImage = document.getElementById('bookImage');
    const bookTextBox = document.getElementById('bookTextBox');
    const characterReveal = document.getElementById('characterReveal');
    const cornerCharacter = document.getElementById('cornerCharacter');

    let currentIndex = 0;
    let isRevealing = false;
    let textBoxIsOpen = false;
    let bookRevealed = false;

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

            if (el.classList.contains('book-container')) {
                bookRevealed = true;
            }
        }, 50);
    }

    if (bookImage) {
        bookImage.addEventListener('click', function(e) {
            e.stopPropagation();
            if (bookRevealed && bookTextBox) {
                bookTextBox.classList.add('active');
                textBoxIsOpen = true;
            }
        });
    }

    document.addEventListener('click', function(e) {
        dismissHint();

        // Always let corner character link through
        if (cornerCharacter && cornerCharacter.contains(e.target)) {
            return;
        }

        if (textBoxIsOpen) {
            const textContent = bookTextBox.querySelector('.book-text-content');
            if (textContent && textContent.contains(e.target)) return;

            bookTextBox.classList.remove('active');
            textBoxIsOpen = false;
            cornerCharacter.classList.add('visible');
            return;
        }

        const link = e.target.closest('a');
        if (link && !link.classList.contains('reveal')) return;
        if (link && link.classList.contains('reveal') && link.style.display !== 'none') return;

        if (characterReveal && characterReveal.contains(e.target)) return;

        e.preventDefault();
        revealNext();
    });
});