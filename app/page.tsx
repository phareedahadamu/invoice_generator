"use client";
import Nav from "@/components/Nav";
import { useState, useEffect, useEffectEvent } from "react";
import {
  ThemeContext,
  ThemeOptions,
  themeOptions,
  useGetDate,
} from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { InvoiceSchema, Invoice } from "./schema";
import Details from "@/components/Details";
import Preview from "@/components/Preview";

export default function MainPage() {
  const [theme, setTheme] = useState<ThemeOptions | null>(null);
  const value = { theme, setTheme };

  const currentDate = useGetDate();
  const methods = useForm<Invoice>({
    resolver: zodResolver(InvoiceSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: undefined,
      address: "",
      invoiceNumber: "",
      date: "",
      dueDate: "",
      currency: "₦",
      items: [{ description: "", quantity: 1, price: 0 }],
      wht: 0,
      discount: 0,
    },
    mode: "all",
  });
  const { reset, getValues } = methods;

  // Effects
  const setThemeEvent = useEffectEvent((storedTheme: ThemeOptions | string) => {
    setTheme(storedTheme as ThemeOptions);
  });

  useEffect(() => {
    if (theme === null) {
      const storedTheme = localStorage.getItem("invoiceGeneratorTheme");
      if (storedTheme && themeOptions.includes(storedTheme as ThemeOptions))
        setThemeEvent(storedTheme as ThemeOptions);
      else setThemeEvent("light");
    } else {
      localStorage.setItem("invoiceGeneratorTheme", theme);
    }
  }, [theme]);

  useEffect(() => {
    reset({ ...getValues(), date: currentDate, dueDate: currentDate });
  }, [currentDate, reset, getValues]);
  return (
    <ThemeContext value={value}>
      <FormProvider {...methods}>
        <main
          className={`w-full ${theme as string} bg-mainBg min-h-screen flex justify-center text-text-primary`}
        >
          <div className="flex max-w-350 w-[98%] lg:w-[92%] pt-17 pb-6 flex-col gap-6">
            <Nav />
            <div className="flex w-full  gap-4">
              <section className="lg:basis-[50%] basis-full h-[calc(100dvh-110px)] overflow-y-auto">
                <Details currentDate={currentDate} />
              </section>
              <section className="basis-[50%]   h-[calc(100dvh-110px)]">
                <Preview />
              </section>
            </div>
          </div>
        </main>
      </FormProvider>
    </ThemeContext>
  );
}
