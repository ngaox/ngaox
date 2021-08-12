import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';

@NgModule({
  declarations: [],
  imports: [HttpClientModule],
  exports: [],
  providers: []
})
export class ChaospadModule {
  public static forRoot(
    API_BASE: string | null = null
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
