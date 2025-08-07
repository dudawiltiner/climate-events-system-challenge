import { format, isWithinInterval, parseISO } from "date-fns";
import { enUS } from "date-fns/locale/en-US";
import { ptBR } from "date-fns/locale/pt-BR";

const getLocale = (language: string) => {
  return language === "pt-BR" ? ptBR : enUS;
};

export const convertUTCToBahiaTime = (
  utcDateString: string,
  language: string = "pt-BR"
): string => {
  try {
    const date = parseISO(utcDateString);
    const locale = getLocale(language);

    return format(date, "dd/MM/yyyy HH:mm", { locale });
  } catch (error) {
    console.error("Erro ao converter data:", error);
    return utcDateString;
  }
};

export const formatDateRange = (
  inicio: string,
  fim: string,
  language: string = "pt-BR"
): string => {
  try {
    const startDate = parseISO(inicio);
    const endDate = parseISO(fim);
    const locale = getLocale(language);

    if (format(startDate, "dd/MM/yyyy") === format(endDate, "dd/MM/yyyy")) {
      const dateStr = format(startDate, "dd/MM/yyyy", { locale });
      const startTime = format(startDate, "HH:mm", { locale });
      const endTime = format(endDate, "HH:mm", { locale });
      return `${dateStr} ${startTime} - ${endTime}`;
    }

    const startFormatted = format(startDate, "dd/MM/yyyy HH:mm", { locale });
    const endFormatted = format(endDate, "dd/MM/yyyy HH:mm", { locale });

    return `${startFormatted} - ${endFormatted}`;
  } catch (error) {
    console.error("Erro ao formatar intervalo de datas:", error);
    return `${inicio} - ${fim}`;
  }
};

export const isEventActive = (inicio: string, fim: string): boolean => {
  try {
    const now = new Date();
    const startDate = parseISO(inicio);
    const endDate = parseISO(fim);

    return isWithinInterval(now, { start: startDate, end: endDate });
  } catch (error) {
    console.error("Erro ao verificar se evento está ativo:", error);
    return false;
  }
};

export const formatRelativeDate = (
  dateString: string,
  language: string = "pt-BR"
): string => {
  try {
    const { formatDistanceToNow } = require("date-fns");
    const date = parseISO(dateString);
    const locale = getLocale(language);

    return formatDistanceToNow(date, {
      addSuffix: true,
      locale,
      includeSeconds: false,
    });
  } catch (error) {
    console.error("Erro ao formatar data relativa:", error);
    return dateString;
  }
};

export const formatFullDate = (
  dateString: string,
  language: string = "pt-BR"
): string => {
  try {
    const date = parseISO(dateString);
    const locale = getLocale(language);

    return format(date, "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale });
  } catch (error) {
    console.error("Erro ao formatar data completa:", error);
    return dateString;
  }
};

export const isToday = (dateString: string): boolean => {
  try {
    const date = parseISO(dateString);
    const today = new Date();

    return format(date, "yyyy-MM-dd") === format(today, "yyyy-MM-dd");
  } catch (error) {
    console.error("Erro ao verificar se é hoje:", error);
    return false;
  }
};

export const getDayOfWeek = (
  dateString: string,
  language: string = "pt-BR"
): string => {
  try {
    const date = parseISO(dateString);
    const locale = getLocale(language);

    return format(date, "EEEE", { locale });
  } catch (error) {
    console.error("Erro ao obter dia da semana:", error);
    return "";
  }
};
