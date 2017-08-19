import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { Headers, Http } from '@angular/http';
import { UserServiceProvider } from '../../providers/user-service/user-service';

@IonicPage()
@Component({
  selector: 'page-my-work',
  templateUrl: 'my-work.html',
})
export class MyWorkPage {

  @ViewChild(Content) content: Content;
  items: any = [];
  uid: any;
  isIdark;

  constructor(public UserService: UserServiceProvider, public http: Http, public navCtrl: NavController, public navParams: NavParams) {
    this.isIdark = this.UserService.isIdark;
    if (this.navParams.get('id')) {
      this.uid = this.navParams.get('id');
    } else {
      this.uid = this.UserService._user._id;
    }
    this.getdata();
  }

  getdata() {
    this.UserService.presentLoadingDefault();
    let url = "http://www.devonhello.com/chihu2/my_work";

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post(url, "id=" + this.uid, {
      headers: headers
    })
      .subscribe((res) => {
        this.UserService.presentLoadingDismiss();
        this.items = res.json();
      });
  }

  //点击到顶部
  tapEvent(e) {
    this.content.scrollToTop();
  }

}
