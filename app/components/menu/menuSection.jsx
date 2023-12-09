import React from 'react'
import { IconCategories, IconClients, IconInventory, IconMoney, IconOrders, IconPeople } from './icons'
import Link from 'next/link'
import styles from '../../css/Menu.module.css'

export const OrderOption = () => {
  return (
    <Link href={"/orders"} className={styles.link + ' bg-[#94CFCF]'}>
      <div><IconOrders></IconOrders></div>
      <div>Pedidos</div>
    </Link>
  )
};

export const InventoryOption = () => {
  return (
    <Link href={"/inventory"} className={styles.link + ' bg-[#D9D9D9]'}>
      <div><IconInventory></IconInventory></div>
      <div>Inventario</div>
    </Link>
  )
};

export const CategoriesOption = () => {
  return (
    <Link href={"/categories"} className={styles.link + ' bg-[#60B883]'}>
      <div><IconCategories></IconCategories></div>
      <div>Categorias</div>
    </Link>
  )
};

export const EmployeesOption = () => {
  return (
    <Link href={"/employees"} className={styles.link + ' bg-[#BBCEA8]'}>
      <div><IconPeople></IconPeople></div>
      <div>Empleados</div>
      </Link>
  )
};

export const ClientOption = () => {
  return (
    <Link href={"/clients"} className={styles.link + ' bg-[#F0EC57]'}>
      <div><IconClients></IconClients></div>
      <div>Clientes</div>
      </Link>
  )
};

export const MethodOption = () => {
  return (
    <Link href={"/methods"} className={styles.link + ' bg-[#60B883]'}>
      <div><IconMoney></IconMoney></div>
      <div>Medios de pago</div>
      </Link>
  )
};



