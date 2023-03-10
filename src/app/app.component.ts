import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {DomSanitizer} from "@angular/platform-browser";
import {FormBuilder, FormGroup} from "@angular/forms";
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
  nameSearchValue = '';

  constructor(
    private httpClient: HttpClient,
    private sanitizer:DomSanitizer)
  {}

  ngOnInit(): void {
    console.log('BASEURL = ' + BASEURL)
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

  clearSearchFilterAndLoadAll(): void {
    this.page = 1;
    this.pageSize = 10;
    this.nameSearchValue = '';
    this.retrieveContacts();
  }

  retrieveContacts(): void {
    const params = this.getRequestParams(this.title, this.page, this.pageSize, this.nameSearchValue);

    if(this.nameSearchValue) {
      this.page = 1;
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

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveContacts();
  }

  sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
