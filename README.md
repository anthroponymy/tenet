# Tenet
A project to learn 


[![Build](https://github.com/anthroponymy/tenet/actions/workflows/checks.yml/badge.svg?branch=main)](https://github.com/anthroponymy/tenet/actions/workflows/checks.yml)
[![Deployment](https://github.com/anthroponymy/tenet/actions/workflows/checks.yml/badge.svg?branch=main&event=deployment)](https://github.com/anthroponymy/tenet/actions/workflows/checks.yml)

### Design

* Fonts (https://fonts.google.com/)
* Design (https://design.google/tags/typography)
* Front End (https://angular.dev/)
* Theme (https://material.angular.io/)


## Initializing a new git repository
    $ git init

## Useful git log commands
    $ git log --oneline        ## print short sha in one line
    $ git log -3               ## show only first 3 commit
    $ git log --author="John"  ## show commits only by this author

## Cloning a git repository
## The other protocols are: ssh, ftp, file://, http(s):// etc...
    $ git clone git://github.com/something/foo.git

##  Show the status of file
    $ git status -s  # in short format

##  Add the file to staging area.
    $ git add foo.js bar.js   ## `--` is used to seperate files from `add` options.
    $ git add .    # add all the files

##  Show what have changed since you last commit
    $ git diff  ## with a `--cached` option, show the changes that will go into the next commit snapshot.

##  Commit the changes after you add the files to staging area
    $ git commit -m 'with an inline message'

##  Auto-commit and track changes to modified file.
    ## NOTE: The files you've not added doesn't track by commit with `-a` command.
    $ git commit -a -m 'with an inline message'

##  Ammend last commit (i.e, merge to previous commit)
    ## https://nathanhoad.net/git-amend-your-last-commit
    ## After doing `git add .`
    $ git commit --amend   # alternate is `git reset --soft HEAD~`.
        ## amend a commit without changing previous message
    $ git commit --amend --no-edit


##  Unstage file from the index only.  See `git reset` also.
    ## NOTE: `git rm` without `--cached` will simply remove the file from both index and working directory.
    $ git rm --cached  # exact opposite of git add.

##  Throw away local changes after commit (Use with caution)
    $ git checkout <file>  
        # if the branch name and file name are same, then do this
    $ git checkout -- <file>
        ## for all changes (it's perfect for time travel on previous commit)
    $ git checkout -f # or `git reset --hard` (but previous one is more safer because with that you're in detached state.)


    ## Delete a single entry from git reflog. (git reflog is useful as it keeps 2 months history).
    $ git reflog delete HEAD@{N}    ## `N`: 1,2 etc... or <sha>

    ## Undo the last commit, but keep the history and adds a new history
    ## http://stackoverflow.com/questions/27032850/ (for `git reset` vs `git revert` with image)
    $ git revert

##  check where HEAD is
    $ git show-ref

    ## Remove the initial commit (git reset doesn't work here, it works only after second commit)
    ## http://stackoverflow.com/questions/6632191/how-to-revert-initial-git-commit
    $ git update-ref -d HEAD


    ## Push a specific branch
    $ git push origin <mylocalbranch>

##  Detailed explaination of `git reset` (all three options). P.S. Use git checkout for time travel.
    ## http://stackoverflow.com/a/6866485/2092405
    ## NOTE: All the below three options remove log, so if you want to get back to previous state, you can pick
    ## <sha> from git reflog and do git reset on this.
    ## Suppose the structure is
         A-B-C
             ↑ (master)
    ## Then, nuke commit C and never see it again. Do this:
    $ git reset --hard HEAD~1
        ## the result is:
             A-B
               ↑ (master)
       ## To undo this command, use;
       $ git reset --hard <newShaOfReflog>  ## or (git reset --hard HEAD@{1})

    ## Undo the last commit, but keep your changes in working directory.
    ## It will delete the index the from git log also and show you untracked and unstaged files:
    $ git reset HEAD~1  ## move the pointer one index back (or git reset --mixed HEAD~1)
        ## the result is:
        A-B-C
          ↑ (master)
        ## To undo this command, use;
        $ git reset <newShaOfReflog>  ## or (git reset HEAD@{1})

    ## Undo the last commit, but don't touch the index and working directory.
    ## When you do git status, you'll see that the same files are in the index as before.
    ## In fact, right after this command, you could do `git commit` and you'd be redoing the same commit you just had.
    $ git reset --soft HEAD~1


    ## Add a changed file to old commit (not last commit). I.E., fix up old commit
    http://stackoverflow.com/a/2719659/2092405

    ##merge a specific commit from one branch to another branch.
        ## make sure you're in the branch where you want merge.
    $ git cherry-pick <commit-id-of-feature-branch>

    ##Merge two specific commit together (using rebase)
    http://stackoverflow.com/questions/2563632/how-can-i-merge-two-commits-into-one

    ##Modify a specific commit in git
    http://stackoverflow.com/questions/1186535/how-to-modify-a-specified-commit-in-git
    ## if you're getting this error. Needs a single revision. See this: http://stackoverflow.com/questions/26174757/
    ## Option: 2
    $ git checkout <shaToThatCommit>
    $ touch newfile.txt
    $ git add .
    $ git commit --amend --no-edit
    $ git rebase --onto HEAD <shaToThatCommit> master  ## it will do automatic git checkout to master branch


    ## Branching and Merging
## -------------------
    ## List out all the branches
    $ git branch
    ## Create a new branch `testing` at your last commit
    $ git branch testing
    ## Switch to branch
    $ git checkout testing
    ## Shortcut to create a new branch and checkout
    $ git checkout -b newbranch
    ## Delete a branch
    $ git branch -d testing
    ## Merge the <branch> on the current working branch
    ## Merge tip: If you're doing merge say, from `wip` to `live` branch and you've edit `live` branch files
    ## then it will not undo changed file which is what we want.
    ## Also, merge conflict occurs when same file changed in both branch, you merged. You can reverse the merge conflict
    ## with `--abort` option
    $ git merge testing    ## this will merge `testing` branch onto current (`master`) branch.
    ## checkout arbitrary commits instead of branch
    $ git checkout HEAD~2
    ## Undo deleted branch
    $ git reflog    ## to see the hash code of branch before deletion.
    $ git checkout <hashcodeFromReflog>  ## to restore, and then create the same branch from there.
