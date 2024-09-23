# Code Editors

LJAS supports **[Visual Studio Code (VS Code)](https://code.visualstudio.com)**, but it is not required. We do highly recommend it because it will ensure a smooth editor setup process for you as we have some things preconfigured for it, and all the documentation will explain things from a Visual Studio Code user's perspective.

If you decide against using VS Code, we highly recommend that you figure out how to get [ESLint](https://eslint.org) and [Prettier](https://prettier.io) (and type checking if you're using [TypeScript](https://typescriptlang.org)) operating in your editor. Catching warnings and errors in real-time as you code is extremely valuable!

Although LJAS no longer supports [Sublime Text](https://sublimetext.com). you can still refer to the TODO: [v0.1.1 Sublime Text documentation] if that is your editor of choice.

If for whatever reason your editor does not work with these tools, then you can resort to `package.json` scripts like `npm run lint`, `npm run format`, and `npm run check-types` to check for potential problems manually in a terminal.

The remainder of this document will go over how to setup and work with VS Code.

## Download & Install

[Download and install Visual Studio Code here](https://code.visualstudio.com/download).

## Install Extensions

Open the root directory of a project with VS Code and then open the extensions view by clicking on its icon in the activity bar on the side of the editor. The icon looks like this:  
![VS Code extensions view icon](../images/vs-code-extensions-icon.png)

Type in `@recommended` into the search box to view the recommended extensions for the project and install all of them. All projects will recommend the [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode), but there may be some variance in others depending on the type of project being used. For example, frontend-related projects will also recommend the [Stylelint extension](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint).

### Developing Inside a Container with Visual Studio Code

If you're using the Docker dev environment, you can develop inside a container with VS Code which sets up all recommended extensions for you out-of-the-box along with a few other benefits. TODO: Read the Docker document to learn how to do that.

## Configuration

Read the ["Configuration: Visual Studio Code" document](../configuration/vscode.md) to read about how VS Code is configured.

## Debugging

TODO: debugging doc link

## Develop Inside a Docker Container through VS Code

TODO: docker doc link
