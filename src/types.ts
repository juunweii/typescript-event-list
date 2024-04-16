export interface Event {
    id: string;
    eventName: string;
    startDate: string;
    endDate: string;
    isNew: boolean;
}
  
export interface EventState {
    events: Event[];
}
  
type SetEventsAction = {
    type: 'SET_EVENTS';
    payload: Event[];
};
  
type AddEventAction = {
    type: 'ADD_EVENT';
    payload: Event;
};

type UpdateEventAction = {
    type: 'UPDATE_EVENT';
    payload: Event;
};

type DeleteEventAction = {
    type: 'DELETE_EVENT';
    payload: string;  
};
  
export type EventAction = SetEventsAction | AddEventAction | UpdateEventAction | DeleteEventAction;
  