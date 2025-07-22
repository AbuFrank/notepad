# WP-CLI

## users

```bash
# delete
wp user delete <username> --reassign=<user id>
# create (with display name) (admin)
wp user create username email@example.com --role=administrator --display_name='Display Name' --nickname=nickname

# create new admin
wp user create <username> <email> --role=administrator --display_name='display name' --first_name=first --last_name=last

## delete and recreate while retaining all post content and same username
# create temp user to transfer post authorship to
wp user create username2 email@example.com --role=administrator --first_name=First --last_name=Last --nickname=nickname # e.g. 3456
# delete troublesome user and transfer authorship to temp user
wp user delete username --reassign=3456
# recreate actual user
wp user create username username@example.com --role=administrator --first_name=first --last_name=last --nickname=nickname # 3457
# delete temp user and transfer authorship back
wp user delete username2 --reassign=3457
```

## update user password

```bash
# prevents history
read -s pass
# type or paste your desired password
wp user update username --user_pass=$pass
# success updated user (id)
# delete secret variable
unset pass
```

## List all admin users

```bash
wp user list --role=administrator
```

## Plugins

```bash
## deactivate and uninstall plugin
wp plugin uninstall <plugin> --deactivate

# Update a plugin. Caution!
wp plugin install --force <plugin|zip|url>

```

## Posts

### List

List posts that have a post type of "post" and "custom"  
`--fields` tells the cli what data to return

```bash
wp post list --post_type=post,custom --fields=ID,post_title,post_type,menu_order
```

Once we verify that all the posts' menu order are set to zero, then

```bash
wp post list --post_type=post,custom --fields=ID
```

copy paste those ids to an IDE, remove the pipes and extra spaces, then:

```bash
wp post update <string of ids separated by spaces> --menu_order=0
```

update **publishing status** of all posts with the same **category**

```bash
wp post update --post_status=draft $(wp post list --cat=13630 --post_type=post --post_status=publish --format=ids)
# pages: wp post list --post_type=page --cat=3630 --format=ids
```

### Bulk Delete (by year)

```bash
wp post delete $(wp post list --format=ids --year=2016)
```

### Bulk Delete images (that are not attached to posts)

```bash
wp post delete $(wp post list --post_type='attachment' --format=ids --post_parent=0)
```

## Update URLs

```bash
wp search-replace oldurl.com newurl.com
```
