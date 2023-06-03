# Frequently Asked Questions

### Why are ECMAScript modules used by default for Node.js projects over CommonJS modules?

ECMAScript modules are used for the frontend projects, so to keep things consistent we've opted to use them for Node.js projects as well. One exception to this is for configuration related code where other types of modules are used by default.

### Why is JSX only allowed in files with .jsx extensions?
