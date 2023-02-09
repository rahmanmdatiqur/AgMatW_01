import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Zoo } from '../../../models/zoo';
import { DataService } from '../../../services/data.service';
import { NotifyService } from '../../../services/notify.service';

@Component({
  selector: 'app-zoo-create',
  templateUrl: './zoo-create.component.html',
  styleUrls: ['./zoo-create.component.css']
})
export class ZooCreateComponent {
  zoo: Zoo = new Zoo();
  zooForm: FormGroup = new FormGroup({
    zooName: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
  });

  constructor(
    private dataSvc: DataService,
    private notifySvc: NotifyService
  ) { }

  f() {
    return this.zooForm.controls;
  }

  insert() {
    if (this.zooForm.invalid) return;
    this.zoo.zooName = this.f()['zooName'].value;
    this.zoo.location = this.f()['location'].value;
    this.dataSvc.postZoo(this.zoo)
      .subscribe(r => {
        this.notifySvc.success("Data saved successfully!!!", "DISMISS");
        this.zooForm.reset({});
        console.log(r);
      }, err => {
        this.notifySvc.fail("Failed to save data!!!", "DISMISS");
      })
  }
}
