import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import * as tokenModule from "@/lib/tokens";
import type { TokenIcon, TokenSpacing } from "@/lib/tokens";
import { Icon } from "./Icon";

// Mock the getFAIcon function
vi.mock("@/lib/tokens", () => ({
  getFAIcon: vi.fn((icon) => {
    // Return a mock icon definition for valid icons
    if (icon === "ARROW_RIGHT_FROM_BRACKET") {
      return {
        prefix: "fas",
        iconName: "arrow-right-from-bracket",
        icon: [512, 512, [], "", ""],
      };
    }
    if (icon === "CHEVRON_DOWN") {
      return {
        prefix: "fas",
        iconName: "chevron-down",
        icon: [512, 512, [], "", ""],
      };
    }
    // Return null for invalid icons
    return null;
  }),
}));

// Mock FontAwesomeIcon component
vi.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: ({
    icon,
    className,
  }: {
    icon: IconDefinition;
    className: string;
  }) => (
    <i data-testid="fa-icon" className={className} data-icon={icon?.iconName} />
  ),
}));

const element = "[data-element='icon']";
const attrs = {
  icon: "data-icon",
  size: "data-icon-size",
};

describe("Icon Component", () => {
  describe("Rendering", () => {
    it("default state", () => {
      const { container } = render(<Icon icon="ARROW_RIGHT_FROM_BRACKET" />);

      const el = container.querySelector(element);
      expect(el).toBeInTheDocument();
      expect(el?.tagName).toBe("SPAN");
      expect(el).toHaveAttribute(attrs.size, "F");
      expect(el).toHaveClass("size-f");
      expect(el).toHaveAttribute(attrs.icon, "ARROW_RIGHT_FROM_BRACKET");

      const faIcon = screen.getByTestId("fa-icon");
      expect(faIcon).toBeInTheDocument();
      expect(faIcon).toHaveAttribute("data-icon", "arrow-right-from-bracket");

      expect(el).not.toHaveAttribute("aria-label");
    });

    it("sets aria-label when label prop is provided", () => {
      render(<Icon icon="ARROW_RIGHT_FROM_BRACKET" label="Sign Out" />);

      const span = screen.getByLabelText("Sign Out");
      expect(span).toBeInTheDocument();
    });

    it("does not render FontAwesomeIcon when icon is invalid", () => {
      const invalidIcon = "INVALID_ICON" as unknown as TokenIcon;
      render(<Icon icon={invalidIcon} />);

      const faIcon = screen.queryByTestId("fa-icon");
      expect(faIcon).not.toBeInTheDocument();
    });

    it("calls getFAIcon with the provided icon prop", () => {
      render(<Icon icon="CHEVRON_DOWN" />);

      expect(tokenModule.getFAIcon).toHaveBeenCalledWith("CHEVRON_DOWN");
    });

    it("applies icon class constraints to FontAwesomeIcon", () => {
      render(<Icon icon="ARROW_RIGHT_FROM_BRACKET" />);

      const faIcon = screen.getByTestId("fa-icon");
      expect(faIcon).toHaveClass(
        "h-full",
        "w-full",
        "max-w-[78.4%]",
        "max-h-[78.4%]",
      );
    });
  });

  describe("Variants", () => {
    it("applies different size variants correctly", () => {
      const sizeExpectations: Record<TokenSpacing, string | null> = {
        NONE: null, // NONE variant doesn't add a class
        AA: "size-a", // AA maps to size-a
        A: "size-a",
        B: "size-b",
        C: "size-c",
        D: "size-d",
        E: "size-e",
        F: "size-f",
        G: "size-g",
        H: "size-h",
        I: "size-i",
        J: "size-j",
        K: "size-k",
        L: "size-l",
        M: "size-m",
        N: "size-n",
      };

      Object.entries(sizeExpectations).forEach(([size, expectedClass]) => {
        const { container, unmount } = render(
          <Icon icon="ARROW_RIGHT_FROM_BRACKET" size={size as TokenSpacing} />,
        );

        const span = container.querySelector(element);

        if (expectedClass) {
          expect(span).toHaveClass(expectedClass);
          expect(span).toHaveAttribute(attrs.size, size);
        }
        unmount();
      });
    });
    it("works with different valid icon types", () => {
      const icons = ["ARROW_RIGHT_FROM_BRACKET", "CHEVRON_DOWN"] as const;

      icons.forEach((icon) => {
        const { unmount } = render(<Icon icon={icon} />);

        expect(tokenModule.getFAIcon).toHaveBeenCalledWith(icon);
        unmount();
      });
    });
  });
});
