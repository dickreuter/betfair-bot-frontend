import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Editor from './Editor';  // Replace with the actual path to your Editor component

describe('Editor Component', () => {

  it('should remove attribute correctly', () => {
    // Mock state setters
    const setSelectedAttributes = jest.fn();
    const setAttributesConfig = jest.fn();

    // Initialize the component
    render(<Editor setSelectedAttributes={setSelectedAttributes} setAttributesConfig={setAttributesConfig} />);

    // Suppose we have a dropdown and a "Add" button to add attributes
    // Adding an attribute named 'Career'
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Career' } });
    fireEvent.click(screen.getByText('Add'));

    // Now, 'Career' should be in selectedAttributes and attributesConfig
    expect(setSelectedAttributes).toHaveBeenCalledWith(expect.arrayContaining(['Career']));
    expect(setAttributesConfig).toHaveBeenCalledWith(expect.objectContaining({ 'Career': {} }));

    // Remove 'Career' by clicking "Remove" button
    fireEvent.click(screen.getByText('Remove'));

    // Check if 'Career' is removed from selectedAttributes and attributesConfig
    expect(setSelectedAttributes).not.toHaveBeenCalledWith(expect.arrayContaining(['Career']));
    expect(setAttributesConfig).not.toHaveBeenCalledWith(expect.objectContaining({ 'Career': {} }));
  });
});
