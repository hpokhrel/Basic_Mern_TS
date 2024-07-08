# Prerequisites

    Node.js (version ^20.x.x)
    npm
    MongoDB (Cloud Setup)
    Vs Code Editor

# Installation and Guide to Start Project

Step 1: npm install
Step 2: Create a `.env` file inside the root folder of the server and enter your own values:

        ```
        PORT=`YourPortNumber`
        MONGODB_URL=`mongodb+srv://dB1:<yourPassword>@<yourAppName>.wxsnpxt.mongodb.net/?retryWrites=true&w=majority&appName=<yourAppName>`
        JWT_SECRET=`AnySecretThatWontBeKnownToAnyone`
        ```

        Replace `<yourPassword>` and `<yourAppName>` with your actual MongoDB credentials.

Step 3: In the terminal, navigate to the server folder (`<rootDir>/server/`) and run `npm run dev:ts`.

Step 4: In a new terminal, navigate to the client folder (`<rootDir>/client/`) and run `npm run dev`.

# The main Changes in JS and TS are:

- For the server, you'll need to run npm run dev:ts instead of npm run dev. This assumes you have a script defined in your package.json file that runs the server with TypeScript support, such as:

```bash
{
  "scripts": {
    "dev:ts": "npx tsc && node dist/index.js"
  }
}

```

# Other Info:

- The command remains the same (npm run dev), assuming your client-side code is already set up for TypeScript.

```bash
step 1 : In next new terminal go to client folder (`<rootDir>/client/`) and run `npm test`;
step 2 : In next new terminal go to server folder (`<rootDir>/server/`) and run `npm run test:ts`;

{
  "scripts": {
    "test:ts": "npx tsc && jest --watch"
  }
}

```

# Points to Remember:

- When Testing, there are static_email/Static_password or other static variables. Check them and replace them on every test to avoid errors during testing.
