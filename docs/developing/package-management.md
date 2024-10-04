# Package Management

Like most JavaScript projects, LJAS relies on [`package.json`](https://docs.npmjs.com/cli/v10/configuring-npm/package-json) which is a JSON configuration file found your project's root directory. It determines all of the meta information and dependencies for your project.

## Contents

-   [Package Manager](#package-manager)
-   [`package.json` Basics](#packagejson-basics)
    -   [Package Version Practices](#package-version-practices)
    -   [Managing Dependencies](#managing-dependencies)
    -   [Scripts](#scripts)
-   [`dependencies` vs. `devDependencies`](#dependencies-vs-devdependencies)
-   [Troubleshooting](#troubleshooting)

## Package Manager

While there are multiple package managers that support `package.json` like [Yarn](https://yarnpkg.com), we currently only support [npm](https://npmjs.com) out-of-the-box since it is usually installed alongside [Node.js](https://nodejs.org). Because of this, the docs are written in the perspective of an npm user.

Switching to a different package manager shouldn't be difficult as long as you do it early, so we highly recommend that you decide on one package manager when you start a new project and stick with it to avoid issues that can arise when switching package managers later in development.

## `package.json` Basics

### Package Version Practices

All version numbers (i.e. your package version or package dependency versions) are supposed to follow [semantic versioning (SemVer)](https://semver.org). Sometimes you may encounter a package that doesn't respect it which is unfortunate. Avoid being a headache for the community and please follow SemVer practices correctly!

### Managing Dependencies

Install new packages with the [`npm install` command](https://docs.npmjs.com/cli/v6/commands/npm-install) like so:

```console
npm install react
```

This command also lets you do other things. For example, you can specify which version of a package to install like so:

```console
npm install react@17.0.2
```

You can also install multiple packages by passing in multiple arguments like so:

```console
npm install react react-dom
```

When you install a package, it will add itself under the [`dependencies` field](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#dependencies) by default, but you can add a package to different dependency category too. For example, if you want to add a development dependency, you can use a command like this:

```console
npm install jest --save-dev
```

This will install Jest and add it under the [`devDependencies` field](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#devdependencies).

Uninstalling existing dependencies is done with the [`npm uninstall` command](https://docs.npmjs.com/cli/v6/commands/npm-uninstall) like so:

```console
npm uninstall react
```

### Scripts

The [`scripts` field](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#scripts) allows you to define `package.json` scripts which become terminal commands. By default we provide many scripts for you to use which we cover in [other documents in the "Developing" section of the docs](../developing).

Here is an example of our lint script which will run ESLint and identify potential problems in your code:

```console
npm run lint
```

It is a good idea to add scripts for commonly used and inconveniently long terminal commands to this field.

## `dependencies` vs. `devDependencies`

LJAS organizes all packages that are required to execute the build process and application in the `dependencies` field like React and webpack. All other packages that aren't critical to the build process and application are placed under the `devDependencies` field. So for example, while ESLint and Jest are vital for development, they are not used by the application when it runs or the build process, so they would fall into this latter category.

## Troubleshooting

### Problems

-   [Some of my packages are having problems running.](#some-of-my-packages-are-having-problems-running)
-   [How do I figure out which packages are dependent on a package?](#how-do-i-figure-out-which-packages-are-dependent-on-a-package)

#### Some of my packages are having problems running.

When in doubt, first try deleting your existing `node_modules` directory. This can be done by running the following command in your project's root directory:

```console
rm -rf node_modules
```

Then install a brand new `node_modules` directory using the [`npm ci` command](https://docs.npmjs.com/cli/v10/commands/npm-ci):

```console
npm ci
```

This command acts similarly to running [`npm install` without passing in any arguments](https://docs.npmjs.com/cli/v10/commands/npm-install#description) except it will not perform any changes to [`package-lock.json`](https://docs.npmjs.com/cli/v10/configuring-npm/package-lock-json).

#### How do I figure out which packages are dependent on a package?

Sometimes you need to figure out which packages are dependent on a specific package. This can be handy in situations where you need to resolve version conflicts. Sometimes looking at your `package.json` alone isn't enough as there could be deeper, unseen relations in your project's dependency tree that are causing problems.

A good way to figure this out is to use the [`npm ls` command](https://docs.npmjs.com/cli/v6/commands/npm-ls) which allows you to visualize your project's dependency tree. For example, you can see which packages depend on React using the following command:

```console
npm ls react
```
