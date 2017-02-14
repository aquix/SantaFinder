import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { RatingModule } from 'ng2-rating';
import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { Ng2PaginationModule } from 'ng2-pagination';

import { AppConfig } from './app.config';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';

import { AuthGuard } from './account/services/auth.guard';
import { ClientAuthGuard } from './account/services/client-auth.guard';
import { SantaAuthGuard } from './account/services/santa-auth.guard';
import { OnlyAnonymousGuard } from './account/services/only-anonymous.guard';
import { AuthHttp } from './auth/auth-http.service';
import { AuthInfoStorage } from './auth/auth-info-storage.service';
import { AccountService } from './account/services/account.service';
import { SantasService } from './data-services/santas.service';
import { OrdersService } from './data-services/orders.service';
import { SantaOrdersService } from './data-services/santa-orders.service';
import { LocationService } from './shared/services/location.service';
import { GeocodingService } from './shared/services/geocoding.service';

import { NavbarComponent } from './shared/navbar/navbar.component';
import { MainComponent } from './main/main.component';
import { ClientComponent } from './client/client.component';
import { ClientHomeComponent } from './client/home/client-home.component';
import { ClientOrderComponent } from './client/order/client-order.component';
import { ClientProfileComponent } from './client/profile/client-profile.component';
import { ClientOrderHistoryComponent } from './client/order-history/client-order-history.component';
import { SantaComponent } from './santa/santa.component';
import { SantaHomeComponent } from './santa/home/santa-home.component';
import { SantaOrderDetailsComponent } from './santa/order-details/santa-order-details.component';
import { SantaMyOrdersComponent } from './santa/my-orders/santa-my-orders.component';
import { SantaMyOrderListComponent } from './santa/my-orders/my-order-list/santa-my-order-list.component';
import { SantaMyOrderDetailsComponent } from './santa/my-orders/my-order-details/santa-my-order-details.component';
import { MapComponent } from './santa/home/map/map.component';
import { AccountComponent } from './account/account.component';
import { ClientAccountComponent } from './account/client/client-account.component';
import { SantaAccountComponent } from './account/santa/santa-account.component';
import { ClientLoginFormComponent } from './account/client/login/client-login-form.component';
import { ClientRegisterFormComponent } from './account/client/register/client-register-form.component';
import { SantaLoginFormComponent } from './account/santa/login/santa-login-form.component';
import { SantaRegisterFormComponent } from './account/santa/register/santa-register-form.component';
import { LoginFormComponent } from './account/shared/login/login-form.component';
import { LogoutComponent } from './account/logout/logout.component';
import { PhotoUploaderComponent } from './account/santa/register/photo-uploader/photo-uploader.component';
import { SantaPreviewListComponent } from './client/home/santa-preview-list/santa-preview-list.component';
import { ClientOrderInfoComponent } from './client/order-info/order-info.component';
import { ClientSantaInfoComponent } from './client/santa-info/client-santa-info.component';
import { SantaProfileComponent } from './santa/profile/santa-profile.component';

import { AddressPipe } from './shared/pipes/address.pipe';
import { DatetimePipe } from './shared/pipes/datetime.pipe';
import { SantaPreviewCardComponent } from './client/shared/santa-preview-card/santa-preview-card.component';
import { ClientOrdersService } from './data-services/client-orders.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpModule,
        RatingModule,
        Ng2DatetimePickerModule,
        AgmCoreModule.forRoot({
            apiKey: AppConfig.GMAPS_API_KEY
        }),
        Ng2PaginationModule
    ],
    declarations: [
        NavbarComponent,
        AppComponent,
        MainComponent,
        ClientComponent,
        ClientHomeComponent,
        ClientOrderComponent,
        ClientProfileComponent,
        SantaProfileComponent,
        ClientOrderHistoryComponent,
        SantaComponent,
        SantaHomeComponent,
        SantaOrderDetailsComponent,
        SantaMyOrdersComponent,
        SantaMyOrderListComponent,
        SantaMyOrderDetailsComponent,
        MapComponent,
        AccountComponent,
        ClientAccountComponent,
        ClientLoginFormComponent,
        ClientRegisterFormComponent,
        SantaAccountComponent,
        SantaLoginFormComponent,
        SantaRegisterFormComponent,
        LoginFormComponent,
        LogoutComponent,
        PhotoUploaderComponent,
        SantaPreviewListComponent,
        ClientOrderInfoComponent,
        ClientSantaInfoComponent,
        SantaPreviewCardComponent,

        AddressPipe,
        DatetimePipe
    ],
    providers: [
        CookieService,
        AuthGuard,
        ClientAuthGuard,
        SantaAuthGuard,
        OnlyAnonymousGuard,
        AuthInfoStorage,
        AuthHttp,
        AccountService,
        SantasService,
        SantaOrdersService,
        OrdersService,
        ClientOrdersService,
        LocationService,
        GeocodingService
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }