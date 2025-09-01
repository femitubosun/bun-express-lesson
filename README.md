# bun-express-prisma

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.2.21. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.


## Setting up the database

- Install prisma `bun add -D prisma`
- Initialize prisma `bunx prisma init`
- Update `.env` file with
```shell
DATABASE_URL="file:./dev.db"
```
- Update the `prisma/schema.prisma` file to use SQLite:

```typescript
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model User {
  id    Int     @id @default(autoincrement())
  name  String
  email String  @unique
}
```
- Run migrations `bunx primsa migrate dev`
- Create a `db.ts` file in root.
```typescript
import { PrismaClient } from "./generated/prisma";

export const prisma = new PrismaClient();
````
