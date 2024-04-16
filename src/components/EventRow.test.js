import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EventRow from './EventRow';
import EventContext from '../contexts/EventsContext';
import { Event } from '../types'; 

// Mock event data
const mockEvent = {
  id: '1',
  eventName: 'Test Event',
  startDate: '2024-01-01',
  endDate: '2024-01-02',
  isNew: false
};

// Mock functions for dispatch and API calls
const mockDispatch = jest.fn();
const mockEventAPI = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn()
};

// Mock functions for event handlers
const mockUpdateOrConfirmEvent = jest.fn();
const mockDeleteEvent = jest.fn();

// Wrapper component to provide context 
const wrapper = ({ children }) => (
  <EventContext.Provider value={{ state: { events: [mockEvent] }, dispatch: mockDispatch, eventAPI: mockEventAPI }}>
    <table>
      <tbody>
        {children}
      </tbody>
    </table>
  </EventContext.Provider>
);

describe('EventRow', () => {
  // Test for checking if the component renders with event data
  test('renders event data', () => {
    render(<EventRow event={mockEvent} updateOrConfirmEvent={mockUpdateOrConfirmEvent} deleteEvent={mockDeleteEvent} />, { wrapper });
    expect(screen.getByText('Test Event')).toBeInTheDocument();
  });

  // Test for checking if the delete function is called on button click
  test('calls delete function on delete button click', () => {
    render(<EventRow event={mockEvent} updateOrConfirmEvent={mockUpdateOrConfirmEvent} deleteEvent={mockDeleteEvent} />, { wrapper });
    const deleteButton = screen.getByTestId('delete-button'); 
    fireEvent.click(deleteButton);
    expect(mockDeleteEvent).toHaveBeenCalledWith(mockEvent.id);
  });
});
