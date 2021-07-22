import {LEFT, RIGHT} from './Constants.js'

export default class Elements {
	constructor(el) {
		this.el = el
		this.setElements()	
	}

	setElements () {
		this.elements = {
			list : {
				Left: this.select('.selectit-left .selectit-list'),
				Right: this.select('.selectit-right .selectit-list') 
			},
			counter: {
				Left: this.select('.selectit-left .selectit-count'),
				Right: this.select('.selectit-right .selectit-count'),
			},
			close : {
				Left: this.select('.selectit-left .close'),
				Right: this.select('.selectit-right .close'),
			},
			input : {
				Left: this.select('.selectit-left .selectit-search input'),
				Right: this.select('.selectit-right .selectit-search input'),
			}


		}
	}
	
	select(string) {
		return this.el.querySelector(`${string}`)
	}
}