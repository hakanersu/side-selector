const SIDES = ['left', 'right'];
const TEMPLATE = `
<div class="selectit">
	<div class="selectit-left">
		<div class="selectit-search">
			<span class="close left">✕</span>
			<input type="search" placeholder="Search"/>
		</div>
		<div class="selectit-container">
			<ul class="selectit-list"></ul>
			<div class="selectit-counter">
				<span class="selectit-selectall">Select all</span>
				<span class="selectit-count">x</span>
			</div>
		</div>
	</div>
	<div class="selectit-center">
		‹ ›
	</div>
	<div class="selectit-right">
		<div class="selectit-search">
			<span class="close right">✕</span>
			<input type="search" placeholder="Search"/>
		</div>
		<div class="selectit-container">
			<ul class="selectit-list"></ul>
			<div class="selectit-counter">
				<span class="selectit-deselect">Deselect all</span>
				<span class="selectit-count">x</span>
			</div>
		</div>
	</div>
	<input type="hidden" class="selectit-input" name="selectit-input" />
</div>
`;class Elements {
	constructor(el) {
		this.el = el;
		this.setElements();	
	}

	setElements () {
		this.elements = {
			list : {
				left: this.select('.selectit-left .selectit-list'),
				right: this.select('.selectit-right .selectit-list') 
			},
			counter: {
				left: this.select('.selectit-left .selectit-count'),
				right: this.select('.selectit-right .selectit-count'),
			},
			close : {
				left: this.select('.selectit-left .close'),
				right: this.select('.selectit-right .close'),
			},
			input : {
				left: this.select('.selectit-left .selectit-search input'),
				right: this.select('.selectit-right .selectit-search input'),
			},
			container: this.select('div'),
			select: this.select('span.selectit-selectall'),
			deselect: this.select('span.selectit-deselect'),
			input: {
				left: this.select('.selectit-left .selectit-search input'),
				right: this.select('.selectit-right .selectit-search input'),
			},
			hidden: this.select('.selectit-input')		};
	}
	
	select(string) {
		return this.el.querySelector(`${string}`)
	}
}class Event {
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
}class Select extends Event {
	constructor(element, options) {
		super();
		this.on('selected', () => { });
		const defaultOptions = {
			height: 250,
			labelField: 'label',
			valueField: 'value',
			selected: undefined,
			name: 'selectit-input',
			translation: {
				selectAll: 'Select all',
				deselectAll: 'Deselect all',
				search: 'Search'
			}
		};

		this.el = element;
		this.config = Object.assign({}, defaultOptions, options || {});
		this.data = options.data || [];

		const variables = ['items', 'shown', 'count'];

		variables.forEach(item => {
			this[item] = {
				left: [],
				right: [],
			};
		});

		this.searching = {
			left: null,
			right: null,
		};

		this.items.left = this.data;

		if (this.config.selected) {
			this.preSelect();
		}

		this.create();
	}

	create () {
		this.el.innerHTML = TEMPLATE;
		this.elements = (new Elements(this.el)).elements;
		this.elements.container.style.height = `${this.config.height}px`;
		this.elements.hidden.setAttribute('name', this.config.name);
		this.elements.select.innerHTML = this.config.translation.selectAll
		this.elements.deselect.innerHTML = this.config.translation.deselectAll
		this.elements.input.left.setAttribute('placeholder', this.config.translation.search)
		this.elements.input.right.setAttribute('placeholder', this.config.translation.search)
		this.registerEvents();
		this.render();
	}

	registerEvents () {
		this.elements.select.addEventListener("click", () => this.selectAll());
		this.elements.deselect.addEventListener("click", () => this.deselectAll());
		this.elements.input.left.addEventListener('keyup', (e) => this.searchItems(e, 'left'));
		this.elements.input.right.addEventListener('keyup', (e) => this.searchItems(e, 'right'));
		this.elements.close.left.addEventListener('click', () => this.clearSearch('left'));
		this.elements.close.right.addEventListener('click', () => this.clearSearch('right'));
	}

	clearSearch (side) {
		this.searching[side] = false;
		this.shown[side] = [];
		this.elements.input[side].value = '';
		this.elements.close[side].style.visibility = 'hidden';
		this.render();
	}

	searchItems (e, side) {
		this.searching[side] = e.target.value;
		if (this.searching[side] || this.searching[side] === '') {
			this.shown[side] = [];
			this.elements.close[side].style.visibility = 'hidden';
		}

		this.shown[side] = this.items[side].filter(item => {
			return item[this.config.labelField].toLowerCase().indexOf(this.searching[side].toLowerCase()) !== -1
		});

		if (!this.searching[side]) {
			this.shown[side] = [];
		} else {
			this.elements.close[side].style.visibility = 'visible';
		}
		this.render();
	}

	selectAll () {
		this.items.left = [];
		this.items.right = this.data;
		this.render();
	}

	deselectAll () {
		this.items.left = this.data;
		this.items.right = [];
		this.render();
	}

	render () {
		SIDES.forEach(side => {
			this.elements.counter[side].innerHTML = this.items[side].length;
			this.elements.list[side].innerHTML = '';
			const listOn = this.searching[side] ? 'shown' : 'items';

			this[listOn][side].forEach(i => {
				this.elements.list[side].appendChild(this.renderListItem(i, side));
			});
		});

		this.emit('selected', this.items.right);
		this.elements.hidden.value = this.items.right.map(item => item[this.config.valueField]);
	}

	get selected () {
		return this.items.right
	}

	renderListItem (item, side) {
		let el = document.createElement("li");
		el.setAttribute("data-value", item.value);
		el.setAttribute('data-side', side);
		el.innerHTML = item[this.config.labelField];
		el.addEventListener("click", this.listItemClicked.bind(this, item));
		return el
	}

	listItemClicked (item, e) {
		const listItem = e.target;
		const side = listItem.getAttribute('data-side');

		switch (side) {
			case 'left':
				this.move(item, 'left', 'right');
				break;
			case 'right':
				this.move(item, 'right', 'left');
				break;
		}
		this.render();
	}



	setSearchList () {
		SIDES.forEach(side => {
			if (this.searching[side]) {
				this.shown[side] = this.items[side].filter(item => {
					return item[this.config.labelField].toLowerCase().indexOf(this.searching[side].toLowerCase()) !== -1
				});
			}
		});
	}

	move (item, from, to) {
		this.items[to].push(item);
		this.items[from] = this.items[from].filter(option => item !== option);
		this.setSearchList();
	}

	preSelect () {
		this.items.right = this.data.filter(item => {
			return this.config.selected.indexOf(item[this.config.valueField]) !== -1
		});
		this.items.left = this.data.filter(item => {
			return this.config.selected.indexOf(item[this.config.valueField]) === -1
		});
	}
}export default Select;