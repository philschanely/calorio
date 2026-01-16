import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Logo } from "./Logo";

describe("Logo", () => {
  it("renders with accessible label and an svg", () => {
    render(<Logo />);

    const logo = screen.getByLabelText(/calorio/i);
    expect(logo).toBeInTheDocument();
    expect(logo.querySelector("svg")).toBeTruthy();
    expect(logo.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("applies the default size classes when no size is provided", () => {
    render(<Logo />);

    const logo = screen.getByLabelText(/calorio/i);

    // Display3 is the default variant which includes these classes
    expect(logo).toHaveClass("w-[104px]");
    expect(logo).toHaveClass("h-[88px]");
  });

  it('applies the "fluid" size classes when size="fluid" is provided', () => {
    render(<Logo size="fluid" />);

    const logo = screen.getByLabelText(/calorio/i);
    expect(logo).toHaveClass("w-full");
    expect(logo).toHaveClass("h-auto");
  });

  it("applies a different size variant when provided", () => {
    render(<Logo size="Display1" />);

    const logo = screen.getByLabelText(/calorio/i);
    expect(logo).toHaveClass("w-[170px]");
    expect(logo).toHaveClass("h-[136px]");
  });
});
