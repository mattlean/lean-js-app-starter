# Contributing

Thanks for your willingness to contribute to Lean JS App Starter! Here is an overview of the contribution process.

## Finding or Creating Issues

First, take a look through the GitHub repository's issue page:
https://github.com/mattlean/lean-js-app-starter/issues

Then, see the GitHub project board to view what tickets the LJAS core team is currently prioritizing:
https://github.com/users/mattlean/projects/3

If you want to work on something that isn't on the issue page or project board, then feel free to create a new issue. Note that sometimes the board contains tickets that don't have a corresponding issue yet which means that the LJAS core team does have plans to work on it. So even if you don't see an issue for something, make sure there isn't an existing ticket for it on the project board too before creating a brand new issue.

## Branching Procedure

Every development version has what we call a **development branch** which holds all of the work that is intended for that version's release. The development branch will always have a `-dev` suffix at the end of its name. For example, if the upcoming version is 1.1.0, then the development branch name will be `v1.1.0-dev`.

When you want to work on something, branch off of the development branch and work off of that. This is what we call a **feature branch**. Its name should follow a particular convention where it starts with the issue number it is attempting to resolve followed by an underscore, and then a title that is relevant to the issue. For example, if the issue number is 464 and the issue title is "Create tic-tac-toe example", then an appropriate feature branch name could be `464_tic-tac-toe`.

## Pull Requests

Once you're ready to make a pull request, [squash all of the commits in your feature branch into one commit](https://git-tower.com/learn/git/faq/git-squash), set its commit message to something relevant to the issue, and end the message with the issue number prefixed with a # sign. For example, if the issue number is 464 and the issue title is "Create tic-tac-toe example", then an appropriate commit message could be "Create tic-tac-toe example #464".

After that, push the feature branch to the GitHub repository, and then make a pull request from it that merges into the development branch. For example, if your feature branch was named `464_tic-tac-toe` and the version you're developing for is 1.1.0, you would set the base branch to `v1.1.0-dev` in the pull request.

If you want to preserve your Git commit history, you can push another branch that has your work's complete, unsquashed commit history with `_dev` appended to the end of its feature branch name. This will not be merged, but it can be kept in the repository for reference and backup purposes.

## Review Process

Now that your branch and pull request is ready, assign a reviewer from the LJAS core team on the pull request. They will review and test your work and will reply with feedback if necessary. Once the code is in an acceptable state, the pull request will be approved by the reviewer and will be acceptable for merging into the development branch.
