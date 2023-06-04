# Setting up Git pre-commit hooks

We've already pre-configured Git pre-commit hooks to type check, lint, and format code, but we don't have them running out-of-the-box due to some difficulty it would introduce for users setting up projects that aren't already associated with a Git repository.

So before you continue, make sure the project is linked to a Git repository. You can simply run `git init` at the project root directory which should generate a `.git` directory there.

We use [Husky](https://typicode.github.io/husky) and [lint-staged](https://github.com/okonet/lint-staged) to handle pre-commit hooks, so you will need to install them with the following command:

```
npm install husky@^8.0.3 lint-staged@^13.2.2 --save-dev
```

Next we'll need to create a new `package.json` script called `prepare`. We can easily do that with this command:

```
npm pkg set scripts.prepare="husky install"
```

Now run the new script:

```
npm run prepare
```

As Husky has already been configured in the `.husky` directory and lint-staged has already been configured in the `.lintstagedrc` file, pre-commit hooks should be working for you now!
