import { createContext, Dispatch } from "react";
import { EventAction, EventState, Event} from '../types'; 

interface EventsContextType {
  state: EventState;
  dispatch: Dispatch<EventAction>;
  eventAPI: {
    get: (path: string) => Promise<any>;
    post: (path: string, data: object) => Promise<any>;
    put: (path: string, data: object) => Promise<any>;
    delete: (path: string) => Promise<void>;
  };
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);
export default EventsContext;
