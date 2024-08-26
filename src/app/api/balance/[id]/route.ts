import prisma from "@/lib/prismaSingleton";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  console.log(id);
  const balance = await prisma.userAccount.findFirst({
    where: {
      userId: id,
    },
  });
  return Response.json({
    amount: balance?.balance,
    locked: balance?.locked,
  });
};
