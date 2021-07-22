export const LEFT = 1
export const RIGHT = 3
export const SIDES = [
	{side: 'Left', data: 'notSelected', search: 'shownLeft'},
	{side: 'Right', data: 'selected', search: 'shownRight'},
]
export const TEMPLATE = `
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
			<input type="search" class="Search"/>
		</div>
		<div class="selectit-container">
			<ul class="selectit-list"></ul>
			<div class="selectit-counter">
				<span class="selectit-deselect">Deselect all</span>
				<span class="selectit-count">x</span>
			</div>
		</div>
	</div>
</div>
`