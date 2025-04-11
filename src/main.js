import './style.css'

const API_KEY = 'live_BpmdIkOFGDwKN9gd42m67HqJOfSU3MyffAbhDD26YAZEUwLkTEiESd9GGLNGzsUQ';

document.querySelector('#app').innerHTML = `
    <header>
        <h1>Cat Breeds</h1>
    </header>
    <div>
        <section id="list">
            <h2>Breeds</h2>
            <ul id="list_ul"></ul>
        </section>
        <section id="item" class="hidden">
            <div>
                <h3 id="name"></h3>
                <h4>Description:</h4>
                <p id="description"></p>
                <h4>Origin:</h4>
                <p id="origin"></p>
                <img src="" alt="" decoding="async" id="image" loading="lazy">
            <div/>
            <div>
                <button id="close">Close</button>
            </div>
        </section>
    </div>
`


document.querySelector('#close')?.addEventListener('click', () => {
    document.querySelector('#list').classList.remove('hidden');
    document.querySelector('#item').classList.add('hidden');
    document.querySelector('#image').src = "";
});

fetch('https://api.thecatapi.com/v1/breeds', {headers: {'x-api-key': API_KEY}})
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item.name;
            li.addEventListener('click', () => {
                showItem(item.id);
            });
            document.querySelector('#list_ul')?.appendChild(li);
        });
    });

function showItem(id) {
    fetch(`https://api.thecatapi.com/v1/breeds/${id}`, {headers: {'x-api-key': API_KEY}})
        .then(response => response.json())
        .then(data => {
            document.querySelector('#name').textContent = data.name;
            document.querySelector('#description').textContent = data.description;
            document.querySelector('#origin').textContent = data.origin;
            setRandomImage(id);
            document.querySelector('#list').classList.add('hidden');
            document.querySelector('#item').classList.remove('hidden');
        });
}

function setRandomImage(id) {
    fetch(`https://api.thecatapi.com/v1/images/search?limit=1&order=RAND&breed_id=${id}`, {headers: {'x-api-key': API_KEY}})
        .then(response => response.json())
        .then(data => {
            document.querySelector('#image').src = data[0].url;
        });
}