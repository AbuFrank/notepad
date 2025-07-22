# URLs

## redirects

```php
function redirect_to_post(){
global $wp_query;
if( is_archive() && $wp_query->post_count == 1 ){
the_post();
$post_url = get_permalink();
wp_redirect( $post_url );
}
echo "Since there was only one result found, 
you have been redirected to this post/page!";
}
add_action('template_redirect', 'redirect_to_post');
```

## Get URL/URI

```php
$uri_str = $_SERVER['REQUEST_URI'];
if (strpos($uri_str, 'login=failed') !== false) {
  echo 'true';
}
```

### a better way

```php
// check uri for failed login query
if( $_GET[ 'login' ] === 'failed' ) {
    echo "login failed";
}
```

### get full url

```php
$actual_link = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF'];
```

### verify password

```php
if ($_POST["password"] === $_POST["confirm_password"]) {
   // success!
}
else {
   // failed :(
}
```
