import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, forkJoin, map} from 'rxjs';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-all-books',
  standalone: true,
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.css'],
  imports: [NgIf, NgFor, AsyncPipe, RouterModule]
})
export class AllBooksComponent implements OnInit {
  allBooks$: Observable<any[]> = new Observable();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('https://books-shelves.vercel.app/books').pipe(
      catchError(error => {
        console.error('Error fetching books:', error);
        return of([]);
      })
    ).subscribe(books => {
      const bookObservables = books.map(book => this.convertBlobToBase64(book));
      this.allBooks$ = forkJoin(bookObservables);
    });
  }

  convertBlobToBase64(book: any): Observable<any> {
    if (book.book_image) {
      return this.http.get(`https://books-shelves.vercel.app/books/${book.book_id}/image`, { responseType: 'blob' }).pipe(
        catchError(error => {
          console.error(`Error fetching image for book ${book.book_id}:`, error);
          return of(book);
        }),
        map(blob => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          return new Observable<string>(observer => {
            reader.onloadend = () => {
              book.book_image = reader.result;  // Base64 string
              observer.next(book);
              observer.complete();
            };
          });
        })
      );
    }
    return of(book);
  }

  getStars(score: number): string {
    return '⭐'.repeat(score);
  }
}
