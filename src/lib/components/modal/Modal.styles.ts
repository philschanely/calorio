import { tv } from "tailwind-variants";

export const modalStyles = tv({
  slots: {
    backdrop: "fixed inset-[0] bg-quartz-600/50 backdrop-blur-lg",
    body: "",
    closeBtn: "",
    footer: "",
    header: "flex gap-d",
    headerContent: "flex-1 flex flex-col gap-a",
    panel: "w-full max-w-[400px] rounded-g flex flex-col gap-d relative z-10",
    root: "fixed z-100 flex flex-col items-center justify-center inset-[0] border border-ruby-300",
  },
});
