import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-code-explanator',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule
  ],
  templateUrl: './code-explanator.component.html',
  styleUrls: ['./code-explanator.component.css']
})
export class CodeExplanatorComponent {
  inputText: string = '';
  explanation: string = '';
  loading: boolean = false;
  selectedLanguage: string = '';

  languages = [
    { value: 'english', viewValue: 'English' },
    { value: 'telugu', viewValue: 'Telugu' },
    { value: 'hindi', viewValue: 'Hindi' }
  ];

  constructor(
    private router: Router,
    private noteService: NoteService
  ) {}

  explainCode() {

     if (!this.inputText || !this.selectedLanguage) return;
     this.loading = true;
     console.log('language:', this.selectedLanguage);
     this.noteService.explainCode(this.inputText, this.selectedLanguage).subscribe({
       next: (response) => {
         this.explanation = response;
         this.loading = false;
       },
       error: (error) => {
         console.error('Error explaining code:', error);
         this.explanation = 'Error occurred while explaining the code. Please try again.';
         this.loading = false;
       }
     });
   }

  close() {
    this.router.navigate(['/']);
  }
}
