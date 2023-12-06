'use client'

import { useParams, useSearchParams } from "next/navigation";
import PageContainer from "../components/pageContainer";
import { PurchaseFrame } from "../components/purchase/frame";

export default function Page(){

    const query = useSearchParams();

    const state = query.get('code');

    return (
        <PageContainer>
            <PurchaseFrame condition={state}></PurchaseFrame>
        </PageContainer>
    );
};