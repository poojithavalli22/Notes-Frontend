import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-add-note-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './add-note-page.component.html',
  styleUrls: ['./add-note-page.component.css']
})
export class AddNotePageComponent {
  note = { title: '', content: '' };
  loading = false;
  generatedTitle = '';

  constructor(
    private noteService: NoteService,
    private router: Router
  ) {}

  async generateTitle() {
    if (!this.note.content) return;
    this.loading = true;
    try {
      const tempNote = await this.noteService.createNote({ title: this.note.title, content: this.note.content }).toPromise();
      if (tempNote?.id) {
        const summary = await this.noteService.summarizeNote(tempNote.id).toPromise();
        this.generatedTitle = summary || 'Untitled';
      }
    } catch (error) {
      console.error('Error generating title:', error);
    } finally {
      this.loading = false;
    }
  }

  saveNote() {
    if (!this.note.title || !this.note.content) return;
    this.loading = true;
    this.noteService.createNote(this.note).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.loading = false;
        console.error('Error saving note:', error);
      }
    });
  }

  close() {
    this.router.navigate(['/']);
  }
}
