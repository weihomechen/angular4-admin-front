import { Component, OnInit } from '@angular/core';

import { MdlDefaultTableModel, IMdlTableModelItem } from '@angular-mdl/core';

declare var $: JQueryStatic;

export interface ITableItem extends IMdlTableModelItem {
  name: string;
  sex: string;
  team: string;
  account: string;
  role: string;
  position: string;
}

@Component({
  selector: 'app-demo1',
  templateUrl: './demo1.component.html',
  styleUrls: ['./demo1.component.css']
})
export class Demo1Component implements OnInit {

  tableData: [ITableItem] = [
    { name: '叶秋', sex: '男', team: '兴欣', account: '君莫笑', role: '散人', position: '队长', selected: true },
    { name: '苏沐橙', sex: '女', team: '兴欣', account: '风梳烟沐', role: '枪炮师', position: '队员', selected: false },
    { name: '方锐', sex: '男', team: '兴欣', account: '海无量', role: '气功师', position: '队员', selected: false }
  ];

  selected: Array<ITableItem> = new Array<ITableItem>();

  public tableModel = new MdlDefaultTableModel([
    { key: 'name', name: '姓名', sortable: true },
    { key: 'sex', name: '性别', sortable: true },
    { key: 'team', name: '队伍', sortable: true },
    { key: 'account', name: '账号', sortable: true },
    { key: 'role', name: '角色', sortable: true },
    { key: 'position', name: '职位', sortable: true },
  ]);
  text1: string;
  text2: string;
  text3: string;

  constructor() { }
  ngOnInit() {
    this.tableModel.addAll(this.tableData);
    this.selected = this.tableData.filter(data => data.selected);
  }

  initTable() {
    $('#example').DataTable({
      columnDefs: [
        {
          targets: [0, 1, 2],
          className: 'mdl-data-table__cell--non-numeric'
        }
      ]
    });
  }

  selectionChanged($event) {
    this.selected = $event.value;
  }

  onInputBlur(event) {

  }

  onInputFocus(event) {
  }

  onInputKeyup(event) { }

}
