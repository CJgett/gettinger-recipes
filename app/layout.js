// These styles apply to every route in the application
import './styles/reset.css'
import './styles/styles.css'
import MainMenu from './components/navigation/MainMenu'
import Footer from './components/navigation/Footer'
import localFont from 'next/font/local'
import { AuthProvider } from './components/AuthProvider'
import LoadingBar from './components/LoadingBar'

export const metadata = {
  title: 'Gettinger Recipes',
  description: 'Discover delicious family recipes on Gettinger Recipes. Perfect for food lovers, our site features curated recipes from our family. Join us and enjoy cooking flavorful meals without needing professional skills.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  }
}

const Dongle = localFont ({
  src: [
    {
      path: '../assets/fonts/Dongle/Dongle-Regular.woff2',
      weight: 'normal',
      style: 'normal',
      preload: true,
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
  preload: false,
  display: 'swap',
  variable: '--font-dongle',
})

const NanumGothic = localFont({
  src: [
    {
      path: '../assets/fonts/Nanum_Gothic/NanumGothic-Regular.woff2',
      weight: 'normal',
      style: 'normal',
      preload: true,
    },
    {
      path: '../assets/fonts/Nanum_Gothic/NanumGothic-Bold.woff2',
      weight: 'bold',
      style: 'normal',
      preload: false,
    },
  ],
  preload: false,
  display: 'swap',
  variable: '--font-nanumgothic',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${Dongle.variable} ${NanumGothic.variable}`}>
      <head>
        <script 
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') ?? 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.classList.add(theme + '-mode');
              } catch (e) {}
            `
          }}
        />
      </head>
      <body>
        <AuthProvider>
          <LoadingBar />
          <MainMenu />
          {children}
          <Footer /> 
        </AuthProvider>
      </body>
    </html>
  )
}
