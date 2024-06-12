This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), [Tailwindcss](https://tailwindcss.com/) and [React-Redux](https://react-redux.js.org/).

## Getting Started

First, ensure that you have [Nodejs](https://nodejs.org/en) > v20 installed and run this command to install dependencies

```bash
npm install
```

Then, start development server with

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

![Screen Shot](/public/screenshot.png)

## Notes

This setup uses Mock Api from [JSON Placeholder](https://jsonplaceholder.typicode.com/).
Since Jsonplaceholder does not save state on the server, the Create, Update and Delete actions done here are only affecting the local states, once refreshed, the data will be reset and fetches fresh data from Jsonplaceholder.
