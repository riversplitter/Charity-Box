import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
import { Platform } from 'ionic-angular';

import { SqliteProvider } from '../../providers/sqlite/sqlite';

import { DonatePage } from '../donate/donate';

@IonicPage()
@Component({
  selector: 'page-box',
  templateUrl: 'box.html',
})
export class BoxPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toast: Toast,
    public plt: Platform,
    public sqliteProvider: SqliteProvider){
  }

    ionViewWillEnter() {
      this.sqliteProvider.totals();
    }

    ionViewDidLoad(){
      this.totals();
    }

    setInput(amt: number) {
      this.sqliteProvider.data.amount = amt + this.sqliteProvider.data.amount;
      }

    saveData(){
      if (this.sqliteProvider.data.amount > 0){
        this.sqliteProvider.saveData();
        this.toast.show('Added to Box!', '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
      }else{
        this.toast.show('Please Add Value', '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
      }
    }

    resetBox() {
      this.sqliteProvider.data.amount = 0
    }

    totals() {
      this.sqliteProvider.totals();
      if (this.sqliteProvider.boxTotal > 18){
        this.toast.show('Your Box is Full', '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
      }
    }

    donateBox() {
      if (this.sqliteProvider.boxTotal > 18){
        this.sqliteProvider.donateBox();
        this.toast.show('Opening Donation Page', '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
        this.navCtrl.push(DonatePage, {amount:18});
      }else{
        this.toast.show(`Your Box Isn't Full`, '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
      }
    }

}
