import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { CommonService } from '../../../commonService/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  @ViewChild('tabGroup', {static: false}) tabGroup: MatTabGroup;

  constructor(private commonService: CommonService, private router: Router){
    this.commonService.newUserId.subscribe(id => {
      this.tabGroup._tabs.toArray()[1].disabled = false;
      this.tabGroup.selectedIndex = 1;
    });
    if (!localStorage.getItem('loggedInUser')){
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
  }

  tabClick(tab) {
    // console.log(tab);
  }

}
