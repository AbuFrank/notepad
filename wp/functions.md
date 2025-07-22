# Functions

Similar to include, except it's a "degrading" include.

```php
get_template_part( 'loop', 'single' ); 
```

Will look for files in this order:

1. wp-content/themes/childtheme/loop-single.php
2. wp-content/themes/parenttheme/loop-single.php
3. wp-content/themes/childtheme/loop.php
4. wp-content/themes/parenttheme/loop.php
