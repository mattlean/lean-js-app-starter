# Code Editors

## Contents

-   [Overview](#overview)
-   [Download & Install](#download--install)
-   [Install Extensions](#install-extensions)
-   [Debugging](#debugging)
-   [Developing Inside a Container](#developing-inside-a-container)
-   [Configuration](#configuration)

## Overview

LJAS supports **[Visual Studio Code (VS Code)](https://code.visualstudio.com)**, but it is not required. We do highly recommend it because it will ensure a smooth editor setup process for you as we have some things preconfigured for it, and all the documentation will explain things from a Visual Studio Code user's perspective.

If you decide against using VS Code, we highly recommend that you figure out how to get [ESLint](https://eslint.org) and [Prettier](https://prettier.io) (and type checking if you're using [TypeScript](https://typescriptlang.org)) operating in your editor. Catching warnings and errors in real-time as you code is extremely valuable!

Although LJAS no longer supports [Sublime Text](https://sublimetext.com). you can still refer to the [v0.1.1 Sublime Text documentation](https://github.com/mattlean/lean-js-app-starter/blob/v0.1.1/docs/tools/sublime_text.md) if that is your editor of choice.

If for whatever reason your editor does not work with these tools, then you can resort to `package.json` scripts like `npm run lint`, `npm run format`, and `npm run check-types` to check for potential problems manually in a terminal.

The remainder of this document will go over how to setup and work with VS Code.

## Download & Install

[Download and install Visual Studio Code here](https://code.visualstudio.com/download).

## Install Extensions

Open the root directory of a project with VS Code and then open the extensions view by clicking on its icon in the activity bar on the side of the editor. The icon looks like this:  
![VS Code extensions view icon](../images/vs-code-extensions-icon.png)

Type in `@recommended` into the search box to view the recommended extensions for the project and install all of them. All projects will recommend the [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode), but there may be some variance in others depending on the type of project being used. For example, frontend-related projects will also recommend the [Stylelint extension](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint).

## Debugging

If you want to learn how to debug with VS Code, read the ["Debugging" document](../developing/debugging.md).

## Developing Inside a Container

If you're using the Docker dev environment, you can develop inside a container with VS Code which sets up all recommended extensions for you out-of-the-box along with a few other benefits. Read the ["Developing Inside a Container with Visual Studio Code" section in the "Docker Environments" document](../developing/docker-environments.md#developing-inside-a-container-with-visual-studio-code) to learn how to do that.

## Configuration

Read the [Visual Studio Code configuration document](../configuration/vscode.md) to learn how VS Code is configured and how to customize it yourself.
