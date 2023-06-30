"use client";

import { StoreModel } from "@/components/models/store-model";
import { useEffect, useState } from "react";

export const ModelProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    // This is to prevent the model from rendering on the server so that no hydration errors occur
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // If the model is not mounted, return null
    if (!isMounted) {
        return null;
    }

    return (
        <>
            <StoreModel/>
        </>
    )
}