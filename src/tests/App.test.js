import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('Verifica se o número de colunas da tabela está correto', () => {
  render(<App />);
  // Referência para inserir a role columnheader: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/columnheader_role;
  const columns = screen.getAllByRole('columnheader');
  expect(columns.length).toBe(13);
});

test('Verifica se o filtro por nome do planeta funciona corretamente', async () => {
  render(<App />);
  const nameFilter = screen.getByTestId('name-filter');
  expect(nameFilter).toBeInTheDocument();
  
  userEvent.type(nameFilter, 'End');

  const endor = await screen.findByText('Endor');
  // Referência para inserir toBeDefined como matcher, para verificar que o elemento retornado da API não é undefined: https://jestjs.io/pt-BR/docs/expect#tobedefined;
  expect(endor).toBeDefined();
});

test('Verifica se há elementos necessários para realizar a filtragem numérica', () => {
  render(<App />);
  const columnFilter = screen.getByTestId('column-filter');
  expect(columnFilter).toBeInTheDocument();

  const comparisonFilter = screen.getByTestId('comparison-filter');
  expect(comparisonFilter).toBeInTheDocument();

  const valueFilter = screen.getByTestId('value-filter');
  expect(valueFilter).toBeInTheDocument();
});

test('Verifica se a filtragem numérica é feita corretamente', () => {
  render(<App />);
  const columnFilter = screen.getByTestId('column-filter');
  userEvent.selectOptions(columnFilter, 'diameter');

  const comparisonFilter = screen.getByTestId('comparison-filter');
  userEvent.selectOptions(comparisonFilter, 'maior que');

  const valueFilter = screen.getByTestId('value-filter');
  userEvent.type(valueFilter, '8900');

  const buttonFilter = screen.getByTestId('button-filter');
  userEvent.click(buttonFilter);

  const bespin = screen.findByText('Bespin');
  expect(bespin).toBeDefined();
 
  const naboo = screen.findByText('Naboo');
  expect(naboo).toBeDefined();

  const coruscant = screen.findByText('Coruscant');
  expect(coruscant).toBeDefined();
});
