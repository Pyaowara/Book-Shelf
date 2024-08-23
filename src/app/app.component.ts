import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { LoginComponent } from './components/login/login.component'
import { RegisterComponent } from './components/register/register.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { FormsModule } from '@angular/forms';
import { AllBooksComponent } from './components/all-books/all-books.component';
import { RelatedBooks } from './components/related-books/related-books.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet, BookListComponent, LoginComponent, RegisterComponent, BookDetailComponent, FormsModule, CommonModule, AllBooksComponent, RelatedBooks]
})
export class AppComponent{
  constructor(private router: Router) {}
  isLeftMenuIcon:boolean = false;
  searchQuery: string = '';

    goToBookList(): void {
      this.router.navigate(['booklist/:id']);
    }
    goToAllBooks(): void {
      this.router.navigate(['/all-books']);
    }
    searchBooks() {
      if (this.searchQuery.trim()) {
        this.router.navigate(['/searched-book'], { queryParams: { query: this.searchQuery } });
      }
    }
    shouldShowControls(): boolean {
      const currentRoute = this.router.url;
      return !currentRoute.includes('/login') && !currentRoute.includes('/register');
    }
    goToUserProfile(): void{
      this.router.navigate(['user-profile/flook']);
    } 
    leftMenuToggleButton(): void{
      const toggleButton = document.getElementById("leftMenuToggleButton") as HTMLButtonElement;
      const menu = document.getElementById("left-menu") as HTMLElement;
      const homeButton = document.getElementById("home-button") as HTMLButtonElement;
      const bookButton = document.getElementById("book-button") as HTMLButtonElement;
      const historyButton = document.getElementById("history-button") as HTMLButtonElement;
  
      menu.classList.toggle("expanded");
      homeButton.classList.toggle("expanded");
      bookButton.classList.toggle("expanded");
      historyButton.classList.toggle("expanded");
      
      if (isLeftMenuIcon) {
          homeButton.innerText = "Home";
          bookButton.innerText = "Books";
          historyButton.innerText = "History";
      } else {
          homeButton.innerText = "";
          bookButton.innerText = "";
          historyButton.innerText = "";
      }
      isLeftMenuIcon = !isLeftMenuIcon;
    }
}
