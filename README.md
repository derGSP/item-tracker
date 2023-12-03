# Item Tracker

Minimal web utility for tracking consumption/usage/production of various things.

Customize to your needs by modifying [src/app/page.tsx](./src/app/page.tsx).

Project is configured to use [Supabase](https://supabase.com/) by default, copy the `.env.example` and set `DATABASE_URL` to your Supabase pooler URL.

There is no auth by default (yet), so if deploying to a public website, expect access by 3rd parties. DB calls are made server-side via TRPC however.

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
