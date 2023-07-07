import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from 'next/navigation';

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
            <div>
                This will be a navbar
            </div>

            {children}
        </>
    )
}