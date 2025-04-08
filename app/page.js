import Image from 'next/image'
import Navbar from './components/navbar'
import { Footer } from './components/footer'
import { HomeCardsGroup } from './components/products/homeCard'
import { ImageCarousel, IndexImageCarousel } from './components/imageCarousel';
import { getProductsDestacados } from './lib/products';

export default function Home() {

  const images = [ "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg", "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg", "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg"];

  // const [data, setData] = useState({});


  // useEffect(
  //   () => {
  //     getData();
  //   }, []
  // )

  return (
      <>
        
          {/* <IndexImageCarousel></IndexImageCarousel> */}
          <h1 className='text-black text-center font-sans text-3xl my-7 font-semibold'>PRODUCTOS DESTACADOS</h1>
          {/* <HomeCardsGroup></HomeCardsGroup> */}
        
      </>
  )
}


 


