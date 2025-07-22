# mp4

## Cropping

[crop filter documentation](http://ffmpeg.org/ffmpeg-filters.html#crop)

original 320x240 video

To crop a 80×60 section, starting from position (200, 100):

```bash
ffmpeg -i in.mp4 -vf "crop=80:60:200:100" -c:a copy out.mp4
```

The audio is [stream copied](http://ffmpeg.org/ffmpeg.html#Stream-copy) in this example, so re-encoding is avoided.

To crop the bottom right quarter:

```bash
ffmpeg -i in.mp4 -vf "crop=in_w/2:in_h/2:in_w/2:in_h/2" -c:a copy out.mp4
ffmpeg -i in.mp4 -vf "crop=in_w:in_h/2:0:in_h/4" -c:a copy out.mp4

# same as
ffmpeg -i in.mp4 -vf "crop=320/2:240/2:320/2:240/2" -c:a copy out.mp4
```

Crop 20 pixels from the top, and 20 from the bottom:

```bash
ffmpeg -i in.mp4 -vf "crop=in_w:in_h-40" -c:a copy out.mp4
```
