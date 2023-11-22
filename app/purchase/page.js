'use client'

import PageContainer from "../components/pageContainer";
import { PurchaseFrame } from "../components/purchase/frame";

export default function Page(){

    

    return (
        <PageContainer>
            <PurchaseFrame condition={1}></PurchaseFrame>
        </PageContainer>
    );
};