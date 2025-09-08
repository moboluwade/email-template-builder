import { act, renderHook } from "@testing-library/react";
import { useTemplateStore } from "../useTemplateStore";

// Helper to create a fresh store before each test
const createFreshStore = () => {
  const { result } = renderHook(() => useTemplateStore());
  // Clear any existing blocks
  act(() => {
    result.current.clearTemplate();
  });
  return { result };
};

describe("useTemplateStore", () => {
  beforeEach(() => {
    // Reset the store before each test
    const store = useTemplateStore.getState();
    store.clearTemplate();
  });

  describe("addBlock", () => {
    it("should add a block to the store", () => {
      const { result } = createFreshStore();

      act(() => {
        result.current.addBlock("header");
      });

      expect(result.current.blocks.length).toBe(1);
      expect(result.current.blocks[0].type).toBe("header");
      expect(result.current.selectedBlockId).toBe(result.current.blocks[0].id);
    });

    it("should add a block at the specified position", () => {
      const { result } = createFreshStore();

      // Add three blocks
      act(() => {
        result.current.addBlock("header");
        result.current.addBlock("paragraph");
        result.current.addBlock("button");
      });

      // Add a block at position 1
      act(() => {
        result.current.addBlock("image", 1);
      });

      expect(result.current.blocks.length).toBe(4);
      expect(result.current.blocks[1].type).toBe("image");

      // Check that positions were updated correctly
      expect(result.current.blocks[0].position).toBe(0);
      expect(result.current.blocks[1].position).toBe(1);
      expect(result.current.blocks[2].position).toBe(2);
      expect(result.current.blocks[3].position).toBe(3);
    });
  });


});
