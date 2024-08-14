const { artists, songs } = window;
document.addEventListener("DOMContentLoaded", function () {
  var menu = document.querySelector("#menu");
  var selectedArtist = document.querySelector("#selected-artist");
  var product = document.querySelector(".cardContainer");

  artists.forEach((artist) => {
    var button = document.createElement("button");
    button.innerText = artist.name;

    button.addEventListener("click", () => display(artist));
    menu.appendChild(button);
  });

  function display(artist) {
    selectedArtist.innerHTML = ""; 
    selectedArtist.innerText = artist.name;

    const urlDiv = document.createElement("div");

    artist.urls.forEach((url, index) => {
      var social = document.createElement("a");
      social.href = url.url;
      social.innerText = url.name;
      social.target = "_blank";
      social.style.color = "white";
      urlDiv.appendChild(social);
  
      if (index < artist.urls.length - 1) {
        const separator = document.createTextNode(" --- "); 
        urlDiv.appendChild(separator);
      }
    });

    selectedArtist.appendChild(urlDiv);

    product.innerHTML = "";

    songs.forEach((song) => {
      if (song.artistId === artist.artistId) {
        const card = createSongCard(song);
        product.appendChild(card);
      }
    });
  }

  function createSongCard(song) {
   
    const card = document.createElement("div");
   
    card.classList.add("card");

    
    const songLink = document.createElement("a");
    songLink.href = song.url;
    songLink.target = "_blank";
    const songImg = document.createElement("img");
    songImg.src = song.imageUrl;
    songImg.classList.add("card-image");
    songLink.appendChild(songImg);
    card.appendChild(songLink);

    const title = document.createElement("h3");
    title.innerText = song.title;
    card.appendChild(title);

    const time = document.createElement("time");
    time.datetime = song.year;
    time.innerText = song.year;
    card.appendChild(time);

    const duration = document.createElement("span");
    duration.innerText = formatDuration(song.duration);
    card.appendChild(duration);

    return card;
  }

  function formatDuration(seconds) {
    var min = Math.floor(seconds / 60);
    var sec = min % 60;
    return `${min}:${sec.toString().padStart("2", "0")}`;
  }

  if (artists.length > 0) {
    display(artists[0]);
  }
});
