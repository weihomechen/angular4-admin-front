import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MdlModule } from '@angular-mdl/core';

declare var $: any;

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

    constructor(private fb: FormBuilder) {
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
    }

    public onDisableForm(formDisabled: boolean) {
        if (formDisabled) {
            this.form.disable();
        } else {
            this.form.enable();
        }
    }

}
