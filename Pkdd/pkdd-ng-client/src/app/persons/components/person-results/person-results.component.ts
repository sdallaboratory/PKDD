import { Component, OnInit } from '@angular/core';
import { RealtimeResultService } from 'src/app/test/services/realtime-result.service';
import { RouteDataProviderService } from 'src/app/core/services/route-data-provider.service';

@Component({
  selector: 'pkdd-person-results',
  templateUrl: './person-results.component.html',
  styleUrls: ['./person-results.component.scss'],
  providers: [
    RealtimeResultService,
    RouteDataProviderService
  ]
})
export class PersonResultsComponent implements OnInit {

  private personId: number = null;

  constructor(
    private readonly realtime: RealtimeResultService,
    private readonly route: RouteDataProviderService
  ) { }

  async ngOnInit() {
  }

}
