import { Component, OnInit } from '@angular/core';
import { RouteDataProviderService } from '../../../core/services/route-data-provider.service';
import { Results } from '../../../models/persons/results/results';

@Component({
  selector: 'pkdd-person-mmpi',
  templateUrl: './person-mmpi.component.html',
  styleUrls: ['./person-mmpi.component.scss'],
  providers: [RouteDataProviderService]
})
export class PersonMmpiComponent implements OnInit {

  public results: Results;

  public get scales() {
    return Object.values(this.results.mmpi);
  }

  constructor(
    private readonly data: RouteDataProviderService
  ) { }

  async ngOnInit() {
    this.results = await this.data.get<Results>('results');
    console.log(this.results);
    console.log(this.scales);
  }

}
