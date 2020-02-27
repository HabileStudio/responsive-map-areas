# responsive-map-areas
Automatically changes the coordinates of areas inside an HTML image map depending on the size of the image

## Features
An emphasis was put on the simplicity of use.

### Summary
When you make an image map, you want the image to be responsive, but the areas are absolute values which make your links go some random places, making them useless...
This script calculates the ratio from the original size of the image and the absolute values in your area coords arguments, and change their coordinates values according to the size of the related image.

### Multiple usage
You can call the function multiple times on different maps on the same page.

### Multiple areas and areas coordinates
No matter how many areas you have in your map, or how many coords your shapes have. Or whatever the shape (polygon, rect, circle or default).

### Windows resize responsive
You can resize the window, it will work.

## How-to

Just add the path to your minified script somewhere in your code (recommended in the head section)
Example:
```html
<script src="js/ResponsiveMapAreas.min.js"></script>
```

Call the function on each of your maps like this:
```html
<script>
  // ARGUMENTS
  // the id of your map
  makeResponsive('my_map')
</script>
```

Be careful to **add an id to your map element**.

Detailed instructions are in the source of the demo file index.html

## Source file

Feel free to play with the source file, just be aware it is written in ES2020, so you might need a transpiler (e.g. Babel)

Enjoy

---

Credits demo image:
Photo by [Tyler Nix](https://unsplash.com/@jtylernix)
