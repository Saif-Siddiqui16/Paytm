// pages/api/onramp/[email].ts
import prisma from "@/lib/prismaSingleton";
import type { NextApiRequest, NextApiResponse } from "next";

// Handle GET requests to fetch transactions based on email
export const GET=async(req:Request,{params}:{params:{email:string}})=> {
    const{email}=params


 try {
 const response =await prisma.onRampTransactions.findMany({
    where:{
        from:email
    }
 })
    return Response.json(response)
 } catch (error) {
    return Response.json(error)
 }
}
