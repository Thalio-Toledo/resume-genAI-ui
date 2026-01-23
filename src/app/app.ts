import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ResumeTemplateComponent } from './resume-template.component';

@Component({
  selector: 'app-root',
  imports: [ResumeTemplateComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('resume-genAI-ui');
}
