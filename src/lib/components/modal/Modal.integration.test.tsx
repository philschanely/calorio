import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Modal } from "./Modal";
import userEvent from "@testing-library/user-event";

// Integration tests use real child components (IconButton, TextDisplay3, etc.)
// Only mock HeadlessUI and tokens since those are infrastructure, not business logic

vi.mock("@headlessui/react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@headlessui/react")>();
  // Import the mock factory after importOriginal is resolved
  const { createHeadlessUIDialogMock } =
    await import("../__mocks__/headlessui.mock");
  return {
    ...actual,
    ...createHeadlessUIDialogMock(),
  };
});

vi.mock("@/lib/tokens", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/tokens")>();
  return {
    ...actual,
    getSwatchbookColorWithOpacity: (color: string, opacity: number) =>
      `rgba(${color}, ${opacity})`,
  };
});

describe("Modal Integration", () => {
  describe("with real IconButton", () => {
    it("closes modal when close button is clicked", async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();

      const { container } = render(
        <Modal isOpen={true} onClose={onClose} title="Close Me">
          Content
        </Modal>,
      );

      // Find close button - it's a real IconButton component
      const closeButton = container.querySelector(
        '[data-element="modal-close-btn"] button',
      ) as HTMLButtonElement;
      expect(closeButton).toBeInTheDocument();

      await user.click(closeButton);
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("close button is keyboard accessible", async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();

      const { container } = render(
        <Modal isOpen={true} onClose={onClose} title="Keyboard Test">
          Content
        </Modal>,
      );

      const closeButton = container.querySelector(
        '[data-element="modal-close-btn"] button',
      ) as HTMLButtonElement;

      // Focus and press Enter
      closeButton.focus();
      await user.keyboard("{Enter}");

      expect(onClose).toHaveBeenCalled();
    });
  });

  describe("with real TextDisplay3", () => {
    it("renders title with real TextDisplay3 styling", () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()} title="Styled Title">
          Content
        </Modal>,
      );

      const title = screen.getByText("Styled Title");
      expect(title).toBeInTheDocument();
      // TextDisplay3 is rendered as the child of DialogTitle
      expect(
        title.closest('[data-element="dialog-title"]'),
      ).toBeInTheDocument();
    });
  });

  describe("with real footer buttons", () => {
    it("footer button callbacks fire correctly", async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      const onSave = vi.fn();

      render(
        <Modal
          isOpen={true}
          onClose={onClose}
          title="Form Modal"
          footer={
            <div style={{ display: "flex", gap: "1rem" }}>
              <button onClick={onSave}>Save</button>
              <button onClick={onClose}>Cancel</button>
            </div>
          }
        >
          <input type="text" placeholder="Enter text" />
        </Modal>,
      );

      const saveBtn = screen.getByRole("button", { name: /save/i });
      const cancelBtn = screen.getByRole("button", { name: /cancel/i });

      await user.click(saveBtn);
      expect(onSave).toHaveBeenCalledTimes(1);

      await user.click(cancelBtn);
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe("complete modal workflow", () => {
    it("modal opens, user fills form, and submits", async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      const onSubmit = vi.fn();

      render(
        <Modal
          isOpen={true}
          onClose={onClose}
          title="User Form"
          description="Enter your details"
          footer={
            <div style={{ display: "flex", gap: "1rem" }}>
              <button onClick={onSubmit}>Submit</button>
              <button onClick={onClose}>Close</button>
            </div>
          }
        >
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
        </Modal>,
      );

      // Verify modal content
      expect(screen.getByText("User Form")).toBeInTheDocument();
      expect(screen.getByText("Enter your details")).toBeInTheDocument();

      // Fill form
      const nameInput = screen.getByPlaceholderText("Name") as HTMLInputElement;
      const emailInput = screen.getByPlaceholderText(
        "Email",
      ) as HTMLInputElement;

      await user.type(nameInput, "John Doe");
      await user.type(emailInput, "john@example.com");

      expect(nameInput.value).toBe("John Doe");
      expect(emailInput.value).toBe("john@example.com");

      // Submit
      const submitBtn = screen.getByRole("button", { name: /submit/i });
      await user.click(submitBtn);

      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
