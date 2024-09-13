import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

/* █████████████████████████████████ THEME TOGGLE █████████████████████████████████ */

const themeToggleBtn = document.getElementById('theme-toggle-btn')
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)')

function setTheme(theme) {
  document.body.className = `theme-${theme}`
  document.documentElement.style.setProperty('--theme', `'${theme}'`)
  localStorage.setItem('theme', theme)
}

// Set initial theme based on user preference or stored value
const storedTheme = localStorage.getItem('theme')
if (storedTheme) {
  setTheme(storedTheme)
} else {
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)')
  setTheme(prefersDarkScheme.matches ? 'dark' : 'light')
}

// Toggle theme on button click
themeToggleBtn.addEventListener('click', () => {
  const currentTheme = document.body.className.includes('theme-dark') ? 'dark' : 'light'
  const newTheme = currentTheme === 'light' ? 'dark' : 'light'
  setTheme(newTheme)
})

// Listen for changes in system preferences
prefersDarkScheme.addEventListener('change', (e) => {
  setTheme(e.matches ? 'dark' : 'light')
})

/* █████████████████████████████████ FOOTER █████████████████████████████████ */

dayjs.extend(relativeTime)

const footer = document.querySelector('footer')
const currentYear = new Date().getFullYear()
const buildDate = dayjs(__BUILD_DATE__)

// Calculate the relative time from the build date
const lastRebuilt = buildDate.fromNow()

footer.innerHTML = `Copyright © ${currentYear} Victor Miti. <span>Last rebuilt ${lastRebuilt}.</span>`

/* █████████████████████████████████ ANALYTICS █████████████████████████████████ */

// Add cloudflare analytics in production
if (import.meta.env.PROD) {
  const script = document.createElement('script')
  script.src = 'https://static.cloudflareinsights.com/beacon.min.js'
  script.defer = true
  script.setAttribute('data-cf-beacon', '{"token": "b30e94dba69e459dbb38b473552b77f3"}')
  document.body.appendChild(script)
}
