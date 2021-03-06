import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BondTableComponent} from './bonds/bonds-table/bonds.component';
import {CommodityTableComponent} from './commodities/commodities-table/commodities.component';
import {StockTableComponent} from './stocks/stock-table/stock-table.component';
import {RealEstateTableComponent} from './realestate/realestate-table/realestate-table.component';
import {CountryPageComponent} from './realestate/country-page/country-page.component';
import {RealEstateComponent} from './realestate/realestate.component';
import {InvestmentComponent} from './investment/investment.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import {AuthGuard} from './auth/auth.guard';
import { StockPageComponent } from './stocks/stock-page/stock-page.component';
import { CurrencyTableComponent } from './currency/currency-table/currency-table.component';
import { CurrencyPageComponent } from './currency/currency-page/currency-page.component';
import {ProfileComponent} from './profile/profile.component';
import {CommoditiesPageComponent} from './commodities/commodities-page/commodities-page.component';
import {InvestmentPortfolioComponent} from './investment/investmentportfolio.component';
import { AboutSectionComponent } from './about-section/about-section.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'bond-table',
    component: BondTableComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'commodity-table',
    component: CommodityTableComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'stock-table',
    component: StockTableComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'realestate',
    component: RealEstateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'country/:country_name',
    component: CountryPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'investment',
    component: InvestmentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'portfolio',
    component: InvestmentPortfolioComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'stock-page/:stock_ticker',
    component: StockPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'currency-table',
    component: CurrencyTableComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'currency-page/:currency_ticker',
    component: CurrencyPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'commodities-page/:commodity_symbol',
    component: CommoditiesPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'about',
    component: AboutSectionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {
}


