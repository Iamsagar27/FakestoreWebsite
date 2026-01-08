import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FakestoreApiService } from '../../core/api/fakestore-api.service';
import { storage } from '../../core/utils/storage';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoaderComponent
  ],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  loginForm: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private api: FakestoreApiService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['mor_2314', Validators.required],
      password: ['83r5^_', Validators.required]
    });
  }

  submit(): void {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.error = null;

    const { username, password } = this.loginForm.value;
    this.api.login(username, password).subscribe({
      next: (res) => {
        storage.set('token', res.token);
        this.router.navigate(['/home']);
      },
      error: () => {
        this.error = 'Invalid username or password';
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
