# Master Detail View

Simple Master Detail Class that helps handling master detail navigation in a vanilla js / ts environment.

This package is not tested for production nor checked against vulnerabilites. Use at own risk, I don't garantee for anything!


## Get started

First define yout html. You can use this class for popups or any other master detail view with one detail level. For a full example check out the repo.

The following is an example that uses a popup as detail view. 
 
```html
<h1>Master View</h1>

<div class="button" id="master1">Open Detail 1</div>
<div class="button" id="master2">Open Detail 2</div>

<div class="popup hidden">
    <h1>Detail View</h1>
    <div class="content"></div>
    <div class="button" id="back">Back</div>
</div>
``` 
[index.html](index.html)

To initialise the master detail view you have to pass your html elements to the MasterDetail class.

```javascript

let masterDetail = new MasterDetail(
  toMaster, // will be called on navigation to master
  toDetail, // will be called on naviggation to detail
  document.querySelector('#back'), // (optional) back button element
  document.querySelector('.content') // (optional) detail view content element
)

/**
 * Hide popup
 */
function toMaster() {
  document.querySelector('.popup')!.classList.add('hidden');
}

/**
 * Show popup
 */
function toDetail() {
  document.querySelector('.popup')!.classList.remove('hidden');
}

document.querySelector('#master1')?.addEventListener('click', () => {
  masterDetail.toDetail('<p>Hello popup 1!</p>');
});

document.querySelector('#master2')?.addEventListener('click', () => {
  masterDetail.toDetail('<p>Hello popup 2!</p>');
});

```
[main.ts](src/main.ts)