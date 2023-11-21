

#### Screenshots

![image](https://github.com/ank-2222/Discord-clone/assets/76547947/5c1b6abc-9f5c-46f7-b720-21df0c14dbc1)

![image](https://github.com/ank-2222/Discord-clone/assets/76547947/dd06d812-bf50-47d0-8bd0-fd67d9741694)

![image](https://github.com/ank-2222/Discord-clone/assets/76547947/b4445e3f-3da0-4cbd-a28e-9863cbfb4581)

![image](https://github.com/ank-2222/Discord-clone/assets/76547947/d3332186-2d71-4e85-8d4b-feda98b05fe4)



### Prerequisites

**Node version 18.x.x**

### Cloning the repository

```shell
git clone https://github.com/AntonioErdeljac/next13-discord-clone.git
```

### Install packages

```shell
npm i
```

### Setup .env file


```js
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=


DATABASE_URL=

UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

LIVEKIT_API_KEY=
LIVEKIT_API_SECRET=
NEXT_PUBLIC_LIVEKIT_URL=
```

### Setup Prisma

Add MySQL Database (I used PlanetScale)

```shell
npx prisma generate
npx prisma db push

```

### Start the app

```shell
npm run dev
```

