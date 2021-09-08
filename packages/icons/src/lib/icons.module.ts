import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { IconComponent } from './icon.component';
import { IconsService } from './icons.service';

@NgModule({
  declarations: [IconComponent],
  imports: [HttpClientModule],
  exports: [IconComponent],
  providers: [IconsService]
})
export class IconsModule {}
