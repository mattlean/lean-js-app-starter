# Babel Configuration

## Overview

Most projects only have one [Babel config file](https://babeljs.io/docs/config-files) found in the project's root directory as `babel.config.js`. Some projects that involve multiple build targets that require different Babel settings will have multiple config files with a different suffix depending on the build target. For example, the [React + Express + PostgreSQL with Server-Side Rendering starter](../starters/react-express-postgres-ssr) has a backend Babel config file called `babel.backend.js` and a frontend Babel config file called `babel.frontend.js`.

We currently use a JavaScript configuration file over a different option like `.babelrc` or `babel.config.json` as it allows us to alter the configuration dynamically during runtime based on different conditions like the environment being used.

## Learning Resources

The following resources are from the [Babel docs](https://babeljs.io/docs):

-   [What is Babel?](https://babeljs.io/docs)  
    Get a basic overview of what Babel does.
-   [Usage Guide](https://babeljs.io/docs/usage)  
    Learn the basics of configuring Babel by setting up a basic Babel configuration from scratch.
-   [Configure Babel: JavaScript configuration files](https://babeljs.io/docs/configuration#javascript-configuration-files)  
    Learn how to format JavaScript configuration files and how to write dynamic configuration.
