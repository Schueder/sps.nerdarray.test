---
layout: layouts/page.njk
title: "Debug Episoden"
---

<h1>Alle gefundenen Episoden</h1>
<ul>
{% for episode in collections.episodes %}
  <li>{{ episode.filePathStem }} – {{ episode.data.title }}</li>
{% else %}
  <li>Keine Episoden gefunden!</li>
{% endfor %}
</ul>
