# Imagemagick

Convert mutiple images to a single pdf file.
Works for jpg as well.

```bash
convert page*.png mydoc.pdf
```

Mogrify the size of an image and ignore orientation. Will keep the aspect ratio and strip metadata.

```bash
mogrify -auto-orient -strip -resize 4000x4000/> *.jpg
```
