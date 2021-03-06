import { Component, OnInit, OnDestroy } from '@angular/core';
import { Investment } from './investment.model';
import { InvestmentService } from './investment.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { Injectable } from '@angular/core';    
import { Subscription } from 'rxjs/internal/Subscription';   
import {Subject } from 'rxjs';

@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.css'],
})
export class InvestmentComponent implements OnInit, OnDestroy{

  InvestmentData: any = [];
  CurrencyData: any = [];
  FormattedCurrency: MatTableDataSource<Investment>;

  investments: Investment[] =[];
  displayedColumns: string[] = ['name', 'symbol', 'shares', 'transactionPrice'];
  dataSource: MatTableDataSource<Investment>;
  investmentValue=0;
  currencyValue: number;
  
  
  private investmentSub: Subscription;
  UID: string;
  userObject: any;

    constructor(private investmentApi: InvestmentService) {
      
      //Retrieve User ID
      this.investmentApi.getUserID().subscribe(data => {
        this.userObject=data;
        this.UID = this.userObject._id;
      
     //Transaction History
      this.investmentApi.transactionHistory(this.UID).subscribe(data => {
        this.InvestmentData = data;
        this.dataSource = new MatTableDataSource<Investment>(this.InvestmentData);
      });

     //Total Investment Value
      this.investmentApi.getInvestmentValue(this.UID).then(result => {
        this.investmentValue = result;
      });

     //Currency Balance
       this.investmentApi.getCurrencyBalance(this.UID,"DOLLAR").then(result =>{
         this.currencyValue = result;
      });
    });
  }

  ngOnInit() {
    this.investmentSub = this.investmentApi.getInvestmentUpdateListener()
      .subscribe((investments: Investment[]) => {
        this.dataSource = new MatTableDataSource<Investment>(investments);
      });
  }

  ngOnDestroy(){
    this.investmentSub.unsubscribe();
  }
};
