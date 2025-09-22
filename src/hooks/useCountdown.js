//horario de funcionamento
import { useEffect, useState } from "react";

// Configurações dos horários
const morningOpen = 10;
const morningClose = 16;
const eveningOpen = 18;
const eveningClose = 24; // até 23:59, meia-noite fecha

const useCountdown = () => {
	const calculateStatus = () => {
		const now = new Date();
		const currentDay = now.getDay(); // 0 = domingo
		const currentHour = now.getHours();
		const currentMinutes = now.getMinutes();

		let targetDate = new Date();
		let label = "";
		let isOpen = false;

		// Domingo fechado
		if (currentDay === 0) {
			const nextMonday = new Date();
			nextMonday.setDate(now.getDate() + ((1 + 7 - currentDay) % 7));
			nextMonday.setHours(morningOpen, 0, 0, 0);
			return {
				isOpen: false,
				label: "Abrimos em",
				targetDate: nextMonday,
			};
		}

		// Manhã aberta
		if (
			(currentHour > morningOpen && currentHour < morningClose) ||
			(currentHour === morningOpen && currentMinutes >= 0)
		) {
			targetDate.setHours(morningClose, 0, 0, 0);
			label = "Fechamos em";
			isOpen = true;
		}
		// Tarde fechada
		else if (currentHour >= morningClose && currentHour < eveningOpen) {
			targetDate.setHours(eveningOpen, 0, 0, 0);
			label = "Abrimos em";
			isOpen = false;
		}
		// Noite aberta
		else if (
			(currentHour > eveningOpen && currentHour < eveningClose) ||
			(currentHour === eveningOpen && currentMinutes >= 0)
		) {
			targetDate.setHours(eveningClose, 0, 0, 0);
			label = "Fechamos em";
			isOpen = true;
		}
		// Passou da meia-noite → só amanhã 10h
		else {
			targetDate.setDate(targetDate.getDate() + 1);
			targetDate.setHours(morningOpen, 0, 0, 0);
			label = "Abrimos em";
			isOpen = false;
		}

		return { isOpen, label, targetDate };
	};

	const [status, setStatus] = useState(() => {
		const { isOpen, label, targetDate } = calculateStatus();
		return {
			isOpen,
			label,
			difference: targetDate - new Date(),
		};
	});

	useEffect(() => {
		const timer = setInterval(() => {
			const { isOpen, label, targetDate } = calculateStatus();
			setStatus({
				isOpen,
				label,
				difference: targetDate - new Date(),
			});
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	const formatTime = (ms) => {
		if (ms <= 0) return "Em breve...";
		const totalSeconds = Math.floor(ms / 1000);
		const hours = Math.floor(totalSeconds / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		const seconds = totalSeconds % 60;
		return `${String(hours).padStart(2, "0")}h ${String(minutes).padStart(
			2,
			"0"
		)}m ${String(seconds).padStart(2, "0")}s`;
	};

	return {
		isOpen: status.isOpen,
		countdown: `${status.label} ${formatTime(status.difference)}`,
	};
};

export default useCountdown;
