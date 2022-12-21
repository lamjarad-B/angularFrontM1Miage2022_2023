export class Assignment
{
	_id?: string;
	id!: number;
	nom!: string;
	auteur!: string;
	course!: number;
	dateDeRendu!: Date;
	remarque!: string;
	note!: number;
	rendu!: boolean;
}