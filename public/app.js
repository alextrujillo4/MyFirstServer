import {MDCTopAppBar} from '@material/top-app-bar';
import {MDCRipple} from '@material/ripple';
import {MDCList} from '@material/list';

const list = new MDCList(document.querySelector('.mdc-list'));
const buttonRipple = new MDCRipple(document.querySelector('.mdc-button'));

const topAppBarElement = document.querySelector('.mdc-top-app-bar');
const topAppBar = new MDCTopAppBar(topAppBarElement);