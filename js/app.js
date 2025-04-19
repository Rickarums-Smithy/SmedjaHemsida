// js/app.js
document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.getElementById('gallery');
  const cat     = document.body.dataset.cat; // "silver" eller "jarn"
  if (!gallery || !window.PRODUCTS || !PRODUCTS[cat]) return;

  PRODUCTS[cat].forEach(async folder => {
    const infoUrl = `bilder/${cat}/${folder}/info.txt`;
    let title = folder;
    let price = '';

    try {
      const res = await fetch(infoUrl);
      if (res.ok) {
        const text = await res.text();
        [ title = title, price = '' ] = text.split('\n').map(s => s.trim());
      } else {
        console.warn(`info.txt inte hittad (${res.status}) för ${folder}`);
      }
    } catch (err) {
      console.warn(`Fel vid hämtning av ${infoUrl}:`, err);
    }

    // Gissa bildfil (du kan lägga till fler extension‑tester om du behöver)
    const imgUrl = `bilder/${cat}/${folder}/bild.png`;

    // Bygg upp DOM‑noden
    const item = document.createElement('div');
    item.className = 'item';
    item.innerHTML = `
      <img src="${imgUrl}" alt="${title}">
      <h3>${title}</h3>
      <p>${price}</p>
    `;
    gallery.appendChild(item);
  });
});
