export class Assignment
{
	_id?: string;
	id!: number;
	nom!: string;
	auteur!: string;
	courseId!: number;
	dateDeRendu!: Date;
	remarque!: string;
	note!: number;
	rendu!: boolean;
}