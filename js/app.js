// js/app.js

document.addEventListener('DOMContentLoaded', () => {
    // Index-sidan: skapar kategori‑kort om #categories finns
    const categoriesContainer = document.getElementById('categories');
    if (categoriesContainer) {
      const categories = ['silver', 'jarn'];
      categories.forEach(cat => {
        const a = document.createElement('a');
        a.href      = `${cat}.html`;
        a.className = 'card';
        a.innerHTML = `<h2>${cat.charAt(0).toUpperCase() + cat.slice(1)}</h2>`;
        categoriesContainer.appendChild(a);
      });
    }
  
    // Gallerisidorna: bygg ut produkter om #gallery finns
    const gallery = document.getElementById('gallery');
    if (gallery) {
      // Jekyll-genererad lista på mappar, finns som en JS‑variabel i HTML:
      //    const products = [...];
      products.forEach(folder => {
        // Hämta och tolka info.txt
        fetch(`bilder/${document.body.dataset.cat}/${folder}/info.txt`)
          .then(res => res.text())
          .then(text => {
            const [title='', price=''] = text.trim().split('\n');
            const item = document.createElement('div');
            item.className = 'item';
  
            const img = document.createElement('img');
            img.src = `bilder/${document.body.dataset.cat}/${folder}/bild.jpg`;
            img.alt = title;
            item.appendChild(img);
  
            const h3 = document.createElement('h3');
            h3.textContent = title || folder;
            item.appendChild(h3);
  
            const p = document.createElement('p');
            p.textContent = price;
            item.appendChild(p);
  
            gallery.appendChild(item);
          })
          .catch(() => console.warn(`Ingen info.txt för ${folder}`));
      });
    }
  });
  