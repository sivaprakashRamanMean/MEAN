import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
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
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    phoneNumber: any = '';
    password: any = '';
    constructor(public router: Router) {}

    ngOnInit() {}

    onLoggedin() {
        if (this.phoneNumber && this.password) {
            fetch('http://localhost:5000' + '/api/users/login', options({username:this.phoneNumber , password: this.password}))
                .then(res => res.json())
                .then(res => {
                    if (res.success) {
                        localStorage.setItem('isLoggedin', 'true');
                        localStorage.setItem('currentUser', JSON.stringify(res.data));
                        if (res.data.type === 'p') {
                            this.router.navigate(['/paient-dashboard']);
                        } else if (res.data.type === 'a'){
                            this.router.navigate(['/admin-dashboard']);
                        } else {
                            this.router.navigate(['/dashboard']);
                        }
                    }
                });
        }
    }
}
