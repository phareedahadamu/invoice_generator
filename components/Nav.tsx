"use client";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";
import { EllipsisVertical, Loader2, Save } from "lucide-react";
import { useState, useTransition } from "react";
import { useFormContext } from "react-hook-form";
import { Invoice } from "@/app/schema";
import Toast from "./Toast";
export default function Nav() {
  const [openEllipsis, setOpenEllipsis] = useState(false);
  const [message, setMessage] = useState({ type: "", message: "", title: "" });
  const [isPendingSubmit, startTransitionSubmit] = useTransition();

  const [isPendingSave, startTransitionSave] = useTransition();

  // Form
  const {
    watch,
    formState: { isValid },
  } = useFormContext<Invoice>();

  const watchedForm = watch();

  const handleSubmitInvoice = async () => {
    if (!isValid) {
      setMessage({
        type: "error",
        message: "Please check that all required fields are filled and correct",
        title: "Form not valid",
      });
      return;
    }
    startTransitionSubmit(async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(watchedForm),
          },
        );

        const data = await response.json();
        console.log("Invoice submitted:", data);
        setMessage({
          type: "success",
          message: "Invoice sent successfully",
          title: "Success",
        });
      } catch (err) {
        setMessage({
          type: "error",
          message: "Something went wrong. Try again later",
          title: "Failed to send invoice",
        });
        console.log(err);
      }
    });
  };

  const handleSave = () => {
    startTransitionSave(() => {
      try {
        localStorage.setItem(
          "invoiceGeneratorDraft",
          JSON.stringify(watchedForm),
        );
        setMessage({
          type: "success",
          message: "Successfully saved to drafts",
          title: "Success",
        });
      } catch (err) {
        setMessage({
          type: "error",
          message: "Something went wrong. Try again later",
          title: "Failed to save to drafts",
        });
        console.log(err);
      }
    });
  };
  return (
    <nav className="fixed top-0 flex max-w-350 w-[98%] lg:w-[92%] justify-between py-1 items-center z-1000 bg-mainBg">
      <div className="flex lg:gap-4 gap-1.5 items-center">
        <div>
          <Logo size={"45px"} />
        </div>
        <span>Create Invoice</span>
      </div>
      <div className="flex gap-4  items-center">
        <button
          disabled={isPendingSave}
          onClick={() => {
            handleSave();
          }}
          className=" hidden lg:block rounded-md px-4 py-2 leading-tight text-text-secondary border border-text-secondary duration-200 transition-colors hover:border-secondary cursor-pointer hover:text-secondary"
        >
          Save as draft
        </button>
        <button
          disabled={isPendingSave}
          onClick={() => {
            handleSave();
          }}
          className="block lg:hidden rounded-md  text-text-secondary  duration-200 transition-colors  cursor-pointer hover:text-secondary "
        >
          <Save size={24} />
        </button>
        <button
          disabled={isPendingSubmit}
          className="bg-primary rounded-md px-4 py-2 text-mainBg leading-tight duration-200 transition-colors hover:bg-primary-hover cursor-pointer diabled:cursor-not-allowed disabled:opacity-50 min-w-[121.34px] flex justify-center items-center"
          onClick={() => {
            handleSubmitInvoice();
          }}
        >
          {isPendingSubmit ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            "Send invoice"
          )}
        </button>
        <div
          tabIndex={0}
          role="button"
          onClick={() => {
            setOpenEllipsis(true);
          }}
          onBlur={(e: React.FocusEvent<HTMLDivElement>) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
              setOpenEllipsis(false);
            } else {
              setTimeout(() => {
                setOpenEllipsis(false);
              }, 1000);
            }
          }}
          className={`${openEllipsis ? "bg-muted/25" : ""} cursor-pointer p-1 rounded-md hover:bg-muted/25 duration-200 transition-colors`}
        >
          <div className="relative">
            <span>
              <EllipsisVertical size={24} className="text-text-secondary" />
            </span>
            {openEllipsis && (
              <div className="absolute -bottom-3 right-0 bg-surface translate-y-full py-3 px-5 rounded-md flex text-nowrap gap-6 border-muted/25 border cursor-default">
                <span className="text-[14px]">Toggle Theme</span>
                <ThemeToggle />
              </div>
            )}
          </div>
        </div>
      </div>
      {message.type !== "" && (
        <Toast
          type={message.type === "success" ? "success" : "error"}
          title={message.title}
          message={message.message}
          closeToast={() => {
            setMessage({ type: "", message: "", title: "" });
          }}
        />
      )}
    </nav>
  );
}
