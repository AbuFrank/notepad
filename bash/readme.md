# Bash

## Cat

Show lines around abbreviated return

```bash
cat /var/log/syslog -n | head -n 50 | tail -n 10
```

```bash
cat /var/log/syslog -n | grep " 50" -b10 -a10
```

## Video to Gif notes

[[ffmpeg-web-video-guide]]
[[movtowebm]]
[[mp4togif]]

## Find

Find a specific file or folder

```bash
find / -name $fileOrFolderName
```

## Package Integrity Verification

get hash of file

```bash
shasum -a 256 ~/Downloads/disk\ images/aws-sam-cli-macos-x86_64.pkg
```

compare hash of file against expected hash
note the "*" before the file name

```bash
echo "eba5d0f8c74f254c9416eaf5bca3cc4f7194e924602004c4ada002855b349341 *aws-sam-cli-macos-x86_64.pkg" | shasum -a 256 -c
```

bash function for mac

```bash
# 256sum <hash> <path-to-file>
function 256sum {
  echo "$1 *$2" | shasum -a 256 -c
}
```
