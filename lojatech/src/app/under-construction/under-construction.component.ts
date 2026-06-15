import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-under-construction',
  templateUrl: './under-construction.component.html',
  styleUrls: ['./under-construction.component.css']
})
export class UnderConstructionComponent {
  @Input() pageName: string = 'Página';
  @Input() estimatedCompletion: string = 'em breve';
  @Input() icon: string = 'fa-solid fa-hard-hat';
  @Input() message: string = 'Estamos trabalhando para trazer novidades incríveis para você!';
  
  currentDate = new Date();
}