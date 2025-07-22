# MySQL Delete Tables

## Delete tables with 'prefix_'

Produces a `drop table` query string with any table that starts with 'prefix_'

```sql
SELECT CONCAT( 'DROP TABLE ', GROUP_CONCAT(table_name) , ';' ) 
    AS statement FROM information_schema.tables 
    WHERE table_name LIKE 'prefix_%';
```
