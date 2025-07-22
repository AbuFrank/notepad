# Video conversion with FFmpeg

## Install

On mac:

1. [Download](http://evermeet.cx/ffmpeg/) the latest release.
2. Extract the binary and place it in `/usr/local/bin`.

## Command basics

Most basic conversion using Terminal: `ffmpeg -i input.mov output.webm`.

### Strip audio

Flag: `-an`.

### Scale video

Example flag: `-vf scale=1280:-2`.

`-1` for the width or height will keep it in ratio to the other specified dimension.

`-2` will keep it in ratio to the other specified dimension, but, to ensure it is divisible by 2 (a requirement for certain encodings such as `yuv420p`) the width or height will be adjusted if necessary.

Docs [here](https://ffmpeg.org/ffmpeg-filters.html#scale).

### Faster processing

Flag: `-threads 0`.

Allow your CPU to use an optimal number of threads.

## Convert to WebM

Guide [here](http://trac.ffmpeg.org/wiki/Encode/VP8).

### Audio example

`ffmpeg -i input.mov -c:v libvpx -qmin 0 -qmax 25 -crf 4 -b:v 1M -vf scale=1280:-2 -c:a libvorbis -threads 0 output.webm`

### Mute example

`ffmpeg -i input.mov -c:v libvpx -qmin 0 -qmax 25 -crf 4 -b:v 1M -vf scale=1280:-2 -an -threads 0 output.webm`

## Convert to MP4

Guide [here](http://trac.ffmpeg.org/wiki/Encode/H.264).

### QuickTime compatibility

Flag: `-pix_fmt yuv420p`.

Note: Requires dimensions to be divisible by 2.

### All device compatibility

Flag: `-profile:v baseline -level 3.0`.

Android in particular doesn't support higher profiles.

### Quality

Example flag: `-crf 20`.

`0` is lossless, `23` is default, and `51` is worst possible. `18`-`28` is a sane range.

### Fast start

Flag: `-movflags +faststart`.

Moves some data to the beginning of the file, allowing the video to be played before it is completely downloaded.

### Audio example

`ffmpeg -i input.mov -c:v libx264 -pix_fmt yuv420p -profile:v baseline -level 3.0 -crf 22 -preset veryslow -vf scale=1280:-2 -c:a aac -strict experimental -movflags +faststart -threads 0 output.mp4`

### Mute example

`ffmpeg -i input.mov -c:v libx264 -pix_fmt yuv420p -profile:v baseline -level 3.0 -crf 22 -preset veryslow -vf scale=1280:-2 -an -movflags +faststart -threads 0 output.mp4`

## Bash script

1. In a folder, make sure your master videos are named how you want your exports to be named.
2. Save the bash script below as `video4web.sh` in the folder.
3. In Terminal, `cd` to the folder.
4. Run `chmod +x video4web.sh`.
5. Run the script using the parameters documented. E.g. `./video4web.sh mov 1280`.

```sh
#!/bin/bash

# Generates a cover image along with mute web-ready WebM and MP4 files for each master video in a folder.
# See: https://gist.github.com/jaydenseric/220c785d6289bcfd7366.

# Parameter 1: Input video format (e.g. "mov").
# Parameter 2: Output width in pixels (e.g. "1280").
# Example use: "./video4web.sh mov 1280".

for i in *.$1
do
  # Generate cover image
  ffmpeg -i $i -vframes 1 -vf scale=$2:-2 -q:v 1 ${i%$1}jpg
  # Generate WebM
  ffmpeg -i $i -c:v libvpx -qmin 0 -qmax 25 -crf 4 -b:v 1M -vf scale=$2:-2 -an -threads 0 ${i%$1}webm
  # Generate MP4
  ffmpeg -i $i -c:v libx264 -pix_fmt yuv420p -profile:v baseline -level 3.0 -crf 22 -preset veryslow -vf scale=$2:-2 -an -movflags +faststart -threads 0 ${i%$1}mp4
done
```
