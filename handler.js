const AWS = require('aws-sdk');
const { createCanvas, loadImage } = require('@napi-rs/canvas'); // Make sure to install this package
const s3 = new AWS.S3();
const BUCKET_NAME = 'doge-memebucket'; // Your S3 bucket name

module.exports.create = async (event) => {
    // Get the message from event
    const message = event.message || 'Doge';
    
    // Create a canvas and get the context
    const canvas = createCanvas(800, 400);
    const ctx = canvas.getContext('2d');
    
    // Load an image (for example, a Doge meme template)
    const image = await loadImage('path/to/your/doge/template.jpg'); // Provide the correct path
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    
    // Set text properties and add text to the canvas
    ctx.font = 'bold 50px sans-serif';
    ctx.fillStyle = 'white';
    ctx.fillText(message, 50, 100); // Adjust position as needed
    
    // Convert canvas to a buffer
    const buffer = canvas.toBuffer('image/png');

    // Upload the image to S3
    const imageName = `doge-meme-${Date.now()}.png`; // Unique image name
    await s3.upload({
        Bucket: BUCKET_NAME,
        Key: imageName,
        Body: buffer,
        ContentType: 'image/png',
    }).promise();

    // Create the URL of the uploaded image
    const imageUrl = `https://${BUCKET_NAME}.s3.amazonaws.com/${imageName}`;

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "Create function executed successfully!",
            imageUrl: imageUrl, // Include the image URL in the response
            input: event,
        }),
    };
};
