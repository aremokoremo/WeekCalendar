

/////////////////////////////////
// global variables
/////////////////////////////////

//for calendar
var weekno_1;
var weekno_2;
var weekno_3;
var weekno_4;
var weekno_5;
var weekno_6;
var weekno_7;
var weekno_8;
var weekno_9;
var weekno_10;
var weekno_11;
var weekno_12;

var year_width  = 59;
var m_w_width   = 25;

var month_days_1  = 31;
var month_days_2  = 0;
var month_days_3  = 31;
var month_days_4  = 30;
var month_days_5  = 31;
var month_days_6  = 30;
var month_days_7  = 31;
var month_days_8  = 31;
var month_days_9  = 30;
var month_days_10 = 31;
var month_days_11 = 30;
var month_days_12 = 31;

var px_per_day = 2;

var month_width_1  = 0;
var month_width_2  = 0;
var month_width_3  = 0;
var month_width_4  = 0;
var month_width_5  = 0;
var month_width_6  = 0;
var month_width_7  = 0;
var month_width_8  = 0;
var month_width_9  = 0;
var month_width_10 = 0;
var month_width_11 = 0;
var month_width_12 = 0;

var month_start_x_1  = 0;
var month_start_x_2  = 0;
var month_start_x_3  = 0;
var month_start_x_4  = 0;
var month_start_x_5  = 0;
var month_start_x_6  = 0;
var month_start_x_7  = 0;
var month_start_x_8  = 0;
var month_start_x_9  = 0;
var month_start_x_10 = 0;
var month_start_x_11 = 0;
var month_start_x_12 = 0;

var days_total = 0;

var table_border = 1;

//for Today
var todayYear=0;
var todayMonth=0;
var todayDate=0;
var todayDay=0;
var todayWeekno=0;
var today_x=0;
var today_y=60;

//for "selected day"
var selected_x=0;
var selected_day_fixed = false;

/////////////////////////////////
// functions
/////////////////////////////////

//-----------------------
// Main (html on load)
//-----------------------
function main(){
  var bk = document.getElementById("background");
  bk.addEventListener("mousedown",onMove,true);
  
  nativeWindow.alwaysInFront = true;

  initDate();
  createWeeknoForEachMonth();
  showCalender();    
  showToday();
}


//-----------------------
// Mouse
//-----------------------
var onMove = function(event){
	nativeWindow.startMove();
}

//on mouse move
function on_mouse_move() {
  if(selected_day_fixed==false)
  {	
    selected_x=event.clientX;
    showDaySelected(selected_x);
  }
}

//on mouse click
function on_mouse_click() {
  if(selected_day_fixed == false)
  {
  	selected_day_fixed=true; 
  }
  else
  {
    selected_day_fixed=false;	
  }	 
}


//-----------------------
// utility
//-----------------------

//get week number
//(reference) http://javascript.about.com/library/blweekyear.htm
Date.prototype.getWeek = function() {
  var onejan = new Date(this.getFullYear(),0,1);
  ret = Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);

  //ISO adaptation (Sunday = W X.7, NOT X.0)
  if(this.getDay() == 0)
  {
    ret = ret - 1;
  }

  //ISO adaptation (W1 is the week having 1st Thursday)
  if(onejan.getDay() == 5 || onejan.getDay() == 6 || onejan.getDay() == 0)
  {
    ret = ret - 1;
    if(ret == 0)
    {
      var lastdayoflastyear = new Date(this.getFullYear()-1,11,31);
      var onejanoflastyear = new Date(this.getFullYear()-1,0,1);

      lastweekno = Math.ceil((((lastdayoflastyear - onejanoflastyear) / 86400000) + onejanoflastyear.getDay()+1)/7);
      if(onejanoflastyear.getDay() == 0)
      {
        lastweekno = lastweekno + 1;
      }

      if(onejanoflastyear.getDay() == 5 || onejanoflastyear.getDay() == 6 || onejanoflastyear.getDay() == 0)
      {
        lastweekno = lastweekno -1;
      }

      ret = lastweekno;
    }
  }

  return ret;
}

//uruu year
function isLeapyear(year) {
  return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
}

//-----------------------
// initialize variables
//-----------------------

//initialize "today"
function initDate(){

  //today	
  myD = new Date();
  myD.setHours(0);
  myD.setMinutes(0);
  myD.setSeconds(0);
  todayYear = myD.getFullYear();
  todayMonth   = myD.getMonth() + 1;
  todayDate    = myD.getDate();
  todayDay     = myD.getDay();
  todayWeekno = myD.getWeek(); 
  
  //uruu-year
  if(true==isLeapyear(todayYear))
  {
    month_days_2 = 29;
    days_total = 366;
  }
  else
  {
    month_days_2 = 28;	
    days_total = 365;
  } 
  
  //x-cordinate of each month's start position
  month_start_x_1  = (table_border + year_width + table_border) + (table_border + m_w_width + table_border) + table_border;
  month_start_x_2  = month_start_x_1  + ((month_days_1  * px_per_day) + table_border) + table_border;
  month_start_x_3  = month_start_x_2  + ((month_days_2  * px_per_day) + table_border) + table_border;
  month_start_x_4  = month_start_x_3  + ((month_days_3  * px_per_day) + table_border) + table_border;
  month_start_x_5  = month_start_x_4  + ((month_days_4  * px_per_day) + table_border) + table_border;
  month_start_x_6  = month_start_x_5  + ((month_days_5  * px_per_day) + table_border) + table_border;
  month_start_x_7  = month_start_x_6  + ((month_days_6  * px_per_day) + table_border) + table_border;
  month_start_x_8  = month_start_x_7  + ((month_days_7  * px_per_day) + table_border) + table_border;
  month_start_x_9  = month_start_x_8  + ((month_days_8  * px_per_day) + table_border) + table_border;
  month_start_x_10 = month_start_x_9  + ((month_days_9  * px_per_day) + table_border) + table_border;
  month_start_x_11 = month_start_x_10 + ((month_days_10 * px_per_day) + table_border) + table_border;
  month_start_x_12 = month_start_x_11 + ((month_days_11 * px_per_day) + table_border) + table_border;
}

//-----------------------
// Calendar
//-----------------------

function showCalender(){

  month_width_1  = month_days_1  * px_per_day;
  month_width_2  = month_days_2  * px_per_day;
  month_width_3  = month_days_3  * px_per_day;
  month_width_4  = month_days_4  * px_per_day;
  month_width_5  = month_days_5  * px_per_day;
  month_width_6  = month_days_6  * px_per_day;
  month_width_7  = month_days_7  * px_per_day;
  month_width_8  = month_days_8  * px_per_day;
  month_width_9  = month_days_9  * px_per_day;
  month_width_10 = month_days_10 * px_per_day;
  month_width_11 = month_days_11 * px_per_day;
  month_width_12 = month_days_12 * px_per_day;

  var div = document.getElementById("divID_calendar");
  var str = "";
  str += "<table border=0 cellspacing=0 cellpadding=0>";
  str += "<tr>";
  str += "<td height=48 width=\"" + year_width.toString() +"\" rowspan=2 align=center>";
  str += todayYear.toString();
  str += "</td>";
  str += "<td height=23 width=\"" + m_w_width.toString() + "\" align=center>M</td>";
  str += "<td width=\"" + month_width_1.toString() + "px\">1</td>";
  str += "<td width=\"" + month_width_2.toString()  + "\">2</td>";
  str += "<td width=\"" + month_width_3.toString()  + "\">3</td>";
  str += "<td width=\"" + month_width_4.toString()  + "\">4</td>";
  str += "<td width=\"" + month_width_5.toString()  + "\">5</td>";
  str += "<td width=\"" + month_width_6.toString()  + "\">6</td>";
  str += "<td width=\"" + month_width_7.toString()  + "\">7</td>";
  str += "<td width=\"" + month_width_8.toString()  + "\">8</td>";
  str += "<td width=\"" + month_width_9.toString()  + "\">9</td>";
  str += "<td width=\"" + month_width_10.toString() + "\">10</td>";
  str += "<td width=\"" + month_width_11.toString() + "\">11</td>";
  str += "<td width=\"" + month_width_12.toString() + "\">12</td>";
  str += "</tr>";
  str += "<tr>";
  str += "<td height=23 width=\"" + m_w_width.toString() + "\" align=center>W</td>";
  str += "<td width=\"" + month_width_1.toString()  + "px\">"+weekno_1 + "</td>";
  str += "<td width=\"" + month_width_2.toString()  + "\">"+weekno_2 + "</td>";
  str += "<td width=\"" + month_width_3.toString()  + "\">"+weekno_3 + "</td>";
  str += "<td width=\"" + month_width_4.toString()  + "\">"+weekno_4 + "</td>";
  str += "<td width=\"" + month_width_5.toString()  + "\">"+weekno_5 + "</td>";
  str += "<td width=\"" + month_width_6.toString()  + "\">"+weekno_6 + "</td>";
  str += "<td width=\"" + month_width_7.toString()  + "\">"+weekno_7 + "</td>";
  str += "<td width=\"" + month_width_8.toString()  + "\">"+weekno_8 + "</td>";
  str += "<td width=\"" + month_width_9.toString()  + "\">"+weekno_9 + "</td>";
  str += "<td width=\"" + month_width_10.toString() + "\">"+weekno_10 + "</td>";
  str += "<td width=\"" + month_width_11.toString() + "\">"+weekno_11 + "</td>";
  str += "<td width=\"" + month_width_12.toString() + "\">"+weekno_12 + "</td>";
  str += "</tr>";
  str += "</table>";

  div.innerHTML = str;

  var div_style=div.style;
  div_style.left =0 + "px";
  div_style.top  =0 + "px";
   
  div_style.visibility = "visible";
    
}

function createWeeknoForEachMonth(){
  weekno_1 = 1;
  day_temp = new Date(todayYear,1,1);//month of js = real month -1
  weekno_2 = day_temp.getWeek();
  day_temp = new Date(todayYear,2,1);//month of js = real month -1
  weekno_3 = day_temp.getWeek();
  day_temp = new Date(todayYear,3,1);//month of js = real month -1
  weekno_4 = day_temp.getWeek();
  day_temp = new Date(todayYear,4,1);//month of js = real month -1
  weekno_5 = day_temp.getWeek();
  day_temp = new Date(todayYear,5,1);//month of js = real month -1
  weekno_6 = day_temp.getWeek();
  day_temp = new Date(todayYear,6,1);//month of js = real month -1
  weekno_7 = day_temp.getWeek();
  day_temp = new Date(todayYear,7,1);//month of js = real month -1
  weekno_8 = day_temp.getWeek();
  day_temp = new Date(todayYear,8,1);//month of js = real month -1
  weekno_9 = day_temp.getWeek();
  day_temp = new Date(todayYear,9,1);//month of js = real month -1
  weekno_10 = day_temp.getWeek();
  day_temp = new Date(todayYear,10,1);//month of js = real month -1
  weekno_11 = day_temp.getWeek();
  day_temp = new Date(todayYear,11,1);//month of js = real month -1
  weekno_12 = day_temp.getWeek();    
}

//-----------------------
// Today
//-----------------------

function showToday(){
  today_x = culcDateX(todayMonth, todayDate);
 
  dow = todayDay;
  if(dow == 0)
  {
    dow = 7;
  }

  var div = document.getElementById("divID_today");
  var str = "";
  str += "<TABLE border=0 cellspacing=0 cellpadding=0>";
  str += "<TBODY>";
  str += "<TR>";
  str += "<TD class=\"today\" bgcolor=\"#ff0060\"><FONT color=\"#FFFFFF\"><STRONG>";
  str += "W"+todayWeekno+"."+dow+" (" + todayMonth + "/"+ todayDate.toString()+ ")" /*+ "(dbg x="+Math.floor(today_x.toString())+")"*/;
//  str += "W"+todayWeekno+"."+todayDay+" = (" + todayMonth + "/"+ todayDate.toString()+ ")" ; 
  str += "</STRONG></FONT></TD>";
  str += "</TR>";
  str += "</TBODY>";
  str += "</TABLE>";

  div.innerHTML = str;
 

  var div_style=div.style;
  div_style.left =today_x + "px";
  div_style.top  =today_y + "px";
   
  div_style.visibility = "visible";
  
  //show line
  var div_line = document.getElementById("divID_today_line");
  var str_line = "";

  str_line += "<table border=0 cellspacing=0 cellpadding=0>";
  str_line += "<tr>";
  str_line += "<td class=\"today\" height=" + today_y.toString() + " width=0 rowspan=2 align=center>";
  str_line += "</td>";
  str_line += "</tr>";
  str_line += "</table>";

  div_line.innerHTML = str_line;

  var div_style_line=div_line.style;
  div_style_line.left =today_x + "px";
  div_style_line.top  =0 + "px";
   
  div_style_line.visibility = "visible";

}

function culcDateX(today_month, today_date)
{
  switch(today_month){
  case 1:
    month_start_x=month_start_x_1;
    break;
  case 2:
    month_start_x=month_start_x_2;
    break;
  case 3:
    month_start_x=month_start_x_3;
    break;
  case 4:
    month_start_x=month_start_x_4;
    break;
  case 5:
    month_start_x=month_start_x_5;
    break;
  case 6:
    month_start_x=month_start_x_6;
    break;
  case 7:
    month_start_x=month_start_x_7;
    break;
  case 8:
    month_start_x=month_start_x_8;
    break;
  case 9:
    month_start_x=month_start_x_9;
    break;
  case 10:
    month_start_x=month_start_x_10;
    break;
  case 11:
    month_start_x=month_start_x_11;
    break;
  case 12:
    month_start_x=month_start_x_12;
    break;
  default:
    month_start_x=0;
    break;
  }
  
  dateX = (
            month_start_x +
            (today_date -1)* px_per_day
          );
         

  return dateX;    
}

//-----------------------
// Selected day
//-----------------------

function showDaySelected(x){
  
  date_temp = culcDate(x);  
  weekno    =date_temp.getWeek();
  day       =date_temp.getDay();
  if(day==0)
  {
    day = 7;
  }

  month     =date_temp.getMonth()+1;
  date      =date_temp.getDate();
  
//  weekno = culcWeekno(x);
//  day=culcDayOfWeek(x);
 
    
  var div = document.getElementById("divID_selected");
  var str = "";
  str += "<TABLE border=0 cellspacing=0 cellpadding=0>";
  str += "<TBODY>";
  str += "<TR>";
  str += "<TD class=\"selected_day\" bgcolor=\"#9370db\"><FONT color=\"#FFFFFF\"><STRONG>";
  str += "W"+weekno+"."+day+" (" + month + "/" + date + ")" /*+ " dbg x=" + x + ")"*/; 
//  str += "W"+weekno+"."+day ; 
  str += "</STRONG></FONT></TD>";
  str += "</TR>";
  str += "</TBODY>";
  str += "</TABLE>";

  div.innerHTML = str;

  var div_style=div.style;
  
  if(x<month_start_x_1)
  {
    x=month_start_x_1;	
  }
  else if( x >= (month_start_x_12 + month_width_12))
  {
    x=month_start_x_12 + month_width_12;  	
  }
  
  div_style.left =x + "px";
  div_style.top  = 60 + "px";
   
  div_style.visibility = "visible"; 
  
  //show line
  var div_line = document.getElementById("divID_selected_day_line");
  var str_line = "";

  str_line += "<table border-style=dashed border=0 cellspacing=0 cellpadding=0>";
  str_line += "<tr>";
  str_line += "<td class=\"selected_day\" height=" + today_y.toString() + " width=0 rowspan=2 align=center>";
  str_line += "</td>";
  str_line += "</tr>";
  str_line += "</table>";

  div_line.innerHTML = str_line;

  var div_style_line=div_line.style;
  div_style_line.left =x + "px";
  div_style_line.top  =0 + "px";
   
  div_style_line.visibility = "visible";   
    
}

function culcDate(x){
  if(x >= month_start_x_12 + month_width_12)
  {
    month = 12;
    date=31;	
  }
  else if(x >= month_start_x_12)
  {
    month = 12;
    date=(x-month_start_x_12)/2+1;	
  }
  else if (x>=month_start_x_11)
  {
    month = 11;	
    date=(x-month_start_x_11)/2+1;	
  }
  else if (x>=month_start_x_10)
  {
    month = 10;	
    date=(x-month_start_x_10)/2+1;	
  }
  else if (x>=month_start_x_9)
  {
    month = 9;	
    date=(x-month_start_x_9)/2+1;	
  }
  else if (x>=month_start_x_8)
  {
    month = 8;	
    date=(x-month_start_x_8)/2+1;	
  }
  else if (x>=month_start_x_7)
  {
    month = 7;	
    date=(x-month_start_x_7)/2+1;	
  }
  else if (x>=month_start_x_6)
  {
    month = 6;	
    date=(x-month_start_x_6)/2+1;	
  }
  else if (x>=month_start_x_5)
  {
    month = 5;	
    date=(x-month_start_x_5)/2+1;	
  }
  else if (x>=month_start_x_4)
  {
    month = 4;	
    date=(x-month_start_x_4)/2+1;	
  }
  else if (x>=month_start_x_3)
  {
    month = 3;	
    date=(x-month_start_x_3)/2+1;	
  }
  else if (x>=month_start_x_2)
  {
    month = 2;	
    date=(x-month_start_x_2)/2+1;	
  }
  else if (x>=month_start_x_1)
  {
    month = 1;	
    date=(x-month_start_x_1)/2+1;	
  }
  else 
  {
    month = 1;	
    date=1;	
  }
  
  return new Date(todayYear, month-1, date);
}


