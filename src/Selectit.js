import { TEMPLATE, SIDES } from './Constants.js'
import Elements from './Elements.js'
export default class Select {
	constructor(element, options) {
		const defaultOptions = {
			height: 250,
		}
		this.el = element
		this.config = Object.assign({}, defaultOptions, options || {})
		this.data = options.data || []

		this.selected = []
		this.selectedBackup = []
		this.notSelected = this.data
		this.leftCount = this.notSelected.length
		this.rightCount = this.selected.length
		this.create()
	}

	create () {
		this.el.innerHTML = TEMPLATE

		const container = this.el.querySelector('div')
		container.style.height = `${this.config.height}px`

		const selectAll = this.el.querySelector('span.selectit-selectall')
		selectAll.addEventListener("click", () => this.selectAll());

		const deselectAll = this.el.querySelector('span.selectit-deselect')
		deselectAll.addEventListener("click", () => this.deselectAll());

		const searchLeft = this.el.querySelector('.selectit-left .selectit-search input')
		searchLeft.addEventListener('keyup', (e) => this.searchLeft(e))

		const searchRight = this.el.querySelector('.selectit-right .selectit-search input')
		searchRight.addEventListener('keyup', (e) => this.searchRight(e))

		this.elements = (new Elements(this.el)).elements
		this.render()
	}

	searchLeft (e) {
		const searchingLeft = e.target.value
		if (!searchingLeft || searchingLeft === '') {
			this.searchingLeft = false
			this.shownLeft = false
		} else {
			this.searchingLeft = true
		}

		this.shownLeft = this.notSelected.filter(item => {
			return item.label.toLowerCase().indexOf(searchingLeft.toLowerCase()) !== -1
		})
		if (!searchingLeft) {
			this.shownLeft = false
		}
		this.render()
	}

	searchRight (e) {
		const searchingRight = e.target.value
		if (!searchingRight || searchingRight === '') {
			this.searchingRight = false
			this.shownRight = false
		} else {
			this.searchingRight = true
		}

		this.shownRight = this.selected.filter(item => {
			return item.label.toLowerCase().indexOf(searchingRight.toLowerCase()) !== -1
		})
		if (!searchingRight) {
			this.shownRight= false
		}
		this.render()
	}

	selectAll () {
		this.notSelected = []
		this.selected = this.data
		this.render()
	}

	deselectAll () {
		this.notSelected = this.data
		this.selected = []
		this.render()
	}

	render () {
		SIDES.forEach(item => {
			this.elements.counter[item.side].innerHTML = this[item.data].length
			this.elements.list[item.side].innerHTML = ''
console.log('Search part', this[item.search], this.shownLeft)
			if (!this[item.search]) {
				this[item.data].forEach(i => {
					this.elements.list[item.side].appendChild(this.renderListItem(i, item.side))
				})
			} else {
				if (!this[item.search]) {
					return false
				}
				this[item.search].forEach(i => {
					this.elements.list[item.side].appendChild(this.renderListItem(i, item.side))
				})
			}
		})
	}
	renderListItem (item, side) {
		let el = document.createElement("li")
		el.setAttribute("data-value", item.value)
		el.setAttribute('data-side', side)
		el.innerHTML = item.label
		el.addEventListener("click", this.listItemClicked.bind(this, item));
		return el
	}

	listItemClicked (item, e) {
		const listItem = e.target
		const side = listItem.getAttribute('data-side')

		switch (side) {
			case 'left':
				this.moveLeft(item)
				break;
			case 'right':
				this.moveRight(item)
				break;
		}
		this.render()
	}

	moveLeft (item) {
		this.notSelected = this.notSelected.filter(option => item !== option)
		this.selected.push(item)
	}

	moveRight (item) {
		this.notSelected.push(item)
		this.selected = this.selected.filter(option => item !== option)
	}

}