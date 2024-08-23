# Dev Scripts

## `genDevData.ts`

This script will generate threads with random content generated using [Lorem ipsum](https://en.wikipedia.org/wiki/Lorem_ipsum) in the database.

You can run it with this [`package.json`](../package.json) script:

```
npm run gen-dev-data
```

In addition to populating the database, you can output the thread data as JSON using the `--outputJSON` option like so:

```
npm run gen-dev-data -- --outputJSON > output.json
```

_`MOCK_ALL_THREAD_DATA.json` was generated like this:_

```
npm run gen-dev-data -- --outputJSON > MOCK_ALL_THREAD_DATA.json
```

## `genMockThreadListRes.ts`

This script will generate a mock thread list response using thread JSON data. This is handy because the JSON data output by `genDevData.ts` is slightly different than what would be output by the thread list endpoint. This means that this script is useful for making sure that the format of mocked response data in tests accurately reflects what would be used in a real environment.

You can run it with this [`package.json`](../package.json) script:

```
npm run gen-mock-thread-list-res input.json
```

This will output the mock thread list as `output.json`. You can set this output file's name like so:

```
npm run gen-mock-thread-list-res input.json new-output-name.json
```

_`MOCK_THREAD_LIST_RES.json` was generated like this:_

```
npm run gen-mock-thread-list-res MOCK_ALL_THREAD_DATA.json MOCK_THREAD_LIST_RES.json
```
