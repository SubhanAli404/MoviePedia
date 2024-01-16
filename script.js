const API_KEY = "api_key=5c729f00ec3af1f862a3367867fafb41";
const BASE_URL = "https://api.themoviedb.org/3/";
const movies = document.querySelector(".movies");

const API_URL = BASE_URL + 'discover/movie?sort_by=popularity.desc&'+API_KEY;

const IMG_URL = "https://image.tmdb.org/t/p/w500";
const form = document.getElementById("form");
const prev = document.getElementById('prev');
const current = document.getElementById('current');
const next = document.getElementById('next');
let currentPage = 1;
let nextPage = 2;
let prevPage = 0;
let lastUrl = '';
let totalPages = 100;
const search = document.getElementById("search");
const searchURL = BASE_URL + "/search/movie?" + API_KEY;
const genres = [
  {
    "id": 28,
    "name": "Action"
  },
  {
    "id": 12,
    "name": "Adventure"
  },
  {
    "id": 16,
    "name": "Animation"
  },
  {
    "id": 35,
    "name": "Comedy"
  },
  {
    "id": 80,
    "name": "Crime"
  },
  {
    "id": 99,
    "name": "Documentary"
  },
  {
    "id": 18,
    "name": "Drama"
  },
  {
    "id": 10751,
    "name": "Family"
  },
  {
    "id": 14,
    "name": "Fantasy"
  },
  {
    "id": 36,
    "name": "History"
  },
  {
    "id": 27,
    "name": "Horror"
  },
  {
    "id": 10402,
    "name": "Music"
  },
  {
    "id": 9648,
    "name": "Mystery"
  },
  {
    "id": 10749,
    "name": "Romance"
  },
  {
    "id": 878,
    "name": "Science Fiction"
  },
  {
    "id": 10770,
    "name": "TV Movie"
  },
  {
    "id": 53,
    "name": "Thriller"
  },
  {
    "id": 10752,
    "name": "War"
  },
  {
    "id": 37,
    "name": "Western"
  }
]

const box = document.querySelector(".box");
const box1 = document.querySelector(".main");
const login = document.querySelector(".login");
const tagsEl = document.getElementById("tags");
const loginClick = document.querySelectorAll(".loginclick");
const mysignup = document.querySelector(".mysignup")
const mylogin = document.querySelector(".mylogin")
const checkMe = document.querySelector(".checkme")
if (checkMe) {
  mylogin.classList.remove('is-active');
  mysignup.classList.add('is-active');
}
else {
  mysignup.classList.remove('is-active');
  mylogin.classList.add('is-active');
}

console.log(loginClick);
loginClick.forEach(clickitem => {
  clickitem.addEventListener("click", () => {
    openNav1();
  })
})


function openNav1() {
  document.querySelector(".overlay1").style.height = "100%";
  const switchers = [...document.querySelectorAll('.switcher')]

  switchers.forEach(item => {
    item.addEventListener('click', function () {
      switchers.forEach(item => item.parentElement.classList.remove('is-active'))
      this.parentElement.classList.add('is-active')
    })
  })


}
function closeNav1() {
  document.querySelector(".overlay1").style.height = "0%";
  // document.querySelector('.overlay-content').remove();

}


if (box1 != null) {
  const btnShowModal = document.querySelectorAll('.show-modal');
  const btnCloseModal = document.querySelector('.close-modal');
  const modal = document.querySelector('.modal');
  const overlay = document.querySelector('.modal-content');
  // console.log(btnShowModal);

  /* Open when someone clicks on the span element */
  function openNav() {
    document.querySelector(".overlay").style.height = "100%";

  }

  /* Close when someone clicks on the "x" symbol inside the overlay */
  function closeNav() {
    document.querySelector(".overlay").style.height = "0%";
    document.querySelector('.overlay-content').remove();

  }


  let selectedGenre = [];
  setGenres();
  function setGenres() {
    tagsEl.innerHTML = '';
    genres.forEach(genre => {
      const t = document.createElement('div');
      t.classList.add('tag', 'px-4', 'py-2', 'bg-red-400', 'rounded-2xl', 'm-1', 'inline-block', 'cursor-pointer');
      t.id = genre.id;
      t.innerText = genre.name;
      t.addEventListener('click', () => {
        if (selectedGenre.length == 0) {
          selectedGenre.push(genre.id);

        }
        else {
          if (selectedGenre.includes(genre.id)) {
            selectedGenre.forEach((id, idx) => {
              if (id == genre.id) {
                selectedGenre.splice(idx, 1);
              }
            })
          } else {
            selectedGenre.push(genre.id)
          }
        }
        console.log(selectedGenre.length);
        if (selectedGenre.length == 0) {
          const clrbtn = document.getElementById('clr');
          if (clrbtn) {
            clrbtn.style.display = "none";
          }
        }

        getMovies(API_URL + '&with_genres=' + encodeURI(selectedGenre.join(',')))
        highlistgenre();
      });
      tagsEl.appendChild(t);
    })
  }
  function highlistgenre() {
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
      tag.classList.remove('highlight');
    })
    if (selectedGenre.length != 0) {
      clrbtn();
      document.getElementById('clr').style.display = "flex";
      selectedGenre.forEach(id => {
        const highlighter = document.getElementById(id);
        highlighter.classList.add('highlight');

      })
    }

  }
  function clrbtn() {

    let clrbutton = document.getElementById('clr')
    if (clrbutton) {
      clrbutton.classList.add('highlight');
    }
    else {
      let clr = document.createElement('div')
      clr.classList.add('tag', 'px-4', 'py-2', 'bg-red-400', 'rounded-2xl', 'm-1', 'inline-block', 'cursor-pointer', 'highlight');
      clr.id = 'clr'
      clr.innerText = 'Clear X'
      clr.addEventListener('click', () => {
        selectedGenre = [];
        document.querySelector(".pagination").style.display = "flex";
        setGenres();
        getMovies(API_URL);
      })
      tagsEl.append(clr);

    }
  }
  function showMovies(data) {
    box1.innerHTML = "";
    console.log(data[0]);
    data.forEach((movie) => {

      const {
        title,
        poster_path,
        vote_average,
        overview,
        id,
        genre_ids,
        vote_count,
      } = movie;

      const movieEl = document.createElement("div");
      movieEl.classList.add("movie");

      const getDetail =
        BASE_URL + "movie/" + id + "?" + API_KEY + "&language=en-US";

      movieEl.innerHTML = `
      <div class="movie-poster mx-2 mt-5 mb-1 border-2 border-slate-600 bg-slate-700  h-[420px] w-60 relative overflow-hidden cursor-pointer">
      
        <div class="movie-box w-60 ">
          <img class="w-full" src="${poster_path
          ? IMG_URL + poster_path
          : "http://via.placeholder.com/1080x1580"
        }" alt="${title}">
        </div>
        <div class="info flex p-2 justify-between mt-1">
          <h1 class="w-32 text-xs font-bold text-white relative bottom-1">${title}</h1>
          <span class="green text-xs  w-7 border-2 border-slate-800 rounded px-1 bg-slate-800 font-bold text-center h-5" style="color
          :${getColor(vote_average)}">${vote_average.toFixed(1)}</span>
        </div>
        <div class="overview absolute left-0 right-0 bottom-0 bg-white p-2 text-sm max-h-full translate-y-full ">
      <h3 class="font-bold text-base  ">Overview<h3>
       ${overview} 
       <br/>
       <button class="show-modal knowmore  border-0 rounded-full bg-red-400 font-bold text-white px-4 py-2 mt-3 ml-[-4px]" id="${id}">Know More</button>
       </div>
      
    </div>
        `;
      box1.appendChild(movieEl);
      document.getElementById(id).addEventListener('click', () => {
        openNav();
        if (!(document.querySelector('.overlay-content'))) {
          const overlay = document.querySelector('.overlay');
          overlay.innerHTML = `
          <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
          <div class="overlay-content flex flex-col justify-center items-center">
          `
        }
        const overlaycontent = document.querySelector('.overlay-content');


        fetch(BASE_URL + '/movie/' + id + '/videos?' + API_KEY).then(res => res.json()).then(videodata => {
          if (videodata) {

            if (videodata.results.length > 0) {
              var embed = [];
              console.log(videodata.results);
              videodata.results.forEach(video => {
                let { name, key, site, type } = video;
                if (site == 'YouTube' && type == 'Trailer') {
                  embed.push(`
                  <iframe class="mr-2 embed hide" width="560" height="315" src="https://www.youtube.com/embed/${key}" title="${name}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                  
                  `)
                  console.log("hi");
                }
              })
              console.log(overlaycontent);

              overlaycontent.innerHTML = `<h1 class="flex text-slate-400 m-5 font-bold text-xl">${title}<h1> ${embed.join('')}<div class="flex mt-2">
              <p class="flex flex-col  text-white w-[564px]"><span class="text-slate-400 font-bold flex ml-2 mb-2 text-xl">Overview</span>${overview}</p></div>
               
              <div class="watchprovider flex flex-col justify-center  text-white w-[565px] "> 

              </div>`
              fetch(BASE_URL + 'movie/' + id + '/watch/providers?' + API_KEY).then(res => res.json()).then(watchprovider => {
                const watch = document.querySelector('.watchprovider');
                console.log(watch);
                if (!watchprovider.results.IN) {
                  console.log(watchprovider.results);
                  watch.innerHTML = `
                  <div class="mt-11 flex justify-center"><img src="images/error.png" class="w-32" alt="error image">
                  <h2 class="text-2xl font-semibold text-slate-400 m-3 mt-7">No Watch Provider Yet ! <h2>
                  </div>`;
                }
                else {
                  const { buy, link, rent, flatrate } = watchprovider.results.IN;
                  console.log(watchprovider.results.IN);
                  console.log(id);
                  let buyName = []
                  let rentName = []
                  let flatrateName = []
                  if (buy) {
                    buy.forEach(provider => {
                      buyName.push(provider.provider_name);
                    })
                    watch.innerHTML += `<h1 class="flex m-2  "><span class="font-bold text-slate-400 text-xl ml-2 mb-4">Buy</span></br>${buyName}</h1>`
                  }

                  if (rent) {
                    rent.forEach(provider => {
                      rentName.push(provider.provider_name);
                    })
                    watch.innerHTML += `<h1 class="flex m-2 "><span class="font-bold text-slate-400 text-xl ml-2 mb-4">Rent</span></br>${rentName}</h1>`
                  }
                  if (flatrate) {
                    flatrate.forEach(provider => {
                      flatrateName.push(provider.provider_name);
                    })

                    watch.innerHTML += `<h1 class="flex m-2 "><span class="font-bold text-slate-400 text-xl ml-2 mb-4">Watch</span></br>${flatrateName}</h1>`
                  }
                }

              })


              activeSlide = 0;
              showVideos();
            }
            else {
              overlaycontent.innerHTML = `
              <h1 class="flex text-slate-400 m-5 font-bold text-xl">${title}<h1>
              <div class="mt-11 flex"><img src="images/error.png" class="w-32" alt="error image">
              <h2 class="text-2xl font-semibold text-slate-400 m-3 mt-7">No Trailer Found ! <h2>
              </div>`
            }
          }
        })

      })
    });
  }
}
getMovies(API_URL);

function getMovies(url) {
  lastUrl = url;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {


      if (data.results.length !== 0) {
        showMovies(data.results);
        currentPage = data.page;
        nextPage = currentPage + 1;
        prevPage = currentPage - 1;
        totalPages = data.total_pages;
        current.innerText = currentPage;

        if (currentPage <= 1) {
          prev.classList.add('disable')
          next.classList.remove('disable');
        }
        else if (currentPage >= totalPages) {

          prev.classList.remove('disable')
          next.classList.add('disable');

        }
        else {
          prev.classList.remove('disable')
          next.classList.remove('disable');
        }
        if (totalPages == 1) {
          prev.classList.add('disable')
          next.classList.add('disable');

        }

        document.getElementById('web').scrollIntoView({ behavior: 'smooth' })
      }
      else if (data.results.length === 0) {

        box1.innerHTML = `<div class="mt-11 flex"><img src="images/error.png" class="w-32" alt="error image">
        <h2 class="text-2xl font-semibold text-slate-400 m-3 mt-7">No Results Found ! <h2>
        </div>`
        document.querySelector(".pagination").style.display = "none";
      }
    });
}

form.addEventListener("submit", (e) => {
  tagsEl.style.display = "none";
  e.preventDefault();

  const searchTerm = search.value;

  selectedGenres = [];
  setGenres();

  if (searchTerm) {
    getMovies(searchURL + "&query=" + searchTerm);
  } else {
    getMovies(API_URL);
  }
});
next.addEventListener('click', () => {
  if (nextPage <= totalPages) {
    pageCall(nextPage)
  }
})
prev.addEventListener('click', () => {

  if (prevPage > 0) {
    pageCall(prevPage)
  }
})
function pageCall(page) {
  let urlSplit = lastUrl.split('?');
  let queryArgs = urlSplit[1].split('&');
  let key = queryArgs[queryArgs.length - 1].split('=');

  if (key[0] != 'page') {
    let url = lastUrl + '&page=' + page;
    getMovies(url);
  }
  else {

    key[1] = page.toString();
    let a = key.join('=');
    queryArgs[queryArgs.length - 1] = a;
    let b = queryArgs.join('&');
    let url = urlSplit[0] + '?' + b;
    getMovies(url);
  }
}
var activeSlide = 0;
function showVideos() {
  let embedClasses = document.querySelectorAll(".embed");
  embedClasses.forEach((embedTag, idx) => {
    if (activeSlide == idx) {
      embedTag.classList.add('show');
      embedTag.classList.remove('hide');

    }
    else {
      embedTag.classList.add('hide');
      embedTag.classList.remove('show');

    }

  })
}
function getColor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}
