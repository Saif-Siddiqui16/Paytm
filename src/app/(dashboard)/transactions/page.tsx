
import { Table } from "@/components/Table";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

import React from "react";

const TransactionsPage = async() => {

  let email = null;
  
  try {
    const session = await getServerSession(authOptions);
    email = session?.user?.email || null;
  } catch (error) {
    console.error("Failed to fetch session:", error);
    
  }


  return (
    <Table  email={email}/>
  )
};

export default TransactionsPage;
