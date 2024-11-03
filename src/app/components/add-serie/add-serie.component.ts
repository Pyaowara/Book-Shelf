import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book-service/book.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-serie',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-serie.component.html',
  styleUrl: './add-serie.component.scss'
})
export class AddSerieComponent {
  constructor(private bookService: BookService){}
  serie_name_th:string = '';
  serie_name_en:string = '';
  serie_name_original:string = '';
  serie_status: string = '';
  serie_detail:string = '';
  message:string|undefined = '';

  async submit(event: Event){
    event.stopPropagation();
    const confirmation = confirm("Are you sure you want to add this serie?");
    if (confirmation){
    try{
      if(this.serie_status == '' || this.serie_name_th == '' || this.serie_name_en == '' || this.serie_name_original == ''){
        this.message = 'Please fill in complete information.';
        return;
      }
      let res =  await this.bookService.addSerie(this.serie_name_th, this.serie_name_en, this.serie_name_original, this.serie_status, this.serie_detail);
      this.message = await res?.message;
    }
    catch{
      this.message = "Upload failed. Please try again.";
    }
  }}
}
