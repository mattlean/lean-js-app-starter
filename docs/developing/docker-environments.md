# Docker Environments

LJAS provides two different [Docker](https://docker.com) environments:

1. **Development Environment**  
   An alternative to the native dev environment that runs the entire app in a containerized Docker environment. It is available for all projects except for Electron-based ones.
2. **End-to-End Test Environment**  
   A specialized Docker environment specifically for end-to-end (E2E) testing using [Playwright](https://playwright.dev). It is available for all frontend-related projects.

## Contents

- [Docker vs. Native Environments](#docker-vs-native-environments)
- [Setting Up the Docker Dev Environment](#setting-up-the-docker-dev-environment)
- [Setting Up the Docker End-to-End Test Environment](#setting-up-the-docker-end-to-end-test-environment)
- [Docker Basics](#docker-basics)
  - [Installing Docker](#installing-docker)
  - [Shutting Down a Docker Environment](#shutting-down-a-docker-environment)
  - [Getting Container Information](#getting-container-information)
  - [Accessing Containers Logs](#accessing-container-logs)
  - [Running Terminal Commands Inside the Container](#running-terminal-commands-inside-the-container)
- [More Learning Resources](#more-learning-resources)
- [Connecting to Docker Databases Through a Terminal](#connecting-to-docker-databases-through-a-terminal)
- [Hybrid Native/Docker Development Environment](#hybrid-nativedocker-development-environment)
- [Developing Inside a Container with Visual Studio Code](#developing-inside-a-container-with-visual-studio-code)
- [Performance Tips](#performance-tips)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)

## Docker vs. Native Environments

There are a few things you will need to consider when comparing working natively versus working in containers if you're new to container-based dev environments.

### Docker Benefits

#### It makes the dev environment perform more consistently.

You can be more confident that your dev environment will behave the same as your teammates, even if they work on a different operating system, thus reducing the number of occurrences of "it works on my machine." You can still benefit from this when working alone too if you find yourself switching between different machines.

#### Skip most of the setup process by installing Docker.

When setting up a project natively, you will need to need to globally install some dependencies like [Node.js](https://nodejs.org) and databases which can conflict with other existing installations of those dependencies on your machine. These conflicts often happen when you work on multiple projects that rely on differing, incompatible versions of the same dependency on the same machine.

One solution is to upgrade the projects so they all depend on the same version, but that can be a time consuming process that involves resolving a cascading series of dependency compatibility and migration issues.

Another solution is to get multiple, different versions of a dependency to work simultaneously. Sometimes you'll have to rely on specialized methods or tools accomplish this. For example, for Node.js you would need to install something like [nvm](https://github.com/nvm-sh/nvm), keep track of what version of Node.js is currently running, and switch to other versions when necessary.

Docker environments avoid this issue entirely by running the exact versions of the dependencies you need in an isolated, containerized environment which cannot conflict with anything natively on your machine.

Some dependencies have more complicated setup processes as well. Databases are an example of this as they have more involved installation processes and then require additional steps to get working with [Prisma](https://prisma.io). Docker environments significantly streamline this process by handling the entire setup process for you out-of-the-box. You won't need to worry about setting a database username or password, a connection string, etc. as that is all set for you by default.

### Docker Trade-Offs

#### You should learn yet another thing: Docker.

While you can get away with just using `docker compose up`, `docker compose stop`, and `docker compose down` for a while, at some point you will probably need to do something other than these three commands.

Even though the Docker environments do not require expert-level Docker experience, even acquiring a basic understanding of it still means that you need to spend time learning another technology which can be an issue for some people.

#### Docker can be resource intensive for some machines.

Because Docker is limited to a subset of your host machine's resources, everything running within the container will always be slower when compared to running everything natively. Usually this is not very noticeable for higher-end machines, but this can be a significant problem for machines with weaker hardware.

The good thing about Docker is that it is extremely easy to get the containers running and torn down, so it won't hurt to try spinning up the Docker dev environment just to see how it works for your machine. If you experience less than acceptable performance, take a look at ["Performance Tips" section](#performance-tips) before potentially settling on the native dev environment.

#### Caveats concerning linting, formatting, and type checking.

The Docker dev environment uses a [bind mount](https://docs.docker.com/storage/bind-mounts) to give the container direct access to the project directory on your host machine. The only directory that is skipped is the `node_modules` directory as its contents can vary depending on operating system, so the container will generate its own unique one.

The problem this causes is that if you're natively running terminal commands or editor functionalities, they won't have access to the container's `node_modules` directory which will break functionality around ESLint, Prettier, and type checking while you're coding natively.

One solution to this is to have another `node_modules` directory specifically for your host machine's operating system, so you will need to run `npm ci` (and `npm run prisma generate` if you're working with a database) natively so your terminal commands and editor functionalities can perform properly. However, this causes another problem because now you have two different `node_modules` directories: one in the host machine and one in the container. Because of this, you will need to make sure that both are always up-to-date, otherwise you may encounter unexpected behavior.

Most people are okay with having two `node_modules` directories, but if you don't want to worry about that, you can alternatively use VS Code to develop inside the container which we cover in the ["Developing Inside a Container with Visual Studio Code" section](#developing-inside-a-container-with-visual-studio-code). Note that this option's own trade-off is that it means you have to use VS Code and, when the container stops or crashes, the connected VS Code instance will also stop working as well which is inconvenient.

#### The Docker environments are consistent across different machines until they aren't.

You may have noticed in the benefits section that we say, "It makes the dev environment perform _more consistently_." We cannot say it performs _100% consistently_ because unfortunately there are always weird cases that come up where even a Docker container will run fine on one machine but run into a problem on another, requiring a machine-specific fix to do.

It is true that the Docker environments do significantly reduce the "it works on my machine" problems when compared to native environments, but it does not completely eliminate it. Please refer to the ["Troubleshooting" section](#troubleshooting) if you encounter any problems.

## Setting Up the Docker Dev Environment

Native dev environments may have many multiple prerequisites, but Docker environments only require Docker. You can learn how to install Docker by reading the ["Installing Docker" section](#installing-docker).

Once Docker is installed, follow the instructions for getting started with the Docker dev environment in the `README.md` for your project.

## Setting Up the Docker End-to-End Test Environment

If you're running a frontend-related project that is not Electron-based, then you will have access to a specialized Docker test environment specialized for end-to-end (E2E) testing with Playwright.

The Docker E2E test environment is completely separate from the Docker dev environment, so it will have its own unique set of containers, networks, and volumes, allowing it to be run alongside the Docker dev environment without any conflicts.

This separation is highlighted particularly when working with databases. If the dev and test environments shared the same database, the Playwright tests would generate data that would pollute your dev environment which is not desirable for most people. Conversely, the dev environment could also negatively affect the reliability of Playwright's test results. Keeping things separate makes working with the databases simpler and cleaner, and helps to improve stability and trustworthiness for Playwright.

Just like the Docker dev environment, you will only need Docker which you can learn how to install by reading the ["Installing Docker" section](#installing-docker). Once that's installed, follow the instructions for getting started with the Docker dev environment in the `README.md` for your project.

The only difference is in the final step where instead of running `docker compose up` to start the dev environment, run the following command in the project's root directory to start the test environment instead:

```console
docker compose -f docker-compose.e2e.yml up
```

Once the test environment is running, you can [run Playwright](./testing.md#running-playwright-tests) against it as usual.

To shut down the test environment, you can remove the containers through Docker Desktop or run this command in the project's root directory:

```console
docker compose -f docker-compose.e2e.yml down
```

Note that the Docker E2E test environment produces a production build. This means that rebuilds will be slower when compared to the dev environment, but it allows Playwright tests to be executed in an environment that is more accurate to what end-users will experience, giving more value and reliability to E2E test results.

Also note that database data is not persisted by default for the Docker E2E test environment so that Playwright can start with a consistent, clean slate to test off of. If you need to persist data, shut down the test environment if it is running, open your project's `docker-compose.e2e.yml` file, and uncomment the necessary database volume-related lines. The database data will be persisted in these volumes the next time you start the test environment.

## Docker Basics

This section will go over some basic things for Docker intended for people who want to use the Docker environments without any Docker experience.

#### Installing Docker

There are a few different ways to get Docker up and running on your machine, but we suggest installing [Docker Desktop](https://docker.com/products/docker-desktop) which will install Docker and a GUI that lets you manage your containers.

Even if you intend to completely ignore the GUI and interface with Docker solely through terminal commands, we still recommend Docker Desktop because it simplifies the installation process significantly.

#### Shutting Down a Docker Environment

You can shut a Docker environment down with the following options:

- Press Ctrl+C in the terminal where the container logs are output to stop all containers in the environment.
- Use Docker Desktop to stop/remove the environment's containers.

Note that stopping a container makes it temporarily inactive so it will no longer consume memory on your native machine, but it will take up disk space. Starting a stopped container is fast and will let your app quickly get back up and running.

Removing a container deletes the container and everything within it that is not inside the project directory (which is the project directory on your native machine and the `/code` directory in the app container) or a volume. This completely frees up all the disk space the container was taking on your native machine. Starting a Docker environment again means that it will have to create new containers which can potentially be a slow process if the build cache is invalidated.

Alternatively, you can stop or remove a dev environment's containers by navigating to a project directory and running [`docker compose stop`](https://docs.docker.com/reference/cli/docker/compose/stop) or [`docker compose down`](https://docs.docker.com/reference/cli/docker/compose/down), respectively.

To shut down a test environment, navigate to the project's root directory and run `docker compose -f docker-compose.e2e.yml down`.

#### Getting Container Information

You can run [`docker ps` (shorthand for `docker container ls`)](https://docs.docker.com/reference/cli/docker/container/ls) to see all currently running containers and information on them like container ID, what image they were built from, up-time, ports, etc:

```console
docker ps
```

You can also view stopped containers by using the [`-a` option (shorthand for `--all`)](https://docs.docker.com/reference/cli/docker/container/ls/#all) like so:

```console
docker ps -a
```

Alternatively, you can view this information with Docker Desktop in the "Containers" tab.

#### Accessing Container Logs

If you used [`docker compose up`](https://docs.docker.com/reference/cli/docker/compose/up) to start an environment, the terminal you ran the command in will display all of the logs output.

If you don't want the logs to occupy your terminal, you can start the environment in detached mode by passing the [`-d` option (shorthand for `--detach`)](https://docs.docker.com/engine/reference/run/#foreground-and-background) like so:

```console
docker compose up -d
```

This starts the containers in the background so you can keep using your existing terminal for something else. You can always access the logs later using [`docker logs` (shorthand for `docker container logs`)](https://docs.docker.com/reference/cli/docker/container/logs) like so:

```console
docker logs CONTAINER_NAME -f
```

You can close the logs by pressing Ctrl+C, and even though the logs will have closed, the containers running the environment will continue to work uninterrupted in the background.

Alternatively, you can view container logs through Docker Desktop by clicking on it in the "Containers" tab and then viewing its "Logs" tab.

#### Running Terminal Commands Inside the Container

You can pass commands from your host machine to the container using [`docker exec` (shorthand for `docker container exec`)](https://docs.docker.com/reference/cli/docker/container/exec) commands, but we think it's easier to just gain full access to the container's [Bash](https://gnu.org/software/bash) using this command:

```console
docker exec -it CONTAINER_NAME bash
```

Now the container's Bash will open and any command you run will execute within the context of the container until you close it with Ctrl+C. You will see that the Bash prompt will include a 🐳 emoji to clarify that you are working within the container.

Alternatively, you can also access the terminal inside the container with Docker Desktop by going to the "Containers" tab, selecting the container you want to access, and clicking on the "Terminal" tab.

## More Learning Resources

The following resources are beginner-level guides from the [Docker docs](https://docs.docker.com) that will teach you fundamental Docker concepts that will be useful when using LJAS's Docker environments.

- [Getting started: Get Docker Desktop](https://docs.docker.com/get-started/get-docker/)
- [The basics: What is a container?](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container)
- [The basics: What is an image?](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-an-image)
- [The basics: What is Docker Compose?](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-docker-compose)

## Connecting to Docker Databases Through a Terminal

After a database container is up and running, you can connect to it through a terminal with the following commands depending on your database type:

### MongoDB

```console
docker exec -it MONGO_CONTAINER_NAME mongo -u mongo
```

### PostgreSQL

```console
docker exec -it POSTGRES_CONTAINER_NAME -u postgres psql
```

## Hybrid Native/Docker Development Environment

It is possible to run parts of the project natively and other parts of it with Docker at the same time. We refer to this as a hybrid dev environment.

We go over how to setup a hybrid dev environment in the ["Connecting a Natively Running App with a Containerized Database" section in the "Database" document](./databases/README.md#connecting-a-natively-running-app-with-a-containerized-database) where we demonstrate how to connect a natively running app to a database running inside a container.

## Developing Inside a Container with Visual Studio Code

VS Code allows you to develop inside of containers, so we have preconfigured the Docker dev environment to work with this feature to make things more convenient for those who prefer this method of development.

Developing inside a container allows you to avoid [one potential drawback with using the Docker dev environment where you need to worry about two different `node_modules` directories](#caveats-concerning-linting-formatting-and-type-checking). An added benefit to this method is that it also sets up all of the recommended VS Code extensions for you and runs the development apps in debug mode so you can have all linting, formatting, type checking, debugging, and terminal features ready out-of-the-box.

Unfortunately this method does introduce a new drawback which happens when the container stops or crashes: the connected VS Code instance will also stop working and you'll be unable to save your work in progress. The code will still remain in limbo in your editor so it won't be lost, but it is still quite inconvenient.

Before you develop inside a container, you must have the Docker dev environment setup, so follow the instructions for getting started with it in the `README.md` for your project beforehand. Once that's ready, perform the following steps:

1. Open VS Code and install the [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension.

2. Next, run `docker compose up` to start the Docker dev environment.

3. After all of the containers are running, return to VS Code and [attach to the container](https://code.visualstudio.com/docs/devcontainers/attach-container#_attach-to-a-docker-container) running the app service. So for example, if working off of the [Express + PostgreSQL starter](../../starters/express-postgres), you would select the `ljas-express-postgres` container.

4. Once the attached VS Code instance is open, open `/code` folder in the explorer and run `cd /code` in the terminal.

If you would like to read more about this VS Code feature, read the ["Developing inside a Container" document in the VS Code docs](https://code.visualstudio.com/docs/devcontainers/containers).

## Performance Tips

If you're running into performance issues, first check that your virtual disk space still has reasonable remaining capacity. If it doesn't, read the solution for the ["I am running into issues with Docker and disk space. How do I deal with that?" question in the "Troubleshooting" section](#i-am-running-into-issues-with-docker-and-disk-space-how-do-i-deal-with-that).

Next, you may want to consider allocating more of your native hardware's resources to Docker besides disk space. You can configure how many CPUs and how much memory can be used by Docker in the "Resources" tab in the Docker Desktop settings.

Finally, you can consider using a hybrid dev environment which we talk about in the ["Hybrid Native/Docker Development Environment" section.](#hybrid-nativedocker-development-environment)

## Configuration

Read the [Docker configuration document](../configuration/docker.md) to learn how it is configured and how to customize it yourself.

## Troubleshooting

This section is for common solutions to some problems you may encounter when dealing with Docker environments.

### Problems

- [I am running into issues with Docker and disk space. How do I deal with that?](#i-am-running-into-issues-with-docker-and-disk-space-how-do-i-deal-with-that)
- [I am running into problems preventing me from running Docker environments on Windows.](#i-am-running-into-problems-preventing-me-from-running-docker-environments-on-windows)
- [Docker keeps reusing a stale image when I don't want it to. How do I force Docker to create a completely fresh one?](#docker-keeps-reusing-a-stale-image-when-i-dont-want-it-to-how-do-i-force-docker-to-create-a-completely-fresh-one)
- [Changes to my code are not being seen by nodemon or webpack when they are running in a container.](#changes-to-my-code-are-not-being-seen-by-nodemon-or-webpack-when-they-are-running-in-a-container)
- [Playwright does not work in the Docker dev environment.](#playwright-does-not-work-in-the-docker-dev-environment)

---

#### I am running into issues with Docker and disk space. How do I deal with that?

Docker's philosophy is to generally keep as many objects, e.g. images, containers, and volumes, as possible until they are explicitly deleted by the user. As a result, the more Docker is used, the more common it is for it to take up a lot of disk space.

So if Docker is taking up more disk space than you would like, the first thing you should do is delete all dangling objects using a prune command. [`docker image prune`](https://docs.docker.com/reference/cli/docker/image/prune) is probably the first command you should try, but if you still need to free up more disk space after running that, consider using [`docker volume prune`](https://docs.docker.com/reference/cli/docker/volume/prune), [`docker builder prune`](https://docs.docker.com/reference/cli/docker/builder/prune), or [`docker system prune`](https://docs.docker.com/reference/cli/docker/system/prune). You can read more about pruning by reading the ["Prune unused objects" document in the Docker docs](https://docs.docker.com/engine/manage-resources/pruning).

If you've performed all the pruning you can but still need more space, manually go through all your containers, images, and volumes and delete anything that you can confirm is unnecessary. After that, re-run prune commands and then if you still need more virtual disk space for Docker, you can allocate more by adjusting its limit in the "Resources" tab in the Docker Desktop settings.

---

#### I am running into problems preventing me from running Docker environments on Windows.

When trying to start containers on Windows, you may encounter an error like:

```
failed to solve: rpc error: code = Unknown desc = failed to solve with frontend dockerfile.v0: failed to create LLB definition: failed to authorize: rpc error: code = Unknown desc = failed to fetch anonymous token: unexpected status: 503 Service Unavailable
```

You are most likely running Linux containers which are intended for usage on Linux or macOS. When running Docker containers on Windows, it is expected that you use Windows containers.

To switch to them, right-click the Docker icon in the nofication area of the taskbar, and select "Switch to Windows containers..." To use the command line to switch between containers, run:

```
& $Env:ProgramFiles\Docker\Docker\DockerCli.exe -SwitchDaemon
```

---

#### Docker keeps reusing a stale image when I don't want it to. How do I force Docker to create a completely fresh one?

After creating an image the first time, sometimes you may encounter cases where Docker won't create a new image when you want it to. If this happens, you can force it to run the image build process using this command:

```console
docker compose up --build
```

If a new image still isn't built even after forcing the image build process to occur, then that means Docker is using the build cache during the entire process. You can force it to avoid using this cache by passing the [`--no-cache` option](https://docs.docker.com/reference/cli/docker/compose/build/#options) to [`docker compose build`](https://docs.docker.com/reference/cli/docker/compose/build) like so:

```console
docker compose build --no-cache
```

This will force Docker to build a completely new image which you can then produce containers from using `docker compose up` afterwards.

Note that if you run into this issue a lot, you should identify issues in your Docker configuration and make improvements so it can invalidate the build cache on its own. You should avoid manually running these commands regularly and should treat it as a last resort.

---

#### Changes to my code are not being seen by nodemon or webpack when they are running in a container.

Some machines run into issues with watching files in Docker containers.

To resolve this issue with nodemon, pass the `--legacy-watch` (or `-L`) flag whenever it is run. It is likely that you will need to update your `dev` `package.json` script with it. For more information on this, refer to the ["Application isn't restarting" in the nodemon README](https://github.com/remy/nodemon?tab=readme-ov-file#application-isnt-restarting).

To resolve this issue with webpack, set the `watchOptions.poll` option in a webpack configuration file. For more information on this, refer to the ["Watch and WatchOptions" page in the webpack docs](https://webpack.js.org/configuration/watch/#watchoptionspoll).

---

#### Playwright does not work in the Docker dev environment.

Playwright is not setup by default in the Docker dev environment because we want to encourage you to use the Docker end-to-end (E2E) test environment instead. The test environment runs in a production environment which will more accurately represent the experience your end-users will have, and the dev environment's image building process becomes much faster as it will skip setting up Playwright.

Still, some may want to run Playwright in the dev environment as iteration there is much faster when compared to iteration in the test environment, so you can get Playwright working in the dev environment by using the `INSTALL_PLAYWRIGHT_DEPS` build argument that, when set to `true`, will perform the Playwright dependency installation step during the image building process.

There are a couple of ways of setting up build arguments, but one way to do it is to run the following command:

```console
docker compose build --build-arg INSTALL_PLAYWRIGHT_DEPS=true
```

After the image is built, subsequent runs of `docker compose up` will skip the image building process and jump straight to building a new container that will have Playwright setup within it.

If you end up wanting to get rid of Playwright, you can rerun the build process without any build arguments like so:

```
docker compose build
```

This is basically the same thing as setting `INSTALL_PLAYWRIGHT_DEPS` to `false`, but it's unnecessary to explicitly do that since the `Dockerfile` will do it for you by default.
