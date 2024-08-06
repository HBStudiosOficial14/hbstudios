function App() {
    this.images = [];
    this.currentIndex = 0;
}

window.onload = function(event) {
    var app = new App();
    window.app = app;
}

App.prototype.processingButton = function(event) {
    const btn = event.currentTarget;
    const carouselList = event.currentTarget.parentNode;
    const track = carouselList.querySelector('#track');
    const carouselItems = track.querySelectorAll('.carousel-item');

    const carouselItemWidth = carouselItems[0].offsetWidth;
    const trackWidth = track.scrollWidth;
    const listWidth = carouselList.offsetWidth;

    let leftPosition = track.style.left === "" ? 0 : parseFloat(track.style.left.slice(0, -2)) * -1;

    if (btn.dataset.button === "button-prev") {
        prevAction(leftPosition, carouselItemWidth, track);
    } else {
        nextAction(leftPosition, trackWidth, listWidth, carouselItemWidth, track);
    }
}

App.prototype.openImageModal = function(index) {
    this.currentIndex = index;
    var modal = document.getElementById("image-modal");
    var modalImg = document.getElementById("image-modal-img");
    modal.style.display = "flex";
    modalImg.src = this.images[index];
}

App.prototype.closeImageModal = function() {
    var modal = document.getElementById("image-modal");
    modal.style.display = "none";
}

App.prototype.prevImage = function() {
    if (this.currentIndex > 0) {
        this.currentIndex--;
        this.updateModalImage();
    }
}

App.prototype.nextImage = function() {
    if (this.currentIndex < this.images.length - 1) {
        this.currentIndex++;
        this.updateModalImage();
    }
}

App.prototype.updateModalImage = function() {
    var modalImg = document.getElementById("image-modal-img");
    modalImg.src = this.images[this.currentIndex];
}

let prevAction = (leftPosition, carouselItemWidth, track) => {
    if (leftPosition > 0) {
        track.style.left = `${-1 * (leftPosition - carouselItemWidth)}px`;
    }
}

let nextAction = (leftPosition, trackWidth, listWidth, carouselItemWidth, track) => {
    if (leftPosition < (trackWidth - listWidth)) {
        track.style.left = `${-1 * (leftPosition + carouselItemWidth)}px`;
    }
}

function mostrarModal(titulo, imagenSrc, imagenesCarrusel, descripcion, categoria, linkDescargar) {
    document.getElementById('modal-title').textContent = titulo;
    document.getElementById('modal-img').src = imagenSrc;
    document.getElementById('modal-paragraph').textContent = descripcion;
    document.getElementById('modal-category').innerHTML = '<span>Categoría:</span> ' + categoria;
    document.getElementById('modal-studio').innerHTML = '<span>De</span> HBStudios';
    document.getElementById('modal-download').href = linkDescargar;

    var carouselTrack = document.getElementById('track');
    carouselTrack.innerHTML = ''; // Limpiar carrusel existente
    imagenesCarrusel.forEach((src, index) => {
        var item = document.createElement('div');
        item.className = 'carousel-item';
        item.innerHTML = `
            <a href="javascript:void(0)" onclick="app.openImageModal(${index})">
                <picture>
                    <img src="${src}" alt="imagen">
                </picture>
            </a>
        `;
        carouselTrack.appendChild(item);
    });

    app.images = imagenesCarrusel; 

    document.getElementById('modal').style.display = 'flex';
    document.getElementById('button-w').style.display = 'none';
}

function cerrarModal() {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('button-w').style.display = 'block'; 
}
