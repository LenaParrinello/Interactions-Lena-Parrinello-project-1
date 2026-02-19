document.addEventListener('DOMContentLoaded', function() {
    const revealElements = document.querySelectorAll('.reveal');
    const bookImage = document.getElementById('bookImage');
    const bookTextBox = document.getElementById('bookTextBox');
    const characterReveal = document.getElementById('characterReveal');
    
    let currentIndex = 0;
    let textBoxIsOpen = false;

    // Hide all except first
    revealElements.forEach((element, index) => {
        if (index > 0) {
            element.style.display = 'none';
        }
    });

    // Book image click - open text box
    if (bookImage) {
        bookImage.addEventListener('click', function(e) {
            e.stopPropagation();
            if (bookTextBox) {
                bookTextBox.classList.add('active');
                textBoxIsOpen = true;
                // Hide "Click to continue" when book opens
                document.body.classList.add('all-revealed');
            }
        });
    }

    // Document click
    document.addEventListener('click', function(e) {
        
        // If text box is open
        if (textBoxIsOpen) {
            // Don't close if clicking inside the text content
            const textContent = bookTextBox.querySelector('.book-text-content');
            if (textContent && textContent.contains(e.target)) {
                return;
            }
            // Close text box and show character
            bookTextBox.classList.remove('active');
            textBoxIsOpen = false;
            if (characterReveal) {
                characterReveal.classList.add('visible');
                // Keep "Click to continue" hidden when moose appears
                document.body.classList.add('all-revealed');
            }
            return;
        }
        
        // Don't advance for character or links
        if (characterReveal && characterReveal.contains(e.target)) {
            return;
        }
        if (e.target.tagName === 'A') {
            return;
        }
        
        // Reveal next element
        if (currentIndex < revealElements.length - 1) {
            currentIndex++;
            revealElements[currentIndex].style.display = 'block';
            revealElements[currentIndex].style.opacity = '0';
            
            setTimeout(() => {
                revealElements[currentIndex].style.transition = 'opacity 0.5s';
                revealElements[currentIndex].style.opacity = '1';
            }, 50);
            
            // Hide "Click to continue" when book appears
            if (revealElements[currentIndex].classList.contains('book-container')) {
                document.body.classList.add('all-revealed');
            }
        } else {
            document.body.classList.add('all-revealed');
        }
    });
});