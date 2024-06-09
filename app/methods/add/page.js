'use client'
import { Button, FileButton, ToLink } from "@/app/components/buttons";
import { Card } from "@/app/components/methods/card";
import ManipulateCard from "@/app/components/methods/manipulateCard";
import Modal from "@/app/components/modal";
import { PageTittle } from "@/app/components/text";
import { ValidTypes } from "@/app/lib/information";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function Page(){

    ValidTypes(['A']);


    return(
        <ManipulateCard type="register"></ManipulateCard>
    );
};