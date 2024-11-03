import { Component } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../../services/book-service/book.service';

@Component({
  selector: 'app-add-author',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-author.component.html',
  styleUrl: './add-author.component.scss'
})
export class AddAuthorComponent {
  constructor(private bookService: BookService){}

  base64Image: string | null = null;
  author_name:string = '';
  author_description:string = '';
  message:string = '';

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent: any) => {
        const dataUrl = loadEvent.target.result;
        this.base64Image = dataUrl;
      };
      reader.readAsDataURL(file);
    } else {
      console.error('Invalid file type. Please upload an image file.');
    }
  }



  async submit(event: Event){
    if(this.author_name == ''){
      this.message =  await 'Please fill in all information.';
      return;
    }
    event.stopPropagation();
    const confirmation = confirm("Are you sure you want to update this book?");
    if (confirmation){
    let res = await this.bookService.addAuthor(this.author_name, this.base64Image!, this.author_description);
    this.message = await res.message;
    }
  }
}
