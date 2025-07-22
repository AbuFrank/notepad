# Configure Git

## Set up name and email

```bash
git config --global user.email "you@example.com"
git config --global user.name "Your Name"
```

## Change remote url from https to ssh

More info in [this tutorial](https://docs.github.com/en/get-started/getting-started-with-git/managing-remote-repositories)

```bash
# check
git remote -v

#change
git remote set-url origin <ssh-url@github.com/whatever>
