const body = document.querySelector('body');

let rwyHeading = document.querySelector('#rwy-heading');
let windDirection = document.querySelector('#wind-direction');
let windSpeed = document.querySelector('#wind-speed');

const form = document.querySelector('#rwy-heading-form');
const calcButton = document.querySelector('button');
const xanswer = document.querySelector('.x-answer');
const hanswer = document.querySelector('.h-answer');
const headwindLabel = document.querySelector('.headwind');
const reset = document.querySelector('.reset');

const rwyHeadingBorder = document.querySelector('#rwy-heading');
const windDirectionBorder = document.querySelector('#wind-direction');
const windSpeedBorder = document.querySelector('#wind-speed');

const regexNum = /^[0-9]*$/;

const images = ['https://i.stack.imgur.com/vkIDc.jpg',
    'https://4.bp.blogspot.com/-SCgTiXVNcxw/VBfqVNSODYI/AAAAAAABM10/6y3WrER7ERY/s0/Delta%2BAirline%2Bon%2BJFK%2BAirport_Ultra%2BHD.jpg',
    'https://fthmb.tqn.com/th52YHmUspe0-ukoVQB6JbQ8LgE=/3865x2576/filters:fill(auto,1)/airplane-in-flight-872042016-5ab843e4ff1b780036a353aa.jpg',
    'http://travelbestway.org/wp-content/uploads/2010/02/air-travel.jpg',
    'https://i0.wp.com/myedmondsnews.com/wp-content/uploads/2016/04/Flying-Heritage-fighter-plane.jpg']

function randomImage(array) {
    imageIndex = Math.floor(Math.random(array) * images.length);
    body.style.backgroundImage = `url("${images[imageIndex]}")`;
}

window.addEventListener('load', () => {
    randomImage(images);
})

function checkRwyHeading(rwyHeading) {

    if (rwyHeading === '' || !rwyHeading.match(regexNum) || rwyHeading > 36 || rwyHeading < 0) {
        rwyHeadingBorder.style.borderBottom = '3px solid #e76f51';
        rwyHeadingBorder.classList.add('horizontal-shaking');
        rwyHeading = 'error';
        // console.log(`Incorrect Runway Heading is ${rwyHeading}`);
        return rwyHeading;
    } else {
        rwyHeadingBorder.style.borderBottom = '3px solid #e9c46a';
        rwyHeading = rwyHeading + '0';
        // console.log(`Runway Heading is ${rwyHeading}`);
        return rwyHeading;
    }
}

function checkWindDirection(windDirection) {
    if (windDirection === '' || !windDirection.match(regexNum) || windDirection > 360 || windDirection < 0 || windDirection.length < 3) {
        windDirectionBorder.style.borderBottom = '3px solid #e76f51';
        windDirectionBorder.classList.add('horizontal-shaking');
        windDirection = 'error';
        // console.log(`Incorrect Wind Direction is ${windDirection}`);
        return windDirection;
    } else {
        windDirectionBorder.style.borderBottom = '3px solid #e9c46a';
        // console.log(`Correct Wind Direction is ${windDirection}`);
        return windDirection;
    }
}

function checkWindSpeed(windSpeed) {
    if (windSpeed === '' || !windSpeed.match(regexNum) || windSpeed < 0) {
        windSpeedBorder.style.borderBottom = '3px solid #e76f51';
        windSpeedBorder.classList.add('horizontal-shaking');
        windSpeed = 'error';
        // console.log(`Incorrect Wind Speed is: ${windSpeed}`);
        return windSpeed;
    } else {
        windSpeedBorder.style.borderBottom = '3px solid #e9c46a';
        // console.log(`Wind Speed is: ${windSpeed}`);
        return windSpeed;
    }
}

function getAngle(windDirection, rwyHeading) {
    let angle = (windDirection - rwyHeading) % 360;

    if (angle >= 180) {
        angle = angle - 360;
    }
    // console.log(`Angle is ${angle}`)
    return angle;
}


function getDifference(windDirection, rwyHeading) {

    windDirection = windDirection.value;
    rwyHeading = rwyHeading.value;

    return getAngle(checkWindDirection(windDirection), checkRwyHeading(rwyHeading));
}

function getComponents(rwyHeading, windDirection, windSpeed) {
    windSpeed = windSpeed.value;

    checkWindSpeed(windSpeed);

    const windAngle = getDifference(windDirection, rwyHeading);

    let xwindComponentRaw = windSpeed * Math.sin(windAngle * (Math.PI / 180));
    const xwindComponent = Math.abs(Math.round(xwindComponentRaw));

    const hwindComponent = windSpeed * Math.cos(windAngle * (Math.PI / 180));

    return [xwindComponent, hwindComponent];
}

calcButton.addEventListener('click', (e) => {
    e.preventDefault();
    [xwindComponent, hwindComponent] = getComponents(rwyHeading, windDirection, windSpeed);

    if (isNaN(xwindComponent)) {
        xanswer.textContent = '-- KTS';
    } else {
        xanswer.textContent = xwindComponent + ' KTS';
    }

    if (isNaN(hwindComponent)) {
        hanswer.textContent = '-- KTS';
    } else if (hwindComponent < 0) {
        hwindComponent = Math.abs(Math.round(hwindComponent));
        hanswer.textContent = hwindComponent + ' KTS';
        hanswer.style.color = '#e76f51';
        headwindLabel.textContent = 'Tailwind';
    } else {
        hwindComponent = Math.abs(Math.round(hwindComponent));
        hanswer.textContent = hwindComponent + ' KTS';
    }
})

reset.addEventListener('click', () => {
    form.reset();
    xanswer.textContent = '-- KTS';
    hanswer.textContent = '-- KTS';
    headwindLabel.textContent = 'Headwind';
    hanswer.style.color = '#2a9d8f';

    rwyHeadingBorder.style.borderBottom = '3px solid #e9c46a';
    windDirectionBorder.style.borderBottom = '3px solid #e9c46a';
    windSpeedBorder.style.borderBottom = '3px solid #e9c46a';
})