import {
	// HAMBÚRGUERES
	principalImg,
	guaraBatImg,
	batatImg,
	camaraoImg,
	cebolImg,
	//porçoes
	canrehesImg,
	burger1Img,
	burger2Img,
	burger3Img,
	burger4Img,
	burger5Img,
	burger6Img,
	burger7Img,
	burger8Img,

	// bebida
	guaranaImg,
	cocaImg,
	guaravitaImg,
	sukitaImg,
	pureza2Img,
	aguaImg
} from "../assets/images";


export const mockData = {
	// Principal
	dishOfTheDay: {
		id: 101,
		name: "Dev-Burger-5.1 Especial da Casa",
		description: "Acompanha batatas fritas crocantes e anéis de cebola, servido com molho especial da casa.",
		price: 28.99,
		image: principalImg,
	},

	products: [

		// --- HAMBÚRGUERES ---
		{
			id: 201,
			category: "Hambúrgueres",
			name: "Hambúrguer Clássico",
			description: "Pão de gergelim, alface, tomate, cebola, queijo.",
			price: 28.99,
			image: burger1Img,
		},
		{
			id: 202,
			category: "Hambúrgueres",
			name: "Hambúrguer com Bacon e Cheddar",
			description: "Carne suculenta, bacon crocante, cheddar e anéis.",
			price: 32.99,
			image: burger2Img,
		},
		{
			id: 203,
			category: "Hambúrgueres",
			name: "Hambúrguer Bacon & Alface",
			description: "Alface crocante, tomate, cebola, queijo e bacon.",
			price: 31.99,
			image: burger3Img,
		},
		{
			id: 204,
			category: "Hambúrgueres",
			name: "Hambúrguer Duplo Especial",
			description: "Duas carnes, bacon, queijo derretido, alface, tomate.",
			price: 38.99,
			image: burger4Img,
		},
		{
			id: 205,
			category: "Hambúrgueres",
			name: "Hambúrguer Duplo Simples",
			description: "Duas carnes, cheddar, alface e cebola.",
			price: 36.99,
			image: burger5Img,
		},
		{
			id: 206,
			category: "Hambúrgueres",
			name: "Hambúrguer com Bacon e Cheddar",
			description: "Uma carne, cheddar, bacon, alface e tomate.",
			price: 33.99,
			image: burger6Img,
		},
		{
			id: 207,
			category: "Hambúrgueres",
			name: "Hambúrguer com Batata e Refrigerante",
			description: "Carne, queijo, bacon, batata frita e refrigerante.",
			price: 39.99,
			image: burger7Img,
		},
		{
			id: 208,
			category: "Hambúrgueres",
			name: "Hambúrguer Completo",
			description: "Carne, cheddar, bacon, alface, tomate, picles, cebola.",
			price: 34.99,
			image: burger8Img,
		},

		// --- PORÇÕES ---
		{
			id: 301,
			category: "Porções",
			name: "Batatas Fritas + Guaravita",
			description: "Porção de batatas fritas crocantes acompanhada de um Guaravita gelado.",
			price: 20,
			image: guaraBatImg,
			requiresAddonModal: true,
			addon: {
				question: "Deseja adicionar mais um Guaravita por R$ 6,00?",
				name: "Guaravita Extra",
				price: 6.0,
				confirmText: "Sim, adicionar",
				denyText: "Não, obrigado",
			},
		},
		{
			id: 302,
			category: "Porções",
			name: "Batatas Fritas",
			description: "Clássica porção de batatas fritas crocantes.",
			price: 15,
			image: batatImg,
		},
		{
			id: 303,
			category: "Porções",
			name: "Camarões Crocantes",
			description: "Porção de camarões fritos crocantes servidos com gomos de limão.",
			price: 35,
			image: camaraoImg,
		},
		{
			id: 304,
			category: "Porções",
			name: "Anéis de Cebola",
			description: "Porção de anéis de cebola empanados e crocantes.",
			price: 18,
			image: cebolImg,
		},
		{
			id: 305,
			category: "Porções",
			name: "Camarão Recheado",
			description: "Camarões grandes e suculentos, recheados com tempero especial da casa.",
			price: 38,
			image: canrehesImg,//
		},

		// --- BEBIDAS ---
		{
			id: 401,
			category: "Bebidas",
			name: "Sukita",
			description: "2L",
			price: 10.0,
			image: sukitaImg,
		},
		{
			id: 402,
			category: "Bebidas",
			name: "Coca-Cola",
			description: "2L",
			price: 12.0,
			image: cocaImg,
		},
		{
			id: 403,
			category: "Bebidas",
			name: "Pakera Guaraná",
			description: "2L",
			price: 7.0,
			image: guaranaImg,
		},
		{
			id: 404,
			category: "Bebidas",
			name: "Guaravita",
			description: "290ml",
			price: 6.0,
			image: guaravitaImg,
		},
		{
			id: 405,
			category: "Bebidas",
			name: "Pureza",
			description: "Refrigerante 2L",
			price: 10.00,
			image: pureza2Img,
		},
		{
			id: 406,
			category: "Bebidas",
			name: "Água",
			description: "Água mineral 500ml",
			price: 3.50,
			image: aguaImg,
		},

	],
};
