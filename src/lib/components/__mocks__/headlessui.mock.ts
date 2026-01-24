import React, { PropsWithChildren } from "react";

/**
 * Shared HeadlessUI component mocks for testing
 * These mocks simplify HeadlessUI components for unit testing while maintaining
 * the necessary props and data-element attributes for DOM querying
 */

export const createHeadlessUIDialogMock = () => ({
  Dialog: ({
    children,
    open,
    as: Component,
    className,
    ...props
  }: PropsWithChildren<{
    open: boolean;
    onClose: () => void;
    className?: string;
    as?: React.ComponentType<Record<string, unknown>>;
  }>) => {
    const Wrapper = Component || "div";
    return open
      ? React.createElement(
          Wrapper,
          {
            "data-element": "dialog",
            className,
            ...props,
            key: "dialog",
          },
          children,
        )
      : null;
  },

  DialogBackdrop: ({
    children,
    as: Component,
    className,
    ...props
  }: PropsWithChildren<{
    className?: string;
    as?: React.ComponentType<Record<string, unknown>>;
  }>) => {
    const Wrapper = Component || "div";
    return React.createElement(
      Wrapper,
      {
        "data-element": "dialog-backdrop",
        className,
        ...props,
        key: "dialog-backdrop",
      },
      children,
    );
  },

  DialogPanel: ({
    children,
    as: Component,
    className,
    ...props
  }: PropsWithChildren<{
    className?: string;
    as?: React.ComponentType<Record<string, unknown>>;
  }>) => {
    const Wrapper = Component || "div";
    return React.createElement(
      Wrapper,
      {
        "data-element": "dialog-panel",
        className,
        ...props,
        key: "dialog-panel",
      },
      children,
    );
  },

  DialogTitle: ({ children }: PropsWithChildren) =>
    React.createElement(
      "div",
      {
        "data-element": "dialog-title",
        key: "dialog-title",
      },
      children,
    ),

  Description: ({ children }: PropsWithChildren) =>
    React.createElement(
      "div",
      {
        "data-element": "dialog-description",
        key: "dialog-description",
      },
      children,
    ),

  Tab: ({
    children,
    className,
    ...props
  }: PropsWithChildren<Record<string, unknown>>) =>
    React.createElement(
      "div",
      {
        "data-element": "tab",
        className,
        ...props,
        key: "tab",
      },
      children,
    ),

  TabGroup: ({
    children,
    className,
    ...props
  }: PropsWithChildren<Record<string, unknown>>) =>
    React.createElement(
      "div",
      {
        "data-element": "tab-group",
        className,
        ...props,
        key: "tab-group",
      },
      children,
    ),

  TabList: ({
    children,
    className,
    ...props
  }: PropsWithChildren<Record<string, unknown>>) =>
    React.createElement(
      "div",
      {
        "data-element": "tab-list",
        className,
        ...props,
        key: "tab-list",
      },
      children,
    ),

  TabPanel: ({
    children,
    className,
    ...props
  }: PropsWithChildren<Record<string, unknown>>) =>
    React.createElement(
      "div",
      {
        "data-element": "tab-panel",
        className,
        ...props,
        key: "tab-panel",
      },
      children,
    ),

  TabPanels: ({
    children,
    className,
    ...props
  }: PropsWithChildren<Record<string, unknown>>) =>
    React.createElement(
      "div",
      {
        "data-element": "tab-panels",
        className,
        ...props,
        key: "tab-panels",
      },
      children,
    ),
});
