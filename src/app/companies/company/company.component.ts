import {Component, OnInit} from '@angular/core';
import {Company} from '../company';
import {Subject} from 'rxjs/Subject';
import {ActivatedRoute} from '@angular/router';
import {CompanyService} from '../company.service';
import {debounceTime} from 'rxjs/operator/debounceTime';
import {globals} from '../../globals';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  company: Company;
  successMessage: boolean;
  errorMessage: boolean;
  private _success = new Subject<boolean>();
  private _error = new Subject<boolean>();

  constructor(private route: ActivatedRoute, private companyService: CompanyService) {
  }

  ngOnInit() {
    this._success.subscribe((state) => this.successMessage = state);
    this._error.subscribe((state) => this.errorMessage = state);
    debounceTime.call(this._success, globals.alertTimeout).subscribe(() => this.successMessage = false);
    debounceTime.call(this._error, globals.alertTimeout).subscribe(() => this.errorMessage = false);

    this.getCompany();
  }

  getCompany(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.companyService.getCompany(id).subscribe(company => this.company = company);
  }

  public onSubmit() {
    this.companyService.updateCompany(this.company).subscribe(company => {
        this.company = company;
        this._success.next(true);
      },
      error => {
        this._error.next(true);
        console.error(error);
      });
  }

}
