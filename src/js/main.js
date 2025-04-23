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

footer.innerHTML = `<p>© ${currentYear}, Victor Miti. <span>Last updated ${lastRebuilt}.</span></p>`

// Add carbon badge
const carbonBadge = document.createElement('div')
carbonBadge.id = 'wcb'
carbonBadge.classList.add('carbonbadge')

footer.appendChild(carbonBadge)

// Load the carbon badge script
const carbonScript = document.createElement('script')
carbonScript.src = 'https://unpkg.com/website-carbon-badges@1.1.3/b.min.js'
carbonScript.defer = true
document.body.appendChild(carbonScript)

// Update carbon badge theme
function updateCarbonBadgeTheme(isDarkTheme) {
  if (isDarkTheme) {
    carbonBadge.classList.add('wcb-d')
  } else {
    carbonBadge.classList.remove('wcb-d')
  }
}

// Apply initial theme
updateCarbonBadgeTheme(document.body.className.includes('theme-dark'))
