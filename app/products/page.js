'use client'

import { useEffect, useState } from "react";
import { getAllProducts } from "../lib/products";
import { CardProduct } from "../components/products/cardProduct";
import { PageTittle } from "../components/text";

export default function Page() {

  const images = [ "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg", "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg", "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg"];

  const [products, setProducts] = useState([]);
  const [actualPage, setActualPage] = useState(1);
  const [total, setTotal] = useState(10);
  const [limit, setLimit] = useState(0);

  useEffect(
    () => {
      const getData = async () => {
        const data = await getAllProducts();
        console.log(data);
        setProducts(data);
        setLimit(Math.ceil(data.length/total));

      };
      
      getData();
      
    }
  ,[]);

  const nextPage = () => {
    if(actualPage<limit){
      setActualPage(actualPage+1);
    }
  };

  const backPage = () => {
    if(actualPage!=1){
      setActualPage(actualPage-1);
    }
  };


  return (
      <div>
        <div className="flex justify-center">
          <PageTittle>Catalogo</PageTittle>
        </div>
        <div className="flex mb-12">
          <div className="w-3/12">
            <div className="h-full bg-grisAzulado mx-3"></div>
          </div>
          <div className="w-full">
            <div className="grid grid-cols-5">
              {products.slice(((actualPage-1)*total),((actualPage)*total)).map(
                (product) => {
                  return <CardProduct key={product.id} img={product.image} price={product.price} title={product.title}></CardProduct>;
                }
              )}
            </div>
            <div className="flex justify-center space-x-4 my-6">
              <PageButton handleButton={backPage}><BacktArrow></BacktArrow></PageButton>
              <PageButton handleButton={nextPage}><NextArrow></NextArrow></PageButton>
            </div>
          </div>
        </div>
      </div>
  )
}

const NextArrow = () => {
  return(
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
</svg>
  );
};

const BacktArrow = () => {
  return(
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
  </svg>
  );
};

const PageButton = ({children, handleButton}) => {
  
  return(
    <button onClick={handleButton} className="p-2 text-xl bg-redWine w-20 flex justify-center items-center">{children}</button>
  );
};
 


