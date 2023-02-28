const addMovie = document.getElementById('add-movie');
const movieCards = document.getElementById('movie-cards');
const serieCards = document.getElementById('serie-cards');

// Recuperar os filmes e séries registrados do localStorage
let moviesAndSeries = JSON.parse(localStorage.getItem('moviesAndSeries')) || [];

function saveMovies() {
	localStorage.setItem('moviesAndSeries', JSON.stringify(moviesAndSeries));
}
function createCard(movie) {
	const div = document.createElement('div');
	div.classList.add('card');
	const link = document.createElement('a');
	link.href = movie.trailer;
	link.target = '_blank';
	const coverElement = document.createElement('img');
	coverElement.src = movie.cover;
	coverElement.classList.add('cover-element');
	link.appendChild(coverElement);
	const movieName = document.createElement('article');
	movieName.innerText = movie.nome;
	const watchedButton = document.createElement('button');
	watchedButton.innerText = 'Assistido';
	watchedButton.classList.add('watched-btn');

	// Adiciona a classe clicked se o botão assistido foi clicado anteriormente
	if (movie.watched) {
		watchedButton.classList.add('clicked');
	}

	watchedButton.addEventListener('click', function () {
		watchedButton.classList.toggle('clicked');
		movie.watched = watchedButton.classList.contains('clicked'); // atualiza o valor de "watched"
		saveMovies(); // salvar o estado atual dos filmes no localStorage
	});
	div.append(link, movieName, watchedButton);
	if (movie.type === 'movie') {
		movieCards.append(div);
	} else if (movie.type === 'serie') {
		serieCards.append(div);
	}
}

// Exibir os filmes e séries registrados na tela
moviesAndSeries.forEach((movie) => {
	createCard(movie);
});

function Register() {
	const nameElement = document.getElementById('name').value;
	const type = document.querySelector('select[name=type]').value;
	const urlCover = document.getElementById('cover').value;
	const urlTrailer = document.getElementById('trailer').value;

	// Criar um objeto para o filme ou série registrado
	const movie = {
		nome: nameElement,
		type,
		cover: urlCover,
		trailer: urlTrailer,
		watched: false,
	};

	// Adicionar o objeto à matriz de filmes e séries
	moviesAndSeries.push(movie);

	// Criar um elemento de cartão para o novo filme ou série registrado
	createCard(movie);

	// Salvar a matriz atualizada no localStorage
	localStorage.setItem('moviesAndSeries', JSON.stringify(moviesAndSeries));

	reset();
}

function reset() {
	document.getElementById('name').value = '';
	document.getElementById('cover').value = '';
	document.getElementById('trailer').value = '';
}

addMovie.addEventListener('click', Register);
