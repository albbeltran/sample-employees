import Update from './modules/update.js';
import Delete from './modules/Delete.js';
import Search from './modules/Search.js';
import Add from './modules/Add.js';

if(document.querySelector('#add-form')) new Add();
if(document.querySelector('#update-btn')) new Update();
if(document.querySelector('#delete-btn')) new Delete();
if(document.querySelector('#search-form')) new Search();