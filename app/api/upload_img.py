#from werkzeug.utils import secure_filename
import boto3
import os

s3 = boto3.client(
    's3',
    aws_access_key_id=os.environ.get('AWS_ACCESS_ID'),
    aws_secret_access_key=os.environ.get('AWS_SECRET_KEY')
)

def upload_img(file, acl='public-read'):
    # attempt upload
    try:
        s3.upload_fileobj(
            file,
            os.environ.get('AWS_BUCKET_NAME'),
            file.filename,
            ExtraArgs = {
                "ACL":acl,
                # can change this to img once tested
                "ContentType": file.content_type
            }
        )

    except Exception as err:
        print('debug aws upload err', err)
        return err

    return file.filename
