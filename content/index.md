---
title: Home Page
description: The home page OK.
image: /assets/hero.png
link: /
---

# Welcome Home

This page was generated automatically from a **Markdown** file.

This is another line and should have para space\
And yet another using the `page-brake-symbol`

___

- Fast build times
- Zero heavy frameworks
- Up-to-date Vite engine

___

As well as feeding the `meta data` (*see `meta` partial*), the `front-matter` above feeds data to this `post gallery`.

## Latest Articles

<div class="grid gap-6 mt-6">
  {{#each posts}}
    <article class="p-6 bg-white rounded-xl shadow-sm border border-slate-200">
      <h2 class="text-xl font-bold mb-1">
        <a href="{{slug}}" class="text-sky-600 hover:text-sky-800">{{title}}</a>
      </h2>
      {{#if formattedDate}}
        <time class="text-xs font-medium text-slate-400 block mb-3">{{formattedDate}}</time>
      {{/if}}
      {{#if description}}
        <p class="text-slate-600">{{description}}</p>
      {{/if}}
      <div class="flex flex-wrap gap-2 mt-3">
  {{#each tags}}
    <span class="bg-slate-100 text-slate-700 text-xs font-medium px-2.5 py-1 rounded-md border border-slate-200">
      {{this}}
    </span>
  {{/each}}
</div>
    </article>
  {{/each}}
</div>
