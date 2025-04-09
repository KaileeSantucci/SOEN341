import { render, fireEvent, screen } from "@testing-library/react";
import { beforeEach, afterEach, describe, expect, test, vi } from "vitest";
import '@testing-library/jest-dom';
import React from "react";
import HomePage from "../src/HomePage/pages/HomePage"; // Adjust if ToDoList is a separate export

beforeEach(() => {
  // Inject app container to avoid DOM null issues if necessary
  document.body.innerHTML = `<div class="app-container"></div>`;

  // Mock localStorage
  vi.spyOn(Storage.prototype, "setItem");
  vi.spyOn(Storage.prototype, "getItem").mockReturnValue(null);
});

afterEach(() => {
  document.body.innerHTML = "";
});

describe("To-Do List Component", () => {
  test("adds a task to the list", () => {
    render(<HomePage />);

    const input = screen.getByPlaceholderText("Enter a task");
    const addButton = screen.getByRole("button", { name: /add task/i });

    fireEvent.change(input, { target: { value: "Buy milk" } });
    fireEvent.click(addButton);

    expect(screen.getByText("Buy milk")).toBeInTheDocument();
  });

  test("marks task as complete", () => {
    render(<HomePage />);

    fireEvent.change(screen.getByPlaceholderText("Enter a task"), {
      target: { value: "Study Vitest" },
    });
    fireEvent.click(screen.getByRole("button", { name: /add task/i }));

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox.checked).toBe(false);

    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });

  test("removes a task from the list", () => {
    render(<HomePage />);

    fireEvent.change(screen.getByPlaceholderText("Enter a task"), {
      target: { value: "Delete me" },
    });
    fireEvent.click(screen.getByRole("button", { name: /add task/i }));

    const deleteButton = screen.getByRole("button", { name: /remove/i });
    fireEvent.click(deleteButton);

    expect(screen.queryByText("Delete me")).not.toBeInTheDocument();
  });

  test("loads saved tasks from localStorage on mount", () => {
    const mockTasks = JSON.stringify([
      { text: "Task from localStorage", completed: false },
    ]);

    localStorage.getItem.mockReturnValueOnce(mockTasks);

    render(<HomePage />);

    expect(screen.getByText("Task from localStorage")).toBeInTheDocument();
  });
});
