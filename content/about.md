---
title: About Us
description: The about page OK.
image: /assets/hero.png
link: /about/
activeAbout: true
---

# About This Starter

Here is another page managed entirely inside the markdown folder. You can add as many `.md` files here as you like!

## Images

Below is the default markdown image `![no caption](/your-image)`\
`marked` will not process as `figure` or `fig-caption`. You enable it with a `function` in the `markdown-plugin.js` but it will mean extra _bloat_ and extra work _parsing the code_ for the `plugin`.

![This is a hero image](/assets/hero.png "Hero thats what we want")

---

If you will only use the `caption` lightly, then just use `html`.

<figure class="my-8 text-center">
  <img src="/assets/hero.png" alt="Hero image" class="rounded-lg shadow-md mx-auto">
  <figcaption class="text-sm text-slate-500 mt-2">Hello from Figcaption</figcaption>
</figure>

---

Images used here are already `optimsed` and stored in the `public` folder.
