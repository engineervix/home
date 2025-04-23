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

  // Update badge theme
  updateCarbonBadgeTheme(newTheme === 'dark')
})

// Listen for changes in system preferences
prefersDarkScheme.addEventListener('change', (e) => {
  setTheme(e.matches ? 'dark' : 'light')

  // Update badge theme
  updateCarbonBadgeTheme(e.matches)
})

/* █████████████████████████████████ FOOTER █████████████████████████████████ */

dayjs.extend(relativeTime)

const footer = document.querySelector('footer')
const currentYear = new Date().getFullYear()
const buildDate = dayjs(__BUILD_DATE__)

// Calculate the relative time from the build date
const lastRebuilt = buildDate.fromNow()

const copyrightElement = document.createElement('p')
copyrightElement.innerHTML = `© ${currentYear}, Victor Miti. <span>Last updated ${lastRebuilt}.</span>`
footer.prepend(copyrightElement)

// Update carbon badge theme based on current theme
function updateCarbonBadgeTheme(isDarkTheme) {
  const badge = document.getElementById('wcb')
  if (badge) {
    if (isDarkTheme) {
      badge.classList.add('wcb-d')
    } else {
      badge.classList.remove('wcb-d')
    }
  }
}

// Apply initial theme to carbon badge
updateCarbonBadgeTheme(document.body.className.includes('theme-dark'))
