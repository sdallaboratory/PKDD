import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonsListComponent } from './components/persons-list/persons-list.component';
import { AuthModule } from '../auth/auth.module';
import { PersonCardComponent } from './components/person-card/person-card.component';
import { MaterialImportsModule } from '../material-imports/material-imports.module';
import { PersonsPageComponent } from './components/persons-page/persons-page.component';
import { PersonDetailsPageComponent } from './components/person-details-page/person-details-page.component';
import { PersonsRoutingModule } from './persons-routing.module';
import { PersonInfoComponent } from './components/person-info/person-info.component';
import { PersonEditComponent } from './components/person-edit/person-edit.component';
import { PersonMmpiComponent } from './components/person-mmpi/person-mmpi.component';
import { PersonLuscherComponent } from './components/person-luscher/person-luscher.component';
import { PersonPhysiognomyComponent } from './components/person-physiognomy/person-physiognomy.component';
import { PersonResultsComponent } from './components/person-results/person-results.component';
import { ContentBlockComponent } from './components/content-blocks/content-block/content-block.component';
import { TextBlockComponent } from './components/content-blocks/text-block/text-block.component';
import { DateTextBlockComponent } from './components/content-blocks/date-text-block/date-text-block.component';
import { PhotoBlockComponent } from './components/content-blocks/photo-block/photo-block.component';
import { VideoBlockComponent } from './components/content-blocks/video-block/video-block.component';
import { PublicationBlockComponent } from './components/content-blocks/publication-block/publication-block.component';
import { AddCardComponent } from './components/content-blocks/add-card/add-card.component';
import { ContentComponent } from './components/content-blocks/content/content.component';

@NgModule({
  imports: [
    CommonModule,
    AuthModule,
    MaterialImportsModule,
    PersonsRoutingModule
  ],
  declarations: [
    PersonsListComponent,
    PersonCardComponent,
    PersonsPageComponent,
    PersonDetailsPageComponent,
    PersonInfoComponent,
    PersonEditComponent,
    PersonMmpiComponent,
    PersonLuscherComponent,
    PersonPhysiognomyComponent,
    PersonResultsComponent,
    ContentBlockComponent,
    TextBlockComponent,
    DateTextBlockComponent,
    PhotoBlockComponent,
    VideoBlockComponent,
    PublicationBlockComponent,
    AddCardComponent,
    ContentComponent]
})
export class PersonsModule { }
