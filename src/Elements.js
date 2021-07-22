import {LEFT, RIGHT} from './Constants.js'

export default class Elements {
	constructor(el) {
		this.el = el
		this.setElements()	
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
			}

		}
	}
	
	select(string) {
		return this.el.querySelector(`${string}`)
	}
}