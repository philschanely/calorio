import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SessionProviderClient, useSession } from "./SessionProvider.client";

describe("SessionProviderClient (Client Component)", () => {
  it("provides session context to children", () => {
    const sessionValue = {
      isSignedIn: true,
      user: { email: "test@example.com", name: "Test User", image: null },
    };

    render(
      <SessionProviderClient value={sessionValue}>
        <div data-testid="child">Child content</div>
      </SessionProviderClient>,
    );

    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("passes undefined user when not signed in", () => {
    const sessionValue = {
      isSignedIn: false,
      user: null,
    };

    render(
      <SessionProviderClient value={sessionValue}>
        <div data-testid="child">Child content</div>
      </SessionProviderClient>,
    );

    expect(screen.getByTestId("child")).toBeInTheDocument();
  });
});

describe("useSession hook", () => {
  it("returns session context when used within SessionProvider", () => {
    const sessionValue = {
      isSignedIn: true,
      user: {
        email: "user@example.com",
        name: "John Doe",
        image: "https://example.com/avatar.jpg",
      },
    };

    const TestComponent = () => {
      const session = useSession();
      return (
        <div>
          <div data-testid="signed-in">{String(session.isSignedIn)}</div>
          <div data-testid="user-email">{session.user?.email}</div>
          <div data-testid="user-name">{session.user?.name}</div>
        </div>
      );
    };

    render(
      <SessionProviderClient value={sessionValue}>
        <TestComponent />
      </SessionProviderClient>,
    );

    expect(screen.getByTestId("signed-in")).toHaveTextContent("true");
    expect(screen.getByTestId("user-email")).toHaveTextContent(
      "user@example.com",
    );
    expect(screen.getByTestId("user-name")).toHaveTextContent("John Doe");
  });

  it("throws error when used outside SessionProvider", () => {
    const TestComponent = () => {
      useSession();
      return <div>Test</div>;
    };

    // Suppress console.error for this test
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow("useSession must be used within a SessionProvider");

    consoleError.mockRestore();
  });

  it("returns null user when not signed in", () => {
    const sessionValue = {
      isSignedIn: false,
      user: null,
    };

    const TestComponent = () => {
      const session = useSession();
      return (
        <div>
          <div data-testid="signed-in">{String(session.isSignedIn)}</div>
          <div data-testid="user">{session.user ? "has user" : "no user"}</div>
        </div>
      );
    };

    render(
      <SessionProviderClient value={sessionValue}>
        <TestComponent />
      </SessionProviderClient>,
    );

    expect(screen.getByTestId("signed-in")).toHaveTextContent("false");
    expect(screen.getByTestId("user")).toHaveTextContent("no user");
  });

  it("allows multiple components to access same session context", () => {
    const sessionValue = {
      isSignedIn: true,
      user: { email: "shared@example.com", name: "Shared User", image: null },
    };

    const Component1 = () => {
      const session = useSession();
      return <div data-testid="comp1">{session.user?.email}</div>;
    };

    const Component2 = () => {
      const session = useSession();
      return <div data-testid="comp2">{session.user?.name}</div>;
    };

    render(
      <SessionProviderClient value={sessionValue}>
        <Component1 />
        <Component2 />
      </SessionProviderClient>,
    );

    expect(screen.getByTestId("comp1")).toHaveTextContent("shared@example.com");
    expect(screen.getByTestId("comp2")).toHaveTextContent("Shared User");
  });
});
