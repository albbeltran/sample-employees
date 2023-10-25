import LoginForm from './modules/LoginForm.js';
import Search from './modules/Search.js';
import AddForm from './modules/AddForm.js';
import Render from './modules/Render.js';

// if the login form exists on the current page
if(document.querySelector('#login-form')) new LoginForm();

// if the search form exists on the current page
if(document.querySelector('#search-form')) new Search();

// if the add form exists on the current page
if(document.querySelector('#add-form')) {
    new AddForm();
}