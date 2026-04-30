let track = null
track = document.getElementById('track');

if (track) {
    const slides = Array.from(track.children);

    let currentIndex = 0;
    const slideInterval = 8000; // milliseconds

    function moveToNextSlide() {
        currentIndex++; // note: the ++ is +1 

        // loop back to the first slide when the end has been reached
        if (currentIndex >= slides.length) {
            currentIndex = 0;
        }

        // calculate the width of a single slide dynamically so it snaps to each slide perfectly (note: there is about a 1-2px inconsistency with this)
        const slideWidth = slides[0].getBoundingClientRect().width;

        // move the track to the left by the calculated width of the current slide
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    // begin scrollingg
    setInterval(moveToNextSlide, slideInterval);

    // recalculate the slide width when the window is resized
    window.addEventListener('resize', () => {
        const slideWidth = slides[0].getBoundingClientRect().width;
        track.style.transition = 'none'; // briefly disable the animation during resize
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        
        setTimeout(() => {
            track.style.transition = 'transform 0.5s ease-in-out';
        }, 50);
    });
}

//ashton smith 24505