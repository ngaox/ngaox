import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SeoModule } from '@ngaox/seo';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SeoModule.forRoot({
            title: "🧪🤖",
            keywords: "1, 2, 3",
            description: "I dont know what Im supposed to write",
            url: "https://www.exemple.com",
            type: "website",
            image: "https://www.exemple.com/image.jpg",
            imageData: {
                alt: "not a reel alt image",
                width: 80,
                height: 80,
                mimeType: "image/jpg"
            },
            twitterCreator: "@string",
            fbAppId: "string",
            siteName: "Dev App | Tesing"
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
