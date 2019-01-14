# Node.js: Examples
**Before running these examples, you must first go through the steps in the ["Getting Started" documentation](getting_started.md).**

## *chan API: Anonymous Text Board API
The backend REST API for an anonymous text board called *chan (pronounced star-chan). Available by default with the `nodejs` release. Optionally connects with the *chan frontend app which is a [browser example](../../browser/examples.md).

Follow these steps:
1. Open a terminal and run [`mongod`](https://docs.mongodb.com/manual/reference/program/mongod).
2. After `mongod` is running, open another terminal and run the backend API with the `start:dev:watch` [`package.json`](../../../package.json) script. The API should now be running at [localhost:9001](http://localhost:9001).
3. Now you can interface with the API. We recommend using [Postman](https://getpostman.com) to do this. Details on how to import a collection and environment for this can be found in the ["Postman" documentation](../../../tools/postman.md).

### Endpoints
All requests bodies must have a `Content-Type` of `application/json`.

1. **`GET /thread`**  
   List all threads.

   **Example**
   * Request: `GET /thread`
   * Response:  
     ```json
     [
       {
         "_id": "5c39e3049e2a432a992d49fe",
         "subject": "Hot off the press!",
         "comment": "I'm the most recent thread!!!",
         "createdAt": "2019-01-12T12:52:20.898Z",
         "replies": [],
         "type": "Thread"
       },
       {
         "_id": "5c39e2d99e2a432a992d49fd",
         "subject": "Foobar",
         "comment": "What is foobar? Sounds like it could be a breakfast bar.",
         "createdAt": "2019-01-12T12:51:37.492Z",
         "replies": [
           {
             "createdAt": "2019-01-12T12:57:00.155Z",
             "_id": "5c39e41c9e2a432a992d49ff",
             "comment": "The etymology of foo is obscure. Its use in connection with bar is generally traced to the World War II military slang FUBAR, later bowdlerised to foobar. The word foo on its own was used earlier. Between about 1930 and 1952 it appeared in the comic Smokey Stover by Bill Holman, who stated that he used the word due to having seen it on the bottom of a jade Chinese figurine in Chinatown, San Francisco, purportedly signifying \"good luck\". This may be related to the Chinese word fu (sometimes transliterated foo), which can mean happiness or blessing.",
             "type": "Reply"
           }
         ],
         "type": "Thread"
       },
       {
         "_id": "5c39e26e9e2a432a992d49fc",
         "comment": "Oldest thread with no subject.",
         "createdAt": "2019-01-12T12:49:50.669Z",
         "replies": [],
         "type": "Thread"
       }
     ]
     ```
2. **`GET /thread/:id`**  
   Read a thread. `:id` must be a valid ID for existing thread.

   **Example**
   * Request: `GET /thread/5c39e26e9e2a432a992d49fc`
   * Response:  
     ```json
     {
       "_id": "5c39e26e9e2a432a992d49fc",
       "comment": "Oldest thread with no subject.",
       "createdAt": "2019-01-12T12:49:50.669Z",
       "replies": [],
       "type": "Thread"
     }
     ```
3. **`POST /thread`**  
   Create a thread. Request body requires a `comment` property.

   **Example**
   * Request: `POST /thread`  
     ```json
     {
       "subject": "Hello world!",
       "comment": "I'm the thread comment."
     }
     ```
   * Response  
     ```json
     {
       "_id": "5c39dff29e2a432a992d49fa",
       "subject": "Hello world!",
       "comment": "I'm the thread comment.",
       "createdAt": "2019-01-12T12:39:14.483Z",
       "replies": [],
       "type": "Thread"
     }
     ```
4. **`POST /thread/:id/reply`**  
   Create a reply. `:id` must be a valid ID for existing thread. Request body requires a `comment` property.

   **Example**
   * Request: `POST /thread/5c39dff29e2a432a992d49fa/reply`  
     ```json
     {
       "comment": "I'm the reply comment."
     }
     ```
   * Response  
     ```json
     {
       "_id": "5c39dff29e2a432a992d49fa",
       "subject": "Hello world!",
       "comment": "I'm the thread comment.",
       "createdAt": "2019-01-12T12:39:14.483Z",
       "replies": [
         {
           "_id": "5c39e0cc9e2a432a992d49fb",
           "comment": "I'm the reply comment.",
           "createdAt": "2019-01-12T12:42:52.516Z",
           "type": "Reply"
         }
       ],
       "type": "Thread"
     }
     ```

* Download: [Releases prefixed with `nodejs`](https://github.com/IsaacLean/lean-js-app-starter/releases)
* Branch: https://github.com/IsaacLean/lean-js-app-starter/tree/nodejs