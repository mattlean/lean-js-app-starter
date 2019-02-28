# Sublime Text
## Overview
[Sublime Text](https://sublimetext.com) offers many packages that make the development process a lot more convenient. You can download the editor here: https://sublimetext.com/3

## Setup
### Install Package Control
In order to install packages, first you must install [Package Control](https://packagecontrol.io) which is the main package manager for Sublime Text.

Follow the instructions on the Package Control installation page: https://packagecontrol.io/installation

### Installing Packages

1. After Package Control is installed, go to `Sublime Text > Preferences > Package Control` (or use the `CMD + Shift + P` shortcut) to open up the command palette. Type in `Package Control: Install Package` into the search bar and hit enter.
2. Now the command palette should show all available packages. Search for the desired package and hit enter to install it. You may need to reopen already open files or restart Sublime Text to see the package in effect.

## Packages
### [Naomi: Extend syntax highlighting support](https://packagecontrol.io/packages/Naomi)
Naomi extends Sublime Text to support syntax highlighting for ECMAScript 2015 JavaScript, JSX, and Flow.

### [SublimeLinter](https://packagecontrol.io/packages/SublimeLinter-eslint)
SublimeLinter is a linting framework that will allow us to install SublimeLinter plugins that will enable linting functionality.

#### [SublimeLinter-eslint: Lint ECMAScript 2015 JavaScript, JSX & Flow](https://packagecontrol.io/packages/SublimeLinter-eslint)
Connects Sublime Text with the project's [ESLint](https://eslint.org) configuration ([`.eslintrc.json`](../../.eslintrc.json)). Make sure the ESLint dependency has been installed. [Read #2 in "Getting Started" to learn how to install dependencies.](getting_started.md)

#### [SublimeLinter-flow: Type check with Flow](https://packagecontrol.io/packages/SublimeLinter-flow)
Connects Sublime Text with the project's [Flow](https://flow.org) configuration ([`.flowconfig`](../../.flowconfig)). Make sure the Flow dependency has been installed. [Read #2 in "Getting Started" to learn how to install dependencies.](getting_started.md)

#### [SublimeLinter-stylelint: Lint CSS & Sass](https://packagecontrol.io/packages/SublimeLinter-stylelint)
Connects Sublime Text with the project's [stylelint](https://stylelint.io) configuration ([`.stylelintrc`](../../.stylelintrc)). Make sure the Flow dependency has been installed. [Read #2 in "Getting Started" to learn how to install dependencies.](getting_started.md)

## Sublime Project
The Sublime Project file can be found in the project root directory as [`lean-js-app-starter.sublime-project`](../lean-js-app-starter.sublime-project).

It sets the following:
* Set tab size to 2 & translate tabs to spaces (matches the ESLint configuration)
* Trim trailing white space on save

These locations will be ignored in *Goto Anything* or *Find in Files*:
* `build/`
* `coverage/`
* `flow-typed/`
* `node_modules/`
* `.eslintcache`
* `package-lock.json`
* `records.json`
* `stats.*.json`
* `yarn.lock`
* `yarn-error.log`