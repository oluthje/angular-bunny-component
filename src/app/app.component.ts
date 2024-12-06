import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MyComponentWrapperComponent } from './ReactComponentWrapper';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MyComponentWrapperComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'my-angular-app';
}
