# OC Subscriptions

## objects

### $tfs_subscriptions - array of objects

comes from Agora

[status]
[description]
[pubcode]
[member_cat]
[member_org]
[start_date]
[expiration_date]
[final_expiration_date]
[subref]
[authcode]
    [name] => 786
    [term_id]
    [description]
    [type]
    [advantage_code]
    [location]
    [rules]
    [slug]
    [term_group]
    [term_taxonomy_id]
    [taxonomy]
    [parent]
    [count]
    [filter]
[is_lifetime]

### $subscription_info - associative array

provided by mw plugin and Subscriptions posts in wp-admin

[OXC] ==> Array
  (
    [content] =>
    [title] => Chairman’s Circle
    [code] => OXC
    [buy_url] => https://orders.oxfordclub.com
    [info_url] =>
    [renewal_link] => https://orders.oxfordclub.com/OxfordCCUpdate/CUPCV700/index.htm?pageNumber=2&ecn=c84ad0433501103abf5d63e064a50b99&iv=d9b0ec82b4d2b7c6&r=WEB&SPC=OXM&C=000130970766&SR=000058309537
    [cc_info] => xxxx xxxx xxxx xxxx
    [deliveryUpdateDisplay] => 0
    [post_id] => 100942
    [post_url] => https://dev.oxfordclub.com/tfs-subscriptions/chairmans-circle/
    [featured_image]
  )

```php
$lifetime_reference_array = [ "OXF" => "OXL", "BRK" => "BRL", "ORE" => "ORL", "ETT" => "ETX", "PES" => "PEX", "786" => "78X", "TOT" => "TOX", "MAL" => "MAX", "OMT" => "OMX", "OWA" => "OWX", "OSA" => "OSX", "CLO" => "CLX", "TBL" => "TBX", "VPA" => "VPX", "AGB" => "AGX", "MLB" => "MLX", "MAB" => "MBX", "OXC" => "OXM" ];
```

```php
// agora sub data
echo '<h2>$tfs_subscriptions - data from agora</h2>';
foreach ( $tfs_subscriptions as $key => $item ) {
    echo '<pre>',$key,' ',$item->description,' => ',$item->authcode->name,' Lifetime? ==> ',$item->is_lifetime,' Pubcode ==> ',$item->pubcode,"\nsub_info title: ",$subscriptions_info[$item->pubcode]['title'],'<',$subscriptions_info[$item->pubcode]['post_id'],'>','</pre>';
    if ( in_array( $item->authcode->name, array("AGB", "OXF", "786", "MAL", "OMT") ) ) {
        echo '<pre>',print_r($item,1),'</pre>';
    }
}
// associated wp subs - uses pubcode
echo '<h2>$subscription_info - from wp Subscriptions posts</h2>';
foreach ( $subscriptions_info as $key => $item ) {
    echo '<pre>',$key,' ==> ',$item["title"],', Code: ',$item["code"],'</pre>';
}
```

```php
// find cc if it exists
$oxc_array = array_search("OXC", $tfs_subscriptions);
echo '<pre>',print_r($oxc_array,1),'</pre>';
```

## Main work

```php
// loop through $tfs_subscriptions sorting them into bulk or singular
// static list of bulk subscriptions
$all_bulk_subs  =   array("OXC", "AGB", "MLB", "MAB");
// static lists of child subscriptions for each parent
$oxc_child_subs =   array("OXF", "BRK", "ORE");
$agb_child_subs =   array("OXF", "786", "MAL", "OMT");
$mlb_child_subs =   array("BRK", "TOT", "CLO", "OSA");
$mab_child_subs =   array("ORE", "ETT", "VPA", "TBL");
// initial
// user bulk subs and their children, if they have them
$oxc_subs       =   array();
$agb_subs       =   array();
$mlb_subs       =   array();
$mab_subs       =   array();
// list of subscriptions without parents
$single_subs    =   array();
// list of active parent subscriptions
$user_bulk_subs =   array();
// $tfs_subscriptions sorted by bulk subscriptions
$sorted_subs    =   array();

// check for any bulk subscriptions and add them to $user_bulk_subs
echo '<h2>1. Determine Bulk subs</h2>';
foreach ( $all_bulk_subs as $bulk_sub_iter ) {
    if (in_array($bulk_sub_iter, $tfs_subscriptions['displayed_pubcodes'])) {
        $user_bulk_subs[] = $bulk_sub_iter;
    }
}
echo '<h2>2. Sort subscriptions into separate arrays if they have bulk subscriptions</h2>';
echo '<pre>',print_r($user_bulk_subs,1),'</pre>';
// sort into separate bulk lists if the user has any
if ( ! empty( $user_bulk_subs ) ) {
    foreach ( $tfs_subscriptions as $key => $sub ) {
        // first check if Chairman's Circle
        if ( $sub->pubcode === "OXC" && $sub->authcode->name === "OXC[OC,CC,2]" ) {
            $member_has_cc = true;
            // we only need one list
            $sorted_subs = $tfs_subscriptions;
            // remove the oxc cc bulk sub from array
            unset($sorted_subs[$key]);
            // make it the first item
            array_unshift($sorted_subs, $sub);
            // no need to loop any further
            break;
        }
        // we need to check for existence in every bulk sub
        foreach ( $user_bulk_subs[] as $user_bulk_sub_iter ) {
            if ( $sub->pubcode === $user_bulk_sub_iter ) { 
                // this is a bulk sub
                // add to the beginning of its appropriate list
                array_unshift( ${strtolower($sub->pubcode).'_subs'}, $sub );
                // continue to the next $sub
                continue 2;
            } elseif ( in_array( $sub, ${strtolower($sub->pubcode).'_subs'} ) ) {
                // push to appropriate bulk list
                ${strtolower($sub->pubcode).'_subs'}[] = $sub;
                // if the user has this subscription in more than on bulk sub
                // we'll go with the first bulk sub 
                // e.g. OXF would only show under DC if both DC and AGB
                continue 2;
            } else {
                // not a bulk sub and not a child of a bulk sub the user owns
                $single_subs[] = $sub;
            }
        }
    }
    // construct the master list 
    if ( ! $member_has_cc ) ) {
        // merge each bulk array into a linear (sorted) list
        foreach ( $user_bulk_subs as $bulk_sub_iter ) {
            $sorted_subs = array_merge( $sorted_subs, ${strtolower($bulk_sub_iter).'_subs'} );
        }
        // merge any single subs 
        $sorted_subs = array_merge( $sorted_subs, $single_subs );
    }
} else {
    // user only has single subs, proceed as normal
    $sorted_subs = $tfs_subscriptions;
}
```

## Backup code

```php
// backup code
// associated wp subs - uses pubcode
foreach ( $subscriptions_info as $key => $item ) {
    echo '<pre>Key: ',$key,' ',$item["title"],' => ',$item->authcode->name,' Lifetime? ==> ',$item->is_lifetime,' Pubcode ==> ',$item->pubcode,"\nsub_info title: ",$subscriptions_info[$item->pubcode]['title'],'<',$subscriptions_info[$item->pubcode]['post_id'],'>','</pre>';
}

// before reverting variable names
foreach ( $tfs_subscriptions as $sub ) {
    if ( in_array( $sub->pubcode, $all_bulk_subs ) ) {
        $user_bulk_subs[] = $sub
    }
}
echo '<h2>Current users bulk subs</h2>';
echo '<pre>',print_r($user_bulk_subs,1),'</pre>';

```

```php
$tfs_subs   = print_r($tfs_subscriptions, true);
$wp_subs    = print_r($subscriptions_info, true);
file_put_contents('/tmp/tfs_subs.txt', $tfs_subs);
file_put_contents('/tmp/wp_subs.txt', $wp_subs);
```

```php
// check if any user subs are bulk
foreach ( $tfs_subscriptions as $key => $item ) {
    if ( is_int( $key ) ) {
        //echo '<h2>ITEM: ',$item->pubcode,'!!</h2>';
        // separate bulk subs from normal subs
        if ( in_array( $item->pubcode, $all_bulk_subs ) ) {
            $user_bulk_subs[] = $item;
        } else {
            $single_subs[] = $item;
        }
        
    }
}
```

```php
// sort into separate bulk lists
foreach ( $user_bulk_subs as $sub ) {
    // first check if OC Chairman's
    if ( $sub->authcode->name === "OXC[OC,CC,2]" ) {
        echo "we got Dotson, we've got Dotson here (Chairman's Circle)";
        // no need to loop any further
        break;
    if ( $sub->pubcode === "OXC" ) {
        echo "we have OXC bulk sub";
        // member is Chairman's Circle
        } elseif ( $sub->authcode->name === "OXC[OC,DC,1]" ) {
            // Director's Circle
            echo "DC is better than Marvel (Director's Circle)";
            break;
        } else {
            echo "Sorry, we couldn't verify your OC lifetime subscription, please contact support";
        }
    } else if ( in_array( $sub->pubcode, array_slice( $all_bulk_subs, 1 ) ) ) {
        // otherwise check for any other bulk subscriptions
        echo "this is not lifetime, but it is a bulk =>",$sub->pubcode;
    }
}
echo 'This should always run despite continue';
```

```php
// first check if oxc
if ( $sub->pubcode === "OXC" ) {
    if ( $sub->authcode->name === "OXC[OC,CC,2]" ) { 
        // member is Chairman's Circle
        $member_has_cc = true;
        // we only need one list
        $sorted_subs = $tfs_subscriptions;
        // remove the oxc cc bulk sub from array
        unset($sorted_subs[$key]);
        // make it the first item
        array_unshift($sorted_subs, $sub);
        // no need to loop any further
        break;
    } else if ( $sub->authcode->name === "OXC[OC,DC,1]" ) {
        // member is Director's Circle
        // make this the first item in its list
        array_unshift($oxc_subs, $sub);
    }
} else if ( in_array( $sub->pubcode, $all_bulk_subs ) ) {
    // otherwise check for any other bulk subscriptions
    // add to appropriate list
    array_unshift( ${strtolower($sub->pubcode).'_subs'}, $sub );
}
```

```php
            // construct the master list 
            if ( ! $member_has_cc ) {
                // merge each bulk array into a linear (sorted) list
                $sorted_subs = [];
                // if user has multiple bulk subscriptions
                //foreach ( $user_bulk_subs as $bulk_sub_iter ) {
                    //$sorted_subs = array_merge( $sorted_subs, ${strtolower($bulk_sub_iter).'_subs'} );
                //}
                // merge any single subs 
                if ( isset( $single_subs ) && !empty( $single_subs )  ) {
                        $sorted_subs = array_merge( $oxc_subs, $single_subs );
                } else {
                        $sorted_subs = $oxc_subs;
                }
            }
```

## Debug

```php
// unshift OXC to dynamic array variable name
$oxc_subs = array();
$oxc_subs.push("hello");
foreach ( $tfs_subscriptions as $key => $sub ) {
    // first check if oxc
    if ( $sub->pubcode === "OXC" ) {
        // $lc_pub = strtolower($sub->pubcode);
        // array_unshift( ${$lc_pub.'_subs'}, $sub );
        array_unshift( ${strtolower($sub->pubcode).'_subs'}, $sub );
    }
}
echo '<h2>OXC subs</h2>';
echo '<pre>',print_r($oxc_subs,1),'</pre>';
```
