export default class Event {
	constructor() {
		this.events = {};
	}

	on (name, listener) {
		if (!this.events[name]) {
			this.events[name] = [];
		}

		this.events[name].push(listener);
	}

	removeListener (name, listenerToRemove) {
		if (!this.events[name]) {
			throw new Error(`Can't remove a listener. Event "${name}" doesn't exits.`);
		}

		const filterListeners = (listener) => listener !== listenerToRemove;

		this.events[name] = this.events[name].filter(filterListeners);
	}

	emit (name, data) {
		if (!this.events[name]) {
			throw new Error(`Can't emit an event. Event "${name}" doesn't exits.`);
		}

		const fireCallbacks = (callback) => {
			callback(data);
		};

		this.events[name].forEach(fireCallbacks);
	}
}	