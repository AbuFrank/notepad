# Class

## Methods

### tapping into class methods

```php
if ( class_exists('Notification') ) {
  echo "Notifications exists!!!<br>";
  $instance = new Notification;
  $instance -> send_message_to_customer_service($my_message, "12345678");
}
```
