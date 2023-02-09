import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Animal } from '../../../models/animal';
import { Zoo } from '../../../models/zoo';
import { DataService } from '../../../services/data.service';
import { NotifyService } from '../../../services/notify.service';

@Component({
  selector: 'app-animal-create',
  templateUrl: './animal-create.component.html',
  styleUrls: ['./animal-create.component.css']
})
export class AnimalCreateComponent implements OnInit {
  picFile!: File;
  animal: Animal = new Animal();
  zoos: Zoo[] = [];

  animalForm: FormGroup = new FormGroup({
    animalName: new FormControl('', Validators.required),
    speciesName: new FormControl('', Validators.required),
    introduced: new FormControl(undefined, Validators.required),
    gender: new FormControl('Male', Validators.required),
    picture: new FormControl(undefined, Validators.required),
    zooId: new FormControl('', Validators.required)
  });

  constructor(
    private dataSvc: DataService,
    private notifySvc: NotifyService,
    private datePipe: DatePipe
  ) { }

  f() {
    return this.animalForm.controls;
  }
  insert() {
    if (this.animalForm.invalid) return;

    console.log(this.animalForm.value);

    Object.assign(this.animal, this.animalForm.value);
    this.animal.picture = 'no-pic.png';
    console.log(this.animal);

    this.dataSvc.postAnimal(this.animal)
      .subscribe(r => {
        console.log(r);
        this.upload(Number(r.animalId));
      }, err => {
        this.notifySvc.fail("Fail to save data!!", "DISMISS");
      })
  }
  upload(id: number) {
    console.log(this.picFile);
    let reader = new FileReader();
    reader.addEventListener("load", (event: any) => {
      this.dataSvc.upload(id, this.picFile)
        .subscribe(r => {
          this.animal.picture = r.imagePath;
          this.notifySvc.success("Succeeded to save animal data", "DISMISS");
          this.animalForm.reset({});
        }, err => {
          this.notifySvc.fail("Fail to upload image!!", "DISMISS");
        });
    });
    reader.readAsDataURL(this.picFile);
  }
  onChange(event: any) {
    this.picFile = event.target.files[0];
  }

  ngOnInit(): void {
    this.dataSvc.getZoos()
      .subscribe(r => {
        this.zoos = r;
      }, err => {
        this.notifySvc.fail("Failed to load zoos data!!", "DISMISS");
      })
  }

}
