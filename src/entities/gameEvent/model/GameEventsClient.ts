import { exportGameEvents, importGameEvents, loadGameEvents, uploadGameEvents } from '../api';
import { GameEvent, GameEventActionId, GameEventId } from '../types';

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

  addGameEvent = (gameEvent: GameEvent) => {
    this.events = [...this.events, gameEvent];
  };

  updateGameEvent = (updatedGameEvent: GameEvent) => {
    const eventIndex = this.events.findIndex((gameEvent) => gameEvent.id === updatedGameEvent.id);

    if (eventIndex === -1) return this.addGameEvent(updatedGameEvent);

    this.events = this.events.with(eventIndex, updatedGameEvent);
  };

  findGameEvent = (id: GameEventId) => this.events.find((event) => event.id === id);
  findGameEventAction = (id: GameEventActionId) => {
    const gameEventId = +id.split('-')[0] as GameEventId;
    const gameEvent = this.findGameEvent(gameEventId);

    return gameEvent?.actions.find((action) => action.id === id);
  };
}

export const gameEventsClient = new GameEventsClient();
