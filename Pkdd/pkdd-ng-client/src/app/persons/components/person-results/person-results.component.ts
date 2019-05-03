import { Component, OnInit, OnDestroy } from '@angular/core';
import { RealtimeResultService, ResultEmitter } from 'src/app/test/services/realtime-result.service';
import { RouteDataProviderService } from 'src/app/core/services/route-data-provider.service';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { TestResult } from 'src/app/models/persons/results/test-result';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Person } from 'src/app/models/entities/person';

@Component({
  selector: 'pkdd-person-results',
  templateUrl: './person-results.component.html',
  styleUrls: ['./person-results.component.scss'],
  providers: [
    RealtimeResultService,
    RouteDataProviderService
  ]
})
export class PersonResultsComponent implements OnInit, OnDestroy {

  public person: Person;

  public results: TestResult[];

  public get luscherExperts() {
    return this.results && this.results.filter(r => r.luscherComplete);
  }

  public emitter: ResultEmitter;

  constructor(
    private readonly realtime: RealtimeResultService,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.person = (this.route.snapshot.data)['personModel'].person;
    this.emitter = this.realtime.getEmitter(this.person.id).start();
    // TODO: Убрать эту мерзкую грязь. Юзать BehaviorSubject
    this.emitter.changed.subscribe(r => this.results = r);
  }

  ngOnDestroy() {
    this.emitter.stop();
  }
}
