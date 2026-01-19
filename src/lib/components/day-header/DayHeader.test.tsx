import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DayHeader } from "./DayHeader";

const elements = {
  root: "[data-element='day-header']",
  backWrapper: "[data-element='day-header-back-wrapper']",
  labelWrapper: "[data-element='day-header-label-wrapper']",
  label: "[data-element='day-header-label']",
  nextWrapper: "[data-element='day-header-next-wrapper']",
};

describe("Icon Component", () => {
  describe("Rendering", () => {
    it("default state", () => {
      const { container } = render(<DayHeader />);
      expect(container.querySelector(elements.root)).toBeInTheDocument();
      expect(container.querySelector(elements.backWrapper)).toBeInTheDocument();
      expect(
        container.querySelector(elements.labelWrapper),
      ).toBeInTheDocument();
      expect(container.querySelector(elements.label)).toBeInTheDocument();
      expect(container.querySelector(elements.nextWrapper)).toBeInTheDocument();
    });
  });
});
