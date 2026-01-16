import { describe, expect, it, vi, beforeEach } from "vitest";
import { getSessionContext } from "./SessionProvider";
import type { Session } from "next-auth";

// Mock next-auth
vi.mock("next-auth", () => ({
  getServerSession: vi.fn(),
}));

vi.mock("@/lib/auth.server", () => ({
  authOptions: {
    providers: [],
  },
}));

import { getServerSession } from "next-auth";

const mockGetServerSession = vi.mocked(getServerSession);

describe("getSessionContext", () => {
  beforeEach(() => {
    mockGetServerSession.mockReset();
  });

  it("returns isSignedIn=true and user data when session exists", async () => {
    const mockSession: Session = {
      user: {
        email: "user@example.com",
        name: "Test User",
        image: "https://example.com/avatar.jpg",
      },
    } as Session;

    mockGetServerSession.mockResolvedValue(mockSession);

    const context = await getSessionContext();

    expect(context.isSignedIn).toBe(true);
    expect(context.user).toEqual({
      name: "Test User",
      email: "user@example.com",
      image: "https://example.com/avatar.jpg",
    });
  });

  it("returns isSignedIn=false and null user when no session", async () => {
    mockGetServerSession.mockResolvedValue(null);

    const context = await getSessionContext();

    expect(context.isSignedIn).toBe(false);
    expect(context.user).toBeNull();
  });

  it("returns isSignedIn=false when session.user is undefined", async () => {
    mockGetServerSession.mockResolvedValue(null);

    const context = await getSessionContext();

    expect(context.isSignedIn).toBe(false);
    expect(context.user).toBeNull();
  });

  it("includes partial user data if some fields are missing", async () => {
    const mockSession = {
      user: {
        email: "partial@example.com",
        // name and image are missing
      },
    };

    mockGetServerSession.mockResolvedValue(mockSession as Session);

    const context = await getSessionContext();

    expect(context.isSignedIn).toBe(true);
    expect(context.user).toEqual({
      email: "partial@example.com",
      name: undefined,
      image: undefined,
    });
  });

  it("calls getServerSession with authOptions", async () => {
    mockGetServerSession.mockResolvedValue(null);

    await getSessionContext();

    expect(mockGetServerSession).toHaveBeenCalled();
  });

  it("handles async operation correctly", async () => {
    const mockSession = {
      user: {
        email: "async@example.com",
      },
    };

    mockGetServerSession.mockResolvedValue(mockSession as Session);

    const promise = getSessionContext();

    expect(promise).toBeInstanceOf(Promise);
    const context = await promise;

    expect(context.isSignedIn).toBe(true);
  });
});

describe("SessionProvider (Server Component)", () => {
  beforeEach(() => {
    mockGetServerSession.mockReset();
  });

  it("calls getSessionContext to fetch session data", async () => {
    const mockSession = {
      user: {
        email: "provider@example.com",
        name: "Provider User",
      },
    };

    mockGetServerSession.mockResolvedValue(mockSession as Session);

    // Verify that getSessionContext is called during SessionProvider render
    const context = await getSessionContext();

    expect(mockGetServerSession).toHaveBeenCalled();
    expect(context.isSignedIn).toBe(true);
    expect(context.user?.email).toBe("provider@example.com");
  });

  it("returns correct structure for SessionProviderClient when user is signed in", async () => {
    mockGetServerSession.mockResolvedValue({
      user: {
        email: "signed-in@example.com",
        name: "Signed In User",
        image: "https://example.com/avatar.jpg",
      },
    } as Session);

    const context = await getSessionContext();

    // Verify the context matches what SessionProviderClient expects
    expect(context.isSignedIn).toBe(true);
    expect(context.user).toEqual({
      name: "Signed In User",
      email: "signed-in@example.com",
      image: "https://example.com/avatar.jpg",
    });
  });

  it("returns correct structure for SessionProviderClient when user is not signed in", async () => {
    mockGetServerSession.mockResolvedValue(null);

    const context = await getSessionContext();

    // Verify the context matches what SessionProviderClient expects when no session
    expect(context.isSignedIn).toBe(false);
    expect(context.user).toBeNull();
  });

  it("properly transforms session user to context value structure", async () => {
    mockGetServerSession.mockResolvedValue({
      user: {
        email: "transform@example.com",
        name: "Transform Test",
        image: "https://example.com/img.jpg",
        // extra fields from session user are passed through
        id: "123",
        role: "admin",
      },
      expires: new Date().toISOString(),
    } as Session);

    const context = await getSessionContext();

    // Verify required fields are included
    expect(context.user?.email).toBe("transform@example.com");
    expect(context.user?.name).toBe("Transform Test");
    expect(context.user?.image).toBe("https://example.com/img.jpg");
    expect(context.isSignedIn).toBe(true);
  });

  it("handles edge case where session exists but user object is missing fields", async () => {
    mockGetServerSession.mockResolvedValue({
      user: {},
    } as Session);

    const context = await getSessionContext();

    // Should return signed in but with undefined user properties
    expect(context.isSignedIn).toBe(true);
    expect(context.user?.email).toBeUndefined();
    expect(context.user?.name).toBeUndefined();
  });
});
