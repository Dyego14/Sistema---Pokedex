const nomes = [
"Bulbasaur","Ivysaur","Venusaur",
"Charmander","Charmeleon","Charizard",
"Squirtle","Wartortle","Blastoise",
"Caterpie","Metapod","Butterfree",
"Weedle","Kakuna","Beedrill",
"Pidgey","Pidgeotto","Pidgeot",
"Rattata","Raticate",
"Spearow","Fearow",
"Ekans","Arbok",
"Pikachu","Raichu",
"Sandshrew","Sandslash",
"Nidoran♀","Nidorina","Nidoqueen",
"Nidoran♂","Nidorino","Nidoking",
"Clefairy","Clefable",
"Vulpix","Ninetales",
"Jigglypuff","Wigglytuff",
"Zubat","Golbat",
"Oddish","Gloom","Vileplume",
"Paras","Parasect",
"Venonat","Venomoth",
"Diglett","Dugtrio",
"Meowth","Persian",
"Psyduck","Golduck",
"Mankey","Primeape",
"Growlithe","Arcanine",
"Poliwag","Poliwhirl","Poliwrath",
"Abra","Kadabra","Alakazam",
"Machop","Machoke","Machamp",
"Bellsprout","Weepinbell","Victreebel",
"Tentacool","Tentacruel",
"Geodude","Graveler","Golem",
"Ponyta","Rapidash",
"Slowpoke","Slowbro",
"Magnemite","Magneton",
"Farfetch'd",
"Doduo","Dodrio",
"Seel","Dewgong",
"Grimer","Muk",
"Shellder","Cloyster",
"Gastly","Haunter","Gengar",
"Onix",
"Drowzee","Hypno",
"Krabby","Kingler",
"Voltorb","Electrode",
"Exeggcute","Exeggutor",
"Cubone","Marowak",
"Hitmonlee","Hitmonchan",
"Lickitung",
"Koffing","Weezing",
"Rhyhorn","Rhydon",
"Chansey",
"Tangela",
"Kangaskhan",
"Horsea","Seadra",
"Goldeen","Seaking",
"Staryu","Starmie",
"Mr. Mime",
"Scyther",
"Jynx",
"Electabuzz",
"Magmar",
"Pinsir",
"Tauros",
"Magikarp","Gyarados",
"Lapras",
"Ditto",
"Eevee","Vaporeon","Jolteon","Flareon",
"Porygon",
"Omanyte","Omastar",
"Kabuto","Kabutops",
"Aerodactyl",
"Snorlax",
"Articuno","Zapdos","Moltres",
"Dratini","Dragonair","Dragonite",
"Mewtwo","Mew"
];

const tiposPT = {
    normal: "Normal",
    fire: "Fogo",
    water: "Água",
    electric: "Elétrico",
    grass: "Planta",
    ice: "Gelo",
    fighting: "Lutador",
    poison: "Venenoso",
    ground: "Terrestre",
    flying: "Voador",
    psychic: "Psíquico",
    bug: "Inseto",
    rock: "Pedra",
    ghost: "Fantasma",
    dragon: "Dragão",
    dark: "Sombrio",
    steel: "Aço",
    fairy: "Fada"
};

const pokedex = document.getElementById("pokedex");

for (let i = 0; i < nomes.length; i++) {

    let nome = nomes[i];
    let numero = (i + 1).toString().padStart(3, '0');

    let card = document.createElement("div");
    card.classList.add("pokemon");

    card.innerHTML = `
        <img src="imagens/${numero}.png" alt="${nome}">
        <h2>${nome}</h2>
        <p>#${numero}</p>
        <div class="info-extra">Carregando...</div>
    `;

    pokedex.appendChild(card);

    // 🔥 Ajuste nomes para API
    let nomeAPI = nome.toLowerCase();

    if (nomeAPI === "nidoran♀") nomeAPI = "nidoran-f";
    if (nomeAPI === "nidoran♂") nomeAPI = "nidoran-m";
    if (nomeAPI === "farfetch'd") nomeAPI = "farfetchd";
    if (nomeAPI === "mr. mime") nomeAPI = "mr-mime";

    // 🔥 Buscar dados
    fetch(`https://pokeapi.co/api/v2/pokemon/${nomeAPI}`)
        .then(res => res.json())
        .then(dados => {

            const tipos = dados.types
                .map(t => tiposPT[t.type.name])
                .join(", ");

            card.querySelector(".info-extra").innerHTML = `
                <p><strong>Tipo:</strong> ${tipos}</p>
                <p><strong>Altura:</strong> ${dados.height / 10} m</p>
                <p><strong>Peso:</strong> ${dados.weight / 10} kg</p>
            `;
        })
        .catch(() => {
            card.querySelector(".info-extra").innerHTML = `
                <p>Erro ao carregar</p>
            `;
        });
}

/* 🔎 BUSCA */
const search = document.getElementById("search");

search.addEventListener("input", function() {

    const valor = search.value.toLowerCase();
    const cards = document.querySelectorAll(".pokemon");

    cards.forEach(card => {

        const nome = card.querySelector("h2").textContent.toLowerCase();

        if (nome.includes(valor)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

});