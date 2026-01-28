"use client";
import { useFormContext, } from "react-hook-form";
import { ChevronDown, UserRound, Mail, Phone, MapPinHouse } from "lucide-react";
import { useState } from "react";
import { currencies } from "@/app/constants";
import { Invoice } from "@/app/schema";
import ProductDetails from "./ProductDetails";
export default function Details({ currentDate }: { currentDate: string }) {
  // States
  const [openInfoSection, setOpenInfoSection] = useState(true);
  const [openProductSection, setOpenProductSection] = useState(false);

  //   Form
  const {
    register,
    formState: { errors },
  } = useFormContext<Invoice>();

  //   Currency Options
  const currencyOptions = currencies.map((c, index) => (
    <option key={index} value={c.sign} className="bg-mainBg">
      {c.sign + " " + c.name}
    </option>
  ));
  return (
    <form className="w-full flex flex-col gap-8 text-[14px]">
      {/* General Info Section */}
      <div className="rounded-md bg-surface pt-4  px-5 flex flex-col gap-6 pb-8">
        <button
          className="w-full flex justify-between items-center cursor-pointer rounded-t-sm p-1 hover:bg-muted/25 duration-200 transition-colors border-b border-b-muted leading-10 text-4 font-semibold"
          type="button"
          onClick={() => {
            setOpenInfoSection((prev) => !prev);
          }}
        >
          <span>General information</span>
          <span
            className={`${openInfoSection ? "rotate-180" : ""} duration-200 transition-transform`}
          >
            <ChevronDown size={18} className="text-muted" />
          </span>
        </button>
        {openInfoSection && (
          <div className="flex flex-col gap-7">
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
              <label className="w-full flex flex-col relative gap-0.5">
                <span className="after:ml-0.5 after:text-red-500 after:content-['*']">
                  Name
                </span>
                <input
                  {...register("name")}
                  type="text"
                  className="pr-4 pl-11 py-2 border border-muted rounded-sm focus:outline-secondary/25 w-full"
                />
                <span className="absolute left-3 top-1 translate-y-[200%]">
                  <UserRound size={16} className="text-muted " />
                </span>
                {errors.name && (
                  <p className="text-[12px] text-danger">
                    {errors?.name?.message}
                  </p>
                )}
              </label>
              <label className="w-full  flex flex-col gap-0.5 relative">
                <span className="after:ml-0.5 after:text-red-500 after:content-['*']">
                  Email
                </span>
                <input
                  {...register("email")}
                  type="email"
                  className="pr-4 pl-11 py-2 border border-muted rounded-sm focus:outline-secondary/25 w-full"
                />
                <span className="absolute left-3 top-1 translate-y-[200%]">
                  <Mail size={16} className="text-muted " />
                </span>
                {errors.email && (
                  <p className="text-[12px] text-danger">
                    {errors?.email?.message}
                  </p>
                )}
              </label>
              <label className="w-full  flex flex-col gap-0.5 relative">
                <span>Phone number</span>
                <input
                  {...register("phoneNumber")}
                  type="text"
                  className="pr-4 pl-11 py-2 border border-muted rounded-sm focus:outline-secondary/25 w-full"
                />
                <span className="absolute left-3 top-1 translate-y-[200%]">
                  <Phone size={16} className="text-muted " />
                </span>
                {errors.phoneNumber && (
                  <p className="text-[12px] text-danger">
                    {errors?.phoneNumber?.message}
                  </p>
                )}
              </label>
              <label className="w-full  flex flex-col gap-0.5 relative">
                <span className="after:ml-0.5 after:text-red-500 after:content-['*']">
                  Address
                </span>
                <input
                  {...register("address")}
                  type="text"
                  className="pr-4 pl-11 py-2 border border-muted rounded-sm focus:outline-secondary/25 w-full"
                />
                <span className="absolute left-3 top-1 translate-y-[200%]">
                  <MapPinHouse size={16} className="text-muted " />
                </span>
                {errors.address && (
                  <p className="text-[12px] text-danger">
                    {errors?.address?.message}
                  </p>
                )}
              </label>
            </div>
            <hr className="text-muted/25 w-full" />
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
              <label className="w-full flex flex-col gap-0.5">
                <span className="after:ml-0.5 after:text-red-500 after:content-['*']">
                  Invoice Number
                </span>
                <input
                  {...register("invoiceNumber")}
                  type="text"
                  className=" pl-3 pr-4 py-2 border border-muted rounded-sm focus:outline-secondary/25 w-full"
                />
                {errors.invoiceNumber && (
                  <p className="text-[12px] text-danger">
                    {errors?.invoiceNumber?.message}
                  </p>
                )}
              </label>
              <label className="w-full flex flex-col gap-0.5">
                <span>Currency</span>
                <select
                  {...register("currency")}
                  className="pl-3 pr-4  py-2 border border-muted rounded-sm focus:outline-secondary/25 w-full cursor-pointer"
                >
                  {currencyOptions}
                </select>
              </label>
              <label className="w-full flex flex-col gap-0.5">
                <span className="after:ml-0.5 after:text-red-500 after:content-['*']">
                  Date
                </span>
                <input
                  min={currentDate}
                  {...register("date")}
                  type="date"
                  className="pl-3 pr-4 py-2 border border-muted rounded-sm focus:outline-secondary/25 w-full"
                />
                {errors.date && (
                  <p className="text-[12px] text-danger">
                    {errors?.date?.message}
                  </p>
                )}
              </label>
              <label className="w-full flex flex-col gap-0.5">
                <span className="after:ml-0.5 after:text-red-500 after:content-['*']">
                  Due Date
                </span>
                <input
                  min={currentDate}
                  {...register("dueDate")}
                  type="date"
                  className="pl-3 pr-4  py-2 border border-muted rounded-sm focus:outline-secondary/25 w-full"
                />
                {errors.dueDate && (
                  <p className="text-[12px] text-danger">
                    {errors?.dueDate?.message}
                  </p>
                )}
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Product details */}
      <div className="rounded-md bg-surface pt-4 pb-8 px-5 flex flex-col gap-6">
        <button
          className="w-full flex justify-between items-center cursor-pointer rounded-t-sm p-1 hover:bg-muted/25 duration-200 transition-colors leading-10 border-b border-b-muted text-4 font-semibold"
          type="button"
          onClick={() => {
            setOpenProductSection((prev) => !prev);
          }}
        >
          <span>Product</span>
          <span
            className={`${openProductSection ? "rotate-180" : ""} duration-200 transition-transform`}
          >
            <ChevronDown size={18} className="text-muted" />
          </span>
        </button>
        {openProductSection && (
          <div className="flex flex-col gap-8">
            <ProductDetails />
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
              <label className="w-full flex flex-col gap-0.5">
                <span>Add discount (%)</span>
                <input
                  {...register("discount", { valueAsNumber: true })}
                  type="number"
                  className="pl-3 pr-4  py-2 border border-muted rounded-sm focus:outline-secondary/25 w-full"
                />
                {errors.discount && (
                  <p className="text-[14px] text-danger">
                    {errors?.discount?.message}
                  </p>
                )}
              </label>
              <label className="w-full flex flex-col gap-0.5">
                <span>Add WHT (%)</span>
                <input
                  {...register("wht", { valueAsNumber: true })}
                  type="number"
                  className="pl-3 pr-4  py-2 border border-muted rounded-sm focus:outline-secondary/25 w-full"
                />
                {errors.wht && (
                  <p className="text-[14px] text-danger">
                    {errors?.wht?.message}
                  </p>
                )}
              </label>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
