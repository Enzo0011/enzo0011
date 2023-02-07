alert(12);
var ml4 = {};
ml4.opacityIn = [0, 1];
ml4.scaleIn = [0.2, 1];
ml4.scaleOut = 3;
ml4.durationIn = 800;
ml4.smallDurationIn = 50;
ml4.durationOut = 600;
ml4.delay = 300;

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
}


var ticking = false;
var isFirefox = (/Firefox/i.test(navigator.userAgent));
var isIe = (/MSIE/i.test(navigator.userAgent)) || (/Trident.*rv\:11\./i.test(navigator.userAgent));
var scrollSensitivitySetting = 30;
var slideDurationSetting = 600;
var currentSlideNumber = 0;
var totalSlideNumber = $(".background").length;

function parallaxScroll(evt) {
    if (isFirefox) {
        delta = evt.detail * (-120);
    } else if (isIe) {
        delta = -evt.deltaY;
    } else {
        delta = evt.wheelDelta;
    }

    if (ticking != true) {
        if (delta <= -scrollSensitivitySetting) {
            ticking = true;
            if (currentSlideNumber !== totalSlideNumber - 1) {
                currentSlideNumber++;
                nextItem();
            }
            slideDurationTimeout(slideDurationSetting);
        }
        if (delta >= scrollSensitivitySetting) {
            ticking = true;
            if (currentSlideNumber !== 0) {
                currentSlideNumber--;
            }
            previousItem();
            slideDurationTimeout(slideDurationSetting);
        }
    }
}

function slideDurationTimeout(slideDuration) {
    setTimeout(function () {
        ticking = false;
    }, slideDuration);
}

var mousewheelEvent = isFirefox ? "DOMMouseScroll" : "wheel";
window.addEventListener(mousewheelEvent, _.throttle(parallaxScroll, 60), false);

function nextItem() {
    var $previousSlide = $(".background").eq(currentSlideNumber - 1);
    $previousSlide.removeClass("up-scroll").addClass("down-scroll");
    startAnimation();
}

function previousItem() {
    var $currentSlide = $(".background").eq(currentSlideNumber);
    $currentSlide.removeClass("down-scroll").addClass("up-scroll");
    setTimeout(startAnimation, 1000);
}

function goToCV() {
    alert(1);
    currentSlideNumber = 1;
    alert(2);
    nextItem();
    setTimeout(() => {
        currentSlideNumber = 2;
        nextItem();
    }, 2000);
    alert(3);
}
