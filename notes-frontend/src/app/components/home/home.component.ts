import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Note, NoteService, PageResponse } from '../../services/note.service';
import { ViewNoteDialogComponent } from '../view-note-dialog/view-note-dialog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatTableModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  notes: Note[] = [];
  loading = false;
  currentPage = 0;
  pageSize = 10;
  displayedColumns: string[] = ['serialNumber', 'title', 'actions'];

  constructor(
    private noteService: NoteService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadNotes();
  }

  loadNotes() {
    this.loading = true;
    this.noteService.getAllNotes(this.currentPage, this.pageSize).subscribe({
      next: (response: PageResponse<Note>) => {
        this.notes = response.content;
        this.loading = false;
      },
      error: (error: Error) => {
        console.error('Error loading notes:', error);
        this.loading = false;
      }
    });
  }

  openAddNote() {
    this.router.navigate(['/add-note']);
  }

  editNote(noteId: number | undefined) {
    if (noteId) {
      this.router.navigate(['/edit-note', noteId]);
    }
  }

  viewNote(note: Note) {
    this.dialog.open(ViewNoteDialogComponent, {
      width: '1250px',
      height: '1100px',
      data: note
    });
  }

  deleteNote(noteId: number | undefined, event: Event) {
    event.stopPropagation();
    if (!noteId) return;

    if (confirm('Are you sure you want to delete this note?')) {
      this.noteService.deleteNote(noteId).subscribe({
        next: () => {
          this.notes = this.notes.filter(note => note.id !== noteId);
        },
        error: (error: Error) => {
          console.error('Error deleting note:', error);
        }
      });
    }
  }
}
