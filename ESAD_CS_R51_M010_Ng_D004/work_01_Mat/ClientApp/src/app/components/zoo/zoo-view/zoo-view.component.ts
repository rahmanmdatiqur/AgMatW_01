import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Zoo } from '../../../models/zoo';
import { DataService } from '../../../services/data.service';
import { NotifyService } from '../../../services/notify.service';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-zoo-view',
  templateUrl: './zoo-view.component.html',
  styleUrls: ['./zoo-view.component.css']
})
export class ZooViewComponent {
  zoos: Zoo[] = [];
  dataSource: MatTableDataSource<Zoo> = new MatTableDataSource(this.zoos);
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  columnList: string[] = ["name", "location", "actions"];

  constructor(
    private dataSvc: DataService,
    private notifySvc: NotifyService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.dataSvc.getZoos().
      subscribe(x => {
        this.zoos = x;
        console.log(x);
        this.dataSource.data = this.zoos;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
        this.notifySvc.fail("Failed to load zoo data", "DISMISS");
      })
  }
  confirmDelete(item: Zoo) {
    this.dialog.open(ConfirmDialogComponent, {
      width: '450px'
    }).afterClosed().subscribe(r => {
      if (r) this.dataSvc.deleteZoo(Number(item.zooId))
        .subscribe(x => {
          this.notifySvc.success("Data deleted successfully!!", "DISMISS");
          this.dataSource.data = this.dataSource.data.filter(d => d.zooId != x.zooId);
        }, err => {
          this.notifySvc.fail("Data deleted failed!!!", "DISMISS");
        });
    });
  }
}
