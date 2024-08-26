import prisma from "@/lib/prismaSingleton";

export const POST = async (req: Request) => {
  const { userId, to, amount } = await req.json();
  try {
    const mId = await prisma.merchant.findFirst({
      where: {
        email: to,
      },
      select: {
        id: true,
      },
    });
    if (!mId) {
      return;
    }
  
    const paymentDone = await prisma.$transaction(
      async (tx) => {
        await tx.$queryRaw`SELECT * FROM "UserAccount" WHERE "userId"=${userId} FOR UPDATE`;
        const userAccount = await tx.userAccount.findFirst({
          where: {
            userId: userId,
          },
        });
        console.log(userAccount);
        if ((userAccount?.balance || 0) < amount) {
          return;
        }
       
        const merchantAccount = await tx.merchantAccount.findFirst({
          where: {
            //@ts-ignore
            merchantId: mId.id,
          },
        });
        
      
    
        await tx.userAccount.update({
          where:{
            userId:userId
          },
          data:{
            balance:{
              increment:10
            }
          }
        })
        console.log(userAccount?.balance)
       
        return true
      },{
        maxWait: 5000,
        timeout: 100000,
      }
    );
    if(paymentDone){
      return Response.json({
        message:"successful"
      })
    }
    else{
      return Response.json({
        message:"not"
      })
    }
  } catch (error) {
    return Response.json(error)
  }
};
