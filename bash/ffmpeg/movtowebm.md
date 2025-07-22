# Converting .mov files to .webm

`-c` "channel" `v` for video
`libvpx` the common library for media formats
`-an` without audio
`scale=1280:-2` resizes video size to 1280 width, retaining aspect ratio, but keeping the height value _even_ (prevents errors with some frames)
`-threads 0` something to do with less toll on RAM

```bash
ffmpeg -i input.mov -c:v libvpx -an -vf scale=1280:-2 -threads 0 output.webm
```
