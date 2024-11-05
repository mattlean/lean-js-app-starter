# Docker Configuration

## Overview

All projects except for Electron-based ones will offer a Docker dev environment that is handled by files located in the project's root directory.

The development environment is configured through the `Dockerfile` which is used to assemble the image for the application container and the `docker-compose.yml` file which is used to configure Docker Compose. Docker Compose is always setup as long as a Docker environment is supported, even if the project only involves one container, as it simplifies terminal commands and makes them consistent across projects.

If the project involves a database, a `db.Dockerfile` will be used for assembling the image for the database container. When this file is present, Docker Compose will be configured so the database and app containers will be able to communicate with one another.

If the project is frontend-related, a Docker end-to-end (E2E) test environment will also be provided and be configurable through its own `e2e.Dockerfile` and `docker-compose.e2e.yml` file.

All Docker environments use a `.dockerignore` file which determines which files and directories will be ignored during the image build process.

## Learning Resources

The following resources are beginner-level guides from the [Docker docs](https://docs.docker.com) that will teach you how to configure Docker.

- [Building images: Understanding image layers](https://docs.docker.com/get-started/docker-concepts/building-images/understanding-image-layers)
- [Building images: Writing a Dockerfile](https://docs.docker.com/get-started/docker-concepts/building-images/writing-a-dockerfile)
- [Building images: Build, tag, and publish an image](https://docs.docker.com/get-started/docker-concepts/building-images/build-tag-and-publish-an-image)
- [Running containers: Publishing and exposing ports](https://docs.docker.com/get-started/docker-concepts/running-containers/publishing-ports)
- [Running containers: Overriding container defaults](https://docs.docker.com/get-started/docker-concepts/running-containers/overriding-container-defaults)
- [Running containers: Persisting container data](https://docs.docker.com/get-started/docker-concepts/running-containers/persisting-container-data)
- [Running containers: Sharing local files with containers](https://docs.docker.com/get-started/docker-concepts/running-containers/sharing-local-files)
- [Running containers: Multi-container applications](https://docs.docker.com/get-started/docker-concepts/running-containers/multi-container-applications)
- [Node.js language-specific guide](https://docs.docker.com/guides/nodejs)
