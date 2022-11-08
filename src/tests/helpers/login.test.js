import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWithRouterAndRedux';
import App from '../../App';

describe('Testa a página de Login', () => {
  it('Testa os inputs e se o botão play só é habilitado com os campos preenchidos', () => {
    renderWithRouterAndRedux(<App />);

    const heading = screen.getByRole('heading', { name: /login/i });
    expect(heading).toBeDefined();

    const btnPlay = screen.getByRole('button', { name: /play/i });
    expect(btnPlay).not.toBeEnabled(); 

    const inputEmail = screen.getByTestId('input-gravatar-email');
    expect(inputEmail).toBeDefined();
    userEvent.type(inputEmail, 'email');
    expect(inputEmail).toHaveValue('email');

    const inputName = screen.getByTestId('input-player-name');
    expect(inputName).toBeDefined();
    userEvent.type(inputName, 'name');
    expect(inputName).toHaveValue('name');
    expect(btnPlay).toBeEnabled(); 
  });

  it('Testa se o botão PLAY redireciona para a pagina Game', async () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId('input-gravatar-email');
    const inputName = screen.getByTestId('input-player-name');
    const btnPlay = screen.getByRole('button', { name: /play/i });
    
    userEvent.type(inputEmail, 'alguem@email.com');
    userEvent.type(inputName, 'alguem');
    userEvent.click(btnPlay);

    const titleGame = await screen.findByRole('img', {
      name: /player/i
    });
    expect(titleGame).toBeInTheDocument();

  });

  it('testa link para pagina de configuraçoes', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const btnSettings = screen.getByRole('button', { name: /settings/i });
    expect(btnSettings).toBeDefined();
    userEvent.click(btnSettings);
    expect(history.location.pathname).toBe('/config');
  });
});

