# Composite Acoustic web app

This repository contains the code for the [Composite Acoustic](https://sound-wave.dev) web application hosted in the link.

It is a full-stack [React](https://react.dev) application using following packages;

- [Next.js](https://nextjs.org) for server components as it simplifies the integration of the client (browser) and server side code. It provides a method of passing JavaScript objects between the two. Reducing the amount of API code required. It also provides for the generation of pre-rendered HTML pages increasing responsiveness and providing content for SEO.
- [NextAuth.js](https://next-auth.js.org) for user authentication, using third-party identify provides and user data management. It implements [JWT](https://en.wikipedia.org/wiki/JSON_Web_Token) and session management. With SSL it provides the security for both the front and back end.
- [Redux](https://redux.js.org) which simplifies state management by providing a frame-work for state, context and actions. [Thunks](https://redux.js.org/usage/writing-logic-thunks) are implemented for the synchronization of client and server state. See the [/store](https://github.com/apcave/acoustic/tree/main/store) for the client code that is shared between components.
- [tailwindcss](https://tailwindcss.com) has been used to assist in the styling of the UI during development. As the styling and theme matured I have replaced the [tailwindcss](https://tailwindcss.com) classes with standard css. This results in cleaner more reusable code that is faster to write.
- [Framer Motion](https://framermotion.framer.website) improves the UX though animation of the UI. It extends the capabilities of css and provides for a finished look and feel.
- [Recharts](https://recharts.org/en-US/) provides the components used to plot the acoustic data.

The acoustic physics calculations are performed by a separate state-less server component in this [respository](https://github.com/apcave/acoustic-calcs). It implements a [RESTful](https://aws.amazon.com/what-is/restful-api/) API written in Fortran and python.

## Cloud Configuration

This repository is hosted on [Vercel](http://vercel.com) it provides dynamic hosting and pre-rendering of pages. The client accesses the calculations API and the NoSQL database via the [Vercel](http://vercel.com) server. Server functions are restricted using passwords and session management in the [Next.js](https://nextjs.org) code.

[MongoDB](https://mongodb.com) hosts the NoSQL database and the calculations API is hosted on AWS as a EC2 although there are plans to implement this API as a AWS Lamdba. The [Next.js](https://nextjs.org) application access these services through static passwords and connection strings that are stored in environment variables.

CI/CD deployment including TTD checks are setup with [Vercel](http://vercel.com) where my project builds and deploys on main branch pushes at [https://sound-wave.dev](https://sound-wave.dev). Server secrets are managed by [Vercel](http://vercel.com).

For further details on the calculations API see it's repository [here](https://github.com/apcave/acoustic-calcs).

## State Management

The server has state that is defined as pre-rendered pages and persistent storage in a NoSQL database. This state needs to be synchronized with the client state as the users make edits.

The client code makes use of polling the server for updated data, optimistic updating and the server actions trigger re-rendering of pre-rendered pages when the user finalizes edits.

[Redux](https://redux.js.org) manages state through the use of context property drilling is avoided. This makes for flexible and easy to maintain code. Reducers are used to provide functions to change state that self document. The use of Reducers and Selectors give confidence that components will be updated when effected by Reducers no matter where in the code they are invoked. Thunks simplify the job of syncronizing server and client state by extending the functionality of the Reducers. The client state management code is in the [/store](https://github.com/apcave/acoustic/tree/main/store) directory.

## Search Engine Optimization

The site is not a single page web application and is not hosted statically. This means that the web page contents and urls can be editing programmatically by the server. The most important example of this is the [https://sound-wave.dev/sitemap.xml](https://sound-wave.dev/sitemap.xml) which is used by search engines to crawl the site. It is not a file but a REST API defined in this code [here](https://github.com/apcave/acoustic/tree/main/app/sitemap.xml).

The pages.tsx files in the /app and child directories are all pre-rendered by the server. Each of these pages include meta-data and have an entry in the site map. The [materials](https://github.com/apcave/acoustic/blob/main/app/acoustic/materials/page.tsx) page has a meta-data description that includes the names of all the materials that is updated whenever a user add or edits a material. The [models](https://github.com/apcave/acoustic/blob/main/app/acoustic/models/page.tsx) page is similar and updates when a user edits or updates a model. Each [model](app/acoustic/models/[modelid]/page.tsx) gets a url and entry in the site map when saved this page has the name and description in the meta-data. The other pages are not as complex and have static content and meta-data.

## Project Directory Structure

### Next.js specific project file structure.

| **URL**                    | **FILE**                                | Description                                             |
| -------------------------- | --------------------------------------- | ------------------------------------------------------- |
| /public                    | /public                                 | Directory of all static publicly served files           |
| /                          | /app                                    | The project root from which TSX is served               |
|                            | /app/layout.tsx                         | A wrapper from a page.tsx files                         |
| /                          | /app/page.tsx                           | The application home page                               |
| /acoustic/materials        | /app/acoustic/materials/page.tsx        | A list of all materials                                 |
| /acoustic/models           | /app/acoustic/models/page.tsx           | A list of all models                                    |
| /acoustic/models/[modelid] | /app/acoustic/models/[modelid]/page.tsx | The model details specific to "modelid"                 |
| /login                     | /login/page.tsx                         | Provides for user login                                 |
| /register                  | /register/page.txt                      | Provides for user registration                          |
| /api/auth/[...nextauth]    | /app/api/auth/[...nextauth]/route.ts    | API for user management from client side                |
| /api/materials             | /app/api/materials/route.ts             | API to output a list of all material properties in JSON |
| /sitemap.xml               | /app/sitemap.xml/route.ts               | API to output a site map in XML                         |

### Project Directory Structure

| **Directory**          | **Description**                                            |
| ---------------------- | ---------------------------------------------------------- |
| /components            | Holds the code for the React components                    |
| /components/documents  | React components for text pages                            |
| /components/multilayer | React components specific to the acoustic modelling        |
| /lib                   | Miscellaneous code                                         |
| /models                | NoSQL model definitions                                    |
| /server-action         | Code to be executed on the server                          |
| /store                 | Client state specific code, Redux Slices, Reducers, Thunks |

## Getting Started

To duplicate the [Composite Acoustic](https://sound-wave.dev) front-end you will need:

- Access to a [MongoDB](https://mongodb.com) database.
- A [Google Developer](https://developers.google.com) account for the [NextAuth.js](https://next-auth.js.org) authentication.
- If you want hosting I recommend [Vercel](http://vercel.com) as it simplifies the process for a [Next.js](https://nextjs.org) application. Hosting is free with the trial account.

### Environment Variables

Environment variables can be set using at .env file at the project root for development or configured using server secrets.

#### Authentication Hash

```bash
AUTH_SECRET=
```

To generate a secure authentication secret, you can use the following.

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the result into the environment variable or .env file.

#### Google Authentication Provider

```bash
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

Follow the instruction from NextAuth.js [here](https://next-auth.js.org/providers/google). You will need a google developer account

#### MongoDB variable

```bash
MONGODB_URI="mongodb+srv://<username>:<password>@<collection>.<url>/acoustic?retryWrites=true&w=majority"
```

The web application uses a [MongoDB](https://mongodb.com) database for persistent storage. You will need a [connection string](https://www.mongodb.com/resources/products/fundamentals/mongodb-connection-string) to a database with administrator access. You can get a database and connection with the free account.

## Running on a Development Server

Once the environmental variables are correct set simply run.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running on a Production Server

1. Make your own GitHub repository of this code.

2. Get an account with [Vercel](http://vercel.com) follow the instructions to setup with a GitHub account. The Vercel project will attach to a GitHub repository and the project has options for setting server secrets.

3. Push to CI/CD deploy.

## To Do

- Models page pre-rendering takes time, do an optimistic update.
- Clicking on the models in the list results in a delayed response the first time. Ensure all model pages are pre-renders when the server starts.
- When you click on run-model there no feed-back, provide a message and a spinner.
- Provide for editing of material properties after adding them to the a model. Click in the Layers section on the name to edit.
- Add edit materials button next to run simulation to add more materials to an existing model.
- More edit name and description to where it is displayed on the edit model page.

- Add more animations work on UX.
- Animate loading model also add spinner.
- Work on calculations code.
- Once data is available work on graphs and results section.
- Once data is available add feature to down-load it through the browser.
