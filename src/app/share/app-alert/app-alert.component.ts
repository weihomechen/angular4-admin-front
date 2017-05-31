import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
declare var SweetAlert: any;
@Component({
  selector: 'app-app-alert',
  templateUrl: './app-alert.component.html',
  styleUrls: ['./app-alert.component.css']
})
export class AppAlertComponent implements OnInit {

  constructor(
    private toastr: ToastsManager,
    private vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
  }

  alertSuccess() {
    SweetAlert.alert('操作成功', '成功提示');
  }

  alertNotice() {
    SweetAlert.notice('信息提示', '信息提示');
  }

  alertWarning() {
    SweetAlert.warning('警告的信息', '警告提示');
  }

  alertConfirm() {
    SweetAlert.confirm('需要确认', '', function () {
      SweetAlert.alert('点击了确认');
    });
  }

  toastrSuccess() {
    this.toastr.success('操作成功', '成功提示');
  }

  toastrNotice() {
    this.toastr.info('信息提示', '信息提示');
  }

  toastrWarning() {
    this.toastr.warning('警告的信息', '警告提示');
  }

  toastrConfirm() {
    this.toastr.error('发生错误', '错误提示');
  }

}
