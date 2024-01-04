// This goes in the body of the HTML: <canvas id="canvas" width="500" height="500"></canvas>
const canvas = document.getElementById('canvas');   // To access the canvas element in the html
const faceColor = document.getElementById('face-color');
const borderColor = document.getElementById('border-color');
const lineColor = document.getElementById('line-color');  // Line stands for the hour and the minute lines
const largeHandColor = document.getElementById('large-hand-color'); // Large hand stands for the hour and minute hand
const secondHandColor = document.getElementById('second-hand-color');


function clock() {  // This function will run with every re-painting
  const now = new Date(); // To get the current date / time
  const ctx = canvas.getContext('2d');

  // Setup canvas
  ctx.save(); // To save the default state
  ctx.clearRect(0, 0, 500, 500);    // To clear the whole rectangle with every re-painting - 0, 0, 500, 500 -> start x (from left), start y (from top), height, width (we use the whole canvas frame)
  ctx.translate(250, 250);    // To set the 0-0-point in the middle
  ctx.rotate(-Math.PI / 2);   // To rotate clock -90 degree

  // Set default style
  ctx.strokeStyle = '#000000';    // To set the (line) color to black
  ctx.fillStyle = '#f4f4f4';  // light gray
  ctx.lineWidth = 5;
  ctx.lineCap = 'round'; // To make the end of the line rounded

  // Draw clock face / border
  ctx.save(); // To safe the state (everything what we set before)
  ctx.beginPath();    // The start point
  ctx.lineWidth = 14;
  // ctx.strokeStyle = '#800000';    // This will only apply within the .save() and .restore()
  ctx.strokeStyle = borderColor.value;    // To chnage the border color with the color input field
  ctx.fillStyle = faceColor.value;    // To chnage the border color with the color input field
  ctx.arc(0, 0, 142, 0, Math.PI * 2, true);  // 0, 0 are the start points of the clock - 142 is the radius - 0 is the start angle - Math.PI * 2 is the end angle, true for counter clockwise
  ctx.stroke();   // To draw it
  ctx.fill(); // To fill the clock (with light gray)
  ctx.restore();  // To restore - but it is not gonna change the default style

  // Draw hour lines (12)
  ctx.save(); // To safe the state (everything what we set before)
  ctx.strokeStyle = lineColor.value;  // To chnage the border color with the color input field
  for (let index = 0; index < 12; index++) {
      ctx.beginPath();    // The start point
      ctx.rotate(Math.PI / 6);    // To rotate 30 degree per iteration
      ctx.moveTo(100, 0);   // The start point - to move to 0, 0 (left, top) - but is is in the middle due to .translate(250, 250) and rotated by -90 degree (so x is like y)
      ctx.lineTo(120, 0);   // The end point - to give us a point / dot
      ctx.stroke();   // To draw it        
  }
  ctx.restore();  // To restore - but it is not gonna change the default style

  // Draw minute lines
  ctx.save(); // To safe the state (everything what we set before)
  ctx.strokeStyle = lineColor.value;  // To chnage the border color with the color input field
  ctx.lineWidth = 4;
  for (let index = 0; index < 60; index++) {
      if (index % 5 !== 0) {  // To just draw the minute lines when the minute line wouldn't cross a hour line
          ctx.beginPath();    // The start point
          ctx.moveTo(117, 0);   // The start point - to move to 0, 0 (left, top) - but is is in the middle due to .translate(250, 250) and rotated by -90 degree (so x is like y)
          ctx.lineTo(120, 0);   // The end point - to give us a point / dot
          ctx.stroke();   // To draw it   
      };
      ctx.rotate(Math.PI / 30);    // To rotate 6 degree per iteration - 360 / 60 or 180 / 30
  }
  ctx.restore();  // To restore - but it is not gonna change the default style

  // Get current time
  const hr = now.getHours() % 12; // % 12 to get a 12 hour format
  const min = now.getMinutes();
  const sec = now.getSeconds();
  // console.log(`${hr}:${min}:${sec}`); // To show the time

  // Draw hour hand
  ctx.save();
  ctx.rotate((Math.PI / 6) * hr + (Math.PI / 360) * min + (Math.PI / 21600) * sec);
  // ctx.strokeStyle = '#800000';
  ctx.strokeStyle = largeHandColor.value;
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.moveTo(-20, 0);
  ctx.lineTo(80, 0);
  ctx.stroke();
  ctx.restore();

  // Draw min hand
  ctx.save();
  ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
  // ctx.strokeStyle = '#800000';
  ctx.strokeStyle = largeHandColor.value;
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(-28, 0);
  ctx.lineTo(112, 0);
  ctx.stroke();
  ctx.restore();

  // Draw sec hand
  ctx.save();
  ctx.rotate((Math.PI / 30) * sec);
  // ctx.strokeStyle = '#FF7F50';
  // ctx.fillStyle = '#FF7F50';  // To fill the circle with color
  ctx.strokeStyle = secondHandColor.value;
  ctx.fillStyle = secondHandColor.value;  // To fill the circle with color
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(-30, 0);
  ctx.lineTo(100, 0);
  ctx.stroke();
  // For the circle in the middle
  ctx.beginPath();
  ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
  ctx.fill();
  // 
  ctx.restore();

  ctx.restore();  // restore default state

  requestAnimationFrame(clock);   // To run it recursively
}

requestAnimationFrame(clock);   // To run it

// Save canvas as an image
document.getElementById('save-btn').addEventListener('click', () => {
  const dataURL = canvas.toDataURL('image/png');
  const link = document.createElement('a'); // a tag
  link.download = 'clock.png';  // clock.png will be the file name
  link.href = dataURL;
  link.click(); // To fire of the event in the script
});