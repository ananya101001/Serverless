// Import AWS SDK v3 modules
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');

// Create an S3 client
const s3 = new S3Client({ region: 'us-west-1' }); // Replace with your bucket's region

// Function to upload file to S3
async function uploadToS3(filePath, bucketName, keyName) {
    try {
        // Read file from the local file system
        const fileContent = fs.readFileSync(filePath);

        // S3 upload parameters
        const params = {
            Bucket: bucketName,
            Key: keyName, // File name to save as in S3
            Body: fileContent,
            ACL: 'public-read', // Optional: makes the file publicly accessible
            ContentType: 'image/jpeg', // Add content type (change based on the file type)
        };

        // Upload the file to S3
        const command = new PutObjectCommand(params);
        const response = await s3.send(command);

        console.log(`File uploaded successfully at https://${bucketName}.s3.amazonaws.com/${keyName}`);
    } catch (err) {
        console.error("Error uploading to S3: ", err);
    }
}

// Example usage of upload function
const filePath = path.join(__dirname, 'doge-memes', 'doge1.jpg'); // Path to your image
const bucketName = 'doge-memebucket'; // Replace with your S3 bucket name
const keyName = 'doge-memes/doge1.jpg'; // Desired file path/key in the S3 bucket

uploadToS3(filePath, bucketName, keyName);
