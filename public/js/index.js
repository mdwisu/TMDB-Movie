let currentPage = 1;
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const searchbar = document.getElementById('search');
currentPage == 1
  ? (prev.style.visibility = 'hidden')
  : (prev.style.visibility = '');
//! tombol prev diklik
prev.onclick = () => {
  currentPage--;
  // jika current page 0 maka ga boleh
  if (currentPage == 0) {
    currentPage = 1;
  }
  // jika current page 1 hidden prev
  currentPage == 1
    ? (prev.style.visibility = 'hidden')
    : (prev.style.visibility = '');
  // jika search bar ga ada valuenya
  search_term = searchbar.value.toLowerCase();
  if (search_term != '') {
    return false;
  }
  // get data
  fetch(
    discover +
      new URLSearchParams({
        api_key: api_key,
        sort_by: 'popularity.desc',
        page: currentPage,
      })
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      makeElement(data);
    });
};

//! tombol next di klik
next.onclick = () => {
  currentPage++;
  search_term = searchbar.value.toLowerCase();
  if (search_term != '') {
    return false;
  }
  currentPage > 1
    ? (prev.style.visibility = '')
    : (prev.style.visibility = 'hidden');

  fetch(
    discover +
      new URLSearchParams({
        api_key: api_key,
        sort_by: 'popularity.desc',
        page: currentPage,
      })
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      makeElement(data);
    });
};

// ambil data
fetch(
  discover +
    new URLSearchParams({
      api_key: api_key,
      sort_by: 'popularity.desc',
      page: currentPage,
    })
)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    makeElement(data);
  });

// masuk ke search filed
// saat search bar di ketik/keyup
searchbar.addEventListener('keyup', (event) => {
  search_term = event.target.value.toLowerCase();
  // menghendel jika search bar kosong
  if (search_term == '') {
    fetch(
      discover +
        new URLSearchParams({
          api_key: api_key,
          sort_by: 'popularity.desc',
          page: 1,
        })
    )
      .then((res) => res.json())
      .then((data) => {
        makeElement(data);
      });
  } else {
    fetch(
      search +
        new URLSearchParams({
          api_key: api_key,
          query: search_term,
          page: 1,
        })
    )
      .then((res) => res.json())
      .then((data) => {
        makeElement(data);
      });
  }
});

// membuat card film
const makeElement = (data) => {
  const main = document.querySelector('main');
  main.innerHTML = '';
  data.results.forEach((item, i) => {
    // apr 06, 2022
    let tgl = item.release_date.split('-');
    var month = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    let bulan = month.find((item, index) => index + 1 == tgl[1]);
    main.innerHTML += `
    <div class="card-movie">
    <div class="card-img"></div>
    <img src="${
      item.backdrop_path != null ? img_url + item.backdrop_path : 'default.png'
    }" alt="" />
    <div class="card-info">
    <p class="judul">${item.original_title}</p>
    
    <p class="tanggal">${`${bulan}  ${tgl[2]},  ${tgl[0]}`}</p>
    <p class="rating">${item.vote_average}</p>
    </div>
    </div>
    `;
  });
};
