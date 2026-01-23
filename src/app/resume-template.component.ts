import { ChangeDetectionStrategy, Component, input, Signal, signal } from '@angular/core';

@Component({
  selector: 'resume-template',
  templateUrl: './resume-template.component.html',
  styleUrls: ['./resume-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResumeTemplateComponent {
  // Signals for each section of the resume
  name = signal('');
  title = signal('');
  summary = signal('');
  experience = signal<Array<{ company: string; role: string; period: string; description: string }>>([]);
  education = signal<Array<{ institution: string; degree: string; period: string }>>([]);
  projects = signal<Array<{name: string; company: string;description: string;}>>([
  {
    name: 'Societário Digital',
    company: 'Confirp',
    description: 'Sistema de gestão de certidões empresariais.'
  },
  {
    name: 'Workflow',
    company: 'Confirp',
    description: 'Sistema de gerenciamento de tarefas e controle de fluxos.'
  },
  {
    name: 'Storm ORM',
    company: 'Pessoal',
    description: 'Sistema de mapeamento objeto-relacional e consultas SQL.'
  }
]); 
  skills = signal<string[]>([]);
  socialMedia = signal<Array<{name: string; url: string}>>([{name: 'LinkedIn', url: 'https://www.linkedin.com/in/thalio-toledo-a7825023b/'}]);
  languagens = signal<Array<{name: string; level: string}>>([{name: 'Português', level: 'Nativo'}, {name: 'Inglês', level: 'Avançado'}]);

  constructor() {
        this.setProfile(
            'Bruce Wayne',
            'Senior Full Stack Developer',
            'Focused on .NET, Angular and clean architecture, building scalable and high-performance applications.',
            [
                {
                company: 'Wayne Enterprises',
                role: 'Lead Software Engineer',
                period: '2021 - Present',
                description: 'Leading the development of enterprise web applications using Angular and .NET, mentoring developers and defining architecture standards.'
                },
                {
                company: 'Gotham Tech',
                role: 'Full Stack Developer',
                period: '2018 - 2021',
                description: 'Worked on frontend with Angular and backend services with ASP.NET Core, focusing on performance and clean code.'
                }
            ],
            [
                {
                institution: 'Gotham University',
                degree: 'Bachelor in Computer Science',
                period: '2014 - 2018'
                }
            ],
            [
                'Angular',
                '.NET',
                'C#',
                'TypeScript',
                'SQL Server',
                'Azure'
            ]
        );

    }

  setProfile(   
    name:  string,
    title: string,
    summary: string,
    experience: Array<{ company: string; role: string; period: string; description: string }>,
    education: Array<{ institution: string; degree: string; period: string }>,
    skills: string[]
    ){
        this.name.set(name);
        this.title.set(title);
        this.summary.set(summary);

        this.experience.set(experience);
        this.education.set(education);
        this.skills.set(skills);
    }
}
