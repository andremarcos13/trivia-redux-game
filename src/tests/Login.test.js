import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import Login from '../pages/Login'

describe('Requisito 1 ao 3', () => {
  it('Testa se há um H1 como o conteúdo "Trivia"',
    () => {
      renderWithRouterAndRedux(<Login />);
      // Acesse
      const title = screen.getByRole('heading', {  name: /trivia/i, level: 1})
      // Interaja
      // Teste
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent('Trivia');
  });
  it(`Testa se há um input de email e nome
  E se o botão está habilitado ou desabilitado de acordo com o teste`, () => {
    //renderize sempre
    const { history } = renderWithRouterAndRedux(<App />);
    // Acesse
    const allInput = screen.getAllByRole('textbox');
    const playButton = screen.getByRole('button', {  name: /play/i});
    // Interaja
    expect(playButton).toBeInTheDocument();
    expect(playButton).toBeDisabled();
    userEvent.type(allInput[0], 'trybe@trybe.com');
    userEvent.type(allInput[1], 'trybe');
    // Teste
    expect(allInput[0]).toBeInTheDocument();
    expect(allInput[0]).toHaveValue('trybe@trybe.com');
    expect(allInput[1]).toBeInTheDocument();
    expect(allInput[1]).toHaveValue('trybe');
    expect(playButton).toBeEnabled();

    userEvent.click(playButton);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/game');
  });
  it('Testa o botão settings leva para a rota certa', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const settingsButton = screen.getByRole('button', {  name: /settings/i});
    expect(settingsButton).toBeInTheDocument();
    expect(settingsButton).toBeEnabled();
    userEvent.click(settingsButton);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/settings');

    const title = screen.getByRole('heading', {  name: /settings/i, level: 1})
    expect(title).toBeInTheDocument();
  });
  
})

//renderize sempre
// renderWithRouterAndRedux(<App />);
// Acesse
// Interaja
// Teste
