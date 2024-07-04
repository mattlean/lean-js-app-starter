# Why Lean JS App Starter?

In the past decade, starter projects have seen a historic rise within the JavaScript ecosystem, especially in frontend web development. If you're new to frontend work, starter projects are basically essential. Manually setting up a development environment can be extremely time-consuming and complex. By using a pre-configured, ready-to-go project, you can skip all of the setup work and start writing application code right away.

Right now there are already a couple great starter projects to work with that truly deliver on their promise to get you to your application code as quickly as possible—[Vite](https://vitejs.dev) being the most notable one currently. However, there are still a few things to consider when choosing the right starter project for you.

## Support for Non-Browser Targets

While the frontend web development ecosystem is very comfortable with bundlers, they haven't seen the same level of acceptance elsewhere in the JavaScript ecosystem where many just setup nodemon and call it a day.

LJAS brings the developer experience provided by "frontend"-style starters like Vite or Create React App to Node.js and Electron. This means non-frontend JavaScript developers can leverage all the benefits frontend developers have already been benefiting from like bundling, code splitting, aliasing, tree shaking, minification, Babel plugins, webpack loaders and plugins, etc.

Some might argue that adding a bundler like webpack is unnecessary for something like backend code since we don't need to worry shipping a large build to end-users. However, there are still many cases where bundling is valuable, even for backends.

-   Support for Node.js and Electron
-   More consistency for developers working across projects with different targets
-   Node.js development can leverage advantages with using a bundler like aliases
-   Node.js projects can build for production which can help with reducing bundle size which can be critical for some deployments like ones for lambdas
-   With the growth in popularity of TypeScript, now even backend developers will have some kind of compilation step as they code

## Transparency

One potential problem is that most project starters obfuscate the underlying configurations, making it difficult to understand how everything works. While that means it's great in keeping it simple for the people that will never need to make customizations, it also means it can cause difficultly for those that need complete control due needing functionality that's not available out-of-the-box.

Lean JS App Starter (LJAS) instead takes a more "classic" approach to starter projects where nothing is obfuscated. There is no need to do anything like eject just so you can tinker under-the-hood, and the configuration isn't doing anything clever or special. Most of it is similar to what you'd write if you were following each build tool's documentation, so if you understand the basics of each tool like webpack, Babel, ESLint, or Docker, you will be able to easily understand how LJAS is setup.

## Prevalence of webpack

Believe it or not, the time where setting up your development environment from scratch or using create-react-app was actually not too long ago (even though it may feel like an eternity already). So while Vite has gained a significant portion of the build tool space, there are still a ton of active codebases that are running their own custom webpack configurations or relying on create-react-app which is webpack based today.

You may have inherited a codebase that falls into this generation and need direction on how to make updates to those configurations, in which case LJAS can be useful as a reference to see how how you can tailor your non-LJAS but still webpack-based configuration to your needs.

-   reference state of JS 2023 where webpack is still in the lead
-

## Docker Development Environment
