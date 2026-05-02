const canvas = document.getElementById('bgCanvas'); // the canvas
    const ctx = canvas.getContext('2d'); // the context

    let width, height;
    let stars = []; // tablessss
    let meteors = [];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    // --- STAR SETUP ---
    const STAR_COUNT = 200; 
    for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.5,
            alpha: Math.random(), // starting opacity
            fadeRate: (Math.random() * 0.005), // speed of fading
            fadingIn: Math.random() > 0.5 // start by fading in or out
        });
    }

    // --- METEOR SETUP ---
    function spawnMeteor() {
        meteors.push({
            // spawn further right and above to move left-down across screen
            x: Math.random() * width * 1.5, 
            y: -50,
            length: Math.random() * 120 + 40,
            speed: Math.random() * 10,
            thickness: Math.random() * 2 + 1,
            opacity: 1
        });
        // spawn meteor randomly between 0.5 and 2.5 seconds
        setTimeout(spawnMeteor, Math.random() * 2000 + 500);
    }
    // initiate after 1 second
    setTimeout(spawnMeteor, 1000);

    // --- ANIMATION LOOP ---
    function animate() {
        // clear the previous frame
        ctx.clearRect(0, 0, width, height);

        // STAR DRAWING FUnc
        stars.forEach(star => {
            if (star.fadingIn) {
                star.alpha += star.fadeRate;
                if (star.alpha >= 1) star.fadingIn = false;
            } else {
                star.alpha -= star.fadeRate;
                if (star.alpha <= 0) {
                    star.fadingIn = true;
                    // move the star to a new random spot while it's invisible
                    star.x = Math.random() * width;
                    star.y = Math.random() * height;
                }
            }

            // draw the star
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
            ctx.fill();
        });

        // draw and update Meteors
        for (let i = meteors.length - 1; i >= 0; i--) {
            let m = meteors[i];
            
            // move diagonally (down and left)
            m.x -= m.speed; 
            m.y += m.speed; 
            
            // fade out slightly over time (linear)
            m.opacity -= 0.005;

            // remove meteor if it fades out or goes off-screen
            if (m.opacity <= 0 || m.x < -100 || m.y > height + 100) {
                meteors.splice(i, 1);
                continue;
            }

            // draw the meteor with a fading tail
            ctx.beginPath();
            // the gradient makes it look like a glowing tail
            let gradient = ctx.createLinearGradient(m.x, m.y, m.x + m.length, m.y - m.length);
            gradient.addColorStop(0, `rgba(255, 255, 255, ${m.opacity})`);
            gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = m.thickness;
            ctx.lineCap = "round";
            ctx.moveTo(m.x, m.y);
            // trail extends up and to the right behind the meteor's head
            ctx.lineTo(m.x + m.length, m.y - m.length); 
            ctx.stroke();
        }

        requestAnimationFrame(animate);
    }

    animate();

//ashton s. 24505