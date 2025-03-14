# Composite Acoustic full-stack application.

This repository contains the code for the front-end and part of the back-end for the [Composite Acoustic](https://sound-wave.dev) web application.

It is a full-stack [React](https://react.dev) application using following packages;

- [Next.js](https://nextjs.org) for server components as it simplifies the integration of the client (browser) and server side code. It provides a method of passing JavaScript objects between the two. Reducing the amount of API code required. It also provides for the generation of pre-rendered HTML pages increasing responsiveness and providing content for SEO.
- [NextAuth.js](https://next-auth.js.org) for user authentication, using third-party identify provides and user data management. It implements [JWT](https://en.wikipedia.org/wiki/JSON_Web_Token) and session management. With SSL it provides the security for both the front and back end.
- [Redux](https://redux.js.org) which simplifies state management by providing a frame-work for state, context and actions. [Thunks](https://redux.js.org/usage/writing-logic-thunks) are implemented for the synchronization of client and server state. See the [/store](https://github.com/apcave/acoustic/tree/main/store) for the client code that is shared between components.
- [tailwindcss](https://tailwindcss.com) has been used to assist in the styling of the UI during development. As the styling and theme matured I have replaced the [tailwindcss](https://tailwindcss.com) classes with standard css. This results in cleaner more reusable code that is faster to write.
- [Framer Motion](https://framermotion.framer.website) improves the UX though animation of the UI. It extends the capabilities of css and provides for a finished look and feel.
- [Recharts](https://recharts.org/en-US/) provides the components used to plot the acoustic data.

The acoustic physics calculations are performed by a separate state-less server component in this [respository](https://github.com/apcave/acoustic-calcs). It implements a [RESTful](https://aws.amazon.com/what-is/restful-api/) API written in Fortran and python.

## Getting Started

To duplicate the [Composite Acoustic](https://sound-wave.dev) front-end you will need:

- Access to a [MongoDB](https://mongodb.com) database.
- A [Google Developer](https://developers.google.com) account for the [NextAuth.js](https://next-auth.js.org) authentication.
- If you want hosting I recommend [Vercel](http://vercel.com) as it simplifies the process for a [Next.js](https://nextjs.org) application.

### Environment Variables

```bash
MONGODB_URI="mongodb+srv://<username>:<password>@<collection>.<url>/acoustic?retryWrites=true&w=majority"
```

The web application uses a [MongoDB](https://mongodb.com) database for persistent storage. You will need a [connection string](https://www.mongodb.com/resources/products/fundamentals/mongodb-connection-string) to a database with administrator access. You can get a database and connection with the free account.

First, run the development server:

https://next-auth.js.org/providers/google

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
