# WP Mail

## How to make this a plugin

Place the following code in a plugin_name.php file inside a plugin_name folder and zip it.

```php
<?php
/**
 * Plugin Name: A Test email plugin
 * Description: Send me a test email on activation
 * Version:     0.1
 * License:     GPLv3
 */

namespace WordPressStackexchange;

add_action( 'init', __NAMESPACE__ . '\plugin_init' );

function plugin_init(){
    $to      = 'email@example.com';
    $subject = 'Testing email';
    $message = 'Testmail is working';

    wp_mail( $to, $subject, $message );
}
```
