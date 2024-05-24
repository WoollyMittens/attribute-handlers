/*! Layout Switch v0.0.1 - (c) 2024 Maurice van Creij - MIT License - https://github.com/WoollyMittens */

// a persistent choice between layouts
export class LayoutSwitch {
	constructor(element) {
		// retrieve the previous session
		const stored = sessionStorage.getItem("layout-switch");
		// to all the current radio elements
		const radios = element.querySelectorAll('input[type="radio"]');
		for (let radio of radios) {
			// handle changes
			radio.addEventListener("change", this.update.bind(this, radio));
			// restore the value
			if (stored === radio.value) {
				radio.checked = true;
				this.update(radio);
			}
		}
	}
	update(radio) {
		// store the checked choice in local storage
		if (radio.checked) {
			document.body.setAttribute("data-layout", radio.value);
			sessionStorage.setItem("layout-switch", radio.value);
		}
	}
}
