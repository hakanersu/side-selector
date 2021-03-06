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
			hidden: this.select('.selectit-input')		
		}
	}
	
	select(string) {
		return this.el.querySelector(`${string}`)
	}
}