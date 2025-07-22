# wp_enqueue

## Change css version automatically

`_uri()` returns url
`_directory()` returns directory path

```php
wp_enqueue_style("main-style", get_stylesheet_directory_uri() . "/dist/styles/main.css", array(), filemtime(get_stylesheet_directory() . "/dist/styles/main.css"), false);
```

## Function for adding async or defer to scripts

```php
/**
* Add async or defer attributes to script enqueues
* @param  String  $tag     The original enqueued <script src="...> tag
* @param  String  $handle  The registered unique name of the script
* @return String  $tag     The modified <script async|defer src="...> tag
*/
// only on the front-end
if(!is_admin()) {
    function add_asyncdefer_attribute($tag, $handle) {
        // if the unique handle/name of the registered script has 'async' in it
        if (strpos($handle, 'async') !== false) {
            // return the tag with the async attribute
            return str_replace( '<script ', '<script async ', $tag );
        }
        // if the unique handle/name of the registered script has 'defer' in it
        else if (strpos($handle, 'defer') !== false) {
            // return the tag with the defer attribute
            return str_replace( '<script ', '<script defer ', $tag );
        }
        // otherwise skip
        else {
            return $tag;
        }
    }
    add_filter('script_loader_tag', 'add_asyncdefer_attribute', 10, 2);
}
```

### Example usage

```php
function enqueue_my_scripts() {

    // script to load asynchronously
    wp_register_script('firstscript-async', '//www.domain.com/asyncscript.js', '', 2, false);
    wp_enqueue_script('firstscript-async');

    // script to be deferred
    wp_register_script('secondscript-defer', '//www.domain.com/deferscript.js', '', 2, false);
    wp_enqueue_script('secondscript-defer');


    // standard script embed
    wp_register_script('thirdscript', '//www.domain.com/nonescript.js', '', 2, false);
    wp_enqueue_script('thirdscript');
}
add_action('wp_enqueue_scripts', 'enqueue_my_scripts', 9999);
```

### Output

```html
<script async type='text/javascript' src='//www.domain.com/asyncscript.js'></script>
<script defer type='text/javascript' src='//www.domain.com/deferscript.js'></script>
<script type='text/javascript' src='//www.domain.com/nonescript.js'></script>
```
