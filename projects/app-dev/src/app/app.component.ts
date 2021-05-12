import { Component } from '@angular/core';
import { SeoService } from '@ngaox/seo';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'app-dev';
    constructor(seo: SeoService) {
        seo.set({});
    }
}
