import { loadFromFile, saveToFile } from '@shared/lib';

import { loadGameEvents, uploadGameEvents } from '../api';
import { GameEvent } from '../types';

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

  exportEvents = () => {
    saveToFile(JSON.stringify(this.#events, null, 4), 'events.json', 'application/json');
  };

  importEvents = async () => {
    const readResult = await loadFromFile('application/json');

    if (typeof readResult !== 'string') throw new Error('Not a string file');

    const readEvents = JSON.parse(readResult);

    this.events = readEvents;
  };
}

export const gameEventsClient = new GameEventsClient();
