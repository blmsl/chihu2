import { Component, Input, OnInit } from '@angular/core';
import { UserServiceProvider } from '../../../providers/user-service/user-service';
import { Headers, Http } from '@angular/http';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class HeaderComponent implements OnInit {

  @Input() data: any = {};
  //是否关注
  isfork: boolean = false;
  isIdark;

  constructor(public UserService: UserServiceProvider, public http: Http, public navCtrl: NavController) {
    this.isIdark = this.UserService.isIdark;
  }

  ngOnInit() {

    this.checkfork();

  }

  //关注
  fork() {
    this.checkfork();
    if (this.isfork) {
      return true;
    }
    this.UserService.presentLoadingDefault();
    if (this.UserService._user._id != this.data['uid'] && this.UserService._user._id) {
      let url = "http://www.devonhello.com/chihu2/forkuser";

      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');

      this.http.post(url, "uid=" + this.data['uid'] + "&id=" + this.UserService._user._id + "&name=" + this.UserService._user.nickname + "&uname=" + this.data['name'] + "&userimg=" + this.UserService._user.userimg + "&uuserimg=" + this.data['userimg'], {
        headers: headers
      })
        .subscribe((res) => {
          if (res.json()) {
            this.isfork = true;
          }
          this.UserService.get_fork_user();
        });
    } else {
      this.UserService.presentLoadingDismiss();
      if (this.UserService._user._id) {
        return true;
      }
      this.navCtrl.push("LoginPage");
    }
  }

  //查看TA的个人页面
  pushPersonPage(_id) {
    this.navCtrl.push('PersonalPage', {
      _id: _id
    });
  }

  //检查是否已经关注
  checkfork() {

    this.isfork = this.UserService.checkisfork(this.data['uid']);

  }

  //取消关注
  unfork() {
    this.checkfork();
    if (!this.isfork) {
      return true;
    }
    this.UserService.presentLoadingDefault();
    let url = "http://www.devonhello.com/chihu2/unforkuser";

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post(url, "uid=" + this.data['uid'] + "&id=" + this.UserService._user._id, {
      headers: headers
    })
      .subscribe((res) => {
        if (res.json()) {
          this.isfork = false;
        }
        this.UserService.get_fork_user();
      });
  }

  //打开问题
  pushQuestionPage(_id) {
    this.navCtrl.push('QuestionPage', {
      _id: _id
    });
  }

}
