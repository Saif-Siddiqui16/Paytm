import { AddMoney } from "@/components/AddMoney";
import { BalanceCard } from "@/components/BalanceCard";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prismaSingleton";
import { getServerSession } from "next-auth";
import React from "react";

async function getBalance() {
  const session = await getServerSession(authOptions);
  //@ts-ignore
  const id: string = session?.user?.id;

  const balance = await prisma.userAccount.findFirst({
    where: {
      userId: id,
    },
  });

  return {
    amount: balance?.balance,
    locked: balance?.locked,
  };
}

const TransferPage = async () => {
  const balance = await getBalance();
  console.log(balance);
  return (
    <div className="w-screen">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        Transfer
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        <div>
          <AddMoney />
        </div>
        <div>
          <BalanceCard
            //@ts-ignore
            amount={balance?.amount}
            //@ts-ignore
            locked={balance?.locked}
          />
          <div className="pt-4">OnRamp</div>
        </div>
      </div>
    </div>
  );
};

export default TransferPage;
