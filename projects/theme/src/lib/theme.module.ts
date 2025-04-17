import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FuseSplashScreenService } from "@fuse/services/splash-screen";

@NgModule({
    imports: [
      CommonModule,
      MatDialogModule,
      MatFormFieldModule,
      // ...otros módulos de Angular Material que use tu tema
    ],
    providers: [
      FuseSplashScreenService,
      // otros servicios de @fuse
    ],
    exports: [
      // exporta componentes layout u otros que quieras usar
    ]
  })
  export class ThemeModule {}