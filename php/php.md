# PHP

## Pretty print php

```php
    <?php
        echo '<pre>',print_r($services[0],1),'</pre>';
    ?>
```

```php
// $arr = array('one' => 1);
$subs = $subscription->get_content_list('newsletter', $query);
// var_dump($subs);
print_r($subs);
// for prettier printing
echo '<pre>',print_r($arr,1),'</pre>';
```

create a function for simpler data dumping

```php
<?php
function print_r2($val){
        echo '<pre>';
        print_r($val);
        echo  '</pre>';
}
?>
```

### with loop

```php
<?php foreach( $fields as $key => $sub_fields ): ?>
    <?php
        echo '<pre>',print_r($key),' => ',print_r($sub_fields),'</pre>';
        //foreach( $sub_fields as $field -> $name ):
    ?>
    <?php //endforeach; //sub fields?>
<?php endforeach; //affiliate fields ?>
```

```php

<?php foreach ( $tfs_subscriptions as $key => $item ): 
        echo '<pre>',print_r($key),' => ',print_r($item),'</pre>';
        //echo '<pre>',print_r($key),' => ',print_r($item['description']),' | ',print_r($item['pubcode']),' | ',print_r($item['member_cat']),'|',print_r($item['member_org']),' | ',print_r($item['authcode']),'</pre>';
        //foreach( $sub_fields as $field -> $name ):
<?php endforeach; //affiliate fields ?>
```

## Sort

### With Array of values

```php
// sort by this order
$order = array(3452342, 5867867, 7867867, 1231233);
// array to sort
$array = array(
    array('id' => 7867867, 'title' => 'Some Title'),
    array('id' => 3452342, 'title' => 'Some Title'),
    array('id' => 1231233, 'title' => 'Some Title'),
    array('id' => 5867867, 'title' => 'Some Title'),
);
// sorting function
usort($array, function ($a, $b) use ($order) {
    $pos_a = array_search($a['id'], $order);
    $pos_b = array_search($b['id'], $order);
    return $pos_a - $pos_b;
});
// debug
var_dump($array);
```

### Move a specific item to the beginning of the array

```php
$new_value = $arr[n];
unset($arr[n]);
array_unshift($arr, $new_value);
```

## Strings

```php
echo str_replace("quick brown fox", "swift white cat", $my_str);
```
