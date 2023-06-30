"use client";

import { useStoreModel } from "@/hooks/use-store-model";
import { Model } from "@/components/ui/model";

export const StoreModel = () => {
    const storeModel = useStoreModel();

    return (
        <Model title="Create Store" 
                description="Add a new store to manage products and catergories" 
                isOpen={storeModel.isOpen} 
                onClose={storeModel.onClose}
            >
            Future Store Form
        </Model>
    )
};