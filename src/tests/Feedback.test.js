import React from 'react';
import { player2corrects, player4corrects, mockDoLocalStorage } from './helpers/Mock';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testa pagina feedback', () => {
    it('testa se o botao play again volta para tela inicial', () => {
        localStorage.setItem('ranking', JSON.stringify(mockDoLocalStorage));
        const { history } = renderWithRouterAndRedux(<App />, player2corrects, '/feedback');
        expect(screen.getByTestId("btn-play-again")).toBeInTheDocument();
        userEvent.click(screen.getByTestId("btn-play-again"));
        expect(history.location.pathname).toBe('/')
    })
    it('testa se o botao ranking muda de pagina', () => {
        localStorage.setItem('ranking', JSON.stringify(mockDoLocalStorage));
        const { history } = renderWithRouterAndRedux(<App />, player2corrects, '/feedback');
        expect(screen.getByTestId("btn-ranking")).toBeInTheDocument();
        userEvent.click(screen.getByTestId("btn-ranking"));
        expect(history.location.pathname).toBe('/Ranking')
    })
      it('testa se a msg "Could be Better..." aparece ', () => {
        localStorage.setItem('ranking', JSON.stringify(mockDoLocalStorage));
        renderWithRouterAndRedux(<App />, player2corrects, '/feedback');
        expect(screen.getByRole('heading', { name: /could be better.../i })).toBeInTheDocument();
      })
      it('testa se a msg "Well Done!" aparece ', () => {
        localStorage.setItem('ranking', JSON.stringify(mockDoLocalStorage));
        renderWithRouterAndRedux(<App />, player4corrects, '/feedback');
        expect(screen.getByRole('heading', { name: /well done!/i })).toBeInTheDocument();
      })
})