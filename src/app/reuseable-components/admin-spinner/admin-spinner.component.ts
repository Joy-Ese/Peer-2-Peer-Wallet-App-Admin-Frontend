import { Component, ViewEncapsulation } from '@angular/core';
import { AdminLoaderService } from 'src/app/services/admin-loader.service';

@Component({
  selector: 'app-admin-spinner',
  templateUrl: './admin-spinner.component.html',
  styleUrls: ['./admin-spinner.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AdminSpinnerComponent {
  constructor(public loader: AdminLoaderService) { }
}
