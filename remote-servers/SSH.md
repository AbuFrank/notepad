# SSH

## Create a secondary git upstream

See [git docs](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/about-ssh) about setting up ssh keys

```text
Host github_personal
    HostName github.com
    IdentityFile /path/to/ssh/key
    IdentitiesOnly true
    UseKeychain yes
```

To use this host alias, update the upstream url to the "Host" name:

`git remote add origin git@github_personal:Remote/path.git`

or update existing origin

`git remote set-url origin git@github_personal:Remote/path.git`

*Important!* make sure to update your git user and email:

```bash
git config user.name "New Author Name"
git config user.email "new.author@example.com"   
```

## encrypt a private key with passphrase

```bash
ssh-keygen -p -f my_private_key
```

## tar

```bash
tar -czf /tmp/workspace.tar.gz workspace
```

unpack

```bash
tar -xzf workspace.tar.gz
```
