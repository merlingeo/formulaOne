import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-constructor-details',
  standalone: true,
  imports: [],
  templateUrl: './constructor-details.component.html',
  styleUrl: './constructor-details.component.scss'
})
export class ConstructorDetailsComponent {

  @Input()
  pageTitle!: any;
  

  getLargeImageUrlFromWikipedia(pageTitle: any) {
    const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&titles=${pageTitle}&pithumbsize=500&pilicense=any&origin=*`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const pageId = Object.keys(data.query.pages)[0];
            const imageUrl = data.query.pages[pageId].original.source;
            this.displayImage(imageUrl);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
  } 

   displayImage(imageUrl: string) {
    
}
}
