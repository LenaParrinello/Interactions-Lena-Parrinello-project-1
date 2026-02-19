document.addEventListener('DOMContentLoaded', function() {
    const revealElements = document.querySelectorAll('.reveal');
    const bookImage = document.getElementById('bookImage');
    const bookTextBox = document.getElementById('bookTextBox');
    const characterReveal = document.getElementById('characterReveal');

    let currentIndex = 0;
    let isRevealing = false;
    let textBoxIsOpen = false;

    // Hide all reveal elements except first
    revealElements.forEach((element, index) => {
        if (index > 0) element.style.display = 'none';
    });

    function revealNext() {
        if (isRevealing) return;
        if (currentIndex >= revealElements.length - 1) return;

        isRevealing = true;
        currentIndex++;
        const el = revealElements[currentIndex];
        el.style.display = 'block';
        el.style.opacity = '0';
        setTimeout(() => {
            el.style.transition = 'opacity 0.5s';
            el.style.opacity = '1';
            isRevealing = false;
        }, 50);
    }

    // Book image click — open text box
    if (bookImage) {
        bookImage.addEventListener('click', function(e) {
            e.stopPropagation();
            bookTextBox.classList.add('active');
            textBoxIsOpen = true;
            document.body.classList.add('all-revealed');
        });
    }

    document.addEventListener('click', function(e) {

        // If text box open — close it and show character
        if (textBoxIsOpen) {
            const textContent = bookTextBox.querySelector('.book-text-content');
            if (textContent && textContent.contains(e.target)) return;

            bookTextBox.classList.remove('active');
            textBoxIsOpen = false;

            // Show character reveal
            characterReveal.style.display = 'block';
            characterReveal.style.opacity = '0';
            setTimeout(() => {
                characterReveal.style.transition = 'opacity 0.5s';
                characterReveal.style.opacity = '1';
            }, 50);
            return;
        }

        // Don't advance if clicking inside character reveal
        if (characterReveal && characterReveal.contains(e.target)) return;

        // Don't advance if clicking any link
        if (e.target.closest('a')) return;

        revealNext();
    });
});