# wp-uploads

## Direct ssh

ssh to target
tar czvf - /path/to/uploads | wc -c
this does a "dry run" and gives you the size of the tarball
if acceptably "balled" (try to keep it < 250MB)
tar czvf /tmp/uploads.tar.gz /path/to/uploads
back to local
scp user@remote:/tmp/uploads.tar.gz .

## htaccess

put this in `.htaccess`

```asciidoc
RewriteCond %{REQUEST_URI} ^/wp-content/uploads/[^\/]*/.*$
RewriteRule ^(.*)$ https://livesite.com/$1 [QSA,L]
```

## nginx

put this in the nginx config file (./conf/nginx/site.conf.hbs)

```nginx
    # Matches any URL containing /wp-content/uploads/    
    location ~ "^(.*)/wp-content/uploads/(.*)$" {
        try_files $uri @prod_serv;
    }

    # Will redirect requests to the production server
    location @prod_serv {
        rewrite "^(.*)/wp-content/uploads/(.*)$" "http://productionsite.com/wp-content/uploads/$2" redirect;
    }
```
