import { useQuery } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { QueryProvider } from "./QueryProvider";

describe("QueryProvider", () => {
  it("renders children correctly", () => {
    render(
      <QueryProvider>
        <div>Test Child</div>
      </QueryProvider>,
    );

    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  it("provides QueryClient to children", () => {
    let queryClientProvided = false;

    function TestComponent() {
      try {
        // useQuery will throw if QueryClientProvider is not available
        useQuery({
          queryKey: ["test"],
          queryFn: async () => "test",
        });
        queryClientProvided = true;
      } catch {
        queryClientProvided = false;
      }
      return <div>Test</div>;
    }

    render(
      <QueryProvider>
        <TestComponent />
      </QueryProvider>,
    );

    expect(queryClientProvided).toBe(true);
  });
});
