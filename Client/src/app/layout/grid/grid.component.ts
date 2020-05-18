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
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss'],
    animations: [routerTransition()]
})
export class GridComponent implements OnInit {
    date: any;
    defaultStartTime = { hour: 13, minute: 30 };
    defaultEndTime = {hour: 14, minute: 30};
    doctorsList: any = [];
    doctor: any;
    reason: any;
    currentUser: any;
    constructor() {}

    ngOnInit() {
        this.currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : {};
        this.getDoctors();
    }

    appAppointment() {
        const {date, defaultStartTime, doctor, reason, defaultEndTime} = this;

        fetch('http://localhost:5000' + '/api/appointment/add',
        options({
            date: new Date(date.year, date.month, date.day), endTime: defaultEndTime.hour + ':' + this.defaultEndTime.minute , 
            defaultTime: defaultStartTime.hour + ':' + defaultStartTime.minute , doctor, reason, paient: this.currentUser._id}))
                .then(res => res.json())
                .then(res => {
                    if (res.success) {
                        if (res.message) {
                            alert(res.message);
                        }
                        this.date = '';
                        this.defaultStartTime = { hour: 13, minute: 30 };
                        this.defaultEndTime = {hour: 14, minute: 30};
                        this.reason = '';
                        this.doctor = '';
                    }
                });
    }

    getDoctors() {
        fetch('http://localhost:5000' + '/api/users/doctors')
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                this.doctorsList = res.data;
            }
        });
    }
}
