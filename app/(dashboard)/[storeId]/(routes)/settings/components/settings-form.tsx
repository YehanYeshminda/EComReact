"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { store } from "@prisma/client";
import React, { useState } from "react";
import { Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import * as Z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { AlertModel } from "@/components/models/alert.model";
import { ApiAlert } from "@/components/ui/api-alert";

interface SettingsFormProps {
    initialData: store;
}

const formSchema = Z.object({
    name: Z.string().min(1),
})
type SettingsFormValues = Z.infer<typeof formSchema>;


const SettingsForm: React.FC<SettingsFormProps> = ({
    initialData
}) => {
    const params = useParams();
    const router = useRouter();

    const [onOpen, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    });

    const onSubmit = async (values: SettingsFormValues) => {
        try {
            setLoading(true);
            await axios.patch(`/api/stores/${params.storeId}`, values);
            router.refresh();
            toast.success("Store settings updated!");
        } catch (error) {
            toast.error("Something went wrong! " + error);
        } finally {
            setLoading(false);
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/stores/${params.storeId}`);
            router.refresh();
            router.push("/");
            toast.success("Store deleted!");
        } catch (error) {
            toast.error("Make sure to remove all the active products and the catergories first. " + error);
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }

    return (
        <>
            <AlertModel isOpen={onOpen} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading} />
            <div className="flex items-center justify-between">
                <Heading title="Settings" description="Manage store preferences" />

                <Button variant='destructive' disabled={loading} size='icon' onClick={() => {setOpen(true)}}>
                    <Trash className="h-4 w-4" />
                </Button>
            </div>

            <Separator />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <div className="grid grid-cols-3 gap-8">
                        <FormField control={form.control} name="name" render={({field}) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="Store name" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}/>
                    </div>

                    <Button disabled={loading} className="ml-auto" type="submit">
                        Save Changes
                    </Button>
                </form>

                <Separator />

                <ApiAlert title="NEXT_PUBLIC_API_URL" description={`${origin}/api/${params.storeId}`} variant="public" />
            </Form>
        </>
    )
}

export default SettingsForm