import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWithRouterAndRedux';
import Feedback from '../../pages/Feedback';

describe('Testa tela de Feedback', () => {
  it('Testa se o texto de feedback está presente', () => {
    renderWithRouterAndRedux(<Feedback />);

    const textFeedback = screen.getByTestId('feedback-text');
    expect(textFeedback).toBeInTheDocument();
  });
  it('Testa se as informações do header estão presentes', () => {
    renderWithRouterAndRedux(<Feedback />);

    const playerImg = screen.getByTestId('header-profile-picture');
    const playerName = screen.getByTestId('header-player-name');
    const playerScore = screen.getByTestId('header-score');

    expect(playerImg).toBeInTheDocument();
    expect(playerName).toBeInTheDocument();
    expect(playerScore).toBeInTheDocument();
  });
  it('Testa se as informações do jogo estão presentes', () => {
    renderWithRouterAndRedux(<Feedback />);

    const textCorrectAnswers = screen.getByText('Correct answers:');
    const totalQuestions = screen.getByTestId('feedback-total-question');

    const textYourScore = screen.getByText('Your score:');
    const totalScore = screen.getByTestId('feedback-total-score');

    expect(textCorrectAnswers).toBeInTheDocument();
    expect(totalQuestions).toBeInTheDocument();

    expect(textYourScore).toBeInTheDocument();
    expect(totalScore).toBeInTheDocument();
  });
  it('Testa botão play again', () => {
    const { history } = renderWithRouterAndRedux(<Feedback />);

    const btnPlayAgain = screen.getByRole('button', { name: /play again/i });

    expect(btnPlayAgain).toBeInTheDocument();
    userEvent.click(btnPlayAgain);
    expect(history.location.pathname).toBe('/');
  });
});
