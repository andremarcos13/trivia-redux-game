import React from 'react';
import { screen, waitFor  } from '@testing-library/react';
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
  it(`Testa se há um input de email e nome`, () => {
    //renderize sempre
    const { history } = renderWithRouterAndRedux(<App />);
    // Acesse
    const allInput = screen.getAllByRole('textbox');
    const playButton = screen.getByRole('button', {  name: /play/i});
    // Interaja
    expect(playButton).toBeInTheDocument();
    userEvent.type(allInput[0], 'trybe@trybe.com');
    userEvent.type(allInput[1], 'trybe');
    // Teste
    expect(allInput[0]).toBeInTheDocument();
    expect(allInput[0]).toHaveValue('trybe@trybe.com');
    expect(allInput[1]).toBeInTheDocument();
    expect(allInput[1]).toHaveValue('trybe');

    // userEvent.click(playButton);
    // const { location: { pathname } } = history;
    // expect(pathname).toBe('/game');
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
  it('testa o token valido leva a pagina game', async () => {
    const api = [{ 
        response_code:0,
        response_message:"Token Generated Successfully!",
        token:"a11784453a517db0d1fad8b4839b66e2ff2ba57742b469cea90cf0c674aad118" 
    }];
    global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve(api),
      }));
      const { history } = renderWithRouterAndRedux(<App />);
      const btnPlay = screen.getByRole('button', {name: /Play/i});
        const inputName = screen.getByPlaceholderText('Ada Lovelance');
        const inputEmail = screen.getByPlaceholderText('ada@lovelance.com');
        expect(btnPlay).toBeDisabled();
        userEvent.type(inputName, 'asdasda');
        userEvent.type(inputEmail, 'asda@qewqda.com');
        expect(btnPlay).toBeEnabled();      
        userEvent.click(btnPlay);
        await waitFor(() => {
            const { pathname } = history.location;
            expect(pathname).toBe('/game')
        });       
  })
})

//renderize sempre
// renderWithRouterAndRedux(<App />);
// Acesse
// Interaja
// Teste
