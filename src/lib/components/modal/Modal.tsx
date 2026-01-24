"use client";

import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import * as motion from "motion/react-client";
import { ModalProps } from "./Modal.types";
import { AnimatePresence } from "motion/react";
import { IconButton } from "../icon-button";
import { modalStyles } from "./Modal.styles";
import { TextDisplay3 } from "../text";
import { getSwatchbookColorWithOpacity } from "@/lib/tokens";

export const Modal = ({
  children,
  description,
  footer,
  isOpen,
  onClose,
  title,
}: ModalProps) => {
  const {
    backdrop,
    body,
    closeBtn,
    footer: footerCn,
    header,
    headerContent,
    panel,
    root,
  } = modalStyles();
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          as={motion.div}
          className={root()}
          data-element="modal"
          onClose={onClose}
          open={isOpen}
          static
        >
          <DialogBackdrop
            as={motion.div}
            data-element="modal-backdrop"
            className={backdrop()}
            initial={{
              backdropFilter: "blur(0px)",
              backgroundColor: "transparent",
            }}
            animate={{
              backdropFilter: "blur(20px)",
              backgroundColor: getSwatchbookColorWithOpacity("QUARTZ_600", 0.5),
            }}
            exit={{
              backdropFilter: "blur(0px)",
              backgroundColor: "transparent",
            }}
          />
          <DialogPanel
            as={motion.div}
            data-element="modal-panel"
            className={panel()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className={header()} data-element="modal-header">
              <div className={headerContent()}>
                {title && (
                  <DialogTitle>
                    {typeof title === "string" ? (
                      <TextDisplay3>{title}</TextDisplay3>
                    ) : (
                      title
                    )}
                  </DialogTitle>
                )}
                {description && <Description>{description}</Description>}
              </div>
              <div className={closeBtn()} data-element="modal-close-btn">
                <IconButton ghost icon="XMARK" onClick={onClose} />
              </div>
            </div>
            {children && (
              <div className={body()} data-element="modal-body">
                {children}
              </div>
            )}
            {footer && (
              <div className={footerCn()} data-element="modal-footer">
                {footer}
              </div>
            )}
          </DialogPanel>
        </Dialog>
      )}
    </AnimatePresence>
  );
};
