
//horario de funcionamento  foto principal
import React from "react";
import { AddButton, Card, Description, Footer, Price, Title } from "./styles";

// Função que retorna status da loja
const getStoreStatus = () => {
  const now = new Date();
  const currentDay = now.getDay(); // 0 = domingo
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();

  // Configurações de horário
  const morningOpen = 10;
  const morningClose = 16;
  const eveningOpen = 18;
  const eveningClose = 23; // até 23h59

  // Domingo fechado
  if (currentDay === 0) {
    return { isOpen: false, message: "Fechado – Abrimos segunda-feira às 10:00" };
  }

  // Horário da manhã: 10:00–16:00
  if (currentHour >= morningOpen && currentHour < morningClose) {
    return { isOpen: true, message: "Aberto – Funcionamos até às 16:00" };
  }

  // Horário da noite: 18:00–23:59
  if (currentHour >= eveningOpen && currentHour <= eveningClose) {
    return { isOpen: true, message: "Aberto – Funcionamos até às 00:00" };
  }

  // Entre 16:00 e 18:00 (intervalo fechado)
  if (currentHour >= morningClose && currentHour < eveningOpen) {
    return { isOpen: false, message: "Fechado – Abrimos hoje às 18:00" };
  }

  // Antes das 10:00
  if (currentHour < morningOpen) {
    return { isOpen: false, message: "Fechado – Abrimos hoje às 10:00" };
  }

  // Após 23:00
  if (currentHour > eveningClose) {
    return { isOpen: false, message: "Fechado – Abrimos amanhã às 10:00" };
  }

  // fallback (não deveria chegar aqui)
  return { isOpen: false, message: "Fechado" };
};



const DishOfTheDayCard = ({ product, onOpenAddonModal }) => {
  const { isOpen, message } = getStoreStatus();

  return (
    <Card $image={product.image}> 
      <Title>{product.name}</Title>
      <Description>{product.description}</Description>
      <Footer>
        <Price>{`R$ ${product.price.toFixed(2).replace(".", ",")}`}</Price>
        <AddButton
          onClick={() => onOpenAddonModal(product)}
          disabled={!isOpen}
          style={{ padding: "0.8rem 1.5rem", fontSize: "1rem" }}
        >
          {isOpen ? "Adicionar ao Pedido" : message}
        </AddButton>
      </Footer>
    </Card>
  );
};

export default DishOfTheDayCard;
