import { PropsWithChildren, ReactNode } from "react";

export type ModalProps = PropsWithChildren<{
  description?: ReactNode;
  footer?: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
}>;
