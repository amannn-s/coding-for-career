First, run the development server:

```bash
npm run dev
&
npx prisma studio
```

Update prisma tables

```bash
npx prisma generate

npx prisma db push
npx prisma db push --force-reset

npx prisma studio
```
