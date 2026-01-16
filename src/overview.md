---
layout: layouts/page.njk
title: Folgen
permalink: /episodes/
---

<ul class="episodes">
{% for episode in collections.episodes | reverse %}
  <li>
    <h2>
      <a href="{{ episode.url  | url }}">
        {{ episode.data.title }}
      </a>
    </h2>

    <p>
      <strong>Veröffentlicht:</strong>
      {{ episode.data.date | date("dd.MM.yyyy") }}
    </p>

    {% if episode.data.description %}
    <p>{{ episode.data.description }}</p>
    {% endif %}
  </li>
{% else %}
  <li><em>Noch keine Folgen vorhanden.</em></li>
{% endfor %}
</ul>
