import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Logo } from "./Logo";

describe("Logo", () => {
  describe("Rendering", () => {
    it("default state", () => {
      render(<Logo />);

      const logo = screen.getByLabelText(/calorio/i);
      expect(logo).toBeInTheDocument();
      expect(logo.querySelector("svg")).toBeTruthy();
      expect(logo.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
      expect(logo).toHaveAttribute("data-logo-size", "Display3");
      expect(logo).toHaveClass("w-[104px]");
      expect(logo).toHaveClass("h-[88px]");
    });
  });

  describe("Variants", () => {
    it('applies the "fluid" size classes when size="fluid" is provided', () => {
      render(<Logo size="fluid" />);

      const logo = screen.getByLabelText(/calorio/i);
      expect(logo).toHaveAttribute("data-logo-size", "fluid");
      expect(logo).toHaveClass("w-full");
      expect(logo).toHaveClass("h-auto");
    });

    it("applies a different size variant when provided", () => {
      render(<Logo size="Display1" />);

      const logo = screen.getByLabelText(/calorio/i);
      expect(logo).toHaveAttribute("data-logo-size", "Display1");
      expect(logo).toHaveClass("w-[170px]");
      expect(logo).toHaveClass("h-[136px]");
    });
  });
});
