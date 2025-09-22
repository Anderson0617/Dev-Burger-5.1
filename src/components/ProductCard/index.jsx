//horario de funcionamento
import React, { useState } from "react";

import {
	AddButton,
	Card,
	CardBody,
	CardFooter,
	CardImage,
	Description,
	Price,
	Title,
} from "./styles";

// Função centralizada de horário
const getStoreStatus = () => {
	const now = new Date();
	const currentDay = now.getDay(); // 0 = domingo
	const currentHour = now.getHours();
	const currentMinutes = now.getMinutes();

	// Configurações de horário
	const morningOpen = 10;
	const morningClose = 16;
	const eveningOpen = 18;
	const eveningClose = 24; // até 23:59

	// Domingo fechado
	if (currentDay === 0) {
		return { isOpen: false, message: "Fechado – Abrimos segunda-feira às 10:00" };
	}

	// Horário da manhã: 10:00–15:59
	if (
		(currentHour > morningOpen && currentHour < morningClose) ||
		(currentHour === morningOpen && currentMinutes >= 0)
	) {
		return { isOpen: true, message: "Aberto – Funcionamos até às 16:00" };
	}

	// Horário da noite: 18:00–23:59
	if (
		(currentHour > eveningOpen && currentHour < eveningClose) ||
		(currentHour === eveningOpen && currentMinutes >= 0)
	) {
		return { isOpen: true, message: "Aberto – Funcionamos até às 23:59" };
	}


	// Fora do horário
	if (currentHour < morningOpen) {
		return { isOpen: false, message: "Fechado – Abrimos hoje às 10:00" };
	}
	if (currentHour >= morningClose && currentHour < eveningOpen) {
		return { isOpen: false, message: "Fechado – Abrimos hoje às 18:00" };
	}
	if (currentHour > eveningClose) {
		return { isOpen: false, message: "Fechado – Abrimos amanhã às 10:00" };
	}

	// Fallback
	return { isOpen: false, message: "Fechado" };
};


const ProductCard = ({
	product,
	onAddToCart,
	onOpenQuantityModal,
	onOpenAddonModal,
}) => {
	const [isMixed, setIsMixed] = useState(false);
	const isBeverage = product.category === "Bebidas";

	// pega status da loja
	const { isOpen, message } = getStoreStatus();

	const handleAddClick = () => {
		if (!isOpen) return; // bloqueia clique se fechado
		if (product.requiresQuantityModal) {
			onOpenQuantityModal(product);
			return;
		}
		if (product.requiresAddonModal) {
			onOpenAddonModal(product);
			return;
		}
		onAddToCart(product);
	};

	return (
		<Card>
			<CardImage src={product.image} alt={product.name} $isBeverage={isBeverage} />
			<CardBody>
				<Title>{product.name}</Title>
				<Description>{product.description}</Description>
				<CardFooter>
					<Price>{`R$ ${product.price.toFixed(2).replace(".", ",")}`}</Price>
					<AddButton onClick={handleAddClick} disabled={!isOpen}>
						{isOpen ? "Adicionar" : message}
					</AddButton>
				</CardFooter>
			</CardBody>
		</Card>
	);
};

export default ProductCard;
