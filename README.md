# AI Icon Generator

A web app that makes app and website icons with AI. You describe the icon, pick a color, style (flat, clay, pixel art and more) and shape, and the app generates it and saves it to your collection.

## Features

- **Sign in with Google** (NextAuth)
- **Credits:** each new account gets 1 free icon, and you can buy more through **Stripe** checkout, with a webhook that adds the credits after payment
- **AI image generation** with OpenAI's image API
- **Image storage** on Cloudinary, plus a **PostgreSQL** database (Prisma) for users, icons and payments
- Deployed on **Vercel**

## Status

Unfinished hobby project from 2023. The site is still up at [ai-icon-generator.vercel.app](https://ai-icon-generator.vercel.app), but generating icons there is broken: after creating an image, the app sends it to `localhost` for upload, and that address only works on the computer it was built on, not on the server.

## Built with

Next.js, TypeScript, tRPC, Prisma, PostgreSQL, NextAuth, Stripe, OpenAI, Cloudinary, Tailwind CSS, Docker (local database).
