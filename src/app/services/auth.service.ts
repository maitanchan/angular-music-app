import { Injectable, NgZone } from '@angular/core';
import { User } from '../models/user.model';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
export class UserRegister {
  uid?: string;
  displayName?: string;
  birth?:string;
  gener?:string;
  email?: string;
  password?:string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data

  private dbPath = 'users'

  userRef: AngularFirestoreCollection<UserRegister>;

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private db: AngularFirestore
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
    this.userRef = db.collection(this.dbPath)
  }

  Register(user: UserRegister):any{
      return this.userRef.add({...user})
  }

  private displayName: string | undefined;

  setDisplayName(name: string) {
    this.displayName = name;
  }

  getDisplayName(): string | undefined {
    return this.displayName;
  }

   login(email: string, password: string) {
    return this.afs
      .collection('users', (ref) => ref.where('email', '==', email).where('password', '==', password))
      .get()
      .toPromise()
      .then((querySnapshot) => {
        if (querySnapshot && !querySnapshot.empty) {
          // Lấy document đầu tiên vì chúng ta đã sử dụng where để lọc.
          const userDoc = querySnapshot.docs[0];

          // Lấy dữ liệu displayName từ document.
          const displayName = userDoc.get('displayName');

          // Lưu dữ liệu vào AuthService.
          this.setDisplayName(displayName);

          // Điều hướng đến trang home.
          this.router.navigate(['/client/home']);

          return Promise.resolve('Login successful');
        } else {
          return Promise.reject('Invalid email or password');
        }
      })
      .catch((error) => {
        console.error('Error during login:', error);
        return Promise.reject('Login failed');
      });
  }
  

  getUserData(uid: string) {
    return this.afs.collection('users').doc(uid).valueChanges();
  }

  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['songs']);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }
  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  // Sign out
  SignOut() {
    this.userData = null;
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }
}