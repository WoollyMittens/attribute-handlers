/*! Accordion List v0.0.1 - (c) 2024 Maurice van Creij - MIT License - https://github.com/WoollyMittens */

// applies accordion functionality to definition lists
export class AccordionList {
	constructor(element) {
		// for all the title elements in the container
		const elements = element.querySelectorAll("dt");
		for (let element of elements) {
			// handle clicks on the selected element
			element.addEventListener("click", this.onToggle.bind(this, element));
		}
	}

	onToggle(element, evt) {
		// cancel the default reaction to the click
		evt.preventDefault();
		// toggle the state of the element
		const isOpen = element.getAttribute("data-open") === "true";
		element.setAttribute("data-open", !isOpen);
	}
}
