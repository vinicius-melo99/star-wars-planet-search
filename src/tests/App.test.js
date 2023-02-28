import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import apiMock from './mocks/apiMock';

describe('Testes da página', () => {
  beforeEach(() => {
    
  })

  it('verifica se a página carrega com todos os elementos', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(apiMock),
    });
    render(<App />);
    const image = await screen.findByRole('img');
    const nameFilterInput = await screen.findByTestId('name-filter');
    const tableElement = await screen.findAllByTestId('planet-name');

    expect(image).toBeInTheDocument();
    expect(nameFilterInput).toBeInTheDocument();
    expect(tableElement).toHaveLength(10);
  });
});

describe('Testes de filtro', () => {
  it('verifica se é possível filtrar os planetas pelo nome', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(apiMock),
    });
    render(<App />);
    const nameFilterInput = await screen.findByTestId('name-filter');
    userEvent.type(nameFilterInput, 'a');
    const planets = await screen.findAllByTestId('planet-name');
    expect(planets).toHaveLength(7);
  
  });
  
  it('verifica se os filtros aplicados são exibidos', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(apiMock),
    });
    render(<App />);
    userEvent.selectOptions(
      await screen.findByTestId('column-filter'),
      'orbital_period',
    );
    const nameFilterInput = await screen.findByTestId('value-filter');
    const buttonFilter = await screen.findByTestId('button-filter');
    userEvent.type(nameFilterInput, '500');
    userEvent.click(buttonFilter);
    const filter = await screen.findByText(/orbital_period 0500/i);

    expect(filter).toBeInTheDocument();
  });
})