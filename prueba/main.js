const restaurantes = [
  {
    nombre: "La Tagliatella",
    ciudad: "León",
    imagen: "https://source.unsplash.com/featured/?restaurant,italian"
  },
  {
    nombre: "Sushi Yoko",
    ciudad: "Ponferrada",
    imagen: "https://source.unsplash.com/featured/?restaurant,japanese"
  },
  {
    nombre: "Verde Vida",
    ciudad: "León",
    imagen: "https://source.unsplash.com/featured/?restaurant,vegan"
  }
];

const container = document.getElementById("restaurant-list");

restaurantes.forEach(r => {
  container.innerHTML += `
    <div class="card">
      <img src="${r.imagen}" alt="${r.nombre}">
      <div class="card-content">
        <h3 class="card-title">${r.nombre}</h3>
        <p class="card-location">${r.ciudad}</p>
      </div>
    </div>`;
});
