import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export interface User {
  name: string;
}

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  readonly title: string = 'TEAMX';

  value: string;
  myControl: FormControl = new FormControl();
  options: User[] = [
    {name: 'Mary'},
    {name: 'Shelley'},
    {name: 'Igor'}
  ];
  filteredOptions: Observable<User[]>;
  addNewClass: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map((value) => typeof value === 'string' ? value : value.name),
        map((name) => name ? this._filter(name) : this.options.slice())
      );
  }

  onEnter(value: string): void {
    this.router.navigate(['course-list/'+ value]);
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();
    const matchingElements: User[]  = this.options.filter((option) => option.name.toLowerCase().indexOf(filterValue) === 0);
    this.addNewClass = !matchingElements.length;
    return matchingElements;
  }

  // sendTimeToServer(): void {
  //   const newTimeMessage: Message = {
  //     title: 'Hello from the client',
  //     body: 'Time is : ' + new Date().toString()
  //   };
  //   // Important de ne pas oublier "subscribe" ou l'appel ne sera jamais lancé puisque personne l'observe
  //   this.basicService.basicPost(newTimeMessage).subscribe();
  // }

  // getMessagesFromServer(): void {
  //   this.basicService.basicGet()
  //   // Cette étape transforme le Message en un seul string
  //   .pipe(map((message: Message) => {
  //     return `${message.title} ${message.body}`;
  //   })
  //   )
  //   .subscribe(this.message);
  // }

}
