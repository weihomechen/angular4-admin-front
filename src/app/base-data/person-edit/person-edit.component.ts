import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { PersonManageService } from '../person-manage.service';
import { TabControlService } from '../../layout/header/tab/tabControl.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';

declare var $: any;

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css']
})
export class PersonEditComponent implements OnInit {

  isEdit: boolean = true;
  person;
  public disableForm = false;
  public form: FormGroup;
  public name = new FormControl('', Validators.required);
  public team = new FormControl('', Validators.required);
  public sex = new FormControl('');
  public account = new FormControl('', Validators.required);
  public role = new FormControl('', Validators.required);
  public position = new FormControl('');
  public genders = [
    { value: '0', viewValue: '男' },
    { value: '1', viewValue: '女' }
  ];
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private tabControlService: TabControlService,
    private personManageService: PersonManageService,
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      'name': this.name,
      'team': this.team,
      'sex': this.sex,
      'account': this.account,
      'role': this.role,
      'position': this.position
    });
  }

  ngOnInit() {
    this.initFrom();
  }

  initFrom() {
    this.isEdit = this.activeRoute.snapshot.params.fragment === 'edit';
    const personId = this.activeRoute.snapshot.params.id;
    this.personManageService.getPersonById(personId).subscribe(personArr => {
      this.person = personArr.filter(person => person.id === personId)[0];
      const form = $('#person_edit_form');
      this.deserialize(form, this.person);
      this.isEdit || $("[name!='']", form).attr('readOnly', true);
    });
  }

  // 表格数据回填
  deserialize(form, obj) {
    const nodeList = $("[name!='']", form);
    nodeList.map((index, node) => {
      for (const key in obj) {
        if (key === $(node).attr('name')) {
          $(node).val(obj[key]);
        }
      }
    });
  }

  // 取消
  cancel() {
    this.tabControlService.closeTab();
  }

}
