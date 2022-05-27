import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  baseUrl:string = "https://ydbweb.com:8181/webservfreedays/";

  getCountries() {
    return this.httpClient.get(this.baseUrl+ "countries" + '/');
  }

  getMonths(country_id : Number, year : Number) {
    return this.httpClient.get(this.baseUrl+ "months?country_id=" + country_id + "&year=" + year);
  }

  getYears(country_id : Number) {
    return this.httpClient.get(this.baseUrl+ "years"+ "?country_id=" + country_id);
  }

  getFreedaysyear(year : Number ,country_id : Number) {
    return this.httpClient.get(this.baseUrl+ "freedaysyear"+ "?country_id=" + country_id + "&year=" + year);
  }

  getDaysOfmonth(month : Number, year : Number, country_id : Number){
    return this.httpClient.get(this.baseUrl+ "daysofmonth?month=" + month + "&year=" + year + "&country_id=" + country_id);
  }

  constructor(private httpClient : HttpClient) { }
}
