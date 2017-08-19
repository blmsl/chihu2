import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'class-item',
  templateUrl: 'class-item.html'
})
export class ClassItemComponent {

  arr:any = [
    '家常菜',
    '快手菜',
    '下饭菜',
    '早餐',
    '肉',
    '鱼',
    '蔬菜',
    '鸡蛋',
    '汤羹',
    '烘培',
    '主食',
    '面',
    '素食',
    '甜品',
    '其他'
  ];

  constructor(
    public navCtrl: NavController
  )
  {}

  openClass( name ){
    
    this.navCtrl.push( 'OpenClassPage',{
      class: name
    } );
  }

}
