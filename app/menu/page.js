'use client'
import { useState } from "react";
import { CategoriesOption, ClientOption, EmployeesOption, InventoryOption, MenuOption, MethodOption, OrderOption } from "../components/menu/menuSection";
import PageContainer from "../components/pageContainer";

export default function Page() {
  const [type, setType] = useState(localStorage.getItem("type"));

  return (
      <PageContainer>
        <div className="flex justify-center">
          <div className="w-[900px] grid grid-cols-3 place-items-center">
            {type == 'A' && <MenuAdministrator/>}
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

 


