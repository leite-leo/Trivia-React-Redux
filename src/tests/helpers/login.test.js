import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWithRouterAndRedux';
import App from '../../App';

describe('Testa a página de Login', () => {
  it('Testa inputs', async () => {
    renderWithRouterAndRedux(<App />);

    const heading = screen.getByRole('heading', { name: /login/i });
    expect(heading).toBeDefined();

    const inputEmail = screen.getByTestId('input-gravatar-email');
    expect(inputEmail).toBeDefined();
    userEvent.type(inputEmail, 'email');
    expect(inputEmail).toHaveValue('email');

    const inputName = screen.getByTestId('input-player-name');
    expect(inputName).toBeDefined();
    userEvent.type(inputName, 'name');
    expect(inputName).toHaveValue('name');

    const btnPlay = screen.getByRole('button', { name: /play/i });
    expect(btnPlay).toBeDefined();
    expect(btnPlay).not.toBeDisabled();
    userEvent.click(btnPlay);

    const titleGame = await screen.findByTestId('header-score');
    expect(titleGame).toBeInTheDocument();
  });

  it('testa link para pagina de configuraçoes', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const btnSettings = screen.getByRole('button', { name: /configurações/i });
    expect(btnSettings).toBeDefined();
    userEvent.click(btnSettings);
    expect(history.location.pathname).toBe('/config');
  });
});
