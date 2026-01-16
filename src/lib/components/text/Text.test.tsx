import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Text, TextDisplay1, TextBody, TextCaption } from "./Text";

describe("Text component", () => {
  it("renders as a <p> by default with Body spec", () => {
    render(<Text>Default body</Text>);

    const el = screen.getByText(/default body/i);
    expect(el.tagName.toLowerCase()).toBe("p");
    expect(el).toHaveClass("text-body");
  });

  it("renders as the provided `as` element", () => {
    render(<Text as="h1">Heading</Text>);

    const el = screen.getByText(/heading/i);
    expect(el.tagName.toLowerCase()).toBe("h1");
  });

  it("accepts `spec` prop and applies correct class", () => {
    render(<Text spec="Display1">Display1 text</Text>);

    const el = screen.getByText(/display1 text/i);
    expect(el).toHaveClass("text-display-1");
  });

  it("convenience variant components apply correct spec", () => {
    render(<TextDisplay1>Disp1</TextDisplay1>);
    const el = screen.getByText(/disp1/i);
    expect(el).toHaveClass("text-display-1");

    render(<TextBody>Body</TextBody>);
    expect(screen.getByText(/body/i)).toHaveClass("text-body");

    render(<TextCaption>Cap</TextCaption>);
    expect(screen.getByText(/cap/i)).toHaveClass("text-caption");
  });
});
