import { Injectable } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class IconService {
  iconList = [
    { name: 'dashboard', fileName: 'dashboard_icon.svg' },
    { name: 'speaker', fileName: 'speaker_icon.svg' },
    { name: 'youtube', fileName: 'youtube_icon.svg' },
    { name: 'document', fileName: 'document_icon.svg' },
    { name: 'supplier', fileName: 'supplier_icon.svg' },
    { name: 'square', fileName: 'square_icon.svg' },
    { name: 'document_text', fileName: 'document_text_icon.svg' },
    { name: 'exclude', fileName: 'exclude_icon.svg' },
    { name: 'setting', fileName: 'settings_icon.svg' },
    { name: 'task_square', fileName: 'task_square_icon.svg' },
    { name: 'speaker_gray', fileName: 'speaker_gray_icon.svg' },
    { name: 'youtube_gray', fileName: 'youtube_gray_icon.svg' },
    { name: 'transmitter', fileName: 'transmitter_icon.svg' },
    { name: 'warning', fileName: 'warning.svg' },
  ]
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {}
  init() {
    this.iconList.forEach(i => {
      this.matIconRegistry.addSvgIcon(
        i.name,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/icon/${i.fileName}`)
      );
    });
  }
}
