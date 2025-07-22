# Remote mysqldump

## updated mysql dump

From Crafton:

```bash
grep 'DB_' wp-config.php
mysqldump -h ${DB_HOST} -u ${DB_USER} -p${DB_PASS} \
    --no-tablespace \
    --complete-insert --extended-insert=false \
    --single-transaction --lock_tables=false \
    ${SELECTED_DB} > /tmp/${SELECTED_DB}_$(date +%Y%m%d).sql
```

### script it

### SH script mysqldump

```bash
#!/bin/bash
function get_val() {
        if [ -z ${1} ]; then return; fi
        echo $(grep "${1}" ~/server/site/path/wp-config.php | awk -F\' '{print $4}')
}
DB_HOST=$(get_val "DB_HOST")
DB_NAME=$(get_val "DB_NAME")
DB_USER=$(get_val "DB_USER")
DB_PASS=$(get_val "DB_PASSWORD")
echo "DB_HOST = ${DB_HOST}"
echo "DB_USER = ${DB_USER}"
echo "DB_NAME = ${DB_NAME}"
echo "DB_PASS = ${DB_PASS}"
DB_FILE="${DB_NAME}_$(date +%Y%m%d).sql"
OPTIONS=" --no-tablespace --complete-insert --extended-insert=false --single-transaction --lock_tables=false"
mysqldump ${OPTIONS} -h "${DB_HOST}" -u "${DB_USER}" -p "${DB_NAME}" > "/tmp/${DB_FILE}"
tar czvf "/tmp/${DB_FILE}.tar.gz" "/tmp/${DB_FILE}"
rm "/tmp/${DB_FILE}"
```

### manual mysqldump

In a server terminal

```bash
cd server/site/path
grep 'DB_' wp-config.php
mysqldump -h <db host> -P <db host port> -u <db user> -p <db name> | gzip > /tmp/<db name>_$(date +%Y%m%d).sql.gz
# then
tar -czf /tmp/db_$(date +%Y%m%d).sql.tar.gz /tmp/dump.sql
```

In a local terminal:  

```bash
scp user1@example.com:/tmp/<db name>_$(date +%Y%m%d).sql.gz ~/Sites/remotesql
```

### unzip the file

tar

```bash
tar -xzf <db name>_$(date +%Y%m%d).sql.tar.gz
```

--or--

gunzip

```bash
gunzip ~/Sites/remotesql/<db name>_$(date +%Y%m%d).sql.gz
```

### Import mysql dump into newly created db

```bash
mysql -u root -proot local < ~/Sites/remotesql/<db name>_$(date +%Y%m%d).sql
```

### Fixes

if it gives you an error, try to change 0000-00-00 00:00:00 to 1111-11-11 11:11:11

```sql
DROP TABLE IF EXISTS wp_users;
CREATE TABLE wp_users (
  ID bigint(20) unsigned NOT NULL auto_increment,
  user_login varchar(60) NOT NULL default '',
  user_pass varchar(64) NOT NULL default '',
  user_nicename varchar(50) NOT NULL default '',
  user_email varchar(100) NOT NULL default '',
  user_url varchar(100) NOT NULL default '',
  user_registered datetime NOT NULL default '0000-00-00 00:00:00',
  user_activation_key varchar(60) NOT NULL default '',
  user_status int(11) NOT NULL default '0',
  display_name varchar(250) NOT NULL default '',
  spam tinyint(2) NOT NULL default '0',
  deleted tinyint(2) NOT NULL default '0',
  PRIMARY KEY  (ID),
  KEY user_login_key (user_login),
  KEY user_nicename (user_nicename)
) DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
```
