import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    animations: [routerTransition()]
})
export class FormComponent implements OnInit {
    currentUser: any;
    appoinments: any = [];
    doctorsList: any = [];
    constructor() {}

    ngOnInit() {
        this.currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : {};
        this.getDoctors();
        this.getPaitentAppointments();
    }

    getPaitentAppointments() {
        fetch(`http://localhost:5000/api/appointment?paient=${this.currentUser._id}`).then(res => res.json())
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

    getDoctors() {
        fetch('http://localhost:5000' + '/api/users/doctors')
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                this.doctorsList = res.data;
            }
        });
    }

    getDocName(id:any) {
        return this.doctorsList.find((data) => data._id == id).name;
    }
}
