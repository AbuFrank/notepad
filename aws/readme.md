# AWS

## S3

copy prefixed items from bucket

```bash
aws s3 cp s3://my-bucket/ <local directory path> --recursive --exclude "*" --include "<prefix>*"
```
