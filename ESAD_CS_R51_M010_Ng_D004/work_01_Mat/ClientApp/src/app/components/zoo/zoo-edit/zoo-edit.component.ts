import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Zoo } from '../../../models/zoo';
import { DataService } from '../../../services/data.service';
import { NotifyService } from '../../../services/notify.service';

@Component({
  selector: 'app-zoo-edit',
  templateUrl: './zoo-edit.component.html',
  styleUrls: ['./zoo-edit.component.css']
})
export class ZooEditComponent {
  zoo!: Zoo;
  zooForm: FormGroup = new FormGroup({
    zooName: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
  });
  constructor(
    private dataSvc: DataService,
    private notifySvc: NotifyService,
    private activatedRoute: ActivatedRoute
  ) { }

  f() {
    return this.zooForm.controls;
  }

  update() {
    if (this.zooForm.invalid) return;
    this.zoo.zooName = this.f()['zooName'].value;
    this.zoo.location = this.f()['location'].value;
    this.dataSvc.putZoo(this.zoo)
      .subscribe(x => {
        this.notifySvc.success("Data updated successfully!!","DISMISS");
      }, err => {
        this.notifySvc.fail("Failed to uodate data!!", "DISMISS");
      })
  }
  ngOnInit(): void {
    let id: number = this.activatedRoute.snapshot.params['id'];
    this.dataSvc.getZooById(id)
      .subscribe(x => {
        this.zoo = x;
        this.zooForm.patchValue(this.zoo);
      }, err => {
        this.notifySvc.fail("Failed to load zoo data!!", "DISMISS");
      })
  }
}
