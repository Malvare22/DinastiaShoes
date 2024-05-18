'use client'

import { useEffect, useRef, useState } from "react";
import { filteredByColorAndTalla, getAllProducts, getAsideInformation, getProductsByCategorie } from "../lib/products";
import { CardProduct } from "../components/products/cardProduct";
import { PageTittle } from "../components/text";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {

  const [products, setProducts] = useState(null);
  const [actualPage, setActualPage] = useState(1);
  const [total, setTotal] = useState(15);
  const [limit, setLimit] = useState(0);

  const currentParams = useSearchParams();
  let currentColor = currentParams.get('color');
  let currentTalla = currentParams.get('talla');
  let currentCategoria = currentParams.get('categoria');

  useEffect(
    () => {
      const getData = async () => {
        try{
          let data = [];
          if(currentColor || currentTalla){
              const tmp = await filteredByColorAndTalla({"color": "" || currentColor, "talla": "" || currentTalla});
              console.log(tmp)
              if(currentCategoria && currentCategoria != 'All'){
                tmp.forEach(element => {
                  if(element.categoria_id == currentCategoria){
                      data.push(element);
                  }
                });
              }
              else data = tmp;
          }
          else{
              if(currentCategoria == 'All'){
                data = await getAllProducts();
              }
              else data = await getProductsByCategorie(currentCategoria);
          }

          setProducts(data);
          setLimit(Math.ceil(data.length/total));
          setActualPage(1);
        }
        catch(error){
          console.log(error);
        }

      };
      
      getData();
      
    }
  ,[currentCategoria, currentColor, currentTalla]);

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

  //console.log(products)

  return (
      <div>
        <div className="flex justify-center">
          <PageTittle>Catálogo</PageTittle>
        </div>
        <div className="flex mb-12">
          <div className="w-3/12">
              <Aside></Aside>
          </div>
          <div className="w-full">
            {products == null ? <NotFound></NotFound>:<><div className="grid grid-cols-5">
              {
                  products.slice(((actualPage-1)*total),((actualPage)*total)).map((product, i) =>{
                      
                      return product.inventarios.map(
                        (variant) => {
                          return variant.fotos.length != 0 && <CardProduct key={i} title={product.nombre} img={variant.fotos[0].url_foto} id={variant["producto_codigo"]} price={variant.precio}></CardProduct>
                        }
                      )
              })}
            </div>
            <div className="flex justify-center space-x-4 my-6">
              <PageButton handleButton={backPage} disable={actualPage==1}><BacktArrow></BacktArrow></PageButton>
              <PageButton handleButton={nextPage} disable={actualPage==limit}><NextArrow></NextArrow></PageButton>
            </div></>}
          </div>
        </div>
      </div>
  )
}

const NotFound = () => {
  return(
    <div className="w-full h-full flex justify-center align-middle text-center items-center space-x-8 space-y-6 text-black">
      <div className="flex mt-6"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-stars" viewBox="0 0 16 16">
    <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z"/>
  </svg></div>
      <div className="text-4xl font-semibold">No se encontraron productos <br></br> de esas características</div> 
      <div className="flex"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-stars" viewBox="0 0 16 16">
  <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z"/>
</svg></div>
    </div>
  )
};

const Aside = () => {

  const [data, setData] = useState({});

  const [color, setColor] = useState('');

  const [talla, setTalla] = useState('');

  const [categoria, setCategoria] = useState('');

  const router = useRouter();

  const getData = async () => {
    try{
      setData(await getAsideInformation());
    }
    catch(error){
      console.log(error);
    }
  };

  useEffect(
    () => {
      getData();
    }, []
  )

  return(
    <div className="h-full p-4 bg-grisAzulado mx-3">
      <GroupOptions header={"Categoría"} data={data} select={categoria} setSelect={setCategoria}/>
      <GroupOptions header={"Color"} data={data} select={color} setSelect={setColor}/>
      <GroupOptions header={"Talla"} data={data} select={talla} setSelect={setTalla}/>
    </div>
  )
};

const GroupOptions = ({header, data, select, setSelect}) => {
  
  return(
    <div className="text-black">
      <div className="ms-2 font-semibold text-lg">{header}</div>
      {
        header == 'Color' && data.colores && data.colores.map(
          (color) => (<Option key={color.color} label={color.color} id={color.color} select={select} name={'color'} setSelect={setSelect}></Option>)
        )
      }
      {
        header == 'Talla' && data.tallas && data.tallas.map(
          (talla) => (<Option key={talla.talla} label={talla.talla} id={talla.talla} select={select} name={'talla'} setSelect={setSelect}></Option>)
        )
      }
      {
        header == 'Categoría' && data.categorias && data.categorias.map(
          (categoria) => (<Option key={categoria.nombre} label={categoria.nombre} id={categoria.id} select={select} name={'categoria'} setSelect={setSelect}></Option>)
        )
      }
    </div>
  )
};

const Option = ({label, select, setSelect, id, name}) => {

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSelect = () => {
      setSelect(id);
      const params = new URLSearchParams(searchParams)
      params.set(name, id)
      router.push('/products?' + params.toString());
  };

  return <div className="flex align-middle font-medium ms-4 space-x-2 my-2">
    <input className="accent-black" type="checkbox" checked={select==id} onClick={handleSelect} id={label}></input>
    <label htmlFor={label}>{label}</label>
  </div>
};

const NextArrow = () => {
  return(
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
</svg>
  );
};

const BacktArrow = () => {
  return(
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
  </svg>
  );
};

const PageButton = ({children, handleButton, disable}) => {
  
  return(
    <button onClick={handleButton} className={"p-2 text-xl bg-redWine w-20 flex justify-center items-center " + (disable && "opacity-25")} disabled={disable}>{children}</button>
  );
};
 


