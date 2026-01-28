"use client";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Invoice } from "@/app/schema";
import { CirclePlus, Trash } from "lucide-react";
export default function ProductDetails() {
  // Form
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<Invoice>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  //   itemRows
  const itemRows = fields.map((field, index) => (
    <tr key={field.id} className="relative">
      <td className={`px-3 py-3 `}>
        <input
          type="text"
          placeholder="Enter product description"
          {...register(`items.${index}.description`)}
          className={`w-full py-2 focus:outline-none focus:border-b  transition-colors duration-200 rounded-t-sm ${errors && errors.items && errors.items[index]?.description ? "bg-danger/25 border-b border-b-danger focus:border-b-danger" : "focus:border-b-secondary/25"}`}
        />
      </td>
      <td className="px-3">
        <input
          type="number"
          {...register(`items.${index}.quantity`, { valueAsNumber: true })}
          className={` rounded-sm w-full  pl-1 py-1 transition-colors duration-200  ${errors && errors.items && errors.items[index]?.quantity ? "bg-danger/25 border border-danger focus:outline-danger" : "border bg-surface border-muted focus:outline-secondary/25"}`}
        />
      </td>
      <td className={`px-3 `}>
        <input
          type="number"
          {...register(`items.${index}.price`, { valueAsNumber: true })}
          className={`${errors && errors.items && errors.items[index]?.price ? "bg-danger/25 border border-danger focus:outline-danger" : "border bg-surface border-muted focus:outline-secondary/25"}  rounded-sm w-full  pl-1 py-1 transition-colors duration-200`}
        />
      </td>
      <td className="">
        <button
          onClick={() => {
            remove(index);
          }}
          className="cursor-pointer p-1 rounded-sm disabled:hover:bg-transparent hover:bg-danger/25 duration-200 transition-colors disabled:cursor-not-allowed  disabled:opacity-50"
          disabled={fields.length < 2}
        >
          <Trash size={16} className="text-danger" />
        </button>
      </td>
    </tr>
  ));
  return (
    <div className="w-full flex flex-col gap-4 bg-mainBg rounded-md py-4 px-3">
      <table className="table-fixed ">
        <colgroup>
          <col className="w-[60%]" />
          <col className="w-[12%] " />
          <col className="w-[23%]" />
          <col className="min-w-8" />
        </colgroup>
        <thead className=" text-text-secondary">
          <tr>
            <th className=" text-start py-3 pl-3 font-medium">Description</th>
            <th className="font-medium">Qty</th>
            <th className="font-medium">Price</th>
            <th className="font-medium"></th>
          </tr>
        </thead>
        <tbody className="text-3">{itemRows}</tbody>
      </table>
      <button
        className="text-secondary text-start flex gap-2 items-center cursor-pointer hover:text-primary-hover text-[14px]"
        type="button"
        onClick={() => {
          append({ description: "", quantity: 1, price: 0 });
        }}
      >
        <span>
          <CirclePlus size={16} />
        </span>{" "}
        Add new line
      </button>
    </div>
  );
}
