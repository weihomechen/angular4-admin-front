import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
        private route: Router,
        private TabControlService: TabControlService,
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
        $('.portlet').css('height', window.innerHeight - 120 + 'px');
    }


    public onSubmit() {
        console.log(this.form);
        // this.personManageService.addPerson(this.form).then(() => SweetAlert.alert('新增人员成功'))
    }

    cancel() {
        this.route.navigateByUrl('/base-data/person-list');
        this.TabControlService.closeTab({ name: '新增人员', link: '/base-data/person-add' });
    }

    public onDisableForm(formDisabled: boolean) {
        if (formDisabled) {
            this.form.disable();
        } else {
            this.form.enable();
        }
    }

}
