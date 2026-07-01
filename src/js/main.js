import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

/* █████████████████████████████████ THEME TOGGLE █████████████████████████████████ */

const themeToggleBtn = document.getElementById('theme-toggle-btn')
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)')
const websiteCarbonBadge = document.getElementById('wcb')

function setTheme(theme) {
  document.body.className = `theme-${theme}`
  document.documentElement.style.setProperty('--theme', `'${theme}'`)
  localStorage.setItem('theme', theme)
  // Keep the Website Carbon badge in sync with the active theme.
  // The `wcb-d` class swaps the badge to its dark variant (see b.min.css).
  if (websiteCarbonBadge) {
    websiteCarbonBadge.classList.toggle('wcb-d', theme === 'dark')
  }
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

// The Website Carbon badge (`#wcb`) already lives in the footer markup.
// Append the copyright + last-updated line after it.
footer.insertAdjacentHTML(
  'beforeend',
  `© ${currentYear}, Victor Miti. <span>Last updated ${lastRebuilt}.</span>`
)
