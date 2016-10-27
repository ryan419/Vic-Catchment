import angular from 'angular';
import Question1 from './question1/q1';
import Question2 from './question2/q2';
import Question3 from './question3/q3';
import Question4 from './question4/q4';

import 'bootstrap/dist/css/bootstrap.css';
require("./Home.css");



export default angular
	.module('Home', [Question1.name,
		Question2.name,
		Question3.name,
		Question4.name])
	.controller('HomeCtrl', ['$scope', '$window', '$compile', '$document', function($scope, $window, $compile, $document) {
		//login modal
		//
		//
		$document.ready(function() {
			let image = document.querySelector('img');

			console.log(image);

			let imageCanvas = document.createElement('canvas');

			console.log(imageCanvas);
			let imageCanvasContext = imageCanvas.getContext('2d');
			let lineCanvas = document.createElement('canvas');
			let lineCanvasContext = lineCanvas.getContext('2d');



			console.log(lineCanvas);

			console.log(lineCanvasContext);
			let pointLifetime = 1000;
			let points = [];

			console.log(image.complete);

			if (image.complete) {
				start();
			} else {
				image.onload = start;
			}
			/**
			 * Attaches event listeners and starts the effect.
			 */
			// angular.element(document.body).append(imageCanvas);
			function start() {
				console.log('start');
				document.addEventListener('mousemove', onMouseMove);
				window.addEventListener('resize', resizeCanvases);
				document.body.appendChild(imageCanvas);
				resizeCanvases();
				tick();
			}

			/**
			 * Records the user's cursor position.
			 *
			 * @param {!MouseEvent} event
			 */
			function onMouseMove(event) {
				points.push({
					time: Date.now(),
					x: event.clientX,
					y: event.clientY
				});
			}

			function resizeCanvases() {
				imageCanvas.width = lineCanvas.width = window.innerWidth;
				imageCanvas.height = lineCanvas.height = window.innerHeight;
			}
			/**
			 * Resizes both canvases to fill the window.
			 */
			$window.addEventListener('resize', function(e) {
				resizeCanvases();
			})



			/**
			 * The main loop, called at ~60hz.
			 */
			function tick() {
				// Remove old points
				points = points.filter(function(point) {
					let age = Date.now() - point.time;
					return age < pointLifetime;
				});

				drawLineCanvas();
				drawImageCanvas();
				requestAnimationFrame(tick);
			}

			/**
			 * Draws a line using the recorded cursor positions.
			 *
			 * This line is used to mask the original image.
			 */
			function drawLineCanvas() {
				let minimumLineWidth = 25;
				let maximumLineWidth = 100;
				let lineWidthRange = maximumLineWidth - minimumLineWidth;
				let maximumSpeed = 50;

				lineCanvasContext.clearRect(0, 0, lineCanvas.width, lineCanvas.height);
				lineCanvasContext.lineCap = 'round';
				lineCanvasContext.shadowBlur = 30;
				lineCanvasContext.shadowColor = '#000';

				for (let i = 1; i < points.length; i++) {
					let point = points[i];
					let previousPoint = points[i - 1];

					// Change line width based on speed
					let distance = getDistanceBetween(point, previousPoint);
					let speed = Math.max(0, Math.min(maximumSpeed, distance));
					let percentageLineWidth = (maximumSpeed - speed) / maximumSpeed;
					lineCanvasContext.lineWidth = minimumLineWidth + percentageLineWidth * lineWidthRange;

					// Fade points as they age
					let age = Date.now() - point.time;
					let opacity = (pointLifetime - age) / pointLifetime;
					lineCanvasContext.strokeStyle = 'rgba(0, 0, 0, ' + opacity + ')';

					lineCanvasContext.beginPath();
					lineCanvasContext.moveTo(previousPoint.x, previousPoint.y);
					lineCanvasContext.lineTo(point.x, point.y);
					lineCanvasContext.stroke();
				}
			}

			/**
			 * @param {{x: number, y: number}} a
			 * @param {{x: number, y: number}} b
			 * @return {number} The distance between points a and b
			 */
			function getDistanceBetween(a, b) {
				return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
			}

			/**
			 * Draws the original image, masked by the line drawn in drawLineToCanvas.
			 */
			function drawImageCanvas() {
				// Emulate background-size: cover
				let width = imageCanvas.width;
				let height = imageCanvas.width / image.naturalWidth * image.naturalHeight;

				if (height < imageCanvas.height) {
					width = imageCanvas.height / image.naturalHeight * image.naturalWidth;
					height = imageCanvas.height;
				}

				imageCanvasContext.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
				imageCanvasContext.globalCompositeOperation = 'source-over';
				imageCanvasContext.drawImage(image, 0, 0, width, height);
				imageCanvasContext.globalCompositeOperation = 'destination-in';
				imageCanvasContext.drawImage(lineCanvas, 0, 0);
			}
		});
	}]);