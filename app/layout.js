// These styles apply to every route in the application
import './styles/reset.css'
import './styles/styles.css'
import MainMenu from './components/navigation/MainMenu'
import Footer from './components/navigation/Footer'
import localFont from 'next/font/local'

export const metadata = {
  title: 'Gettinger Recipes',
  description: 'Discover delicious family recipes on Gettinger Recipes. Perfect for food lovers, our site features curated recipes from our family. Join us and enjoy cooking flavorful meals without needing professional skills.',
}

const Dongle = localFont ({
  src: [
    {
      path: '../assets/fonts/Dongle/Dongle-Regular.woff2',
      weight: 'normal',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Dongle/Dongle-Bold.woff2',
      weight: 'bold',
      style: 'normal',
      preload: false,
    },
    {
      path: '../assets/fonts/Dongle/Dongle-Light.woff2',
      weight: '300',
      style: 'normal',
      preload: false,
    },
  ],
  display: 'swap',
  variable: '--font-dongle',
})

const NanumGothic = localFont({
  src: [
    {
      path: '../assets/fonts/Nanum_Gothic/NanumGothic-Regular.woff2',
      weight: 'normal',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Nanum_Gothic/NanumGothic-Bold.woff2',
      weight: 'bold',
      style: 'normal',
      preload: false,
    },
  ],
  display: 'swap',
  variable: '--font-nanumgothic',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${Dongle.variable} ${NanumGothic.variable}`}>
      <body>
        <MainMenu /> 
        {children}
        <Footer /> 
      </body>
    </html>
  )
}
