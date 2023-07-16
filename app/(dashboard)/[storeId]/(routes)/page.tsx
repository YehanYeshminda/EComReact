import React from "react";
import prismadb from "@/lib/prismadb";

interface DashBoardPageProps {
  params: {
    storeId: string;
  }
}

const DashboardPage: React.FC<DashBoardPageProps> = async ({params}) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId
    }
  });

  return (
    <div>Active store: ${store?.name}</div>
  )
}

export default DashboardPage;