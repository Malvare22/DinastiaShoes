import Image from 'next/image'
import Navbar from './components/navbar'
import { Footer } from './components/footer'

export default function Home() {
  return (
      <>
        <Navbar mode="Logged" type="Client"></Navbar>
        <Footer></Footer>
      </>
  )
}
