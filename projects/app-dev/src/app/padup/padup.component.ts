import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService, UserValidators } from '@ngaox/chaospad';

@Component({
  selector: 'dev-padup',
  templateUrl: './padup.component.html',
  styleUrls: ['./padup.component.scss']
})
export class PadupComponent {
  group: FormGroup = new FormGroup({
    username: new FormControl(
      '',
      UserValidators.Username(),
      UserValidators.Unique(this.api)
    ),
    date: new FormControl('', UserValidators.Birthday())
  });

  constructor(private api: ApiService) {}

  get username() {
    return this.group.get('username');
  }

  get date() {
    console.log(this.group.get('date')?.value);
    return this.group.get('date');
  }
}
