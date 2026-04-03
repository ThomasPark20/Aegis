<script setup>
import { ref, onMounted, onUnmounted, nextTick, computed } from 'vue'

// ── Chat simulation ──
const messages = [
  { sender: 'user', name: 'Thomas Park', text: 'Research Scattered Spider\'s latest campaign' },
  { sender: 'bot', name: 'AEGIS', text: 'On it — spinning up a research thread.', delay: 800 },
  { sender: 'system', text: 'Thread created: Research: Scattered Spider', delay: 600 },
  { sender: 'bot', name: 'AEGIS', text: 'Searching primary sources...', thread: true, delay: 1000 },
  { sender: 'step', text: 'Web search — CrowdStrike, CISA, Microsoft reports', delay: 700 },
  { sender: 'step', text: 'Following links to IOC repos and PDFs', delay: 600 },
  { sender: 'step', text: 'Extracting IOCs — 12 IPs, 8 domains, 3 hashes', delay: 700 },
  { sender: 'step', text: 'Mapping TTPs to MITRE ATT&CK', delay: 500 },
  { sender: 'step', text: 'Generating Sigma rules — validating with sigma-cli', delay: 800 },
  { sender: 'step', text: 'Generating YARA rules — validating with yarac', delay: 600 },
  { sender: 'step', text: 'Generating Snort rules — validating with snort', delay: 600 },
  { sender: 'step', text: 'Compiling topic summary with sources', delay: 500 },
  { sender: 'bot', name: 'AEGIS', text: 'Report ready.', thread: true, delay: 400, file: 'scattered-spider-2026-04-03.md' },
  { sender: 'user', name: 'Thomas Park', text: 'Are any of them on FBI most wanted?', thread: true, delay: 1500 },
  { sender: 'bot', name: 'Chat Agent', text: 'Good question — yes, several members have been indicted by the DOJ. Added to research requirements so the report covers this.', thread: true, delay: 600 },
  { sender: 'user', name: 'Thomas Park', text: 'Also focus on their SIM swapping TTPs', thread: true, delay: 1200 },
  { sender: 'bot', name: 'Chat Agent', text: 'Added to requirements: focus analysis on SIM swapping techniques and related TTPs.', thread: true, delay: 600 },
  { sender: 'system', text: 'requirements.md updated — 2 items pending', delay: 500 },
  { sender: 'bot', name: 'AEGIS', text: 'Updated report with FBI indictments and SIM swapping analysis. All requirements satisfied.', thread: true, delay: 1200, file: 'scattered-spider-2026-04-03-v2.md' },
]

const visibleMessages = ref([])
const isTyping = ref(false)
const typingName = ref('')
const currentThread = ref(false)
const chatEl = ref(null)
let timeoutId = null
let currentIndex = 0
let chatStarted = false

function scrollChat() {
  nextTick(() => {
    if (chatEl.value) {
      chatEl.value.scrollTo({ top: chatEl.value.scrollHeight, behavior: 'smooth' })
    }
  })
}

function showNext() {
  if (currentIndex >= messages.length) return

  const msg = messages[currentIndex]
  const delay = msg.delay || 800

  if (msg.sender === 'bot' || (msg.sender === 'user' && currentIndex > 0)) {
    isTyping.value = true
    typingName.value = msg.name
    scrollChat()
    timeoutId = setTimeout(() => {
      isTyping.value = false
      if (msg.thread) currentThread.value = true
      visibleMessages.value.push({ ...msg, id: currentIndex })
      currentIndex++
      scrollChat()
      timeoutId = setTimeout(showNext, 300)
    }, delay)
  } else {
    visibleMessages.value.push({ ...msg, id: currentIndex })
    currentIndex++
    scrollChat()
    timeoutId = setTimeout(showNext, delay)
  }
}

// ── Scroll-driven sections ──
const sections = [
  {
    id: 'research',
    title: 'Research on Demand',
    text: 'Ask AEGIS to research any threat. It creates a Discord thread, runs a full investigation pipeline — primary sources, IOC extraction, TTP mapping — and delivers a structured report with validated detection rules.',
  },
  {
    id: 'dual-agent',
    title: 'Dual-Agent Threads',
    text: 'Each research thread runs two agents: a fast chat agent for instant Q&A, and a deep research agent working in the background. Send follow-ups and get immediate responses while research continues.',
  },
  {
    id: 'requirements',
    title: 'Requirements Contract',
    text: 'Follow-up messages become mandatory requirements. The research agent checks every item in requirements.md before delivering — it\'s a contract, not a suggestion. The report won\'t ship until all requirements are satisfied.',
  },
  {
    id: 'detection',
    title: 'Validated Detection Rules',
    text: 'Sigma, YARA, and Snort rules generated and validated with real CLI tools. Failed rules retry 3 times. Nothing is silently dropped — unvalidated rules are clearly marked.',
  },
  {
    id: 'monitoring',
    title: 'Automated Monitoring',
    text: 'RSS feeds scanned every 2 hours. Critical items — APTs, zero-days, CVEs, ransomware — get their own research thread automatically. Daily briefings compile everything into an executive summary.',
  },
]

const visibleSections = ref(new Set())
const heroVisible = ref(true)
const demoVisible = ref(false)
const getRunningVisible = ref(false)

function onScroll() {
  // Check each section
  document.querySelectorAll('.scroll-section').forEach((el) => {
    const rect = el.getBoundingClientRect()
    const id = el.dataset.id
    if (rect.top < window.innerHeight * 0.75 && rect.bottom > 0) {
      visibleSections.value.add(id)
    }
  })

  // Start chat when demo section is visible
  const demoEl = document.querySelector('.demo-section')
  if (demoEl) {
    const rect = demoEl.getBoundingClientRect()
    demoVisible.value = rect.top < window.innerHeight * 0.8 && rect.bottom > window.innerHeight * 0.2
    if (demoVisible.value && !chatStarted) {
      chatStarted = true
      timeoutId = setTimeout(showNext, 600)
    }
  }

  // Get Running section visibility
  const grEl = document.querySelector('.getrunning-section')
  if (grEl) {
    const rect = grEl.getBoundingClientRect()
    getRunningVisible.value = rect.top < window.innerHeight * 0.7
  }

  // Hero parallax
  const scrollY = window.scrollY
  heroVisible.value = scrollY < window.innerHeight * 0.6
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  if (timeoutId) clearTimeout(timeoutId)
})
</script>

<template>
  <div class="landing">
    <!-- HERO: full viewport -->
    <section class="hero-section">
      <div class="hero-content" :class="{ 'hero-faded': !heroVisible }">
        <h1 class="hero-name">AEGIS</h1>
        <p class="hero-text">Autonomous Threat Intelligence</p>
        <p class="hero-tagline">Research threats, generate detection rules, deliver reports — all through Discord or Telegram.</p>
        <div class="hero-actions">
          <a href="/Aegis/guide/getting-started" class="btn btn-primary">Get Started</a>
          <a href="/Aegis/architecture" class="btn btn-secondary">Architecture</a>
        </div>
      </div>
      <div class="scroll-hint" :class="{ 'hint-hidden': !heroVisible }">
        <span>scroll</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 4v12M4 10l6 6 6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </section>

    <!-- DEMO: sticky chat + scrolling explanations -->
    <section class="demo-section">
      <div class="demo-layout">
        <!-- Sticky chat window -->
        <div class="demo-sticky" :class="{ 'demo-sticky-visible': demoVisible }">
          <div class="chat-window">
            <div class="chat-header">
              <div class="chat-dots"><span></span><span></span><span></span></div>
              <div class="chat-title">
                <span v-if="!currentThread"># threat-intel</span>
                <span v-else>🧵 Research: Scattered Spider</span>
              </div>
              <div class="chat-dots" style="visibility: hidden;"><span></span><span></span><span></span></div>
            </div>
            <div ref="chatEl" class="chat-messages">
              <div v-if="!chatStarted && visibleMessages.length === 0" class="chat-placeholder">
                <p>The simulation will start as you scroll...</p>
              </div>
              <TransitionGroup name="msg">
                <div v-for="msg in visibleMessages" :key="msg.id" class="chat-msg">
                  <template v-if="msg.sender === 'system'">
                    <div class="msg-system">{{ msg.text }}</div>
                  </template>
                  <template v-else-if="msg.sender === 'step'">
                    <div class="msg-step"><span class="step-check">✓</span> {{ msg.text }}</div>
                  </template>
                  <template v-else>
                    <div class="msg-sender">
                      <span :class="msg.sender === 'bot' ? 'name-bot' : 'name-user'">{{ msg.name }}</span>
                    </div>
                    <div class="msg-body">{{ msg.text }}</div>
                    <div v-if="msg.file" class="msg-file">📎 {{ msg.file }}</div>
                  </template>
                </div>
              </TransitionGroup>
              <div v-if="isTyping" class="chat-typing">
                <span class="typing-who">{{ typingName }}</span> is typing
                <span class="typing-dots"><span>.</span><span>.</span><span>.</span></span>
              </div>
            </div>
          </div>
        </div>

        <!-- Scrolling explanation cards -->
        <div class="demo-scroll">
          <div
            v-for="section in sections"
            :key="section.id"
            :data-id="section.id"
            class="scroll-section"
            :class="{ 'section-visible': visibleSections.has(section.id) }"
          >
            <h3>{{ section.title }}</h3>
            <p>{{ section.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- GET RUNNING -->
    <section class="getrunning-section" :class="{ 'getrunning-visible': getRunningVisible }">
      <h2>Get Running</h2>
      <div class="code-block">
        <pre><code>git clone https://github.com/ThomasPark20/Aegis.git
cd Aegis
claude
/setup</code></pre>
      </div>
      <p class="getrunning-sub">Setup handles everything: dependencies, Docker, API keys, Discord bot, feed scanning, and daily reports.</p>
      <div class="getrunning-links">
        <a href="https://github.com/ThomasPark20/Aegis" class="btn btn-primary">GitHub</a>
        <a href="/Aegis/guide/getting-started" class="btn btn-secondary">Full Guide</a>
      </div>
    </section>

  </div>
</template>

<style scoped>
.landing {
  font-family: var(--vp-font-family-base);
  color: var(--vp-c-text-1);
}

/* ── Hero ── */
.hero-section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 2rem;
  position: relative;
}

.hero-content {
  transition: opacity 0.5s, transform 0.5s;
}

.hero-faded {
  opacity: 0.3;
  transform: translateY(-20px);
}

.hero-name {
  font-size: clamp(4rem, 12vw, 8rem);
  font-weight: 800;
  letter-spacing: -0.05em;
  line-height: 1;
  margin: 0;
  color: var(--vp-c-text-1);
}

.hero-text {
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  font-weight: 400;
  color: var(--vp-c-text-2);
  margin: 1rem 0 0.5rem;
  letter-spacing: -0.01em;
}

.hero-tagline {
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  color: var(--vp-c-text-3);
  max-width: 480px;
  margin: 0 auto;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 2rem;
}

.btn {
  display: inline-block;
  padding: 0.6rem 1.4rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
}

.btn-primary {
  background: var(--vp-c-text-1);
  color: var(--vp-c-bg);
}

.btn-primary:hover {
  opacity: 0.85;
}

.btn-secondary {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

.btn-secondary:hover {
  border-color: var(--vp-c-text-3);
}

.scroll-hint {
  position: absolute;
  bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: var(--vp-c-text-3);
  font-size: 12px;
  letter-spacing: 0.1em;
  animation: bounce 2s infinite;
  transition: opacity 0.5s;
}

.hint-hidden { opacity: 0; }

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(6px); }
}

/* ── Demo section ── */
.demo-section {
  min-height: auto;
  padding: 4rem 2rem;
}

.demo-layout {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  gap: 4rem;
  align-items: flex-start;
}

.demo-sticky {
  flex: 1;
  position: sticky;
  top: 50vh;
  transform: translateY(-50%);
  min-width: 0;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.demo-sticky.demo-sticky-visible {
  opacity: 1;
}

.demo-scroll {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14rem;
  padding: 40vh 0 0;
  min-width: 0;
}

/* ── Chat window ── */
.chat-window {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  background: var(--vp-c-bg);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
}

.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.chat-dots {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
}

.chat-dots span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--vp-c-divider);
}

.chat-title {
  font-size: 13px;
  font-weight: 600;
  text-align: center;
  color: var(--vp-c-text-1);
}

.chat-messages {
  padding: 20px;
  min-height: 50vh;
  max-height: 50vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.chat-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--vp-c-text-3);
  font-size: 13px;
}

.chat-msg {
  animation: slideUp 0.3s ease-out;
}

.msg-sender { margin-bottom: 2px; }

.name-bot {
  font-size: 13px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.name-user {
  font-size: 13px;
  font-weight: 700;
  color: var(--vp-c-text-2);
}

.msg-body {
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-1);
}

.msg-file {
  margin-top: 6px;
  padding: 8px 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 12px;
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-text-2);
}

.msg-system {
  text-align: center;
  font-size: 12px;
  color: var(--vp-c-text-3);
  padding: 4px 0;
  font-style: italic;
}

.msg-step {
  font-size: 12px;
  color: var(--vp-c-text-2);
  padding-left: 16px;
  line-height: 1.6;
}

.step-check {
  color: #393;
  font-weight: 700;
  margin-right: 4px;
}

.chat-typing {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.typing-who {
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.typing-dots span {
  animation: blink 1.4s infinite;
}
.typing-dots span:nth-child(2) { animation-delay: 0.2s; }
.typing-dots span:nth-child(3) { animation-delay: 0.4s; }

@keyframes blink {
  0%, 60%, 100% { opacity: 0.2; }
  30% { opacity: 1; }
}

/* ── Scroll sections ── */
.scroll-section {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.section-visible {
  opacity: 1;
  transform: translateY(0);
}

.scroll-section h3 {
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 0 0 0.75rem;
  color: var(--vp-c-text-1);
}

.scroll-section p {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--vp-c-text-2);
  margin: 0;
}

/* ── Get Running ── */
.getrunning-section {
  max-width: 580px;
  margin: 0 auto;
  padding: 8rem 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.getrunning-visible {
  opacity: 1;
  transform: translateY(0);
}

.getrunning-section h2 {
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  margin: 0 0 2rem;
}

.code-block {
  text-align: left;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
  margin: 0 0 1.5rem;
}

.code-block pre {
  margin: 0;
}

.code-block code {
  font-family: var(--vp-font-family-mono);
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-1);
  word-break: break-all;
  white-space: pre-wrap;
}

.getrunning-sub {
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 2rem;
}

.getrunning-links {
  display: flex;
  gap: 12px;
  justify-content: center;
}

/* ── Animations ── */
@keyframes slideUp {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.msg-enter-active { transition: all 0.3s ease-out; }
.msg-enter-from { opacity: 0; transform: translateY(8px); }

/* ── Mobile ── */
@media (max-width: 768px) {
  .demo-layout {
    display: block;
    gap: 0;
  }

  .demo-sticky {
    position: sticky;
    top: var(--vp-nav-height, 64px);
    transform: none;
    z-index: 10;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
    border-radius: 0 0 12px 12px;
  }

  .demo-scroll {
    gap: 6rem;
    padding: 2rem 0 8rem;
  }

  .demo-section {
    min-height: auto;
  }

  .chat-messages {
    min-height: 40vh;
    max-height: 40vh;
  }

  .getrunning-section {
    padding: 2rem 1rem;
  }

  .code-block {
    padding: 1rem;
  }

  .code-block code {
    font-size: 12px;
  }

  .getrunning-links {
    flex-direction: column;
    align-items: center;
  }
}
</style>
