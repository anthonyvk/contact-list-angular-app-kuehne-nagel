import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {DomSanitizer} from "@angular/platform-browser";
// import console from "console";

const BASEURL = 'http://localhost:8080/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'contact-list-angular-app-kuehne-nagel';
  contacts: any;
  currentIndex = -1;

  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [3, 6, 9];

  nameSearchValue = '';

  constructor(
    private httpClient: HttpClient,
    private sanitizer:DomSanitizer)
  {}

  ngOnInit(): void {
    this.retrieveContacts();
  }

  getAll(params: any): Observable<any> {
    return this.httpClient.get(BASEURL + '/getAllContacts', {params});
  }

  getAllByName(params: any): Observable<any> {
    return this.httpClient.get(BASEURL + '/find', {params});
  }

  getRequestParams(searchTitle: string, page: number, pageSize: number, nameSearchValue: string): any {
    // tslint:disable-next-line:prefer-const
    let params: any = {};
    if (searchTitle) {
      params[`title`] = searchTitle;
    }
    if (page) {
      params[`page`] = page - 1;
    }
    if (pageSize) {
      params[`size`] = pageSize;
    }

    console.log("params[`searchValue`] = " + params[`searchValue`])
    if(nameSearchValue != null && nameSearchValue != '') {
      params[`searchValue`] = nameSearchValue;
    }
    return params;
  }

  retrieveContacts(): void {
    let name = this.nameSearchValue;
    console.log(" name = " + name);
    const params = this.getRequestParams(this.title, this.page, this.pageSize, name);

    if(name) {
      this.getAllByName(params)
        .subscribe(
          response => {
            const {contactList, totalContacts} = response;
            console.log("contacts = " + contactList)
            this.contacts = contactList;
            this.count = totalContacts;
          },
          error => {
            console.log(error);
          });
    } else {
      this.getAll(params)
        .subscribe(
          response => {
            const {contactList, totalContacts} = response;
            console.log("contacts = " + contactList)
            this.contacts = contactList;
            this.count = totalContacts;
          },
          error => {
            console.log(error);
          });
    }
  }

  searchContactsByName(): void {
    const params = this.getRequestParams(this.title, this.page, this.pageSize, this.nameSearchValue);

    this.getAllByName(params)
      .subscribe(
        response => {
          const {contactList, totalContacts} = response;
          console.log("contacts = " + contactList)
          this.contacts = contactList;
          this.count = totalContacts;
        },
        error => {
          console.log(error);
        });
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveContacts();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveContacts();
  }

  sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
