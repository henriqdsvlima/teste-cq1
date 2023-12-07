export interface TableData {
	Dia: number;
	Data: string;
	Valor: number;
	VariacaoDiaAnterior: string; // Considerando que a variação seja uma string
	VariacaoPrimeiraData: string | null; // Considerando que a variação seja uma string ou nulo
}
