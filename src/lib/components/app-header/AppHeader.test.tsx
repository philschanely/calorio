import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import type { ReactNode } from "react";
import { AppHeader } from "./AppHeader";
import { useSession } from "@/lib/providers";

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
  useSession: vi.fn(),
}));

const mockUseSession = vi.mocked(useSession);

describe("AppHeader", () => {
  beforeEach(() => {
    mockUseSession.mockReset();
  });

  it("shows a sign-in link when signed out", () => {
    mockUseSession.mockReturnValue({ isSignedIn: false, user: null });

    const { container } = render(<AppHeader />);

    const signInLink = screen.getByRole("link", { name: /sign in/i });
    expect(signInLink).toHaveAttribute("href", "/api/auth/signin");
    expect(container.querySelector('a[href="/api/auth/signout"]')).toBeNull();
  });

  it("shows a sign-out link when signed in", () => {
    mockUseSession.mockReturnValue({
      isSignedIn: true,
      user: { email: "test@example.com" },
    });

    const { container } = render(<AppHeader />);

    expect(container.querySelector('a[href="/api/auth/signout"]')).toBeTruthy();
    expect(screen.queryByRole("link", { name: /sign in/i })).toBeNull();
  });
});
