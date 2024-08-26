"use client";
import prisma from "@/lib/prismaSingleton";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { json } from "stream/consumers";

const P2Page = () => {
  const { register, handleSubmit } = useForm();

  const data = useSession();
  //@ts-ignore
  const userId: string = data?.data?.user?.id;
  console.log(userId);
  const onSubmit = async (data: any) => {
    const response = await fetch("/api/p2p", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: data.sendFrom,
        to: data.sendTo,
        amount: Number(data.amount),
      }),
    });
    const result = await response.json();
    console.log(result);
    if (response.ok) {
      console.log("success");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>From</label>
          <input
            {...register("sendFrom", {
              required: "this field is required",
            })}
            type="text"
            defaultValue={userId}
          />
        </div>
        <div>
          <label>To</label>
          <input
            {...register("sendTo", {
              required: "this field is required",
            })}
            type="email"
          />
        </div>
        <div>
          <label>Amount</label>
          <input
            {...register("amount", {
              required: "this field is required",
            })}
            type="number"
          />
        </div>
        <button type="submit" className="bg-blue-500">
          Send Money
        </button>
      </form>
    </div>
  );
};

export default P2Page;
