import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { useSession } from "@/lib/providers";
import { AppHeader } from "./AppHeader";

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href?: string;
    children?: ReactNode;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: () => <span data-testid="fa-icon" />,
}));

vi.mock("@/lib/providers", () => ({
  useSession: vi.fn(() => ({
    isSignedIn: false,
    user: null,
  })),
}));

const elements = {
  root: "[data-element='app-header']",
  logoLink: "[data-element='app-header-logo-link']",
  signInLink: "[data-element='app-header-sign-in-link']",
  signOutLink: "[data-element='app-header-sign-out-link']",
};

const mockUseSession = vi.mocked(useSession);

describe("AppHeader", () => {
  beforeEach(() => {
    mockUseSession.mockReset();
  });

  describe("Rendering", () => {
    it("default state", () => {
      const { container } = render(<AppHeader />);
      expect(container).toBeDefined();
      expect(container.querySelector(elements.root)).toBeInTheDocument();
      expect(container.querySelector(elements.logoLink)).toBeInTheDocument();
      expect(container.querySelector(elements.signInLink)).toBeInTheDocument();
    });

    it("shows a sign-in link details signed out", () => {
      mockUseSession.mockReturnValue({ isSignedIn: false, user: null });

      const { container } = render(<AppHeader />);

      const signInLink = screen.getByRole("link", { name: /sign in/i });
      expect(signInLink).toHaveAttribute("href", "/api/auth/signin");
      expect(container.querySelector('a[href="/api/auth/signout"]')).toBeNull();
    });

    it("shows a sign-out link details when signed in", () => {
      mockUseSession.mockReturnValue({
        isSignedIn: true,
        user: { email: "test@example.com" },
      });

      const { container } = render(<AppHeader />);

      expect(
        container.querySelector('span[aria-label="Sign out"]'),
      ).toBeTruthy();
      expect(container).toHaveTextContent("test@example.com");
      expect(screen.queryByRole("link", { name: /sign in/i })).toBeNull();
    });
  });
});
