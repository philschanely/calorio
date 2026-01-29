"use client";

import { useState } from "react";
import { ModalProps, UseModalReturn } from "./Modal.types";

export const useModal = (props?: Partial<ModalProps>): UseModalReturn => {
  const [isOpen, setIsOpen] = useState(props?.isOpen ?? false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return {
    isOpen,
    open,
    close,
    props: {
      ...props,
      isOpen,
      onClose: close,
    },
  };
};
