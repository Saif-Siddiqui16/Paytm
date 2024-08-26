"use client";

import { useState } from "react";

import { Button } from "./Button";
import { Card } from "./Card";
import { Select } from "./Select";

const SUPPORTED_BANKS = [
  {
    name: "HDFC BANK",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
];
export const AddMoney = () => {
  const [redirectUrl, setRedirectUrl] = useState(
    SUPPORTED_BANKS[0]?.redirectUrl
  );
  const [amount, setAmount] = useState(0);
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");

  const handleSubmit = async () => {};

  return (
    <Card title="Add Money">
      <div className="w-full">
        <label>Amount</label>
        <input
          placeholder="enter amount"
          onChange={(e) => setAmount(Number(e))}
        />
        <div className="py-4 text-left">Bank</div>

        <Select
          //@ts-ignore
          onSelect={(value) => {
            setRedirectUrl(
              SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl || ""
            );
            setProvider(
              SUPPORTED_BANKS.find((x) => x.name === value)?.name || ""
            );
          }}
          options={SUPPORTED_BANKS.map((x) => ({
            key: x.name,
            value: x.name,
          }))}
        />
        <div className="flex justify-center pt-4">
          <button>Add Money</button>
        </div>
      </div>
    </Card>
  );
};
