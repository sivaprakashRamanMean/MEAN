import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.scss'],
    animations: [routerTransition()]
})
export class TablesComponent implements OnInit {
    constructor() {}

    users: any;

    ngOnInit() {
        this.getUsers();
    }

    getUsers() {
        fetch('http://localhost:5000' + '/api/users/')
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                this.users = res.data;
            }
        });
    }
}
