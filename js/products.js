---
# Gör så att filen hamnar i /js/products.js på din site
permalink: /js/products.js
---
window.PRODUCTS = {
  silver: [
    {% for f in site.static_files
         | where_exp:"f","f.name == 'info.txt' and f.path contains 'bilder/silver/'" %}
      "{{ f.path | split: '/' | slice: 2,1 | first }}"{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ],
  jarn: [
    {% for f in site.static_files
         | where_exp:"f","f.name == 'info.txt' and f.path contains 'bilder/jarn/'" %}
      "{{ f.path | split: '/' | slice: 2,1 | first }}"{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ]
};
