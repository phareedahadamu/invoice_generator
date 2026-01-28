"use client";
import Logo from "./Logo";
import { useFormContext } from "react-hook-form";
import { Invoice } from "@/app/schema";
import { useRef } from "react";
import { Download } from "lucide-react";
import { useReactToPrint } from "react-to-print";

export default function Preview() {
  // Form
  const {
    watch,
    formState: { isValid },
  } = useFormContext<Invoice>();
  //   );
  const watchedForm = watch();

  const itemRows = watchedForm.items.map((item, index) => (
    <tr key={index} className="relative">
      <td className={`px-3 py-3 `}>{item.description}</td>
      <td className="px-3">{item.quantity ?? 1}</td>
      <td className={`px-3 text-center`}>
        {watchedForm.currency + " "}
        {item.price ?? 0}
      </td>
      <td className="text-center">
        {watchedForm.currency + " " + item.price * item.quantity}
      </td>
    </tr>
  ));
  const subTotal = watchedForm.items?.reduce((sum, item) => {
    const price = Number(item?.price ?? 0);
    const qty = Number(item?.quantity ?? 1);

    return sum + price * qty;
  }, 0);

  const whtAAmount = watchedForm.wht ? (watchedForm.wht / 100) * subTotal : 0;
  const discountAmount = watchedForm.discount
    ? (watchedForm.discount / 100) * subTotal
    : 0;
  const vatAmount = subTotal * 0.075;
  const total = subTotal + whtAAmount + vatAmount - discountAmount;

  const pageRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: pageRef,
    documentTitle: "Invoice",
  });

  return (
    <div className="w-full flex flex-col gap-2 text-[8px] bg-muted/25 h-full pt-4 lg:px-5 px-3 rounded-md ">
      <div className=" text-[14px] w-full flex justify-between items-center  p-1  border-b border-b-muted leading-10 text-4 font-semibold">
        Preview
        <button
          onClick={handlePrint}
          className="cursor-pointer disabled:cursor-not-allowed duration-200 transition-colors hover:text-secondary disabled:opacity-50 disabled:hover:text-inherit"
          disabled={!isValid}
        >
          <Download size={16} />
        </button>
      </div>
      <div className="w-full p-6 h-full flex justify-center">
        <div
          ref={pageRef}
          className="bg-surface  print:w-[210mm] print:h-[297mm] w-full h-full flex flex-col   p-4 gap-5 "
        >
          <div className="flex w-full justify-between pb-1.5 border-b border-b-muted/25">
            <div className="flex gap-1 items-center">
              <Logo size={"20px"} />
              <span className=" font-medium">UberMinx</span>
            </div>
            <span className="font-medium text-text-secondary">
              {"INV" + " " + watchedForm.invoiceNumber}
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-1.5">
              <p className="flex flex-col font-medium">
                <span className="text-text-secondary font-normal">Name</span>
                {watchedForm.name}
              </p>
              <p className="flex flex-col font-medium">
                <span className="text-text-secondary font-normal">Phone</span>
                {watchedForm.phoneNumber}
              </p>
              <p className="flex flex-col font-medium">
                <span className="text-text-secondary font-normal">Email</span>
                {watchedForm.email}
              </p>
              <p className="flex flex-col font-medium">
                <span className="text-text-secondary font-normal">
                  Billing Address
                </span>
                {watchedForm.address}
              </p>
              <p className="flex flex-col font-medium">
                <span className="text-text-secondary font-normal">Date</span>
                {watchedForm.date}
              </p>
              <p className="flex flex-col font-medium">
                <span className="text-text-secondary font-normal">
                  Due Date
                </span>
                {watchedForm.dueDate}
              </p>
            </div>
            <table className="table-fixed text-1">
              <colgroup>
                <col className="w-[50%]" />
                <col className="w-[10%] " />
                <col className="w-[20%]" />
                <col className="w-[20%]" />
              </colgroup>
              <thead className=" text-text-secondary">
                <tr>
                  <th className=" text-start py-1 pl-1 font-medium bg-muted/25">
                    Description
                  </th>
                  <th className="font-medium bg-muted/25">Qty</th>
                  <th className="font-medium bg-muted/25">Price</th>
                  <th className="font-medium bg-muted/25">Amount</th>
                </tr>
              </thead>
              <tbody>
                {itemRows}
                <tr>
                  <td colSpan={3} className="text-end pr-4 text-text-secondary">
                    Sub Total
                  </td>
                  <td className="text-text-secondary text-center">
                    {watchedForm.currency + " " + subTotal}
                  </td>
                </tr>
                <tr>
                  <td colSpan={3} className="text-end pr-4 text-text-secondary">
                    VAT (7.5%)
                  </td>
                  <td className="text-text-secondary text-center">
                    {watchedForm.currency + " " + subTotal * 0.075}
                  </td>
                </tr>
                {watchedForm.discount > 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="text-end pr-4 text-text-secondary"
                    >
                      {"Discount " + watchedForm.discount + "%"}
                    </td>
                    <td className="text-text-secondary text-center">
                      {watchedForm.currency +
                        " " +
                        subTotal * (watchedForm.discount / 100)}
                    </td>
                  </tr>
                )}
                {watchedForm.wht > 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="text-end pr-4 text-text-secondary"
                    >
                      {"WHT (" + watchedForm.wht + "%)"}
                    </td>
                    <td className="text-text-secondary text-center">
                      {watchedForm.currency +
                        " " +
                        subTotal * (watchedForm.wht / 100)}
                    </td>
                  </tr>
                )}
                <tr>
                  <td colSpan={3} className="text-end pr-4 pt-4 font-semibold">
                    Total
                  </td>
                  <td className="pt-4 text-center">
                    {watchedForm.currency + " " + total}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
