---
title: Home Page
description: The home page OK.
image: /assets/hero.png
link: /
activeHome: true
---

# Welcome Home

This page was generated automatically from a **Markdown** file.

This is another line and should have para space\
And yet another using the `page-brake-symbol`

---

- Fast build times
- Zero heavy frameworks
- Up-to-date Vite engine

---

As well as feeding the `meta data` (_see `meta` partial_), the `front-matter` above, _viewing from `index.md`_, feeds data to this `post gallery`.

## Latest Articles

<!-- Filter Buttons Bar -->
<div id="tag-filters" class="flex flex-wrap gap-2 my-6">
  <button data-tag="all" class="filter-btn bg-slate-900 text-white text-xs font-medium px-3 py-1.5 rounded-md transition cursor-pointer">
    All Posts
  </button>
  {{#each allTags}}
    <button data-tag="{{this}}" class="filter-btn bg-slate-100 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-md border border-slate-200 hover:bg-slate-200 transition cursor-pointer">
      {{this}}
    </button>
  {{/each}}
</div>

<div id="posts-grid" class="grid gap-6 mt-6">
  {{#each posts}}
    <article class="post-card p-6 bg-white rounded-xl shadow-sm border border-slate-200" data-tags="{{tagsString}}">
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
