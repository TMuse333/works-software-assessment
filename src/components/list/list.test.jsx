import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import List from './List';

/*
Here are three tests, one to ensure that when there are no task,
we are alerted, another test to ensure adding a task works properly
and another to test deleting a task
*/

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

  const taskToDelete = getByTestId('task-0')

  fireEvent.click(taskToDelete)  

  const finalDeletionButton = getByText('Delete')

  fireEvent.click(finalDeletionButton)

  expect(queryByText('Task to delete')).toBeNull();

    
  });
  

});
