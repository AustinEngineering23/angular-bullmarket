//Info on drop down menu found at
//https://blog.kevinchisholm.com/angular/get-value-selected-dropdown-menu-item/
//https://www.itsolutionstuff.com/post/angular-10-select-dropdown-example-tutorialexample.html

import {OnInit} from '@angular/core';
import {ViewChild, Component} from '@angular/core';
import {DxVectorMapComponent} from 'devextreme-angular';

import * as mapsData from 'devextreme/dist/js/vectormap-data/world.js';
import {ProfileService} from '../profile.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../auth/auth.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-profile-animalSelector',
  providers: [ProfileService],
  templateUrl: 'profile-animalSelector.component.html',
  styleUrls: ['profile-animalSelector.component.css']
})

export class ProfileAnimalSelectorComponent implements OnInit {

  animalList: any = ['', 'Bear', 'Bull'];
  selectedAnimal = '';
  showMessage = false;
  showSuccess = false;

  userAnimalObject;
  userAnimal;
  userAnimalName;
  userName;

  constructor(private authService: AuthService, private profileService: ProfileService) {
    this.userAnimalObject = this.profileService.getAnimal()
      .subscribe(val => {this.userAnimal = val;})

    this.userName = this.authService.getUserName();
  }

  ngOnInit(): void {
  }

  //grab the selected animal from the dropdown
  selectChangeHandler(event: any) {
    this.selectedAnimal = event.target.value;
    this.showSuccess = false;
    this.showMessage = false;
  }

  //if forms are validated, then update the animal fields
  updateAnimal() {
    if (!this.validateChoice())
      return;

    this.profileService.updateAnimal(this.userName, this.selectedAnimal);

    //If animal is valid but name is left blank, only update the animal
    if (!this.validateName())
    {
      location.reload();
      return;
    }

    //else update the name and refresh the page
    this.profileService.updateAnimalName(this.userName, this.userAnimalName)
    location.reload();
    }

  //for now accept anything that is not just a blank string
  validateName() {
    if (this.userAnimalName == null)
      return false
    else
      return true
  }

  //validate the dropdown menu
  validateChoice() {
    //Validating for future "validateChoice()" calls
    if (this.selectedAnimal != '' && this.selectedAnimal != this.userAnimal) {
      this.showSuccess = true;
      this.showMessage = false;
      console.log(this.selectedAnimal + '  ' + this.userAnimal)
    }
    else {
      this.showSuccess = false;
      this.showMessage = true;
    }

    //The success boolean also validates whether an animal can be updated or not
    return this.showSuccess;
  }

}
