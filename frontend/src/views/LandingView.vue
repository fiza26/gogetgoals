<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const isLoggedIn = computed(() => !!authStore.userSession)

const startJourney = () => {
    if (isLoggedIn.value) {
        router.push({ name: 'home' })
    } else {
        router.push({ name: 'login' })
    }
}

const features = [
    {
        icon: 'fa-wand-magic-sparkles',
        title: 'Gemini AI Coaching',
        desc: 'Get real-time feedback on your daily logs. Our AI identifies patterns and suggests improvements.'
    },
    {
        icon: 'fa-chart-pie',
        title: 'Visual Analytics',
        desc: 'Track your consistency with beautiful, glass-styled charts and progress rings.'
    },
    {
        icon: 'fa-layer-group',
        title: 'Milestone Tracking',
        desc: 'Break large dreams into manageable daily actions. Small wins lead to big results.'
    }
]
</script>

<template>
    <div class="landing-wrapper">
        <div class="bg-shapes" aria-hidden="true">
            <div class="blob-1"></div>
            <div class="blob-2"></div>
            <div class="blob-3"></div>
        </div>

        <nav class="nav">
            <div class="container-nav">
                <div class="logo" @click="router.push('/')">
                    <div class="logo-box"><i class="fa-solid fa-fire-pulse"></i></div>
                    <span>GoGetGoals</span>
                </div>

                <div class="nav-links">
                    <button type="button" class="login-link" @click="router.push({ name: 'login' })">
                        {{ isLoggedIn ? 'Dashboard' : 'Sign In' }}
                    </button>
                    <button type="button" class="cta-mini" @click="startJourney">
                        {{ isLoggedIn ? 'Open App' : 'Join Free' }}
                    </button>
                </div>
            </div>
        </nav>

        <header class="hero">
            <div class="container-centered hero-grid">
                <div class="hero-content">
                    <div class="pill-label">
                        <span class="pulse"></span>
                        Advanced Goal Tracking Powered by Gemini AI
                    </div>
                    <h1>Turn Your <span class="text-gradient">Ambition</span> Into Daily Action</h1>
                    <p class="hero-subtext">
                        The intelligent workspace that coaches you through your journey.
                        Stop dreaming, start logging, and let AI optimize your path to success.
                    </p>
                    <div class="hero-actions">
                        <button class="btn-primary" @click="startJourney">
                            Start Your Journey <i class="fa-solid fa-arrow-right"></i>
                        </button>
                        <div class="social-proof">
                            <div class="avatars-group">
                                <div class="mini-avatar" style="background-color: #3b82f6;"></div>
                                <div class="mini-avatar" style="background-color: #10b981;"></div>
                                <div class="mini-avatar" style="background-color: #f59e0b;"></div>
                            </div>
                            <span>Joined by 2,000+ achievers</span>
                        </div>
                    </div>
                </div>

                <div class="hero-visual">
                    <div class="visual-stack">
                        <div class="glass-card user-log-card">
                            <div class="log-header">
                                <span class="log-tag">Today's Log</span>
                                <span class="log-time">9:41 AM</span>
                            </div>
                            <p class="log-content">"Completed 5km run and finished the project proposal. Feeling
                                productive but slightly drained."</p>
                            <div class="log-meta">
                                <div class="stat"><i class="fa-solid fa-bolt"></i> +12 XP</div>
                                <!-- <div class="stat"><i class="fa-solid fa-fire"></i> 5 Day Streak</div> -->
                            </div>
                        </div>

                        <div class="glass-card ai-analysis-card">
                            <div class="ai-header">
                                <div class="ai-badge">
                                    <i class="fa-solid fa-sparkles"></i>
                                    Gemini AI
                                </div>
                                <div class="typing-indicator"><span></span><span></span><span></span></div>
                            </div>
                            <div class="ai-response">
                                <strong>Great momentum!</strong> Your Project Vision is 85% complete. I noticed your
                                energy dips after big logs—try a 10min break before your next task to sustain this
                                streak.
                            </div>
                        </div>

                        <div class="glass-card floating-progress">
                            <div class="progress-info">
                                <span class="text-xs text-muted">Weekly Goal</span><br>
                                <span class="text-bold">88%</span>
                            </div>
                            <div class="progress-circle-mock"></div>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <section class="features">
            <div class="container-centered">
                <div class="section-header">
                    <span class="sub-heading">Capabilities</span>
                    <h2>Designed for High Performance</h2>
                </div>
                <div class="feature-grid">
                    <div v-for="feature in features" :key="feature.title" class="feature-card">
                        <div class="feature-icon">
                            <i :class="'fa-solid ' + feature.icon"></i>
                        </div>
                        <h3>{{ feature.title }}</h3>
                        <p>{{ feature.desc }}</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="process">
            <div class="container-centered">
                <div class="glass-card process-wrapper">
                    <div class="process-step">
                        <div class="step-icon">01</div>
                        <h4>Input Vision</h4>
                        <p>Tell Gemini your long-term dreams.</p>
                    </div>
                    <div class="process-divider"></div>
                    <div class="process-step">
                        <div class="step-icon">02</div>
                        <h4>Log Daily</h4>
                        <p>Spend 1 minute reflecting on your day.</p>
                    </div>
                    <div class="process-divider"></div>
                    <div class="process-step">
                        <div class="step-icon">03</div>
                        <h4>Get Insights</h4>
                        <p>Receive tailored coaching instantly.</p>
                    </div>
                </div>
            </div>
        </section>

        <footer class="footer">
            <div class="container-centered">
                <h2>Ready to change your life?</h2>
                <button class="btn-primary" @click="startJourney">Create Account</button>
                <div class="footer-bottom">
                    <p>&copy; 2026 GoGetGoals. Built for high achievers.</p>
                </div>
            </div>
        </footer>
    </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

.landing-wrapper {
    --primary: #0ea5e9;
    --primary-glow: rgba(14, 165, 233, 0.3);
    --secondary: #10b981;
    --dark: #0f172a;
    --text-main: #1e293b;
    --text-muted: #64748b;
    --glass-bg: rgba(255, 255, 255, 0.7);
    --glass-border: rgba(255, 255, 255, 0.5);
    --card-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.15);

    font-family: 'Plus Jakarta Sans', sans-serif;
    background-color: #f8fafc;
    color: var(--text-main);
    line-height: 1.6;
    overflow-x: hidden;
}

.container-centered {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
}

/* --- BACKGROUND --- */
.bg-shapes {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    overflow: hidden;
    pointer-events: none;
}

.blob-1,
.blob-2,
.blob-3 {
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    opacity: 0.15;
}

.blob-1 {
    width: 500px;
    height: 500px;
    background: var(--primary);
    top: -100px;
    right: -100px;
}

.blob-2 {
    width: 400px;
    height: 400px;
    background: var(--secondary);
    bottom: 10%;
    left: -100px;
}

.blob-3 {
    width: 300px;
    height: 300px;
    background: #8b5cf6;
    top: 40%;
    right: 20%;
}

/* --- NAV --- */
.nav {
    position: fixed;
    top: 0;
    width: 100%;
    height: 80px;
    z-index: 1000;
    background: rgba(248, 250, 252, 0.8);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(15, 23, 42, 0.05);
}

.container-nav {
    max-width: 1200px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
}

.logo {
    display: flex;
    align-items: center;
    gap: 12px;
    font-weight: 800;
    font-size: 1.25rem;
    cursor: pointer;
}

.logo-box {
    // background: var(--dark);
    color: var(--secondary);
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: grid;
    place-items: center;
}

.nav-links {
    display: flex;
    align-items: center;
    gap: 24px;
}

.login-link {
    background: none;
    border: none;
    font-weight: 600;
    color: var(--text-main);
    cursor: pointer;
}

.cta-mini {
    background: var(--dark);
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 12px;
    font-weight: 700;
    cursor: pointer;
}

/* --- HERO --- */
.hero {
    padding: 160px 0 100px;
    position: relative;
    z-index: 1;
}

.hero-grid {
    display: grid;
    grid-template-columns: 1fr 1.1fr;
    align-items: center;
    gap: 60px;
}

.pill-label {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: white;
    padding: 8px 16px;
    border-radius: 100px;
    font-size: 0.85rem;
    font-weight: 700;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
    margin-bottom: 32px;
}

.pulse {
    width: 8px;
    height: 8px;
    background: var(--secondary);
    border-radius: 50%;
    animation: pulse-animation 2s infinite;
}

h1 {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 24px;
    letter-spacing: -0.02em;
}

.text-gradient {
    background: linear-gradient(to right, var(--primary), var(--secondary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.hero-subtext {
    font-size: 1.2rem;
    color: var(--text-muted);
    margin-bottom: 40px;
    max-width: 520px;
}

.btn-primary {
    background: var(--dark);
    color: white;
    border: none;
    padding: 18px 36px;
    border-radius: 16px;
    font-weight: 700;
    font-size: 1.1rem;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 12px;
    transition: 0.3s;
}

.btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px var(--primary-glow);
}

.social-proof {
    margin-top: 32px;
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 0.9rem;
    color: var(--text-muted);
}

.avatars-group {
    display: flex;
}

.mini-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 2px solid white;
    margin-left: -8px;
}

/* --- HERO VISUAL (NEW STACK) --- */
.hero-visual {
    position: relative;
    perspective: 1000px;
}

.visual-stack {
    position: relative;
    height: 450px;
}

.glass-card {
    background: var(--glass-bg);
    backdrop-filter: blur(16px);
    border: 1px solid var(--glass-border);
    border-radius: 20px;
    box-shadow: var(--card-shadow);
}

/* Card 1: User Log */
.user-log-card {
    position: absolute;
    top: 0;
    left: 0;
    width: 85%;
    padding: 24px;
    z-index: 2;
    transform: rotateX(5deg) rotateY(-5deg);
}

.log-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
}

.log-tag {
    font-size: 0.7rem;
    font-weight: 800;
    text-transform: uppercase;
    color: var(--primary);
    background: rgba(14, 165, 233, 0.1);
    padding: 4px 8px;
    border-radius: 4px;
}

.log-time {
    font-size: 0.75rem;
    color: var(--text-muted);
}

.log-content {
    font-size: 0.95rem;
    font-weight: 500;
    margin-bottom: 16px;
    color: var(--text-main);
}

.log-meta {
    display: flex;
    gap: 16px;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    padding-top: 12px;
}

.stat {
    font-size: 0.8rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 6px;
}

/* Card 2: AI Response */
.ai-analysis-card {
    position: absolute;
    bottom: 40px;
    right: 0;
    width: 80%;
    padding: 24px;
    background: var(--dark);
    color: white;
    z-index: 3;
    transform: translateZ(30px);
}

.ai-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
}

.ai-badge {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.75rem;
    font-weight: 800;
    color: var(--primary);
}

.ai-response {
    font-size: 0.9rem;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.9);
}

.typing-indicator {
    display: flex;
    gap: 4px;
}

.typing-indicator span {
    width: 4px;
    height: 4px;
    background: var(--primary);
    border-radius: 50%;
    animation: blink 1.4s infinite;
}

.typing-indicator span:nth-child(2) {
    animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
    animation-delay: 0.4s;
}

/* Card 3: Floating Progress */
.floating-progress {
    position: absolute;
    top: 10%;
    right: -5%;
    width: 140px;
    padding: 16px;
    z-index: 4;
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: rotate(5deg);
}

.progress-circle-mock {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 6px solid #e2e8f0;
    border-top-color: var(--secondary);
    margin-top: 10px;
}

.text-bold {
    font-weight: 800;
    font-size: 1.1rem;
}

.text-xs {
    font-size: 0.7rem;
}

/* --- OTHER SECTIONS --- */
.features {
    padding: 100px 0;
}

.section-header {
    text-align: center;
    margin-bottom: 64px;
}

.sub-heading {
    color: var(--primary);
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: 0.85rem;
}

.feature-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
}

.feature-card {
    background: white;
    padding: 40px;
    border-radius: 24px;
    border: 1px solid rgba(15, 23, 42, 0.05);
    transition: 0.3s;
}

.feature-card:hover {
    border-color: var(--primary);
    transform: translateY(-10px);
}

.feature-icon {
    font-size: 2rem;
    color: var(--primary);
    margin-bottom: 20px;
}

.process-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 60px;
}

.process-step {
    text-align: center;
    max-width: 200px;
}

.step-icon {
    width: 50px;
    height: 50px;
    background: var(--dark);
    color: white;
    border-radius: 50%;
    display: grid;
    place-items: center;
    margin: 0 auto 20px;
    font-weight: 800;
}

.process-divider {
    height: 2px;
    flex: 1;
    background: #e2e8f0;
    margin: 0 20px;
}

.footer {
    padding: 80px 0 40px;
    text-align: center;
}

.footer h2 {
    font-size: 2.5rem;
    margin-bottom: 30px;
}

.footer-bottom {
    margin-top: 60px;
    padding-top: 30px;
    border-top: 1px solid #e2e8f0;
    color: var(--text-muted);
    font-size: 0.9rem;
}

@keyframes pulse-animation {
    0% {
        box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
    }

    70% {
        box-shadow: 0 0 0 10px rgba(16, 185, 129, 0);
    }

    100% {
        box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
    }
}

@keyframes blink {

    0%,
    100% {
        opacity: 0.3;
    }

    50% {
        opacity: 1;
    }
}

@media (max-width: 1024px) {
    .hero-grid {
        grid-template-columns: 1fr;
        text-align: center;
        gap: 80px;
    }

    .hero-subtext {
        margin: 0 auto 40px;
    }

    .hero-actions {
        justify-content: center;
    }

    .social-proof {
        justify-content: center;
    }

    .visual-stack {
        max-width: 500px;
        margin: 0 auto;
    }
}

@media (max-width: 768px) {
    .feature-grid {
        grid-template-columns: 1fr;
    }

    .process-wrapper {
        flex-direction: column;
        gap: 40px;
    }

    .process-divider {
        display: none;
    }
}
</style>