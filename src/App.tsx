import { EventForm } from "./components/EventForm";
import s from "./App.module.css";
import { useMemo, useState } from "react";
import { bevis } from "./utils/bevis";
import { GameEvent } from "./typings/event";

const b = bevis(s, "FormPage");

function App() {
  const [events, setEvents] = useState<GameEvent[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [eventCreation, setEventCreation] = useState(false);

  const selectedEvent = selectedEventId
    ? events.find((event) => event.id === selectedEventId)
    : undefined;

  const maxEventId = useMemo(
    () => Math.max(...events.map((event) => event.id)),
    [events]
  );

  return (
    <div className={b()}>
      <div className={b("Scroll")}>
        {events.map((event) => (
          <button className={b("Event")}>
            <h2>{event.title}</h2>
            <p>{event.description}</p>
          </button>
        ))}
      </div>

      {eventCreation || selectedEvent ? (
        <EventForm
          key={selectedEventId}
          events={events}
          initValues={selectedEvent}
          onSave={(value) => {
            console.log("value", value);
            if (eventCreation) {
              value.id = maxEventId + 1;

              value.actions = value.actions.map((action, index) => ({
                ...action,
                id: `${value.id}-${index}`,
              }));

              setEventCreation(false);
            }

            if (selectedEventId) {
              setEvents((current) =>
                current.map((event) =>
                  event.id === selectedEventId ? value : event
                )
              );
              setSelectedEventId(null);
            }
          }}
        />
      ) : null}

      {!eventCreation && !selectedEvent ? (
        <button onClick={() => setEventCreation(true)}>Создать</button>
      ) : null}
    </div>
  );
}

export default App;
