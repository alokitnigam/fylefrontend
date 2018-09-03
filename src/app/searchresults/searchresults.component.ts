import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movies.service';

@Component({
    selector: 'search-results',
    templateUrl: './searchResults.component.html',
    styleUrls: ['./searchResults.component.css']
})
export class SearchresultsComponent {
    public movies = [];
    protected sub;
    protected movieSub;
    public errorMessage = '';
    public isLoading = false;
    constructor(private _movieService: MovieService, private route: ActivatedRoute) {
        this.isLoading = true;
        this.sub = this.route.params.subscribe(params => {
            this.movieSub = this._movieService.getMovies(params).subscribe(data => {

                console.log(data);
                if (data['Response'] === 'True') {
                    const searchItems = JSON.parse(window.localStorage.getItem('recentSearches'));
                    searchItems.unshift({
                        title: (params.title !== 'null') ? params.title : '',
                        year: (params.year !== 'null') ? params.year : ''
                    });
                    if(searchItems.length > 5) {
                        searchItems.splice(5);
                    }
                    window.localStorage.setItem("recentSearches", JSON.stringify(searchItems));
                    this.movies = data['Search'];
                    setTimeout(() => {this.isLoading = false;}, 2000);
                } else {
                    this.errorMessage = data['Error'];
                    this.isLoading = false;
                }
            })
        });
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
        this.movieSub.unsubscribe();
    }
}