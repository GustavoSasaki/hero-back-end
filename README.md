## Hero Creation
Have you ever wanted to craft a captivating hero but found yourself short on time?

[Hero Creation](https://hero-front-end.vercel.app/) is a web application powered by AI that allows you to quickly generate a new hero with a backstory and image using just a name and superpower as inputs.

Dive into the incredible creations of other users, such as Explosive Toad or Father Horse.

![Explosive Toad](https://dgufziqjubvbckrlwnjj.supabase.co/storage/v1/object/public/hero-back-end/61.png)
![Explosive Toad](https://dgufziqjubvbckrlwnjj.supabase.co/storage/v1/object/public/hero-back-end/85.png)

### Stack
- Angular
- Tailwind
- Next
- PostgreSQL
- OpenAi


## Project Purpose and Goal
Originally created to familiarize myself with Angular, I decided do the standard Tour of Heroes tutorial with some big additions. Instead of a simple CRUD application, I enriched the project by incorporating AI-based text and image generation, utilizing a real SQL database for information storage, hosting the website and images, and redesigning the UI.

Ultimately, the aim was to develop a elegant yet user-friendly web app.



## Web Stack and Explanation
The front-end was built using **Angular**, with **Tailwind** and CSS employed for efficient styling.

For the back-end, I opted for **Next.js** over Express due to my familiarity with Next's deployment process on Vercel. 

The project's SQL logic wasn't complex, leading me to exclusively use **Supabase** and its API for database management (It has a really generous free tier and a good library compatible with typescript). 

The image generation utilized the **OpenAI** library, offering a decent quantity of images/text without incurring additional costs.

## Problems Encountered and Thought Process
Having experience in developing and deploying web apps expedited most steps of the website creation. However, a notable concern was the time taken to generate hero images and backstories. To address this, I implemented:
- Loading bars and spinning wheels to signify ongoing processes to users
- Parallelization of text and image generation
- Imposed limits on maximum image definition and text size

## Lessons Learned and Future Work
This project provided an opportunity to learn Angular syntax and Tailwind.

**I will give special attention to slow I/O bound parts of application from now on**. As any delay beyond 5 seconds can diminish the user experience. While the current solution suffices, future iterations could explore loading the hero page without waiting for complete image/text generation. This maybe could be implemented with websockets for real-time updates as users scroll through the page. But I don't know, I will need to research more first.

## Links
- [Website](https://hero-front-end.vercel.app/)
- [Front-end Code](https://github.com/GustavoSasaki/hero-front-end)
- [Back-end Code](https://github.com/GustavoSasaki/hero-back-end)
