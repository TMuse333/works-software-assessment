import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import List from './List';

describe('List component', () => {
  test('renders with no tasks', () => {
    const { getByText } = render(<List />);
    expect(getByText('You currently have no tasks, click the add button to add a task!')).toBeInTheDocument();
  });

  test('adds a task', () => {
    const { getByText, getByPlaceholderText } = render(<List />);
    
    // Get the initial length of the tasks array
    const initialTasksLength = List.tasks.length;
  
    // Click on the "Add Task" button
    const addButton = getByText('Add Task');
    fireEvent.click(addButton);
  
    // Enter task name in the input field
    const input = getByPlaceholderText('Enter your Task ');
    fireEvent.change(input, { target: { value: 'New Task' } });
  
    // Click on the "Submit note" button
    const submitButton = getByText('Submit note');
    fireEvent.click(submitButton);
  
    // Check if the task is added by comparing the new length of the tasks array
    const finalTasksLength = List.tasks.length;
    expect(finalTasksLength).toBe(initialTasksLength + 1);
  });
  

  test('marks a task as completed', () => {
    const { getByText, getByTestId } = render(<List />);
    const addButton = getByText('Add Task');
    fireEvent.click(addButton);
    const input = getByTestId('name-input');
    fireEvent.change(input, { target: { value: 'New Task' } });
    const submitButton = getByText('Submit note');
    fireEvent.click(submitButton);
    const checkbox = getByTestId('checkbox-0');
    fireEvent.click(checkbox);
    expect(getByText('mark as complete')).toBeInTheDocument();
  });

  // Add more tests as needed
});
