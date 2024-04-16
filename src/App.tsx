import "./App.css";
import React, { useState, useEffect, useReducer, FC } from "react";
import { v4 as uuidv4 } from "uuid";
import EventRow from "./components/EventRow";
// import axios from "axios";
import ReducerComponent from "./components/ReducerComponent";
import EventContext from "./contexts/EventsContext";
import { Event, EventAction, EventState } from './types'; 

interface EventAPI {
  get: (path: string) => Promise<any>; 
  post: (path: string, data: object) => Promise<any>;
  put: (path: string, data: object) => Promise<any>;
  delete: (path: string) => Promise<void>;
}

// const eventAPI = axios.create({ baseURL: "http://localhost:3000" });
const eventAPI = {
  get: async (path: string) => {
    const response = await fetch(`http://localhost:3000${path}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
  post: async (path: string, data: object) => {
    const response = await fetch(`http://localhost:3000${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
  put: async (path: string, data: object) => {
    const response = await fetch(`http://localhost:3000${path}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
  delete: async (path: string) => {
    const response = await fetch(`http://localhost:3000${path}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }
};



const initialState: EventState = {
  events: [],
};

const App: FC = () => {
  const [state, dispatch] = useReducer(ReducerComponent, initialState);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const data = await eventAPI.get("/events");
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format');
        }
        dispatch({ type: "SET_EVENTS", payload: data });
      } catch (error) {
        console.error("Failed to fetch events:", error);
        dispatch({ type: "SET_EVENTS", payload: [] });
      }
    };
    getEvents();
  }, []);
  
  

  const addEvent = async () => {
    const newEvent: Event = {
      id: uuidv4(),
      eventName: "",
      startDate: "",
      endDate: "",
      isNew: true,
    };
    await eventAPI.post("/events", newEvent);
    dispatch({ type: "ADD_EVENT", payload: newEvent });
  };

  const updateOrConfirmEvent = async (id: string, updatedEvent: Event) => {
    await eventAPI.put(`/events/${id}`, { ...updatedEvent, isNew: false });
    dispatch({
      type: "UPDATE_EVENT",
      payload: { ...updatedEvent, id, isNew: false },
    });
  };

  const deleteEvent = async (id: string) => {
    await eventAPI.delete(`/events/${id}`);
    dispatch({ type: "DELETE_EVENT", payload: id });
  };
  // console.log(state.events);
  return (
    <EventContext.Provider value={{ state, dispatch, eventAPI }}>
      <div className="App">
        <div className="header">
          <button id="add-event-row-btn" onClick={addEvent}>Add New Event</button>
        </div>
        <div className="event-table">
          <table>
            <thead>
              <tr>
                <th>Event</th>
                <th>Start</th>
                <th>End</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {state.events.map((event) => (
                <EventRow
                  key={event.id}
                  event={event}
                  isEditing={event.isNew}
                  updateOrConfirmEvent={updateOrConfirmEvent}
                  deleteEvent={deleteEvent}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </EventContext.Provider>
  );
}

export default App;
