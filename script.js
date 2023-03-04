var ml4 = {};
ml4.opacityIn = [0, 1];
ml4.scaleIn = [0.2, 1];
ml4.scaleOut = 3;
ml4.durationIn = 800;
ml4.smallDurationIn = 50;
ml4.durationOut = 600;
ml4.delay = 300;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

anime.timeline({ loop: false })
	.add({
		targets: '.ml4 .letters-1',
		opacity: ml4.opacityIn,
		scale: ml4.scaleIn,
		duration: ml4.durationIn
	}).add({
		targets: '.ml4 .letters-1',
		opacity: 0,
		scale: ml4.scaleOut,
		duration: ml4.durationOut,
		easing: "easeInExpo",
		delay: ml4.delay
	}).add({
		targets: '.ml4 .letters-2',
		opacity: ml4.opacityIn,
		scale: ml4.scaleIn,
		duration: ml4.smallDurationIn
	}).add({
		targets: '.ml4 .letters-2',
		opacity: 0,
		scale: ml4.scaleOut,
		duration: ml4.durationOut,
		easing: "easeInExpo",
		delay: ml4.delay
	}).add({
		targets: '.ml4 .letters-3',
		opacity: ml4.opacityIn,
		scale: ml4.scaleIn,
		duration: ml4.smallDurationIn
	}).add({
		targets: '.ml4 .letters-3',
		opacity: 0,
		scale: ml4.scaleOut,
		duration: ml4.durationOut,
		easing: "easeInExpo",
		delay: ml4.delay
	}).add({
		targets: '.ml4 .letters-4',
		opacity: ml4.opacityIn,
		scale: ml4.scaleIn,
		duration: ml4.durationIn
	});

var textWrapper = document.querySelector('.ml13');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

var textWrapper = document.querySelector('.ml14 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

var textWrapper = document.querySelector('.ml7 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

function startAnimation() {
	anime.timeline({ loop: false })
		.add({
			targets: '.ml13 .letter',
			translateY: [100, 0],
			translateZ: 0,
			opacity: [0, 1],
			easing: "easeOutExpo",
			duration: 1400,
			delay: (el, i) => 300 + 30 * i
		});
	anime.timeline({ loop: false })
		.add({
			targets: '.ml14 .line',
			scaleX: [0, 1],
			opacity: [0.5, 1],
			easing: "easeInOutExpo",
			duration: 900
		}).add({
			targets: '.ml14 .letter',
			opacity: [0, 1],
			translateX: [40, 0],
			translateZ: 0,
			scaleX: [0.3, 1],
			easing: "easeOutExpo",
			duration: 800,
			offset: '-=600',
			delay: (el, i) => 150 + 25 * i
		});
	anime.timeline({ loop: false })
		.add({
			targets: '.ml7 .letter',
			translateY: ["1.1em", 0],
			translateX: ["0.55em", 0],
			translateZ: 0,
			rotateZ: [180, 0],
			duration: 750,
			easing: "easeOutExpo",
			delay: (el, i) => 50 * i
		});
}


var ticking = false,
	isFirefox = (/Firefox/i.test(navigator.userAgent)),
	isIe = (/MSIE/i.test(navigator.userAgent)) || (/Trident.*rv\:11\./i.test(navigator.userAgent)),
	scrollSens = 30,
	slideTime = 500,
	current = 0,
	total = $(".background").length;

function parallaxScroll(evt) {
	if (isFirefox) {
		delta = evt.detail * (-120);
	} else if (isIe) {
		delta = -evt.deltaY;
	} else {
		delta = evt.wheelDelta;
	}

	if (!ticking) {
		if (delta <= -scrollSens) {
			ticking = true;
			if (current !== total - 1) {
				current++;
				nextItem();
			}
			slideTimeout(slideTime);
		}
		if (delta >= scrollSens) {
			ticking = true;
			if (current !== 0) {
				current--;
			}
			previousItem();
			slideTimeout(slideTime);
		}
	}
}

function slideTimeout(slideDuration) {
	setTimeout(function () {
		ticking = false;
	}, slideDuration);
}

var mousewheelEvent = isFirefox ? "DOMMouseScroll" : "wheel";
window.addEventListener(mousewheelEvent, _.throttle(parallaxScroll, 60), false);

function nextItem() {
	var $previousSlide = $(".background").eq(current - 1);
	$previousSlide.removeClass("up-scroll").addClass("down-scroll");
	startAnimation();
}

function previousItem() {
	var $currentSlide = $(".background").eq(current);
	$currentSlide.removeClass("down-scroll").addClass("up-scroll");
	setTimeout(startAnimation, 1000);
}


function goTo(dest) {
	if (dest >= total) return;
	if (current < dest) {
		for (i = current; i < dest; i++) {
			current++;
			nextItem();
		}
	} else if (current > dest) {
		for (i = current; i > dest; i--) {
			current--;
			previousItem();
		}
	}
}

var visible = false;

function showMenu() {
	var menu = document.getElementsByClassName("menu")[0];
	if (!visible) {
		visible = !visible;
		menu.style.animationPlayState = 'paused';
		menu.childNodes[1].style.backgroundImage = "url(img/circled2.png)";
		menu.childNodes[3].style.display = "unset";
	} else {
		visible = !visible;
		menu.style.animationPlayState = 'running';
		menu.childNodes[1].style.backgroundImage = "url(img/circled1.png)";
		menu.childNodes[3].style.display = "none";
	}
}

const comp = [
	"<u>HTML</u> est la base de n'importe quel site internet, c'est donc par cela que j'ai commencé.",
	"Le HTML n'est pas très élégant seul, alors j'y met du style avec <u>CSS</u>, un peu répétitif, donc j'ai appris le Sass.",
	"Pour animer tout ça rien de mieux qu'une bonne connaissance en <u>Javascript</u>, je maitrise jQuery, Ajax et d'autres, mais le <u>Javascript</u> natif est tout aussi intuitif.",
	"Et pour le back-end ? J'utilise <u>Node.js</u> comme API, ou comme langage de scripting très réglièrement.",
	"J'apprend de jours en jours à utiliser ReactJS, mais je reste ouvert à l'apprentissage de ses concurrents notament Angular et VueJS",
	"La plupart des sites utilisent encore <u>PHP</u>, il est important de le maitriser.",
	"Qui n'a jamais appris <u>Python</u> ? Toujours utile pour les petites automatisations!",
	"Ayant souvent travaillé avec des serveurs ou machines virtuelles, j'ai acquis une bonne maitrise générale de <u>linux</u>, et de <u>Bash</u>.",
	"Mon ordinateur étant sous Windows, il est important que je connaisse les bases de <u>PowerShell</u>.",
	"Switch, Router, Serveur Web, DNS, Proxy, Serveur Windows, Continuité de service, Haute disponibilités.<br>Toutes ces compétences ont été acquise lors de mon <u>BTS SIO</u>",
	"J'ai un compte root-me, où je m'entraine et j'apprend énormément de choses en rapport avec la sécurité informatique.<br>Dans le monde d'aujourd'hui, rien de plus important !<br><a href='http://root-me.org/TcHp'>Disponible ici.</a>",
	"Ayant déjà des connaissances solides dans le développement, j'ai choisi <br>l'option SISR (Réseau) lors de mon BTS SIO, pour acquérir de nouvelles compétences."
]

async function competences(n) {
	document.getElementsByClassName('content-subtitle')[6].style.animation = "gradient1 0.5s ease";
	await sleep(500);
	document.getElementsByClassName('content-subtitle')[6].style.animation = "gradient2 0.5s ease";
	document.getElementsByClassName('content-subtitle')[6].innerHTML = comp[n];
	await sleep(500);
	document.getElementsByClassName('content-subtitle')[6].style.animation = "";
	await sleep(500);
	animationCompetences();
}

async function animationCompetences() {
	for (i = 0; i < document.getElementsByClassName('comp-text').length; i++) {
		document.getElementsByClassName('comp-text')[i].style.textDecoration = 'underline 3px #fff';
		await sleep(250);
		document.getElementsByClassName('comp-text')[i].style.textDecoration = '';
	}
}