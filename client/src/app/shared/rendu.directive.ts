import { Directive, ElementRef } from "@angular/core";

@Directive({
	selector: "[appRendu]", // Nom du selecteur pour utiliser cette directive
})

export class RenduDirective {
	constructor(el:ElementRef) {
		el.nativeElement.style.color = "black";
		el.nativeElement.style.border = "1px solid black";
		el.nativeElement.style.backgroundColor = "LightGreen";

		//ici on pourrait modifier le contenu de l'élément
		//par ex: el.nativeElement.innerHTML=...
		//mettre des ecouteurs, appeler des méthodes....
	}
}