document.addEventListener 'DOMContentLoaded', () ->

	accordionToggles = document.querySelectorAll('.toggle')
	[].forEach.call accordionToggles, (elem, i) ->
		elem.addEventListener 'click', () ->
			item = this.parentElement
			if item.classList.contains('opened')
				collapsable = item.querySelectorAll('.collapsable')[0]
				collapsable.style.height = 0
				item.classList.remove('opened')
			else
				opened = item.parentElement.querySelectorAll('.item.opened')
				[].forEach.call opened, (elem, i) ->
					elem.classList.remove('opened')
					elem.querySelectorAll('.collapsable')[0].style.height = 0
				collapsable = item.querySelectorAll('.collapsable')[0]
				height = item.querySelectorAll('.content')[0].clientHeight
				collapsable.style.height = height+'px'
				item.classList.add('opened')
			
	window.addEventListener 'resize', () ->
		openedItems = document.querySelectorAll('.item.opened')
		[].forEach.call openedItems, (item, i) ->
			console.log height
			height = item.querySelectorAll('.content')[0].clientHeight
			collapsable = item.querySelectorAll('.collapsable')[0]
			collapsable.style.height = height+'px'
		