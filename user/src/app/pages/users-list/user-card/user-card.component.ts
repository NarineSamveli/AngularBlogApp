import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})

export class UserCardComponent implements OnInit {
  user: any = {};
  @Input() userId: any;

  constructor(private userService: UserService) { }

  ngOnInit() {
    if (this.userId !== undefined) {
      this.userService.getUser(this.userId).subscribe((res: any) => {
        if (res.success){
          this.user = res.data;
        } else{
          alert('No user Found.');
        }
      });
    }
  }

}
