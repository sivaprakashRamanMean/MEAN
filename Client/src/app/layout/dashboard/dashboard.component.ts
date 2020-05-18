import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

const options = data => {
    return {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify(data)
    };
};

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {

    currentUser: any;
    appoinments: any [];
    constructor() {
        this.currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : {};
        this.getPaitentAppointments();
    }

    ngOnInit() {}


    getPaitentAppointments() {
        fetch(`http://localhost:5000/api/appointment?doctor=${this.currentUser._id}`).then(res => res.json())
                .then(res => {
                    if (res.success) {
                        this.appoinments = res.data.map((details) => {
                            return {...details , date: new Date(details.date).toLocaleString()};
                        });
                        if (res.message) {
                            alert(res.message);
                        }
                    }
                });
            }

    updateStatus(status, id) {
        fetch(`http://localhost:5000/api/appointment/update/${id}`,
        options({status}))
                .then(res => res.json())
                .then(res => {
                    if (res.success) {
                        if (res.message) {
                            alert(res.message);
                        }
                    }
                });
    }

}
