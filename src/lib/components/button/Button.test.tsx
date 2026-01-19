import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button";
import userEvent from "@testing-library/user-event";

const elements = {
  iconRightWrapper: '[data-element="button-icon-right-wrapper"]',
  iconWrapper: '[data-element="button-icon-wrapper"]',
  root: '[data-element="button"]',
  text: '[data-element="button-text"]',
};

describe("Button component", () => {
  describe("Rendering", () => {
    it("default state", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      const { container } = render(
        <Button onClick={onClick}>Button text</Button>,
      );

      const root = container.querySelector(elements.root);
      expect(root).toBeInTheDocument();
      expect(root).not.toBeDisabled();

      expect(
        container.querySelector(elements.iconWrapper),
      ).not.toBeInTheDocument();
      expect(
        container.querySelector(elements.iconRightWrapper),
      ).not.toBeInTheDocument();

      expect(container.querySelector(elements.text)).toBeInTheDocument();
      expect(screen.getByText("Button text")).toBeInTheDocument();

      if (root) {
        await user.click(root);
        expect(onClick).toHaveBeenCalledTimes(1);
      }
    });
  });

  describe("Variants", () => {
    it("disabled", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      const { container } = render(
        <Button icon="CHEVRON_DOWN" disabled onClick={onClick}>
          Button text
        </Button>,
      );
      const root = container.querySelector(elements.root);
      expect(root).toBeInTheDocument();
      expect(root).toBeDisabled();
      if (root) {
        await user.click(root);
        expect(onClick).toHaveBeenCalledTimes(0);
      }
    });

    it("with left icon", () => {
      const { container } = render(
        <Button icon="CHEVRON_DOWN">Button text</Button>,
      );
      expect(container.querySelector(elements.root)).toBeInTheDocument();
      expect(container.querySelector(elements.iconWrapper)).toBeInTheDocument();
      expect(
        container.querySelector(elements.iconRightWrapper),
      ).not.toBeInTheDocument();
      expect(container.querySelector(elements.text)).toBeInTheDocument();
      expect(screen.getByText("Button text")).toBeInTheDocument();
    });

    it("with right icon", () => {
      const { container } = render(
        <Button iconRight="CHEVRON_DOWN">Button text</Button>,
      );
      expect(container.querySelector(elements.root)).toBeInTheDocument();
      expect(
        container.querySelector(elements.iconWrapper),
      ).not.toBeInTheDocument();
      expect(
        container.querySelector(elements.iconRightWrapper),
      ).toBeInTheDocument();
      expect(container.querySelector(elements.text)).toBeInTheDocument();
      expect(screen.getByText("Button text")).toBeInTheDocument();
    });

    it("with both icons", () => {
      const { container } = render(
        <Button icon="CHEVRON_DOWN" iconRight="CHEVRON_DOWN">
          Button text
        </Button>,
      );
      expect(container.querySelector(elements.root)).toBeInTheDocument();
      expect(container.querySelector(elements.iconWrapper)).toBeInTheDocument();
      expect(
        container.querySelector(elements.iconRightWrapper),
      ).toBeInTheDocument();
      expect(container.querySelector(elements.text)).toBeInTheDocument();
      expect(screen.getByText("Button text")).toBeInTheDocument();
    });
  });
});
