#from werkzeug.utils import secure_filename
import boto3
import os

s3 = boto3.resource(
    's3',
    aws_access_key_id=os.environ.get('AWS_ID'),
    aws_secret_access_key=os.environ.get('AWS_SECRET')
)

bucket = s3.Bucket('bucketobeans');

def upload_img(file, filename):
    try:
        res = bucket.Object(f'{filename}.jpg').put(Body=file)
        print(res)
        return 'ok'
    except Exception:
        return 'Failed to upload image, this is our fault!'
