$('.search-button').on('click', function () {
  
    $.ajax({
    url: 'http://www.omdbapi.com/?apikey=ee7a4fa8&s=' + $('.input-keyword').val(),
    success: results => {
        const movies = results.Search;
        let cards = '';
        for (let i = 0; i < movies.length; i++) {
            const m = movies[i];
           cards += showCards(m);
            
        }

        $('.movie-container').html(cards);

        $('.modal-details-button').on('click', function () {
            console.log($(this).data("imdbid"));
            $.ajax({
                url: 'http://www.omdbapi.com/?apikey=ee7a4fa8&i=' + $(this).data("imdbid"),
                success: m => {
                    console.log(m);
                    const movieDetails = showMovieDetails(m);
                    $('.modal-body').html(movieDetails);
                },
                error: e => {
                    console.log(e.responseText)
                }
            })
        })
    },
    error: e => {
        
    }
})  
})





function showCards(m) {
    return  `<div class="col md-4 my-3">
                        <div class="card" style="width: 18rem;">
                            <img src="${m.Poster}" class="card-img-top">
                            <div class="card-body">
                                <h5 class="card-title">${m.Title}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                                <a href="#" class="btn btn-warning modal-details-button" data-toggle="modal" data-target="#movieDetailModal" data-imdbid="${m.imdbID}">Details</a>
                            </div>
                        </div>
                    </div>`
};

function showMovieDetails(m) {
    return  `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                    <img src="${m.Poster}" class="img-fluid">
                    </div>

                    <div class="col-md">
                    <ul class="list-group">
                        <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
                        <li class="list-group-item"><strong>Actors : </strong> ${m.Actors}</li>
                        <li class="list-group-item"><strong>Genre : </strong> ${m.Genre}</li>
                        <li class="list-group-item"><strong>Director : </strong> ${m.Director}</li>
                        <li class="list-group-item"><strong>Writers : </strong>${m.Writer}</li>
                        <li class="list-group-item"><strong>Plot : </strong>${m.Plot}</li>
                    </ul>
                    </div>
                </div>
            </div>`;
}