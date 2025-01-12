// src/components/__tests__/GameBoard.spec.js
import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeAll, vi } from 'vitest'; // Import from Vitest
import GameBoard from '../GameBoard.vue';

// Mock the canvas context
beforeAll(() => {
  const mockCanvas = document.createElement('canvas');
  mockCanvas.getContext = vi.fn(() => ({
    clearRect: vi.fn(),
    fillRect: vi.fn(),
    fillStyle: '',
  }));
  document.body.appendChild(mockCanvas);
  HTMLCanvasElement.prototype.getContext = mockCanvas.getContext;
});

describe('GameBoard.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(GameBoard);
    expect(wrapper.exists()).toBe(true);
  });

  it('initializes the game state correctly', () => {
    const wrapper = mount(GameBoard);
    expect(wrapper.vm.score).toBe(0);
    expect(wrapper.vm.level).toBe(1);
    expect(wrapper.vm.board.length).toBe(20);
    expect(wrapper.vm.board[0].length).toBe(10);
  });

  it('moves the piece left and right', () => {
    const wrapper = mount(GameBoard);
    wrapper.vm.spawnPiece(); // Spawn a piece first

    const initialX = wrapper.vm.currentPiece.x;

    // Move right
    wrapper.vm.movePiece(1);
    expect(wrapper.vm.currentPiece.x).toBe(initialX + 1);

    // Move left
    wrapper.vm.movePiece(-1);
    expect(wrapper.vm.currentPiece.x).toBe(initialX);
  });
  it('rotates the piece correctly', () => {
    const wrapper = mount(GameBoard);

    // Force an L piece for consistent testing
    wrapper.vm.currentPiece = {
      shape: [[2, 0], [2, 0], [2, 2]],
      x: 4,
      y: 0
    };

    // Store initial shape
    const originalShape = wrapper.vm.currentPiece.shape;

    // First rotation
    wrapper.vm.rotatePiece();
    expect(wrapper.vm.currentPiece.shape).not.toEqual(originalShape);

    // Three more rotations should return to original shape
    wrapper.vm.rotatePiece();
    wrapper.vm.rotatePiece();
    wrapper.vm.rotatePiece();
    expect(wrapper.vm.currentPiece.shape).toEqual(originalShape);
  });


it('drops the piece and freezes it', () => {
  const wrapper = mount(GameBoard);

  // Force a square piece for consistent testing
  wrapper.vm.currentPiece = {
    shape: [[4, 4], [4, 4]],
    x: 4,
    y: 18  // Place near bottom
  };

  // Freeze the piece
  wrapper.vm.freezePiece();

  // Verify the piece is frozen in the correct position
  expect(wrapper.vm.board[18][4]).toBe(4);
  expect(wrapper.vm.board[18][5]).toBe(4);
  expect(wrapper.vm.board[19][4]).toBe(4);
  expect(wrapper.vm.board[19][5]).toBe(4);
});


  it('clears lines and updates score', () => {
    const wrapper = mount(GameBoard);
    // Manually set up a board state that has a complete line
    wrapper.vm.board[19] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]; // Complete line
    wrapper.vm.clearLines();

    // Check that the line was cleared
    expect(wrapper.vm.board[19]).toEqual(new Array(10).fill(0));
    expect(wrapper.vm.score).toBe(100); // Assuming 1 line cleared gives 100 points
  });
});
