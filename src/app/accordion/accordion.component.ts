import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AngularSvgIconModule } from 'angular-svg-icon';

const FAQS = [
  {
    question: 'What is Frontend Mentor, and how it will help me?',
    answer:
      "Frontend Mentor offers realistic coding challenges to help developers improve their frontend coding skills with projects in HTML, CSS, and JavaScript, it's suitable for all levels and ideal for portfolio building.",
  },
  {
    question: 'Is Frontend Mentor free?',
    answer:
      " The majority of our challenges are free, yes. We do have some that are premium and require a Pro subscription to access. It will say on each challenge whether they are free or premium, so it's easy to tell the difference.",
  },
  {
    question: 'Can I use Frontend Mentor projects in my portofolio?',
    answer:
      'Definitely! Please do feel free to use whatever you build in your portfolio. Helping developers add professional-looking projects to their portfolio was one of the reasons we created this platform!',
  },
  {
    question: "How can I get help if I'm stuck on a challenge?",
    answer:
      'The best (and quickest) way to get help on a challenge is in our Discord server. There are thousands of other developers in there, so it\'s a great place to ask questions. We even have a dedicated "help" channel!',
  },
];

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    AngularSvgIconModule,
  ],
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent {
  public faqs = FAQS.map((faq) => ({ ...faq, displayed: false }));
  public showFirst = true;

  public showFaq(index: number): void {
    this.faqs[index].displayed = !this.faqs[index].displayed;
  }
}
