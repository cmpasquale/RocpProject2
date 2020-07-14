// tslint:disable-next-line: import-spacing
import{Component} from '@angular/core';
import {ISuperhero} from './hero';

/* the component Decorator goes on the top of the component class it
defines the specific meta data for view(patch) this coponent will control/ represent.

view or path is the specific portion of the html page that this component is
responsible for
*/
@Component({
    selector: 'app-hero-list', // the selector property will be the tag name
    // used to reference this component in html. Also known as a component
    // directive.
    templateUrl:'./hero-list.component.html', // links the components html file or the 
    //component view.

    styleUrls: ['./hero-list.component.css'] //links the component css file or files to this
    // component view.

})

export class HeroListComponent{

    pageTitle = 'SuperHero List';

    filteredSuperHeroes: ISuperhero[];
    superheroes: ISuperhero[];

    showImage= false;
    
    attrListFilter= ' This is the intial Value';

    get listFilter(): string {
        return this.attrListFilter;
    }

    set listFilter(temp: string){
         this.attrListFilter = temp;
         this.filteredSuperHeroes=this.attrListFilter ?
         this.performFilter(this.attrListFilter): this.superheroes;

    }

    performFilter(filterBy: string): ISuperhero[]{
        filterBy=filterBy.toLocaleLowerCase();
        return this.superheroes.filter((metahuman:ISuperhero)=>
        metahuman.name.toLocaleLowerCase().indexOf(filterBy)!=-1);

    }
    toggleImage(): void{
        console.log(" image");
        this.showImage=!this.showImage;
    }

    starEventWasTriggered(temp: string):void{
        this.pageTitle=temp;
    }

    constructor() {
        this.superheroes=[
            {
                name: 'Frozone',
                rank: 4,
                ability: 'cold generation',
                organization: 'incredibles',
                image: 'http://www.cultjer.com/img/ug_photo/2014_03/sf2_lg20140331142439.jpg'
            },
            {
                name: 'Eraser Head',
                rank: 5,
                ability: 'power nullification',
                organization: 'pro hero',
                image: 'https://media.tenor.co/images/788cc935108fb487b6af1e152bcec6bf/raw'
            },
            {
                name: 'Static Shock',
                rank: 4.7,
                ability: 'electric manipulation',
                organization: 'duo',
                image: 'https://t00.deviantart.net/CsfqTmmnwQAltUe4HYS8A7gsk-s=/300x200/filters:fixed_height(100,100)' +
                    ':origin()/pre00/64ea/th/pre/f/2012/125/4/1/static_shock_by_deshockwav-d4ynm1o.png'
            },
            {
                name: 'Saitama',
                rank: 2.3,
                ability: 'punches',
                organization: 'the hero association',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnx0maPoLAqImOmsoTnxRwBronngiLYfeOVYFSSs2UBLsjXDDT&s'
            },
            {
                name: 'test',
                rank: 3,
                ability: 'test',
                organization:'test',
                image: ' '
            }

        ];

        this.filteredSuperHeroes= this.superheroes;
    }
    
}

