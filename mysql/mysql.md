# MySQL

## Simple commands

### show tables

```sql
SHOW tables;
```

### mysqldump

In a local terminal:

```bash
scp user1@example.com:/tmp/<db name>_$(date +%Y%m%d).sql.gz ~/Sites/remotesql
```

### unzip the file

tar

```bash
tar xf <db name>_$(date +%Y%m%d).sql.tar.gz
```

--or--

gunzip

```bash
gunzip ~/Sites/remotesql/<db name>_$(date +%Y%m%d).sql.gz
```

### Import mysql dump into newly created Local-Flywheel site

```bash
mysql -u root -proot local < ~/Sites/remotesql/<db name>_$(date +%Y%m%d).sql
```

-- or --

```bash
mysql -u "wordpressusername" -p "databasename" < mysql_file.sql
#enter password
```

-- or --

```mysql
mysql> use db_name;
mysql> source backup-file.sql;
```

### mysql others

**List** all databases:

```sql
mysql> SHOW DATABASES;
```

**Return by partial string** value using `%` wildcard:

```sql
SELECT id, notes 
FROM table 
WHERE notes LIKE '%partial%'
```

**Run SQL** query from the **command line** `-e` for excecute:

```bash
mysql -u root -p -e 'Select * from person' mydb > personinfo
```

---

### Rewriting site urls

```sql
UPDATE wp_options SET option_value = replace(option_value, 'http://olddomain.com', 'http://newdomain.com') WHERE option_name = 'home' OR option_name = 'siteurl';

UPDATE wp_posts SET guid = replace(guid, 'http://olddomain.com','http://newdomain.com');

UPDATE wp_postmeta SET meta_value = replace(meta_value, 'http://olddomain.com', 'http://newdomain.com');

UPDATE wp_posts SET post_content = replace(post_content, 'http://olddomain.com', 'http://newdomain.com');
```

## MySQL direct setup

log into mysql with user and prompt for password

```bash
$ mysql -u <user> -p

mysql> CREATE DATABASE databasename;
Query OK, 1 row affected (0.00 sec)

mysql> CREATE USER "wordpressusername"@"hostname" IDENTIFIED BY "password";
Query OK, 1 row affected (0.00 sec)

mysql> GRANT ALL PRIVILEGES ON databasename.* TO "wordpressusername"@"hostname";
Query OK, 1 row affected (0.00 sec)

mysql> FLUSH PRIVILEGES;
Query OK, 0 rows affected (0.01 sec)

mysql> EXIT
Bye
```
