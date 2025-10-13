import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css'
})
export class NotFound {
  private location = inject(Location);

  ngOnInit(): void {
    // Après le remplissage du cœur (~4s)
    setTimeout(() => {
      const loadingText = document.getElementById('loading-text');
      const failText = document.getElementById('fail-text');
      const heart = document.querySelector('.heart-loader') as HTMLElement;
      const btn = document.getElementById('retry-btn');

      if (loadingText) loadingText.style.opacity = '0';
      if (failText) failText.style.opacity = '1';
      
      // Le cœur tombe (effet tristesse)
      if (heart) heart.classList.add('fall');

      // Le bouton apparaît ensuite
      setTimeout(() => {
        if (btn) btn.classList.add('fade-in-visible');
      }, 1800);
    }, 4000);
  }

  goback(){
    this.location.back();
  }
}
