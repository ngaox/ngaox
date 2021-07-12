import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ApiService } from './services/api.service';

@NgModule({
  declarations: [],
  imports: [HttpClientModule],
  exports: [],
  providers: [
    ApiService,
    {
      provide: 'API_BASE',
      useValue: 'https://chaospad-dev.herokuapp.com'
    }
  ]
})
export class ChaospadModule {
  public static forRoot(
    API_BASE: string = 'https://chaospad-dev.herokuapp.com'
  ): ModuleWithProviders<ChaospadModule> {
    return {
      ngModule: ChaospadModule,
      providers: [
        {
          provide: 'API_BASE',
          useValue: API_BASE
        }
      ]
    };
  }
}
