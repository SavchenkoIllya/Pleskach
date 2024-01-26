### Summary:

Millions of doctors around the world spend hundreds hours and thousands dollars doing internal paper work every day. What if you can optimise this routine?

This project have been created as test case for learning in „field“ conditions. At the same time this project is actual commercial project that I’m developing right now.

It have several difficulties that I have to deal in the nearest future. As privacy and data security. On another hand because of my medical experience I know lot of things that I would like to implement in next iterations so my To-do list is always full.

### Stack:

**Next.js** – avoid me to write tones of boilerplate code. But it’s still good idea to split front-, backend and DB parts into different services to create more microservice-like architecture that would be easier to expand.

**PostgreSQL** – it’s provided by Vercel as a “easy to start” pare if use Vercel’s services. In my case I need to ship it as fast as I can and then after couple of tests I can decide which way should I use. Anyway if any kind of medical DB exists, I almost sure that it must be SQL DB so at least we are talking about same BD paradigm, that can be helpful during any kind of migrations.

**Tailwind CSS** – also easy and fast way to style your application, you don’t repeat yourself. Also for creating dashboard part that was awesome that I could use 3-rd part component libraries and adopt them to my cases. And it’s also compatible with my animation library.

**Framer Motion** – one of the best free libraries for animations in React, in my opinion. Easy to start and use. Very developer-friendly. Already had some experience so I knew well how to implement it.

**Typescript** – for me was very important to bring entities from server side on frontend and back as save as possible so I wasn’t even though about using typescript or pure JS in this case. Also Security, Utils, and I would call it advanced linter’s features.

### Parts of application:

Application tree:

- Landing (“/“) – some hero sections with semantic structure. Also form for applying health complaints in online format.
  - Articles (“/[articlelId]“) – posts that can be written in admin panel. Using right semantic structure it can help customer to attract more patients from searching engines.
- Login (“/auth”)
- Dashboard (“/dashboard”)
  - User (“../profiles”)
    - Edit user (“../[userId]/edit”)
  - Articles (“../articles”)
    - Create new (“../create”)
    - Edit(“../[articleId]/edit”)
  - Posts (“../posts/[paginationPageNum]”) – paginated view of all patients complains.

### Future plans:

I see future development of this project in creating scheduling system inside dashboard and strong secured system of patients administration. This tool must be assistant that can be as helpful as at least one extra employee from your office.
