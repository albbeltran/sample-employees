import Update from './modules/update.js';
import Delete from './modules/Delete.js';

if(document.querySelector('#update-btn')) new Update();
if(document.querySelector('#delete-btn')) new Delete();