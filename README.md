# Sistema de Monitoramento de Eventos Climáticos

Sistema web para visualização de eventos climáticos em tempo real, desenvolvido para o desafio técnico de frontend.

## ✅ Requisitos Atendidos

- **Lista de eventos** com filtros dinâmicos (tipo, gravidade, local/região)
- **Modal de detalhes** ao clicar em um evento
- **Interface responsiva** e acessível (ARIA, foco, contraste)
- **API fake simulada** com dados assíncronos
- **Conversão de datas** UTC para UTC-3 (Bahia)
- **Testes automatizados** com Cypress (177 testes - 100% sucesso)

## 🛠️ Tecnologias Utilizadas

- **Next.js 14** + **TypeScript** (framework e tipagem)
- **TanStack Query** (estado servidor)
- **Jotai** (estado global)
- **Tailwind CSS** (estilização)
- **Cypress** (testes E2E)
- **Leaflet** (mapa interativo)

## 🚀 Como Executar

```bash
# 1. Clone e instale
git clone https://github.com/dudawiltiner/climate-events-system-challenge
cd climate-events-system
npm install

# 2. Execute em desenvolvimento
npm run dev
# Acesse: http://localhost:3000

# 3. Execute os testes
npm run cy:run:component  # Testes de componentes
npm run cy:open          # Interface visual do Cypress
```

## 📁 Estrutura do Projeto

```
src/
├── components/           # Atomic Design
│   ├── atoms/           # Button, Input, Badge, Logo
│   ├── molecules/       # EventCard, EventFilters, EventModal
│   ├── organisms/       # Header, EventsList
│   └── screens/         # Home
├── context/             # Estado global (Jotai)
├── hooks/               # useEvents, useEventFilters, useLanguage
├── services/            # API simulada
├── dictionaries/        # Internacionalização (PT/EN)
└── utils/               # Funções utilitárias
```

## 🎯 Funcionalidades Implementadas

### Filtros Dinâmicos

- **Tipo de Evento**: 6 tipos (onda de calor, enchente, vendaval, etc.)
- **Gravidade**: 3 níveis (baixa, média, alta)
- **Localização**: Busca por texto
- **Regiões**: Mapa interativo do Brasil

### Responsividade

- **Mobile**: Layout em coluna única
- **Tablet**: Grid de 2 colunas
- **Desktop**: Grid de 3 colunas

### Acessibilidade

- Navegação completa por teclado
- ARIA labels e descrições
- Contraste de cores adequado
- Gerenciamento de foco no modal

### Conversão de Datas

```typescript
// UTC: "2025-08-01T20:00:00Z"
// UTC-3: "01/08/2025 17:00"
```

## 🧪 Testes

- **177 testes** executando com 100% de sucesso
- **Cobertura completa** de todos os componentes
- **Testes E2E** com Cypress
- **Testes de acessibilidade** e responsividade

```bash
# Resultados dos testes
✔ 17 arquivos de teste
✔ 177/177 testes passando
✔ 0 falhas
```

## 📊 Dados da API Fake

A API é simulada com 10 eventos climáticos diversos:

```json
{
  "id": "1",
  "tipo": "onda_de_calor",
  "local": "Fortaleza - CE",
  "gravidade": "alta",
  "inicio": "2025-07-30T10:00:00Z",
  "fim": "2025-08-01T18:00:00Z",
  "descricao": "Temperaturas 5ºC acima da média..."
}
```

## 📝 Documentação

Para detalhes sobre decisões técnicas, consulte **[DECISIONS.md](./DECISIONS.md)**

## 🌟 Destaques Técnicos

- **Estado Global/Local**: Uso estratégico de Jotai e useState
- **Performance**: TanStack Query para cache inteligente
- **UX**: Loading states, error handling, feedback visual
- **Internacionalização**: Suporte completo PT/EN
- **Clean Code**: Atomic Design, TypeScript strict
- **Zero bibliotecas de UI**: Componentes 100% customizados

---

**Desenvolvido seguindo as melhores práticas de React/Next.js para avaliação técnica**
