import { exportGameEvents, importGameEvents, loadGameEvents, uploadGameEvents } from '../api';
import { GameEvent, GameEventActionId, GameEventId, UnknownGameEvent } from '../types';

class GameEventsClient {
  #events: GameEvent[];
  #callbacks: ((newEvents: GameEvent[]) => void)[] = [];

  get events() {
    return this.#events;
  }

  set events(value) {
    this.#events = value;
    console.log('save value', value);
    uploadGameEvents(value);
    this.#callbacks.forEach((callback) => callback(value));
  }

  constructor() {
    this.#events = loadGameEvents();
  }

  subscribe = (callback: (newEvents: GameEvent[]) => void) => {
    this.#callbacks.push(callback);

    return () => this.unsubscribe(callback);
  };

  unsubscribe = (callback: (newEvents: GameEvent[]) => void) => {
    const index = this.#callbacks.indexOf(callback);

    if (index === -1) return;

    this.#callbacks.splice(index, 1);
  };

  exportEvents = exportGameEvents;

  importEvents = async () => {
    const data = await importGameEvents();

    if (!data) return;

    this.events = data;
  };

  addUnknownGameEvent = (unknownGameEvent: UnknownGameEvent) => {
    const maxId = this.events.length
      ? Math.max(...this.events.map((gameEvent) => gameEvent.id))
      : 0;

    const newGameEventId = (maxId + 1) as GameEventId;

    const newGameEvent: GameEvent = {
      ...unknownGameEvent,
      id: newGameEventId,
      actions: unknownGameEvent.actions.map((action, index) => ({
        ...action,
        id: `${newGameEventId}-${index}` as GameEventActionId,
      })),
    };

    this.events = [...this.events, newGameEvent];
  };

  updateEvent = (updatedGameEvent: GameEvent) => {
    const eventIndex = this.events.findIndex((gameEvent) => gameEvent.id === updatedGameEvent.id);

    if (eventIndex === -1) throw new Error(`No game event with ID ${updatedGameEvent.id}`);

    this.events = this.events.with(eventIndex, updatedGameEvent);
  };
}

export const gameEventsClient = new GameEventsClient();
