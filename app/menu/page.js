'use client'
import { useEffect, useState } from "react";
import { CategoriesOption, ClientOption, EmployeesOption, InventoryOption, MenuOption, MethodOption, OrderOption } from "../components/menu/menuSection";
import PageContainer from "../components/pageContainer";
import { getEmployee } from "../lib/employees";

export default function Page() {
  const [type, setType] = useState(localStorage.getItem("type"));
  const [data, setData] = useState({});

  const getData = async () => {
    try{
        const tmp = await getEmployee(localStorage.getItem('id'));
        setData(tmp);
    }
    catch(error){
        console.log(error);
    }
  };

  useEffect(
      () => {
          if(type == 'E') getData();
      },[]
  )

  return (
      <PageContainer>
        <div className="flex justify-center">
          
          {type == 'A' && <div className="w-[900px] grid grid-cols-3 place-items-center"><MenuAdministrator/></div>}
          
          <div className="flex justify-center items-center space-x-24">
              {type == 'E' && data.inventario && data.inventario == 'T' && <MenuInventarios/>}
              {type == 'E' && data.ventas && data.ventas == 'T' && <MenuVentas/>}
            </div>
        </div>
      </PageContainer>
  )
}


export const MenuAdministrator = () => {
  return (
    <>
      <OrderOption/>
      <InventoryOption/>
      <CategoriesOption/>
      <EmployeesOption/>
      <ClientOption/>
      <MethodOption/>
    </>
  )
}

export const MenuVentas = () => {
  return (
    <>
      <OrderOption/>
    </>
  )
}

export const MenuInventarios = () => {
  return (
    <>
      <CategoriesOption/>
    </>
  )
}
 


