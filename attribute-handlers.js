/*! Attribute Handlers v0.0.1 - (c) 2024 Maurice van Creij - MIT License - https://github.com/WoollyMittens */

import { AccordionList } from "./accordion-list.js";

// public handler class
export class AttributeHandlers {
	constructor() {
		// stores the instances of handlers for reference
		this.instances = {};
		// a reference of supported handler classes
		this.handlers = {
			"[data-accordion-list]": AccordionList,
		};
		// re-apply after async content changes
		this.observer = new MutationObserver(this.check.bind(this)).observe(document.body, {
			attributes: false,
			childList: true,
			subtree: true,
		});
		// check at least once
		this.check();
	}

	// creates an instance of the handler if needed
	instantiate(selector, handler, instances) {
		// select any elements associated with the handler
		let elements = [...document.querySelectorAll(selector)];
		for (let element of elements) {
			// if the element isn't an instance yet
			if (!instances.includes(element)) {
				// create a new instance of the handler for the element
				new handler(element);
				// store the new instance for reference
				instances.push(element);
			}
		}
	}

	// check the document for new instances
	check() {
		// create instances of all handlers
		for (let selector in this.handlers) {
			// use the existing list of instances or create a new one
			this.instances[selector] = this.instances[selector] || [];
			// create an instance of this handler
			this.instantiate(selector, this.handlers[selector], this.instances[selector]);
		}
	}
}

// expose the main class (disable if importing)
window.AttributeHandlers = AttributeHandlers;
