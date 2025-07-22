# Git

## Atlassian Git Cheatsheet

[Atlassian Git Docs - Cheatsheet](https://www.atlassian.com/git/tutorials/atlassian-git-cheatsheet)

## UNDO

### Undo last Commit

```bash
git reset HEAD~1
```

### Undo Merge

```bash
git revert -m 1 <commit-hash> 
git push -u origin <branch>
```

### Unstage files

```bash
git reset
```

delete a branch locally and remotely

```bash
#remote delete
$ git push -d <remote_name> <branch_name>
# local delete
$ git branch -d <branch_name>
# force delete
$ git branch -D <branch_name>

# or
# delete flag
$ git push -d <remote_name (origin)> <branch_name>
# use `:` syntax to copy an empty local repo to the remote branch (delete)
# notice the lack of any local reference to the left of the `:`
$ git push <remote_name (origin)> :<branch_name>
```

Bulk Deletion

*Warning* this will delete any branch that has been merged even if it has local changes. The "-d" will be a soft delete so uncommitted changes will prevent deletion. Use with caution!!

```bash
git branch --merged | grep -v \* | xargs git branch -d
```

completely reset your local to match remote-branch

```bash
git fetch origin
git reset --hard origin/remote-branch
```

fetch remote-branch and name it local-branch  
update the code to match local-branch (copied from remote-branch)

```bash
git fetch <remote-repo(origin)> <remote-branch>:<local-branch>
git checkout <local-branch>
```

get all branches

```bash
# one upstream called origin
git fetch origin
# all upstreams
git fetch --all

```

### Rename branch

```bash
git branch -m new-name
git push origin -u new-name
```

### Compare branch to upstream

```bash
git diff branch-name..origin/branch-name
```

### Prune local branches

```bash
git remote prune origin
```

prune all

```bash
git fetch --prune --all
```

### Abort conflicting merge

```bash
git merge --abort
```

## What's been merged?

```bash
git branch --no-merge
```

## Make the current branch like develop branch but with the last five commits from current branch

```bash
git rebase HEAD~5 --onto develop
# undo
git rebase --abort
```

## Remove gitignored folder/file that was previously committed

```bash
git rm -r --cached <folder>
```

## Stash

```bash
# list current stashes
git stash list

# apply stash change but keep in stash (0 is first in list)
git stash apply stash@{0}

# apply *first* stash and remove from list
git stash pop

# stash changes (including untracked)
git stash -u

# stash changes with message
git stash -u -m "my messsage"

# remove several stashes at a time
for n in {3..1}; do git stash drop stash@{$n}; done;
```

```bash
# Delete stash index 3, 2, 1 (most recent untouched, 0)
for n in {3..1}; do git stash drop stash@{$n}; done;
```

## Misc

### Change case of directory

```bash
git mv foo foo2
git mv foo2 FOO
git commit -m "changed case of dir"
```

### Change remote origin url

You can have multiple remotes. To change the URL of the remote named `origin`, use:

```bash
git remote set-url origin <new-url>
```

### Delete remote origin

```bash
git remote remove origin
```

### Add url to remote origin

```bash
git remote set-url --add --push origin <url>
```

### Show remote urls

```bash
git remote -v
```

## Mangaging multiple users

### Set user for a single repository

```bash
git config --local -e
```

add this to the file

```text
[user]
    name = Your username
    email = Your email
```
