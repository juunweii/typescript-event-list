import React, { useContext, useState, FC } from "react";
import EventContext from "../contexts/EventsContext";
import { Event } from '../types'; 

interface EventRowProps {
  event: Event;
  isEditing: boolean;
  updateOrConfirmEvent: (id: string, event: Event) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
}

const EventRow: FC<EventRowProps> = ({
  event,
  updateOrConfirmEvent,
  deleteEvent
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(event.isNew);
  const [editedEvent, setEditedEvent] = useState<Event>(event);
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("EventRow must be used within an EventsProvider");
  }

  const { dispatch, eventAPI } = context;

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedEvent(prev => ({ ...prev, [name]: value }));
  };

  const saveEdit = async () => {
    await updateOrConfirmEvent(event.id, { ...editedEvent, isNew: false });
    setIsEditing(false);
  };

  const cancelEdit = async () => {
    if (event.isNew) {
      await deleteEvent(event.id);
      dispatch({ type: "DELETE_EVENT", payload: event.id });
    } else {
      setIsEditing(false);
    }
  };

  return (
    <tr>
       <td>
        {isEditing ? (
          <input
            type="text"
            name="eventName"
            value={editedEvent.eventName}
            onChange={handleEditChange}
          />
        ) : (
          event.eventName
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="date"
            name="startDate"
            value={editedEvent.startDate}
            onChange={handleEditChange}
          />
        ) : (
          event.startDate
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="date"
            name="endDate"
            value={editedEvent.endDate}
            onChange={handleEditChange}
          />
        ) : (
          event.endDate
        )}
      </td>
      <td>
        {isEditing ? (
          <div className="action-buttons">
            <button onClick={saveEdit} className="confirm-button">
              <svg
                focusable="false"
                viewBox="0 0 24 24"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 6V18M18 12H6"
                  stroke="#FFFFFF"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </button>
            <button onClick={cancelEdit} className="cancel-button">
              <svg
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19.587 16.001l6.096 6.096c0.396 0.396 0.396 1.039 0 1.435l-2.151 2.151c-0.396 0.396-1.038 0.396-1.435 0l-6.097-6.096-6.097 6.096c-0.396 0.396-1.038 0.396-1.434 0l-2.152-2.151c-0.396-0.396-0.396-1.038 0-1.435l6.097-6.096-6.097-6.097c-0.396-0.396-0.396-1.039 0-1.435l2.153-2.151c0.396-0.396 1.038-0.396 1.434 0l6.096 6.097 6.097-6.097c0.396-0.396 1.038-0.396 1.435 0l2.151 2.152c0.396 0.396 0.396 1.038 0 1.435l-6.096 6.096z"></path>
              </svg>
            </button>
          </div>
        ) : (
          <div className="action-buttons">
            <button onClick={() => setIsEditing(true)} className="edit-button">
              <svg
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-testid="EditIcon"
                aria-label="fontSize small"
              >
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
              </svg>
            </button>
            <button
              onClick={() => deleteEvent(event.id)}
              className="delete-button"
              data-testid="delete-button"
            >
              <svg
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-testid="DeleteIcon"
                aria-label="fontSize small"
              >
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
              </svg>
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}

export default EventRow;
