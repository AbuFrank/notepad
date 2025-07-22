# JS

print to screen

```js
<pre>{JSON.stringify(data, null, 2)}</pre>
```

Current email checker in IU (Jun 17):

```js
'/^([\w-\.\+]+@([\w-]+\.)+[\w-]{2,4})?$/'
```

Commented code found in IU

```js
//THIS PATTERN THROWS ERRORS UNECESSARILY
//$pattern = '/^([\w-\.\+]+@([\w-]+\.)+[\w-]{2,4})?$/';
/*$pattern = '/^([\w-\.\+]+(.[_aA-zZ0-9-\+]+)+@([\w-]+\.)+[\w-]{2,4})?$/';
$valid = preg_match($pattern, $email);
if ($valid === 0) {
 http_response_code(400);
 echo "Invalid email format";
 exit();
}*/
```

create a cookie with options

```js
document.cookie="username=John Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";
```

stream code backup:

```js
  socket.on(
    SOCKETS.SEND_ACTIVATE_STREAM,
    async () => await socketActivateStream(socket, io)
  )
  socket.on(
    SOCKETS.SEND_DEACTIVATE_STREAM,
    async () => await socketDeactivateStream(socket, io)
  )
```

sort boolean

```js
a = [false, true, true, true, false, true, true, false, false];
    
    
    a.sort(function(x, y) {
        // true values first
        return (x === y)? 0 : x? -1 : 1;
        // false values first
        // return (x === y)? 0 : x? 1 : -1;
    });
    
    console.log(a);
```