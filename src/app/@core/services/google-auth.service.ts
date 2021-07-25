import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GoogleBasicProfile } from '../models/google/google-basic-profile';
import { GoogleSignInOptions } from '../models/google/google-sign-in-options';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {


  client_id = environment.google_client_id;
  auth2: any;
  isLoadAuth2: boolean = false;
  googleUser = new GoogleBasicProfile();



  constructor() {

    // console.log('--------------- GoogleAuthService constructor');

    this.gapiLoad();

    // console.log('--------------- GoogleAuthService constructor end');

  }




  gapiLoad() {

    gapi.load('auth2', () => {

      // console.log('gapi.load auth2');
      this.auth2 = gapi.auth2.init({
        client_id: this.client_id,
        scope: 'profile'
      });


      this.auth2.then(() => {
        // console.log('this.auth2.then', result);
        this.isLoadAuth2 = true;
      });

      // console.log('------------ gapiLoad ------------', this.isloadgapi);
    });

  }


  isAuth2load(): Promise<boolean> {
    // console.log('1 ---------------- isAuth2load ');

    return new Promise((resolve, reject) => {

      let count = 1;

      if (this.isLoadAuth2 && this.auth2) {
        // console.log(' ---------------- isAuth2load = true');
        resolve(true);

      } else {


        const interval = setInterval(() => {
          // console.log('2 ---------------- isAuth2load setInterval', count);

          if (count > 1000) {
            console.error('gapi load error');
            clearInterval(interval);
            reject(false);
          }


          if (this.isLoadAuth2 && this.auth2) {
            clearInterval(interval);

            // console.log('3 ---------------- isAuth2load resolve(true); ');
            resolve(true);
          }

          count++;
        }, 100);

      }

    });

  }

  /**
   * Google 是否登入
   *
   * @returns {Promise<boolean>}
   * @memberof GoogleAuthService
   */
  isSignedIn(): Promise<boolean> {
    return new Promise((resolve, reject) => {

      this.isAuth2load().then((result) => {
        if (this.auth2.isSignedIn.get()) {
          // console.log('-------------- isSignedIn ------------', this.auth2.isSignedIn.get());
          this.setUserProfile();

          // resolve(true);

          if (this.checkTokenExpires()) {
            // console.log('this.checkTokenExpires', true);

            this.refreshAuthToken().then((re) => {
              resolve(true);

              // console.log(re);

            }).catch((re) => {
              // console.log('refreshAuthToken', re);

              reject(false);
            });

          } else {
            resolve(true);
          }



        } else {
          // console.log('-------------- isSignedIn ------------  else auth2.isSignedIn.get() ', false);
          reject(false);
        }


      }).catch(() => {
        // console.log('-------------- isSignedIn ------------  catch ', false);
        reject(false);

      });

    });



  }



  setUserProfile(): void {


    const profile = this.auth2.currentUser.get().getBasicProfile();
    const authResponse = this.auth2.currentUser.get().getAuthResponse(true);


    this.googleUser.id = profile.getId();
    this.googleUser.name = profile.getName();
    this.googleUser.email = profile.getEmail();
    this.googleUser.imageUrl = profile.getImageUrl();
    this.googleUser.givenName = profile.getGivenName();
    this.googleUser.familyName = profile.getFamilyName();

    this.googleUser.access_token = authResponse.access_token;
    this.googleUser.id_token = authResponse.id_token;
    this.googleUser.expires_at = authResponse.expires_at;



    console.log('google auth ---- setUserProfile ---', this.googleUser);
  }


  signIn(signInOptions?: GoogleSignInOptions) {
    // const options = Object.assign(Object.assign({}, this.initOptions), signInOptions);
    return new Promise((resolve, reject) => {
      // const offlineAccess = options && options.offline_access;
      // let promise = !offlineAccess
      //     ? this.auth2.signIn(signInOptions)
      //     : this.auth2.grantOfflineAccess(signInOptions);

      // let promise = this.auth2.grantOfflineAccess({ prompt: 'select_account' });
      // let promise = this.auth2.signIn(signInOptions);
      // { prompt: 'select_account' }

      this.isAuth2load().then((result) => {


        this.auth2.signIn(signInOptions)
          .then((response: any) => {

            // console.log(response);

            this.setUserProfile();

            resolve(this.googleUser);


          }, (closed: any) => {
            reject(closed);
          })
          .catch((err: any) => {
            reject(err);
          });


      });


    });
  }


  /**
   * 過期=true
   *
   * @returns {boolean}
   * @memberof GoogleAuthService
   */
  checkTokenExpires(): boolean {
    if (this.googleUser === undefined) {
      return true;
    }
    return this.googleUser.expires_at == undefined || this.googleUser.expires_at <= new Date().getTime();
  }


  refreshAuthToken() {

    console.log('refreshAuthToken');



    return new Promise((resolve, reject) => {

      // this.auth2.reloadAuthResponse()
      gapi.auth2.getAuthInstance().currentUser.get().reloadAuthResponse().then((response) => {

        console.log(response);
        this.setUserProfile();
        // console.log(this.googleUser);

        resolve(true);

      }).catch((err) => {
        console.log(err);
        reject(err);
      });

    });
  }


  signOut(revoke?: boolean) {
    return new Promise((resolve, reject) => {

      this.isAuth2load().then((result) => {


        let signOutPromise;
        if (revoke) {
          signOutPromise = this.auth2.disconnect();
        } else {
          signOutPromise = this.auth2.signOut();
        }
        signOutPromise
          .then((err: any) => {
            if (err) {
              reject(err);
            } else {
              // resolve();
            }
          })
          .catch((err: any) => {
            reject(err);
          });

      });

    });
  }


}
