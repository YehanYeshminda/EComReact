"use client";

import React, { useEffect, useState } from "react";
import { Model } from "@/components/ui/model";
import { Button } from "@/components/ui/button";

interface AlertModelProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading: boolean;
};

export const AlertModel: React.FC<AlertModelProps> = ({
    isOpen,
    loading,
    onClose,
    onConfirm,
}) => {
    const [isMounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <Model title="Are you sure?" description="This action cannot be undone." isOpen={isOpen} onClose={onClose}>
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button disabled={loading} variant="outline" onClick={onClose}>
                    Cancel
                </Button>

                <Button disabled={loading} variant="destructive" onClick={onConfirm}>
                    Continue
                </Button>
            </div>
        </Model>
    );
};