const aws = require('aws-sdk')
const fs = require('fs')

/**
 * This is one way and the more standard and secure way is storing the 
 * (.pem) file in the production server if in case the on premise or other than AWS
 * PAAS wants to communicate to S3.
 * 
 * If in case, we have the application server deployed in the EC2 instance then
 * we do not have to care about the (.pem) || the below lines...
 * 
 * While storing the (.pem) file in the production server (on-premise) or lower region, 
 * we have to
 * change the permission of the file for safety.
 * 
 */
aws.config.update({
    secretAccessKey: '',
    accessKeyId: '',
    // region: ''
});

const s3 = new aws.S3();

const fileName = 'sample.txt'

const uploadFile = () => {
    fs.readFile(fileName, 'utf-8', (err, data) => {
       if (err) throw err;

       const params = {
           Bucket: 'hari-123', // pass your bucket name
           Key: fileName, // file name that has been parsed
           Body: JSON.stringify(data)
       };

       s3.upload(params, function(err, data) {
           if (err) throw err
           console.log(`File uploaded successfully at ${data.Location}`)
       });
    });
  };

  uploadFile()


  const getfile = s3.getObject({
    Bucket: 'hari-123', // pass your bucket name
    Key: fileName, // file name that needs to be read
  }, (err, data) => {
      if (err) throw err;
      
      fs.writeFile('Output.txt', data.Body, (err) => {
          if (err) console.log(err)
      })
  })