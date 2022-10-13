import React from 'react';
import { getByTestId, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWithRouterAndRedux';
import Ranking from '../../pages/Ranking';

const initialState = {
  name: 'nome1',
  gravatarEmail: 'nome1@nome1.com',
  score: 100, 
};

describe('Testa tela de Ranking', () => {
  it('Testa se o texto de ranking está presente', () => {
    renderWithRouterAndRedux(<Ranking />);

    const textFeedback = screen.getByText(/ranking/i);
    expect(textFeedback).toBeInTheDocument();
  });

  it('Testa se o componente renderiza a imagem correta', () => {
    renderWithRouterAndRedux(<Ranking />);

    const playAgainBtn = screen.getByRole('button', {
      name: /jogar novamente/i
    });
    expect(playAgainBtn).toBeInTheDocument();
  });

  it('Testa se encontra um testId de player no ranking', () => {
    const { history } = renderWithRouterAndRedux(<Ranking />);

    const playAgainBtn = screen.getByRole('button', {
      name: /jogar novamente/i
    });

    userEvent.click(playAgainBtn);
    
    expect(history.location.pathname).toBe('/');
  });
});
