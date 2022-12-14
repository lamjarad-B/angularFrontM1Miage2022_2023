// Modèle de classe pour les devoirs.
import { Course } from "./course.model";

export class Assignment
{
	_id?: string;
	id!: number;
	nom!: string;
	auteur!: string;
	course!: Course;
	dateDeRendu!: Date;
	remarque!: string;
	note!: number;
	rendu!: boolean;
}