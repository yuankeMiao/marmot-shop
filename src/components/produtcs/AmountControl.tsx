import React from "react";
import { Button, Tooltip } from "flowbite-react";

function AmountControl({
  amount,
  setAmount,
  limit,
}: {
  amount: number;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
}) {
  const handleIncrement = () => {
    if (amount < limit) {
      setAmount((prev) => prev + 1);
    }
  };

  const handledecrement = () => {
    if (amount > 1) {
      setAmount((prev) => prev - 1);
    }
  };

  // i did not set the input type = "number" because I dont want the default browser layout for number input
  // so here I use customized validation for the input to make sure it is number and greater than 0, less than 100
  const handleInputAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!Number(e.target.value)) {
      setAmount(1);
    } else if (Number(e.target.value) < 1) {
      setAmount(1);
    } else if (Number(e.target.value) > limit) {
      setAmount(limit);
    } else {
      setAmount(Number(e.target.value));
    }
  };

  return (
    <Tooltip content={`Stock: ${limit}`}>
      <Button.Group>
        <Button
          size="sm"
          color="gray"
          onClick={handledecrement}
          disabled={amount === 1}
        >
          -
        </Button>
        <input
          type="text"
          className="w-16 bg-gray-50 dark:bg-gray-600 border border-gray-300 dark:border-gray-400 text-gray-900 dark:text-gray-50 text-md text-center"
          value={amount}
          onChange={handleInputAmount}
        />
        <Button
          size="sm"
          color="gray"
          onClick={handleIncrement}
          disabled={amount === limit}
        >
          +
        </Button>
      </Button.Group>
    </Tooltip>
  );
}

export default AmountControl;
