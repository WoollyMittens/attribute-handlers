		// display scroll indicator for blog articles on mobile
		class ScrollBlogs {
			constructor(element) {
				this.scroller = element.querySelector('.block-content');
				this.cards = element.querySelectorAll('.block-post');
				this.indicator = document.createElement('nav');
				this.observer = new IntersectionObserver(this.intersected.bind(this), { root: this.scroller, rootMargin: '0px', threshold: 0.6 });
				this.dots = [];
				for(let card of this.cards) {
					let id = 'blog_card_' + this.dots.length;
					card.setAttribute('id', id);
					let dot = document.createElement('a');
					dot.setAttribute('href', '#' + id);
					dot.setAttribute('data-target', id);
					dot.innerHTML = 'Page' + this.dots.length;
					dot.addEventListener('click', this.scroll.bind(this, card));
					this.indicator.appendChild(dot);
					this.observer.observe(card);
					this.dots.push(dot);
				}
				element.appendChild(this.indicator);
			}
			scroll(card, evt) {
				evt.preventDefault();
				card.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
			}
			intersected(entries) {
				for(let entry of entries) {
					if (entry.isIntersecting) {
						this.indicator.setAttribute('data-active', entry.target.getAttribute('id'));
					}
				}
			}
		}

/*
		nav {
			display: flex;
			justify-content: center;
			gap: 12px;
			margin: 16px auto;
			a {
				display: block;
				width: 8px;
				height: 8px;
				font-size: 0;
				overflow: hidden;
				background-color: #00A0FF;
				border: solid 5px #FFFFFF;
				outline: solid 1px #FFFFFF;
				border-radius: 50%;
			}
			&[data-active="blog_card_0"] a:nth-child(1),
			&[data-active="blog_card_1"] a:nth-child(2),
			&[data-active="blog_card_2"] a:nth-child(3),
			&[data-active="blog_card_3"] a:nth-child(4),
			&[data-active="blog_card_4"] a:nth-child(5),
			&[data-active="blog_card_5"] a:nth-child(6) {
				background-color: #B7C4DE;
				border: solid 5px #FFFFFF;
				outline: solid 1px #B7C4DE;
			}
		}
*/