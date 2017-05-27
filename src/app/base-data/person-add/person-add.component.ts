import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { PersonManageService } from '../person-manage.service';
import { TabControlService } from '../../layout/header/tab/tabControl.service';

declare var $: any;
declare var SweetAlert: any;

@Component({
    selector: 'app-person-add',
    templateUrl: './person-add.component.html',
    styleUrls: ['./person-add.component.css']
})
export class PersonAddComponent implements OnInit {

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

    constructor(private fb: FormBuilder,
        private tabControlService: TabControlService,
        private personManageService: PersonManageService
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
    }

    // 确认
    public onSubmit() {
        console.log(this.form);
        this.personManageService.addPerson(this.form).subscribe(() => SweetAlert.alert('新增人员成功'));
    }
    // 取消
    cancel() {
        this.tabControlService.closeTab();
    }

    public onDisableForm(formDisabled: boolean) {
        if (formDisabled) {
            this.form.disable();
        } else {
            this.form.enable();
        }
    }

}
