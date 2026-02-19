document.addEventListener('DOMContentLoaded', function() {
    console.log('Script started');
    
    const revealElements = document.querySelectorAll('.reveal');
    console.log('Found elements:', revealElements.length);
    
    let currentIndex = 0;

    // Hide all elements except the first one
    revealElements.forEach((element, index) => {
        console.log('Element', index, ':', element.tagName, element.textContent);
        if (index > 0) {
            element.style.display = 'none';
        }
    });

    // Add click listener to the document
    document.addEventListener('click', function(e) {
        console.log('Clicked!', e.target.tagName);
        
        // Don't advance if clicking on the door link or its image
        if (e.target.closest('.door-link')) {
            console.log('Door clicked - checking if revealed');
            const doorLink = e.target.closest('.door-link');
            // Only allow navigation if the door is visible
            if (doorLink.style.display === 'none' || doorLink.style.opacity === '0') {
                e.preventDefault();
                return;
            }
            // If visible, allow the link to work naturally
            return;
        }
        
        // Don't advance if clicking on a link
        if (e.target.tagName === 'A' && e.target.classList.contains('reveal')) {
            console.log('Link clicked - checking if revealed');
            // Only allow link click if it's already visible
            if (e.target.style.display === 'none') {
                e.preventDefault();
                return;
            }
        }

        // Show next element if available
        if (currentIndex < revealElements.length - 1) {
            currentIndex++;
            console.log('Revealing element', currentIndex);
            revealElements[currentIndex].style.display = 'block';
            revealElements[currentIndex].style.opacity = '0';
            
            setTimeout(() => {
                revealElements[currentIndex].style.transition = 'opacity 0.5s';
                revealElements[currentIndex].style.opacity = '1';
            }, 50);
        } else {
            console.log('All revealed');
            document.body.classList.add('all-revealed');
        }
    });
});