"use client"
import prisma from "@/lib/prismaSingleton"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

interface EmailProps{
    email:string | null
}

interface Transaction{
    from: string;
    to: string;
    amount: number;
    status: string;
}

export const Table=({email}:EmailProps)=>{
const[transactions,setTransactions]=useState<Transaction[]>([])
console.log(email)

useEffect(()=>{
    async function fetchUsers() {
        const response = await fetch(`/api/onramp/${email}`,{
            method:"GET"
        })
        
       const result=await response.json()
       setTransactions(result)
    }
      fetchUsers();
},[])

    return (
    <div className="w-full">
       <table className="w-full mt-10">
        <thead className="flex flex-col mx-10 ">
          <tr className="flex justify-between">
            <th>From</th>
            <th>To</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody className="flex flex-col mx-9 ">
          {transactions.map((transaction, index) => (
            <tr key={index} className="flex justify-between">
              <td>{transaction.from}</td>
              <td>{transaction.to}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
)
}