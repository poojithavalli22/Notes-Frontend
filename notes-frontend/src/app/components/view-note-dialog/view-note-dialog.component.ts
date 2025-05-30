import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Note, NoteService } from '../../services/note.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';

@Component({
 selector: 'app-view-note-dialog',
 standalone: true,
 imports: [
   CommonModule,
   MatDialogModule,
   MatFormFieldModule,
   MatInputModule,
   MatButtonModule,
   MatProgressSpinnerModule,
   FormsModule
 ],
 templateUrl: './view-note-dialog.component.html',
 styleUrls: ['./view-note-dialog.component.css']
})
export class ViewNoteDialogComponent {
 summary: string = '';
 loading = false;

 constructor(
   public dialogRef: MatDialogRef<ViewNoteDialogComponent>,
   @Inject(MAT_DIALOG_DATA) public data: Note,
   private noteService: NoteService
 ) {}

 async summarizeNote() {
   if (!this.data.content || this.loading) return;

   this.loading = true;
   try {
     const summary = await this.noteService.summarizeNote(Number(this.data.id)).toPromise();
     if (summary) {
       this.summary = summary;
     }
   } catch (error) {
     console.error('Error generating summary:', error);
   } finally {
     this.loading = false;
   }
 }

 close() {
   this.dialogRef.close();
 }
}
