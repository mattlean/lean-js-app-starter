# Docker Development Environment

LJAS provides an alternative dev environment that runs in a containerized environment with [Docker](https://docker.com) that is available for all non-Electron based projects.

## Contents

## Docker vs. Native Development Environment

If you're new to container-based dev environments there are a few things you will need to consider when comparing working in containers versus working natively.

### Docker Benefits

**It makes the dev environment perform more consistently.**

You can be more confident that your dev environment will behave the same as your teammates, even if they work on a different operating system, thus reducing the number of occurrences of "it works on my machine." You can still benefit from this when working alone too if you find yourself switching between different machines.

**Skip most of the setup process by installing Docker.**

When setting up a project natively, you will need to need to install Node.js, other dependencies like databases and npm packages, etc. The Docker dev environment streamlines this process significantly by reducing the prerequisites to just Docker and simplifying the necessary commands to run.

You won't even need have Node.js installed which lets you completely avoids issues around versions. Usually this is encountered when you're working on multiple projects that rely on different and incompatible Node.js versions. One solution is to upgrade one project's Node.js version which can cause a cascading series of dependency compatibility issues. Another solution is to install something like [nvm](https://github.com/nvm-sh/nvm) which allows you to install multiple versions of Node.js and switch between them. The Docker dev environment solves this by running the exact Node.js version needed in an isolated, containerized environment that cannot conflict with any Node.js installations on your native machine.

Database-based projects have the most elaborate setup processes due to their involvement with MongoDB, PostgreSQL, and Prisma. Dealing with multiple versions at once can cause conflicts just like when working with Node.js natively, but the Docker dev environment gets around this by running the database in an isolated, containerized environment. In addition to this, there are more steps in getting Prisma setup and connected to the database, but LJAS's Docker dev environment handles all of that for you by default so you don't need to worry about setting a database username or password, a connection string, etc. to get started.

### Docker Trade-Offs

**You should learn yet another thing: Docker.**

While you can get away with just using `docker compose up`, `docker compose stop`, and `docker compose down` for a while, at some point you will probably need to do something other than these three commands.

Even though the Docker dev environment does not require expert-level Docker experience, even acquiring a basic understanding of it still means that you need t spent time to learn another technology. While these which can be an issue if you're tight on time.

**Docker can be resource intensive for some machines.**

Because Docker is limited to a subset of your host machine's resources, everything running within the container will always be slower when compared to running everything natively. Usually this is not very noticeable for higher-end machines, but this can be a significant problem for machines with weaker hardware.

The good thing about Docker is that it is extremely easy to get the containers running and torn down, so it won't hurt to try spinning up the Docker dev environment just to see how it works for your machine. If you experience less than acceptable performance, take a look at TODO: the section on performance improvement suggestions before you decide to roll with the native dev environment.

**Caveats concerning linting, formatting, and type checking.**

The Docker dev environment uses a [bind mount](https://docs.docker.com/storage/bind-mounts) to give the container direct access to the project directory on your host machine. The only directory that is skipped is the `node_modules` directory as its contents can vary depending on operating system, so the container will generate its own unique one.

The problem this causes is that if you're natively running terminal commands or editor functionalities that rely on `node_modules`, they won't have access to the container's `node_modules` directory which will break things like ESLint, Prettier, and type checking. One solution to this is to have another `node_modules` directory specifically for your host machine's operating system so you will need to run `npm install` (and `npm run prisma generate` if you're working with a database) natively so your terminal commands and editor functionalities can perform properly.

This brings up another issue where now you have two different `node_modules` directories: one on the host machine and one in the container. Consequently you will need to make sure that both are always up-to-date, otherwise you may encounter unexpected behavior. Most people are okay with this, but if you don't want to worry about multiple `node_modules` directories, you can use VS Code to develop inside the container which we go over how to do in TODO: this section. Note that this option's own trade-off is that it means you have to use VS Code and when the container stops or crashes, the connected VS Code instance will also stop working as well which some people find inconvenient.

**The Docker dev environment is consistent across different machines until it isn't.**

You may have noticed in the benefits section that we say, "It makes the dev environment perform _more_ consistently." We cannot say it performs _100% consistently_ because unfortunately there are always weird cases that comes up where even a Docker container will run fine on one machine but run into a problem on another, requiring a machine-specific fix to do.

It is true that the Docker dev environment does significantly reduce the "it works on my machine problem" when compared to native setup, but it does not completely eliminate it, so please refer to the TODO: troubleshooting section of this document if you encounter any problems.

## Docker Basics

This section will go over some basic things for Docker intended for people who want to use the Docker dev environment without any Docker experience.

**Installing Docker**

There are a few different ways to get Docker up and running on your machine, but we suggest installing [Docker Desktop](https://www.docker.com/products/docker-desktop) which will install Docker and a GUI that lets you manage your containers.

Even if you intend to completely ignore the GUI and interface with Docker solely through terminal commands, we still recommend Docker Desktop because it simplifies the installation process for Docker significantly.

**Stopping the Docker Dev Environment**

You can stop them with one of the following options:

-   Press Ctrl+C in the terminal where the container logs are output.
-   Use Docker Desktop to stop the containers.
-   Open another terminal, navigate to the project directory, and run [`docker compose stop`](https://docs.docker.com/reference/cli/docker/compose/stop).

**Getting Container Information**

You can run [`docker ps` (shorthand for `docker container ls`)](https://docs.docker.com/reference/cli/docker/container/ls) to see all currently running containers and information on them like container ID, what image they were build from, up-time, ports, etc:

```console
docker ps
```

You can also view stopped containers by using the [`-a` flag (shorthand for `--all`)](https://docs.docker.com/reference/cli/docker/container/ls/#all) like so:

```console
docker ps -a
```

Alternatively, you can view this information with Docker Desktop in the "Containers" tab.

**Accessing Container Logs**

If you used [`docker compose up`](https://docs.docker.com/reference/cli/docker/compose/up) to start the dev environment, the terminal you ran the command in will display all of the logs output by the dev environment.

If you don't want the Docker logs to take up your terminal, you can start the dev environment in detached mode by passing the [`-d` flag (shorthand for `--detach`)](https://docs.docker.com/engine/reference/run/#foreground-and-background) like so:

```console
docker compose up -d
```

This starts the containers in the background so you can keep using your existing terminal for something else. You can always access the logs will be hidden at first, you can still view them using [`docker logs` (shorthand for `docker container logs`)](https://docs.docker.com/reference/cli/docker/container/logs) like so:

```console
docker logs CONTAINER_NAME -f
```

You can close the logs by pressing Ctrl+C, and even though the logs will have closed, the containers running the dev environment will continue to work in the background.

Alternatively, you can view a container logs through Docker Desktop by clicking on it in the "Containers" tab and then viewing its "Logs" tab.

**Running Terminal Commands Inside the Container**

You can pass commands from your host machine to the container using [`docker exec` (shorthand for `docker container exec`)](https://docs.docker.com/reference/cli/docker/container/exec) commands, but we think it's easier to just gain full access to the container's [Bash](https://gnu.org/software/bash) using this command:

```console
docker exec -it CONTAINER_NAME bash
```

Now the container's Bash will open and any command you run will execute within the context of the container until you close the Bash with Ctrl+C. To clarify that this is the Bash within the container, you will see that the Bash prompt will include a 🐳 emoji.

Alternatively, you can also access the terminal from inside the container with Docker Desktop by going to the "Containers" tab, selecting the container you want to access, and clicking on the "Terminal" tab.

## More Learning Resources

The following resources are beginner-level guides from the [Docker docs](https://docs.docker.com) that will teach you fundamental Docker concepts that will be useful when using LJAS's Docker dev environment. It also covers the fundamentals of how the Docker dev environment works under-the-hood.

-   [Getting started: Get Docker Desktop](https://docs.docker.com/guides/getting-started/get-docker-desktop)
-   [The basics: What is a container?](https://docs.docker.com/guides/docker-concepts/the-basics/what-is-a-container)
-   [The basics: What is an image?](https://docs.docker.com/guides/docker-concepts/the-basics/what-is-an-image)
-   [The basics: What is Docker Compose?](https://docs.docker.com/guides/docker-concepts/the-basics/what-is-docker-compose)
-   [Building images: Understanding image layers](https://docs.docker.com/guides/docker-concepts/building-images/understanding-image-layers)
-   [Building images: Writing a Dockerfile](https://docs.docker.com/guides/docker-concepts/building-images/writing-a-dockerfile)
-   [Building images: Build, tag and publish an image](https://docs.docker.com/guides/docker-concepts/building-images/build-tag-and-publish-an-image)
-   [Running containers: Publishing ports](https://docs.docker.com/guides/docker-concepts/running-containers/publishing-ports)
-   [Running containers: Overriding container defaults](https://docs.docker.com/guides/docker-concepts/running-containers/overriding-container-defaults)
-   [Running containers: Persisting container data](https://docs.docker.com/guides/docker-concepts/running-containers/persisting-container-data)
-   [Running containers: Sharing local files with containers](https://docs.docker.com/guides/docker-concepts/running-containers/sharing-local-files)
-   [Running containers: Multi-container applications](https://docs.docker.com/guides/docker-concepts/running-containers/multi-container-applications)
-   [Language-specific guides: Node.js](https://docs.docker.com/language/nodejs)

## Developing Inside a Container with Visual Studio Code

TODO:

1. Install the [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension.
2. Make sure project containers are running.
3. Use "Attach to running container..." and attach to the container you want.
4. Once the attached VS Code instance is open, open `/code` folder in the explorer and run `cd /code` in the terminal.

## Connect Natively Running App with Containerized Database

## Troubleshooting

## How do I reduce the space Docker requires?

TODO:

-   docker image prune
-   docker builder prune
-   docker system prune

**Changes to my code are not being seen by nodemon or webpack when they are running in a container.**

Some machines run into issues with watching files in Docker containers.

To resolve this issue with nodemon, pass the `--legacy-watch` (or `-L`) flag whenever it is run. It is most likely that you will most likely need to update your `dev` `package.json` script with it. For more information on this, refer to the [nodemon README](https://github.com/remy/nodemon?tab=readme-ov-file#application-isnt-restarting).

To resolve this issue with webpack, set the `watchOptions.poll` option in a webpack configuration file. For more information on this, refer to the ["Watch and WatchOptions" page in the webpack docs](https://webpack.js.org/configuration/watch/#watchoptionspoll).

**I am trying to start containers on Windows and am encountering the following error:**

```
failed to solve: rpc error: code = Unknown desc = failed to solve with frontend dockerfile.v0: failed to create LLB definition: failed to authorize: rpc error: code = Unknown desc = failed to fetch anonymous token: unexpected status: 503 Service Unavailable
```

You are most likely running Linux containers which are intended for usage on Linux or macOS. When running Docker containers on Windows, it is expected that you use Windows containers.

To switch to them, right-click the Docker icon in the nofication area of the taskbar, and select "Switch to Windows containers..." To use the command line to switch between containers, run:

```
& $Env:ProgramFiles\Docker\Docker\DockerCli.exe -SwitchDaemon
```

**I'm using a project's Docker dev environment, but Playwright won't work in the container. Why is that and how can I fix it?**

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
