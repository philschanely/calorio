import { PropsWithChildren, ReactNode } from "react";

export type ModalProps = PropsWithChildren<{
  description?: ReactNode;
  footer?: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
}>;

export type UseModalReturn = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  props: ModalProps;
};
