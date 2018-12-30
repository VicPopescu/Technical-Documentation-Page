/**
 * 'Closest' polyfil
 */
if (!Element.prototype.matches)
	Element.prototype.matches =
		Element.prototype.msMatchesSelector ||
		Element.prototype.webkitMatchesSelector;

if (!Element.prototype.closest) {
	Element.prototype.closest = function(s) {
		var el = this;
		if (!document.documentElement.contains(el)) return null;
		do {
			if (el.matches(s)) return el;
			el = el.parentElement || el.parentNode;
		} while (el !== null && el.nodeType === 1);
		return null;
	};
}

const menuToggler = document.querySelector('.toggle');
const menuContainer = document.querySelector('.navbar');
const copyCode = document.getElementsByClassName('.copyCode');
let lastCopied: HTMLElement = null;
/**
 * Toggle menu open/close on mobile view
 */
const toggleMenu = () => {
	menuContainer.classList.toggle('nav-full');
};
/**
 * Copy code to clipboard
 */
const copyToClipboard = event => {
	if (lastCopied) {
		lastCopied.innerHTML = 'COPY';
		lastCopied.classList.remove('show');
	}
	lastCopied = event.target;
	const copyText = lastCopied
		.closest('.code-container')
		.querySelector('.code');
	const textHolder = document.createElement('textarea');
	textHolder.value = copyText.textContent;
	document.body.append(textHolder);
	try {
		textHolder.select();
		document.execCommand('Copy');
	} catch (err) {
		console.log('Unable to copy...');
	}
	textHolder.remove();
	lastCopied.innerHTML = 'COPIED TO CLIPBOARD...';
	lastCopied.classList.add('show');
};

/**
 * Add Event listneres
 */
menuToggler.addEventListener('click', toggleMenu, false);
document
	.querySelectorAll('.copyCode')
	.forEach(el => el.addEventListener('click', copyToClipboard, false));
document
	.querySelectorAll('.nav-link')
	.forEach(el =>
		el.addEventListener(
			'click',
			() => menuContainer.classList.toggle('nav-full'),
			false
		)
	);
