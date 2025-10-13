import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() {
    this.createToastContainer();
  }

  private createToastContainer() {
    if (!document.getElementById('toast-container')) {
      const container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast toast-bottom toast-end';
      document.body.appendChild(container);
      // container.style.position = 'fixed';
      // container.style.top = '1rem';
      // container.style.right = '1rem';
      // container.style.zIndex = '9999';
      // document.body.appendChild(container);
      // return container;
    }
  }

  private createToastElement(message: string, alertClass: string, duration: number =5000) {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.classList.add('alert', alertClass, 'shadow-lg');
    toast.innerHTML = `
      <span>${message}</span>
      <button class="ml-4 btn btn-sm btn-ghost">x</button>
    `;

    toast.querySelector('button')?.addEventListener('click', () => {
      toast.remove();
    });

    //toastContainer.append(toast);
    toastContainer.appendChild(toast);
    // setTimeout(() => {
    //   toast.remove();
    // }, duration);
    // toast.style.minWidth = '250px';

    setTimeout(() => {
      if(toastContainer.contains(toast)){
        toastContainer.removeChild(toast);
      }
    }, duration);
  }

  success(message: string, duration?:number) {
    this.createToastElement(message, 'alert-success', duration);
  }

error(message: string, duration?:number) {
    this.createToastElement(message, 'alert-error', duration);
  }
  warning(message: string, duration?:number) {
    this.createToastElement(message, 'alert-warning', duration);
  }
  info(message: string, duration?:number) {
    this.createToastElement(message, 'alert-info', duration);
  }

  // <button class="ml-4 btn tbn-sm btn-ghost">x</button>
  // private createToastElement(message: string, type: 'success' | 'error' | 'info', duration: number){
  //   const toast = document.createElement('div');
  //   toast.className = `alert alert-${type} shadow-lg mb-4`;
  //   toast.style.minWidth = '250px';
  //   toast.style.maxWidth = '350px';
  // }
}
