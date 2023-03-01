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

describe('Testes de aplicação de filtro', () => {
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

  it('verfica se o filtro "menor que" é funcional', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(apiMock),
    });
    render(<App />);

    userEvent.selectOptions(
      await screen.findByTestId('column-filter'),
      'diameter',
    );
    userEvent.selectOptions(
      await screen.findByTestId('comparison-filter'),
      'menor que',
    );
    const valueFilterInput = await screen.findByTestId('value-filter');
    const buttonFilter = await screen.findByTestId('button-filter');
    userEvent.type(valueFilterInput, '10000');
    userEvent.click(buttonFilter);

    const allPlanets = await screen.findAllByTestId('planet-name');
    expect(allPlanets).toHaveLength(3);
  });

  it('verfica se o filtro "maior que" é funcional', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(apiMock),
    });
    render(<App />);

    userEvent.selectOptions(
      await screen.findByTestId('column-filter'),
      'diameter',
    );
    userEvent.selectOptions(
      await screen.findByTestId('comparison-filter'),
      'maior que',
    );
    const valueFilterInput = await screen.findByTestId('value-filter');
    const buttonFilter = await screen.findByTestId('button-filter');
    userEvent.type(valueFilterInput, '10000');
    userEvent.click(buttonFilter);

    const allPlanets = await screen.findAllByTestId('planet-name');
    expect(allPlanets).toHaveLength(7);
  });

  it('verfica se o filtro "igual a" é funcional', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(apiMock),
    });
    render(<App />);

    userEvent.selectOptions(
      await screen.findByTestId('column-filter'),
      'surface_water',
    );
    userEvent.selectOptions(
      await screen.findByTestId('comparison-filter'),
      'igual a',
    );
    const valueFilterInput = await screen.findByTestId('value-filter');
    const buttonFilter = await screen.findByTestId('button-filter');
    userEvent.clear(valueFilterInput);
    userEvent.type(valueFilterInput, '100');
    userEvent.click(buttonFilter);

    const allPlanets = await screen.findAllByTestId('planet-name');
    expect(allPlanets).toHaveLength(2);
    const planet1 = await screen.findByText(/hoth/i);
    const planet2 = await screen.findByText(/kamino/i);
    expect(planet1).toBeInTheDocument();
    expect(planet2).toBeInTheDocument();
  });
});

describe('Teste de remoção de filtros', () => {
  it('testa se ao remover um filtro, o valor anterior da tabela é resturado', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(apiMock),
    });
    render(<App />);

    userEvent.selectOptions(
      await screen.findByTestId('column-filter'),
      'rotation_period',
    );
    userEvent.selectOptions(
      await screen.findByTestId('comparison-filter'),
      'maior que',
    );
    const valueFilterInput = await screen.findByTestId('value-filter');
    const buttonFilter = await screen.findByTestId('button-filter');
    userEvent.clear(valueFilterInput);
    userEvent.type(valueFilterInput, '24');
    userEvent.click(buttonFilter);

    expect(await screen.findAllByTestId('planet-name')).toHaveLength(2);
    const removeFilterBtn = await screen.findAllByRole('button', { name: /remover/i});
    userEvent.click(removeFilterBtn[0]);
    expect(await screen.findAllByTestId('planet-name')).toHaveLength(10);
  });

  it('Testa múltiplas remoções de filtros', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(apiMock),
    });
    render(<App />);
    const valueFilterInput = await screen.findByTestId('value-filter');
    const buttonFilter = await screen.findByTestId('button-filter');

    userEvent.selectOptions(
      await screen.findByTestId('column-filter'),
      'rotation_period',
    );
    userEvent.selectOptions(
      await screen.findByTestId('comparison-filter'),
      'maior que',
    );
    userEvent.clear(valueFilterInput);
    userEvent.type(valueFilterInput, '20');
    userEvent.click(buttonFilter);

    userEvent.selectOptions(
      await screen.findByTestId('column-filter'),
      'orbital_period',
    );
    userEvent.selectOptions(
      await screen.findByTestId('comparison-filter'),
      'menor que',
    );
    userEvent.clear(valueFilterInput);
    userEvent.type(valueFilterInput, '400');
    userEvent.click(buttonFilter);

    userEvent.selectOptions(
      await screen.findByTestId('column-filter'),
      'diameter',
    );
    userEvent.selectOptions(
      await screen.findByTestId('comparison-filter'),
      'igual a',
    );
    userEvent.clear(valueFilterInput);
    userEvent.type(valueFilterInput, '10465');
    userEvent.click(buttonFilter);

    expect(await screen.findAllByTestId('planet-name')).toHaveLength(1);

    const removeBtns = screen.getAllByRole('button', { name: /remover/i })
    userEvent.click(removeBtns[3]);
    expect(screen.getAllByTestId('planet-name')).toHaveLength(5);
    userEvent.click(removeBtns[2]);
    expect(screen.getAllByTestId('planet-name')).toHaveLength(8);
    userEvent.click(removeBtns[1]);
    expect(screen.getAllByTestId('planet-name')).toHaveLength(10);
    
  });

  it('testa se a multipla remoção funciona, quando o primeiro filtro é de igualdade', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(apiMock),
    });
    render(<App />);
    const valueFilterInput = await screen.findByTestId('value-filter');
    const buttonFilter = await screen.findByTestId('button-filter');

    userEvent.selectOptions(
      await screen.findByTestId('column-filter'),
      'rotation_period',
    );
    userEvent.selectOptions(
      await screen.findByTestId('comparison-filter'),
      'igual a',
    );
    userEvent.clear(valueFilterInput);
    userEvent.type(valueFilterInput, '24');
    userEvent.click(buttonFilter);

    userEvent.selectOptions(
      await screen.findByTestId('column-filter'),
      'orbital_period',
    );
    userEvent.selectOptions(
      await screen.findByTestId('comparison-filter'),
      'menor que',
    );
    userEvent.clear(valueFilterInput);
    userEvent.type(valueFilterInput, '400');
    userEvent.click(buttonFilter);

    const removeBtns = screen.getAllByRole('button', { name: /remover/i });

    userEvent.click(removeBtns[2]);
    expect(screen.getAllByTestId('planet-name')).toHaveLength(3);
    userEvent.click(removeBtns[1]);
    expect(screen.getAllByTestId('planet-name')).toHaveLength(10);

  })

  it('verifica se o filtro aplicado é removido da lista de filtros', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(apiMock),
    });
    render(<App />);

    const valueFilterInput = await screen.findByTestId('value-filter');
    const buttonFilter = await screen.findByTestId('button-filter');

    userEvent.selectOptions(
      await screen.findByTestId('column-filter'),
      'population',
    );
    userEvent.selectOptions(
      await screen.findByTestId('comparison-filter'),
      'maior que',
    );
    userEvent.clear(valueFilterInput);
    userEvent.type(valueFilterInput, '4500000000');
    userEvent.click(buttonFilter);

    const list = screen.getByTestId('column-filter');
    expect(list.children[0].innerHTML).toBe('orbital_period');

    userEvent.selectOptions(
      await screen.findByTestId('column-filter'),
      'orbital_period',
    );
    userEvent.selectOptions(
      await screen.findByTestId('comparison-filter'),
      'maior que',
    );
    userEvent.clear(valueFilterInput);
    userEvent.type(valueFilterInput, '300');
    userEvent.click(buttonFilter);

    userEvent.selectOptions(
      await screen.findByTestId('column-filter'),
      'diameter',
    );
    userEvent.selectOptions(
      await screen.findByTestId('comparison-filter'),
      'maior que',
    );
    userEvent.clear(valueFilterInput);
    userEvent.type(valueFilterInput, '300');
    userEvent.click(buttonFilter);

    userEvent.selectOptions(
      await screen.findByTestId('column-filter'),
      'rotation_period',
    );
    userEvent.selectOptions(
      await screen.findByTestId('comparison-filter'),
      'maior que',
    );
    userEvent.clear(valueFilterInput);
    userEvent.type(valueFilterInput, '10');
    userEvent.click(buttonFilter);


    userEvent.selectOptions(
      await screen.findByTestId('column-filter'),
      'surface_water',
    );
    userEvent.selectOptions(
      await screen.findByTestId('comparison-filter'),
      'maior que',
    );
    userEvent.clear(valueFilterInput);
    userEvent.type(valueFilterInput, '10');
    userEvent.click(buttonFilter);

    const list2 = screen.getByTestId('column-filter');
    expect(list2.children).toHaveLength(0);
  });
});

describe('testes de ordenação', () => {

  it('teste de ordenação do menor para o maior', async () => {
      jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(apiMock),
    });
    render(<App />);
    
    let planets = await screen.findAllByTestId('planet-name');
    const radioAsc = await screen.findByTestId('column-sort-input-asc');
    const sortBtn = await screen.findByTestId('column-sort-button');

    userEvent.selectOptions(
      await screen.findByTestId('column-sort'),
      'surface_water',
    );

    userEvent.click(radioAsc);
    userEvent.click(sortBtn);
    
    planets = await screen.findAllByTestId('planet-name');
    expect(planets[0].innerHTML).toContain('Bespin');

  });

  it('teste de ordenação do maior para o menor', async () => {
    jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(apiMock),
  });
  render(<App />);
  
  let planets = await screen.findAllByTestId('planet-name');
  const radioAsc = await screen.findByTestId('column-sort-input-desc');
  const sortBtn = await screen.findByTestId('column-sort-button');

  userEvent.selectOptions(
    await screen.findByTestId('column-sort'),
    'surface_water',
  );

  userEvent.click(radioAsc);
  userEvent.click(sortBtn);
  
  planets = await screen.findAllByTestId('planet-name');
  expect(planets[0].innerHTML).toContain('Hoth');

});
  
});