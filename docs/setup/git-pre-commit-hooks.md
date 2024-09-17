# Git Pre-Commit Hooks

We've already pre-configured [Git pre-commit hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks#_committing_workflow_hooks) to find type, link, and format warnings/errors, but we don't have them running out-of-the-box due to some difficulty it would introduce for users setting up projects that aren't already associated with a Git repository.

## Setup

Before you continue this document, make sure the project is linked to a Git repository. You can simply run `git init` at the project's root directory which should generate a `.git/` directory there.

We use [Husky](https://typicode.github.io/husky) and [lint-staged](https://github.com/okonet/lint-staged) to handle pre-commit hooks, so you will need to install them with the following command:

```console
npm install husky@^8.0.3 lint-staged@^13.2.2 --save-dev
```

Next you'll need to create a new `package.json` script called `prepare`. You can easily do that with this command:

```console
npm pkg set scripts.prepare="husky install"
```

Now run the new `prepare` `package.json` script:

```console
npm run prepare
```

As Husky has already been configured in the `.husky/` directory and lint-staged has already been configured in the `.lintstagedrc` file, pre-commit hooks should be working for you now!

## How do I bypass pre-commit hooks?

Simply pass in the `--no-verify` or `-n` flag with your commit. So for example, in the terminal your command might look similar to:

```console
git commit --no-verify
```

## Disabling pre-commit hooks for certain environments

Note that while pre-commit hooks are great for your development environment, they may cause issues for other environments where you wouldn't want them to run like a CI server or some Docker environments. [For potential solutions, please refer to Husky's "How To" document.](https://typicode.github.io/husky/how-to.html#ci-server-and-docker)
