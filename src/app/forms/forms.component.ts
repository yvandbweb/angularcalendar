import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../calendar.service';


@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})


export class FormsComponent implements OnInit {
  countries:any = [];
  months:any = [];
  years:any = [];
  daysofmonth:any = [];
  freedaysyear:any = [];
  country_id:Number=0;
  current_year:Number=0;
  current_month:Number=0;
  country_code_lng:string="";
  isLoading:any = [];

  constructor(private calendarservice : CalendarService) {

  }

  ngOnInit(): void {
    this.current_year=new Date().getFullYear();
    this.current_month=1;
    this.country_id=2419;
    this.country_code_lng="LU";
    this.isLoading = [];
    this.getCountries();
    this.getYears();
  }

  getCountries() {
    this.isLoading[0]=0;
    this.isLoading[1]=0;
    this.isLoading[2]=0;
    this.isLoading[3]=0;
    this.calendarservice.getCountries().subscribe((res : any)=>{
                this.countries = res;
                this.isLoading[0]=1;
    });

    this.calendarservice.getMonths(this.country_id, this.current_year).subscribe((res : any)=>{
                let found : boolean=false;
                for (let i = 0; i<res.length; i++){
                  if (Number.parseInt(res[i]["month"])==this.current_month){
                    found=true;
                    break;
                  }
                }

                if (found==false)
                   this.current_month=1;

                this.months = res;
                this.isLoading[1]=1;

                this.calendarservice.getDaysOfmonth(this.current_month,this.current_year,this.country_id).subscribe((res : any)=>{
                  this.daysofmonth = res;
                  this.isLoading[2]=1;
                });

                this.calendarservice.getFreedaysyear(this.current_year,this.country_id).subscribe((res : any)=>{
                  this.freedaysyear = res;
                  this.isLoading[3]=1;
                });
    });
  }

  getYears() {
    this.isLoading[4]=0;
    this.calendarservice.getYears(this.country_id).subscribe((res : any)=>{
                this.years = res;
                this.isLoading[4]=1;
    });
  }

  onChangeCountry(val : Number){
    this.country_id=val;
    this.getCountries();
  }

  onChangeMonth(val : Number){
    this.current_month=val;
    this.getCountries();
  }

  onChangeYear(val : Number){
    this.current_year=val;
    this.getCountries();
  }

  getFreeadyChildListing(monthchild : string){
    this.current_month=Number.parseInt(monthchild);
    this.getCountries();
  }


}
