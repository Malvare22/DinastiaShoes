import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/navbar'
import { Footer } from './components/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Dinastía Shoes',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en"> 
      <body className={"inter.className bg-white"}>
        <header>
          <Navbar mode="Unlogged" type="Client"></Navbar>
        </header>
          {children}
        <footer>
          <Footer></Footer>
        </footer>
      </body>
    </html>
  )
}
