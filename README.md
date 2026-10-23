# AI Icon Generator

A web app that makes app and website icons with AI. You describe the icon, pick a color, style (flat, clay, pixel art and more) and shape, and the app generates it and saves it to your collection.

## Features

- **Sign in with Google** (NextAuth)
- **Credits:** each new account gets 1 free icon, and you can buy more through **Stripe** checkout, with a webhook that adds the credits after payment
- **AI image generation** with OpenAI's image API
- **Image storage** on Cloudinary, plus a **PostgreSQL** database (Prisma) for users, icons and payments

## Status

Unfinished hobby project from 2023, and no longer online. One known bug: after creating an image, the app uploads it through `localhost`, which only works when it runs on your own computer, not on a server.

## Built with

Next.js, TypeScript, tRPC, Prisma, PostgreSQL, NextAuth, Stripe, OpenAI, Cloudinary, Tailwind CSS, Docker (local database).
