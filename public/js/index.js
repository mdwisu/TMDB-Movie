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
    console.log(data);
    makeElement(data);
  });

const searchbar = document.getElementById('search');

searchbar.addEventListener('keyup', (event) => {
  search_term = event.target.value.toLowerCase();
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

const makeElement = (data) => {
  const main = document.querySelector('main');
  console.log(data);
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
