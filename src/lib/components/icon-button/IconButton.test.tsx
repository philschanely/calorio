import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { IconButton } from "./IconButton";
import userEvent from "@testing-library/user-event";

const elements = {
  root: '[data-element="icon-button"]',
  icon: '[data-element="icon"]',
};

describe("IconButton component", () => {
  describe("Rendering", () => {
    it("default state", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      const { container } = render(
        <IconButton icon="CHEVRON_DOWN" onClick={onClick}>
          Icon Button text
        </IconButton>,
      );

      const root = container.querySelector(elements.root);
      expect(root).toBeInTheDocument();
      expect(root).not.toBeDisabled();
      expect(root).toHaveAccessibleName("Icon Button text");

      const icon = container.querySelector(elements.icon);
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("data-icon", "CHEVRON_DOWN");

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
        <IconButton icon="CHEVRON_DOWN" disabled onClick={onClick}>
          Icon Button text
        </IconButton>,
      );
      const root = container.querySelector(elements.root);
      expect(root).toBeInTheDocument();
      expect(root).toBeDisabled();
      if (root) {
        await user.click(root);
        expect(onClick).toHaveBeenCalledTimes(0);
      }
    });
  });
});
