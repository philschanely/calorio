import { describe, expect, it, vi, beforeEach } from "vitest";
import type { Session } from "next-auth";
import { getServerSession } from "next-auth";
import { SessionProvider } from "./SessionProvider";

// Mock next-auth
vi.mock("next-auth", () => ({
  getServerSession: vi.fn(),
}));

vi.mock("@/lib/auth.server", () => ({
  authOptions: {
    providers: [],
  },
}));

const mockGetServerSession = vi.mocked(getServerSession);

describe("SessionProvider Component Integration", () => {
  beforeEach(() => {
    mockGetServerSession.mockReset();
  });

  it("renders SessionProviderClient with session context when user is signed in", async () => {
    mockGetServerSession.mockResolvedValue({
      user: {
        email: "component@example.com",
        name: "Component Test User",
        image: null,
      },
      expires: new Date().toISOString(),
    } as Session);

    // SessionProvider is an async component that returns JSX
    const component = await SessionProvider({
      children: <div data-testid="test-child">Child Content</div>,
    });

    // Verify that the component returns a JSX element (ReactElement)
    expect(component).toBeDefined();
    expect(component.type).toBeDefined();
  });

  it("renders SessionProviderClient with null user when not signed in", async () => {
    mockGetServerSession.mockResolvedValue(null);

    const component = await SessionProvider({
      children: <div>Child Content</div>,
    });

    expect(component).toBeDefined();
    expect(component.type).toBeDefined();
  });

  it("passes children through to SessionProviderClient", async () => {
    mockGetServerSession.mockResolvedValue(null);

    const testChild = <div data-testid="my-child">Test Content</div>;

    const component = await SessionProvider({
      children: testChild,
    });

    // Verify component was created and should render children
    expect(component).toBeDefined();
    expect(component.props).toBeDefined();
    expect(component.props.children).toBeDefined();
  });

  it("fetches session during render", async () => {
    mockGetServerSession.mockResolvedValue({
      user: { email: "fetch@example.com" },
      expires: new Date().toISOString(),
    } as Session);

    await SessionProvider({
      children: <div>Child</div>,
    });

    // Verify getServerSession was called during component render
    expect(mockGetServerSession).toHaveBeenCalled();
  });

  it("creates SessionProviderClient component with correct props", async () => {
    mockGetServerSession.mockResolvedValue({
      user: {
        email: "props@example.com",
        name: "Props Test",
      },
      expires: new Date().toISOString(),
    } as Session);

    const component = await SessionProvider({
      children: <div>Child</div>,
    });

    // Verify the component has the expected structure
    expect(component.type.name).toBe("SessionProviderClient");
    expect(component.props.value).toBeDefined();
    expect(component.props.value.isSignedIn).toBe(true);
    expect(component.props.value.user?.email).toBe("props@example.com");
  });
});
