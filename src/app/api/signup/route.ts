import prisma from "@/lib/prismaSingleton"
import { NextApiRequest, NextApiResponse } from "next"
import bcrypt from "bcryptjs"


export const POST=async(req:Request)=>{
try {
    const {email,name,password} =await req.json()
    const existingUser=await prisma.user.findFirst({
        where:{
            email
        }
    })
    if(existingUser){
        throw new Error("User already exists")
    }

    const hashedPassword=await bcrypt.hash(password,10)
    await prisma.$transaction(async tx=>{
        const user=await tx.user.create({
            data:{
                email,
                name,
                password:hashedPassword,
        }
        })
        await tx.userAccount.create({
            data:{
                userId:user.id
            }
        })
    })
    return Response.json({
        message:"User successfully registered"
    })

    return Response.json({
        name
    })
} catch (error) {
    return Response.json({
message:"Inavlid credentials"
    })
}
}