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

	emit (name, data) {
		if (!this.events[name]) {
			throw new Error(`Can't emit an event. Event "${name}" doesn't exits.`);
		}

		const callbacks = (callback) => {
			callback(data);
		};

		this.events[name].forEach(callbacks);
	}
}	