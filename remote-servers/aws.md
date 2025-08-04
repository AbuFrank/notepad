# AWS

### retrieve files from s3 bucket

```bash
aws s3 ls s3://<url>
```

### Examples

```bash
#list items in s3 bucket
aws s3 ls s3://bucket-name/sub-directory/
```

### loop through filenames in s3 bucket and print to console

```bash
origin="s3://bucket-nae/sub-directory/"
count=0
for filename in $(aws s3 ls $origin);
do
    echo $filename
done;
```
