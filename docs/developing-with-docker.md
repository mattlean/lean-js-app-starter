# Developing with Docker

Instead of running the projects natively on your computer, we've also provided a containerized development environment with [Docker](https://www.docker.com) that's available for you to use.

## Why should I use the Docker dev environment?

Here are some things to consider if you're evaluating whether or not the Docker dev environments are right for you:

### Benefits

There are some pretty significant upsides to using a Docker dev environment.

**It makes the dev environment more consistent for the entire team.**  
You can be confident that your dev environment will behave the same as your teammates, even if they use a different operating system. You can still benefit from consistency if you're working alone too. If you find yourself switching between different computers or you're moving to a new computer entirely, you will be able to seamlessly swap between them.

**Don't worry about how to install or run anything. Just install Docker and forget about everything else.**  
TODO:
Installing, upgrading, and spinning up and down services and dependencies becomes simpler. When setting up a project, you usually need to worry about things like how to get a service like a database installed and running for your particular operating system. This step is drastically simplified as the dev environment builds Linux-based containers that establish a singular foundation for services and dependencies to live in. Now all we need to worry about is how to do something on Linux, and then everything will be exposed to our host computer, letting us not worry about things like whether or not we're running on Windows 10, Windows 11, macOS Monterey, macOS Sonoma, etc.

Another benefit is that these services and dependencies will not conflict with other projects on your computer as they are isolated within the containers. This is nice when you have several different projects that rely on different versions of the same services and dependencies.

For example, maybe I could have one project that is stuck on an old version of Node.js and another one that uses that latest version of Node.js. Upgrading or downgrading the installation of Node.js on my machine would mean breaking one of the projects, not to mention the annoyance of having to do that every time I switch between them. I could rely on something like [Node Version Manager](https://github.com/nvm-sh/nvm) to gain the ability of having multiple Node.js versions on one computer, but then I need to set that up and always make sure my project is running on the right Node.js version when I start it. I might be willing to live with that, but what if I'm working with a service that doesn't have solution like Node Version Manager available for me?

Docker completely avoids this issue because from my native machine's perspective. The only dependency that needs to be installed is Docker itself. I can completely forget about the million other services and dependencies like Node.js, PostgreSQL, React, or whatever. Now I can have one project rely on my global installation of Node.js and use the Docker dev environment for the other one, or maybe I could just have both projects use two separate Docker dev environments, eliminating the need for my computer's Node.js installation all together.

Once Docker is installed, all you need to do is run `docker compose up` to turn on the dev environment.

### Downsides

As with most technologies, Docker unfortunately has some trade offs to think about too.

**You should learn yet another thing: Docker.**  
TODO:
If an issue occurs with the dev environment, there's a good chance you may need to know your way around Docker to debug and fix the issue.

**There can be a slow down to development-related processes like compile times, linting, and type checking.**  
TODO:
Because Docker is limited to a subset of your host computer's resources, it is inherently weaker in power which means processes like webpack, Babel, ESLint, TypeScript, and pretty much everything will run slower when compared to them running natively. This can vary depending on the performance of your computer, but some people really care to make sure their dev environment behaves as fast as possible whereas some people are willing to take the trade-off as the reduction in complexity around service and dependency maintenance is worth it.

**Dependencies can cause inconveniences if your editor is running natively.**  
TODO:
Editor extensions like ESLint depend on `node_modules`, but if you're running the services within containers, `node_modules` will be unaccessible on your editor running natively. To get around this you will need to have two different installations of `node_modules` (one in the container, and the other natively) or you will need to develop within the context of the container.

VS Code has the best documented way on how to do this, but this means that you will have to use VS Code which is a problem if you prefer something else. Also, if the container crashes, the connected VS Code instance will crash as well which can be inconvenient.

**The environment is consistent across different computers until it isn't.**

TODO:

## How to develop inside the container with Visual Studio Code.

TODO:

1. Install the [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension.
2. Make sure project containers are running.
3. Use "Attach to running container..." and attach to the container you want.
4. Once the attached VS Code instance is open, open `/code` folder in the explorer and run `cd /code` in the terminal.

## FAQs

Here are some other frequently asked questions for new Docker users.

### How do I stop the Docker dev environment?

You can stop them with one of the following options:

-   Input Ctrl+C in the terminal where the processes are running.
-   Stopping the containers through Docker Desktop.
-   Open another terminal, navigate to the project directory, and run `docker compose down`.

### How can I get information on my containers?

You can run this command to see all currently running containers and information on them like container ID, what image they were build from, up-time, ports, etc:

```
docker ps
```

You can also view stopped containers by using the `--all` option like so:

```
docker ps -a
```

[For more information on `docker ps`, you can refer to its page in the Docker docs.](https://docs.docker.com/engine/reference/commandline/container_ls)

Alternatively, you can view this information with Docker Desktop on the "Containers" tab.

### How do I access the logs from a container?

If you used `docker compose up`, the terminal you ran the command in will display all of the logs output by the dev environment.

You can also view a container's logs through Docker Desktop by clicking on it in the "Containers" tab and then viewing its "Logs" tab.

Alternatively, you can run the Docker dev environment in detached mode with `docker compose up -d` so you don't need to keep a terminal open while the containers are running. While this means that the logs will be hidden at first, you can still view them using `docker logs CONTAINER_NAME -f` or through Docker Desktop. You can close the logs by pressing Ctrl+C, and even though the logs will have closed, the containers running the dev environment will continue to work uninterrupted.

### How can I run terminal commands inside the container?

You can pass commands from your host computer to the container using `docker exec` commands, but we think it's easier to just gain full access to the container's Bash using this command:

```
docker exec -it CONTAINER_NAME bash
```

Now the container's Bash will open and any command you run will execute within the context of the container until you close the Bash with Ctrl+C. To clarify that this is the Bash within the container, you will see that the Bash prompt will include a 🐳 emoji.

[For more information on `docker exec`, you can refer to its page in the Docker docs.](https://docs.docker.com/engine/reference/commandline/container_exec)

Alternatively, you can also access the terminal from inside the container with Docker Desktop by going to the "Containers" tab, selecting the container you want to access, and clicking on the "Terminal" tab.

### I'm using a project's Docker dev environment, but Playwright won't work in the container. Why is that and how can I fix it?

Projects involving Playwright are split into two different Docker setups by default:

1. Dev environment: This Docker environment is meant for feature development and will run a development build. This environment will not have Playwright dependencies installed by default.
2. E2E environment: This is a specialized Docker environment meant for end-to-end testing and will run a production build intended to run with Playwright.

If Playwright isn't working in your container, you are probably trying to run Playwright in the dev environment container. We encourage you to use the E2E environment when working with Playwright because it runs a production build which will more accurately represent the experience your end-users will have.

If you still want Playwright to run in the dev environment, you can get it working by using the `INSTALL_PLAYWRIGHT_DEPS` build argument that, when set to `true`, will perform the Playwright dependency installation step in the image building process.

There are a couple of ways of setting up build arguments, but one way to do it is to run the following command:

```
docker compose build --build-arg INSTALL_PLAYWRIGHT_DEPS=true
```

After the image is built, subsequent runs of `docker compose up` will skip the image building process and jump straight to building a new container that will have Playwright setup within it.

If you end up wanting to get rid of Playwright, you can rerun the build process without any build arguments like so:

```
docker compose build
```

This is basically the same thing as setting `INSTALL_PLAYWRIGHT_DEPS` to `false`, but it's unnecessary to explicitly do that since the `Dockerfile` will do it for you by default.
