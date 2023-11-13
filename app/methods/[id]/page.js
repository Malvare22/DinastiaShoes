'use client'
import { Button, FileButton, ToLink } from "@/app/components/buttons";
import { Card } from "@/app/components/methods/card";
import ManipulateCard from "@/app/components/methods/manipulateCard";
import Modal from "@/app/components/modal";
import { PageTittle } from "@/app/components/text";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function Page({params}){

    return(
        <ManipulateCard type="edit" id={params.id}></ManipulateCard>
    );
};