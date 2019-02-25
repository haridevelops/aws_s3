const fs = require('fs')
const AWS = require('aws-sdk')
const body = fs.createReadStream('./sample.txt')

AWS.config.update({
    region: 'ap-south-1',
    accessKeyId: '',
  secretAccessKey: '',
  sessionToken: ''
})

const s3 = new AWS.S3()

const params = {
    Body: body,
    Bucket: 'hari-bucket-2',
    Key: '123/sample.txt'
}

s3.putObject(params, (err, data) => {
    if (err) console.log(err)
    console.log(data)
})