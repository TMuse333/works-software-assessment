import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import List from './List';

describe('List component', () => {
  test('renders with no tasks', () => {
    const { getByText } = render(<List />);
    expect(getByText('You currently have no tasks, click the add button to add a task!')).toBeInTheDocument();
  });

  test('adds a task', () => {
    const { getByText, getByPlaceholderText, queryByText } = render(<List />);
    
    // Click on the "Add Task" button
    const addButton = getByText('Add Task');
    fireEvent.click(addButton);
  
    // Enter task name in the input field
    const input = getByPlaceholderText('Enter your Task');
    fireEvent.change(input, { target: { value: 'New Task' } });
  
    // Click on the "Submit note" button
    const submitButton = getByText('Submit note');
    fireEvent.click(submitButton);
  
    // Check if the task is added to the list
    expect(queryByText('New Task')).toBeInTheDocument();
  });
  

  test('deletes a task', () => {
    const { getByText, queryByText, getByTestId, getByPlaceholderText } = render(<List />);
    
    // Add a task
    const addButton = getByText('Add Task');
    fireEvent.click(addButton);
  
    const input = getByPlaceholderText('Enter your Task');
    fireEvent.change(input, { target: { value: 'Task to delete' } });
  
    const submitButton = getByText('Submit note');
    fireEvent.click(submitButton);
  
  const deleteButton = getByText('Delete Task')

  fireEvent.click(deleteButton)

  const taskToDelete = getByText('Task to Delete')
  
    // Check if the task is deleted
    
  });
  

  // Add more tests as needed
});
