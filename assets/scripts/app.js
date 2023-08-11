const addMovieModal = document.getElementById('add-modal');
const startAddMovieBtn = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieBtn = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieBtn = cancelAddMovieBtn.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal');

const movies = [];

const toggleBackdrop = () => {
    backdrop.classList.toggle('visible');
};

const updateUI = () => {
    if (movies.length === 0) {
        entryTextSection.style.display = 'block';
    } else {
        entryTextSection.style.display = 'none';
    }
};

const cancelMovieDeletion = () => {
    toggleBackdrop();
    deleteMovieModal.classList.remove('visible');
};

const deleteMovieHandler = (movieId) => {
    let movieIndex = 0;
    for (const movie of movies) {
        if (movie.id === movieId) {
            break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex, 1);
    const listRoot = document.getElementById('movie-list');
    listRoot.children[movieIndex].remove();
    cancelMovieDeletion();
    updateUI();
};

const startDeleteMovieHandler = (movieId) => {
    deleteMovieModal.classList.add('visible');
    toggleBackdrop();

    const cancelDeletionBtn = deleteMovieModal.querySelector('.btn--passive');
    let confirmDeletionBtn = deleteMovieModal.querySelector('.btn--danger');

    confirmDeletionBtn.replaceWith(confirmDeletionBtn.cloneNode(true));
    confirmDeletionBtn = deleteMovieModal.querySelector('.btn--danger');

    cancelDeletionBtn.removeEventListener('click', cancelMovieDeletion);

    cancelDeletionBtn.addEventListener('click', cancelMovieDeletion);
    confirmDeletionBtn.addEventListener(
        'click',
        deleteMovieHandler.bind(null, movieId)
    );
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML = `
        <div class="movie-element__image">
            <img src="${imageUrl}" alt="${title}">
        </div>
        <div class="movie-element__info">
        <h2>${title}</h2>
        <p>${rating}/5 YILDIZ!</p>
        </div>
    `;
    newMovieElement.addEventListener(
        'click',
        startDeleteMovieHandler.bind(null, id)
    );
    const listRoot = document.getElementById('movie-list');
    listRoot.append(newMovieElement);
    3;
};

const closeMovieModal = () => {
    addMovieModal.classList.remove('visible');
};

const showMovieModal = () => {
    addMovieModal.classList.toggle('visible');
    toggleBackdrop();
};

const clearMovieInputs = () => {
    for (const usrInput of userInputs) {
        usrInput.value = '';
    }
};

const cancelAddMovieHandler = () => {
    closeMovieModal();
    toggleBackdrop();
    clearMovieInputs();
};

const addMovieHandler = () => {
    const titleValue = userInputs[0].value;
    const imageUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;

    if (
        titleValue.trim() === '' ||
        imageUrlValue.trim() === '' ||
        ratingValue.trim() === '' ||
        +ratingValue < 1 ||
        +ratingValue > 5
    ) {
        alert(
            'Lütfen kutucukların hepsini doldurunuz (Rating 1 ve 5 aralığında olmalıdır).'
        );
        return;
    }

    const newMovie = {
        id: Math.random().toString(),
        title: titleValue,
        image: imageUrlValue,
        rating: ratingValue,
    };

    movies.push(newMovie);
    console.log(movies);
    closeMovieModal();
    toggleBackdrop();
    clearMovieInputs();
    renderNewMovieElement(
        newMovie.id,
        newMovie.title,
        newMovie.image,
        newMovie.rating
    );
    updateUI();
};

const backdropClickHandler = () => {
    closeMovieModal();
    cancelMovieDeletion();
    clearMovieInputs();
};

startAddMovieBtn.addEventListener('click', showMovieModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieBtn.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieBtn.addEventListener('click', addMovieHandler);
