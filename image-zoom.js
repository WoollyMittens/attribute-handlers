/*! Image Zoom v0.0.1 - (c) 2024 Maurice van Creij - MIT License - https://github.com/WoollyMittens */

// allows an image to be zoomed interactively
export class ImageZoom {
	constructor(element) {
		this.element = element;
		// get the image element
		this.image = element.querySelector("img");
		// add the touch layer if needed
		this.touch = element.querySelector(".touch");
		if (!this.touch) {
			this.touch = document.createElement('div');
			this.touch.setAttribute('class', 'touch');
			element.appendChild(this.touch);
		}
		// add the mouse interaction
		this.touch.addEventListener("mouseover", this.start.bind(this, false), { passive: false });
		this.touch.addEventListener("mousemove", this.move.bind(this), { passive: true });
		this.touch.addEventListener("mouseout", this.reset.bind(this), { passive: true });
		// add the touch interaction
		this.touch.addEventListener("touchstart", this.start.bind(this, true), { passive: false });
		this.touch.addEventListener("touchmove", this.move.bind(this), { passive: true });
		this.touch.addEventListener("touchcancel", this.reset.bind(this), { passive: true });
		this.touch.addEventListener("touchend", this.reset.bind(this), { passive: true });
	}

	get active() {
		return (this.element.getAttribute('data-image-zoom') === 'active');
	}

	set active (value) {
		this.element.setAttribute('data-image-zoom', value ? 'active' : 'passive');
	}

	start(cancel, evt) {
		if (cancel) evt.preventDefault();
		// enlarge the image
		this.active = true;
		// calculate the dimensions before allowing movement
		setTimeout(() => {
			this.imageWidth = this.image.offsetWidth;
			this.imageHeight = this.image.offsetHeight;
			this.touchWidth = this.touch.offsetWidth;
			this.touchHeight = this.touch.offsetHeight;
			this.translateWidth = (this.imageWidth > this.touchWidth) ? this.touchWidth / this.imageWidth : 1;
			this.translateHeight = (this.imageHeight > this.touchHeight) ? this.touchHeight / this.imageHeight : 1;
			this.translateWidthMin = ((1 - this.translateWidth) / 2) * 100;
			this.translateHeightMin = ((1 - this.translateHeight) / 2) * 100;
			this.translateWidthMax = -this.translateWidthMin;
			this.translateHeightMax = -this.translateHeightMin;
			this.allowMove = true;
		}, 0);
	}

	move(evt) {
		if (!this.allowMove) return;
		// use the mouse offset to reposition the image
		const touchRect = this.touch.getBoundingClientRect();
		const touchLeft = (evt.touches) ? evt.touches[0].clientX - touchRect.left : evt.offsetX;
		const touchTop = (evt.touches) ? evt.touches[0].clientY - touchRect.top : evt.offsetY;
		const translateLeft = (this.translateWidthMax - this.translateWidthMin) * touchLeft / this.touchWidth + this.translateWidthMin;
		const translateTop = (this.translateHeightMax - this.translateHeightMin) * touchTop / this.touchHeight + this.translateHeightMin;
		this.image.style.transform = `translate3d(${translateLeft - 50}%, ${translateTop - 50}%, 0)`;
	}

	reset() {
		// recentre the image
		this.image.style.transform = `translate3d(-50%, -50%, 0)`;
		this.active = false;
		this.allowMove = false;
	}
}
