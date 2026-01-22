import { tv } from "tailwind-variants";

export const dashboardStyles = tv({
  slots: {
    badgeControls: "flex gap-d items-end",
    badgeWrapper: "flex-1",
    listWrapper: "w-full",
    root: "flex flex-col gap-f w-full max-w-[360px] justify-start items-center",
  },
});

export const dashboardEntryListsStyles = tv({
  slots: {
    root: "w-full flex flex-col gap-d",
    tab: `
      flex flex-1 text-center flex-col gap-b outline-none
      text-quartz-200 cursor-pointer
    `,
    tabPanel: "w-full flex flex-col gap-d justify-start",
    underline: "block border-none h-a bg-current rounded-full w-full",
  },
});
