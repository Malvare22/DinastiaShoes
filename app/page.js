import Image from 'next/image'
import Navbar from './components/navbar'
import { Footer } from './components/footer'
import { HomeCardsGroup } from './components/products/homeCard'
import { ImageCarousel } from './components/imageCarousel';

export default function Home() {

  const images = [ "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg", "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg", "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg"];

  return (
      <>
        <header>
        <Navbar mode="Unlogged" type="Client"></Navbar>
        </header>
        <div className='bg-white h-full'>
          <ImageCarousel images={images}></ImageCarousel>
          <h1 className='text-black text-center font-sans text-3xl my-7 font-semibold'>PRODUCTOS DESTACADOS</h1>
          <HomeCardsGroup></HomeCardsGroup>
        </div>
        <footer>
          <Footer></Footer>
        </footer>
      </>
  )
}
 


