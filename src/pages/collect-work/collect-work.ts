import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Headers, Http } from '@angular/http';
import { UserServiceProvider } from '../../providers/user-service/user-service';

@IonicPage()
@Component({
  selector: 'page-collect-work',
  templateUrl: 'collect-work.html',
})
export class CollectWorkPage {

  //数据存储
  items = [];
  rootNavCtrl: NavController;
  id;
  isIdark;

  constructor(public UserService: UserServiceProvider, public http: Http, public navCtrl: NavController, public navParams: NavParams) {
    this.isIdark = this.UserService.isIdark;
    this.rootNavCtrl = navParams.get('rootNavCtrl');
    this.id = this.navParams.data._id;
    this.getdata();
}

//获取数据
  getdata() {
    this.UserService.presentLoadingDefault();
    let url = "http://www.devonhello.com/chihu2/my_collect_work";

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post(url, "id=" + this.id + "&type=1", {
      headers: headers
    })
      .subscribe((res) => {
        this.UserService.presentLoadingDismiss();
        this.items = this.items.concat(res.json());
      });
  }

}
