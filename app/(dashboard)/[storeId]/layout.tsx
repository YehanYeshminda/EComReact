import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from 'next/navigation';
import Navbar from "@/components/navbar";

export default async function DashBoardLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { storeId: string }
}) {
    const user = auth();

    if (!user.userId) {
        redirect('/sign-in')
    }

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId: user.userId 
        }
    })
    
    if (!store) {
        redirect('/')
    }

    return (
        <>
            <Navbar />
            {children}
        </>
    )
}