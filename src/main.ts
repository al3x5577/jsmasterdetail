import { MasterDetail } from './MasterDetail'
import './style.css'

let masterDetail = new MasterDetail(
  toMaster,
  toDetail,
  document.querySelector('#back'),
  document.querySelector('.content')
)

function toMaster() {
  document.querySelector('.popup')!.classList.add('hidden');
}

function toDetail() {
  document.querySelector('.popup')!.classList.remove('hidden');
}

document.querySelector('#master1')?.addEventListener('click', () => {
  masterDetail.toDetail('<p>Hello popup 1!</p>');
});

document.querySelector('#master2')?.addEventListener('click', () => {
  masterDetail.toDetail('<p>Hello popup 2!</p>');
});
