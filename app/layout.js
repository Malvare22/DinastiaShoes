import { Inter } from 'next/font/google'
import './globals.css'
import { Footer } from './components/footer'
import Template from './components/template'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Dinastía Shoes',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  
  return (
    <html lang="en"> 
      <body className={"inter.className bg-white"}>
            <Template>{children}</Template>
        <footer>
          <Footer></Footer>
        </footer>
      </body>
    </html>
  )
}


