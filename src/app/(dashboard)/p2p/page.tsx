"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";


const P2Page = () => {
  const { register, handleSubmit,reset } = useForm();

  const data = useSession();
  //@ts-ignore
  const email: string = data?.data?.user?.email;
  
  const onSubmit = async (data: any) => {
    const response = await fetch("/api/p2p", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: data.sendFrom,
        to: data.sendTo,
        amount: Number(data.amount),
      }),
    });
    const result = await response.json();
    console.log(result);
    if (response.ok) {
      console.log("success");
      reset()
    }
  };
  return (
    <div className="w-full" >
    <div className="w-[30vw] px-10 py-10">
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4  justify-center ">
        <div className="flex justify-between">
          <label className="text-lg font-semibold">From</label>
          <input 
            {...register("sendFrom", {
              required: "this field is required",
            })}
            type="text"
            className="outline-none px-2 py-2"
            defaultValue={email}
          />
        </div>
        <div className="flex justify-between">
          <label className="text-lg font-semibold">To</label>
          <input
            {...register("sendTo", {
              required: "this field is required",
            })}
            type="email"
            className="outline-none px-2 py-2"
          />
        </div>
        <div className="flex justify-between">
          <label className="text-lg font-semibold">Amount</label>
          <input
            {...register("amount", {
              required: "this field is required",
            })}
            type="number"
            className="outline-none px-2 py-2"
          />
        </div>
        <div className="flex justify-center">
        <button  type="submit" className="bg-blue-500 px-4 py-2 text-white hover:bg-blue-400 border rounded-xl">
          Send Money
        </button>
        </div>
        </div>
      </form>
    </div>
    </div>
  );
};

export default P2Page;
