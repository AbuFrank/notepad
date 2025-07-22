Search recursively search this directory and subdirectories for instance of `*plugin-name*` and rename the only that part of the filename to `my-plugin`

* back slash `\` any `-` to escape it in the regex
* `-n` does a dry run. Remove it to actually change names

```bash
find . "*plugin-name*" -exec rename -n 's/plugin\-name/my\-plugin/g' '{}' \;
```

output:

```bash
'./plugin-name' would be renamed to './my-plugin'
'./plugin-name/plugin-name-more.txt' would be renamed to './my-plugin/my-plugin-more.txt'
'./plugin-name/plugin-name.php' would be renamed to './my-plugin/my-plugin.php'
'./plugin-name-the-rest.txt' would be renamed to './my-plugin-the-rest.txt'
```

rename not recognized?

```bash
brew install rename 
```
