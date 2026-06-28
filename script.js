/* -------------------------------------------------------------
   Valikatti Astrology Landing Page - JavaScript Features
------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    initStarsBackground();
    initNavigation();
    initRasiPalanModal();
    initLoveCalculator();
    initFAQAccordion();
});

/* ==========================================
   1. Canvas Starry Parallax Background
   ========================================== */
function initStarsBackground() {
    const canvas = document.getElementById('stars-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let stars = [];
    const starCount = 100;
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        createStars();
    }
    
    class Star {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.5 + 0.5;
            this.speed = Math.random() * 0.05 + 0.01;
            this.alpha = Math.random();
            this.alphaSpeed = Math.random() * 0.02 + 0.005;
            this.direction = Math.random() > 0.5 ? 1 : -1;
        }
        
        update() {
            this.y += this.speed;
            this.alpha += this.alphaSpeed * this.direction;
            
            if (this.alpha >= 1) {
                this.direction = -1;
            } else if (this.alpha <= 0.2) {
                this.direction = 1;
            }
            
            if (this.y > canvas.height) {
                this.y = 0;
                this.x = Math.random() * canvas.width;
            }
        }
        
        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
            ctx.shadowBlur = this.size * 2;
            ctx.shadowColor = '#fff';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    function createStars() {
        stars = [];
        for (let i = 0; i < starCount; i++) {
            stars.push(new Star());
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Drifting glow nebula spots
        const gradient = ctx.createRadialGradient(
            canvas.width * 0.7, canvas.height * 0.3, 0,
            canvas.width * 0.7, canvas.height * 0.3, canvas.width * 0.4
        );
        gradient.addColorStop(0, 'rgba(139, 92, 246, 0.04)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        stars.forEach(star => {
            star.update();
            star.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();
}

/* ==========================================
   2. Header & Mobile Navigation Drawer
   ========================================== */
function initNavigation() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const drawerLinks = document.querySelectorAll('.mobile-link, .btn-drawer');
    
    if (hamburgerBtn && mobileDrawer) {
        hamburgerBtn.addEventListener('click', () => {
            const isOpen = mobileDrawer.classList.toggle('open');
            hamburgerBtn.classList.toggle('active');
            
            // Toggle hamburger bars animation
            const bars = hamburgerBtn.querySelectorAll('.bar');
            if (isOpen) {
                bars[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
        
        drawerLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileDrawer.classList.remove('open');
                const bars = hamburgerBtn.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            });
        });
    }

    // Scroll Navbar transparency change
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(7, 3, 20, 0.95)';
            header.style.padding = '5px 0';
        } else {
            header.style.background = 'rgba(7, 3, 20, 0.75)';
            header.style.padding = '0';
        }
    });
}

/* ==========================================
   3. Interactive Daily Rasi Palan Modal
   ========================================== */
const rasiData = {
    aries: {
        name: "Mesham (மேஷம் / Aries)",
        desc: "Today brings dynamic solar energy to Aries. Bold action leads to progress in financial planning. A conversation with an elder will provide key career insights. Avoid arguments in the evening.",
        tamilDesc: "இன்று மேஷ ராசிக்காரர்களுக்கு சூரியனின் ஆற்றல் முழுமையாகக் கிடைக்கும். துணிச்சலான முடிவுகள் நிதி முன்னேற்றத்திற்கு வழிவகுக்கும். குடும்ப பெரியவர்களின் ஆலோசனைகள் தொழில் வளர்ச்சிக்கு உதவும். மாலையில் வாக்குவாதங்களைத் தவிர்க்கவும்.",
        ratings: { love: 85, career: 90, wealth: 80, health: 85 }
    },
    taurus: {
        name: "Rishabam (ரிஷபம் / Taurus)",
        desc: "Venus blesses Taurus today with creative solutions. Focus on resolving pending household or property tasks. Financial opportunities from past investments are highly likely.",
        tamilDesc: "இன்று ரிஷப ராசிக்கு சுக்கிரனின் அருள் பூரணமாகக் கிடைக்கும். நிலுவையில் இருந்த குடும்பப் பணிகள் சீராகும். பழைய முதலீடுகள் மூலம் எதிர்பாராத பணவரவு வந்து சேரும். ஆரோக்கியம் திருப்திகரமாக இருக்கும்.",
        ratings: { love: 92, career: 75, wealth: 88, health: 82 }
    },
    gemini: {
        name: "Mithunam (மிதுனம் / Gemini)",
        desc: "Mercury enhances your communication. Business negotiations will turn out highly favorable. A pleasant short travel is predicted. Keep a check on your expenditure.",
        tamilDesc: "புதன் பகவானின் அருள் உங்கள் பேச்சாற்றலை உயர்த்தும். தொழில் பேச்சுவார்த்தைகள் சாதகமாக முடியும். இனிய குறுகிய தூரப் பயணம் அமையும். ஆடம்பரச் செலவுகளைக் கட்டுப்படுத்துவது நல்லது.",
        ratings: { love: 78, career: 92, wealth: 70, health: 80 }
    },
    cancer: {
        name: "Kadagam (கடகம் / Cancer)",
        desc: "Moon brings emotional balance and inner clarity. Excellent day for family harmony. Career efforts will receive praise from superiors. Financial stability remains strong.",
        tamilDesc: "சந்திரனின் அசைவுகள் மன அமைதியையும் தெளிவையும் தரும். குடும்ப உறவுகளுக்கிடையே ஒற்றுமை கூடும். உங்கள் உழைப்பிற்கு மேலதிகாரிகளின் பாராட்டு கிடைக்கும். நிதி நிலைமை சீராக இருக்கும்.",
        ratings: { love: 95, career: 82, wealth: 80, health: 90 }
    },
    leo: {
        name: "Simmam (சிம்மம் / Leo)",
        desc: "Your confidence peaks today. Leadership skills will shine at your workplace. Health is excellent, but make sure to stay hydrated. A great day to express your feelings to your loved ones.",
        tamilDesc: "உங்கள் தன்னம்பிக்கை இன்று உச்சத்தில் இருக்கும். பணியிடத்தில் தலைமைத்துவப் பண்பு வெளிப்படும். ஆரோக்கியம் சீராக இருக்கும். உங்கள் உணர்வுகளை அன்புக்குரியவர்களிடம் வெளிப்படுத்த உகந்த நாள்.",
        ratings: { love: 88, career: 95, wealth: 85, health: 92 }
    },
    virgo: {
        name: "Kanni (கன்னி / Virgo)",
        desc: "An analytical mind helps solve a complex project query. Practical thinking yields career growth. Make sure to meditate or walk to reduce mental fatigue. Focus on savings.",
        tamilDesc: "பகுத்தறியும் திறனால் சிக்கலான பிரச்சனைகளுக்குத் தீர்வு காண்பீர்கள். யதார்த்தமான சிந்தனைகள் முன்னேற்றத்தைத் தரும். மன அழுத்தத்தைக் குறைக்க தியானம் செய்வது நல்லது. சேமிப்பில் கவனம் செலுத்தவும்.",
        ratings: { love: 80, career: 88, wealth: 90, health: 78 }
    },
    libra: {
        name: "Thulaam (துலாம் / Libra)",
        desc: "Harmonious planetary transits promise romantic bliss. Partnerships will succeed. Avoid taking speculative financial risks. Maintain physical exercise routine.",
        tamilDesc: "கிரகங்களின் சாதகமான நிலையால் காதல் உறவுகளில் மகிழ்ச்சி பெருகும். கூட்டுத் தொழில் முயற்சிகள் வெற்றியைத் தரும். புதிய முதலீடுகளில் கூடுதல் கவனம் தேவை. உடற்பயிற்சிகளைத் தவிர்க்க வேண்டாம்.",
        ratings: { love: 96, career: 80, wealth: 75, health: 85 }
    },
    scorpio: {
        name: "Viruchigam (விருச்சிகம் / Scorpio)",
        desc: "Mars infuses deep focus and energy. You will tackle challenges efficiently. Career transitions are favored. Spend quality evening time with family members.",
        tamilDesc: "செவ்வாய் பகவான் உங்களுக்கு அதீத ஆற்றலையும் கவனத்தையும் வழங்குவார். சவால்களை எளிதாக முறியடிப்பீர்கள். வேலை மாற்றம் சாதகமாக அமையும். மாலையில் குடும்பத்துடன் மகிழ்ச்சியாக நேரத்தைக் கழிக்கவும்.",
        ratings: { love: 75, career: 90, wealth: 85, health: 88 }
    },
    sagittarius: {
        name: "Dhanusu (தனுசு / Sagittarius)",
        desc: "Jupiter brings luck and spiritual peace. Financial problems will begin to dissolve. Educational endeavors show grand success. Good news from close relatives is expected.",
        tamilDesc: "குரு பகவானின் பார்வையால் அதிர்ஷ்டமும் மன அமைதியும் கிட்டும். பொருளாதார நெருக்கடிகள் விலகத் தொடங்கும். மாணவர்களுக்கு கல்வியில் நல்ல முன்னேற்றம் ஏற்படும். சுற்றத்தாரிடமிருந்து நற்செய்தி வரும்.",
        ratings: { love: 84, career: 88, wealth: 92, health: 85 }
    },
    capricorn: {
        name: "Magaram (மகரம் / Capricorn)",
        desc: "Saturn demands disciplined actions. Hard work will pay off, but benefits might show slowly. Avoid long-distance driving. Keep communication transparent at home.",
        tamilDesc: "சனி பகவான் உங்களை ஒழுக்கத்துடன் செயல்பட வைப்பார். கடின உழைப்பு நல்ல பலனைத் தரும். நீண்ட தூரப் பயணங்களைத் தவிர்ப்பது நல்லது. குடும்பத்தாரிடம் வெளிப்படையாகப் பேசுங்கள்.",
        ratings: { love: 82, career: 85, wealth: 78, health: 80 }
    },
    aquarius: {
        name: "Kumbam (கும்பம் / Aquarius)",
        desc: "Innovative ideas lead to business expansion. A favorable day for collaborations. Health shows major improvement. Reconnect with a long-lost friend.",
        tamilDesc: "புதிய சிந்தனைகள் தொழில் வளர்ச்சிக்கு உறுதுணையாக இருக்கும். கூட்டாளிகள் மூலம் லாபம் கிட்டும். உடல்நிலை நன்றாக மேம்படும். நீண்ட நாள் நண்பர் ஒருவரைச் சந்தித்து மகிழ்வீர்கள்.",
        ratings: { love: 90, career: 91, wealth: 84, health: 86 }
    },
    pisces: {
        name: "Meenam (மீனம் / Pisces)",
        desc: "Intuitive guidance leads to correct personal choices. Financial gains through sudden opportunities are expected. Ensure proper sleep and stay relaxed.",
        tamilDesc: "மனதின் உள்ளுணர்வு இன்று சரியான பாதையைக் காட்டும். திடீர் யோகங்கள் மூலம் பணவரவு உண்டாகலாம். போதுமான தூக்கமும் ஓய்வும் இன்று அவசியமாகும்.",
        ratings: { love: 88, career: 82, wealth: 95, health: 80 }
    }
};

function initRasiPalanModal() {
    const modal = document.getElementById('prediction-modal');
    const closeBtn = document.getElementById('modal-close-btn');
    const zodiacCards = document.querySelectorAll('.zodiac-card');
    
    const rasiTitle = document.getElementById('modal-rasi-title');
    const predictionDesc = document.getElementById('prediction-desc');
    const loveVal = document.getElementById('love-rating-val');
    const careerVal = document.getElementById('career-rating-val');
    const financeVal = document.getElementById('finance-rating-val');
    const healthVal = document.getElementById('health-rating-val');
    
    const loveBar = document.getElementById('love-rating-bar');
    const careerBar = document.getElementById('career-rating-bar');
    const financeBar = document.getElementById('finance-rating-bar');
    const healthBar = document.getElementById('health-rating-bar');
    
    if (!modal) return;
    
    function openModal(rasiKey) {
        const data = rasiData[rasiKey];
        if (!data) return;
        
        rasiTitle.textContent = data.name;
        
        // Bilingual description layout
        predictionDesc.innerHTML = `
            <strong>English:</strong> ${data.desc}<br><br>
            <strong>தமிழ்:</strong> ${data.tamilDesc}
        `;
        
        loveVal.textContent = `${data.ratings.love}%`;
        careerVal.textContent = `${data.ratings.career}%`;
        financeVal.textContent = `${data.ratings.wealth}%`;
        healthVal.textContent = `${data.ratings.health}%`;
        
        // Reset bar widths to trigger transition animation
        loveBar.style.width = '0%';
        careerBar.style.width = '0%';
        financeBar.style.width = '0%';
        healthBar.style.width = '0%';
        
        modal.classList.add('open');
        
        // Timeout to animate width bars
        setTimeout(() => {
            loveBar.style.width = `${data.ratings.love}%`;
            careerBar.style.width = `${data.ratings.career}%`;
            financeBar.style.width = `${data.ratings.wealth}%`;
            healthBar.style.width = `${data.ratings.health}%`;
        }, 100);
    }
    
    function closeModal() {
        modal.classList.remove('open');
    }
    
    zodiacCards.forEach(card => {
        card.addEventListener('click', () => {
            const rasiKey = card.getAttribute('data-rasi');
            openModal(rasiKey);
        });
    });
    
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Esc Key closes modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

/* ==========================================
   4. Love Match Compatibility Calculator
   ========================================== */
const rasiElements = {
    aries: 'fire', taurus: 'earth', gemini: 'air', cancer: 'water',
    leo: 'fire', virgo: 'earth', libra: 'air', scorpio: 'water',
    sagittarius: 'fire', capricorn: 'earth', aquarius: 'air', pisces: 'water'
};

const compatibilityDatabase = {
    'fire-fire': {
        score: 88,
        title: "Dynamic & Passionate!",
        desc: "Two fire signs spark intense warmth, mutual ambition, and adventurous bonding. It's high-energy, but remember to cool down during arguments."
    },
    'fire-air': {
        score: 95,
        title: "Perfect Celestial Alignment!",
        desc: "Air feeds Fire, keeping the excitement alive. Highly intellectual conversations, shared ideals, and endless joy define this relationship."
    },
    'fire-earth': {
        score: 65,
        title: "Practical Meets Passion!",
        desc: "Earth provides stability and grounds the fiery spirit, while Fire infuses enthusiasm. Needs conscious efforts to balance spontaneity with routine."
    },
    'fire-water': {
        score: 48,
        title: "Steam & Volatility!",
        desc: "An intense connection that can either produce calming steam or put out each other's energy. High adjustment and open communication are required."
    },
    'earth-earth': {
        score: 90,
        title: "Rock Solid Stability!",
        desc: "A matching of absolute safety, dependability, and shared long-term values. Extremely stable relationship, though caution is advised against monotony."
    },
    'earth-air': {
        score: 55,
        title: "Structured Intellect!",
        desc: "Air is abstract and loves freedom, whereas Earth values structural discipline. Respecting differences in how you approach challenges will make it work."
    },
    'earth-water': {
        score: 89,
        title: "Deeply Nurturing!",
        desc: "Water nourishes Earth, leading to organic growth and profound emotional compatibility. A beautiful and resilient match built on care."
    },
    'air-air': {
        score: 85,
        title: "Intellectual Soulmates!",
        desc: "Brimming with discussions, social adventures, and freedom. A mental connection like no other, but needs solid grounding in daily practical matters."
    },
    'air-water': {
        score: 60,
        title: "Waves of Thoughts!",
        desc: "Air's intellect meets Water's deep waves of emotions. Communication is crucial to prevent Air from detaching or Water from feeling overwhelmed."
    },
    'water-water': {
        score: 92,
        title: "Telepathic Chemistry!",
        desc: "Unbelievable emotional depth and intuitive understanding of each other's feelings. Feels like a fairy tale romance, though maintaining boundaries is key."
    }
};

function initLoveCalculator() {
    const btnCalculate = document.getElementById('btn-calculate-compat');
    const placeholder = document.getElementById('compat-placeholder');
    const resultBox = document.getElementById('compat-actual-result');
    const circleFg = document.getElementById('compat-circle-fg');
    const pctText = document.getElementById('compat-pct-text');
    const verdictTitle = document.getElementById('compat-verdict-title');
    const verdictDesc = document.getElementById('compat-verdict-desc');
    
    if (!btnCalculate) return;
    
    btnCalculate.addEventListener('click', () => {
        const userRasi = document.getElementById('user-rasi').value;
        const partnerRasi = document.getElementById('partner-rasi').value;
        
        const elem1 = rasiElements[userRasi];
        const elem2 = rasiElements[partnerRasi];
        
        // Form key (alphabetically sorted elements to match DB)
        const elementKey = [elem1, elem2].sort().join('-');
        const result = compatibilityDatabase[elementKey] || { score: 70, title: "Favorable Alignment", desc: "A positive planetary combination that offers a balanced growth pattern." };
        
        // Hide placeholder and show actual results
        placeholder.classList.add('hidden');
        resultBox.classList.remove('hidden');
        
        // Reset stroke-dashoffset to animate it in
        const dashOffsetMax = 440; // 2 * PI * r (r=70) => approx 440
        circleFg.style.strokeDashoffset = dashOffsetMax;
        pctText.textContent = '0%';
        
        // Trigger reflow to restart transition
        circleFg.getBoundingClientRect();
        
        // Compute new offset
        const targetOffset = dashOffsetMax - (dashOffsetMax * result.score) / 100;
        circleFg.style.strokeDashoffset = targetOffset;
        
        // Count up percentage text
        let count = 0;
        const duration = 1200; // ms
        const increment = result.score / (duration / 16); // ~60fps
        
        const counterInterval = setInterval(() => {
            count += increment;
            if (count >= result.score) {
                pctText.textContent = `${result.score}%`;
                clearInterval(counterInterval);
            } else {
                pctText.textContent = `${Math.floor(count)}%`;
            }
        }, 16);
        
        // Set texts
        verdictTitle.textContent = result.title;
        verdictDesc.textContent = result.desc;
    });
}

/* ==========================================
   5. FAQ Accordion Dropdown
   ========================================== */
function initFAQAccordion() {
    const faqTriggers = document.querySelectorAll('.faq-trigger');
    
    faqTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const currentItem = trigger.parentElement;
            const isActive = currentItem.classList.contains('active');
            
            // Close all items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Toggle current
            if (!isActive) {
                currentItem.classList.add('active');
            }
        });
    });
}
