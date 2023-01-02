export class Assignment
{
	_id?: string;
	id!: number;
	nom!: string;
	auteur!: string;
	course!: number | string;
	_course?: string;
	dateDeRendu!: Date | string;
	remarque!: string;
	note!: number;
	rendu!: boolean;
}