import prisma from "@/lib/prismaSingleton";

export const POST = async (req: Request) => {
  const { from, to, amount } = await req.json();

  /* const mId = await prisma.merchant.findFirst({
    where: {
      email: to,
    },
    select: {
      id: true,
    },
  });

  if (!mId) {
    return new Response(JSON.stringify({ message: "Merchant not found" }), { status: 404 });
  }

  const merchId = mId.id;

  const uId = await prisma.user.findFirst({
    where: {
      email: from,
    },
    select: {
      id: true,
    },
  });

  if (!uId) {
    return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
  }

  const userId = uId.id; */

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
      return new Response(JSON.stringify({ message: "Merchant not found" }), { status: 404 });
    }

    const merchId = mId.id;


    const uId = await prisma.user.findFirst({
      where: {
        email: from,
      },
      select: {
        id: true,
      },
    });
  
    if (!uId) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }
  
    const userId = uId.id;

    // Start the transaction
    const paymentDone = await prisma.$transaction(async (tx) => {
      // Lock the row with FOR UPDATE
      const userAcc = await tx.$queryRaw`SELECT * FROM "UserAccount" WHERE "userId" = ${userId} FOR UPDATE`;

      // Check if user account exists
      if (!userAcc) {
        throw new Error("User account not found");
      }

      // Find user account
      const userAccount = await tx.userAccount.findFirst({
        where: {
          userId,
        },
      });

      // Find merchant account
      const merchantAccount = await tx.merchantAccount.findFirst({
        where: {
          merchantId: merchId,
        },
      });

      if (!userAccount || !merchantAccount) {
        throw new Error("User or Merchant account not found");
      }

      // Validate the amount
      if (typeof amount !== 'number' || amount <= 0) {
        throw new Error("Invalid amount");
      }

      // Perform the update
       await tx.userAccount.update({
        where: {
          userId,
        },
        data: {
          balance: {
            decrement: amount, // Corrected to decrement by `amount`
          },
        },
      });
      await tx.merchantAccount.update({
        where:{
          merchantId:merchId
        },
        data:{
          balance:{
            increment:amount
          }
        }
      })

      return true;
    });

    return new Response(JSON.stringify({ paymentDone }), { status: 200 });

  } catch (error:any) {
    console.error("Error processing payment:", error);
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
};
