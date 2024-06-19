// These styles apply to every route in the application
import './styles/reset.css'
import './styles/styles.css'
import MainMenu from './components/MainMenu.jsx'

export const metadata = {
  title: 'A Pinch of 한미',
  description: 'Discover delicious Korean and American vegetarian recipes on A Pinch of 한미. Perfect for food lovers, our site features easy-to-follow recipes and video tutorials straight from our YouTube channel. Join us and enjoy cooking flavorful meals without needing professional skills.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MainMenu /> 
        {children}
      </body>
    </html>
  )
}
