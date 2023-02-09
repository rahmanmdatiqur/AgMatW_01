import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { Animal } from '../../../models/animal';
import { Zoo } from '../../../models/zoo';
import { DataService } from '../../../services/data.service';
import { NotifyService } from '../../../services/notify.service';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-animal-view',
  templateUrl: './animal-view.component.html',
  styleUrls: ['./animal-view.component.css']
})
export class AnimalViewComponent {
  animals: Animal[] = [];
  zoos: Zoo[] = [];
  dataSource: MatTableDataSource<Animal> = new MatTableDataSource(this.animals);
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  columnList: string[] = ["picture", "name", "species", "introduced", "gender", "zoo", "actions"];

  constructor(
    private dataSvc: DataService,
    private notifySvc: NotifyService,
    private dialog: MatDialog
  ) { }
  confirmDelete(item: Animal) {
    this.dialog.open(ConfirmDialogComponent, {
      width: '450px'
    }).afterClosed().subscribe(r => {
      if (r) this.dataSvc.deleteAnimal(Number(item.animalId))
        .subscribe(x => {
          this.notifySvc.success("Data deleted successfully!!", "DISMISS");
          this.dataSource.data = this.dataSource.data.filter(d => d.animalId != x.animalId);
        }, err => {
          this.notifySvc.fail("Data deleted failed!!!", "DISMISS");
        });
    });
  }

  getZooName(id: number) {
    let z = this.zoos.find(z => z.zooId == id);
    return z ? z.zooName : '';
  }
  ngOnInit(): void {
    this.dataSvc.getAnimals().
      subscribe(x => {
        this.animals = x;
        console.log(x);
        this.dataSource.data = this.animals;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
        this.notifySvc.fail("Failed to load animal data", "DISMISS");
      })
  }
}
