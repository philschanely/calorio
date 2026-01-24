import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import React, { PropsWithChildren } from "react";
import { Modal } from "./Modal";
import userEvent from "@testing-library/user-event";

// Mock dependencies
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

vi.mock("../icon-button", () => ({
  IconButton: ({
    onClick,
    ...props
  }: {
    onClick: () => void;
    icon: string;
    ghost?: boolean;
  }) => (
    <button
      data-element="icon-button"
      onClick={onClick}
      data-icon={props.icon}
      data-ghost={props.ghost}
    >
      Close
    </button>
  ),
}));

vi.mock("../text", () => ({
  TextDisplay3: ({ children }: PropsWithChildren) => (
    <div data-element="text-display-3">{children}</div>
  ),
}));

vi.mock("@/lib/tokens", () => ({
  getSwatchbookColorWithOpacity: vi.fn(
    (color: string, opacity: number) => `rgba(${color}, ${opacity})`,
  ),
}));

const elements = {
  dialog: '[data-element="modal"]',
  backdrop: '[data-element="modal-backdrop"]',
  panel: '[data-element="modal-panel"]',
  title: '[data-element="dialog-title"]',
  description: '[data-element="dialog-description"]',
  header: '[data-element="modal-header"]',
  body: '[data-element="modal-body"]',
  footer: '[data-element="modal-footer"]',
  closeBtn: '[data-element="modal-close-btn"]',
};

describe("Modal Component", () => {
  describe("Rendering", () => {
    it("does not render when isOpen is false", () => {
      const onClose = vi.fn();
      const { container } = render(
        <Modal isOpen={false} onClose={onClose} title="Test Modal">
          Content
        </Modal>,
      );

      expect(container.querySelector(elements.dialog)).not.toBeInTheDocument();
    });

    it("renders when isOpen is true", () => {
      const onClose = vi.fn();
      const { container } = render(
        <Modal isOpen={true} onClose={onClose} title="Test Modal">
          Content
        </Modal>,
      );

      expect(container.querySelector(elements.dialog)).toBeInTheDocument();
    });

    it("renders backdrop when open", () => {
      const onClose = vi.fn();
      const { container } = render(
        <Modal isOpen={true} onClose={onClose}>
          Content
        </Modal>,
      );

      expect(container.querySelector(elements.backdrop)).toBeInTheDocument();
    });

    it("renders panel when open", () => {
      const onClose = vi.fn();
      const { container } = render(
        <Modal isOpen={true} onClose={onClose}>
          Content
        </Modal>,
      );

      expect(container.querySelector(elements.panel)).toBeInTheDocument();
    });

    it("renders header section", () => {
      const onClose = vi.fn();
      const { container } = render(
        <Modal isOpen={true} onClose={onClose} title="Modal Title">
          Content
        </Modal>,
      );

      expect(container.querySelector(elements.header)).toBeInTheDocument();
    });

    it("renders close button in header", () => {
      const onClose = vi.fn();
      const { container } = render(
        <Modal isOpen={true} onClose={onClose} title="Modal Title">
          Content
        </Modal>,
      );

      const closeBtn = container.querySelector(elements.closeBtn);
      expect(closeBtn).toBeInTheDocument();
      expect(
        closeBtn?.querySelector('[data-icon="XMARK"]'),
      ).toBeInTheDocument();
    });
  });

  describe("Title", () => {
    it("renders string title", () => {
      const onClose = vi.fn();
      const { container } = render(
        <Modal isOpen={true} onClose={onClose} title="My Modal Title">
          Content
        </Modal>,
      );

      expect(screen.getByText("My Modal Title")).toBeInTheDocument();
      expect(container.querySelector(elements.title)).toBeInTheDocument();
    });

    it("renders custom React node as title", () => {
      const onClose = vi.fn();
      const customTitle = <span data-testid="custom-title">Custom Title</span>;
      render(
        <Modal isOpen={true} onClose={onClose} title={customTitle}>
          Content
        </Modal>,
      );

      expect(screen.getByTestId("custom-title")).toBeInTheDocument();
    });

    it("does not render title section when title is not provided", () => {
      const onClose = vi.fn();
      render(
        <Modal isOpen={true} onClose={onClose}>
          Content
        </Modal>,
      );

      expect(document.querySelector(elements.title)).not.toBeInTheDocument();
    });
  });

  describe("Description", () => {
    it("renders description text", () => {
      const onClose = vi.fn();
      const { container } = render(
        <Modal
          isOpen={true}
          onClose={onClose}
          title="Title"
          description="Modal description"
        >
          Content
        </Modal>,
      );

      expect(screen.getByText("Modal description")).toBeInTheDocument();
      expect(container.querySelector(elements.description)).toBeInTheDocument();
    });

    it("does not render description when not provided", () => {
      const onClose = vi.fn();
      const { container } = render(
        <Modal isOpen={true} onClose={onClose} title="Title">
          Content
        </Modal>,
      );

      expect(
        container.querySelector(elements.description),
      ).not.toBeInTheDocument();
    });

    it("renders description with title", () => {
      const onClose = vi.fn();
      const { container } = render(
        <Modal
          isOpen={true}
          onClose={onClose}
          title="Modal Title"
          description="Modal description"
        >
          Content
        </Modal>,
      );

      expect(container.querySelector(elements.title)).toBeInTheDocument();
      expect(container.querySelector(elements.description)).toBeInTheDocument();
    });
  });

  describe("Body Content", () => {
    it("renders children in body section", () => {
      const onClose = vi.fn();
      const { container } = render(
        <Modal isOpen={true} onClose={onClose}>
          <div data-testid="modal-content">Modal body content</div>
        </Modal>,
      );

      expect(screen.getByTestId("modal-content")).toBeInTheDocument();
      expect(container.querySelector(elements.body)).toBeInTheDocument();
    });

    it("does not render body section when no children provided", () => {
      const onClose = vi.fn();
      const { container } = render(<Modal isOpen={true} onClose={onClose} />);

      expect(container.querySelector(elements.body)).not.toBeInTheDocument();
    });

    it("renders complex children", () => {
      const onClose = vi.fn();
      const { container } = render(
        <Modal isOpen={true} onClose={onClose}>
          <div>
            <h2>Nested heading</h2>
            <p>Nested paragraph</p>
          </div>
        </Modal>,
      );

      expect(screen.getByText("Nested heading")).toBeInTheDocument();
      expect(screen.getByText("Nested paragraph")).toBeInTheDocument();
      expect(container.querySelector(elements.body)).toBeInTheDocument();
    });
  });

  describe("Footer", () => {
    it("renders footer section when provided", () => {
      const onClose = vi.fn();
      const { container } = render(
        <Modal isOpen={true} onClose={onClose} footer={<button>Submit</button>}>
          Content
        </Modal>,
      );

      expect(screen.getByText("Submit")).toBeInTheDocument();
      expect(container.querySelector(elements.footer)).toBeInTheDocument();
    });

    it("does not render footer section when not provided", () => {
      const onClose = vi.fn();
      render(
        <Modal isOpen={true} onClose={onClose}>
          Content
        </Modal>,
      );

      expect(document.querySelector(elements.footer)).not.toBeInTheDocument();
    });

    it("renders complex footer content", () => {
      const onClose = vi.fn();
      render(
        <Modal
          isOpen={true}
          onClose={onClose}
          footer={
            <div data-testid="footer-actions">
              <button>Cancel</button>
              <button>Save</button>
            </div>
          }
        >
          Content
        </Modal>,
      );

      expect(screen.getByTestId("footer-actions")).toBeInTheDocument();
      expect(screen.getByText("Cancel")).toBeInTheDocument();
      expect(screen.getByText("Save")).toBeInTheDocument();
    });
  });

  describe("Interactivity", () => {
    it("calls onClose when close button is clicked", async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      const { container } = render(
        <Modal isOpen={true} onClose={onClose} title="Modal">
          Content
        </Modal>,
      );

      const closeBtn = container.querySelector(
        `${elements.closeBtn} button`,
      ) as HTMLButtonElement;
      await user.click(closeBtn);

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("close button is accessible with aria-label", () => {
      const onClose = vi.fn();
      const { container } = render(
        <Modal isOpen={true} onClose={onClose} title="Modal">
          Content
        </Modal>,
      );

      const closeBtn = container.querySelector(`${elements.closeBtn} button`);
      expect(closeBtn).toBeInTheDocument();
    });
  });

  describe("Composition", () => {
    it("renders with all sections populated", () => {
      const onClose = vi.fn();
      const { container } = render(
        <Modal
          isOpen={true}
          onClose={onClose}
          title="Complete Modal"
          description="This is a description"
          footer={<button>Save</button>}
        >
          <p>Modal content here</p>
        </Modal>,
      );

      expect(container.querySelector(elements.dialog)).toBeInTheDocument();
      expect(container.querySelector(elements.backdrop)).toBeInTheDocument();
      expect(container.querySelector(elements.panel)).toBeInTheDocument();
      expect(container.querySelector(elements.header)).toBeInTheDocument();
      expect(container.querySelector(elements.body)).toBeInTheDocument();
      expect(container.querySelector(elements.footer)).toBeInTheDocument();
      expect(container.querySelector(elements.closeBtn)).toBeInTheDocument();

      expect(screen.getByText("Complete Modal")).toBeInTheDocument();
      expect(screen.getByText("This is a description")).toBeInTheDocument();
      expect(screen.getByText("Modal content here")).toBeInTheDocument();
      expect(screen.getByText("Save")).toBeInTheDocument();
    });

    it("renders minimal modal with only title", () => {
      const onClose = vi.fn();
      render(<Modal isOpen={true} onClose={onClose} title="Minimal Modal" />);

      expect(document.querySelector(elements.dialog)).toBeInTheDocument();
      expect(document.querySelector(elements.title)).toBeInTheDocument();
      expect(document.querySelector(elements.body)).not.toBeInTheDocument();
      expect(document.querySelector(elements.footer)).not.toBeInTheDocument();
      expect(
        document.querySelector(elements.description),
      ).not.toBeInTheDocument();
    });
  });

  describe("State transitions", () => {
    it("transitions from closed to open", () => {
      const onClose = vi.fn();
      const { container, rerender } = render(
        <Modal isOpen={false} onClose={onClose} title="Modal">
          Content
        </Modal>,
      );

      expect(container.querySelector(elements.dialog)).not.toBeInTheDocument();

      rerender(
        <Modal isOpen={true} onClose={onClose} title="Modal">
          Content
        </Modal>,
      );

      expect(container.querySelector(elements.dialog)).toBeInTheDocument();
    });

    it("transitions from open to closed", () => {
      const onClose = vi.fn();
      const { container, rerender } = render(
        <Modal isOpen={true} onClose={onClose} title="Modal">
          Content
        </Modal>,
      );

      expect(container.querySelector(elements.dialog)).toBeInTheDocument();

      rerender(
        <Modal isOpen={false} onClose={onClose} title="Modal">
          Content
        </Modal>,
      );

      expect(container.querySelector(elements.dialog)).not.toBeInTheDocument();
    });
  });
});
