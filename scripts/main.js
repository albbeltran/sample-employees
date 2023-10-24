import LoginForm from './modules/LoginForm.js';
import Search from './modules/Search.js';

// if the login form exists on the current page
if(document.querySelector('#login-form')) new LoginForm();

// if the search form exists on the current page
if(document.querySelector('#search-form')) new Search();