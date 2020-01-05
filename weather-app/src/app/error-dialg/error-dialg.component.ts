import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialg',
  templateUrl: './error-dialg.component.html',
  styleUrls: ['./error-dialg.component.scss']
})
export class ErrorDialg implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ErrorDialg>,
    @Inject(MAT_DIALOG_DATA) public data: string) {}

  onOKClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }
}
