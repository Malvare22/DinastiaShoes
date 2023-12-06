'use client'
import { useContext, useEffect, useState } from 'react';
import { ProductCarousel } from '../../components/imageCarousel';
import { HomeCardsGroup } from '../../components/products/homeCard';
import { getProducts } from '@/app/lib/inventories';
import { AddToCart } from '@/app/lib/cart';
import { useRouter } from 'next/navigation';
import { SessionContext } from '@/app/components/template';

export default function Page({params}){
    
    const id = params.id;
    
    const [data, setData] = useState([]);

    const [auxImages, setAuxImages] = useState([]);

    const [images, setImages] = useState([]);

    const [mapColors, setMapColors] = useState([]);

    const [cantidad, setCantidad] = useState(1);

    const [currentVariant, setCurrentVariant] = useState(-1);
    
    const getData = async () => {
        const info = await getProducts(id);
        setData(info);
        const tmp_mapa_colors = new Map();
        const tmp_colors = [];
        let tmp_aux_images = [];
        (info["inventarios"]).forEach(
            (variant) => {
  
                const color = variant.color;
                if(tmp_mapa_colors.has(color)){
                    const actual = (tmp_mapa_colors.get(color));
                    actual.push(variant);
                    tmp_mapa_colors.set(color, actual);
                }
                else{
                    tmp_colors.push(color);
                    tmp_mapa_colors.set(color, [variant]);
                }
                if(tmp_aux_images.length == 0 && (variant.fotos).length != 0){
                    tmp_aux_images = (variant.fotos).map(
                        (img) => {
                            return img["url_foto"];
                        }
                    );
                }
            }
        );
        setAuxImages(tmp_aux_images);
        setMapColors(tmp_mapa_colors);
        
    };

    useEffect(
        () => {
            getData();
        }, []
    );

    useEffect(
        () => {
            if(currentVariant!=-1 && (currentVariant.fotos).length != 0){
                let aux = (currentVariant.fotos).map(
                    (img) => {return img["url_foto"]} 
                    );
                setImages(aux);
            }
            else{
                setImages(auxImages);
            }
        }, [currentVariant]
    );
    return(
        <div className="mt-20">
            {data.length!= 0 && <><div className="md:flex md:justify-center">
                    <ProductCarousel images={images}></ProductCarousel>
                    <PriceCard data={data} mapColors={mapColors} currentVariant={currentVariant} setCurrentVariant={setCurrentVariant} cantidad={cantidad} setCantidad={setCantidad}></PriceCard>
            </div>
            <div className="text-black px-[100px] my-10">
                <div className="font-bold text-3xl">
                    Detalles
                </div>
                <div className="font-sans text-xl mt-5">
                    {
                        data.descripcion
                    }
                </div>
            </div>
            <div className="text-black px-[100px]">
                <div className="font-bold text-3xl">
                    Otros productos
                </div>
            </div></>}
            <div>
                <HomeCardsGroup number="6"></HomeCardsGroup>
            </div>
        </div>
    );
} 

const PriceCard = ({data, mapColors, currentVariant, setCurrentVariant, cantidad, setCantidad}) => {

    //color actual (string)
    const [currentColor, setCurrentColor] = useState('');
    //Lista de colores
    const [colors, setColors] = useState([]);
    const [tallas, setTallas] = useState([]);
    
    const limit = [];
    for(let i = 1; i<= Math.min(10, currentVariant.cantidad); i++){
        limit.push(i)
    };

    useEffect(
        () => {
            const tmp = [];
            for(const [color, value] of mapColors){
                tmp.push(color);
            }
            setColors(tmp);
            setCurrentColor(tmp[0]);
        }, []
    );

    useEffect(
        () => {
            
            setTallas(mapColors.get(currentColor));
            
        }, [currentColor]
    );

    return(
        <div className="bg-pink p-8 flex items-center align-middle justify-center">
            <div className="space-y-7">
                <div className="text-black text-4xl font-bold text-center">
                    {data.nombre}
                </div>
                <div className="text-black w-full flex justify-center">
                    <div>
                        {currentVariant.descuento != 0 && <div>
                            <s>${Math.ceil((currentVariant.precio * 100)/((100 - currentVariant.descuento)))}</s>
                        </div>}
                        <div className="flex items-center space-x-2">
                            <div className="text-4xl">
                                ${currentVariant.precio}
                            </div>
                            {currentVariant.descuento != 0 && <div className="bg-blue text-standardWhite font-bold p-2 rounded-lg">
                                {currentVariant.descuento}% OFF
                            </div>}
                        </div>
                    </div>
                </div>
                <div className="text-black space-y-2">
                    <div className="font-bold text-2xl text-center">
                        Color:
                    </div>
                    <div className="flex space-x-4 justify-center">
                        {
                            <GrupoColores colores={colors} currentColor={currentColor} setCurrentColor={setCurrentColor}/>
                        }
                    </div>
                </div>
                <div className="text-black space-y-2">
                    <div div className="font-bold text-2xl text-center">
                        Talla:
                    </div>
                    <div className="flex space-x-4 justify-center">
                        {<GrupoTallas tallas={tallas} currentVariant={currentVariant} setCurrentVariant={setCurrentVariant}/>}
                    </div>
                </div>
                <div className="flex justify-center space-x-2 align-middle items-center">
                    {limit != 0 && <><div className="font-bold text-black text-xl">
                        Cantidad:
                    </div>
                    <div className="font-bold text-black text-xl">
                        <select className="bg-pink" onChange={(e)=>{setCantidad(e.target.value)}}>
                            {
                                limit.map(
                                    (i) => (<option value={i} key={i}>{i}</option>)
                                )
                            }
                        </select>
                    </div></>}
                    <div className="text-grey text-sm">
                        ({currentVariant.cantidad} unidades disponibles)
                    </div>
                </div>
                <div className="flex justify-center">
                    <AddItem disable={limit==0} cantidad={cantidad} producto={currentVariant}></AddItem>
                </div>
            </div>
        </div>
    );
}

const GrupoColores = ({colores, currentColor, setCurrentColor}) => {

    return(
        <>
            {
                colores.map(
                    (color, index) => {
                        return <Color key={index} name={color} select={currentColor} setSelect={setCurrentColor}>{color}</Color>;
                    }
                )
            }
        </>
    );
};

const GrupoTallas = ({tallas, currentVariant, setCurrentVariant}) => {

    const [select, setSelect] = useState(-1);

    return(
        <>
            {
                tallas && tallas.map(
                    (variant, index) => {
                        return <Option key={variant.codigo} select={select} id={variant.codigo} currentVariant={currentVariant} setSelect={setSelect} variant={variant} setCurrentVariant={setCurrentVariant}>{variant.talla}</Option>;
                    }
                )
            }
        </>
    );
};

const Color = ({children, name, onClick, select, setSelect}) =>{

    const [status, setStatus] = useState(false);

    useEffect(
        () => {
            setStatus(select == name);
        }, [select]
    )

    const handleButton = () => {
        setSelect(name);
    };

    return <div className={(status == true ? "bg-redWine text-white" : "bg-[#B4B2B2] text-black") + " p-2 font-semibold rounded-lg cursor-pointer"} onClick={handleButton}>{children}</div>;
}

const Option = ({children, id, onClick, select, setSelect, currentVariant, setCurrentVariant , variant}) =>{

    const [status, setStatus] = useState(false);



    useEffect(
        () => {
            setStatus(select == id);
            if(currentVariant == -1){
                handleButton();
            }
        }, [select]
    )

    const handleButton = () => {
        setSelect(id);
        setCurrentVariant(variant);
    };

    return <div className={(status == true ? "bg-redWine text-white" : "bg-[#B4B2B2] text-black") + " p-2 font-semibold rounded-lg cursor-pointer"} onClick={handleButton}>{children}</div>;
}

const AddItem = ({disable, producto, cantidad}) => {

    const router = useRouter();
    const {sessionFlag} = useContext(SessionContext);

    const handleButton = async () => {
        try{
            if(!(localStorage.getItem('token'))){
                router.push('/login');
            }
            else{
                await AddToCart(producto, cantidad);
                router.push('/cart');
            }
        }
        catch(error){
            alert(error);
        }
    }
    
    return(
        <button onClick={handleButton} disabled={(disable)} className={"text-black bg-[#96B836] text-xl text-center min-w-[200px]  p-2 rounded-lg font-semibold "+ (disable? "opacity-25": "" )}>Agregar al Carrito</button>
    );
}

