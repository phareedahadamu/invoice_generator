"use client";
import { X, CircleAlert, CircleCheck } from "lucide-react";

export default function Toast({
  type,
  title,
  message,
  closeToast,
}: {
  type: "success" | "error";
  title: string;
  message?: string;
  closeToast?: () => void;
}) {
  return (
    <div
      className={`${
        type === "success"
          ? "border-success"
          : type === "error"
            ? "border-danger"
            : ""
      } bg-surface flex gap-6 max-w-112.5 w-[98%] rounded-md p-4 fixed bottom-4 right-4 shadow-md items-center border-l-[5px] `}
    >
      {type === "success" ? (
        <CircleCheck size="36" className="fill-success text-surface" />
      ) : type === "error" ? (
        <CircleAlert size="36" className="fill-danger text-surface" />
      ) : null}
      <div className="flex flex-col gap-1 grow">
        <p className="font-medium">{title}</p>
        {message && <p className="text-[14px]">{message}</p>}
      </div>
      {closeToast && (
        <button
          className="cursor-pointer"
          onClick={() => {
            closeToast();
          }}
        >
          <X className="text-muted" size="18" />
        </button>
      )}
    </div>
  );
}
