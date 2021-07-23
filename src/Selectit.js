import { TEMPLATE, SIDES } from './Constants.js'
import Elements from './Elements.js'

export default class Select {
	constructor(element, options) {
		const defaultOptions = {
			height: 250,
			labelField: 'label',
			valueField: 'value'
		}

		this.el = element
		this.config = Object.assign({}, defaultOptions, options || {})
		this.data = options.data || []

		const variables = ['items', 'shown', 'count']

		variables.forEach(item => {
			this[item] = {
				left: [],
				right: [],
			}
		})

		this.searching = {
			left: null,
			right: null,
		}

		this.items.left = this.data

		this.create()
	}

	create () {
		this.el.innerHTML = TEMPLATE
		this.elements = (new Elements(this.el)).elements
		this.elements.container.style.height = `${this.config.height}px`
		this.registerEvents()
		this.render()
	}

	registerEvents () {
		this.elements.select.addEventListener("click", () => this.selectAll());
		this.elements.deselect.addEventListener("click", () => this.deselectAll());
		this.elements.input.left.addEventListener('keyup', (e) => this.searchItems(e, 'left'))
		this.elements.input.right.addEventListener('keyup', (e) => this.searchItems(e, 'right'))
		this.elements.close.left.addEventListener('click', () => this.clearSearch('left'))
		this.elements.close.right.addEventListener('click', () => this.clearSearch('right'))
	}

	clearSearch (side) {
		this.searching[side] = false
		this.shown[side] = []
		this.elements.input[side].value = ''
		this.elements.close[side].style.visibility = 'hidden'
		this.render()
	}

	searchItems (e, side) {
		this.searching[side] = e.target.value
		if (this.searching[side] || this.searching[side] === '') {
			this.shown[side] = []
			this.elements.close[side].style.visibility = 'hidden'
		}

		this.shown[side] = this.items[side].filter(item => {
			return item[this.config.labelField].toLowerCase().indexOf(this.searching[side].toLowerCase()) !== -1
		})

		if (!this.searching[side]) {
			this.shown[side] = []
		} else {
			this.elements.close[side].style.visibility = 'visible'
		}
		this.render()
	}

	selectAll () {
		this.items.left = []
		this.items.right = this.data
		this.render()
	}

	deselectAll () {
		this.items.left = this.data
		this.items.right = []
		this.render()
	}

	render () {
		SIDES.forEach(side => {
			this.elements.counter[side].innerHTML = this.items[side].length
			this.elements.list[side].innerHTML = ''
			const listOn = this.searching[side] ? 'shown' : 'items'

			this[listOn][side].forEach(i => {
				this.elements.list[side].appendChild(this.renderListItem(i, side))
			})
		})

		new CustomEvent('selected', { items: this.items.right})
	}

	get selected () {
		return this.items.right
	}

	renderListItem (item, side) {
		let el = document.createElement("li")
		el.setAttribute("data-value", item.value)
		el.setAttribute('data-side', side)
		el.innerHTML = item[this.config.labelField]
		el.addEventListener("click", this.listItemClicked.bind(this, item));
		return el
	}

	listItemClicked (item, e) {
		const listItem = e.target
		const side = listItem.getAttribute('data-side')

		switch (side) {
			case 'left':
				this.move(item, 'left', 'right')
				break;
			case 'right':
				this.move(item, 'right', 'left')
				break;
		}
		this.render()
	}



	setSearchList () {
		SIDES.forEach(side => {
			if (this.searching[side]) {
				this.shown[side] = this.items[side].filter(item => {
					return item[this.config.labelField].toLowerCase().indexOf(this.searching[side].toLowerCase()) !== -1
				})
			}
		})
	}

	move (item, from, to) {
		this.items[to].push(item)
		this.items[from] = this.items[from].filter(option => item !== option)
		this.setSearchList()
	}
}