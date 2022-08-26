const body = document.querySelector('body');
let rwyHeading = document.querySelector('#rwy-heading');
let windDirection = document.querySelector('#wind-direction');
let windSpeed = document.querySelector('#wind-speed');
const form = document.querySelector('#rwy-heading-form');
const calcButton = document.querySelector('button');
const answer = document.querySelector('.answer');

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

calcButton.addEventListener('click', (e) => {
    e.preventDefault();
    xwindComponent = getComponents(rwyHeading, windDirection, windSpeed);
    answer.textContent = xwindComponent;
})

function getDifference(windDirection, rwyHeading) {
    windDirection = windDirection.value.slice(1, 3);
    rwyHeading = rwyHeading.value + 0;
    // console.log(windDirection);
    // console.log(rwyHeading);

    let angle = (windDirection - rwyHeading) % 360;
    // console.log(angle);

    if (angle >= 180) {
        angle -= 360
    }

    return angle;
}

function getComponents(rwyHeading, windDirection, windSpeed) {
    windSpeed = windSpeed.value;
    let windAngle = getDifference(windDirection, rwyHeading);
    let xwindComponentRaw = windSpeed * Math.sin(windAngle * (Math.PI / 180));
    const xwindComponent = Math.abs(Math.round(xwindComponentRaw));

    return `${xwindComponent} KTS`;
}