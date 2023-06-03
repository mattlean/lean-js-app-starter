# Frequently Asked Questions

### How do I stop the development process?

If you're developing using the standard method, all you need to do is press Ctrl+C in the terminal window that's running the development process.

If you're using the Docker development environment, you can also use Ctrl+C if the terminal window is available. If it's running in the background, you can navigate to the project directory in a new terminal and run the command `docker compose down` instead.

### How do I bypass lint-staged's pre-commit hooks?

Simply pass in the `--no-verify` flag with your commit. So for example, in the terminal your command might look similar to:

```
git commit --no-verify
```

### Why are ECMAScript modules used for Node.js projects over CommonJS modules?

Because ECMAScript modules are used for the frontend projects, we've decided to maintain consistency and use them for the Node.js projects as well. One exception to this is for some configuration code where CommonJS modules are used by default.

### Why is JSX only allowed in files with .jsx extensions?

This is to remain consistent with the TypeScript projects where the language requires JSX to be in files with .tsx extensions.
