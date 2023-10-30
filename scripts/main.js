import Update from './modules/update.js';
import Delete from './modules/Delete.js';
import Search from './modules/Search.js';

if(document.querySelector('#update-btn')) new Update();
if(document.querySelector('#delete-btn')) new Delete();
if(document.querySelector('#search-form')) new Search();