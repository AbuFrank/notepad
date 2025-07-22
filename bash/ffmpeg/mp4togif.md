# Create high quality gifs from mp4 snippets

## ffmpeg

### Create snippet from source video

```sh
# explicit times
ffmpeg -i source.mp4 -ss 00:02:00 -t 00:07:28 part1.mp4
# or start time and how many seconds after (-t)
ffmpeg -i source.mp4 -ss 34 -t 3 part1.mp4
```

### Create Gif

#### Use the first frame to create a color map

TODO: explore difference between `stats_mode` single|diff|rectangle

#### Create new color map for each slide

```sh
ffmpeg -i output.mp4 -filter_complex "[0:v] fps=12,scale=w=480:h=-1,split [a][b];[a] palettegen=stats_mode=single [p];[b][p] paletteuse=new=1" output.gif
```

## With multiple video partials

### Create empty reference file, empty it if it already exists

```sh
> parts.txt
```

### Quickly add lines to the ffmpeg reference file

```sh
# adds five enumerated lines to a parts.txt
for i in {1..5}; do echo "file part$i.mp4">>parts.txt; done
```

### Combine snippets into one video using the reference file

```sh
# Uses parts.txt to find and combine video partials into one
ffmpeg -f concat -i parts.txt -c copy output.mp4
```
