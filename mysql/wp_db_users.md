# Users

## Deleting Users

### Delete first 10 subscribers and reassign their posts to user with id 1.

```bash
wp user delete $(wp user list --role=subscriber --field=ID --number=10) --reassign=1
```

## What if there are 173,000 users???

### Whats my collate?

after mysql 8.0: `DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci`

### How do I find it?

Open wp-login.php file, and throw this in somewhere. (In case your wp_user table has aready been deleted)

```php
global $wpdb;
echo $wpdb->get_charset_collate();
```

### SQL queries orginal from `/wp-admin/includes/schema.php` (with some edits) 

note: all zeros for date tends to create errors so try yesterday's date

```sql
DROP TABLE IF EXISTS `wp_users`;
CREATE TABLE `wp_users` (
	ID bigint(20) unsigned NOT NULL auto_increment,
	user_login varchar(60) NOT NULL default '',
	user_pass varchar(255) NOT NULL default '',
	user_nicename varchar(50) NOT NULL default '',
	user_email varchar(100) NOT NULL default '',
	user_url varchar(100) NOT NULL default '',
	user_registered datetime NOT NULL default '2021-07-17 01:01:01',
	user_activation_key varchar(255) NOT NULL default '',
	user_status int(11) NOT NULL default '0',
	display_name varchar(250) NOT NULL default '',
	PRIMARY KEY  (ID),
	KEY user_login_key (user_login),
	KEY user_nicename (user_nicename),
	KEY user_email (user_email)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci;
```

### Create wp_usermeta table

meta_key value found at the top of `/wp-admin/includes/schema.php`

```sql
DROP TABLE IF EXISTS `wp_usermeta`;
CREATE TABLE `wp_usermeta` (
	umeta_id bigint(20) unsigned NOT NULL auto_increment,
	user_id bigint(20) unsigned NOT NULL default '0',
	meta_key varchar(255) default NULL,
	meta_value longtext,
	PRIMARY KEY  (umeta_id),
	KEY user_id (user_id),
	KEY meta_key (meta_key(191))
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci;
```

### Last Step: Create a user

```bash
wp user create <username> <user@email> --role=administrator --display_name=<optional_name> --nickname=<optional_name>
```
