# local by flywheel

## migrate existing site

### database

There is a known issue with newer ubuntu systems and older packages (due to features in mysql waiting for). Here's how to resolve:

```bash
`sudo ln -s /lib/x86_64-linux-gnu/libncurses.so.6 /lib/x86_64-linux-gnu/libncurses.so.5`
`sudo ln -s /lib/x86_64-linux-gnu/libtinfo.so.6 /lib/x86_64-linux-gnu/libtinfo.so.5`
```

Then you can log into mysql (site must be running). Click on "Site shell" in local to go directly to the installed app

`mysql -u root -p local` (password is root)

```sql
USE your_database_name;
SOURCE /absolute/path/to/your/file.sql;
quit
```

default db name is `local`

TIP: get the full path of a file:

```bash
realpath filename
```

Then update urls

```bash
wp search-replace 'https://oldsite.com' 'http://newsite.local' --skip-columns=guid
```
