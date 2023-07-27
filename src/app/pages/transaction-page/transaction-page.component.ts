import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction-page',
  templateUrl: './transaction-page.component.html',
  styleUrls: ['./transaction-page.component.css']
})
export class TransactionPageComponent implements OnInit{

  baseUrl : string = "http://localhost:7236";

  sysTxns!: any[];
  tempSysTxns!: any[];

  searchText!: string;

  page: number = 1;
  count: number = 0;
  tableSize: number = 5;

  order!: string;
  reverse: boolean = false;

  constructor(private http: HttpClient,) {}

  ngOnInit() {
    this.getSysTxnsList();
  }

  setOrder(value: string) { 
    if (this.order === value) { 
      this.reverse = !this.reverse; 
    } 
    this.order = value; 
  }

  getCredits() {
    const credits = this.tempSysTxns.filter((x: any) => x.transactionType === "CREDIT");
    this.sysTxns = credits;
  }
  getDebits() {
    const debits = this.tempSysTxns.filter((x: any) => x.transactionType === "DEBIT");
    this.sysTxns = debits;
  }
  getAll() {
    const allTxns = this.tempSysTxns;
    this.sysTxns = allTxns;
  }
  getNGNWallet() {
    const ngnWallet = this.tempSysTxns.filter((x: any) => x.systAccountNumber.includes("NGN"));
    this.sysTxns = ngnWallet;
  }
  getUSDWallet() {
    const usdWallet = this.tempSysTxns.filter((x: any) => x.systAccountNumber.includes("USD"));
    this.sysTxns = usdWallet;
  }
  getEURWallet() {
    const eurWallet = this.tempSysTxns.filter((x: any) => x.systAccountNumber.includes("EUR"));
    this.sysTxns = eurWallet;
  }
  getGBPWallet() {
    const gbpWallet = this.tempSysTxns.filter((x: any) => x.systAccountNumber.includes("GBP"));
    this.sysTxns = gbpWallet;
  }

  getSysTxnsList() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.get<any[]>(`${this.baseUrl}/api/Transaction/GetSystemTransactionList`,
    {headers: headers})
    .subscribe({
      next: (res) => {
        this.sysTxns = res;
        this.tempSysTxns = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onTableDataChange(event: any) {
    this.page = event;
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

}
